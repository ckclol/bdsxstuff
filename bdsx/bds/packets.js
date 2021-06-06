"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerClosePacket = exports.ContainerOpenPacket = exports.RespawnPacket = exports.AnimatePacket = exports.SetSpawnPositionPacket = exports.SetHealthPacket = exports.SetActorLinkPacket = exports.SetActorMotionPacket = exports.SetActorDataPacket = exports.HurtArmorPacket = exports.EntityFallPacket = exports.PlayerActionPacket = exports.ActorPickRequestPacket = exports.BlockPickRequestPacket = exports.InteractPacket = exports.MobArmorEquipmentPacket = exports.MobEquipmentPacket = exports.InventoryTransactionPacket = exports.UpdateAttributesPacket = exports.AttributeData = exports.MobEffectPacket = exports.EntityEventPacket = exports.ActorEventPacket = exports.BlockEventPacket = exports.LevelEventPacket = exports.LevelSoundEventPacketV1 = exports.TickSyncPacket = exports.AddPaintingPacket = exports.UpdateBlockPacket = exports.RiderJumpPacket = exports.MovePlayerPacket = exports.MoveActorAbsolutePacket = exports.TakeItemActorPacket = exports.AddItemActorPacket = exports.RemoveActorPacket = exports.AddActorPacket = exports.AddPlayerPacket = exports.StartGamePacket = exports.LevelSettings = exports.SetTimePacket = exports.TextPacket = exports.ResourcePackClientResponsePacket = exports.ResourcePacksStackPacket = exports.ResourcePacksInfoPacket = exports.DisconnectPacket = exports.ClientToServerHandshakePacket = exports.ServerToClientHandshakePacket = exports.PlayStatusPacket = exports.LoginPacket = exports.NetworkBlockPosition = void 0;
exports.PhotoTransferPacket = exports.NpcRequestPacket = exports.BookEditPacket = exports.SetLastHurtByPacket = exports.WSConnectPacket = exports.SubClientLoginPacket = exports.PlayerSkinPacket = exports.PurchaseReceiptPacket = exports.ShowStoreOfferPacket = exports.StructureBlockUpdatePacket = exports.AddBehaviorTreePacket = exports.SetTitlePacket = exports.StopSoundPacket = exports.PlaySoundPacket = exports.TransferPacket = exports.ResourcePackChunkRequestPacket = exports.ResourcePackChunkDataPacket = exports.ResourcePackDataInfoPacket = exports.CommandOutputPacket = exports.CommandBlockUpdatePacket = exports.CommandRequestPacket = exports.AvailableCommandsPacket = exports.ShowCreditsPacket = exports.BossEventPacket = exports.CameraPacket = exports.GameRulesChangedPacket = exports.ItemFrameDropItemPacket = exports.ChunkRadiusUpdatedPacket = exports.RequestChunkRadiusPacket = exports.MapInfoRequestPacket = exports.MapItemDataPacket = exports.SpawnExperienceOrbPacket = exports.TelemetryEventPacket = exports.SimpleEventPacket = exports.PlayerListPacket = exports.SetPlayerGameTypePacket = exports.ChangeDimensionPacket = exports.SetDifficultyPacket = exports.SetCommandsEnabledPacket = exports.LevelChunkPacket = exports.PlayerInputPacket = exports.BlockActorDataPacket = exports.AdventureSettingsPacket = exports.GuiDataPickItemPacket = exports.CraftingEventPacket = exports.CraftingDataPacket = exports.ContainerSetDataPacket = exports.InventorySlotPacket = exports.InventoryContentPacket = exports.PlayerHotbarPacket = void 0;
exports.CodeBuilderPacket = exports.PlayerArmorDamagePacket = exports.ItemStackResponse = exports.ItemStackRequest = exports.PlayerEnchantOptionsPacket = exports.CreativeContentPacket = exports.PlayerAuthInputPacket = exports.NetworkSettingsPacket = exports.CompletedUsingItemPacket = exports.AnvilDamagePacket = exports.SettingsCommandPacket = exports.MultiplayerSettingsPacket = exports.EmotePacket = exports.EducationSettingsPacket = exports.ClientCacheMissResponsePacket = exports.ClientCacheBlobStatusPacket = exports.StructureTemplateDataExportPacket = exports.StructureTemplateDataRequestPacket = exports.MapCreateLockedCopy = exports.OnScreenTextureAnimationPacket = exports.ClientCacheStatusPacket = exports.RemoveEntityPacket = exports.LecternUpdatePacket = exports.LevelEventGenericPacket = exports.LevelSoundEventPacket = exports.BiomeDefinitionList = exports.NetworkChunkPublisherUpdatePacket = exports.LevelSoundEventPacketV2 = exports.AvailableActorIdentifiersPacket = exports.SpawnParticleEffect = exports.ScriptCustomEventPacket = exports.NetworkStackLatencyPacket = exports.UpdateSoftEnumPacket = exports.SetLocalPlayerAsInitializedPacket = exports.SetScoreboardIdentityPacket = exports.MoveActorDeltaPacket = exports.UpdateBlockPacketSynced = exports.LabTablePacket = exports.SetScorePacket = exports.ScorePacketInfo = exports.ScoreboardId = exports.SetDisplayObjectivePacket = exports.RemoveObjectivePacket = exports.SetDefaultGameTypePacket = exports.ShowProfilePacket = exports.ServerSettingsResponsePacket = exports.ServerSettingsRequestPacket = exports.ModalFormResponsePacket = exports.ModalFormRequestPacket = exports.ShowModalFormPacket = void 0;
exports.PacketIdToType = exports.FilterTextPacket = exports.ItemComponentPacket = exports.CorrectPlayerMovePredictionPacket = exports.PlayerFogPacket = exports.CameraShakePacket = exports.AnimateEntityPacket = exports.MotionPredictionHintsPacket = exports.PacketViolationWarningPacket = exports.DebugInfoPacket = exports.PositionTrackingDBClientRequest = exports.PositionTrackingDBServerBroadcast = exports.EmoteListPacket = exports.UpdatePlayerGameTypePacket = void 0;
const tslib_1 = require("tslib");
const cxxvector_1 = require("bdsx/cxxvector");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const actor_1 = require("./actor");
const blockpos_1 = require("./blockpos");
const connreq_1 = require("./connreq");
const hashedstring_1 = require("./hashedstring");
const packet_1 = require("./packet");
/** @deprecated use BlockPos instead */
exports.NetworkBlockPosition = blockpos_1.BlockPos;
let LoginPacket = class LoginPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t, 0x30)
], LoginPacket.prototype, "protocol", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(connreq_1.ConnectionRequest.ref(), 0x38)
], LoginPacket.prototype, "connreq", void 0);
LoginPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LoginPacket);
exports.LoginPacket = LoginPacket;
let PlayStatusPacket = class PlayStatusPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], PlayStatusPacket.prototype, "status", void 0);
PlayStatusPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayStatusPacket);
exports.PlayStatusPacket = PlayStatusPacket;
let ServerToClientHandshakePacket = class ServerToClientHandshakePacket extends packet_1.Packet {
};
ServerToClientHandshakePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ServerToClientHandshakePacket);
exports.ServerToClientHandshakePacket = ServerToClientHandshakePacket;
let ClientToServerHandshakePacket = class ClientToServerHandshakePacket extends packet_1.Packet {
};
ClientToServerHandshakePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ClientToServerHandshakePacket);
exports.ClientToServerHandshakePacket = ClientToServerHandshakePacket;
let DisconnectPacket = class DisconnectPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString, 0x38)
], DisconnectPacket.prototype, "message", void 0);
DisconnectPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], DisconnectPacket);
exports.DisconnectPacket = DisconnectPacket;
let ResourcePacksInfoPacket = class ResourcePacksInfoPacket extends packet_1.Packet {
};
ResourcePacksInfoPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ResourcePacksInfoPacket);
exports.ResourcePacksInfoPacket = ResourcePacksInfoPacket;
let ResourcePacksStackPacket = class ResourcePacksStackPacket extends packet_1.Packet {
};
ResourcePacksStackPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ResourcePacksStackPacket);
exports.ResourcePacksStackPacket = ResourcePacksStackPacket;
let ResourcePackClientResponsePacket = class ResourcePackClientResponsePacket extends packet_1.Packet {
};
ResourcePackClientResponsePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ResourcePackClientResponsePacket);
exports.ResourcePackClientResponsePacket = ResourcePackClientResponsePacket;
let TextPacket = class TextPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], TextPacket.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], TextPacket.prototype, "name", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], TextPacket.prototype, "message", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(nativetype_1.CxxString))
], TextPacket.prototype, "params", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t, 0x90)
], TextPacket.prototype, "needsTranslation", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString, 0x98)
], TextPacket.prototype, "xboxUserId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], TextPacket.prototype, "platformChatId", void 0);
TextPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], TextPacket);
exports.TextPacket = TextPacket;
(function (TextPacket) {
    let Types;
    (function (Types) {
        Types[Types["Raw"] = 0] = "Raw";
        Types[Types["Chat"] = 1] = "Chat";
        Types[Types["Translated"] = 2] = "Translated";
        Types[Types["Popup"] = 3] = "Popup";
        Types[Types["JukeboxPopup"] = 4] = "JukeboxPopup";
        Types[Types["Tip"] = 5] = "Tip";
        Types[Types["System"] = 6] = "System";
        Types[Types["Whisper"] = 7] = "Whisper";
        Types[Types["Announcement"] = 8] = "Announcement";
        Types[Types["ObjectWhisper"] = 9] = "ObjectWhisper";
        Types[Types["Object"] = 10] = "Object";
    })(Types = TextPacket.Types || (TextPacket.Types = {}));
})(TextPacket = exports.TextPacket || (exports.TextPacket = {}));
exports.TextPacket = TextPacket;
let SetTimePacket = class SetTimePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], SetTimePacket.prototype, "time", void 0);
SetTimePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetTimePacket);
exports.SetTimePacket = SetTimePacket;
let LevelSettings = class LevelSettings extends nativeclass_1.MantleClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], LevelSettings.prototype, "seed", void 0);
LevelSettings = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelSettings);
exports.LevelSettings = LevelSettings;
let StartGamePacket = class StartGamePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(LevelSettings)
], StartGamePacket.prototype, "settings", void 0);
StartGamePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], StartGamePacket);
exports.StartGamePacket = StartGamePacket;
let AddPlayerPacket = class AddPlayerPacket extends packet_1.Packet {
};
AddPlayerPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AddPlayerPacket);
exports.AddPlayerPacket = AddPlayerPacket;
let AddActorPacket = class AddActorPacket extends packet_1.Packet {
};
AddActorPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AddActorPacket);
exports.AddActorPacket = AddActorPacket;
let RemoveActorPacket = class RemoveActorPacket extends packet_1.Packet {
};
RemoveActorPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RemoveActorPacket);
exports.RemoveActorPacket = RemoveActorPacket;
let AddItemActorPacket = class AddItemActorPacket extends packet_1.Packet {
};
AddItemActorPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AddItemActorPacket);
exports.AddItemActorPacket = AddItemActorPacket;
let TakeItemActorPacket = class TakeItemActorPacket extends packet_1.Packet {
};
TakeItemActorPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], TakeItemActorPacket);
exports.TakeItemActorPacket = TakeItemActorPacket;
let MoveActorAbsolutePacket = class MoveActorAbsolutePacket extends packet_1.Packet {
};
MoveActorAbsolutePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MoveActorAbsolutePacket);
exports.MoveActorAbsolutePacket = MoveActorAbsolutePacket;
let MovePlayerPacket = class MovePlayerPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], MovePlayerPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], MovePlayerPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], MovePlayerPacket.prototype, "pitch", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], MovePlayerPacket.prototype, "yaw", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], MovePlayerPacket.prototype, "headYaw", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], MovePlayerPacket.prototype, "mode", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], MovePlayerPacket.prototype, "onGround", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], MovePlayerPacket.prototype, "ridingActorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], MovePlayerPacket.prototype, "teleportCause", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], MovePlayerPacket.prototype, "teleportItem", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], MovePlayerPacket.prototype, "tick", void 0);
MovePlayerPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MovePlayerPacket);
exports.MovePlayerPacket = MovePlayerPacket;
(function (MovePlayerPacket) {
    let Modes;
    (function (Modes) {
        Modes[Modes["Normal"] = 0] = "Normal";
        Modes[Modes["Reset"] = 1] = "Reset";
        Modes[Modes["Teleport"] = 2] = "Teleport";
        Modes[Modes["Pitch"] = 3] = "Pitch";
    })(Modes = MovePlayerPacket.Modes || (MovePlayerPacket.Modes = {}));
})(MovePlayerPacket = exports.MovePlayerPacket || (exports.MovePlayerPacket = {}));
exports.MovePlayerPacket = MovePlayerPacket;
let RiderJumpPacket = class RiderJumpPacket extends packet_1.Packet {
};
RiderJumpPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RiderJumpPacket);
exports.RiderJumpPacket = RiderJumpPacket;
let UpdateBlockPacket = class UpdateBlockPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.BlockPos)
], UpdateBlockPacket.prototype, "blockPos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], UpdateBlockPacket.prototype, "blockRuntimeId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], UpdateBlockPacket.prototype, "flags", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], UpdateBlockPacket.prototype, "dataLayerId", void 0);
UpdateBlockPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], UpdateBlockPacket);
exports.UpdateBlockPacket = UpdateBlockPacket;
(function (UpdateBlockPacket) {
    let Flags;
    (function (Flags) {
        Flags[Flags["None"] = 0] = "None";
        Flags[Flags["Neighbors"] = 1] = "Neighbors";
        Flags[Flags["Network"] = 2] = "Network";
        Flags[Flags["All"] = 3] = "All";
        Flags[Flags["NoGraphic"] = 4] = "NoGraphic";
        Flags[Flags["Priority"] = 8] = "Priority";
        Flags[Flags["AllPriority"] = 11] = "AllPriority";
    })(Flags = UpdateBlockPacket.Flags || (UpdateBlockPacket.Flags = {}));
    let DataLayerIds;
    (function (DataLayerIds) {
        DataLayerIds[DataLayerIds["Normal"] = 0] = "Normal";
        DataLayerIds[DataLayerIds["Liquid"] = 1] = "Liquid";
    })(DataLayerIds = UpdateBlockPacket.DataLayerIds || (UpdateBlockPacket.DataLayerIds = {}));
})(UpdateBlockPacket = exports.UpdateBlockPacket || (exports.UpdateBlockPacket = {}));
exports.UpdateBlockPacket = UpdateBlockPacket;
let AddPaintingPacket = class AddPaintingPacket extends packet_1.Packet {
};
AddPaintingPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AddPaintingPacket);
exports.AddPaintingPacket = AddPaintingPacket;
let TickSyncPacket = class TickSyncPacket extends packet_1.Packet {
};
TickSyncPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], TickSyncPacket);
exports.TickSyncPacket = TickSyncPacket;
let LevelSoundEventPacketV1 = class LevelSoundEventPacketV1 extends packet_1.Packet {
};
LevelSoundEventPacketV1 = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelSoundEventPacketV1);
exports.LevelSoundEventPacketV1 = LevelSoundEventPacketV1;
let LevelEventPacket = class LevelEventPacket extends packet_1.Packet {
};
LevelEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelEventPacket);
exports.LevelEventPacket = LevelEventPacket;
let BlockEventPacket = class BlockEventPacket extends packet_1.Packet {
};
BlockEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BlockEventPacket);
exports.BlockEventPacket = BlockEventPacket;
let ActorEventPacket = class ActorEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], ActorEventPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], ActorEventPacket.prototype, "event", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], ActorEventPacket.prototype, "data", void 0);
ActorEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ActorEventPacket);
exports.ActorEventPacket = ActorEventPacket;
(function (ActorEventPacket) {
    let Events;
    (function (Events) {
        Events[Events["Jump"] = 1] = "Jump";
        Events[Events["HurtAnimation"] = 2] = "HurtAnimation";
        Events[Events["DeathAnimation"] = 3] = "DeathAnimation";
        Events[Events["ArmSwing"] = 4] = "ArmSwing";
        Events[Events["StopAttack"] = 5] = "StopAttack";
        Events[Events["TameFail"] = 6] = "TameFail";
        Events[Events["TameSuccess"] = 7] = "TameSuccess";
        Events[Events["ShakeWet"] = 8] = "ShakeWet";
        Events[Events["UseItem"] = 9] = "UseItem";
        Events[Events["EatGrassAnimation"] = 10] = "EatGrassAnimation";
        Events[Events["FishHookBubble"] = 11] = "FishHookBubble";
        Events[Events["FishHookPosition"] = 12] = "FishHookPosition";
        Events[Events["FishHookHook"] = 13] = "FishHookHook";
        Events[Events["FishHookTease"] = 14] = "FishHookTease";
        Events[Events["SquidInkCloud"] = 15] = "SquidInkCloud";
        Events[Events["ZombieVillagerCure"] = 16] = "ZombieVillagerCure";
        Events[Events["AmbientSound"] = 17] = "AmbientSound";
        Events[Events["Respawn"] = 18] = "Respawn";
        Events[Events["IronGolemOfferFlower"] = 19] = "IronGolemOfferFlower";
        Events[Events["IronGolemWithdrawFlower"] = 20] = "IronGolemWithdrawFlower";
        Events[Events["LoveParticles"] = 21] = "LoveParticles";
        Events[Events["VillagerAngry"] = 22] = "VillagerAngry";
        Events[Events["VillagerHappy"] = 23] = "VillagerHappy";
        Events[Events["WitchSpellParticles"] = 24] = "WitchSpellParticles";
        Events[Events["FireworkParticles"] = 25] = "FireworkParticles";
        Events[Events["InLoveParticles"] = 26] = "InLoveParticles";
        Events[Events["SilverfishSpawnAnimation"] = 27] = "SilverfishSpawnAnimation";
        Events[Events["GuardianAttack"] = 28] = "GuardianAttack";
        Events[Events["WitchDrinkPotion"] = 29] = "WitchDrinkPotion";
        Events[Events["WitchThrowPotion"] = 30] = "WitchThrowPotion";
        Events[Events["MinecartTntPrimeFuse"] = 31] = "MinecartTntPrimeFuse";
        Events[Events["CreeperPrimeFuse"] = 32] = "CreeperPrimeFuse";
        Events[Events["AirSupplyExpired"] = 33] = "AirSupplyExpired";
        Events[Events["PlayerAddXpLevels"] = 34] = "PlayerAddXpLevels";
        Events[Events["ElderGuardianCurse"] = 35] = "ElderGuardianCurse";
        Events[Events["AgentArmSwing"] = 36] = "AgentArmSwing";
        Events[Events["EnderDragonDeath"] = 37] = "EnderDragonDeath";
        Events[Events["DustParticles"] = 38] = "DustParticles";
        Events[Events["ArrowShake"] = 39] = "ArrowShake";
        Events[Events["EatingItem"] = 57] = "EatingItem";
        Events[Events["BabyAnimalFeed"] = 60] = "BabyAnimalFeed";
        Events[Events["DeathSmokeCloud"] = 61] = "DeathSmokeCloud";
        Events[Events["CompleteTrade"] = 62] = "CompleteTrade";
        Events[Events["RemoveLeash"] = 63] = "RemoveLeash";
        Events[Events["ConsumeTotem"] = 65] = "ConsumeTotem";
        Events[Events["PlayerCheckTreasureHunterAchievement"] = 66] = "PlayerCheckTreasureHunterAchievement";
        Events[Events["EntitySpawn"] = 67] = "EntitySpawn";
        Events[Events["DragonPuke"] = 68] = "DragonPuke";
        Events[Events["ItemEntityMerge"] = 69] = "ItemEntityMerge";
        Events[Events["StartSwim"] = 70] = "StartSwim";
        Events[Events["BalloonPop"] = 71] = "BalloonPop";
        Events[Events["TreasureHunt"] = 72] = "TreasureHunt";
        Events[Events["AgentSummon"] = 73] = "AgentSummon";
        Events[Events["ChargedCrossbow"] = 74] = "ChargedCrossbow";
        Events[Events["Fall"] = 75] = "Fall";
    })(Events = ActorEventPacket.Events || (ActorEventPacket.Events = {}));
})(ActorEventPacket = exports.ActorEventPacket || (exports.ActorEventPacket = {}));
exports.ActorEventPacket = ActorEventPacket;
/** @deprecated use ActorEventPacket, matching to official name */
exports.EntityEventPacket = ActorEventPacket;
let MobEffectPacket = class MobEffectPacket extends packet_1.Packet {
};
MobEffectPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MobEffectPacket);
exports.MobEffectPacket = MobEffectPacket;
let AttributeData = class AttributeData extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.min = 0;
        this.max = 0;
        this.current = 0;
        this.default = 0;
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], AttributeData.prototype, "current", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], AttributeData.prototype, "min", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], AttributeData.prototype, "max", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], AttributeData.prototype, "default", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(hashedstring_1.HashedString)
], AttributeData.prototype, "name", void 0);
AttributeData = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x40)
], AttributeData);
exports.AttributeData = AttributeData;
let UpdateAttributesPacket = class UpdateAttributesPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], UpdateAttributesPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(AttributeData))
], UpdateAttributesPacket.prototype, "attributes", void 0);
UpdateAttributesPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], UpdateAttributesPacket);
exports.UpdateAttributesPacket = UpdateAttributesPacket;
let InventoryTransactionPacket = class InventoryTransactionPacket extends packet_1.Packet {
};
InventoryTransactionPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], InventoryTransactionPacket);
exports.InventoryTransactionPacket = InventoryTransactionPacket;
let MobEquipmentPacket = class MobEquipmentPacket extends packet_1.Packet {
};
MobEquipmentPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MobEquipmentPacket);
exports.MobEquipmentPacket = MobEquipmentPacket;
let MobArmorEquipmentPacket = class MobArmorEquipmentPacket extends packet_1.Packet {
};
MobArmorEquipmentPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MobArmorEquipmentPacket);
exports.MobArmorEquipmentPacket = MobArmorEquipmentPacket;
let InteractPacket = class InteractPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], InteractPacket.prototype, "action", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], InteractPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], InteractPacket.prototype, "pos", void 0);
InteractPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], InteractPacket);
exports.InteractPacket = InteractPacket;
(function (InteractPacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["LeaveVehicle"] = 3] = "LeaveVehicle";
        Actions[Actions["Mouseover"] = 4] = "Mouseover";
        Actions[Actions["OpenNPC"] = 5] = "OpenNPC";
        Actions[Actions["OpenInventory"] = 6] = "OpenInventory";
    })(Actions = InteractPacket.Actions || (InteractPacket.Actions = {}));
})(InteractPacket = exports.InteractPacket || (exports.InteractPacket = {}));
exports.InteractPacket = InteractPacket;
let BlockPickRequestPacket = class BlockPickRequestPacket extends packet_1.Packet {
};
BlockPickRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BlockPickRequestPacket);
exports.BlockPickRequestPacket = BlockPickRequestPacket;
let ActorPickRequestPacket = class ActorPickRequestPacket extends packet_1.Packet {
};
ActorPickRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ActorPickRequestPacket);
exports.ActorPickRequestPacket = ActorPickRequestPacket;
let PlayerActionPacket = class PlayerActionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.BlockPos)
], PlayerActionPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], PlayerActionPacket.prototype, "face", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], PlayerActionPacket.prototype, "action", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], PlayerActionPacket.prototype, "actorId", void 0);
PlayerActionPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerActionPacket);
exports.PlayerActionPacket = PlayerActionPacket;
(function (PlayerActionPacket) {
    let Actions;
    (function (Actions) {
        /** @deprecated */
        Actions[Actions["StartBreak"] = 0] = "StartBreak";
        /** @deprecated */
        Actions[Actions["AbortBreak"] = 1] = "AbortBreak";
        /** @deprecated */
        Actions[Actions["StopBreak"] = 2] = "StopBreak";
        Actions[Actions["GetUpdatedBlock"] = 3] = "GetUpdatedBlock";
        /** @deprecated */
        Actions[Actions["DropItem"] = 4] = "DropItem";
        Actions[Actions["StartSleeping"] = 5] = "StartSleeping";
        Actions[Actions["StopSleeping"] = 6] = "StopSleeping";
        Actions[Actions["Respawn"] = 7] = "Respawn";
        /** @deprecated */
        Actions[Actions["Jump"] = 8] = "Jump";
        /** @deprecated */
        Actions[Actions["StartSprint"] = 9] = "StartSprint";
        /** @deprecated */
        Actions[Actions["StopSprint"] = 10] = "StopSprint";
        /** @deprecated */
        Actions[Actions["StartSneak"] = 11] = "StartSneak";
        /** @deprecated */
        Actions[Actions["StopSneak"] = 12] = "StopSneak";
        Actions[Actions["CreativePlayerDestroyBlock"] = 13] = "CreativePlayerDestroyBlock";
        Actions[Actions["DimensionChangeAck"] = 14] = "DimensionChangeAck";
        /** @deprecated */
        Actions[Actions["StartGlide"] = 15] = "StartGlide";
        /** @deprecated */
        Actions[Actions["StopGlide"] = 16] = "StopGlide";
        /** @deprecated */
        Actions[Actions["BuildDenied"] = 17] = "BuildDenied";
        Actions[Actions["CrackBreak"] = 18] = "CrackBreak";
        /** @deprecated */
        Actions[Actions["ChangeSkin"] = 19] = "ChangeSkin";
        /** @deprecated */
        Actions[Actions["SetEnchantmentSeed"] = 20] = "SetEnchantmentSeed";
        /** @deprecated */
        Actions[Actions["StartSwimming"] = 21] = "StartSwimming";
        /** @deprecated */
        Actions[Actions["StopSwimming"] = 22] = "StopSwimming";
        Actions[Actions["StartSpinAttack"] = 23] = "StartSpinAttack";
        Actions[Actions["StopSpinAttack"] = 24] = "StopSpinAttack";
        Actions[Actions["InteractBlock"] = 25] = "InteractBlock";
        Actions[Actions["PredictDestroyBlock"] = 26] = "PredictDestroyBlock";
        Actions[Actions["ContinueDestroyBlock"] = 27] = "ContinueDestroyBlock";
    })(Actions = PlayerActionPacket.Actions || (PlayerActionPacket.Actions = {}));
})(PlayerActionPacket = exports.PlayerActionPacket || (exports.PlayerActionPacket = {}));
exports.PlayerActionPacket = PlayerActionPacket;
let EntityFallPacket = class EntityFallPacket extends packet_1.Packet {
};
EntityFallPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], EntityFallPacket);
exports.EntityFallPacket = EntityFallPacket;
let HurtArmorPacket = class HurtArmorPacket extends packet_1.Packet {
};
HurtArmorPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], HurtArmorPacket);
exports.HurtArmorPacket = HurtArmorPacket;
let SetActorDataPacket = class SetActorDataPacket extends packet_1.Packet {
};
SetActorDataPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetActorDataPacket);
exports.SetActorDataPacket = SetActorDataPacket;
let SetActorMotionPacket = class SetActorMotionPacket extends packet_1.Packet {
};
SetActorMotionPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetActorMotionPacket);
exports.SetActorMotionPacket = SetActorMotionPacket;
let SetActorLinkPacket = class SetActorLinkPacket extends packet_1.Packet {
};
SetActorLinkPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetActorLinkPacket);
exports.SetActorLinkPacket = SetActorLinkPacket;
let SetHealthPacket = class SetHealthPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], SetHealthPacket.prototype, "health", void 0);
SetHealthPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetHealthPacket);
exports.SetHealthPacket = SetHealthPacket;
let SetSpawnPositionPacket = class SetSpawnPositionPacket extends packet_1.Packet {
};
SetSpawnPositionPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetSpawnPositionPacket);
exports.SetSpawnPositionPacket = SetSpawnPositionPacket;
let AnimatePacket = class AnimatePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], AnimatePacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], AnimatePacket.prototype, "action", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], AnimatePacket.prototype, "rowingTime", void 0);
AnimatePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AnimatePacket);
exports.AnimatePacket = AnimatePacket;
(function (AnimatePacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["SwingArm"] = 1] = "SwingArm";
        Actions[Actions["WakeUp"] = 3] = "WakeUp";
        Actions[Actions["CriticalHit"] = 4] = "CriticalHit";
        Actions[Actions["MagicCriticalHit"] = 5] = "MagicCriticalHit";
        Actions[Actions["RowRight"] = 128] = "RowRight";
        Actions[Actions["RowLeft"] = 129] = "RowLeft";
    })(Actions = AnimatePacket.Actions || (AnimatePacket.Actions = {}));
})(AnimatePacket = exports.AnimatePacket || (exports.AnimatePacket = {}));
exports.AnimatePacket = AnimatePacket;
let RespawnPacket = class RespawnPacket extends packet_1.Packet {
};
RespawnPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RespawnPacket);
exports.RespawnPacket = RespawnPacket;
let ContainerOpenPacket = class ContainerOpenPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], ContainerOpenPacket.prototype, "windowId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int8_t)
], ContainerOpenPacket.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.BlockPos)
], ContainerOpenPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], ContainerOpenPacket.prototype, "entityUniqueId", void 0);
ContainerOpenPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ContainerOpenPacket);
exports.ContainerOpenPacket = ContainerOpenPacket;
let ContainerClosePacket = class ContainerClosePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], ContainerClosePacket.prototype, "windowId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], ContainerClosePacket.prototype, "server", void 0);
ContainerClosePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ContainerClosePacket);
exports.ContainerClosePacket = ContainerClosePacket;
let PlayerHotbarPacket = class PlayerHotbarPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], PlayerHotbarPacket.prototype, "selectedSlot", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], PlayerHotbarPacket.prototype, "selectHotbarSlot", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], PlayerHotbarPacket.prototype, "windowId", void 0);
PlayerHotbarPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerHotbarPacket);
exports.PlayerHotbarPacket = PlayerHotbarPacket;
let InventoryContentPacket = class InventoryContentPacket extends packet_1.Packet {
};
InventoryContentPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], InventoryContentPacket);
exports.InventoryContentPacket = InventoryContentPacket;
let InventorySlotPacket = class InventorySlotPacket extends packet_1.Packet {
};
InventorySlotPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], InventorySlotPacket);
exports.InventorySlotPacket = InventorySlotPacket;
let ContainerSetDataPacket = class ContainerSetDataPacket extends packet_1.Packet {
};
ContainerSetDataPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ContainerSetDataPacket);
exports.ContainerSetDataPacket = ContainerSetDataPacket;
let CraftingDataPacket = class CraftingDataPacket extends packet_1.Packet {
};
CraftingDataPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CraftingDataPacket);
exports.CraftingDataPacket = CraftingDataPacket;
let CraftingEventPacket = class CraftingEventPacket extends packet_1.Packet {
};
CraftingEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CraftingEventPacket);
exports.CraftingEventPacket = CraftingEventPacket;
let GuiDataPickItemPacket = class GuiDataPickItemPacket extends packet_1.Packet {
};
GuiDataPickItemPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], GuiDataPickItemPacket);
exports.GuiDataPickItemPacket = GuiDataPickItemPacket;
let AdventureSettingsPacket = class AdventureSettingsPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], AdventureSettingsPacket.prototype, "flag1", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], AdventureSettingsPacket.prototype, "commandPermission", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t, 0x38)
], AdventureSettingsPacket.prototype, "flag2", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], AdventureSettingsPacket.prototype, "playerPermission", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorUniqueID)
], AdventureSettingsPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t, 0x4C)
], AdventureSettingsPacket.prototype, "customFlag", void 0);
AdventureSettingsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AdventureSettingsPacket);
exports.AdventureSettingsPacket = AdventureSettingsPacket;
let BlockActorDataPacket = class BlockActorDataPacket extends packet_1.Packet {
};
BlockActorDataPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BlockActorDataPacket);
exports.BlockActorDataPacket = BlockActorDataPacket;
let PlayerInputPacket = class PlayerInputPacket extends packet_1.Packet {
};
PlayerInputPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerInputPacket);
exports.PlayerInputPacket = PlayerInputPacket;
let LevelChunkPacket = class LevelChunkPacket extends packet_1.Packet {
};
LevelChunkPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelChunkPacket);
exports.LevelChunkPacket = LevelChunkPacket;
let SetCommandsEnabledPacket = class SetCommandsEnabledPacket extends packet_1.Packet {
};
SetCommandsEnabledPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetCommandsEnabledPacket);
exports.SetCommandsEnabledPacket = SetCommandsEnabledPacket;
let SetDifficultyPacket = class SetDifficultyPacket extends packet_1.Packet {
};
SetDifficultyPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetDifficultyPacket);
exports.SetDifficultyPacket = SetDifficultyPacket;
let ChangeDimensionPacket = class ChangeDimensionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], ChangeDimensionPacket.prototype, "dimensionId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], ChangeDimensionPacket.prototype, "x", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], ChangeDimensionPacket.prototype, "y", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], ChangeDimensionPacket.prototype, "z", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], ChangeDimensionPacket.prototype, "respawn", void 0);
ChangeDimensionPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ChangeDimensionPacket);
exports.ChangeDimensionPacket = ChangeDimensionPacket;
let SetPlayerGameTypePacket = class SetPlayerGameTypePacket extends packet_1.Packet {
};
SetPlayerGameTypePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetPlayerGameTypePacket);
exports.SetPlayerGameTypePacket = SetPlayerGameTypePacket;
let PlayerListPacket = class PlayerListPacket extends packet_1.Packet {
};
PlayerListPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerListPacket);
exports.PlayerListPacket = PlayerListPacket;
let SimpleEventPacket = class SimpleEventPacket extends packet_1.Packet {
};
SimpleEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SimpleEventPacket);
exports.SimpleEventPacket = SimpleEventPacket;
let TelemetryEventPacket = class TelemetryEventPacket extends packet_1.Packet {
};
TelemetryEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], TelemetryEventPacket);
exports.TelemetryEventPacket = TelemetryEventPacket;
let SpawnExperienceOrbPacket = class SpawnExperienceOrbPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], SpawnExperienceOrbPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], SpawnExperienceOrbPacket.prototype, "amount", void 0);
SpawnExperienceOrbPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SpawnExperienceOrbPacket);
exports.SpawnExperienceOrbPacket = SpawnExperienceOrbPacket;
let MapItemDataPacket = class MapItemDataPacket extends packet_1.Packet {
};
MapItemDataPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MapItemDataPacket);
exports.MapItemDataPacket = MapItemDataPacket;
let MapInfoRequestPacket = class MapInfoRequestPacket extends packet_1.Packet {
};
MapInfoRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MapInfoRequestPacket);
exports.MapInfoRequestPacket = MapInfoRequestPacket;
let RequestChunkRadiusPacket = class RequestChunkRadiusPacket extends packet_1.Packet {
};
RequestChunkRadiusPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RequestChunkRadiusPacket);
exports.RequestChunkRadiusPacket = RequestChunkRadiusPacket;
let ChunkRadiusUpdatedPacket = class ChunkRadiusUpdatedPacket extends packet_1.Packet {
};
ChunkRadiusUpdatedPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ChunkRadiusUpdatedPacket);
exports.ChunkRadiusUpdatedPacket = ChunkRadiusUpdatedPacket;
let ItemFrameDropItemPacket = class ItemFrameDropItemPacket extends packet_1.Packet {
};
ItemFrameDropItemPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ItemFrameDropItemPacket);
exports.ItemFrameDropItemPacket = ItemFrameDropItemPacket;
let GameRulesChangedPacket = class GameRulesChangedPacket extends packet_1.Packet {
};
GameRulesChangedPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], GameRulesChangedPacket);
exports.GameRulesChangedPacket = GameRulesChangedPacket;
let CameraPacket = class CameraPacket extends packet_1.Packet {
};
CameraPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CameraPacket);
exports.CameraPacket = CameraPacket;
let BossEventPacket = class BossEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], BossEventPacket.prototype, "unknown", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], BossEventPacket.prototype, "entityUniqueId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], BossEventPacket.prototype, "unknown2", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], BossEventPacket.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], BossEventPacket.prototype, "title", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], BossEventPacket.prototype, "healthPercent", void 0);
BossEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BossEventPacket);
exports.BossEventPacket = BossEventPacket;
(function (BossEventPacket) {
    let Types;
    (function (Types) {
        Types[Types["Show"] = 0] = "Show";
        Types[Types["RegisterPlayer"] = 1] = "RegisterPlayer";
        Types[Types["Hide"] = 2] = "Hide";
        Types[Types["UnregisterPlayer"] = 3] = "UnregisterPlayer";
        Types[Types["HealthPercent"] = 4] = "HealthPercent";
        Types[Types["Title"] = 5] = "Title";
    })(Types = BossEventPacket.Types || (BossEventPacket.Types = {}));
})(BossEventPacket = exports.BossEventPacket || (exports.BossEventPacket = {}));
exports.BossEventPacket = BossEventPacket;
let ShowCreditsPacket = class ShowCreditsPacket extends packet_1.Packet {
};
ShowCreditsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ShowCreditsPacket);
exports.ShowCreditsPacket = ShowCreditsPacket;
let AvailableCommandsCommandData = class AvailableCommandsCommandData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], AvailableCommandsCommandData.prototype, "name", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], AvailableCommandsCommandData.prototype, "description", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], AvailableCommandsCommandData.prototype, "flags", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], AvailableCommandsCommandData.prototype, "permission", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(cxxvector_1.CxxVector.make(nativetype_1.CxxString)))
], AvailableCommandsCommandData.prototype, "parameters", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], AvailableCommandsCommandData.prototype, "aliases", void 0);
AvailableCommandsCommandData = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x68)
], AvailableCommandsCommandData);
let AvailableCommandsEnumData = class AvailableCommandsEnumData extends nativeclass_1.NativeClass {
};
AvailableCommandsEnumData = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x38)
], AvailableCommandsEnumData);
let AvailableCommandsPacket = class AvailableCommandsPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(nativetype_1.CxxString))
], AvailableCommandsPacket.prototype, "enumValues", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(nativetype_1.CxxString))
], AvailableCommandsPacket.prototype, "postfixes", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(AvailableCommandsEnumData))
], AvailableCommandsPacket.prototype, "enums", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(AvailableCommandsCommandData))
], AvailableCommandsPacket.prototype, "commands", void 0);
AvailableCommandsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AvailableCommandsPacket);
exports.AvailableCommandsPacket = AvailableCommandsPacket;
(function (AvailableCommandsPacket) {
    AvailableCommandsPacket.CommandData = AvailableCommandsCommandData;
    AvailableCommandsPacket.EnumData = AvailableCommandsEnumData;
})(AvailableCommandsPacket = exports.AvailableCommandsPacket || (exports.AvailableCommandsPacket = {}));
exports.AvailableCommandsPacket = AvailableCommandsPacket;
let CommandRequestPacket = class CommandRequestPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], CommandRequestPacket.prototype, "command", void 0);
CommandRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CommandRequestPacket);
exports.CommandRequestPacket = CommandRequestPacket;
let CommandBlockUpdatePacket = class CommandBlockUpdatePacket extends packet_1.Packet {
};
CommandBlockUpdatePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CommandBlockUpdatePacket);
exports.CommandBlockUpdatePacket = CommandBlockUpdatePacket;
let CommandOutputPacket = class CommandOutputPacket extends packet_1.Packet {
};
CommandOutputPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CommandOutputPacket);
exports.CommandOutputPacket = CommandOutputPacket;
let ResourcePackDataInfoPacket = class ResourcePackDataInfoPacket extends packet_1.Packet {
};
ResourcePackDataInfoPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ResourcePackDataInfoPacket);
exports.ResourcePackDataInfoPacket = ResourcePackDataInfoPacket;
let ResourcePackChunkDataPacket = class ResourcePackChunkDataPacket extends packet_1.Packet {
};
ResourcePackChunkDataPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ResourcePackChunkDataPacket);
exports.ResourcePackChunkDataPacket = ResourcePackChunkDataPacket;
let ResourcePackChunkRequestPacket = class ResourcePackChunkRequestPacket extends packet_1.Packet {
};
ResourcePackChunkRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ResourcePackChunkRequestPacket);
exports.ResourcePackChunkRequestPacket = ResourcePackChunkRequestPacket;
let TransferPacket = class TransferPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], TransferPacket.prototype, "address", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint16_t)
], TransferPacket.prototype, "port", void 0);
TransferPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], TransferPacket);
exports.TransferPacket = TransferPacket;
let PlaySoundPacket = class PlaySoundPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], PlaySoundPacket.prototype, "soundName", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.BlockPos)
], PlaySoundPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlaySoundPacket.prototype, "volume", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlaySoundPacket.prototype, "pitch", void 0);
PlaySoundPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlaySoundPacket);
exports.PlaySoundPacket = PlaySoundPacket;
let StopSoundPacket = class StopSoundPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], StopSoundPacket.prototype, "soundName", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], StopSoundPacket.prototype, "stopAll", void 0);
StopSoundPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], StopSoundPacket);
exports.StopSoundPacket = StopSoundPacket;
let SetTitlePacket = class SetTitlePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], SetTitlePacket.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], SetTitlePacket.prototype, "text", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], SetTitlePacket.prototype, "fadeInTime", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], SetTitlePacket.prototype, "stayTime", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], SetTitlePacket.prototype, "fadeOutTime", void 0);
SetTitlePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetTitlePacket);
exports.SetTitlePacket = SetTitlePacket;
(function (SetTitlePacket) {
    let Types;
    (function (Types) {
        Types[Types["Clear"] = 0] = "Clear";
        Types[Types["Reset"] = 1] = "Reset";
        Types[Types["Title"] = 2] = "Title";
        Types[Types["Subtitle"] = 3] = "Subtitle";
        Types[Types["Actionbar"] = 4] = "Actionbar";
        Types[Types["AnimationTimes"] = 5] = "AnimationTimes";
    })(Types = SetTitlePacket.Types || (SetTitlePacket.Types = {}));
})(SetTitlePacket = exports.SetTitlePacket || (exports.SetTitlePacket = {}));
exports.SetTitlePacket = SetTitlePacket;
let AddBehaviorTreePacket = class AddBehaviorTreePacket extends packet_1.Packet {
};
AddBehaviorTreePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AddBehaviorTreePacket);
exports.AddBehaviorTreePacket = AddBehaviorTreePacket;
let StructureBlockUpdatePacket = class StructureBlockUpdatePacket extends packet_1.Packet {
};
StructureBlockUpdatePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], StructureBlockUpdatePacket);
exports.StructureBlockUpdatePacket = StructureBlockUpdatePacket;
let ShowStoreOfferPacket = class ShowStoreOfferPacket extends packet_1.Packet {
};
ShowStoreOfferPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ShowStoreOfferPacket);
exports.ShowStoreOfferPacket = ShowStoreOfferPacket;
let PurchaseReceiptPacket = class PurchaseReceiptPacket extends packet_1.Packet {
};
PurchaseReceiptPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PurchaseReceiptPacket);
exports.PurchaseReceiptPacket = PurchaseReceiptPacket;
let PlayerSkinPacket = class PlayerSkinPacket extends packet_1.Packet {
};
PlayerSkinPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerSkinPacket);
exports.PlayerSkinPacket = PlayerSkinPacket;
let SubClientLoginPacket = class SubClientLoginPacket extends packet_1.Packet {
};
SubClientLoginPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SubClientLoginPacket);
exports.SubClientLoginPacket = SubClientLoginPacket;
let WSConnectPacket = class WSConnectPacket extends packet_1.Packet {
};
WSConnectPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], WSConnectPacket);
exports.WSConnectPacket = WSConnectPacket;
let SetLastHurtByPacket = class SetLastHurtByPacket extends packet_1.Packet {
};
SetLastHurtByPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetLastHurtByPacket);
exports.SetLastHurtByPacket = SetLastHurtByPacket;
let BookEditPacket = class BookEditPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], BookEditPacket.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t, 0x34)
], BookEditPacket.prototype, "inventorySlot", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t, 0x38)
], BookEditPacket.prototype, "pageNumber", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t, 0x3c)
], BookEditPacket.prototype, "secondaryPageNumber", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString, 0x40)
], BookEditPacket.prototype, "text", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], BookEditPacket.prototype, "author", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], BookEditPacket.prototype, "xuid", void 0);
BookEditPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BookEditPacket);
exports.BookEditPacket = BookEditPacket;
(function (BookEditPacket) {
    let Types;
    (function (Types) {
        Types[Types["ReplacePage"] = 0] = "ReplacePage";
        Types[Types["AddPage"] = 1] = "AddPage";
        Types[Types["DeletePage"] = 2] = "DeletePage";
        Types[Types["SwapPages"] = 3] = "SwapPages";
        Types[Types["SignBook"] = 4] = "SignBook";
    })(Types = BookEditPacket.Types || (BookEditPacket.Types = {}));
})(BookEditPacket = exports.BookEditPacket || (exports.BookEditPacket = {}));
exports.BookEditPacket = BookEditPacket;
let NpcRequestPacket = class NpcRequestPacket extends packet_1.Packet {
};
NpcRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], NpcRequestPacket);
exports.NpcRequestPacket = NpcRequestPacket;
let PhotoTransferPacket = class PhotoTransferPacket extends packet_1.Packet {
};
PhotoTransferPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PhotoTransferPacket);
exports.PhotoTransferPacket = PhotoTransferPacket;
let ShowModalFormPacket = class ShowModalFormPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], ShowModalFormPacket.prototype, "id", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], ShowModalFormPacket.prototype, "content", void 0);
ShowModalFormPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ShowModalFormPacket);
exports.ShowModalFormPacket = ShowModalFormPacket;
exports.ModalFormRequestPacket = ShowModalFormPacket;
let ModalFormResponsePacket = class ModalFormResponsePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], ModalFormResponsePacket.prototype, "id", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], ModalFormResponsePacket.prototype, "response", void 0);
ModalFormResponsePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ModalFormResponsePacket);
exports.ModalFormResponsePacket = ModalFormResponsePacket;
let ServerSettingsRequestPacket = class ServerSettingsRequestPacket extends packet_1.Packet {
};
ServerSettingsRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ServerSettingsRequestPacket);
exports.ServerSettingsRequestPacket = ServerSettingsRequestPacket;
let ServerSettingsResponsePacket = class ServerSettingsResponsePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], ServerSettingsResponsePacket.prototype, "id", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], ServerSettingsResponsePacket.prototype, "content", void 0);
ServerSettingsResponsePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ServerSettingsResponsePacket);
exports.ServerSettingsResponsePacket = ServerSettingsResponsePacket;
let ShowProfilePacket = class ShowProfilePacket extends packet_1.Packet {
};
ShowProfilePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ShowProfilePacket);
exports.ShowProfilePacket = ShowProfilePacket;
let SetDefaultGameTypePacket = class SetDefaultGameTypePacket extends packet_1.Packet {
};
SetDefaultGameTypePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetDefaultGameTypePacket);
exports.SetDefaultGameTypePacket = SetDefaultGameTypePacket;
let RemoveObjectivePacket = class RemoveObjectivePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], RemoveObjectivePacket.prototype, "objectiveName", void 0);
RemoveObjectivePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RemoveObjectivePacket);
exports.RemoveObjectivePacket = RemoveObjectivePacket;
let SetDisplayObjectivePacket = class SetDisplayObjectivePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "displaySlot", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "objectiveName", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "displayName", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "criteriaName", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], SetDisplayObjectivePacket.prototype, "sortOrder", void 0);
SetDisplayObjectivePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetDisplayObjectivePacket);
exports.SetDisplayObjectivePacket = SetDisplayObjectivePacket;
(function (SetDisplayObjectivePacket) {
    let Sort;
    (function (Sort) {
        Sort[Sort["ASCENDING"] = 0] = "ASCENDING";
        Sort[Sort["DESCENDING"] = 1] = "DESCENDING";
    })(Sort = SetDisplayObjectivePacket.Sort || (SetDisplayObjectivePacket.Sort = {}));
})(SetDisplayObjectivePacket = exports.SetDisplayObjectivePacket || (exports.SetDisplayObjectivePacket = {}));
exports.SetDisplayObjectivePacket = SetDisplayObjectivePacket;
let ScoreboardId = class ScoreboardId extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], ScoreboardId.prototype, "id", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int64_as_float_t, 0)
], ScoreboardId.prototype, "idAsNumber", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], ScoreboardId.prototype, "u", void 0);
ScoreboardId = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], ScoreboardId);
exports.ScoreboardId = ScoreboardId;
let ScorePacketInfo = class ScorePacketInfo extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(ScoreboardId)
], ScorePacketInfo.prototype, "scoreboardId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], ScorePacketInfo.prototype, "objectiveName", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], ScorePacketInfo.prototype, "score", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], ScorePacketInfo.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], ScorePacketInfo.prototype, "playerEntityUniqueId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], ScorePacketInfo.prototype, "entityUniqueId", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], ScorePacketInfo.prototype, "customName", void 0);
ScorePacketInfo = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], ScorePacketInfo);
exports.ScorePacketInfo = ScorePacketInfo;
(function (ScorePacketInfo) {
    let Type;
    (function (Type) {
        Type[Type["PLAYER"] = 1] = "PLAYER";
        Type[Type["ENTITY"] = 2] = "ENTITY";
        Type[Type["FAKE_PLAYER"] = 3] = "FAKE_PLAYER";
    })(Type = ScorePacketInfo.Type || (ScorePacketInfo.Type = {}));
})(ScorePacketInfo = exports.ScorePacketInfo || (exports.ScorePacketInfo = {}));
exports.ScorePacketInfo = ScorePacketInfo;
let SetScorePacket = class SetScorePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], SetScorePacket.prototype, "type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(cxxvector_1.CxxVector.make(ScorePacketInfo))
], SetScorePacket.prototype, "entries", void 0);
SetScorePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetScorePacket);
exports.SetScorePacket = SetScorePacket;
(function (SetScorePacket) {
    let Type;
    (function (Type) {
        Type[Type["CHANGE"] = 0] = "CHANGE";
        Type[Type["REMOVE"] = 1] = "REMOVE";
    })(Type = SetScorePacket.Type || (SetScorePacket.Type = {}));
})(SetScorePacket = exports.SetScorePacket || (exports.SetScorePacket = {}));
exports.SetScorePacket = SetScorePacket;
let LabTablePacket = class LabTablePacket extends packet_1.Packet {
};
LabTablePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LabTablePacket);
exports.LabTablePacket = LabTablePacket;
let UpdateBlockPacketSynced = class UpdateBlockPacketSynced extends packet_1.Packet {
};
UpdateBlockPacketSynced = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], UpdateBlockPacketSynced);
exports.UpdateBlockPacketSynced = UpdateBlockPacketSynced;
let MoveActorDeltaPacket = class MoveActorDeltaPacket extends packet_1.Packet {
};
MoveActorDeltaPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MoveActorDeltaPacket);
exports.MoveActorDeltaPacket = MoveActorDeltaPacket;
let SetScoreboardIdentityPacket = class SetScoreboardIdentityPacket extends packet_1.Packet {
};
SetScoreboardIdentityPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetScoreboardIdentityPacket);
exports.SetScoreboardIdentityPacket = SetScoreboardIdentityPacket;
let SetLocalPlayerAsInitializedPacket = class SetLocalPlayerAsInitializedPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(actor_1.ActorRuntimeID)
], SetLocalPlayerAsInitializedPacket.prototype, "actorId", void 0);
SetLocalPlayerAsInitializedPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SetLocalPlayerAsInitializedPacket);
exports.SetLocalPlayerAsInitializedPacket = SetLocalPlayerAsInitializedPacket;
let UpdateSoftEnumPacket = class UpdateSoftEnumPacket extends packet_1.Packet {
};
UpdateSoftEnumPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], UpdateSoftEnumPacket);
exports.UpdateSoftEnumPacket = UpdateSoftEnumPacket;
let NetworkStackLatencyPacket = class NetworkStackLatencyPacket extends packet_1.Packet {
};
NetworkStackLatencyPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], NetworkStackLatencyPacket);
exports.NetworkStackLatencyPacket = NetworkStackLatencyPacket;
let ScriptCustomEventPacket = class ScriptCustomEventPacket extends packet_1.Packet {
};
ScriptCustomEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ScriptCustomEventPacket);
exports.ScriptCustomEventPacket = ScriptCustomEventPacket;
let SpawnParticleEffect = class SpawnParticleEffect extends packet_1.Packet {
};
SpawnParticleEffect = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SpawnParticleEffect);
exports.SpawnParticleEffect = SpawnParticleEffect;
let AvailableActorIdentifiersPacket = class AvailableActorIdentifiersPacket extends packet_1.Packet {
};
AvailableActorIdentifiersPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AvailableActorIdentifiersPacket);
exports.AvailableActorIdentifiersPacket = AvailableActorIdentifiersPacket;
let LevelSoundEventPacketV2 = class LevelSoundEventPacketV2 extends packet_1.Packet {
};
LevelSoundEventPacketV2 = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelSoundEventPacketV2);
exports.LevelSoundEventPacketV2 = LevelSoundEventPacketV2;
let NetworkChunkPublisherUpdatePacket = class NetworkChunkPublisherUpdatePacket extends packet_1.Packet {
};
NetworkChunkPublisherUpdatePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], NetworkChunkPublisherUpdatePacket);
exports.NetworkChunkPublisherUpdatePacket = NetworkChunkPublisherUpdatePacket;
let BiomeDefinitionList = class BiomeDefinitionList extends packet_1.Packet {
};
BiomeDefinitionList = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], BiomeDefinitionList);
exports.BiomeDefinitionList = BiomeDefinitionList;
let LevelSoundEventPacket = class LevelSoundEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], LevelSoundEventPacket.prototype, "sound", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], LevelSoundEventPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], LevelSoundEventPacket.prototype, "extraData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.CxxString)
], LevelSoundEventPacket.prototype, "entityType", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], LevelSoundEventPacket.prototype, "isBabyMob", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], LevelSoundEventPacket.prototype, "disableRelativeVolume", void 0);
LevelSoundEventPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelSoundEventPacket);
exports.LevelSoundEventPacket = LevelSoundEventPacket;
let LevelEventGenericPacket = class LevelEventGenericPacket extends packet_1.Packet {
};
LevelEventGenericPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LevelEventGenericPacket);
exports.LevelEventGenericPacket = LevelEventGenericPacket;
let LecternUpdatePacket = class LecternUpdatePacket extends packet_1.Packet {
};
LecternUpdatePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], LecternUpdatePacket);
exports.LecternUpdatePacket = LecternUpdatePacket;
let RemoveEntityPacket = class RemoveEntityPacket extends packet_1.Packet {
};
RemoveEntityPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], RemoveEntityPacket);
exports.RemoveEntityPacket = RemoveEntityPacket;
let ClientCacheStatusPacket = class ClientCacheStatusPacket extends packet_1.Packet {
};
ClientCacheStatusPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ClientCacheStatusPacket);
exports.ClientCacheStatusPacket = ClientCacheStatusPacket;
let OnScreenTextureAnimationPacket = class OnScreenTextureAnimationPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], OnScreenTextureAnimationPacket.prototype, "animationType", void 0);
OnScreenTextureAnimationPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], OnScreenTextureAnimationPacket);
exports.OnScreenTextureAnimationPacket = OnScreenTextureAnimationPacket;
let MapCreateLockedCopy = class MapCreateLockedCopy extends packet_1.Packet {
};
MapCreateLockedCopy = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MapCreateLockedCopy);
exports.MapCreateLockedCopy = MapCreateLockedCopy;
let StructureTemplateDataRequestPacket = class StructureTemplateDataRequestPacket extends packet_1.Packet {
};
StructureTemplateDataRequestPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], StructureTemplateDataRequestPacket);
exports.StructureTemplateDataRequestPacket = StructureTemplateDataRequestPacket;
let StructureTemplateDataExportPacket = class StructureTemplateDataExportPacket extends packet_1.Packet {
};
StructureTemplateDataExportPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], StructureTemplateDataExportPacket);
exports.StructureTemplateDataExportPacket = StructureTemplateDataExportPacket;
let ClientCacheBlobStatusPacket = class ClientCacheBlobStatusPacket extends packet_1.Packet {
};
ClientCacheBlobStatusPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ClientCacheBlobStatusPacket);
exports.ClientCacheBlobStatusPacket = ClientCacheBlobStatusPacket;
let ClientCacheMissResponsePacket = class ClientCacheMissResponsePacket extends packet_1.Packet {
};
ClientCacheMissResponsePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ClientCacheMissResponsePacket);
exports.ClientCacheMissResponsePacket = ClientCacheMissResponsePacket;
let EducationSettingsPacket = class EducationSettingsPacket extends packet_1.Packet {
};
EducationSettingsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], EducationSettingsPacket);
exports.EducationSettingsPacket = EducationSettingsPacket;
let EmotePacket = class EmotePacket extends packet_1.Packet {
};
EmotePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], EmotePacket);
exports.EmotePacket = EmotePacket;
let MultiplayerSettingsPacket = class MultiplayerSettingsPacket extends packet_1.Packet {
};
MultiplayerSettingsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MultiplayerSettingsPacket);
exports.MultiplayerSettingsPacket = MultiplayerSettingsPacket;
let SettingsCommandPacket = class SettingsCommandPacket extends packet_1.Packet {
};
SettingsCommandPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], SettingsCommandPacket);
exports.SettingsCommandPacket = SettingsCommandPacket;
let AnvilDamagePacket = class AnvilDamagePacket extends packet_1.Packet {
};
AnvilDamagePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AnvilDamagePacket);
exports.AnvilDamagePacket = AnvilDamagePacket;
let CompletedUsingItemPacket = class CompletedUsingItemPacket extends packet_1.Packet {
};
CompletedUsingItemPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CompletedUsingItemPacket);
exports.CompletedUsingItemPacket = CompletedUsingItemPacket;
let NetworkSettingsPacket = class NetworkSettingsPacket extends packet_1.Packet {
};
NetworkSettingsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], NetworkSettingsPacket);
exports.NetworkSettingsPacket = NetworkSettingsPacket;
let PlayerAuthInputPacket = class PlayerAuthInputPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "pitch", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "yaw", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], PlayerAuthInputPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "moveX", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "moveZ", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "heaYaw", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], PlayerAuthInputPacket.prototype, "inputFlags", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], PlayerAuthInputPacket.prototype, "inputMode", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], PlayerAuthInputPacket.prototype, "playMode", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], PlayerAuthInputPacket.prototype, "vrGazeDirection", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t)
], PlayerAuthInputPacket.prototype, "tick", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(blockpos_1.Vec3)
], PlayerAuthInputPacket.prototype, "delta", void 0);
PlayerAuthInputPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerAuthInputPacket);
exports.PlayerAuthInputPacket = PlayerAuthInputPacket;
let CreativeContentPacket = class CreativeContentPacket extends packet_1.Packet {
};
CreativeContentPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CreativeContentPacket);
exports.CreativeContentPacket = CreativeContentPacket;
let PlayerEnchantOptionsPacket = class PlayerEnchantOptionsPacket extends packet_1.Packet {
};
PlayerEnchantOptionsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerEnchantOptionsPacket);
exports.PlayerEnchantOptionsPacket = PlayerEnchantOptionsPacket;
let ItemStackRequest = class ItemStackRequest extends packet_1.Packet {
};
ItemStackRequest = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ItemStackRequest);
exports.ItemStackRequest = ItemStackRequest;
let ItemStackResponse = class ItemStackResponse extends packet_1.Packet {
};
ItemStackResponse = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ItemStackResponse);
exports.ItemStackResponse = ItemStackResponse;
let PlayerArmorDamagePacket = class PlayerArmorDamagePacket extends packet_1.Packet {
};
PlayerArmorDamagePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerArmorDamagePacket);
exports.PlayerArmorDamagePacket = PlayerArmorDamagePacket;
let CodeBuilderPacket = class CodeBuilderPacket extends packet_1.Packet {
};
CodeBuilderPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CodeBuilderPacket);
exports.CodeBuilderPacket = CodeBuilderPacket;
let UpdatePlayerGameTypePacket = class UpdatePlayerGameTypePacket extends packet_1.Packet {
};
UpdatePlayerGameTypePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], UpdatePlayerGameTypePacket);
exports.UpdatePlayerGameTypePacket = UpdatePlayerGameTypePacket;
let EmoteListPacket = class EmoteListPacket extends packet_1.Packet {
};
EmoteListPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], EmoteListPacket);
exports.EmoteListPacket = EmoteListPacket;
let PositionTrackingDBServerBroadcast = class PositionTrackingDBServerBroadcast extends packet_1.Packet {
};
PositionTrackingDBServerBroadcast = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PositionTrackingDBServerBroadcast);
exports.PositionTrackingDBServerBroadcast = PositionTrackingDBServerBroadcast;
let PositionTrackingDBClientRequest = class PositionTrackingDBClientRequest extends packet_1.Packet {
};
PositionTrackingDBClientRequest = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PositionTrackingDBClientRequest);
exports.PositionTrackingDBClientRequest = PositionTrackingDBClientRequest;
let DebugInfoPacket = class DebugInfoPacket extends packet_1.Packet {
};
DebugInfoPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], DebugInfoPacket);
exports.DebugInfoPacket = DebugInfoPacket;
let PacketViolationWarningPacket = class PacketViolationWarningPacket extends packet_1.Packet {
};
PacketViolationWarningPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PacketViolationWarningPacket);
exports.PacketViolationWarningPacket = PacketViolationWarningPacket;
let MotionPredictionHintsPacket = class MotionPredictionHintsPacket extends packet_1.Packet {
};
MotionPredictionHintsPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], MotionPredictionHintsPacket);
exports.MotionPredictionHintsPacket = MotionPredictionHintsPacket;
let AnimateEntityPacket = class AnimateEntityPacket extends packet_1.Packet {
};
AnimateEntityPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], AnimateEntityPacket);
exports.AnimateEntityPacket = AnimateEntityPacket;
let CameraShakePacket = class CameraShakePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], CameraShakePacket.prototype, "intensity", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], CameraShakePacket.prototype, "duration", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], CameraShakePacket.prototype, "shakeType", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t)
], CameraShakePacket.prototype, "shakeAction", void 0);
CameraShakePacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CameraShakePacket);
exports.CameraShakePacket = CameraShakePacket;
(function (CameraShakePacket) {
    let ShakeType;
    (function (ShakeType) {
        ShakeType[ShakeType["Positional"] = 0] = "Positional";
        ShakeType[ShakeType["Rotational"] = 1] = "Rotational";
    })(ShakeType = CameraShakePacket.ShakeType || (CameraShakePacket.ShakeType = {}));
    let ShakeAction;
    (function (ShakeAction) {
        ShakeAction[ShakeAction["Add"] = 0] = "Add";
        ShakeAction[ShakeAction["Stop"] = 1] = "Stop";
    })(ShakeAction = CameraShakePacket.ShakeAction || (CameraShakePacket.ShakeAction = {}));
})(CameraShakePacket = exports.CameraShakePacket || (exports.CameraShakePacket = {}));
exports.CameraShakePacket = CameraShakePacket;
let PlayerFogPacket = class PlayerFogPacket extends packet_1.Packet {
};
PlayerFogPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], PlayerFogPacket);
exports.PlayerFogPacket = PlayerFogPacket;
let CorrectPlayerMovePredictionPacket = class CorrectPlayerMovePredictionPacket extends packet_1.Packet {
};
CorrectPlayerMovePredictionPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], CorrectPlayerMovePredictionPacket);
exports.CorrectPlayerMovePredictionPacket = CorrectPlayerMovePredictionPacket;
let ItemComponentPacket = class ItemComponentPacket extends packet_1.Packet {
};
ItemComponentPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], ItemComponentPacket);
exports.ItemComponentPacket = ItemComponentPacket;
let FilterTextPacket = class FilterTextPacket extends packet_1.Packet {
};
FilterTextPacket = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], FilterTextPacket);
exports.FilterTextPacket = FilterTextPacket;
exports.PacketIdToType = {
    0x01: LoginPacket,
    0x02: PlayStatusPacket,
    0x03: ServerToClientHandshakePacket,
    0x04: ClientToServerHandshakePacket,
    0x05: DisconnectPacket,
    0x06: ResourcePacksInfoPacket,
    0x07: ResourcePacksStackPacket,
    0x08: ResourcePackClientResponsePacket,
    0x09: TextPacket,
    0x0a: SetTimePacket,
    0x0b: StartGamePacket,
    0x0c: AddPlayerPacket,
    0x0d: AddActorPacket,
    0x0e: RemoveActorPacket,
    0x0f: AddItemActorPacket,
    0x11: TakeItemActorPacket,
    0x12: MoveActorAbsolutePacket,
    0x13: MovePlayerPacket,
    0x14: RiderJumpPacket,
    0x15: UpdateBlockPacket,
    0x16: AddPaintingPacket,
    0x17: TickSyncPacket,
    0x18: LevelSoundEventPacketV1,
    0x19: LevelEventPacket,
    0x1a: BlockEventPacket,
    0x1b: ActorEventPacket,
    0x1c: MobEffectPacket,
    0x1d: UpdateAttributesPacket,
    0x1e: InventoryTransactionPacket,
    0x1f: MobEquipmentPacket,
    0x20: MobArmorEquipmentPacket,
    0x21: InteractPacket,
    0x22: BlockPickRequestPacket,
    0x23: ActorPickRequestPacket,
    0x24: PlayerActionPacket,
    0x26: HurtArmorPacket,
    0x27: SetActorDataPacket,
    0x28: SetActorMotionPacket,
    0x29: SetActorLinkPacket,
    0x2a: SetHealthPacket,
    0x2b: SetSpawnPositionPacket,
    0x2c: AnimatePacket,
    0x2d: RespawnPacket,
    0x2e: ContainerOpenPacket,
    0x2f: ContainerClosePacket,
    0x30: PlayerHotbarPacket,
    0x31: InventoryContentPacket,
    0x32: InventorySlotPacket,
    0x33: ContainerSetDataPacket,
    0x34: CraftingDataPacket,
    0x35: CraftingEventPacket,
    0x36: GuiDataPickItemPacket,
    0x37: AdventureSettingsPacket,
    0x38: BlockActorDataPacket,
    0x39: PlayerInputPacket,
    0x3a: LevelChunkPacket,
    0x3b: SetCommandsEnabledPacket,
    0x3c: SetDifficultyPacket,
    0x3d: ChangeDimensionPacket,
    0x3e: SetPlayerGameTypePacket,
    0x3f: PlayerListPacket,
    0x40: SimpleEventPacket,
    0x41: TelemetryEventPacket,
    0x42: SpawnExperienceOrbPacket,
    0x43: MapItemDataPacket,
    0x44: MapInfoRequestPacket,
    0x45: RequestChunkRadiusPacket,
    0x46: ChunkRadiusUpdatedPacket,
    0x47: ItemFrameDropItemPacket,
    0x48: GameRulesChangedPacket,
    0x49: CameraPacket,
    0x4a: BossEventPacket,
    0x4b: ShowCreditsPacket,
    0x4c: AvailableCommandsPacket,
    0x4d: CommandRequestPacket,
    0x4e: CommandBlockUpdatePacket,
    0x4f: CommandOutputPacket,
    0x52: ResourcePackDataInfoPacket,
    0x53: ResourcePackChunkDataPacket,
    0x54: ResourcePackChunkRequestPacket,
    0x55: TransferPacket,
    0x56: PlaySoundPacket,
    0x57: StopSoundPacket,
    0x58: SetTitlePacket,
    0x59: AddBehaviorTreePacket,
    0x5a: StructureBlockUpdatePacket,
    0x5b: ShowStoreOfferPacket,
    0x5c: PurchaseReceiptPacket,
    0x5d: PlayerSkinPacket,
    0x5e: SubClientLoginPacket,
    0x5f: WSConnectPacket,
    0x60: SetLastHurtByPacket,
    0x61: BookEditPacket,
    0x62: NpcRequestPacket,
    0x63: PhotoTransferPacket,
    0x64: ShowModalFormPacket,
    0x65: ModalFormResponsePacket,
    0x66: ServerSettingsRequestPacket,
    0x67: ServerSettingsResponsePacket,
    0x68: ShowProfilePacket,
    0x69: SetDefaultGameTypePacket,
    0x6a: RemoveObjectivePacket,
    0x6b: SetDisplayObjectivePacket,
    0x6c: SetScorePacket,
    0x6d: LabTablePacket,
    0x6e: UpdateBlockPacketSynced,
    0x6f: MoveActorDeltaPacket,
    0x70: SetScoreboardIdentityPacket,
    0x71: SetLocalPlayerAsInitializedPacket,
    0x72: UpdateSoftEnumPacket,
    0x73: NetworkStackLatencyPacket,
    0x75: ScriptCustomEventPacket,
    0x76: SpawnParticleEffect,
    0x77: AvailableActorIdentifiersPacket,
    0x78: LevelSoundEventPacketV2,
    0x79: NetworkChunkPublisherUpdatePacket,
    0x7a: BiomeDefinitionList,
    0x7b: LevelSoundEventPacket,
    0x7c: LevelEventGenericPacket,
    0x7d: LecternUpdatePacket,
    0x80: RemoveEntityPacket,
    0x81: ClientCacheStatusPacket,
    0x82: OnScreenTextureAnimationPacket,
    0x83: MapCreateLockedCopy,
    0x84: StructureTemplateDataRequestPacket,
    0x85: StructureTemplateDataExportPacket,
    0x87: ClientCacheBlobStatusPacket,
    0x88: ClientCacheMissResponsePacket,
    0x89: EducationSettingsPacket,
    0x8a: EmotePacket,
    0x8b: MultiplayerSettingsPacket,
    0x8c: SettingsCommandPacket,
    0x8d: AnvilDamagePacket,
    0x8e: CompletedUsingItemPacket,
    0x8f: NetworkSettingsPacket,
    0x90: PlayerAuthInputPacket,
    0x91: CreativeContentPacket,
    0x92: PlayerEnchantOptionsPacket,
    0x93: ItemStackRequest,
    0x94: ItemStackResponse,
    0x95: PlayerArmorDamagePacket,
    0x96: CodeBuilderPacket,
    0x97: UpdatePlayerGameTypePacket,
    0x98: EmoteListPacket,
    0x99: PositionTrackingDBServerBroadcast,
    0x9a: PositionTrackingDBClientRequest,
    0x9b: DebugInfoPacket,
    0x9c: PacketViolationWarningPacket,
    0x9d: MotionPredictionHintsPacket,
    0x9e: AnimateEntityPacket,
    0x9f: CameraShakePacket,
    0xa0: PlayerFogPacket,
    0xa1: CorrectPlayerMovePredictionPacket,
    0xa2: ItemComponentPacket,
    0xa3: FilterTextPacket,
};
for (const packetId in exports.PacketIdToType) {
    exports.PacketIdToType[packetId].ID = +packetId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2tldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDhDQUEyQztBQUMzQyxrREFBc0Y7QUFDdEYsZ0RBQXVLO0FBRXZLLG1DQUF3RDtBQUN4RCx5Q0FBNEM7QUFDNUMsdUNBQThDO0FBQzlDLGlEQUE4QztBQUM5QyxxQ0FBa0M7QUFFbEMsdUNBQXVDO0FBQzFCLFFBQUEsb0JBQW9CLEdBQUcsbUJBQVEsQ0FBQztBQUs3QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsZUFBTTtDQUt0QyxDQUFBO0FBSEE7SUFESSx5QkFBVyxDQUFDLG9CQUFPLEVBQUUsSUFBSSxDQUFDOzZDQUNiO0FBRWpCO0lBREkseUJBQVcsQ0FBQywyQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7NENBQ3BCO0FBSmQsV0FBVztJQUR2Qix5QkFBVyxDQUFDLElBQUksQ0FBQztHQUNMLFdBQVcsQ0FLdkI7QUFMWSxrQ0FBVztBQVF4QixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLGVBQU07Q0FHM0MsQ0FBQTtBQURHO0lBREMseUJBQVcsQ0FBQyxvQkFBTyxDQUFDO2dEQUNOO0FBRk4sZ0JBQWdCO0lBRDVCLHlCQUFXLENBQUMsSUFBSSxDQUFDO0dBQ0wsZ0JBQWdCLENBRzVCO0FBSFksNENBQWdCO0FBTTdCLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQThCLFNBQVEsZUFBTTtDQUV4RCxDQUFBO0FBRlksNkJBQTZCO0lBRHpDLHlCQUFXLENBQUMsSUFBSSxDQUFDO0dBQ0wsNkJBQTZCLENBRXpDO0FBRlksc0VBQTZCO0FBSzFDLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQThCLFNBQVEsZUFBTTtDQUV4RCxDQUFBO0FBRlksNkJBQTZCO0lBRHpDLHlCQUFXLENBQUMsSUFBSSxDQUFDO0dBQ0wsNkJBQTZCLENBRXpDO0FBRlksc0VBQTZC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