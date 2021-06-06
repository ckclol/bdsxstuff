"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nethook = void 0;
const tslib_1 = require("tslib");
const assembler_1 = require("./assembler");
const networkidentifier_1 = require("./bds/networkidentifier");
const packet_1 = require("./bds/packet");
const packetids_1 = require("./bds/packetids");
const packets_1 = require("./bds/packets");
const proc_1 = require("./bds/proc");
const common_1 = require("./common");
const core_1 = require("./core");
const event_1 = require("./event");
const launcher_1 = require("./launcher");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const sharedpointer_1 = require("./sharedpointer");
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
const asmcode = require("./asm/asmcode");
let ReadOnlyBinaryStream = class ReadOnlyBinaryStream extends nativeclass_1.NativeClass {
    read(dest, size) {
        common_1.abstract();
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(pointer_1.CxxStringWrapper.ref(), 0x38)
], ReadOnlyBinaryStream.prototype, "data", void 0);
ReadOnlyBinaryStream = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ReadOnlyBinaryStream);
ReadOnlyBinaryStream.prototype.read = makefunc_1.makefunc.js([0x8], nativetype_1.bool_t, { this: ReadOnlyBinaryStream }, core_1.VoidPointer, nativetype_1.int64_as_float_t);
let OnPacketRBP = class OnPacketRBP extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(sharedpointer_1.SharedPtr.make(packet_1.Packet), 0x50)
], OnPacketRBP.prototype, "packet", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(ReadOnlyBinaryStream, 0xa0)
], OnPacketRBP.prototype, "stream", void 0);
OnPacketRBP = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], OnPacketRBP);
let sendInternalOriginal;
var nethook;
(function (nethook) {
    /**
     * @deprecated
     */
    let EventType;
    (function (EventType) {
        EventType[EventType["Raw"] = 0] = "Raw";
        EventType[EventType["Before"] = 1] = "Before";
        EventType[EventType["After"] = 2] = "After";
        EventType[EventType["Send"] = 3] = "Send";
        EventType[EventType["SendRaw"] = 4] = "SendRaw";
    })(EventType = nethook.EventType || (nethook.EventType = {}));
    /**
     * @deprecated just use `connreq.cert.get*()` from LoginPacket directly
     * @param ptr login packet pointer
     * @return [xuid, username]
     */
    function readLoginPacket(packet) {
        const loginpacket = new packets_1.LoginPacket(packet);
        const conn = loginpacket.connreq;
        if (conn !== null) {
            const cert = conn.cert;
            if (cert !== null) {
                return [cert.getXuid(), cert.getId()];
            }
        }
        throw Error('LoginPacket does not have cert info');
    }
    nethook.readLoginPacket = readLoginPacket;
    /**
     * @deprecated use *Packet.create() instead
     */
    nethook.createPacket = packet_1.createPacket;
    /**
     * @deprecated use packet.sendTo instead
     */
    function sendPacket(networkIdentifier, packet, unknownarg = 0) {
        new packet_1.Packet(packet).sendTo(networkIdentifier, 0);
    }
    nethook.sendPacket = sendPacket;
    /**
     * @deprecated use events.packetRaw
     */
    function raw(id) {
        return event_1.events.packetRaw(id);
    }
    nethook.raw = raw;
    /**
     * @deprecated use events.packetBefore
     */
    function before(id) {
        return event_1.events.packetBefore(id);
    }
    nethook.before = before;
    /**
     * @deprecated use events.packetAfter
     */
    function after(id) {
        return event_1.events.packetAfter(id);
    }
    nethook.after = after;
    /**
     * @deprecated use events.packetSend
     */
    function send(id) {
        return event_1.events.packetSend(id);
    }
    nethook.send = send;
    /**
     * @deprecated use events.packetSendRaw
     */
    function sendRaw(id) {
        return event_1.events.packetSendRaw(id);
    }
    nethook.sendRaw = sendRaw;
    /**
     * @deprecated use events.networkDisconnected
     */
    nethook.close = networkidentifier_1.NetworkIdentifier.close;
    /**
     * Write all packets to console
     */
    function watchAll(exceptions = [
        packetids_1.MinecraftPacketIds.ClientCacheBlobStatus,
        packetids_1.MinecraftPacketIds.LevelChunk,
        packetids_1.MinecraftPacketIds.ClientCacheMissResponse,
        packetids_1.MinecraftPacketIds.MoveActorDelta,
        packetids_1.MinecraftPacketIds.SetActorMotion,
        packetids_1.MinecraftPacketIds.SetActorData,
    ]) {
        const ex = new Set(exceptions);
        for (let i = 1; i <= 0xa3; i++) {
            if (ex.has(i))
                continue;
            event_1.events.packetBefore(i).on((ptr, ni, id) => {
                console.log(`R ${packetids_1.MinecraftPacketIds[id]}(${id}) ${util_1.hex(ptr.getBuffer(0x10, 0x28))}`);
            });
        }
        for (let i = 1; i <= 0xa3; i++) {
            if (ex.has(i))
                continue;
            event_1.events.packetSend(i).on((ptr, ni, id) => {
                console.log(`S ${packetids_1.MinecraftPacketIds[id]}(${id}) ${util_1.hex(ptr.getBuffer(0x10, 0x28))}`);
            });
        }
    }
    nethook.watchAll = watchAll;
})(nethook = exports.nethook || (exports.nethook = {}));
function onPacketRaw(rbp, packetId, conn) {
    try {
        const target = event_1.events.packetEvent(event_1.events.PacketEventType.Raw, packetId);
        const ni = conn.networkIdentifier;
        nethook.lastSender = ni;
        if (target !== null && !target.isEmpty()) {
            const s = rbp.stream;
            const data = s.data;
            const rawpacketptr = data.valueptr;
            for (const listener of target.allListeners()) {
                try {
                    const ptr = rawpacketptr.add();
                    if (listener(ptr, data.length, ni, packetId) === common_1.CANCEL) {
                        util_1._tickCallback();
                        return null;
                    }
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
            util_1._tickCallback();
        }
        return packet_1.createPacketRaw(rbp.packet, packetId);
    }
    catch (err) {
        source_map_support_1.remapAndPrintError(err);
        return null;
    }
}
function onPacketBefore(result, rbp, packetId) {
    try {
        if (result.streamReadResult !== packet_1.StreamReadResult.Pass)
            return result;
        const target = event_1.events.packetEvent(event_1.events.PacketEventType.Before, packetId);
        if (target !== null && !target.isEmpty()) {
            const packet = rbp.packet.p;
            const ni = nethook.lastSender;
            const TypedPacket = packets_1.PacketIdToType[packetId] || packet_1.Packet;
            const typedPacket = packet.as(TypedPacket);
            for (const listener of target.allListeners()) {
                try {
                    if (listener(typedPacket, ni, packetId) === common_1.CANCEL) {
                        result.streamReadResult = packet_1.StreamReadResult.Ignore;
                        util_1._tickCallback();
                        return result;
                    }
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
            util_1._tickCallback();
        }
    }
    catch (err) {
        source_map_support_1.remapAndPrintError(err);
    }
    return result;
}
function onPacketAfter(rbp) {
    try {
        const packet = rbp.packet.p;
        const packetId = packet.getId();
        const target = event_1.events.packetEvent(event_1.events.PacketEventType.After, packetId);
        if (target !== null && !target.isEmpty()) {
            const ni = nethook.lastSender;
            const TypedPacket = packets_1.PacketIdToType[packetId] || packet_1.Packet;
            const typedPacket = packet.as(TypedPacket);
            for (const listener of target.allListeners()) {
                try {
                    if (listener(typedPacket, ni, packetId) === common_1.CANCEL)
                        break;
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
            util_1._tickCallback();
        }
    }
    catch (err) {
        source_map_support_1.remapAndPrintError(err);
    }
}
function onPacketSend(handler, ni, packet) {
    try {
        const packetId = packet.getId();
        const target = event_1.events.packetEvent(event_1.events.PacketEventType.Send, packetId);
        if (target !== null && !target.isEmpty()) {
            const TypedPacket = packets_1.PacketIdToType[packetId] || packet_1.Packet;
            const typedPacket = packet.as(TypedPacket);
            for (const listener of target.allListeners()) {
                try {
                    if (listener(typedPacket, ni, packetId) === common_1.CANCEL) {
                        util_1._tickCallback();
                        return;
                    }
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
        }
    }
    catch (err) {
        source_map_support_1.remapAndPrintError(err);
    }
}
function onPacketSendInternal(handler, ni, packet, data) {
    try {
        const packetId = packet.getId();
        const target = event_1.events.packetEvent(event_1.events.PacketEventType.SendRaw, packetId);
        if (target !== null && !target.isEmpty()) {
            for (const listener of target.allListeners()) {
                try {
                    if (listener(data.valueptr, data.length, ni, packetId) === common_1.CANCEL) {
                        util_1._tickCallback();
                        return;
                    }
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
        }
    }
    catch (err) {
        source_map_support_1.remapAndPrintError(err);
    }
    sendInternalOriginal(handler, ni, packet, data);
}
launcher_1.bedrockServer.withLoading().then(() => {
    // hook raw
    asmcode.onPacketRaw = makefunc_1.makefunc.np(onPacketRaw, packet_1.PacketSharedPtr, null, OnPacketRBP, nativetype_1.int32_t, networkidentifier_1.NetworkHandler.Connection);
    proc_1.procHacker.patching('hook-packet-raw', 'NetworkHandler::_sortAndPacketizeEvents', 0x1fd, asmcode.packetRawHook, assembler_1.Register.rax, true, [
        0x8B, 0xD6,
        0x48, 0x8D, 0x4D, 0x50,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0x90 // nop
    ], [7, 11]);
    // hook before
    asmcode.onPacketBefore = makefunc_1.makefunc.np(onPacketBefore, packet_1.ExtendedStreamReadResult, null, packet_1.ExtendedStreamReadResult, OnPacketRBP, nativetype_1.int32_t);
    proc_1.procHacker.patching('hook-packet-before', 'NetworkHandler::_sortAndPacketizeEvents', 0x2e9, asmcode.packetBeforeHook, // original code depended
    assembler_1.Register.rax, true, [
        0x48, 0x8B, 0x01,
        0x4C, 0x8D, 0x85, 0xA0, 0x00, 0x00, 0x00,
        0x48, 0x8D, 0x54, 0x24, 0x78,
        0xFF, 0x50, 0x20, // call qword ptr ds:[rax+20]
    ], []);
    // skip packet when result code is 0x7f
    const packetViolationOriginalCode = [
        0x48, 0x89, 0x5C, 0x24, 0x10,
        0x55,
        0x56,
        0x57,
        0x41, 0x54,
        0x41, 0x55,
        0x41, 0x56, // push r14
    ];
    asmcode.PacketViolationHandlerHandleViolationAfter = proc_1.proc['PacketViolationHandler::_handleViolation'].add(packetViolationOriginalCode.length);
    proc_1.procHacker.patching('hook-packet-before-skip', 'PacketViolationHandler::_handleViolation', 0, asmcode.packetBeforeCancelHandling, assembler_1.Register.rax, false, packetViolationOriginalCode, [3, 7, 21, 24]);
    // hook after
    asmcode.onPacketAfter = makefunc_1.makefunc.np(onPacketAfter, nativetype_1.void_t, null, OnPacketRBP, nativetype_1.int32_t);
    proc_1.procHacker.patching('hook-packet-after', 'NetworkHandler::_sortAndPacketizeEvents', 0x43d, asmcode.packetAfterHook, // original code depended
    assembler_1.Register.rax, true, [
        0x48, 0x8B, 0x01,
        0x4C, 0x8D, 0x4D, 0x50,
        0x4C, 0x8B, 0xC6,
        0x49, 0x8B, 0xD6,
        0xFF, 0x50, 0x08, // call qword ptr ds:[rax+8]
    ], []);
    const onPacketSendNp = makefunc_1.makefunc.np(onPacketSend, nativetype_1.void_t, null, networkidentifier_1.NetworkHandler, networkidentifier_1.NetworkIdentifier, packet_1.Packet);
    asmcode.onPacketSend = onPacketSendNp;
    proc_1.procHacker.hookingRawWithCallOriginal('NetworkHandler::send', onPacketSendNp, [assembler_1.Register.rcx, assembler_1.Register.rdx, assembler_1.Register.r8, assembler_1.Register.r9], []);
    proc_1.procHacker.patching('hook-packet-send-all', 'LoopbackPacketSender::sendToClients', 0x90, asmcode.packetSendAllHook, // original code depended
    assembler_1.Register.rax, true, [
        0x49, 0x8B, 0x07,
        0x49, 0x8D, 0x96, 0x20, 0x02, 0x00, 0x00,
        0x49, 0x8B, 0xCF,
        0xFF, 0x50, 0x18, // call qword ptr ds:[rax+18]
    ], []);
    sendInternalOriginal = proc_1.procHacker.hooking('NetworkHandler::_sendInternal', nativetype_1.void_t, null, networkidentifier_1.NetworkHandler, networkidentifier_1.NetworkIdentifier, packet_1.Packet, pointer_1.CxxStringWrapper)(onPacketSendInternal);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0aG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldGhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDJDQUF1QztBQUN2QywrREFBNEU7QUFDNUUseUNBQXFKO0FBQ3JKLCtDQUFxRDtBQUNyRCwyQ0FBNEQ7QUFDNUQscUNBQThDO0FBQzlDLHFDQUE0QztBQUM1QyxpQ0FBbUU7QUFDbkUsbUNBQWlDO0FBQ2pDLHlDQUEyQztBQUMzQyx5Q0FBc0M7QUFDdEMsK0NBQXNFO0FBQ3RFLDZDQUF5RTtBQUN6RSx1Q0FBNkM7QUFDN0MsbURBQTRDO0FBQzVDLDZEQUFzRTtBQUN0RSxpQ0FBNEM7QUFDNUMseUNBQTJDO0FBRzNDLElBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQXFCLFNBQVEseUJBQVc7SUFJMUMsSUFBSSxDQUFDLElBQWdCLEVBQUUsSUFBVztRQUM5QixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQUxHO0lBREMseUJBQVcsQ0FBQywwQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7a0RBQ3BCO0FBRnBCLG9CQUFvQjtJQUR6Qix5QkFBVyxDQUFDLElBQUksQ0FBQztHQUNaLG9CQUFvQixDQU96QjtBQUVELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFDLEVBQUUsa0JBQVcsRUFBRSw2QkFBZ0IsQ0FBQyxDQUFDO0FBRzlILElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSx5QkFBVztDQUtwQyxDQUFBO0FBSEc7SUFEQyx5QkFBVyxDQUFDLHlCQUFTLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxFQUFFLElBQUksQ0FBQzsyQ0FDakI7QUFFekI7SUFEQyx5QkFBVyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQzsy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