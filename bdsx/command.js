"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hook = exports.command = exports.CustomCommandFactory = exports.CustomCommand = exports.net = exports.hookingForCommand = void 0;
const tslib_1 = require("tslib");
const krevent_1 = require("krevent");
const command_1 = require("./bds/command");
const commandorigin_1 = require("./bds/commandorigin");
const packetids_1 = require("./bds/packetids");
const proc_1 = require("./bds/proc");
const server_1 = require("./bds/server");
const common_1 = require("./common");
const event_1 = require("./event");
const launcher_1 = require("./launcher");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const sharedpointer_1 = require("./sharedpointer");
const util_1 = require("./util");
let executeCommandOriginal;
function executeCommand(cmd, res, ctxptr, b) {
    const ctx = ctxptr.p;
    const name = ctx.origin.getName();
    const resv = event_1.events.command.fire(ctxptr.p.command, name, ctx);
    switch (typeof resv) {
        case 'number':
            res.result = resv;
            util_1._tickCallback();
            return res;
        default:
            util_1._tickCallback();
            return executeCommandOriginal(cmd, res, ctxptr, b);
    }
}
command_1.MinecraftCommands.prototype.executeCommand = function (ctx, b) {
    const res = new command_1.MCRESULT(true);
    return executeCommand(this, res, ctx, b);
};
/**
 * @deprecated why are you using it?
 */
