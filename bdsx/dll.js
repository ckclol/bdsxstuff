"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dll = exports.CriticalSection = exports.ThreadHandle = exports.NativeModule = void 0;
const asmcode = require("./asm/asmcode");
const common_1 = require("./common");
const core_1 = require("./core");
const dllraw_1 = require("./dllraw");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
/**
 * Load external DLL
 * You can call native functions by name
 */
class NativeModule extends core_1.VoidPointer {
    /**
     * @deprecated use NativeModule.load(moduleName)
     */
    constructor(moduleNameOrPtr) {
        super(moduleNameOrPtr !== undefined ? moduleNameOrPtr instanceof core_1.VoidPointer ? moduleNameOrPtr : dll.kernel32.LoadLibraryW(moduleNameOrPtr) : undefined);
        this.name = '[undefined]';
    }
    getProcAddress(name) {
        common_1.abstract();
    }
    getProcAddressByOrdinal(ordinal) {
        common_1.abstract();
    }
    /**
     * get the procedure from DLL as a javascript method
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     *
     * @param name name of procedure
     * @param returnType *_t or *Pointer
     * @param this *_t or *Pointer, if it's non-null, it passes this parameter as first parameter.
     * @param structureReturn if set it to true, it allocates first parameter with the returning class and returns it.
     * @param params *_t or *Pointer
     */
    getFunction(name, returnType, opts, ...params) {
        const addr = this.getProcAddress(name);
        if (addr === null)
            throw Error(`${this.name}: Cannot find procedure, ${name}`);
        return makefunc_1.makefunc.js(addr, returnType, opts, ...params);
    }
    toString() {
        return `[${this.name}: ${super.toString()}]`;
    }
    /**
     * get NativeModule by name
     * wrapper of GetModuleHandleW
     * if you want to load the new module. Please use NativeModule.load instead
     * @param name return exe module if null
     */
    static get(name) {
        const module = getModuleHandle(name);
        if (module === null)
            throw Error(`${name}: Cannot find module`);
        module.name = name || '[exe]';
        return module;
    }
    /**
     * load NativeModule by name
     * wrapper of LoadLibraryW
     */
    static load(name) {
        const module = dll.kernel32.LoadLibraryW(name);
        if (module === null) {
            const errno = dll.kernel32.GetLastError();
            const errobj = Error(`${name}: Cannot load module, errno=${errno}`);
            errobj.errno = errno;
            throw errobj;
        }
        module.name = name;
        return module;
    }
}
exports.NativeModule = NativeModule;
const getModuleHandle = makefunc_1.makefunc.js(core_1.cgate.GetModuleHandleWPtr, NativeModule, null, makefunc_1.makefunc.Utf16);
class ThreadHandle extends core_1.VoidPointer {
    close() {
        return dll.kernel32.CloseHandle(this);
    }
}
exports.ThreadHandle = ThreadHandle;
class CriticalSection extends core_1.AllocatedPointer {
    constructor() {
        super(CriticalSection.bytes);
        dll.kernel32.InitializeCriticalSection(this);
    }
    enter() {
        dll.kernel32.EnterCriticalSection(this);
    }
    leave() {
        dll.kernel32.LeaveCriticalSection(this);
    }
    tryEnter() {
        return dll.kernel32.TryEnterCriticalSection(this);
    }
    dispose() {
        dll.kernel32.DeleteCriticalSection(this);
    }
}
exports.CriticalSection = CriticalSection;
CriticalSection.bytes = 40;
NativeModule.prototype.getProcAddress = makefunc_1.makefunc.js(core_1.cgate.GetProcAddressPtr, core_1.NativePointer, { this: NativeModule }, makefunc_1.makefunc.Utf8);
NativeModule.prototype.getProcAddressByOrdinal = makefunc_1.makefunc.js(core_1.cgate.GetProcAddressPtr, core_1.NativePointer, { this: NativeModule }, nativetype_1.int32_t);
var dll;
(function (dll) {
    dll.current = NativeModule.get(null); // get the exe module, it's the address base of RVA
    let ntdll;
    (function (ntdll) {
        ntdll.module = NativeModule.get('ntdll.dll');
        const wine_get_version_ptr = ntdll.module.getProcAddress('wine_get_version');
        ntdll.wine_get_version = wine_get_version_ptr === null ?
            null : makefunc_1.makefunc.js(wine_get_version_ptr, makefunc_1.makefunc.Utf8);
    })(ntdll = dll.ntdll || (dll.ntdll = {}));
    let kernel32;
    (function (kernel32) {
        kernel32.module = dllraw_1.dllraw.kernel32.module.as(NativeModule);
        kernel32.LoadLibraryW = kernel32.module.getFunction('LoadLibraryW', NativeModule, null, makefunc_1.makefunc.Utf16);
        kernel32.LoadLibraryExW = kernel32.module.getFunction('LoadLibraryExW', NativeModule, null, makefunc_1.makefunc.Utf16, core_1.VoidPointer, nativetype_1.int32_t);
        kernel32.FreeLibrary = kernel32.module.getFunction('FreeLibrary', nativetype_1.bool_t, null, NativeModule);
        kernel32.VirtualProtect = kernel32.module.getFunction('VirtualProtect', nativetype_1.bool_t, null, core_1.VoidPointer, nativetype_1.int64_as_float_t, nativetype_1.int64_as_float_t, makefunc_1.makefunc.Buffer);
        kernel32.GetLastError = kernel32.module.getFunction('GetLastError', nativetype_1.int32_t);
        kernel32.CreateThread = kernel32.module.getFunction('CreateThread', ThreadHandle, null, core_1.VoidPointer, nativetype_1.int64_as_float_t, core_1.VoidPointer, core_1.VoidPointer, nativetype_1.int32_t, makefunc_1.makefunc.Buffer);
        kernel32.TerminateThread = kernel32.module.getFunction('TerminateThread', nativetype_1.void_t, null, ThreadHandle, nativetype_1.int32_t);
        kernel32.CloseHandle = kernel32.module.getFunction('CloseHandle', nativetype_1.bool_t, null, core_1.VoidPointer);
        kernel32.WaitForSingleObject = kernel32.module.getFunction('WaitForSingleObject', nativetype_1.int32_t, null, core_1.VoidPointer, nativetype_1.int32_t);
        kernel32.CreateEventW = kernel32.module.getFunction('CreateEventW', core_1.VoidPointer, null, core_1.VoidPointer, nativetype_1.int32_t, nativetype_1.int32_t, makefunc_1.makefunc.Utf16);
        kernel32.SetEvent = kernel32.module.getFunction('SetEvent', nativetype_1.bool_t, null, core_1.VoidPointer);
        kernel32.GetCurrentThreadId = makefunc_1.makefunc.js(dllraw_1.dllraw.kernel32.GetCurrentThreadId, nativetype_1.int32_t);
        kernel32.InitializeCriticalSection = kernel32.module.getFunction('InitializeCriticalSection', nativetype_1.void_t, null, CriticalSection);
        kernel32.DeleteCriticalSection = kernel32.module.getFunction('DeleteCriticalSection', nativetype_1.void_t, null, CriticalSection);
        kernel32.EnterCriticalSection = kernel32.module.getFunction('EnterCriticalSection', nativetype_1.void_t, null, CriticalSection);
        kernel32.LeaveCriticalSection = kernel32.module.getFunction('LeaveCriticalSection', nativetype_1.void_t, null, CriticalSection);
        kernel32.TryEnterCriticalSection = kernel32.module.getFunction('TryEnterCriticalSection', nativetype_1.bool_t, null, CriticalSection);
        kernel32.LocalFree = kernel32.module.getFunction('LocalFree', core_1.VoidPointer, null, core_1.VoidPointer);
        kernel32.SetDllDirectoryW = kernel32.module.getFunction('SetDllDirectoryW', nativetype_1.bool_t, null, makefunc_1.makefunc.Utf16);
        kernel32.GetProcAddress = core_1.cgate.GetProcAddress;
        kernel32.GetModuleHandleW = core_1.cgate.GetModuleHandleW;
    })(kernel32 = dll.kernel32 || (dll.kernel32 = {}));
    let ucrtbase;
    (function (ucrtbase) {
        ucrtbase.module = dllraw_1.dllraw.ucrtbase.module.as(NativeModule);
        ucrtbase._beginthreadex = ucrtbase.module.getFunction('_beginthreadex', ThreadHandle, null, core_1.VoidPointer, nativetype_1.int64_as_float_t, core_1.VoidPointer, core_1.VoidPointer, nativetype_1.int32_t, makefunc_1.makefunc.Buffer);
        ucrtbase.free = ucrtbase.module.getFunction('free', nativetype_1.void_t, null, core_1.VoidPointer);
        ucrtbase.malloc = makefunc_1.makefunc.js(dllraw_1.dllraw.ucrtbase.malloc, core_1.NativePointer, { nullableReturn: true }, nativetype_1.int64_as_float_t);
        ucrtbase.__stdio_common_vsprintf = ucrtbase.module.getProcAddress('__stdio_common_vsprintf');
    })(ucrtbase = dll.ucrtbase || (dll.ucrtbase = {}));
    let vcruntime140;
    (function (vcruntime140) {
        vcruntime140.module = dllraw_1.dllraw.vcruntime140.module.as(NativeModule);
        vcruntime140.memset = vcruntime140.module.getFunction('memset', nativetype_1.void_t, null, core_1.VoidPointer, nativetype_1.int32_t, nativetype_1.int64_as_float_t);
        vcruntime140.memcmp = vcruntime140.module.getFunction('memcmp', nativetype_1.int32_t, null, core_1.VoidPointer, core_1.VoidPointer, nativetype_1.int64_as_float_t);
        vcruntime140.memcpy = makefunc_1.makefunc.js(dllraw_1.dllraw.vcruntime140.memcpy, nativetype_1.void_t, null, core_1.VoidPointer, core_1.VoidPointer, nativetype_1.int64_as_float_t);
        vcruntime140.memchr = vcruntime140.module.getFunction('memchr', core_1.NativePointer, null, core_1.VoidPointer, nativetype_1.int32_t, nativetype_1.int64_as_float_t);
    })(vcruntime140 = dll.vcruntime140 || (dll.vcruntime140 = {}));
    let msvcp140;
    (function (msvcp140) {
        msvcp140.module = NativeModule.load('msvcp140.dll');
        msvcp140._Cnd_do_broadcast_at_thread_exit = msvcp140.module.getProcAddress("_Cnd_do_broadcast_at_thread_exit");
        msvcp140.std_cin = msvcp140.module.getProcAddress("?cin@std@@3V?$basic_istream@DU?$char_traits@D@std@@@1@A");
    })(msvcp140 = dll.msvcp140 || (dll.msvcp140 = {}));
})(dll = exports.dll || (exports.dll = {}));
const RtlCaptureContext = dll.kernel32.module.getProcAddress('RtlCaptureContext');
asmcode.RtlCaptureContext = RtlCaptureContext;
asmcode.memset = dll.vcruntime140.memset.pointer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUEwQztBQUMxQyxxQ0FBb0M7QUFDcEMsaUNBQTZFO0FBQzdFLHFDQUFrQztBQUNsQyx5Q0FBd0Y7QUFDeEYsNkNBQXlFO0FBRXpFOzs7R0FHRztBQUNILE1BQWEsWUFBYSxTQUFRLGtCQUFXO0lBR3pDOztPQUVHO0lBQ0gsWUFBWSxlQUFtQztRQUMzQyxLQUFLLENBQUMsZUFBZSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBZSxZQUFZLGtCQUFXLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBTnRKLFNBQUksR0FBRyxhQUFhLENBQUM7SUFPNUIsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFZO1FBQ3ZCLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCx1QkFBdUIsQ0FBQyxPQUFlO1FBQ25DLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFdBQVcsQ0FDUCxJQUFZLEVBQUUsVUFBa0IsRUFBRSxJQUFnQixFQUFFLEdBQUcsTUFBYztRQUVyRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxLQUFLLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLDRCQUE0QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sbUJBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxJQUFJLENBQUMs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