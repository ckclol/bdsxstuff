"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInventory = exports.ItemStack = exports.ComponentItem = exports.Item = exports.CreativeItemCategory = exports.ArmorSlot = exports.ContainerId = void 0;
const common_1 = require("bdsx/common");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const cxxvector_1 = require("../cxxvector");
var ContainerId;
(function (ContainerId) {
    ContainerId[ContainerId["Inventory"] = 0] = "Inventory";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["First"] = 1] = "First";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["Last"] = 100] = "Last";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["Offhand"] = 119] = "Offhand";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["Armor"] = 120] = "Armor";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["Hotbar"] = 122] = "Hotbar";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["FixedInventory"] = 123] = "FixedInventory";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["UI"] = 124] = "UI";
})(ContainerId = exports.ContainerId || (exports.ContainerId = {}));
var ArmorSlot;
(function (ArmorSlot) {
    ArmorSlot[ArmorSlot["Head"] = 0] = "Head";
    ArmorSlot[ArmorSlot["Chest"] = 1] = "Chest";
    ArmorSlot[ArmorSlot["Legs"] = 2] = "Legs";
    ArmorSlot[ArmorSlot["Feet"] = 3] = "Feet";
})(ArmorSlot = exports.ArmorSlot || (exports.ArmorSlot = {}));
var CreativeItemCategory;
(function (CreativeItemCategory) {
    CreativeItemCategory[CreativeItemCategory["Construction"] = 1] = "Construction";
    CreativeItemCategory[CreativeItemCategory["Nature"] = 2] = "Nature";
    CreativeItemCategory[CreativeItemCategory["Items"] = 4] = "Items";
    CreativeItemCategory[CreativeItemCategory["Uncategorized"] = 5] = "Uncategorized";
})(CreativeItemCategory = exports.CreativeItemCategory || (exports.CreativeItemCategory = {}));
class Item extends nativeclass_1.NativeClass {
    allowOffhand() {
        common_1.abstract();
    }
    getCommandName() {
        common_1.abstract();
    }
    getCreativeCategory() {
        common_1.abstract();
    }
    isDamageable() {
        common_1.abstract();
    }
    isFood() {
        common_1.abstract();
    }
    /**
     * Will not affect client but allows /replaceitem
     */
    setAllowOffhand(value) {
        common_1.abstract();
    }
}
exports.Item = Item;
class ComponentItem extends nativeclass_1.NativeClass {
}
exports.ComponentItem = ComponentItem;
class ItemStack extends nativeclass_1.NativeClass {
    _getItem() {
        common_1.abstract();
    }
    _setCustomLore(name) {
        common_1.abstract();
    }
    isBlock() {
        common_1.abstract();
    }
    isNull() {
        common_1.abstract();
    }
    getAmount() {
        return this.amount;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    getId() {
        common_1.abstract();
    }
    getItem() {
        if (this.isNull()) {
            return null;
        }
        return this._getItem();
    }
    getName() {
        const item = this.getItem();
        if (item) {
            const Name = item.getCommandName();
            if (Name.includes(":"))
                return Name;
            else
                return "minecraft:" + Name;
        }
        return "minecraft:air";
    }
    hasCustomName() {
        common_1.abstract();
    }
    getCustomName() {
        common_1.abstract();
    }
    setCustomName(name) {
        common_1.abstract();
    }
    getUserData() {
        common_1.abstract();
    }
    /**
     * it returns the enchantability.
     * (See enchantability on https://minecraft.fandom.com/wiki/Enchanting_mechanics)
     */
    getEnchantValue() {
        common_1.abstract();
    }
    isEnchanted() {
        common_1.abstract();
    }
    setCustomLore(lores) {
        const CxxVectorString = cxxvector_1.CxxVector.make(nativetype_1.CxxString);
        const cxxvector = new CxxVectorString(true);
        cxxvector.construct();
        if (typeof lores === "string") {
            cxxvector.push(lores);
        }
        else
            lores.forEach((v) => {
                cxxvector.push(v);
            });
        this._setCustomLore(cxxvector);
        cxxvector.destruct();
    }
    /**
     * Value is applied only to Damageable items
     */
    setDamageValue(value) {
        common_1.abstract();
    }
    startCoolDown(player) {
        common_1.abstract();
    }
    load(compoundTag) {
        common_1.abstract();
    }
    sameItem(item) {
        common_1.abstract();
    }
    isStackedByData() {
        common_1.abstract();
    }
    isStackable() {
        common_1.abstract();
    }
    isPotionItem() {
        common_1.abstract();
    }
    isPattern() {
        common_1.abstract();
    }
    isMusicDiscItem() {
        common_1.abstract();
    }
    isLiquidClipItem() {
        common_1.abstract();
    }
    isHorseArmorItem() {
        common_1.abstract();
    }
    isGlint() {
        common_1.abstract();
    }
    isFullStack() {
        common_1.abstract();
    }
    isFireResistant() {
        common_1.abstract();
    }
    isExplodable() {
        common_1.abstract();
    }
    isDamaged() {
        common_1.abstract();
    }
    isDamageableItem() {
        common_1.abstract();
    }
    isArmorItem() {
        common_1.abstract();
    }
    isWearableItem() {
        common_1.abstract();
    }
    getMaxDamage() {
        common_1.abstract();
    }
    getComponentItem() {
        common_1.abstract();
    }
    getDamageValue() {
        common_1.abstract();
    }
    getAttackDamage() {
        common_1.abstract();
    }
}
exports.ItemStack = ItemStack;
class PlayerInventory extends nativeclass_1.NativeClass {
    addItem(itemStack, v) {
        common_1.abstract();
    }
    clearSlot(slot, containerId) {
        common_1.abstract();
    }
    getContainerSize(containerId) {
        common_1.abstract();
    }
    getFirstEmptySlot() {
        common_1.abstract();
    }
    getHotbarSize() {
        common_1.abstract();
    }
    getItem(slot, containerId) {
        common_1.abstract();
    }
    getSelectedItem() {
        common_1.abstract();
    }
    getSelectedSlot() {
        return this.getInt8(0x10);
    }
    getSlotWithItem(itemStack, v2, v3) {
        common_1.abstract();
    }
    getSlots() {
        common_1.abstract();
    }
    selectSlot(slot, containerId) {
        common_1.abstract();
    }
    setItem(slot, itemStack, containerId, v) {
        common_1.abstract();
    }
    setSelectedItem(itemStack) {
        common_1.abstract();
    }
    swapSlots(primarySlot, secondarySlot) {
        common_1.abstract();
    }
}
exports.PlayerInventory = PlayerInventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUF1QztBQUN2QyxrREFBK0M7QUFDL0MsZ0RBQXFEO0FBQ3JELDRDQUF5QztBQUl6QyxJQUFZLFdBOEJYO0FBOUJELFdBQVksV0FBVztJQUNuQix1REFBYSxDQUFBO0lBQ2I7O09BRUc7SUFDSCwrQ0FBUyxDQUFBO0lBQ1Q7O09BRUc7SUFDSCwrQ0FBVSxDQUFBO0lBQ1Y7O09BRUc7SUFDSCxxREFBYSxDQUFBO0lBQ2I7O09BRUc7SUFDSCxpREFBVyxDQUFBO0lBQ1g7O09BRUc7SUFDSCxtREFBWSxDQUFBO0lBQ1o7O09BRUc7SUFDSCxtRUFBb0IsQ0FBQTtJQUNwQjs7T0FFRztJQUNILDJDQUFRLENBQUE7QUFDWixDQUFDLEVBOUJXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBOEJ0QjtBQUVELElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQix5Q0FBSSxDQUFBO0lBQ0osMkNBQUssQ0FBQTtJQUNMLHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0FBQ1IsQ0FBQyxFQUxXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBS3BCO0FBRUQsSUFBWSxvQkFLWDtBQUxELFdBQVksb0JBQW9CO0lBQzVCLCtFQUFnQixDQUFBO0lBQ2hCLG1FQUFVLENBQUE7SUFDVixpRUFBUyxDQUFBO0lBQ1QsaUZBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUxXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBSy9CO0FBRUQsTUFBYSxJQUFLLFNBQVEseUJBQVc7SUFDakMsWUFBWTtRQUNSLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxjQUFjO1FBQ1YsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELG1CQUFtQjtRQUNmLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFD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