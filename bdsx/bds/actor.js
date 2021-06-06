"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.ActorType = exports.ActorRuntimeID = exports.DimensionId = exports.ActorUniqueID = void 0;
const bin_1 = require("bdsx/bin");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const makefunc_1 = require("bdsx/makefunc");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const attribute_1 = require("./attribute");
exports.ActorUniqueID = nativetype_1.bin64_t.extends();
var DimensionId;
(function (DimensionId) {
    DimensionId[DimensionId["Overworld"] = 0] = "Overworld";
    DimensionId[DimensionId["Nether"] = 1] = "Nether";
    DimensionId[DimensionId["TheEnd"] = 2] = "TheEnd";
})(DimensionId = exports.DimensionId || (exports.DimensionId = {}));
class ActorRuntimeID extends core_1.VoidPointer {
}
exports.ActorRuntimeID = ActorRuntimeID;
var ActorType;
(function (ActorType) {
    ActorType[ActorType["Item"] = 64] = "Item";
    ActorType[ActorType["Player"] = 319] = "Player";
})(ActorType = exports.ActorType || (exports.ActorType = {}));
class Actor extends nativeclass_1.NativeClass {
    _sendAttributePacket(id, value, attr) {
        common_1.abstract();
    }
    sendPacket(packet) {
        if (!this.isPlayer())
            throw Error("this is not ServerPlayer");
        this.sendNetworkPacket(packet);
    }
    /**
     * @deprecated use getDimensionId(), follow the original function name
     */
    getDimension() {
        common_1.abstract();
    }
    getDimensionId() {
        common_1.abstract();
    }
    /**
     * @deprecated use actor.identifier
     */
    getIdentifier() {
        return this.identifier;
    }
    isPlayer() {
        common_1.abstract();
    }
    getName() {
        common_1.abstract();
    }
    setName(name) {
        common_1.abstract();
    }
    getNetworkIdentifier() {
        throw Error(`this is not player`);
    }
    getPosition() {
        common_1.abstract();
    }
    getRegion() {
        common_1.abstract();
    }
    getUniqueIdLow() {
        return this.getUniqueIdPointer().getInt32(0);
    }
    getUniqueIdHigh() {
        return this.getUniqueIdPointer().getInt32(4);
    }
    getUniqueIdBin() {
        return this.getUniqueIdPointer().getBin64();
    }
    /**
     * it returns address of the unique id field
     */
    getUniqueIdPointer() {
        common_1.abstract();
    }
    getTypeId() {
        common_1.abstract();
    }
    getCommandPermissionLevel() {
        common_1.abstract();
    }
    getAttribute(id) {
        const attr = this.attributes.getMutableInstance(id);
        if (attr === null)
            return 0;
        return attr.currentValue;
    }
    setAttribute(id, value) {
        if (id < 1)
            return;
        if (id > 15)
            return;
        const attr = this.attributes.getMutableInstance(id);
        if (attr === null)
            throw Error(`${this.identifier} has not ${attribute_1.AttributeId[id] || `Attribute${id}`}`);
        attr.currentValue = value;
        if (this.isPlayer()) {
            this._sendAttributePacket(id, value, attr);
        }
    }
    /**
     * @deprecated use actor.runtimeId
     */
    getRuntimeId() {
        return this.runtimeId.add();
    }
    /**
     * @deprecated Need more implement
     */
    getEntity() {
        let entity = this.entity;
        if (entity)
            return entity;
        entity = {
            __unique_id__: {
                "64bit_low": this.getUniqueIdLow(),
                "64bit_high": this.getUniqueIdHigh()
            },
            __identifier__: this.identifier,
            __type__: (this.getTypeId() & 0xff) === 0x40 ? 'item_entity' : 'entity',
            id: 0, // bool ScriptApi::WORKAROUNDS::helpRegisterActor(entt::Registry<unsigned int>* registry? ,Actor* actor,unsigned int* id_out);
        };
        return this.entity = entity;
    }
    addTag(tag) {
        common_1.abstract();
    }
    hasTag(tag) {
        common_1.abstract();
    }
    removeTag(tag) {
        common_1.abstract();
    }
    teleport(pos, dimensionId = DimensionId.Overworld) {
        common_1.abstract();
    }
    getArmor(slot) {
        common_1.abstract();
    }
    setSneaking(bool) {
        common_1.abstract();
    }
    getHealth() {
        common_1.abstract();
    }
    getMaxHealth() {
        common_1.abstract();
    }
    static fromUniqueIdBin(bin) {
        common_1.abstract();
    }
    static fromUniqueId(lowbits, highbits) {
        return Actor.fromUniqueIdBin(bin_1.bin.make64(lowbits, highbits));
    }
    static fromEntity(entity) {
        const u = entity.__unique_id__;
        return Actor.fromUniqueId(u["64bit_low"], u["64bit_high"]);
    }
    static [makefunc_1.makefunc.np2js](ptr) {
        return Actor._singletoning(ptr);
    }
    static all() {
        common_1.abstract();
    }
    static _singletoning(ptr) {
        common_1.abstract();
    }
}
exports.Actor = Actor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBK0I7QUFDL0Isd0NBQXVDO0FBQ3ZDLG9DQUFzRTtBQUN0RSw0Q0FBeUM7QUFDekMsa0RBQStDO0FBQy9DLGdEQUEwQztBQUMxQywyQ0FBK0U7QUFVbEUsUUFBQSxhQUFhLEdBQUcsb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUcvQyxJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDbkIsdURBQWEsQ0FBQTtJQUNiLGlEQUFVLENBQUE7SUFDVixpREFBVSxDQUFBO0FBQ2QsQ0FBQyxFQUpXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBSXRCO0FBRUQsTUFBYSxjQUFlLFNBQVEsa0JBQVc7Q0FDOUM7QUFERCx3Q0FDQztBQUVELElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQiwwQ0FBVyxDQUFBO0lBQ1gsK0NBQWMsQ0FBQTtBQUNsQixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFFRCxNQUFhLEtBQU0sU0FBUSx5QkFBVztJQU94QixvQkFBb0IsQ0FBQyxFQUFjLEVBQUUsS0FBWSxFQUFFLElBQXNCO1FBQy9FLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxVQUFVLENBQUMsTUFBYTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE1BQU0sS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRDs7T0FFRztJQUNILFlBQVk7UUFDUixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsY0FBYztRQUNWLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7T0FFRztJQUNILGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxV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