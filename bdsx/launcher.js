"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bedrockServer = void 0;
const assembler_1 = require("./assembler");
const command_1 = require("./bds/command");
const commandorigin_1 = require("./bds/commandorigin");
const dimension_1 = require("./bds/dimension");
const level_1 = require("./bds/level");
const proc_1 = require("./bds/proc");
const capi_1 = require("./capi");
const common_1 = require("./common");
const core_1 = require("./core");
const dll_1 = require("./dll");
const event_1 = require("./event");
const getline_1 = require("./getline");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const sharedpointer_1 = require("./sharedpointer");
const source_map_support_1 = require("./source-map-support");
const unlocker_1 = require("./unlocker");
const util_1 = require("./util");
const windows_h_1 = require("./windows_h");
const readline = require("readline");
const colors = require("colors");
const bd_server = require("./bds/server");
const nimodule = require("./bds/networkidentifier");
const asmcode = require("./asm/asmcode");
class Liner {
    constructor() {
        this.remaining = '';
    }
    write(str) {
        const lastidx = str.lastIndexOf('\n');
        if (lastidx === -1) {
            this.remaining += str;
            return null;
        }
        else {
            const out = this.remaining + str.substr(0, lastidx);
            this.remaining = str.substr(lastidx + 1);
            return out;
        }
    }
}
const STATUS_NO_NODE_THREAD = (0xE0000001 | 0);
// default runtime error handler
core_1.runtimeError.setHandler(err => {
    source_map_support_1.remapError(err);
    const lastSender = core_1.ipfilter.getLastSender();
    console.error('[ Native Crash ]');
    console.error(`Last packet from IP: ${lastSender}`);
    if (err.code || err.nativeStack) {
        console.error('[ Native Stack ]');
        switch (err.code) {
            case STATUS_NO_NODE_THREAD:
                console.error(`JS Accessing from the out of threads`);
                break;
            case windows_h_1.EXCEPTION_ACCESS_VIOLATION:
                console.error(`Accessing an invalid memory address`);
                break;
            case windows_h_1.STATUS_INVALID_PARAMETER:
                console.error(`Native function received wrong parameters`);
                break;
        }
        console.error(err.nativeStack);
    }
    console.error('[ JS Stack ]');
    try {
        if ((err instanceof Error) && !err.stack)
            throw err;
    }
    catch (err) {
    }
    console.error(err.stack || err.message);
});
let launched = false;
let loadingIsFired = false;
let openIsFired = false;
const bedrockLogLiner = new Liner;
const cmdOutputLiner = new Liner;
const commandQueue = new core_1.MultiThreadQueue(nativetype_1.CxxString[nativetype_1.NativeType.size]);
const commandQueueBuffer = new pointer_1.CxxStringWrapper(true);
function patchForStdio() {
    // hook bedrock log
    asmcode.bedrockLogNp = makefunc_1.makefunc.np((severity, msgptr, size) => {
        // void(*callback)(int severity, const char* msg, size_t size)
        const line = bedrockLogLiner.write(msgptr.getString(size, 0, common_1.Encoding.Utf8));
        if (line === null)
            return;
        let color;
        switch (severity) {
            case 1:
                color = colors.white;
                break;
            case 2:
                color = colors.brightWhite;
                break;
            case 4:
                color = colors.brightYellow;
                break;
            default:
                color = colors.brightRed;
                break;
        }
        if (event_1.events.serverLog.fire(line, color) === common_1.CANCEL)
            return;
        console.log(color(line));
    }, nativetype_1.void_t, null, nativetype_1.int32_t, core_1.StaticPointer, nativetype_1.int64_as_float_t);
    proc_1.procHacker.write('BedrockLogOut', 0, assembler_1.asm().jmp64(asmcode.logHook, assembler_1.Register.rax));
    asmcode.CommandOutputSenderHookCallback = makefunc_1.makefunc.np((bytes, ptr) => {
        // void(*callback)(const char* log, size_t size)
        const line = cmdOutputLiner.write(ptr.getString(bytes));
        if (line === null)
            return;
        if (event_1.events.commandOutput.fire(line) !== common_1.CANCEL) {
            console.log(line);
        }
    }, nativetype_1.void_t, null, nativetype_1.int64_as_float_t, core_1.StaticPointer);
    proc_1.procHacker.patching('hook-command-output', 'CommandOutputSender::send', 0x217, asmcode.CommandOutputSenderHook, assembler_1.Register.rax, true, [
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0x48, 0x8D, 0x15, 0xFF, 0xFF, 0xFF, 0xFF,
        0x48, 0x8B, 0xC8,
        0xFF, 0x15, 0xFF, 0xFF, 0xFF, 0xFF, // call qword ptr ds:[<&??5?$basic_istream@DU?$char_traits@D@std@@@std@@QEAAAEAV01@P6AAEAV01@AEAV01@@Z@Z>]
    ], [1, 5, 8, 12, 17, 21]);
    // hook stdin
    asmcode.commandQueue = commandQueue;
    asmcode.MultiThreadQueueTryDequeue = core_1.MultiThreadQueue.tryDequeue;
    proc_1.procHacker.patching('hook-stdin-command', 'ConsoleInputReader::getLine', 0, asmcode.ConsoleInputReader_getLine_hook, assembler_1.Register.rax, false, [
        0xE9, 0x3B, 0xF6, 0xFF, 0xFF,
        0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0xCC // int3 ...
    ], [3, 7, 21, 25, 38, 42]);
    // remove original stdin thread
    const justReturn = assembler_1.asm().ret();
    proc_1.procHacker.write('ConsoleInputReader::ConsoleInputReader', 0, justReturn);
    proc_1.procHacker.write('ConsoleInputReader::~ConsoleInputReader', 0, justReturn);
    proc_1.procHacker.write('ConsoleInputReader::unblockReading', 0, justReturn);
}
function _launch(asyncResolve) {
    core_1.ipfilter.init(ip => {
        console.error(`[BDSX] traffic exceeded threshold for IP: ${ip}`);
    });
    core_1.jshook.init(event_1.events.errorFire);
    const oldSetInterval = setInterval;
    global.setInterval = function (callback, ms, ...args) {
        return oldSetInterval((...args) => {
            try {
                callback(...args);
            }
            catch (err) {
                event_1.events.errorFire(err);
            }
        }, ms, args);
    };
    const oldSetTimeout = setTimeout;
    global.setTimeout = function (callback, ms, ...args) {
        return oldSetTimeout((...args) => {
            try {
                callback(...args);
            }
            catch (err) {
                event_1.events.errorFire(err);
            }
        }, ms, args);
    };
    setTimeout.__promisify__ = oldSetTimeout.__promisify__;
    asmcode.evWaitGameThreadEnd = dll_1.dll.kernel32.CreateEventW(null, 0, 0, null);
    core_1.uv_async.open();
    // uv async callback, when BDS closed perfectly
    function finishCallback() {
        core_1.uv_async.close();
        threadHandle.close();
        event_1.events.serverClose.fire();
        event_1.events.serverClose.clear();
        util_1._tickCallback();
    }
    // // call game thread entry
    asmcode.gameThreadInner = proc_1.proc['<lambda_8914ed82e3ef519cb2a85824fbe333d8>::operator()'];
    asmcode.free = dll_1.dll.ucrtbase.free.pointer;
    asmcode.SetEvent = dll_1.dll.kernel32.SetEvent.pointer;
    // hook game thread
    asmcode.uv_async_call = core_1.uv_async.call;
    asmcode.WaitForSingleObject = dll_1.dll.kernel32.WaitForSingleObject.pointer;
    asmcode._Cnd_do_broadcast_at_thread_exit = dll_1.dll.msvcp140._Cnd_do_broadcast_at_thread_exit;
    proc_1.procHacker.patching('hook-game-thread', 'std::thread::_Invoke<std::tuple<<lambda_8914ed82e3ef519cb2a85824fbe333d8> >,0>', 6, asmcode.gameThreadHook, // original depended
    assembler_1.Register.rax, true, [
        0x48, 0x8B, 0xD9,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF, // call <bedrock_server._Cnd_do_broadcast_at_thread_exit>
    ], [4, 8, 9, 13]);
    // 1.16.210.05 - no google breakpad now
    // hook runtime error
    // procHacker.jumping('hook-runtime-error', 'google_breakpad::ExceptionHandler::HandleException', 0, asmcode.runtime_error, Register.rax, [
    //     0x48, 0x89, 0x5C, 0x24, 0x08,   // mov qword ptr ss:[rsp+8],rbx
    //     0x57,                           // push rdi
    //     0x48, 0x83, 0xEC, 0x20,         // sub rsp,20
    //     0x48, 0x8B, 0xF9,               // mov rdi,rcx
    // ], []);
    // procHacker.jumping('hook-invalid-parameter', 'google_breakpad::ExceptionHandler::HandleInvalidParameter', 0, asmcode.handle_invalid_parameter, Register.rax, [
    //     0x40, 0x55, // push rbp
    //     0x41, 0x54, // push r12
    //     0x41, 0x55, // push r13
    //     0x41, 0x56, // push r14
    //     0x41, 0x57, // push r15
    //     0x48, 0x8D, 0xAC, 0x24, 0x00, 0xF8, 0xFF, 0xFF, // lea rbp,qword ptr ss:[rsp-800]
    // ], []);
    // get server instance
    proc_1.procHacker.hookingRawWithCallOriginal('ServerInstance::ServerInstance', asmcode.ServerInstance_ctor_hook, [assembler_1.Register.rcx, assembler_1.Register.rdx, assembler_1.Register.r8], []);
    // it removes errors when run commands on shutdown.
    proc_1.procHacker.nopping('skip-command-list-destruction', 'ScriptEngine::~ScriptEngine', 0x7d, [
        0x48, 0x8D, 0x4B, 0x78,
        0xE8, 0x6A, 0xF5, 0xFF, 0xFF // call <bedrock_server.public: __cdecl std::deque<struct ScriptCommand,class std::allocator<struct ScriptCommand> >::~deque<struct ScriptCommand,class std::allocator<struct ScriptCommand> >(void) __ptr64>
    ], [5, 9]);
    // enable script
    proc_1.procHacker.nopping('force-enable-script', 'MinecraftServerScriptEngine::onServerThreadStarted', 0x38, [
        0xE8, 0x43, 0x61, 0xB1, 0xFF,
        0x84, 0xC0,
        0x0F, 0x84, 0x4E, 0x01, 0x00, 0x00,
        0x48, 0x8B, 0x17,
        0x48, 0x8B, 0xCF,
        0xFF, 0x92, 0x70, 0x04, 0x00, 0x00,
        0x48, 0x8B, 0xC8,
        0xE8, 0xE7, 0x28, 0x15, 0x00,
        0x48, 0x8B, 0xC8,
        0xE8, 0x4F, 0x66, 0x19, 0x00,
        0x84, 0xC0,
        0x0F, 0x84, 0x2A, 0x01, 0x00, 0x00 // je bedrock_server.7FF7345226F3
    ], [1, 5, 16, 20, 28, 32]);
    patchForStdio();
    // seh wrapped main
    asmcode.bedrock_server_exe_args = core_1.bedrock_server_exe.args;
    asmcode.bedrock_server_exe_argc = core_1.bedrock_server_exe.argc;
    asmcode.bedrock_server_exe_main = core_1.bedrock_server_exe.main;
    asmcode.finishCallback = makefunc_1.makefunc.np(finishCallback, nativetype_1.void_t, null);
    {
        // restore main
        const unlock = new unlocker_1.MemoryUnlocker(core_1.bedrock_server_exe.main, 12);
        core_1.bedrock_server_exe.main.add().copyFrom(core_1.bedrock_server_exe.mainOriginal12Bytes, 12);
        unlock.done();
    }
    // call main as a new thread
    // main will create a game thread.
    // and bdsx will hijack the game thread and run it on the node thread.
    const [threadHandle] = capi_1.capi.createThread(asmcode.wrapped_main, null);
    require('./bds/implements');
    require('./event_impl');
    loadingIsFired = true;
    event_1.events.serverLoading.fire();
    event_1.events.serverLoading.clear();
    // skip to create the console of BDS
    proc_1.procHacker.write('ScriptApi::ScriptFramework::registerConsole', 0, assembler_1.asm().mov_r_c(assembler_1.Register.rax, 1).ret());
    // hook on update
    asmcode.cgateNodeLoop = core_1.cgate.nodeLoop;
    asmcode.updateEvTargetFire = makefunc_1.makefunc.np(() => event_1.events.serverUpdate.fire(), nativetype_1.void_t, null);
    proc_1.procHacker.patching('update-hook', '<lambda_8914ed82e3ef519cb2a85824fbe333d8>::operator()', 0x5f3, asmcode.updateWithSleep, assembler_1.Register.rcx, true, [
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0x48, 0x8B, 0xD8,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0x48, 0x99,
        0x48, 0xF7, 0xFB,
        0x48, 0x69, 0xC8, 0x00, 0xCA, 0x9A, 0x3B,
        0x48, 0x69, 0xC2, 0x00, 0xCA, 0x9A, 0x3B,
        0x48, 0x99,
        0x48, 0xF7, 0xFB,
        0x48, 0x03, 0xC8,
        0x48, 0x8B, 0x44, 0x24, 0x20,
        0x48, 0x2B, 0xC1,
        0x48, 0x3D, 0x88, 0x13, 0x00, 0x00,
        0x7C, 0x0B,
        0x48, 0x8D, 0x4C, 0x24, 0x20,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0x90, // nop
    ], [1, 5, 9, 13, 62, 66]);
    // hook on script starting
    proc_1.procHacker.hookingRawWithCallOriginal('ScriptEngine::startScriptLoading', makefunc_1.makefunc.np((scriptEngine) => {
        try {
            core_1.cgate.nodeLoopOnce();
            bd_server.serverInstance = asmcode.serverInstance.as(bd_server.ServerInstance);
            nimodule.networkHandler = bd_server.serverInstance.networkHandler;
            openIsFired = true;
            event_1.events.serverOpen.fire();
            event_1.events.serverOpen.clear(); // it will never fire, clear it
            asyncResolve();
            util_1._tickCallback();
            proc_1.procHacker.js('ScriptEngine::_processSystemInitialize', nativetype_1.void_t, null, core_1.VoidPointer)(scriptEngine);
            util_1._tickCallback();
            core_1.cgate.nodeLoopOnce();
        }
        catch (err) {
            source_map_support_1.remapAndPrintError(err);
        }
    }, nativetype_1.void_t, null, core_1.VoidPointer), [assembler_1.Register.rcx], []);
    proc_1.procHacker.hookingRawWithCallOriginal('ScriptEngine::shutdown', makefunc_1.makefunc.np(() => {
        try {
            event_1.events.serverStop.fire();
        }
        catch (err) {
            source_map_support_1.remapAndPrintError(err);
        }
    }, nativetype_1.void_t), [assembler_1.Register.rcx], []);
    // keep ScriptEngine variables. idk why it needs.
    proc_1.procHacker.write('MinecraftServerScriptEngine::onServerUpdateEnd', 0, assembler_1.asm().ret());
}
const stopfunc = proc_1.procHacker.js('DedicatedServer::stop', nativetype_1.void_t, null, core_1.VoidPointer);
const commandVersion = proc_1.proc['CommandVersion::CurrentVersion'].getInt32();
const commandContextRefCounterVftable = proc_1.proc["std::_Ref_count_obj2<CommandContext>::`vftable'"];
const CommandOriginWrapper = pointer_1.Wrapper.make(commandorigin_1.CommandOrigin.ref());
const commandContextConstructor = proc_1.procHacker.js('CommandContext::CommandContext', nativetype_1.void_t, null, command_1.CommandContext, nativetype_1.CxxString, CommandOriginWrapper, nativetype_1.int32_t);
const CommandContextSharedPtr = sharedpointer_1.SharedPtr.make(command_1.CommandContext);
function createCommandContext(command, commandOrigin) {
    const sharedptr = new CommandContextSharedPtr(true);
    sharedptr.create(commandContextRefCounterVftable);
    commandContextConstructor(sharedptr.p, command, commandOrigin, commandVersion);
    return sharedptr;
}
const serverCommandOriginConstructor = proc_1.procHacker.js('ServerCommandOrigin::ServerCommandOrigin', nativetype_1.void_t, null, commandorigin_1.ServerCommandOrigin, nativetype_1.CxxString, level_1.ServerLevel, nativetype_1.int32_t, dimension_1.Dimension);
function createServerCommandOrigin(name, level, permissionLevel, dimension) {
    const wrapper = new CommandOriginWrapper(true);
    const origin = capi_1.capi.malloc(commandorigin_1.ServerCommandOrigin[nativetype_1.NativeType.size]).as(commandorigin_1.ServerCommandOrigin);
    wrapper.value = origin;
    serverCommandOriginConstructor(origin, name, level, permissionLevel, dimension);
    return wrapper;
}
const deleteServerCommandOrigin = makefunc_1.makefunc.js([0, 0], nativetype_1.void_t, { this: commandorigin_1.ServerCommandOrigin }, nativetype_1.int32_t);
commandorigin_1.ServerCommandOrigin[nativetype_1.NativeType.dtor] = () => deleteServerCommandOrigin.call(this, 1);
function sessionIdGrabber(text) {
    const tmp = text.match(/\[\d{4}-\d\d-\d\d \d\d:\d\d:\d\d INFO\] Session ID (.*)$/);
    if (tmp) {
        bedrockServer.sessionId = tmp[1];
        event_1.events.serverLog.remove(sessionIdGrabber);
    }
}
event_1.events.serverLog.on(sessionIdGrabber);
var bedrockServer;
(function (bedrockServer) {
    /**
     * @deprecated use events.serverLoading
     */
    bedrockServer.loading = event_1.events.serverLoading;
    /**
     * @deprecated use events.serverOpen
     */
    bedrockServer.open = event_1.events.serverOpen;
    /**
     * @deprecated use events.serverClose
     */
    bedrockServer.close = event_1.events.serverClose;
    /**
     * @deprecated use events.serverUpdate
     */
    bedrockServer.update = event_1.events.serverUpdate;
    /**
     * @deprecated use events.error
     */
    bedrockServer.error = event_1.events.error;
    /**
     * @deprecated use events.serverLog
     */
    bedrockServer.bedrockLog = event_1.events.serverLog;
    /**
     * @deprecated use events.serverLog
     */
    bedrockServer.commandOutput = event_1.events.commandOutput;
    function withLoading() {
        return new Promise(resolve => {
            if (loadingIsFired) {
                resolve();
            }
            else {
                event_1.events.serverLoading.on(resolve);
            }
        });
    }
    bedrockServer.withLoading = withLoading;
    function afterOpen() {
        return new Promise(resolve => {
            if (openIsFired) {
                resolve();
            }
            else {
                event_1.events.serverOpen.on(resolve);
            }
        });
    }
    bedrockServer.afterOpen = afterOpen;
    function isLaunched() {
        return launched;
    }
    bedrockServer.isLaunched = isLaunched;
    /**
     * stop the BDS
     * It will stop next tick
     */
    function stop() {
        const server = bd_server.serverInstance.server;
        stopfunc(server.add(8));
    }
    bedrockServer.stop = stop;
    function forceKill(exitCode) {
        core_1.bedrock_server_exe.forceKill(exitCode);
    }
    bedrockServer.forceKill = forceKill;
    function launch() {
        return new Promise((resolve, reject) => {
            if (launched) {
                reject(source_map_support_1.remapError(Error('Cannot launch BDS again')));
                return;
            }
            launched = true;
            _launch(resolve);
        });
    }
    bedrockServer.launch = launch;
    /**
     * pass to stdin
     */
    function executeCommandOnConsole(command) {
        commandQueueBuffer.construct();
        commandQueueBuffer.value = command;
        commandQueue.enqueue(commandQueueBuffer);
    }
    bedrockServer.executeCommandOnConsole = executeCommandOnConsole;
    /**
     * it does the same thing with executeCommandOnConsole
     * but call the internal function directly
     */
    function executeCommand(command, mute = true, permissionLevel = 4, dimension = null) {
        const origin = createServerCommandOrigin('Server', bd_server.serverInstance.minecraft.getLevel(), // I'm not sure it's always ServerLevel
        permissionLevel, dimension);
        const ctx = createCommandContext(command, origin);
        const res = bd_server.serverInstance.minecraft.commands.executeCommand(ctx, mute);
        ctx.destruct();
        origin.destruct();
        return res;
    }
    bedrockServer.executeCommand = executeCommand;
    let stdInHandler = null;
    class DefaultStdInHandler {
        constructor() {
            this.online = executeCommandOnConsole;
            this.onclose = () => {
                this.close();
            };
            // empty
        }
        static install() {
            if (stdInHandler !== null)
                throw source_map_support_1.remapError(Error('Already opened'));
            return stdInHandler = new DefaultStdInHandlerGetLine;
        }
    }
    bedrockServer.DefaultStdInHandler = DefaultStdInHandler;
    /**
     * this handler has bugs on Linux+Wine
     */
    class DefaultStdInHandlerJs extends DefaultStdInHandler {
        constructor() {
            super();
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            this.rl.on('line', line => this.online(line));
            event_1.events.serverClose.on(this.onclose);
        }
        close() {
            if (stdInHandler === null)
                return;
            console.assert(stdInHandler !== null);
            stdInHandler = null;
            this.rl.close();
            this.rl.removeAllListeners();
            bedrockServer.close.remove(this.onclose);
        }
    }
    class DefaultStdInHandlerGetLine extends DefaultStdInHandler {
        constructor() {
            super();
            this.getline = new getline_1.GetLine(line => this.online(line));
            event_1.events.serverClose.on(this.onclose);
        }
        close() {
            if (stdInHandler === null)
                return;
            console.assert(stdInHandler !== null);
            stdInHandler = null;
            this.getline.close();
        }
    }
})(bedrockServer = exports.bedrockServer || (exports.bedrockServer = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBNEM7QUFDNUMsMkNBQXlEO0FBQ3pELHVEQUF5RTtBQUN6RSwrQ0FBNEM7QUFDNUMsdUNBQTBDO0FBQzFDLHFDQUE4QztBQUM5QyxpQ0FBOEI7QUFDOUIscUNBQTRDO0FBQzVDLGlDQUEySTtBQUMzSSwrQkFBNEI7QUFDNUIsbUNBQWlDO0FBQ2pDLHVDQUFvQztBQUNwQyx5Q0FBc0M7QUFDdEMsNkNBQXdGO0FBQ3hGLHVDQUFzRDtBQUN0RCxtREFBNEM7QUFDNUMsNkRBQWtGO0FBQ2xGLHlDQUE0QztBQUM1QyxpQ0FBdUM7QUFDdkMsMkNBQW1GO0FBRW5GLHFDQUFzQztBQUN0QyxpQ0FBa0M7QUFDbEMsMENBQTJDO0FBQzNDLG9EQUFxRDtBQUNyRCx5Q0FBMEM7QUFlMUMsTUFBTSxLQUFLO0lBQVg7UUFDWSxjQUFTLEdBQUcsRUFBRSxDQUFDO0lBWTNCLENBQUM7SUFYRyxLQUFLLENBQUMsR0FBVTtRQUNaLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0NBQ0o7QUFFRCxNQUFNLHFCQUFxQixHQUFHLENBQUMsVUFBVSxHQUFDLENBQUMs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