"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enchantSelectedItem = exports.enchantInventoryItem = exports.Enchantment = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const core_1 = require("bdsx/core");
const nativetype_1 = require("bdsx/nativetype");
const prochacker_1 = require("bdsx/prochacker");
const hacker = prochacker_1.ProcHacker.load("../pdbcache.ini", ["?applyEnchant@EnchantUtils@@SA_NAEAVItemStackBase@@W4Type@Enchant@@H_N@Z", "?clone@ItemStack@@QEBA?AV1@XZ"]);
core_1.pdb.close();
const enchant = hacker.js("?applyEnchant@EnchantUtils@@SA_NAEAVItemStackBase@@W4Type@Enchant@@H_N@Z", nativetype_1.bool_t, null, inventory_1.ItemStack, nativetype_1.int16_t, nativetype_1.int32_t, nativetype_1.bool_t);
exports.Enchantment = { "protection": 0, "fire_protection": 1, "feather_falling": 2, "blast_protection": 3, "projectile_protection": 4, "thorns": 5, "respiration": 6, "depth_strider": 7, "aqua_affinity": 8, "sharpness": 9, "smite": 10, "bane_of_arthropods": 11, "knockback": 12, "fire_aspect": 13, "looting": 14, "efficiency": 15, "silk_touch": 16, "unbreaking": 17, "fortune": 18, "power": 19, "punch": 20, "flame": 21, "infinity": 22, "luck_of_the_sea": 23, "lure": 24, "frost_walker": 25, "mending": 26, "binding_curse": 27, "vanishing_curse": 28, "impaling": 29, "riptide": 30, "loyalty": 31, "channeling": 32, "multishot": 33, "piercing": 34, "quick_charge": 35, "soul_speed": 36 };
function enchantInventoryItem(player, slot, container, enchantment, level, isUnsafe) {
    let inventory = player.getInventory();
    let item = inventory.getItem(slot, container);
    enchant(item, enchantment, level, isUnsafe);
    player.sendInventory(false);
}
exports.enchantInventoryItem = enchantInventoryItem;
function enchantSelectedItem(player, enchantment, level, isUnsafe) {
    enchant(player.getInventory().getSelectedItem(), enchantment, level, isUnsafe);
    player.sendInventory(false);
}
exports.enchantSelectedItem = enchantSelectedItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jaGFudEZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5jaGFudEZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGtEQUE0RDtBQUM1RCxvQ0FBZ0M7QUFDaEMsZ0RBQTJEO0FBQzNELGdEQUE2QztBQUU3QyxNQUFNLE1BQU0sR0FBRyx1QkFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLDBFQUEwRSxFQUFFLCtCQUErQixDQUFDLENBQUMsQ0FBQztBQUNqSyxVQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFWixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLDBFQUEwRSxFQUFFLG1CQUFNLEVBQUUsSUFBSSxFQUFFLHFCQUFTLEVBQUUsb0JBQU8sRUFBRSxvQkFBTyxFQUFFLG1CQUFNLENBQUMsQ0FBQztBQUM1SSxRQUFBLFdBQVcsR0FBUSxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxFQUFDLGlCQUFpQixFQUFDLENBQUMsRUFBQyxrQkFBa0IsRUFBQyxDQUFDLEVBQUMsdUJBQXVCLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLENBQUMsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLG9CQUFvQixFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLGFBQWEsRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsaUJBQWlCLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsaUJBQWlCLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLGNBQWMsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFBO0FBRTdtQixTQUFnQixvQkFBb0IsQ0FBQyxNQUFvQixFQUFFLElBQVksRUFBRSxTQUFzQixFQUFFLFdBQW1CLEVBQUUsS0FBYSxFQUFFLFFBQWlCO0lBQ2xKLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBTEQsb0RBS0M7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxNQUFvQixFQUFFLFdBQW1CLEVBQUUsS0FBYSxFQUFFLFFBQWlCO0lBQzNHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFIRCxrREFHQyJ9