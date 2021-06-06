"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPacketRaw = exports.createPacket = exports.PacketSharedPtr = exports.Packet = exports.ExtendedStreamReadResult = exports.StreamReadResult = exports.PacketReadResult = void 0;
const tslib_1 = require("tslib");
const common_1 = require("bdsx/common");
const nativeclass_1 = require("bdsx/nativeclass");
const sharedpointer_1 = require("bdsx/sharedpointer");
const nativetype_1 = require("../nativetype");
const proc_1 = require("./proc");
// export interface PacketType<T> extends StructureType<T>
// {
//     readonly ID:number;
// }
exports.PacketReadResult = nativetype_1.uint32_t.extends({
    PacketReadNoError: 0,
    PacketReadError: 1,
});
exports.StreamReadResult = nativetype_1.int32_t.extends({
    Disconnect: 0,
    Pass: 1,
    Warning: 2,
    Ignore: 0x7f,
});
let ExtendedStreamReadResult = class ExtendedStreamReadResult extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.StreamReadResult)
], ExtendedStreamReadResult.prototype, "streamReadResult", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], ExtendedStreamReadResult.prototype, "dummy", void 0);
ExtendedStreamReadResult = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], ExtendedStreamReadResult);
exports.ExtendedStreamReadResult = ExtendedStreamReadResult;
const sharedptr_of_packet = Symbol('sharedptr');
let Packet = class Packet extends nativeclass_1.MantleClass {
    /**
     * @deprecated use packet.destruct();
     */
    destructor() {
        common_1.abstract();
    }
    getId() {
        common_1.abstract();
    }
    getName() {
        common_1.abstract();
    }
    write(stream) {
        common_1.abstract();
    }
    read(stream) {
        common_1.abstract();
    }
    readExtended(read, stream) {
        common_1.abstract();
    }
    /**
     * same with target.send
     */
    sendTo(target, unknownarg) {
        common_1.abstract();
    }
    dispose() {
        this[sharedptr_of_packet].dispose();
        this[sharedptr_of_packet] = null;
    }
    static create() {
        const id = this.ID;
        if (id === undefined)
            throw Error('Packet class is abstract, please use named class instead (ex. LoginPacket)');
        const cls = sharedpointer_1.SharedPtr.make(this);
        const sharedptr = new cls(true);
        exports.createPacketRaw(sharedptr, id);
        const packet = sharedptr.p;
        if (packet === null)
            throw Error(`${this.name} is not created`);
        packet[sharedptr_of_packet] = sharedptr;
        return packet;
    }
};
Packet = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x30)
], Packet);
exports.Packet = Packet;
exports.PacketSharedPtr = sharedpointer_1.SharedPtr.make(Packet);
/**
 * @deprecated use *Packet.create() instead
 */
function createPacket(packetId) {
    const p = new exports.PacketSharedPtr(true);
    exports.createPacketRaw(p, packetId);
    return new sharedpointer_1.SharedPointer(p);
}
exports.createPacket = createPacket;
exports.createPacketRaw = proc_1.procHacker.js("MinecraftPackets::createPacket", exports.PacketSharedPtr, null, exports.PacketSharedPtr, nativetype_1.int32_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx3Q0FBdUM7QUFDdkMsa0RBQXNGO0FBQ3RGLHNEQUE4RDtBQUM5RCw4Q0FBNkQ7QUFHN0QsaUNBQW9DO0FBR3BDLDBEQUEwRDtBQUMxRCxJQUFJO0FBQ0osMEJBQTBCO0FBQzFCLElBQUk7QUFFUyxRQUFBLGdCQUFnQixHQUFHLHFCQUFRLENBQUMsT0FBTyxDQUFDO0lBQzdDLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsZUFBZSxFQUFFLENBQUM7Q0FDckIsQ0FBQyxDQUFDO0FBSVUsUUFBQSxnQkFBZ0IsR0FBRyxvQkFBTyxDQUFDLE9BQU8sQ0FBQztJQUM1QyxVQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksRUFBRSxDQUFDO0lBQ1AsT0FBTyxFQUFFLENBQUM7SUFDVixNQUFNLEVBQUUsSUFBSTtDQUNmLENBQUMsQ0FBQztBQUlILElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEseUJBQVc7Q0FNeEQsQ0FBQTtBQUpBO0lBREkseUJBQVcsQ0FBQyx3QkFBZ0IsQ0FBQztrRUFDQztBQUVsQztJQURJLHlCQUFXLENBQUMsb0JBQU8sQ0FBQzt1REFDVjtBQUpGLHdCQUF3QjtJQURwQyx5QkFBVyxFQUFFO0dBQ0Qsd0JBQXdCLENBTXBDO0FBTlksNERBQXdCO0FBUXJDLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR2hELElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU8sU0FBUSx5QkFBVztJQUluQzs7T0FFRztJQUNILFVBQVU7UUFDTixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsS0FBSztRQUNELGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPO1FBQ0gsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELEtBQUssQ0FBQyxNQUFtQjtRQUNyQixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsSUFBSSxDQUFDLE1BQW1CO1FBQ3BCLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBNkIsRUFBRSxNQUFtQjtRQUMzRCxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsTUFBd0IsRUFBRSxVQUFrQjtRQUMvQyxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsT0FBTztRQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU07UUFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLElBQUksRUFBRSxLQUFLLFNBQVM7WUFBRSxNQUFNLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1FBQ2hILE1BQU0sR0FBRyxHQUFHLHlCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLHVCQUFlLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFNLENBQUM7UUFDaEMsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKLENBQUE7QUFqRFksTUFBTTtJQURsQix5QkFBVyxDQUFDLElBQUksQ0FBQztHQUNMLE1BQU0sQ0FpRGxCO0FBakRZLHdCQUFNO0FBb0ROLFFBQUEsZUFBZSxHQUFHLHlCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBR3REOztHQUVHO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLFFBQTJCO0lBQ3BELE1BQU0sQ0FBQyxHQUFHLElBQUksdUJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyx1QkFBZSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QixPQUFPLElBQUksNkJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBSkQsb0NBSUM7QUFFWSxRQUFBLGVBQWUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx1QkFBZSxFQUFFLElBQUksRUFBRSx1QkFBZSxFQUFFLG9CQUFPLENBQUMsQ0FBQyJ9