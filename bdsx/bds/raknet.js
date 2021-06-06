"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RakNet = void 0;
const tslib_1 = require("tslib");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const makefunc_1 = require("../makefunc");
const proc_1 = require("./proc");
const portDelineator = '|'.charCodeAt(0);
var RakNet;
(function (RakNet) {
    let SystemAddress = class SystemAddress extends nativeclass_1.NativeClass {
        // void SystemAddress::ToString(bool writePort, char *dest, char portDelineator) const
        ToString(writePort, dest, portDelineator) {
            common_1.abstract();
        }
        toString() {
            const dest = Buffer.alloc(128);
            this.ToString(true, dest, portDelineator);
            const len = dest.indexOf(0);
            if (len === -1)
                throw Error('SystemAddress.ToString failed, null character not found');
            return dest.subarray(0, len).toString();
        }
    };
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.uint16_t, 130)
    ], SystemAddress.prototype, "systemIndex", void 0);
    SystemAddress = tslib_1.__decorate([
        nativeclass_1.nativeClass(136)
    ], SystemAddress);
    RakNet.SystemAddress = SystemAddress;
    let RakNetGUID = class RakNetGUID extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.bin64_t)
    ], RakNetGUID.prototype, "g", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(nativetype_1.uint16_t)
    ], RakNetGUID.prototype, "systemIndex", void 0);
    RakNetGUID = tslib_1.__decorate([
        nativeclass_1.nativeClass()
    ], RakNetGUID);
    RakNet.RakNetGUID = RakNetGUID;
    let RakPeer = class RakPeer extends nativeclass_1.NativeClass {
        GetSystemAddressFromIndex(idx) {
            common_1.abstract();
        }
    };
    tslib_1.__decorate([
        nativeclass_1.nativeField(core_1.VoidPointer)
    ], RakPeer.prototype, "vftable", void 0);
    RakPeer = tslib_1.__decorate([
        nativeclass_1.nativeClass()
    ], RakPeer);
    RakNet.RakPeer = RakPeer;
    RakNet.UNASSIGNED_RAKNET_GUID = new RakNetGUID(true);
    RakNet.UNASSIGNED_RAKNET_GUID.g = nativetype_1.bin64_t.minus_one;
    RakNet.UNASSIGNED_RAKNET_GUID.systemIndex = -1;
    let AddressOrGUID = class AddressOrGUID extends nativeclass_1.NativeClass {
        GetSystemIndex() {
            const rakNetGuid = this.rakNetGuid;
            if (rakNetGuid !== RakNet.UNASSIGNED_RAKNET_GUID) {
                return rakNetGuid.systemIndex;
            }
            else {
                return this.systemAddress.systemIndex;
            }
        }
    };
    tslib_1.__decorate([
        nativeclass_1.nativeField(RakNetGUID)
    ], AddressOrGUID.prototype, "rakNetGuid", void 0);
    tslib_1.__decorate([
        nativeclass_1.nativeField(SystemAddress)
    ], AddressOrGUID.prototype, "systemAddress", void 0);
    AddressOrGUID = tslib_1.__decorate([
        nativeclass_1.nativeClass()
    ], AddressOrGUID);
    RakNet.AddressOrGUID = AddressOrGUID;
    SystemAddress.prototype.ToString = proc_1.procHacker.js("?ToString@SystemAddress@RakNet@@QEBAX_NPEADD@Z", nativetype_1.void_t, { this: RakNet.SystemAddress }, nativetype_1.bool_t, makefunc_1.makefunc.Buffer, nativetype_1.int32_t);
    RakPeer.prototype.GetSystemAddressFromIndex = makefunc_1.makefunc.js([0xf0], RakNet.SystemAddress, { this: RakNet.RakPeer, structureReturn: true }, nativetype_1.int32_t);
})(RakNet = exports.RakNet || (exports.RakNet = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFrbmV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFrbmV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx3Q0FBdUM7QUFDdkMsb0NBQXdDO0FBQ3hDLGtEQUF5RTtBQUN6RSxnREFBNkU7QUFDN0UsMENBQXVDO0FBQ3ZDLGlDQUFvQztBQUVwQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXpDLElBQWlCLE1BQU0sQ0E4RHRCO0FBOURELFdBQWlCLE1BQU07SUFHbkIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLHlCQUFXO1FBSTFDLHNGQUFzRjtRQUN0RixRQUFRLENBQUMsU0FBaUIsRUFBRSxJQUFlLEVBQUUsY0FBcUI7WUFDOUQsaUJBQVEsRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVELFFBQVE7WUFDSixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFBRSxNQUFNLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1lBQ3ZGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUMsQ0FBQztLQUNKLENBQUE7SUFkRztRQURDLHlCQUFXLENBQUMscUJBQVEsRUFBRSxHQUFHLENBQUM7c0RBQ047SUFGWixhQUFhO1FBRHpCLHlCQUFXLENBQUMsR0FBRyxDQUFDO09BQ0osYUFBYSxDQWdCekI7SUFoQlksb0JBQWEsZ0JBZ0J6QixDQUFBO0lBR0QsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLHlCQUFXO0tBSzFDLENBQUE7SUFIRztRQURDLHlCQUFXLENBQUMsb0JBQU8sQ0FBQzt5Q0FDWDtJQUVWO1FBREMseUJBQVcsQ0FBQyxxQkFBUSxDQUFDO21EQUNEO0lBSlosVUFBVTtRQUR0Qix5QkFBVyxFQUFFO09BQ0QsVUFBVSxDQUt0QjtJQUxZLGlCQUFVLGFBS3RCLENBQUE7SUFHRCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEseUJBQVc7UUFJcEMseUJBQXlCLENBQUMsR0FBVTtZQUNoQyxpQkFBUSxFQUFFLENBQUM7UUFDZixDQUFDO0tBQ0osQ0FBQTtJQUxHO1FBREMseUJBQVcsQ0FBQyxrQkFBVyxDQUFDOzRDQUNMO0lBRlgsT0FBTztRQURuQix5QkFBVyxFQUFFO09BQ0QsT0FBTyxDQU9uQjtJQVBZLGNBQU8sVUFPbkIsQ0FBQTtJQUVZLDZCQUFzQixHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELE9BQUEsc0JBQXNCLENBQUMsQ0FBQyxHQUFHLG9CQUFPLENBQUMsU0FBUyxDQUFDO0lBQzdDLE9BQUEsc0JBQXNCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBR3hDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSx5QkFBVztRQU0xQyxjQUFjO1lBQ1YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxJQUFJLFVBQVUsS0FBSyxPQUFBLHNCQUFzQixFQUFFO2dCQUN2QyxPQUFPLFVBQVUsQ0FBQyxXQUFXLENBQUM7YUFDakM7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzthQUN6QztRQUNMLENBQUM7S0FDSixDQUFBO0lBWkc7UUFEQyx5QkFBVyxDQUFDLFVBQVUsQ0FBQztxREFDRjtJQUV0QjtRQURDLHlCQUFXLENBQUMsYUFBYSxDQUFDO3dEQUNDO0lBSm5CLGFBQWE7UUFEekIseUJBQVcsRUFBRTtPQUNELGFBQWEsQ0FjekI7SUFkWSxvQkFBYSxnQkFjekIsQ0FBQTtJQUVELGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGFBQWEsRUFBQyxFQUFFLG1CQUFNLEVBQUUsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0lBQzNLLE9BQU8sQ0FBQyxTQUFTLENBQUMseUJBQXlCLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBQyxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUNuSixDQUFDLEVBOURnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUE4RHRCIn0=