"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PistonMoveEvent = exports.PistonAction = exports.BlockPlaceEvent = exports.BlockDestroyEvent = void 0;
const actor_1 = require("../bds/actor");
const block_1 = require("../bds/block");
const blockpos_1 = require("../bds/blockpos");
const gamemode_1 = require("../bds/gamemode");
const proc_1 = require("../bds/proc");
const common_1 = require("../common");
const core_1 = require("../core");
const event_1 = require("../event");
const nativetype_1 = require("../nativetype");
class BlockDestroyEvent {
    constructor(player, blockPos) {
        this.player = player;
        this.blockPos = blockPos;
    }
}
exports.BlockDestroyEvent = BlockDestroyEvent;
class BlockPlaceEvent {
    constructor(player, block, blockSource, blockPos) {
        this.player = player;
        this.block = block;
        this.blockSource = blockSource;
        this.blockPos = blockPos;
    }
}
exports.BlockPlaceEvent = BlockPlaceEvent;
function onBlockDestroy(survivalMode, blockPos, v) {
    const event = new BlockDestroyEvent(survivalMode.actor, blockPos);
    if (event_1.events.blockDestroy.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        survivalMode.actor = event.player;
        return _onBlockDestroy(survivalMode, event.blockPos, v);
    }
}
function onBlockDestroyCreative(gameMode, blockPos, v) {
    const event = new BlockDestroyEvent(gameMode.actor, blockPos);
    if (event_1.events.blockDestroy.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        gameMode.actor = event.player;
        return _onBlockDestroyCreative(gameMode, event.blockPos, v);
    }
}
const _onBlockDestroy = proc_1.procHacker.hooking("SurvivalMode::destroyBlock", nativetype_1.bool_t, null, gamemode_1.SurvivalMode, blockpos_1.BlockPos, nativetype_1.int32_t)(onBlockDestroy);
const _onBlockDestroyCreative = proc_1.procHacker.hooking("GameMode::_creativeDestroyBlock", nativetype_1.bool_t, null, gamemode_1.SurvivalMode, blockpos_1.BlockPos, nativetype_1.int32_t)(onBlockDestroyCreative);
function onBlockPlace(blockSource, block, blockPos, v1, actor, v2) {
    const event = new BlockPlaceEvent(actor, block, blockSource, blockPos);
    if (event_1.events.blockPlace.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        return _onBlockPlace(event.blockSource, event.block, event.blockPos, v1, event.player, v2);
    }
}
const _onBlockPlace = proc_1.procHacker.hooking("BlockSource::mayPlace", nativetype_1.bool_t, null, block_1.BlockSource, block_1.Block, blockpos_1.BlockPos, nativetype_1.int32_t, actor_1.Actor, nativetype_1.bool_t)(onBlockPlace);
var PistonAction;
(function (PistonAction) {
    PistonAction[PistonAction["Extend"] = 1] = "Extend";
    PistonAction[PistonAction["Retract"] = 3] = "Retract";
})(PistonAction = exports.PistonAction || (exports.PistonAction = {}));
class PistonMoveEvent {
    constructor(blockPos, blockSource, action) {
        this.blockPos = blockPos;
        this.blockSource = blockSource;
        this.action = action;
    }
}
exports.PistonMoveEvent = PistonMoveEvent;
function onPistonMove(pistonBlockActor, blockSource) {
    const event = new PistonMoveEvent(blockpos_1.BlockPos.create(pistonBlockActor.getInt32(0x2C), pistonBlockActor.getUint32(0x30), pistonBlockActor.getInt32(0x34)), blockSource, pistonBlockActor.getInt8(0xE0));
    event_1.events.pistonMove.fire(event);
    return _onPistonMove(pistonBlockActor, event.blockSource);
}
const _onPistonMove = proc_1.procHacker.hooking("?_spawnMovingBlocks@PistonBlockActor@@AEAAXAEAVBlockSource@@@Z", nativetype_1.void_t, null, core_1.NativePointer, block_1.BlockSource)(onPistonMove);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsb2NrZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXFDO0FBQ3JDLHdDQUFrRDtBQUNsRCw4Q0FBMkM7QUFDM0MsOENBQXlEO0FBRXpELHNDQUF5QztBQUN6QyxzQ0FBbUM7QUFDbkMsa0NBQXdDO0FBQ3hDLG9DQUFrQztBQUNsQyw4Q0FBd0Q7QUFNeEQsTUFBYSxpQkFBaUI7SUFDMUIsWUFDVyxNQUFjLEVBQ2QsUUFBa0I7UUFEbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVU7SUFFN0IsQ0FBQztDQUNKO0FBTkQsOENBTUM7QUFRRCxNQUFhLGVBQWU7SUFDeEIsWUFDVyxNQUFjLEVBQ2QsS0FBWSxFQUNaLFdBQXdCLEVBQ3hCLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUU3QixDQUFDO0NBQ0o7QUFSRCwwQ0FRQztBQUVELFNBQVMsY0FBYyxDQUFDLFlBQXlCLEVBQUUsUUFBaUIsRUFBRSxDQUFRO0lBQzFFLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RSxJQUFJLGNBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGVBQU0sRUFBRTtRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNO1FBQ0gsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2xDLE9BQU8sZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzNEO0FBQ0wsQ0FBQztBQUNELFNBQVMsc0JBQXNC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