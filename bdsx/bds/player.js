"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerPermission = exports.GameType = exports.ServerPlayer = exports.Player = void 0;
const common_1 = require("bdsx/common");
const actor_1 = require("./actor");
class Player extends actor_1.Actor {
    changeDimension(dimensionId, respawn) {
        common_1.abstract();
    }
    setName(name) {
        common_1.abstract();
    }
    teleportTo(position, checkForBlocks, c, actorType, actorId) {
        common_1.abstract();
    }
    getGameType() {
        common_1.abstract();
    }
    getInventory() {
        common_1.abstract();
    }
    getMainhandSlot() {
        common_1.abstract();
    }
    getOffhandSlot() {
        common_1.abstract();
    }
    getPermissionLevel() {
        common_1.abstract();
    }
    startCooldown(Item) {
        common_1.abstract();
    }
    setSize(v1, v2) {
        common_1.abstract();
    }
    setSleeping(bool) {
        common_1.abstract();
    }
    isSleeping() {
        common_1.abstract();
    }
    isJumping() {
        common_1.abstract();
    }
}
exports.Player = Player;
class ServerPlayer extends Player {
    _sendInventory(b) {
        common_1.abstract();
    }
    openInventory() {
        common_1.abstract();
    }
    sendNetworkPacket(packet) {
        common_1.abstract();
    }
    sendInventory(b = false) {
        setTimeout(() => {
            this._sendInventory(b);
        }, 50);
    }
}
exports.ServerPlayer = ServerPlayer;
var GameType;
(function (GameType) {
    GameType[GameType["Survival"] = 0] = "Survival";
    GameType[GameType["Creative"] = 1] = "Creative";
    GameType[GameType["Adventure"] = 2] = "Adventure";
    GameType[GameType["SurvivalSpectator"] = 3] = "SurvivalSpectator";
    GameType[GameType["CreativeSpectator"] = 4] = "CreativeSpectator";
    GameType[GameType["Default"] = 5] = "Default";
})(GameType = exports.GameType || (exports.GameType = {}));
var PlayerPermission;
(function (PlayerPermission) {
    PlayerPermission[PlayerPermission["VISITOR"] = 0] = "VISITOR";
    PlayerPermission[PlayerPermission["MEMBER"] = 1] = "MEMBER";
    PlayerPermission[PlayerPermission["OPERATOR"] = 2] = "OPERATOR";
    PlayerPermission[PlayerPermission["CUSTOM"] = 3] = "CUSTOM";
})(PlayerPermission = exports.PlayerPermission || (exports.PlayerPermission = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUF1QztBQUN2QyxtQ0FBK0M7QUFNL0MsTUFBYSxNQUFPLFNBQVEsYUFBSztJQUU3QixlQUFlLENBQUMsV0FBa0IsRUFBRSxPQUFlO1FBQy9DLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBVztRQUNmLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUMsUUFBYSxFQUFFLGNBQXNCLEVBQUUsQ0FBUSxFQUFFLFNBQWdCLEVBQUUsT0FBcUI7UUFDL0YsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFdBQVc7UUFDUCxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWTtRQUNSLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlO1FBQ1gsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWM7UUFDVixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFTO1FBQ25CLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPLENBQUMsRUFBUyxFQUFFLEVBQVM7UUFDeEIsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVO1FBQ04saUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFNBQVM7UUFDTCxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFyREQsd0JBcURDO0FBRUQsTUFBYSxZQUFhLFNBQVEsTUFBTTtJQUcxQixjQUFjLENBQUMsQ0FBUztRQUM5QixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsYUFBYTtRQUNULGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxNQUFhO1FBQzNCLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBWSxLQUFLO1FBQzNCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDSjtBQXBCRCxvQ0FvQkM7QUFFRCxJQUFZLFFBT1g7QUFQRCxXQUFZLFFBQVE7SUFDaEIsK0NBQVEsQ0FBQTtJQUNSLCtDQUFRLENBQUE7SUFDUixpREFBUyxDQUFBO0lBQ1QsaUVBQWlCLENBQUE7SUFDakIsaUVBQWlCLENBQUE7SUFDakIsNkNBQU8sQ0FBQTtBQUNYLENBQUMsRUFQVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU9uQjtBQUVELElBQVksZ0JBS1g7QUFMRCxXQUFZLGdCQUFnQjtJQUN4Qiw2REFBTyxDQUFBO0lBQ1AsMkRBQU0sQ0FBQTtJQUNOLCtEQUFRLENBQUE7SUFDUiwyREFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUxXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBSzNCIn0=