function hookingForCommand() {
    // it will be called with the event callback
}
exports.hookingForCommand = hookingForCommand;
class CommandEventImpl {
    constructor(command, networkIdentifier) {
        this.command = command;
        this.networkIdentifier = networkIdentifier;
        this.isModified = false;
    }
    setCommand(command) {
        this.isModified = true;
        this.command = command;
    }
}
class UserCommandEvents extends krevent_1.EventEx {
    constructor() {
        super(...arguments);
        this.listener = (ptr, networkIdentifier, packetId) => {
            const command = ptr.command;
            const ev = new CommandEventImpl(command, networkIdentifier);
            if (this.fire(ev) === common_1.CANCEL)
                return common_1.CANCEL;
            if (ev.isModified) {
                ptr.command = ev.command;
            }
        };
    }
    onStarted() {
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).on(this.listener);
    }
    onCleared() {
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).remove(this.listener);
    }
}
/** @deprecated use nethook.before(MinecraftPacketIds.CommandRequest).on */
exports.net = new UserCommandEvents();
let CustomCommand = class CustomCommand extends command_1.Command {
    [nativetype_1.NativeType.ctor]() {
        this.self_vftable.destructor = customCommandDtor;
        this.self_vftable.execute = null;
        this.vftable = this.self_vftable;
    }
    execute(origin, output) {
        // empty
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(command_1.Command.VFTable)
], CustomCommand.prototype, "self_vftable", void 0);
CustomCommand = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], CustomCommand);
exports.CustomCommand = CustomCommand;
class CustomCommandFactory {
    constructor(registry, name) {
        this.registry = registry;
        this.name = name;
    }
    /**
     * @deprecated use overload, naming mistake
     */
    override(callback, ...parameters) {
        const fields = {};
        for (const [name, type, optkey] of parameters) {
            if (name in fields)
                throw Error(`${name}: field name dupplicated`);
            fields[name] = type;
            if (optkey !== undefined) {
                if (optkey in fields)
                    throw Error(`${optkey}: field name dupplicated`);
                fields[optkey] = nativetype_1.bool_t;
            }
        }
        class CustomCommandImpl extends CustomCommand {
            [nativetype_1.NativeType.ctor]() {
                this.self_vftable.execute = customCommandExecute;
            }
            execute(origin, output) {
                callback(this, origin, output);
            }
        }
        CustomCommandImpl.define(fields);
        const customCommandExecute = makefunc_1.makefunc.np(function (origin, output) {
            this.execute(origin, output);
        }, nativetype_1.void_t, { this: CustomCommandImpl }, commandorigin_1.CommandOrigin, command_1.CommandOutput);
        const params = [];
        for (const [name, type, optkey] of parameters) {
            if (optkey !== undefined) {
                params.push(CustomCommandImpl.optional(name, optkey));
            }
            else {
                params.push(CustomCommandImpl.mandatory(name, null));
            }
        }
        this.registry.registerOverload(this.name, CustomCommandImpl, params);
        return this;
    }
    overload(callback, parameters) {
        const paramNames = [];
        class CustomCommandImpl extends CustomCommand {
            [nativetype_1.NativeType.ctor]() {
                this.self_vftable.execute = customCommandExecute;
            }
            execute(origin, output) {
                try {
                    const nobj = {};
                    for (const [name, optkey] of paramNames) {
                        if (optkey === undefined || this[optkey]) {
                            nobj[name] = this[name];
                        }
                    }
                    callback(nobj, origin, output);
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
        }
        const fields = {};
        for (const name in parameters) {
            let optional = false;
            let type = parameters[name];
            if (type instanceof Array) {
                optional = type[1];
                type = type[0];
            }
            if (name in fields)
                throw Error(`${name}: field name dupplicated`);
            fields[name] = type;
            if (optional) {
                const optkey = name + '__set';
                if (optkey in fields)
                    throw Error(`${optkey}: field name dupplicated`);
                fields[optkey] = nativetype_1.bool_t;
                paramNames.push([name, optkey]);
            }
            else {
                paramNames.push([name]);
            }
        }
        const params = [];
        CustomCommandImpl.define(fields);
        for (const [name, optkey] of paramNames) {
            if (optkey !== undefined)
                params.push(CustomCommandImpl.optional(name, optkey));
            else
                params.push(CustomCommandImpl.mandatory(name, null));
        }
        const customCommandExecute = makefunc_1.makefunc.np(function (origin, output) {
            this.execute(origin, output);
        }, nativetype_1.void_t, { this: CustomCommandImpl }, commandorigin_1.CommandOrigin, command_1.CommandOutput);
        this.registry.registerOverload(this.name, CustomCommandImpl, params);
        return this;
    }
    alias(alias) {
        this.registry.registerAlias(this.name, alias);
        return this;
    }
}
exports.CustomCommandFactory = CustomCommandFactory;
var command;
(function (command) {
    /**
     * @deprecated use events.command
     */
    command.hook = event_1.events.command;
    function register(name, description, perm = command_1.CommandPermissionLevel.Normal, flags1 = 0x40, // register to list?
    flags2 = command_1.CommandFlag.None) {
        const registry = server_1.serverInstance.minecraft.commands.getRegistry();
        const cmd = registry.findCommand(name);
        if (cmd !== null)
            throw Error(`${name}: command already registered`);
        registry.registerCommand(name, description, perm, flags1, flags2);
        return new CustomCommandFactory(registry, name);
    }
    command.register = register;
})(command = exports.command || (exports.command = {}));
/**
 * @deprecated use events.command
 */
exports.hook = event_1.events.command;
const customCommandDtor = makefunc_1.makefunc.np(function () {
    this[nativetype_1.NativeType.dtor]();
}, nativetype_1.void_t, { this: CustomCommand }, nativetype_1.int32_t);
launcher_1.bedrockServer.withLoading().then(() => {
    executeCommandOriginal = proc_1.procHacker.hooking('MinecraftCommands::executeCommand', command_1.MCRESULT, null, command_1.MinecraftCommands, command_1.MCRESULT, sharedpointer_1.SharedPtr.make(command_1.CommandContext), nativetype_1.bool_t)(executeCommand);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLHFDQUFpRDtBQUNqRCwyQ0FBZ0w7QUFDaEwsdURBQW9EO0FBRXBELCtDQUFxRDtBQUVyRCxxQ0FBd0M7QUFDeEMseUNBQThDO0FBQzlDLHFDQUFrQztBQUNsQyxtQ0FBaUM7QUFDakMseUNBQTJDO0FBQzNDLHlDQUFzQztBQUN0QywrQ0FBeUQ7QUFDekQsNkNBQXlFO0FBQ3pFLG1EQUE0QztBQUM1QyxpQ0FBdUM7QUFHdkMsSUFBSSxzQkFBa0gsQ0FBQztBQUN2SCxTQUFTLGNBQWMsQ0FBQyxHQUFxQixFQUFFLEdBQVksRUFBRSxNQUFnQyxFQUFFLENBQVE7SUFDbkcsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUUsQ0FBQztJQUN0QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxRQUFRLE9BQU8sSUFBSSxFQUFFO1FBQ3JCLEtBQUssUUFBUTtZQUNULEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLG9CQUFhLEVBQUUsQ0FBQztZQUNoQixPQUFPLEdBQUcsQ0FBQztRQUNmO1lBQ0ksb0JBQWEsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7QUFDTCxDQUFDO0FBRUQsMkJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxVQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUksa0JBQVEsQ0FBQyxJQUFJLENBQUMs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