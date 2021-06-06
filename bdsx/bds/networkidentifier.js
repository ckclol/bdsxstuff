"use strict";
var NetworkIdentifier_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkHandler = exports.NetworkIdentifier = exports.ServerNetworkHandler = exports.NetworkHandler = void 0;
const tslib_1 = require("tslib");
const assembler_1 = require("bdsx/assembler");
const common_1 = require("bdsx/common");
const dll_1 = require("bdsx/dll");
const hashset_1 = require("bdsx/hashset");
const makefunc_1 = require("bdsx/makefunc");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const pointer_1 = require("bdsx/pointer");
const source_map_support_1 = require("bdsx/source-map-support");
const util_1 = require("bdsx/util");
const event_1 = require("../event");
const proc_1 = require("./proc");
const raknet_1 = require("./raknet");
class NetworkHandler extends nativeclass_1.NativeClass {
    send(ni, packet, u) {
        common_1.abstract();
    }
    sendInternal(ni, packet, data) {
        common_1.abstract();
    }
    getConnectionFromId(ni) {
        common_1.abstract();
    }
}
exports.NetworkHandler = NetworkHandler;
(function (NetworkHandler) {
    class Connection extends nativeclass_1.NativeClass {
    }
    NetworkHandler.Connection = Connection;
})(NetworkHandler = exports.NetworkHandler || (exports.NetworkHandler = {}));
let ServerNetworkHandler$Client = class ServerNetworkHandler$Client extends nativeclass_1.NativeClass {
};
ServerNetworkHandler$Client = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ServerNetworkHandler$Client);
let ServerNetworkHandler = class ServerNetworkHandler extends nativeclass_1.NativeClass {
    _disconnectClient(client, b, message, d) {
        common_1.abstract();
    }
    disconnectClient(client, message = "disconnectionScreen.disconnected") {
        this._disconnectClient(client, 0, message, 0);
    }
    setMotd(motd) {
        this.motd = motd;
        this.updateServerAnnouncement();
    }
    setMaxPlayers(count) {
        this.maxPlayers = count;
        this.updateServerAnnouncement();
    }
    updateServerAnnouncement() {
        common_1.abstract();
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString, 0x258)
], ServerNetworkHandler.prototype, "motd", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t, 0x2D0)
], ServerNetworkHandler.prototype, "maxPlayers", void 0);
ServerNetworkHandler = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ServerNetworkHandler);
exports.ServerNetworkHandler = ServerNetworkHandler;
const identifiers = new hashset_1.HashSet();
let NetworkIdentifier = NetworkIdentifier_1 = class NetworkIdentifier extends nativeclass_1.NativeClass {
    constructor(allocate) {
        super(allocate);
    }
    assignTo(target) {
        dll_1.dll.vcruntime140.memcpy(target, this, NetworkHandler[nativeclass_1.NativeClass.contentSize]);
    }
    equals(other) {
        common_1.abstract();
    }
    hash() {
        common_1.abstract();
    }
    getActor() {
        common_1.abstract();
    }
    getAddress() {
        const idx = this.address.GetSystemIndex();
        const rakpeer = exports.networkHandler.instance.peer;
        return rakpeer.GetSystemAddressFromIndex(idx).toString();
    }
    toString() {
        return this.getAddress();
    }
    static fromPointer(ptr) {
        return identifiers.get(ptr.as(NetworkIdentifier_1));
    }
    static [makefunc_1.makefunc.np2js](ptr) {
        let ni = identifiers.get(ptr);
        if (ni)
            return ni;
        ni = new NetworkIdentifier_1(true);
        ni.copyFrom(ptr, NetworkIdentifier_1[nativetype_1.NativeType.size]);
        identifiers.add(ni);
        return ni;
    }
    static all() {
        return identifiers.values();
    }
};
/**
 * @deprecated use events.networkDisconnected
 */
