"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchedNetworkPeer = exports.CompressedNetworkPeer = exports.EncryptedNetworkPeer = exports.RaknetNetworkPeer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const nativeclass_1 = require("bdsx/nativeclass");
const sharedpointer_1 = require("bdsx/sharedpointer");
const raknet_1 = require("./raknet");
const stream_1 = require("./stream");
let RaknetNetworkPeer = class RaknetNetworkPeer extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], RaknetNetworkPeer.prototype, "vftable", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], RaknetNetworkPeer.prototype, "u1", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], RaknetNetworkPeer.prototype, "u2", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(raknet_1.RakNet.RakPeer.ref())
], RaknetNetworkPeer.prototype, "peer", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(raknet_1.RakNet.AddressOrGUID)
], RaknetNetworkPeer.prototype, "addr", void 0);
RaknetNetworkPeer = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RaknetNetworkPeer);
exports.RaknetNetworkPeer = RaknetNetworkPeer;
let EncryptedNetworkPeer = class EncryptedNetworkPeer extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(sharedpointer_1.SharedPtr.make(RaknetNetworkPeer))
], EncryptedNetworkPeer.prototype, "peer", void 0);
EncryptedNetworkPeer = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], EncryptedNetworkPeer);
exports.EncryptedNetworkPeer = EncryptedNetworkPeer;
let CompressedNetworkPeer = class CompressedNetworkPeer extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(EncryptedNetworkPeer.ref(), 0x48)
], CompressedNetworkPeer.prototype, "peer", void 0);
CompressedNetworkPeer = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CompressedNetworkPeer);
exports.CompressedNetworkPeer = CompressedNetworkPeer;
let BatchedNetworkPeer = class BatchedNetworkPeer extends nativeclass_1.NativeClass {
    sendPacket(data, reliability, n, n2, compressibility) {
        common_1.abstract();
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], BatchedNetworkPeer.prototype, "vftable", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(CompressedNetworkPeer.ref())
], BatchedNetworkPeer.prototype, "peer", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(stream_1.BinaryStream)
], BatchedNetworkPeer.prototype, "stream", void 0);
BatchedNetworkPeer = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BatchedNetworkPeer);
exports.BatchedNetworkPeer = BatchedNetworkPeer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHdDQUF1QztBQUN2QyxvQ0FBd0M7QUFDeEMsa0RBQXlFO0FBQ3pFLHNEQUErQztBQUUvQyxxQ0FBa0M7QUFDbEMscUNBQXdDO0FBR3hDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEseUJBQVc7Q0FXakQsQ0FBQTtBQVRHO0lBREMseUJBQVcsQ0FBQyxrQkFBVyxDQUFDO2tEQUNMO0FBRXBCO0lBREMseUJBQVcsQ0FBQyxrQkFBVyxDQUFDOzZDQUNWO0FBRWY7SUFEQyx5QkFBVyxDQUFDLGtCQUFXLENBQUM7NkNBQ1Y7QUFFZjtJQURDLHlCQUFXLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzsrQ0FDZDtBQUVwQjtJQURDLHlCQUFXLENBQUMsZUFBTSxDQUFDLGFBQWEsQ0FBQzsrQ0FDUjtBQVZqQixpQkFBaUI7SUFEN0IseUJBQVcsQ0FBQyxJQUFJLENBQUM7R0FDTCxpQkFBaUIsQ0FXN0I7QUFYWSw4Q0FBaUI7QUFjOUIsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSx5QkFBVztDQUdwRCxDQUFBO0FBREc7SUFEQyx5QkFBVyxDQUFDLHlCQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7a0RBQ2I7QUFGekIsb0JBQW9CO0lBRGhDLHlCQUFXLENBQUMsSUFBSSxDQUFDO0dBQ0wsb0JBQW9CLENBR2hDO0FBSFksb0RBQW9CO0FBTWpDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEseUJBQVc7Q0FHckQsQ0FBQTtBQURHO0lBREMseUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7bURBQ3BCO0FBRmpCLHFCQUFxQjtJQURqQyx5QkFBVyxDQUFDLElBQUksQ0FBQztHQUNMLHFCQUFxQixDQUdqQztBQUhZLHNEQUFxQjtBQU1sQyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLHlCQUFXO0lBUS9DLFVBQVUsQ0FBQyxJQUFjLEVBQUUsV0FBa0IsRUFBRSxDQUFRLEVBQUUsRUFBUyxFQUFFLGVBQXNCO1FBQ3RGLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBVEc7SUFEQyx5QkFBVyxDQUFDLGtCQUFXLENBQUM7bURBQ0w7QUFFcEI7SUFEQyx5QkFBVyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDO2dEQUNkO0FBRTNCO0lBREMseUJBQVcsQ0FBQyxxQkFBWSxDQUFDO2tEQUNOO0FBTlgsa0JBQWtCO0lBRDlCLHlCQUFXLENBQUMsSUFBSSxDQUFDO0dBQ0wsa0JBQWtCLENBVzlCO0FBWFksZ0RBQWtCIn0=