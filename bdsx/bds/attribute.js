"use strict";
// AttributeInstance* getMutableInstance(AttributeId type) noexcept;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAttributeMap = exports.AttributeInstance = exports.AttributeId = void 0;
const common_1 = require("bdsx/common");
const nativeclass_1 = require("bdsx/nativeclass");
var AttributeId;
(function (AttributeId) {
    AttributeId[AttributeId["ZombieSpawnReinforcementsChange"] = 1] = "ZombieSpawnReinforcementsChange";
    AttributeId[AttributeId["PlayerHunger"] = 2] = "PlayerHunger";
    AttributeId[AttributeId["PlayerSaturation"] = 3] = "PlayerSaturation";
    AttributeId[AttributeId["PlayerExhaustion"] = 4] = "PlayerExhaustion";
    AttributeId[AttributeId["PlayerLevel"] = 5] = "PlayerLevel";
    AttributeId[AttributeId["PlayerExperience"] = 6] = "PlayerExperience";
    AttributeId[AttributeId["Health"] = 7] = "Health";
    AttributeId[AttributeId["FollowRange"] = 8] = "FollowRange";
    AttributeId[AttributeId["KnockbackResistance"] = 9] = "KnockbackResistance";
    AttributeId[AttributeId["MovementSpeed"] = 10] = "MovementSpeed";
    AttributeId[AttributeId["UnderwaterMovementSpeed"] = 11] = "UnderwaterMovementSpeed";
    AttributeId[AttributeId["AttackDamage"] = 12] = "AttackDamage";
    AttributeId[AttributeId["Absorption"] = 13] = "Absorption";
    AttributeId[AttributeId["Luck"] = 14] = "Luck";
    AttributeId[AttributeId["JumpStrength"] = 15] = "JumpStrength";
})(AttributeId = exports.AttributeId || (exports.AttributeId = {}));
class AttributeInstance extends nativeclass_1.NativeClass {
}
exports.AttributeInstance = AttributeInstance;
class BaseAttributeMap extends nativeclass_1.NativeClass {
    getMutableInstance(type) {
        common_1.abstract();
    }
}
exports.BaseAttributeMap = BaseAttributeMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvRUFBb0U7OztBQUVwRSx3Q0FBdUM7QUFFdkMsa0RBQStDO0FBSS9DLElBQVksV0FpQlg7QUFqQkQsV0FBWSxXQUFXO0lBRXRCLG1HQUFpQyxDQUFBO0lBQ2pDLDZEQUFjLENBQUE7SUFDZCxxRUFBa0IsQ0FBQTtJQUNsQixxRUFBa0IsQ0FBQTtJQUNsQiwyREFBYSxDQUFBO0lBQ2IscUVBQWtCLENBQUE7SUFDbEIsaURBQVEsQ0FBQTtJQUNSLDJEQUFhLENBQUE7SUFDYiwyRUFBcUIsQ0FBQTtJQUNyQixnRUFBZ0IsQ0FBQTtJQUNoQixvRkFBMEIsQ0FBQTtJQUMxQiw4REFBZSxDQUFBO0lBQ2YsMERBQWEsQ0FBQTtJQUNiLDhDQUFPLENBQUE7SUFDUCw4REFBZSxDQUFBO0FBQ2hCLENBQUMsRUFqQlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFpQnRCO0FBRUQsTUFBYSxpQkFBa0IsU0FBUSx5QkFBVztDQVFqRDtBQVJELDhDQVFDO0FBQ0QsTUFBYSxnQkFBaUIsU0FBUSx5QkFBVztJQUM3QyxrQkFBa0IsQ0FBQyxJQUFnQjtRQUMvQixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFKRCw0Q0FJQyJ9