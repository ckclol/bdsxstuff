"use strict";
var WildcardCommandSelector_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistry = exports.Command = exports.CommandVFTable = exports.CommandParameterData = exports.CommandParameterDataType = exports.MinecraftCommands = exports.CommandOutputSender = exports.CommandOutput = exports.CommandContext = exports.CommandRawText = exports.ActorWildcardCommandSelector = exports.WildcardCommandSelector = exports.CommandSelectorBase = exports.MCRESULT = exports.CommandFlag = exports.CommandPermissionLevel = void 0;
const tslib_1 = require("tslib");
const assembler_1 = require("../assembler");
const bin_1 = require("../bin");
const capi_1 = require("../capi");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxvector_1 = require("../cxxvector");
const dbghelp_1 = require("../dbghelp");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const sharedpointer_1 = require("../sharedpointer");
const templatename_1 = require("../templatename");
const actor_1 = require("./actor");
const blockpos_1 = require("./blockpos");
const commandorigin_1 = require("./commandorigin");
const proc_1 = require("./proc");
const typeid_1 = require("./typeid");
var CommandPermissionLevel;
(function (CommandPermissionLevel) {
    CommandPermissionLevel[CommandPermissionLevel["Normal"] = 0] = "Normal";
    CommandPermissionLevel[CommandPermissionLevel["Operator"] = 1] = "Operator";
    CommandPermissionLevel[CommandPermissionLevel["Host"] = 2] = "Host";
    CommandPermissionLevel[CommandPermissionLevel["Automation"] = 3] = "Automation";
    CommandPermissionLevel[CommandPermissionLevel["Admin"] = 4] = "Admin";
})(CommandPermissionLevel = exports.CommandPermissionLevel || (exports.CommandPermissionLevel = {}));
var CommandFlag;
(function (CommandFlag) {
    CommandFlag[CommandFlag["None"] = 0] = "None";
})(CommandFlag = exports.CommandFlag || (exports.CommandFlag = {}));
let MCRESULT = class MCRESULT extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], MCRESULT.prototype, "result", void 0);
MCRESULT = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], MCRESULT);
exports.MCRESULT = MCRESULT;
let CommandSelectorBase = class CommandSelectorBase extends nativeclass_1.NativeClass {
    _newResults(origin) {
        common_1.abstract();
    }
    newResults(origin) {
        const list = this._newResults(origin);
        const actors = list.p.toArray();
        list.dispose();
        return actors;
    }
};
CommandSelectorBase = tslib_1.__decorate([
    nativeclass_1.nativeClass(0xc0)
], CommandSelectorBase);
exports.CommandSelectorBase = CommandSelectorBase;
const CommandSelectorBaseCtor = proc_1.procHacker.js('CommandSelectorBase::CommandSelectorBase', nativetype_1.void_t, null, CommandSelectorBase, nativetype_1.bool_t);
CommandSelectorBase.prototype[nativetype_1.NativeType.dtor] = proc_1.procHacker.js('CommandSelectorBase::~CommandSelectorBase', nativetype_1.void_t, { this: CommandSelectorBase });
CommandSelectorBase.prototype._newResults = proc_1.procHacker.js('CommandSelectorBase::newResults', sharedpointer_1.SharedPtr.make(cxxvector_1.CxxVector.make(actor_1.Actor.ref())), { this: CommandSelectorBase, structureReturn: true }, commandorigin_1.CommandOrigin);
let WildcardCommandSelector = WildcardCommandSelector_1 = class WildcardCommandSelector extends CommandSelectorBase {
    static make(type) {
        class WildcardCommandSelectorImpl extends WildcardCommandSelector_1 {
        }
        Object.defineProperty(WildcardCommandSelectorImpl, 'name', { value: templatename_1.templateName('WildcardCommandSelector', type.name) });
        WildcardCommandSelectorImpl.define({});
        return WildcardCommandSelectorImpl;
    }
};
WildcardCommandSelector = WildcardCommandSelector_1 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], WildcardCommandSelector);
exports.WildcardCommandSelector = WildcardCommandSelector;
exports.ActorWildcardCommandSelector = WildcardCommandSelector.make(actor_1.Actor);
exports.ActorWildcardCommandSelector.prototype[nativetype_1.NativeType.ctor] = function () {
    CommandSelectorBaseCtor(this, false);
};
let CommandRawText = class CommandRawText extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], CommandRawText.prototype, "text", void 0);
CommandRawText = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], CommandRawText);
exports.CommandRawText = CommandRawText;
let CommandContext = class CommandContext extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], CommandContext.prototype, "command", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(commandorigin_1.CommandOrigin.ref())
], CommandContext.prototype, "origin", void 0);
CommandContext = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x30)
], CommandContext);
exports.CommandContext = CommandContext;
let CommandOutput = class CommandOutput extends nativeclass_1.NativeClass {
};
CommandOutput = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CommandOutput);
exports.CommandOutput = CommandOutput;
let CommandOutputSender = class CommandOutputSender extends nativeclass_1.NativeClass {
};
CommandOutputSender = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CommandOutputSender);
exports.CommandOutputSender = CommandOutputSender;
let MinecraftCommands = class MinecraftCommands extends nativeclass_1.NativeClass {
    executeCommand(ctx, b) {
        common_1.abstract();
    }
    getRegistry() {
        common_1.abstract();
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(CommandOutputSender.ref())
], MinecraftCommands.prototype, "sender", void 0);
MinecraftCommands = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MinecraftCommands);
exports.MinecraftCommands = MinecraftCommands;
var CommandParameterDataType;
(function (CommandParameterDataType) {
    CommandParameterDataType[CommandParameterDataType["NORMAL"] = 0] = "NORMAL";
    CommandParameterDataType[CommandParameterDataType["ENUM"] = 1] = "ENUM";
    CommandParameterDataType[CommandParameterDataType["SOFT_ENUM"] = 2] = "SOFT_ENUM";
})(CommandParameterDataType = exports.CommandParameterDataType || (exports.CommandParameterDataType = {}));
const parsers = new Map();
let CommandParameterData = class CommandParameterData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(typeid_1.typeid_t)
], CommandParameterData.prototype, "tid", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], CommandParameterData.prototype, "parser", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], CommandParameterData.prototype, "name", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], CommandParameterData.prototype, "desc", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], CommandParameterData.prototype, "unk56", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], CommandParameterData.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], CommandParameterData.prototype, "offset", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], CommandParameterData.prototype, "flag_offset", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], CommandParameterData.prototype, "optional", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], CommandParameterData.prototype, "pad73", void 0);
CommandParameterData = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], CommandParameterData);
exports.CommandParameterData = CommandParameterData;
let CommandVFTable = class CommandVFTable extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], CommandVFTable.prototype, "destructor", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], CommandVFTable.prototype, "execute", void 0);
CommandVFTable = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], CommandVFTable);
exports.CommandVFTable = CommandVFTable;
let Command = class Command extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.vftable = null;
        this.u3 = -1;
        this.u1 = 0;
        this.u2 = null;
        this.u4 = 5;
    }
    static mandatory(key, keyForIsSet, desc, type = CommandParameterDataType.NORMAL, name = key) {
        const cmdclass = this;
        const paramType = cmdclass.typeOf(key);
        const param = new CommandParameterData(true);
        param.construct();
        param.tid.id = typeid_1.type_id(CommandRegistry, paramType).id;
        param.parser = CommandRegistry.getParser(paramType);
        param.name = name;
        param.type = type;
        if (desc != null) {
            const descbuf = Buffer.from(desc, 'utf-8');
            core_1.chakraUtil.JsAddRef(descbuf);
            const ptr = new core_1.NativePointer;
            ptr.setAddressFromBuffer(descbuf);
            param.desc = ptr;
        }
        else {
            param.desc = null;
        }
        param.unk56 = -1;
        param.offset = cmdclass.offsetOf(key);
        param.flag_offset = keyForIsSet !== null ? cmdclass.offsetOf(keyForIsSet) : -1;
        param.optional = false;
        param.pad73 = false;
        return param;
    }
    static optional(key, keyForIsSet, desc, type = CommandParameterDataType.NORMAL, name = key) {
        const cmdclass = this;
        const paramType = cmdclass.typeOf(key);
        const param = new CommandParameterData(true);
        param.construct();
        param.tid.id = typeid_1.type_id(CommandRegistry, paramType).id;
        param.parser = CommandRegistry.getParser(paramType);
        param.name = name;
        param.type = type;
        if (desc != null) {
            const ptr = new core_1.NativePointer;
            ptr.setAddressFromBuffer(assembler_1.asm.const_str(desc));
            param.desc = ptr;
        }
        else {
            param.desc = null;
        }
        param.unk56 = -1;
        param.offset = cmdclass.offsetOf(key);
        param.flag_offset = keyForIsSet !== null ? cmdclass.offsetOf(keyForIsSet) : -1;
        param.optional = true;
        param.pad73 = false;
        return param;
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(CommandVFTable.ref())
], Command.prototype, "vftable", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], Command.prototype, "u1", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], Command.prototype, "u2", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], Command.prototype, "u3", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int16_t)
], Command.prototype, "u4", void 0);
Command = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], Command);
exports.Command = Command;
(function (Command) {
    Command.VFTable = CommandVFTable;
})(Command = exports.Command || (exports.Command = {}));
exports.Command = Command;
class CommandRegistry extends typeid_1.HasTypeId {
    registerCommand(command, description, level, flag1, flag2) {
        common_1.abstract();
    }
    registerAlias(command, alias) {
        common_1.abstract();
    }
    /**
     * this method will destruct all parameters in params
     */
    registerOverload(name, commandClass, params) {
        const cls = commandClass;
        const size = cls[nativetype_1.NativeType.size];
        if (!size)
            throw Error(`${cls.name}: size is not defined`);
        const allocator = makefunc_1.makefunc.np((returnval) => {
            const ptr = capi_1.capi.malloc(size);
            const cmd = ptr.as(cls);
            cmd.construct();
            returnval.setPointer(cmd);
            return returnval;
        }, core_1.StaticPointer, null, core_1.StaticPointer);
        const sig = this.findCommand(name);
        if (sig === null)
            throw Error(`${name}: command not found`);
        const overload = new CommandRegistry.Overload(true);
        overload.construct();
        overload.commandVersion = bin_1.bin.make64(1, 0x7fffffff);
        overload.allocator = allocator;
        overload.parameters.setFromArray(params);
        overload.u6 = -1;
        sig.overloads.push(overload);
        this.registerOverloadInternal(sig, overload);
        overload.destruct();
        for (const param of params) {
            param.destruct();
        }
    }
    registerOverloadInternal(signature, overload) {
        common_1.abstract();
    }
    findCommand(command) {
        common_1.abstract();
    }
    static getParser(type) {
        const parser = parsers.get(type);
        if (parser !== undefined)
            return parser;
        throw Error(`${type.name} parser not found`);
    }
}
exports.CommandRegistry = CommandRegistry;
(function (CommandRegistry) {
    let Overload = class Overload extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.bin64_t)
    ], Overload.prototype, "commandVersion", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(core_1.VoidPointer)
    ], Overload.prototype, "allocator", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(cxxvector_1.CxxVector.make(CommandParameterData))
    ], Overload.prototype, "parameters", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.int32_t)
    ], Overload.prototype, "u6", void 0);
    Overload = tslib_1.__decorate([
        nativeclass_1.nativeClass(0x30)
    ], Overload);
    CommandRegistry.Overload = Overload;
    let Signature = class Signature extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.CxxString)
    ], Signature.prototype, "command", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.CxxString)
    ], Signature.prototype, "description", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(cxxvector_1.CxxVector.make(CommandRegistry.Overload))
    ], Signature.prototype, "overloads", void 0);
    Signature = tslib_1.__decorate([
        nativeclass_1.nativeClass(null)
    ], Signature);
    CommandRegistry.Signature = Signature;
    let ParseToken = class ParseToken extends nativeclass_1.NativeClass {
    };
    ParseToken = tslib_1.__decorate([
        nativeclass_1.nativeClass(null)
    ], ParseToken);
    CommandRegistry.ParseToken = ParseToken;
})(CommandRegistry = exports.CommandRegistry || (exports.CommandRegistry = {}));
function loadParserFromPdb(types) {
    const symbols = types.map(type => templatename_1.templateName('CommandRegistry::parse', type.name));
    core_1.pdb.setOptions(dbghelp_1.SYMOPT_PUBLICS_ONLY); // i don't know why but CommandRegistry::parse<bool> does not found without it.
    const addrs = core_1.pdb.getList(core_1.pdb.coreCachePath, {}, symbols, false, dbghelp_1.UNDNAME_NAME_ONLY);
    core_1.pdb.setOptions(0);
    for (let i = 0; i < symbols.length; i++) {
        const addr = addrs[symbols[i]];
        if (addr === undefined)
            continue;
        parsers.set(types[i], addr);
    }
}
const types = [nativetype_1.int32_t, nativetype_1.float32_t, nativetype_1.bool_t, nativetype_1.CxxString, exports.ActorWildcardCommandSelector, blockpos_1.RelativeFloat, CommandRawText];
typeid_1.type_id.pdbimport(CommandRegistry, types);
loadParserFromPdb(types);
// MinecraftCommands.prototype.executeCommand is defined at bdsx/command.ts
MinecraftCommands.prototype.getRegistry = proc_1.procHacker.js('MinecraftCommands::getRegistry', CommandRegistry, { this: MinecraftCommands });
CommandRegistry.prototype.registerOverloadInternal = proc_1.procHacker.js('CommandRegistry::registerOverloadInternal', nativetype_1.void_t, { this: CommandRegistry }, CommandRegistry.Signature, CommandRegistry.Overload);
CommandRegistry.prototype.registerCommand = proc_1.procHacker.js("CommandRegistry::registerCommand", nativetype_1.void_t, { this: CommandRegistry }, nativetype_1.CxxString, makefunc_1.makefunc.Utf8, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
CommandRegistry.prototype.registerAlias = proc_1.procHacker.js("CommandRegistry::registerAlias", nativetype_1.void_t, { this: CommandRegistry }, nativetype_1.CxxString, nativetype_1.CxxString);
CommandRegistry.prototype.findCommand = proc_1.procHacker.js("CommandRegistry::findCommand", CommandRegistry.Signature, { this: CommandRegistry }, nativetype_1.CxxString);
'CommandRegistry::parse<AutomaticID<Dimension,int> >';
'CommandRegistry::parse<Block const * __ptr64>';
'CommandRegistry::parse<CommandFilePath>';
'CommandRegistry::parse<CommandIntegerRange>';
'CommandRegistry::parse<CommandItem>';
'CommandRegistry::parse<CommandMessage>';
'CommandRegistry::parse<CommandPosition>';
'CommandRegistry::parse<CommandPositionFloat>';
'CommandRegistry::parse<CommandRawText>';
'CommandRegistry::parse<CommandSelector<Actor> >';
'CommandRegistry::parse<CommandSelector<Player> >';
'CommandRegistry::parse<CommandWildcardInt>';
'CommandRegistry::parse<Json::Value>';
'CommandRegistry::parse<MobEffect const * __ptr64>';
'CommandRegistry::parse<std::basic_string<char,struct std::char_traits<char>,class std::allocator<char> > >';
'CommandRegistry::parse<std::unique_ptr<Command,struct std::default_delete<Command> > >';
'CommandRegistry::parse<AgentCommand::Mode>';
'CommandRegistry::parse<AgentCommands::CollectCommand::CollectionSpecification>';
'CommandRegistry::parse<AgentCommands::Direction>';
'CommandRegistry::parse<AnimationMode>';
'CommandRegistry::parse<AreaType>';
'CommandRegistry::parse<BlockSlot>';
'CommandRegistry::parse<CodeBuilderCommand::Action>';
'CommandRegistry::parse<CommandOperator>';
'CommandRegistry::parse<Enchant::Type>';
'CommandRegistry::parse<EquipmentSlot>';
'CommandRegistry::parse<GameType>';
'CommandRegistry::parse<Mirror>';
'CommandRegistry::parse<ObjectiveSortOrder>';
'CommandRegistry::parse<Rotation>';
'CommandRegistry::parse<ActorDefinitionIdentifier const * __ptr64>';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUM7QUFDbkMsZ0NBQTZCO0FBQzdCLGtDQUErQjtBQUMvQixzQ0FBcUM7QUFDckMsa0NBQXFGO0FBQ3JGLDRDQUF5QztBQUN6Qyx3Q0FBb0U7QUFDcEUsMENBQXVDO0FBQ3ZDLGdEQUFvRztBQUNwRyw4Q0FBNEg7QUFDNUgsb0RBQTZDO0FBQzdDLGtEQUErQztBQUMvQyxtQ0FBZ0M7QUFDaEMseUNBQTJDO0FBQzNDLG1EQUFnRDtBQUNoRCxpQ0FBb0M7QUFDcEMscUNBQXdEO0FBRXhELElBQVksc0JBTVg7QUFORCxXQUFZLHNCQUFzQjtJQUNqQyx1RUFBTSxDQUFBO0lBQ04sMkVBQVEsQ0FBQTtJQUNSLG1FQUFJLENBQUE7SUFDSiwrRUFBVSxDQUFBO0lBQ1YscUVBQUssQ0FBQTtBQUNOLENBQUMsRUFOVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQU1qQztBQUVELElBQVksV0FFWDtBQUZELFdBQVksV0FBVztJQUNuQiw2Q0FBa0IsQ0FBQTtBQUN0QixDQUFDLEVBRlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFFdEI7QUFHRCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEseUJBQVc7Q0FHeEMsQ0FBQTtBQURHO0lBREMseUJBQVcsQ0FBQyxxQkFBUSxDQUFDO3dDQUNOO0FBRlAsUUFBUTtJQURwQix5QkFBVyxFQUFFO0dBQ0QsUUFBUSxDQUdwQjtBQUhZLDRCQUFRO0FBTXJCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEseUJBQVc7SUFDeEMsV0FBVyxDQUFDLE1BQW9CO1FBQ3BDLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxVQUFVLENBQUMsTUFBb0I7UUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFN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QUF3QyxDQUFDO0FBQ3pDLHlDQUF5QyxDQUFDO0FBQzFDLDhDQUE4QyxDQUFDO0FBQy9DLHdDQUF3QyxDQUFDO0FBQ3pDLGlEQUFpRCxDQUFDO0FBQ2xELGtEQUFrRCxDQUFDO0FBQ25ELDRDQUE0QyxDQUFDO0FBQzdDLHFDQUFxQyxDQUFDO0FBQ3RDLG1EQUFtRCxDQUFDO0FBQ3BELDRHQUE0RyxDQUFDO0FBQzdHLHdGQUF3RixDQUFDO0FBQ3pGLDRDQUE0QyxDQUFDO0FBQzdDLGdGQUFnRixDQUFDO0FBQ2pGLGtEQUFrRCxDQUFDO0FBQ25ELHVDQUF1QyxDQUFDO0FBQ3hDLGtDQUFrQyxDQUFDO0FBQ25DLG1DQUFtQyxDQUFDO0FBQ3BDLG9EQUFvRCxDQUFDO0FBQ3JELHlDQUF5QyxDQUFDO0FBQzFDLHVDQUF1QyxDQUFDO0FBQ3hDLHVDQUF1QyxDQUFDO0FBQ3hDLGtDQUFrQyxDQUFDO0FBQ25DLGdDQUFnQyxDQUFDO0FBQ2pDLDRDQUE0QyxDQUFDO0FBQzdDLGtDQUFrQyxDQUFDO0FBQ25DLG1FQUFtRSxDQUFDIn0=