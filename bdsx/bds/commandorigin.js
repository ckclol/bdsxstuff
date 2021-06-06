"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerCommandOrigin = exports.ScriptCommandOrigin = exports.PlayerCommandOrigin = exports.CommandOrigin = void 0;
const tslib_1 = require("tslib");
const blockpos_1 = require("bdsx/bds/blockpos");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const mce_1 = require("bdsx/mce");
const nativeclass_1 = require("bdsx/nativeclass");
const makefunc_1 = require("../makefunc");
const nativetype_1 = require("../nativetype");
const actor_1 = require("./actor");
const dimension_1 = require("./dimension");
const level_1 = require("./level");
const symbols_1 = require("./symbols");
let CommandOrigin = class CommandOrigin extends nativeclass_1.NativeClass {
    constructWith(vftable, level) {
        this.vftable = vftable;
        this.level = level;
        this.uuid = mce_1.mce.UUID.generate();
    }
    isServerCommandOrigin() {
        return this.vftable.equals(ServerCommandOrigin_vftable);
    }
    /**
     * @deprecated use cmdorigin.destruct();
     */
    destructor() {
        common_1.abstract();
    }
    getRequestId() {
        common_1.abstract();
    }
    getName() {
        common_1.abstract();
    }
    getBlockPosition() {
        common_1.abstract();
    }
    getWorldPosition() {
        common_1.abstract();
    }
    getLevel() {
        common_1.abstract();
    }
    /**
     * actually, it's nullable when the server is just started without any joining
     */
    getDimension() {
        common_1.abstract();
    }
    /**
     * it returns null if the command origin is the console
     */
    getEntity() {
        common_1.abstract();
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], CommandOrigin.prototype, "vftable", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(mce_1.mce.UUID)
], CommandOrigin.prototype, "uuid", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(level_1.ServerLevel.ref())
], CommandOrigin.prototype, "level", void 0);
CommandOrigin = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CommandOrigin);
exports.CommandOrigin = CommandOrigin;
let PlayerCommandOrigin = class PlayerCommandOrigin extends CommandOrigin {
};
PlayerCommandOrigin = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerCommandOrigin);
exports.PlayerCommandOrigin = PlayerCommandOrigin;
let ScriptCommandOrigin = class ScriptCommandOrigin extends PlayerCommandOrigin {
};
ScriptCommandOrigin = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ScriptCommandOrigin);
exports.ScriptCommandOrigin = ScriptCommandOrigin;
let ServerCommandOrigin = class ServerCommandOrigin extends CommandOrigin {
};
ServerCommandOrigin = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x58)
], ServerCommandOrigin);
exports.ServerCommandOrigin = ServerCommandOrigin;
const ServerCommandOrigin_vftable = symbols_1.proc["ServerCommandOrigin::`vftable'"];
// void destruct(CommandOrigin* origin);
CommandOrigin.prototype.destruct = makefunc_1.makefunc.js([0x00], nativetype_1.void_t, { this: CommandOrigin });
// std::string CommandOrigin::getRequestId();
CommandOrigin.prototype.getRequestId = makefunc_1.makefunc.js([0x08], nativetype_1.CxxString, { this: CommandOrigin, structureReturn: true });
// std::string CommandOrigin::getName();
CommandOrigin.prototype.getName = makefunc_1.makefunc.js([0x10], nativetype_1.CxxString, { this: CommandOrigin, structureReturn: true });
// BlockPos CommandOrigin::getBlockPosition();
CommandOrigin.prototype.getBlockPosition = makefunc_1.makefunc.js([0x18], blockpos_1.BlockPos, { this: CommandOrigin, structureReturn: true });
// Vec3 getWorldPosition(CommandOrigin* origin);
CommandOrigin.prototype.getWorldPosition = makefunc_1.makefunc.js([0x20], blockpos_1.Vec3, { this: CommandOrigin, structureReturn: true });
// Level* getLevel(CommandOrigin* origin);
CommandOrigin.prototype.getLevel = makefunc_1.makefunc.js([0x28], level_1.Level, { this: CommandOrigin });
// Dimension* (*getDimension)(CommandOrigin* origin);
CommandOrigin.prototype.getDimension = makefunc_1.makefunc.js([0x30], dimension_1.Dimension, { this: CommandOrigin });
// Actor* getEntity(CommandOrigin* origin);
CommandOrigin.prototype.getEntity = makefunc_1.makefunc.js([0x38], actor_1.Actor, { this: CommandOrigin });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZG9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmRvcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGdEQUFtRDtBQUNuRCx3Q0FBdUM7QUFDdkMsb0NBQXdDO0FBQ3hDLGtDQUErQjtBQUMvQixrREFBeUU7QUFDekUsMENBQXVDO0FBQ3ZDLDhDQUFrRDtBQUNsRCxtQ0FBZ0M7QUFDaEMsMkNBQXdDO0FBQ3hDLG1DQUE2QztBQUM3Qyx1Q0FBaUM7QUFHakMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLHlCQUFXO0lBUTFDLGFBQWEsQ0FBQyxPQUFtQixFQUFFLEtBQWlCO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ04saUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELFlBQVk7UUFDUixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsT0FBTztRQUNILGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxnQkFBZ0I7UUFDWixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ1osaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELFFBQVE7UUFDSixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1IsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNEOztPQUVHO0lBQ0gsU0FBUztRQUNMLGlCQUFR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