NetworkIdentifier.close = event_1.events.networkDisconnected;
tslib_1.__decorate([
    nativeclass_1.nativeField(raknet_1.RakNet.AddressOrGUID)
], NetworkIdentifier.prototype, "address", void 0);
NetworkIdentifier = NetworkIdentifier_1 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], NetworkIdentifier);
exports.NetworkIdentifier = NetworkIdentifier;
proc_1.procHacker.hookingRawWithCallOriginal('NetworkHandler::onConnectionClosed#1', makefunc_1.makefunc.np((handler, ni, msg) => {
    try {
        event_1.events.networkDisconnected.fire(ni);
        util_1._tickCallback();
    }
    catch (err) {
        source_map_support_1.remapAndPrintError(err);
    }
    // ni is used after onConnectionClosed. on some message processings.
    // timeout for avoiding the re-allocation
    setTimeout(() => {
        identifiers.delete(ni);
    }, 3000);
}, nativetype_1.void_t, null, NetworkHandler, NetworkIdentifier, pointer_1.CxxStringWrapper), [assembler_1.Register.rcx, assembler_1.Register.rdx, assembler_1.Register.r8, assembler_1.Register.r9], []);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya2lkZW50aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXR3b3JraWRlbnRpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDhDQUEwQztBQUMxQyx3Q0FBdUM7QUFDdkMsa0NBQStCO0FBQy9CLDBDQUFpRDtBQUNqRCw0Q0FBeUM7QUFDekMsa0RBQXlFO0FBQ3pFLGdEQUF5RTtBQUN6RSwwQ0FBZ0Q7QUFFaEQsZ0VBQTZEO0FBQzdELG9DQUEwQztBQUcxQyxvQ0FBa0M7QUFJbEMsaUNBQW9DO0FBQ3BDLHFDQUFrQztBQUdsQyxNQUFhLGNBQWUsU0FBUSx5QkFBVztJQUkzQyxJQUFJLENBQUMsRUFBb0IsRUFBRSxNQUFhLEVBQUUsQ0FBUTtRQUM5QyxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQW9CLEVBQUUsTUFBYSxFQUFFLElBQXFCO1FBQ25FLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxFQUFvQjtRQUNwQyxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFmRCx3Q0FlQztBQUVELFdBQWlCLGNBQWM7SUFFM0IsTUFBYSxVQUFXLFNBQVEseUJBQVc7S0FRMUM7SUFSWSx5QkFBVSxhQVF0QixDQUFBO0FBQ0wsQ0FBQyxFQVhnQixjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQVc5QjtBQUdELElBQU0sMkJBQTJCLEdBQWpDLE1BQU0sMkJBQTRCLFNBQVEseUJBQVc7Q0FDcEQsQ0FBQTtBQURLLDJCQUEyQjtJQURoQyx5QkFBVyxDQUFDLElBQUksQ0FBQztHQUNaLDJCQUEyQixDQUNoQztBQUdELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEseUJBQVc7SUFNdkMsaUJBQWlCLENBQUMsTUFBd0IsRUFBRSxDQUFRLEVBQUUsT0FBaUIsRUFBRSxDQUFRO1FBQ3ZGLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxNQUF3QixFQUFFLFVBQWUsa0NBQWtDO1FBQ3hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQVc7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsYUFBYSxDQUFDLEtBQVk7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNELHdCQUF3QjtRQUNwQixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQXJCRztJQURDLHlCQUFXLENBQUMsc0JBQVMsRUFBRSxLQUFLLENBQUM7a0RBQ2Q7QUFFaEI7SUFEQyx5QkFBVyxDQUFDLG9CQUFPLEVBQUUsS0FBSyxDQUFDO3dEQUNSO0FBSlgsb0JBQW9CO0lBRGhDLHlCQUFXLENBQUMsSUFBSSxDQUFDO0dBQ0wsb0JBQW9CLENBdUJoQztBQXZCWSxvREFBb0I7QUE4QmpDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBcUIsQ0FBQztBQUdyRCxJQUFhLGlCQUFpQix5QkFBOUIsTUFBYSxpQkFBa0IsU0FBUSx5QkFBVztJQUk5QyxZQUFZLFFBQWlCO1FBQ3pCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWtCO1FBQ3ZCLFNBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLHlCQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQXVCO1FBQzFCLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJO1FBQ0EsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDSixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUMsTUFBTSxPQUFPLEdBQUcsc0JBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzdDLE9BQU8sT0FBTyxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQU1ELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBaUI7UUFDaEMsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQWlCLENBQUMsQ0FBRSxDQUFDO0lBQ3ZELENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyxtQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQXFCO1FBQ3pDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxFQUFFO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDbEIsRUFBRSxHQUFHLElBQUksbUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsbUJBQWlCLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUc7UUFDTixPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQTtBQW5CRzs7R0FFRztBQUNhLHVCQUFLLEdBQStDLGNBQU0sQ0FBQyxtQkFBbUIsQ0FBQztBQW5DL0Y7SUFEQyx5QkFBVyxDQUFDLGVBQU0sQ0FBQyxhQUFhLENBQUM7a0RBQ0U7QUFGM0IsaUJBQWlCO0lBRDdCLHlCQUFXLEVBQUU7R0FDRCxpQkFBaUIsQ0FxRDdCO0FBckRZLDhDQUFpQjtBQXlEOUIsaUJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxzQ0FBc0MsRUFBRSxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLEVBQUU7SUFDMUcsSUFBSTtRQUNBLGNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsb0JBQWEsRUFBRSxDQUFDO0tBQ25CO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVix1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjtJQUNELG9FQUFvRTtJQUNwRSx5Q0FBeUM7SUFDekMsVUFBVSxDQUFDLEdBQUUsRUFBRTtRQUNYLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxFQUFFLG1CQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSwwQkFBZ0IsQ0FBQyxFQUNyRSxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLG9CQUFRLENBQUMsR0FBRyxFQUFFLG9CQUFRLENBQUMsRUFBRSxFQUFFLG9CQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMifQ==