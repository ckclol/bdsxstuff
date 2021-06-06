"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNDNAME_NAME_ONLY = exports.UNDNAME_COMPLETE = exports.SYMOPT_UNDNAME = exports.abstract = exports.emptyFunc = exports.Encoding = exports.DeviceOS = exports.AttributeName = exports.CANCEL = void 0;
exports.CANCEL = { toString() { return 'CANCEL'; } };
var AttributeName;
(function (AttributeName) {
    AttributeName["ZombieSpawnReinforcementsChange"] = "minecraft:zombie.spawn.reinforcements";
    AttributeName["PlayerHunger"] = "minecraft:player.hunger";
    AttributeName["PlayerSaturation"] = "minecraft:player.saturation";
    AttributeName["PlayerExhaustion"] = "minecraft:player.exhaustion";
    AttributeName["PlayerLevel"] = "minecraft:player.level";
    AttributeName["PlayerExperience"] = "minecraft:player.experience";
    AttributeName["Health"] = "minecraft:health";
    AttributeName["FollowRange"] = "minecraft:follow_range";
    AttributeName["KnockbackResistance"] = "minecraft:knockback_registance";
    AttributeName["MovementSpeed"] = "minecraft:movement";
    AttributeName["UnderwaterMovementSpeed"] = "minecraft:underwater_movement";
    AttributeName["AttackDamage"] = "minecraft:attack_damage";
    AttributeName["Absorption"] = "minecraft:absorption";
    AttributeName["Luck"] = "minecraft:luck";
    AttributeName["JumpStrength"] = "minecraft:horse.jump_strength";
})(AttributeName = exports.AttributeName || (exports.AttributeName = {}));
// https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/network/mcpe/protocol/types/DeviceOS.php
var DeviceOS;
(function (DeviceOS) {
    DeviceOS[DeviceOS["UNKNOWN"] = -1] = "UNKNOWN";
    DeviceOS[DeviceOS["ANDROID"] = 1] = "ANDROID";
    DeviceOS[DeviceOS["IOS"] = 2] = "IOS";
    DeviceOS[DeviceOS["OSX"] = 3] = "OSX";
    DeviceOS[DeviceOS["AMAZON"] = 4] = "AMAZON";
    DeviceOS[DeviceOS["GEAR_VR"] = 5] = "GEAR_VR";
    DeviceOS[DeviceOS["HOLOLENS"] = 6] = "HOLOLENS";
    DeviceOS[DeviceOS["WINDOWS_10"] = 7] = "WINDOWS_10";
    DeviceOS[DeviceOS["WIN32"] = 8] = "WIN32";
    DeviceOS[DeviceOS["DEDICATED"] = 9] = "DEDICATED";
    DeviceOS[DeviceOS["TVOS"] = 10] = "TVOS";
    DeviceOS[DeviceOS["PLAYSTATION"] = 11] = "PLAYSTATION";
    DeviceOS[DeviceOS["NINTENDO"] = 12] = "NINTENDO";
    DeviceOS[DeviceOS["XBOX"] = 13] = "XBOX";
    DeviceOS[DeviceOS["WINDOWS_PHONE"] = 14] = "WINDOWS_PHONE";
})(DeviceOS = exports.DeviceOS || (exports.DeviceOS = {}));
var Encoding;
(function (Encoding) {
    Encoding[Encoding["Utf16"] = -2] = "Utf16";
    Encoding[Encoding["Buffer"] = -1] = "Buffer";
    Encoding[Encoding["Utf8"] = 0] = "Utf8";
    Encoding[Encoding["None"] = 1] = "None";
    Encoding[Encoding["Ansi"] = 2] = "Ansi";
})(Encoding = exports.Encoding || (exports.Encoding = {}));
function emptyFunc() {
    // empty
}
exports.emptyFunc = emptyFunc;
function abstract() {
    throw Error('abstract');
}
exports.abstract = abstract;
/** @deprecated use `bdsx/dbghelp` */
exports.SYMOPT_UNDNAME = 0x00000002;
/** @deprecated use `bdsx/dbghelp` */
exports.UNDNAME_COMPLETE = 0x0000; // Enable full undecoration
/** @deprecated use `bdsx/dbghelp` */
exports.UNDNAME_NAME_ONLY = 0x1000; // Crack only the name for primary declaration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1hLFFBQUEsTUFBTSxHQUFVLEVBQUMsUUFBUSxLQUFJLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7QUFFOUQsSUFBWSxhQWdCWDtBQWhCRCxXQUFZLGFBQWE7SUFDeEIsMEZBQXVFLENBQUE7SUFDdkUseURBQXNDLENBQUE7SUFDdEMsaUVBQThDLENBQUE7SUFDOUMsaUVBQThDLENBQUE7SUFDOUMsdURBQW9DLENBQUE7SUFDcEMsaUVBQThDLENBQUE7SUFDOUMsNENBQXlCLENBQUE7SUFDekIsdURBQW9DLENBQUE7SUFDcEMsdUVBQW9ELENBQUE7SUFDcEQscURBQWtDLENBQUE7SUFDbEMsMEVBQXVELENBQUE7SUFDdkQseURBQXNDLENBQUE7SUFDdEMsb0RBQWlDLENBQUE7SUFDakMsd0NBQXFCLENBQUE7SUFDckIsK0RBQTRDLENBQUE7QUFDN0MsQ0FBQyxFQWhCVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQWdCeEI7QUFFRCw0R0FBNEc7QUFDNUcsSUFBWSxRQWdCWDtBQWhCRCxXQUFZLFFBQVE7SUFDbkIsOENBQVksQ0FBQTtJQUNaLDZDQUFXLENBQUE7SUFDWCxxQ0FBTyxDQUFBO0lBQ1AscUNBQU8sQ0FBQTtJQUNQLDJDQUFVLENBQUE7SUFDViw2Q0FBVyxDQUFBO0lBQ1gsK0NBQVksQ0FBQTtJQUNaLG1EQUFjLENBQUE7SUFDZCx5Q0FBUyxDQUFBO0lBQ1QsaURBQWEsQ0FBQTtJQUNiLHdDQUFTLENBQUE7SUFDVCxzREFBZ0IsQ0FBQTtJQUNoQixnREFBYSxDQUFBO0lBQ2Isd0NBQVMsQ0FBQTtJQUNULDBEQUFrQixDQUFBO0FBQ25CLENBQUMsRUFoQlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFnQm5CO0FBRUQsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ25CLDBDQUFRLENBQUE7SUFDUiw0Q0FBUyxDQUFBO0lBQ1QsdUNBQU0sQ0FBQTtJQUNOLHVDQUFJLENBQUE7SUFDSix1Q0FBSSxDQUFBO0FBQ0wsQ0FBQyxFQU5XLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBTW5CO0FBU0QsU0FBZ0IsU0FBUztJQUN4QixRQUFRO0FBQ1QsQ0FBQztBQUZELDhCQUVDO0FBRUQsU0FBZ0IsUUFBUTtJQUNwQixNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxxQ0FBcUM7QUFDeEIsUUFBQSxjQUFjLEdBQXFCLFVBQVUsQ0FBQztBQUMzRCxxQ0FBcUM7QUFDeEIsUUFBQSxnQkFBZ0IsR0FBbUIsTUFBTSxDQUFDLENBQUUsMkJBQTJCO0FBQ3BGLHFDQUFxQztBQUN4QixRQUFBLGlCQUFpQixHQUFrQixNQUFNLENBQUMsQ0FBRSwrQ0FBK0MifQ==