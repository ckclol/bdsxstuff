"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const common_1 = require("bdsx/common");
const krevent_1 = require("krevent");
const source_map_support_1 = require("./source-map-support");
const PACKET_ID_COUNT = 0x100;
const PACKET_EVENT_COUNT = 0x500;
function getNetEventTarget(type, packetId) {
    if ((packetId >>> 0) >= PACKET_ID_COUNT) {
        throw Error(`Out of range: packetId < 0x100 (packetId=${packetId})`);
    }
    const id = type * PACKET_ID_COUNT + packetId;
    let target = packetAllTargets[id];
    if (target !== null)
        return target;
    packetAllTargets[id] = target = new krevent_1.default;
    return target;
}
const packetAllTargets = new Array(PACKET_EVENT_COUNT);
for (let i = 0; i < PACKET_EVENT_COUNT; i++) {
    packetAllTargets[i] = null;
}
var events;
(function (events) {
    ////////////////////////////////////////////////////////
    // Block events
    /** Cancellable */
    events.blockDestroy = new krevent_1.default();
    /** Cancellable */
    events.blockPlace = new krevent_1.default();
    /** Not cancellable */
    events.pistonMove = new krevent_1.default();
    ////////////////////////////////////////////////////////
    // Entity events
    /** Cancellable */
    events.entityHurt = new krevent_1.default();
    /** Cancellable */
    events.entityHeal = new krevent_1.default();
    /** Cancellable */
    events.playerAttack = new krevent_1.default();
    /** Cancellable but only when player is in container screens*/
    events.playerDropItem = new krevent_1.default();
    /** Not cancellable */
    events.entitySneak = new krevent_1.default();
    /** Not cancellable */
    events.entityCreated = new krevent_1.default();
    /** Not cancellable */
    events.playerJoin = new krevent_1.default();
    /** Cancellable */
    events.playerPickupItem = new krevent_1.default();
    /** Not cancellable */
    events.playerCrit = new krevent_1.default();
    /** Not cancellable */
    events.playerUseItem = new krevent_1.default();
    ////////////////////////////////////////////////////////
    // Server events
    /**
     * before launched. after execute the main thread of BDS.
     * BDS will be loaded on the separated thread. this event will be executed concurrently with the BDS loading
     */
    events.serverLoading = new krevent_1.default();
    /**
     * after BDS launched
     */
    events.serverOpen = new krevent_1.default();
    /**
     * on tick
     */
    events.serverUpdate = new krevent_1.default();
    /**
     * before system.shutdown, Minecraft is alive yet
     */
    events.serverStop = new krevent_1.default();
    /**
     * after BDS closed
     */
    events.serverClose = new krevent_1.default();
    /**
     * server console outputs
     */
    events.serverLog = new krevent_1.default();
    ////////////////////////////////////////////////////////
    // Packet events
    let PacketEventType;
    (function (PacketEventType) {
        PacketEventType[PacketEventType["Raw"] = 0] = "Raw";
        PacketEventType[PacketEventType["Before"] = 1] = "Before";
        PacketEventType[PacketEventType["After"] = 2] = "After";
        PacketEventType[PacketEventType["Send"] = 3] = "Send";
        PacketEventType[PacketEventType["SendRaw"] = 4] = "SendRaw";
    })(PacketEventType = events.PacketEventType || (events.PacketEventType = {}));
    function packetEvent(type, packetId) {
        if ((packetId >>> 0) >= PACKET_ID_COUNT) {
            console.error(`Out of range: packetId < 0x100 (type=${PacketEventType[type]}, packetId=${packetId})`);
            return null;
        }
        const id = type * PACKET_ID_COUNT + packetId;
        return packetAllTargets[id];
    }
    events.packetEvent = packetEvent;
    /**
     * before 'before' and 'after'
     * earliest event for the packet receiving.
     * It will bring raw packet buffers before parsing
     * It will cancel the packet if you return false
     */
    function packetRaw(id) {
        return getNetEventTarget(PacketEventType.Raw, id);
    }
    events.packetRaw = packetRaw;
    /**
     * after 'raw', before 'after'
     * the event that before processing but after parsed from raw.
     */
    function packetBefore(id) {
        return getNetEventTarget(PacketEventType.Before, id);
    }
    events.packetBefore = packetBefore;
    /**
     * after 'raw' and 'before'
     * the event that after processing. some fields are assigned after the processing
     */
    function packetAfter(id) {
        return getNetEventTarget(PacketEventType.After, id);
    }
    events.packetAfter = packetAfter;
    /**
     * before serializing.
     * it can modify class fields.
     */
    function packetSend(id) {
        return getNetEventTarget(PacketEventType.Send, id);
    }
    events.packetSend = packetSend;
    /**
     * after serializing. before sending.
     * it can access serialized buffer.
     */
    function packetSendRaw(id) {
        return getNetEventTarget(PacketEventType.SendRaw, id);
    }
    events.packetSendRaw = packetSendRaw;
    ////////////////////////////////////////////////////////
    // Misc
    /** Not cancellable */
    events.queryRegenerate = new krevent_1.default();
    /**
    * global error listeners
    * if returns CANCEL, then default error printing is disabled
    */
    events.error = new krevent_1.default();
    function errorFire(err) {
        if (err instanceof Error) {
            err.stack = source_map_support_1.remapStack(err.stack);
        }
        if (events.error.fire(err) !== common_1.CANCEL) {
            console.error(err && (err.stack || err));
        }
    }
    events.errorFire = errorFire;
    /**
     * command console outputs
     */
    events.commandOutput = new krevent_1.default();
    /**
     * command input
     */
    events.command = new krevent_1.default();
    /**
      * network identifier disconnected
      */
    events.networkDisconnected = new krevent_1.default();
})(events = exports.events || (exports.events = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBcUM7QUFFckMscUNBQTRCO0FBUTVCLDZEQUFrRDtBQUVsRCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFDOUIsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFFakMsU0FBUyxpQkFBaUIsQ0FBQyxJQUEyQixFQUFFLFFBQTJCO0lBQy9FLElBQUksQ0FBQyxRQUFRLEtBQUcsQ0FBQyxDQUFDLElBQUksZUFBZSxFQUFFO1FBQ25DLE1BQU0sS0FBSyxDQUFDLDRDQUE0QyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0tBQ3hFO0lBQ0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7SUFDM0MsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBQ25DLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLGlCQUFLLENBQUM7SUFDMUMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxLQUFLLENBQTZDLGtCQUFrQixDQUFDLENBQUM7QUFDbkcsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGtCQUFrQixFQUFDLENBQUMsRUFBRSxFQUFFO0lBQ25DLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUM5QjtBQUdELElBQWlCLE1BQU0sQ0EwS3RCO0FBMUtELFdBQWlCLE1BQU07SUFFbkIsd0RBQXdEO0lBQ3hELGVBQWU7SUFFZixrQkFBa0I7SUFDTCxtQkFBWSxHQUFHLElBQUksaUJBQUssRUFBK0MsQ0FBQztJQUNyRixrQkFBa0I7SUFDTCxpQkFBVSxHQUFHLElB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