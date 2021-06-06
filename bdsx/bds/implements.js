"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asmcode = require("bdsx/asm/asmcode");
const assembler_1 = require("bdsx/assembler");
const blockpos_1 = require("bdsx/bds/blockpos");
const loopbacksender_1 = require("bdsx/bds/loopbacksender");
const core_1 = require("bdsx/core");
const cxxvector_1 = require("bdsx/cxxvector");
const makefunc_1 = require("bdsx/makefunc");
const mce_1 = require("bdsx/mce");
const nativetype_1 = require("bdsx/nativetype");
const pointer_1 = require("bdsx/pointer");
const sharedpointer_1 = require("bdsx/sharedpointer");
const actor_1 = require("./actor");
const attribute_1 = require("./attribute");
const block_1 = require("./block");
const command_1 = require("./command");
const connreq_1 = require("./connreq");
const dimension_1 = require("./dimension");
const gamemode_1 = require("./gamemode");
const hashedstring_1 = require("./hashedstring");
const inventory_1 = require("./inventory");
const level_1 = require("./level");
const nbt_1 = require("./nbt");
const networkidentifier_1 = require("./networkidentifier");
const packet_1 = require("./packet");
const packets_1 = require("./packets");
const peer_1 = require("./peer");
const player_1 = require("./player");
const proc_1 = require("./proc");
const raknetinstance_1 = require("./raknetinstance");
const server_1 = require("./server");
const stream_1 = require("./stream");
// avoiding circular dependency
// level.ts
level_1.Level.prototype.createDimension = proc_1.procHacker.js("Level::createDimension", dimension_1.Dimension, { this: level_1.Level }, nativetype_1.int32_t);
level_1.Level.prototype.fetchEntity = proc_1.procHacker.js("Level::fetchEntity", actor_1.Actor, { this: level_1.Level }, nativetype_1.bin64_t, nativetype_1.bool_t);
level_1.Level.prototype.getActivePlayerCount = proc_1.procHacker.js("Level::getActivePlayerCount", nativetype_1.int32_t, { this: level_1.Level });
level_1.Level.abstract({ players: [cxxvector_1.CxxVector.make(player_1.ServerPlayer.ref()), 0x58] });
level_1.ServerLevel.abstract({
    packetSender: [loopbacksender_1.LoopbackPacketSender.ref(), 0x830],
    actors: [cxxvector_1.CxxVector.make(actor_1.Actor.ref()), 0x1590],
});
// actor.ts
const actorMaps = new Map();
const ServerPlayer_vftable = proc_1.proc["ServerPlayer::`vftable'"];
actor_1.Actor.prototype.isPlayer = function () {
    return this.vftable.equals(ServerPlayer_vftable);
};
actor_1.Actor._singletoning = function (ptr) {
    if (ptr === null)
        return null;
    const binptr = ptr.getAddressBin();
    let actor = actorMaps.get(binptr);
    if (actor)
        return actor;
    if (ptr.getPointer().equals(ServerPlayer_vftable)) {
        actor = ptr.as(player_1.ServerPlayer);
    }
    else {
        actor = ptr.as(actor_1.Actor);
    }
    actorMaps.set(binptr, actor);
    return actor;
};
actor_1.Actor.all = function () {
    return actorMaps.values();
};
actor_1.Actor.abstract({
    vftable: core_1.VoidPointer,
    dimension: [dimension_1.Dimension, 0x350],
    identifier: [nativetype_1.CxxString, 0x458],
    attributes: [attribute_1.BaseAttributeMap.ref(), 0x480],
    runtimeId: [actor_1.ActorRuntimeID, 0x540],
});
actor_1.Actor.prototype.getName = proc_1.procHacker.js("Actor::getNameTag", nativetype_1.CxxString, { this: actor_1.Actor });
actor_1.Actor.prototype.setName = proc_1.procHacker.js("Actor::setNameTag", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.addTag = proc_1.procHacker.js("Actor::addTag", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.hasTag = proc_1.procHacker.js("Actor::hasTag", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.removeTag = proc_1.procHacker.js("Actor::removeTag", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.getPosition = proc_1.procHacker.js("Actor::getPos", blockpos_1.Vec3, { this: actor_1.Actor });
actor_1.Actor.prototype.getRegion = proc_1.procHacker.js("Actor::getRegionConst", block_1.BlockSource, { this: actor_1.Actor });
actor_1.Actor.prototype.getUniqueIdPointer = proc_1.procHacker.js("Actor::getUniqueID", core_1.StaticPointer, { this: actor_1.Actor });
actor_1.Actor.prototype.getTypeId = makefunc_1.makefunc.js([0x518], nativetype_1.int32_t, { this: actor_1.Actor }); // ActorType getEntityTypeId()
actor_1.Actor.prototype.getDimension = actor_1.Actor.prototype.getDimensionId = makefunc_1.makefunc.js([0x568], nativetype_1.int32_t, { this: actor_1.Actor, structureReturn: true }); // DimensionId* getDimensionId(DimensionId*)
actor_1.Actor.prototype.getCommandPermissionLevel = makefunc_1.makefunc.js([0x620], nativetype_1.int32_t, { this: actor_1.Actor });
const _computeTarget = proc_1.procHacker.js("TeleportCommand::computeTarget", nativetype_1.void_t, null, core_1.StaticPointer, actor_1.Actor, blockpos_1.Vec3, blockpos_1.Vec3, nativetype_1.int32_t);
const _applyTarget = proc_1.procHacker.js("TeleportCommand::applyTarget", nativetype_1.void_t, null, actor_1.Actor, core_1.StaticPointer);
actor_1.Actor.prototype.teleport = function (pos, dimensionId = actor_1.DimensionId.Overworld) {
    const alloc = new core_1.AllocatedPointer(0x80);
    _computeTarget(alloc, this, pos, new blockpos_1.Vec3(true), dimensionId);
    _applyTarget(this, alloc);
};
actor_1.Actor.prototype.getArmor = proc_1.procHacker.js('Actor::getArmor', inventory_1.ItemStack, { this: actor_1.Actor }, nativetype_1.int32_t);
actor_1.Actor.prototype.setSneaking = proc_1.procHacker.js("Actor::setSneaking", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.bool_t);
actor_1.Actor.prototype.getHealth = proc_1.procHacker.js("Actor::getHealth", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getMaxHealth = proc_1.procHacker.js("Actor::getMaxHealth", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.fromUniqueIdBin = function (bin) {
    return server_1.serverInstance.minecraft.something.level.fetchEntity(bin, true);
};
const attribNames = [
    "minecraft:zombie.spawn.reinforcements",
    "minecraft:player.hunger",
    "minecraft:player.saturation",
    "minecraft:player.exhaustion",
    "minecraft:player.level",
    "minecraft:player.experience",
    "minecraft:health",
    "minecraft:follow_range",
    "minecraft:knockback_registance",
    "minecraft:movement",
    "minecraft:underwater_movement",
    "minecraft:attack_damage",
    "minecraft:absorption",
    "minecraft:luck",
    "minecraft:horse.jump_strength",
];
actor_1.Actor.prototype._sendAttributePacket = function (id, value, attr) {
    const packet = packets_1.UpdateAttributesPacket.create();
    packet.actorId = this.runtimeId;
    const data = new packets_1.AttributeData(true);
    data.construct();
    data.name.set(attribNames[id - 1]);
    data.current = value;
    data.min = attr.minValue;
    data.max = attr.maxValue;
    data.default = attr.defaultValue;
    packet.attributes.push(data);
    data.destruct();
    if (this instanceof player_1.ServerPlayer) {
        this.sendNetworkPacket(packet);
    }
    packet.dispose();
};
function _removeActor(actor) {
    actorMaps.delete(actor.getAddressBin());
}
proc_1.procHacker.hookingRawWithCallOriginal('Level::removeEntityReferences', makefunc_1.makefunc.np((level, actor, b) => {
    _removeActor(actor);
}, nativetype_1.void_t, null, level_1.Level, actor_1.Actor, nativetype_1.bool_t), [assembler_1.Register.rcx, assembler_1.Register.rdx, assembler_1.Register.r8], []);
asmcode.removeActor = makefunc_1.makefunc.np(_removeActor, nativetype_1.void_t, null, actor_1.Actor);
proc_1.procHacker.hookingRawWithCallOriginal('Actor::~Actor', asmcode.actorDestructorHook, [assembler_1.Register.rcx], []);
// player.ts
player_1.Player.prototype.setName = proc_1.procHacker.js("Player::setName", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.CxxString);
player_1.Player.prototype.changeDimension = proc_1.procHacker.js("ServerPlayer::changeDimension", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.int32_t, nativetype_1.bool_t);
player_1.Player.prototype.teleportTo = proc_1.procHacker.js("Player::teleportTo", nativetype_1.void_t, { this: player_1.Player }, blockpos_1.Vec3, nativetype_1.bool_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.bin64_t);
player_1.Player.prototype.getGameType = proc_1.procHacker.js("Player::getPlayerGameType", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.getInventory = proc_1.procHacker.js("Player::getSupplies", inventory_1.PlayerInventory, { this: player_1.Player });
player_1.Player.prototype.getMainhandSlot = proc_1.procHacker.js("Player::getCarriedItem", inventory_1.ItemStack, { this: player_1.Player });
player_1.Player.prototype.getOffhandSlot = proc_1.procHacker.js("Actor::getOffhandSlot", inventory_1.ItemStack, { this: player_1.Player });
player_1.Player.prototype.getPermissionLevel = proc_1.procHacker.js("Player::getPlayerPermissionLevel", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.startCooldown = proc_1.procHacker.js("Player::startCooldown", nativetype_1.void_t, { this: player_1.Player }, inventory_1.Item);
player_1.Player.prototype.setSize = proc_1.procHacker.js("Player::setSize", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.float32_t, nativetype_1.float32_t);
player_1.Player.prototype.setSleeping = proc_1.procHacker.js("Player::setSleeping", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.bool_t);
player_1.Player.prototype.isSleeping = proc_1.procHacker.js("Player::isSleeping", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isJumping = proc_1.procHacker.js("Player::isJumping", nativetype_1.bool_t, { this: player_1.Player });
player_1.ServerPlayer.abstract({
    networkIdentifier: [networkidentifier_1.NetworkIdentifier, 0x9f0]
});
player_1.ServerPlayer.prototype._sendInventory = proc_1.procHacker.js("ServerPlayer::sendInventory", nativetype_1.void_t, { this: player_1.ServerPlayer }, nativetype_1.bool_t);
player_1.ServerPlayer.prototype.openInventory = proc_1.procHacker.js("ServerPlayer::openInventory", nativetype_1.void_t, { this: player_1.ServerPlayer });
player_1.ServerPlayer.prototype.sendNetworkPacket = proc_1.procHacker.js("ServerPlayer::sendNetworkPacket", nativetype_1.void_t, { this: player_1.ServerPlayer }, core_1.VoidPointer);
player_1.ServerPlayer.prototype.getNetworkIdentifier = function () {
    return this.networkIdentifier;
};
// networkidentifier.ts
networkidentifier_1.NetworkIdentifier.prototype.getActor = function () {
    return ServerNetworkHandler$_getServerPlayer(server_1.serverInstance.minecraft.something.shandler, this, 0);
};
networkidentifier_1.NetworkIdentifier.prototype.equals = proc_1.procHacker.js("NetworkIdentifier::operator==", nativetype_1.bool_t, { this: networkidentifier_1.NetworkIdentifier }, networkidentifier_1.NetworkIdentifier);
asmcode.NetworkIdentifierGetHash = proc_1.proc['NetworkIdentifier::getHash'];
networkidentifier_1.NetworkIdentifier.prototype.hash = makefunc_1.makefunc.js(asmcode.networkIdentifierHash, nativetype_1.int32_t, { this: networkidentifier_1.NetworkIdentifier });
networkidentifier_1.NetworkHandler.Connection.abstract({
    networkIdentifier: networkidentifier_1.NetworkIdentifier,
    u1: core_1.VoidPointer,
    u2: core_1.VoidPointer,
    u3: core_1.VoidPointer,
    epeer: sharedpointer_1.SharedPtr.make(peer_1.EncryptedNetworkPeer),
    bpeer: sharedpointer_1.SharedPtr.make(peer_1.BatchedNetworkPeer),
    bpeer2: sharedpointer_1.SharedPtr.make(peer_1.BatchedNetworkPeer),
});
networkidentifier_1.NetworkHandler.abstract({
    vftable: core_1.VoidPointer,
    instance: [raknetinstance_1.RakNetInstance.ref(), 0x48]
});
// NetworkHandler::Connection* NetworkHandler::getConnectionFromId(const NetworkIdentifier& ni)
networkidentifier_1.NetworkHandler.prototype.getConnectionFromId = proc_1.procHacker.js(`NetworkHandler::_getConnectionFromId`, networkidentifier_1.NetworkHandler.Connection, { this: networkidentifier_1.NetworkHandler });
// void NetworkHandler::send(const NetworkIdentifier& ni, Packet* packet, unsigned char u)
networkidentifier_1.NetworkHandler.prototype.send = proc_1.procHacker.js('NetworkHandler::send', nativetype_1.void_t, { this: networkidentifier_1.NetworkHandler }, networkidentifier_1.NetworkIdentifier, packet_1.Packet, nativetype_1.int32_t);
// void NetworkHandler::_sendInternal(const NetworkIdentifier& ni, Packet* packet, std::string& data)
networkidentifier_1.NetworkHandler.prototype.sendInternal = proc_1.procHacker.js('NetworkHandler::_sendInternal', nativetype_1.void_t, { this: networkidentifier_1.NetworkHandler }, networkidentifier_1.NetworkIdentifier, packet_1.Packet, pointer_1.CxxStringWrapper);
peer_1.BatchedNetworkPeer.prototype.sendPacket = proc_1.procHacker.js('BatchedNetworkPeer::sendPacket', nativetype_1.void_t, { this: peer_1.BatchedNetworkPeer }, nativetype_1.CxxString, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
// packet.ts
packet_1.Packet.prototype.sendTo = function (target, unknownarg = 0) {
    networkidentifier_1.networkHandler.send(target, this, unknownarg);
};
packet_1.Packet.prototype.destruct = makefunc_1.makefunc.js([0x0], nativetype_1.void_t, { this: packet_1.Packet });
packet_1.Packet.prototype.getId = makefunc_1.makefunc.js([0x8], nativetype_1.int32_t, { this: packet_1.Packet });
packet_1.Packet.prototype.getName = makefunc_1.makefunc.js([0x10], nativetype_1.CxxString, { this: packet_1.Packet, structureReturn: true });
packet_1.Packet.prototype.write = makefunc_1.makefunc.js([0x18], nativetype_1.void_t, { this: packet_1.Packet }, stream_1.BinaryStream);
packet_1.Packet.prototype.read = makefunc_1.makefunc.js([0x20], nativetype_1.int32_t, { this: packet_1.Packet }, stream_1.BinaryStream);
packet_1.Packet.prototype.readExtended = makefunc_1.makefunc.js([0x28], packet_1.ExtendedStreamReadResult, { this: packet_1.Packet }, packet_1.ExtendedStreamReadResult, stream_1.BinaryStream);
// Packet.prototype.unknown = makefunc.js([0x30], bool_t, {this:Packet});
const ServerNetworkHandler$_getServerPlayer = proc_1.procHacker.js("ServerNetworkHandler::_getServerPlayer", player_1.ServerPlayer, { nullableReturn: true }, networkidentifier_1.ServerNetworkHandler, networkidentifier_1.NetworkIdentifier, nativetype_1.int32_t);
networkidentifier_1.ServerNetworkHandler.prototype._disconnectClient = proc_1.procHacker.js("ServerNetworkHandler::disconnectClient", nativetype_1.void_t, { this: networkidentifier_1.ServerNetworkHandler }, networkidentifier_1.NetworkIdentifier, nativetype_1.int32_t, nativetype_1.CxxString, nativetype_1.int32_t);
networkidentifier_1.ServerNetworkHandler.prototype.updateServerAnnouncement = proc_1.procHacker.js("ServerNetworkHandler::updateServerAnnouncement", nativetype_1.void_t, { this: networkidentifier_1.ServerNetworkHandler });
// connreq.ts
connreq_1.Certificate.prototype.getXuid = function () {
    return ExtendedCertificate.getXuid(this);
};
connreq_1.Certificate.prototype.getIdentityName = function () {
    return ExtendedCertificate.getIdentityName(this);
};
connreq_1.Certificate.prototype.getIdentity = function () {
    return ExtendedCertificate.getIdentity(this).value;
};
var ExtendedCertificate;
(function (ExtendedCertificate) {
    ExtendedCertificate.getXuid = proc_1.procHacker.js("ExtendedCertificate::getXuid", nativetype_1.CxxString, { structureReturn: true }, connreq_1.Certificate);
    ExtendedCertificate.getIdentityName = proc_1.procHacker.js("ExtendedCertificate::getIdentityName", nativetype_1.CxxString, { structureReturn: true }, connreq_1.Certificate);
    ExtendedCertificate.getIdentity = proc_1.procHacker.js("ExtendedCertificate::getIdentity", mce_1.mce.UUIDWrapper, { structureReturn: true }, connreq_1.Certificate);
})(ExtendedCertificate || (ExtendedCertificate = {}));
connreq_1.ConnectionRequest.abstract({
    cert: [connreq_1.Certificate.ref(), 0x08],
    something: [connreq_1.Certificate.ref(), 0x10],
});
// attribute.ts
attribute_1.AttributeInstance.abstract({
    vftable: core_1.VoidPointer,
    u1: core_1.VoidPointer,
    u2: core_1.VoidPointer,
    currentValue: [nativetype_1.float32_t, 0x84],
    minValue: [nativetype_1.float32_t, 0x7C],
    maxValue: [nativetype_1.float32_t, 0x80],
    defaultValue: [nativetype_1.float32_t, 0x78],
});
attribute_1.BaseAttributeMap.prototype.getMutableInstance = proc_1.procHacker.js("?getMutableInstance@BaseAttributeMap@@QEAAPEAVAttributeInstance@@I@Z", attribute_1.AttributeInstance, { this: attribute_1.BaseAttributeMap }, nativetype_1.int32_t);
// server.ts
server_1.VanilaGameModuleServer.abstract({
    listener: [server_1.VanilaServerGameplayEventListener.ref(), 0x8]
});
server_1.DedicatedServer.abstract({});
server_1.Minecraft$Something.abstract({
    network: networkidentifier_1.NetworkHandler.ref(),
    level: level_1.ServerLevel.ref(),
    shandler: networkidentifier_1.ServerNetworkHandler.ref(),
});
server_1.Minecraft.abstract({
    vftable: core_1.VoidPointer,
    serverInstance: server_1.ServerInstance.ref(),
    minecraftEventing: server_1.MinecraftEventing.ref(),
    resourcePackManager: server_1.ResourcePackManager.ref(),
    offset_20: core_1.VoidPointer,
    vanillaGameModuleServer: [sharedpointer_1.SharedPtr, 0x28],
    whitelist: server_1.Whitelist.ref(),
    permissionsJsonFileName: nativetype_1.CxxString.ref(),
    privateKeyManager: server_1.PrivateKeyManager.ref(),
    serverMetrics: [server_1.ServerMetrics.ref(), 0x78],
    commands: [command_1.MinecraftCommands.ref(), 0xa0],
    something: server_1.Minecraft$Something.ref(),
    network: [networkidentifier_1.NetworkHandler.ref(), 0xc0],
    LoopbackPacketSender: loopbacksender_1.LoopbackPacketSender.ref(),
    server: server_1.DedicatedServer.ref(),
    entityRegistryOwned: [sharedpointer_1.SharedPtr.make(server_1.EntityRegistryOwned), 0xe0],
});
server_1.Minecraft.prototype.getLevel = proc_1.procHacker.js("Minecraft::getLevel", level_1.Level, { this: server_1.Minecraft });
server_1.ScriptFramework.abstract({
    vftable: core_1.VoidPointer,
});
server_1.MinecraftServerScriptEngine.abstract({
    scriptEngineVftable: [core_1.VoidPointer, 0x428]
});
server_1.ServerInstance.abstract({
    vftable: core_1.VoidPointer,
    server: [server_1.DedicatedServer.ref(), 0x98],
    minecraft: [server_1.Minecraft.ref(), 0xa0],
    networkHandler: [networkidentifier_1.NetworkHandler.ref(), 0xa8],
    scriptEngine: [server_1.MinecraftServerScriptEngine.ref(), 0x210],
});
server_1.ServerInstance.prototype._disconnectAllClients = proc_1.procHacker.js("ServerInstance::disconnectAllClientsWithMessage", nativetype_1.void_t, { this: server_1.ServerInstance }, nativetype_1.CxxString);
// gamemode.ts
gamemode_1.GameMode.define({
    actor: [actor_1.Actor.ref(), 8]
});
// inventory.ts
inventory_1.Item.prototype.getCommandName = proc_1.procHacker.js("Item::getCommandName", nativetype_1.CxxString, { this: inventory_1.Item });
inventory_1.Item.prototype.allowOffhand = proc_1.procHacker.js("Item::allowOffhand", nativetype_1.bool_t, { this: inventory_1.Item });
inventory_1.Item.prototype.isDamageable = proc_1.procHacker.js("Item::isDamageable", nativetype_1.bool_t, { this: inventory_1.Item });
inventory_1.Item.prototype.isFood = proc_1.procHacker.js("Item::isFood", nativetype_1.bool_t, { this: inventory_1.Item });
inventory_1.Item.prototype.setAllowOffhand = proc_1.procHacker.js("Item::setAllowOffhand", nativetype_1.void_t, { this: inventory_1.Item }, nativetype_1.bool_t);
inventory_1.Item.prototype.getCreativeCategory = proc_1.procHacker.js("Item::getCreativeCategory", nativetype_1.int32_t, { this: inventory_1.Item });
inventory_1.ItemStack.abstract({
    amount: [nativetype_1.uint8_t, 0x22],
});
inventory_1.ItemStack.prototype.getId = proc_1.procHacker.js("ItemStackBase::getId", nativetype_1.int16_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype._getItem = proc_1.procHacker.js("ItemStackBase::getItem", inventory_1.Item, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.getCustomName = proc_1.procHacker.js("ItemStackBase::getName", nativetype_1.CxxString, { this: inventory_1.ItemStack, structureReturn: true });
inventory_1.ItemStack.prototype.setCustomName = proc_1.procHacker.js("ItemStackBase::setCustomName", nativetype_1.void_t, { this: inventory_1.ItemStack }, nativetype_1.CxxString);
inventory_1.ItemStack.prototype._setCustomLore = proc_1.procHacker.js("ItemStackBase::setCustomLore", nativetype_1.void_t, { this: inventory_1.ItemStack }, cxxvector_1.CxxVector.make(pointer_1.CxxStringWrapper));
inventory_1.ItemStack.prototype.getUserData = proc_1.procHacker.js("ItemStackBase::getUserData", nbt_1.CompoundTag, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.hasCustomName = proc_1.procHacker.js("ItemStackBase::hasCustomHoverName", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isBlock = proc_1.procHacker.js("ItemStackBase::isBlock", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isNull = proc_1.procHacker.js("ItemStackBase::isNull", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.getEnchantValue = proc_1.procHacker.js("ItemStackBase::getEnchantValue", nativetype_1.int32_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isEnchanted = proc_1.procHacker.js("ItemStackBase::isEnchanted", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.setDamageValue = proc_1.procHacker.js("ItemStackBase::setDamageValue", nativetype_1.void_t, { this: inventory_1.ItemStack }, nativetype_1.int32_t);
inventory_1.ItemStack.prototype.startCoolDown = proc_1.procHacker.js("ItemStackBase::startCoolDown", nativetype_1.void_t, { this: inventory_1.ItemStack }, player_1.ServerPlayer);
inventory_1.ItemStack.prototype.load = proc_1.procHacker.js("ItemStackBase::load", nativetype_1.void_t, { this: inventory_1.ItemStack }, nbt_1.CompoundTag);
inventory_1.ItemStack.prototype.sameItem = proc_1.procHacker.js("ItemStackBase::sameItem", nativetype_1.bool_t, { this: inventory_1.ItemStack }, inventory_1.ItemStack);
inventory_1.ItemStack.prototype.isStackedByData = proc_1.procHacker.js("ItemStackBase::isStackedByData", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isStackable = proc_1.procHacker.js("ItemStackBase::isStackable", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isPotionItem = proc_1.procHacker.js("ItemStackBase::isPotionItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isPattern = proc_1.procHacker.js("ItemStackBase::isPattern", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isMusicDiscItem = proc_1.procHacker.js("ItemStackBase::isMusicDiscItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isLiquidClipItem = proc_1.procHacker.js("ItemStackBase::isLiquidClipItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isHorseArmorItem = proc_1.procHacker.js("ItemStackBase::isHorseArmorItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isGlint = proc_1.procHacker.js("ItemStackBase::isGlint", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isFullStack = proc_1.procHacker.js("ItemStackBase::isFullStack", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isFireResistant = proc_1.procHacker.js("ItemStackBase::isFireResistant", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isExplodable = proc_1.procHacker.js("ItemStackBase::isExplodable", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isDamaged = proc_1.procHacker.js("ItemStackBase::isDamaged", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isDamageableItem = proc_1.procHacker.js("ItemStackBase::isDamageableItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isArmorItem = proc_1.procHacker.js("ItemStackBase::isArmorItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.getComponentItem = proc_1.procHacker.js("ItemStackBase::getComponentItem", inventory_1.ComponentItem, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.getMaxDamage = proc_1.procHacker.js("ItemStackBase::getMaxDamage", nativetype_1.int32_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.getDamageValue = proc_1.procHacker.js("ItemStackBase::getDamageValue", nativetype_1.int32_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.isWearableItem = proc_1.procHacker.js("ItemStackBase::isWearableItem", nativetype_1.bool_t, { this: inventory_1.ItemStack });
inventory_1.ItemStack.prototype.getAttackDamage = proc_1.procHacker.js("ItemStackBase::getAttackDamage", nativetype_1.int32_t, { this: inventory_1.ItemStack });
inventory_1.PlayerInventory.prototype.addItem = proc_1.procHacker.js("PlayerInventory::add", nativetype_1.bool_t, { this: inventory_1.PlayerInventory }, inventory_1.ItemStack, nativetype_1.bool_t);
inventory_1.PlayerInventory.prototype.clearSlot = proc_1.procHacker.js("PlayerInventory::clearSlot", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.getContainerSize = proc_1.procHacker.js("PlayerInventory::getContainerSize", nativetype_1.int32_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.getFirstEmptySlot = proc_1.procHacker.js("PlayerInventory::getFirstEmptySlot", nativetype_1.int32_t, { this: inventory_1.PlayerInventory });
inventory_1.PlayerInventory.prototype.getHotbarSize = proc_1.procHacker.js("PlayerInventory::getHotbarSize", nativetype_1.int32_t, { this: inventory_1.PlayerInventory });
inventory_1.PlayerInventory.prototype.getItem = proc_1.procHacker.js("PlayerInventory::getItem", inventory_1.ItemStack, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.getSelectedItem = proc_1.procHacker.js("PlayerInventory::getSelectedItem", inventory_1.ItemStack, { this: inventory_1.PlayerInventory });
inventory_1.PlayerInventory.prototype.getSlots = proc_1.procHacker.js("PlayerInventory::getSlots", cxxvector_1.CxxVector.make(inventory_1.ItemStack.ref()), { this: inventory_1.PlayerInventory, structureReturn: true });
inventory_1.PlayerInventory.prototype.selectSlot = proc_1.procHacker.js("PlayerInventory::selectSlot", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.setItem = proc_1.procHacker.js("PlayerInventory::setItem", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, inventory_1.ItemStack, nativetype_1.int32_t, nativetype_1.bool_t);
inventory_1.PlayerInventory.prototype.setSelectedItem = proc_1.procHacker.js("PlayerInventory::setSelectedItem", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, inventory_1.ItemStack);
inventory_1.PlayerInventory.prototype.swapSlots = proc_1.procHacker.js("PlayerInventory::swapSlots", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
// block.ts
block_1.BlockLegacy.prototype.getCommandName = proc_1.procHacker.js("BlockLegacy::getCommandName", nativetype_1.CxxString, { this: block_1.BlockLegacy });
block_1.BlockLegacy.prototype.getCreativeCategory = proc_1.procHacker.js("BlockLegacy::getCreativeCategory", nativetype_1.int32_t, { this: block_1.Block });
block_1.BlockLegacy.prototype.setDestroyTime = proc_1.procHacker.js("BlockLegacy::setDestroyTime", nativetype_1.void_t, { this: block_1.Block }, nativetype_1.float32_t);
block_1.Block.abstract({
    blockLegacy: [block_1.BlockLegacy.ref(), 0x10],
});
block_1.Block.prototype._getName = proc_1.procHacker.js("Block::getName", hashedstring_1.HashedString, { this: block_1.Block });
block_1.BlockSource.prototype.getBlock = proc_1.procHacker.js("BlockSource::getBlock", block_1.Block, { this: block_1.BlockSource }, blockpos_1.BlockPos);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbGVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltcGxlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNkM7QUFDN0MsOENBQTBDO0FBQzFDLGdEQUFtRDtBQUNuRCw0REFBK0Q7QUFDL0Qsb0NBQXlFO0FBQ3pFLDhDQUEyQztBQUMzQyw0Q0FBeUM7QUFDekMsa0NBQStCO0FBQy9CLGdEQUF1SDtBQUN2SCwwQ0FBZ0Q7QUFDaEQsc0RBQStDO0FBQy9DLG1DQUE2RDtBQUM3RCwyQ0FBK0U7QUFDL0UsbUNBQTBEO0FBQzFELHVDQUE4QztBQUM5Qyx1Q0FBMkQ7QUFDM0QsMkNBQXdDO0FBQ3hDLHlDQUFzQztBQUN0QyxpREFBOEM7QUFDOUMsMkNBQThFO0FBQzlFLG1DQUE2QztBQUM3QywrQkFBb0M7QUFDcEMsMkRBQThHO0FBQzlHLHFDQUE0RDtBQUM1RCx1Q0FBa0U7QUFDbEUsaUNBQWtFO0FBQ2xFLHFDQUFnRDtBQUNoRCxpQ0FBMEM7QUFDMUMscURBQWtEO0FBQ2xELHFDQUE4VDtBQUM5VCxxQ0FBd0M7QUFFeEMsK0JBQStCO0FBRS9CLFdBQVc7QUFDWCxhQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxxQkFBUyxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUM1RyxhQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxhQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLEVBQUUsb0JBQU8sRUFBRSxtQkFBTSxDQUFDLENBQUM7QUFDeEcsYUFBSyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxvQkFBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxDQUFDLENBQUM7QUFFM0csYUFBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7QUFFckUsbUJBQVcsQ0FBQyxRQUFRLENBQUM7SUFDakIsWUFBWSxFQUFDLENBQUMscUNBQW9CLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ2hELE1BQU0sRUFBQyxDQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztDQUMvQyxDQUFDLENBQUM7QUFFSCxXQUFXO0FBQ1gsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7QUFDM0MsTUFBTSxvQkFBb0IsR0FBRyxXQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM3RCxhQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRztJQUN2QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBQ0QsYUFBYSxDQUFDLGFBQWEsR0FBRyxVQUFTLEdBQXNCO0lBQzFELElBQUksR0FBRyxLQUFLLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUM5QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxJQUFJLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN4QixJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUMvQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLENBQUM7S0FDaEM7U0FBTTtRQUNILEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQUssQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBQ0YsYUFBSyxDQUFDLEdBQUcsR0FBRztJQUNSLE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGLGFBQUssQ0FBQyxRQUFRLENBQUM7SUFDWCxPQUFPLEVBQUUsa0JBQVc7SUFDcEIsU0FBUyxFQUFFLENBQUMscUJBQVMsRUFBRSxLQUFLLENBQUM7SUFDN0IsVUFBVSxFQUFFLENBQUMsc0JBQWlDLEVBQUUsS0FBSyxDQUFDO0lBQ3RELFVBQVUsRUFBRSxDQUFDLDRCQUFnQixDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQztJQUMzQyxTQUFTLEVBQUUsQ0FBQyxzQkFBYyxFQUFFLEtBQUssQ0FBQztDQUNyQyxDQUFDLENBQUM7QUFDSCxhQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxzQkFBUyxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxDQUFDLENBQUM7QUFDdEYsYUFBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxhQUFLLEVBQUMsRUFBRSxzQkFBUyxDQUFDLENBQUM7QUFDOUYsYUFBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLEVBQUUsc0JBQVMsQ0FBQyxDQUFDO0FBQ3pGLGFBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxFQUFFLHNCQUFTLENBQUMsQ0FBQztBQUN6RixhQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxFQUFFLHNCQUFTLENBQUMsQ0FBQztBQUMvRixhQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxDQUFDLENBQUM7QUFDakYsYUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsbUJBQVcsRUFBRSxFQUFDLElBQUksRUFBQyxhQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzlGLGFBQUssQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsb0JBQWEsRUFBRSxFQUFDLElBQUksRUFBQyxhQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQ3RHLGFBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQyxhQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsOEJBQThCO0FBQ3ZHLGFBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLGFBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQyxhQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyw0Q0FBNEM7QUFDaEwsYUFBSyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLENBQUMsQ0FBQztBQUN4RixNQUFNLGNBQWMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxtQkFBTSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFLGFBQUssRUFBRSxlQUFJLEVBQUUsZUFBSSxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUNoSSxNQUFNLFlBQVksR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBTSxFQUFFLElBQUksRUFBRSxhQUFLLEVBQUUsb0JBQWEsQ0FBQyxDQUFDO0FBQ3ZHLGFBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsR0FBUSxFQUFFLGNBQXdCLG1CQUFXLENBQUMsU0FBUztJQUN2RixNQUFNLEtBQUssR0FBRyxJQUFJLHVCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLGVBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5RCxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUNGLGFBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0FBRTlGLGFBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0FBQ2hHLGFBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLENBQUMsQ0FBQztBQUNyRixhQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxDQUFDLENBQUM7QUFFM0YsYUFBSyxDQUFDLGVBQWUsR0FBRyxVQUFTLEdBQUc7SUFDaEMsT0FBTyx1QkFBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUc7SUFDaEIsdUNBQXVDO0lBQ3ZDLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4QixnQ0FBZ0M7SUFDaEMsb0JBQW9CO0lBQ3BCLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQiwrQkFBK0I7Q0FDbEMsQ0FBQztBQUNELGFBQUssQ0FBQyxTQUFpQixDQUFDLG9CQUFvQixHQUFHLFVBQXFCLEVBQWMsRUFBRSxLQUFZLEVBQUUsSUFBc0I7SUFDckgsTUFBTSxNQUFNLEdBQUcsZ0NBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksdUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQixJQUFJLElBQUksWUFBWSxxQkFBWSxFQUFFO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsQztJQUNELE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRixTQUFTLFlBQVksQ0FBQyxLQUFXO0lBQzdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELGlCQUFVLENBQUMsMEJBQTBCLENBQ2pDLCtCQUErQixFQUMvQixtQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUU7SUFDM0IsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUMsRUFBRSxtQkFBTSxFQUFFLElBQUksRUFBRSxhQUFLLEVBQUUsYUFBSyxFQUFFLG1CQUFNLENBQUMsRUFDdEMsQ0FBQyxvQkFBUSxDQUFDLEdBQUcsRUFBRSxvQkFBUSxDQUFDLEdBQUcsRUFBRSxvQkFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FDaEQsQ0FBQztBQUVGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFNLEVBQUUsSUFBSSxFQUFFLGFBQUssQ0FBQyxDQUFDO0FBQ3JFLGlCQUFVLENBQUMsMEJBQTBCLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLG9CQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFeEcsWUFBWTtBQUNaLGVBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsZUFBTSxFQUFDLEVBQUUsc0JBQVMsQ0FBQyxDQUFDO0FBQy9GLGVBQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLCtCQUErQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLEVBQUUsb0JBQU8sRUFBRSxtQkFBTSxDQUFDLENBQUM7QUFDMUgsZUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxlQUFNLEVBQUMsRUFBRSxlQUFJLEVBQUUsbUJBQU0sRUFBRSxvQkFBTyxFQUFFLG9CQUFPLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0FBQ2xJLGVBQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLENBQUMsQ0FBQztBQUNsRyxlQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwyQkFBZSxFQUFFLEVBQUMsSUFBSSxFQUFDLGVBQU0sRUFBQyxDQUFDLENBQUM7QUFDckcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUscUJBQVMsRUFBRSxFQUFDLElBQUksRUFBQyxlQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ3JHLGVBQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLHFCQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLENBQUMsQ0FBQztBQUNuRyxlQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLENBQUMsQ0FBQztBQUNoSCxlQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGVBQU0sRUFBQyxFQUFFLGdCQUFJLENBQUMsQ0FBQztBQUNyRyxlQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGVBQU0sRUFBQyxFQUFFLHNCQUFTLEVBQUUsc0JBQVMsQ0FBQyxDQUFDO0FBQ3pHLGVBQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0FBQ25HLGVBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLENBQUMsQ0FBQztBQUN6RixlQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGVBQU0sRUFBQyxDQUFDLENBQUM7QUFFdkYscUJBQVksQ0FBQyxRQUFRLENBQUM7SUFDbEIsaUJBQWlCLEVBQUMsQ0FBQyxxQ0FBaUIsRUFBRSxLQUFLLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBQ0YscUJBQVksQ0FBQyxTQUFpQixDQUFDLGNBQWMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFZLEVBQUMsRUFBRSxtQkFBTSxDQUFDLENBQUM7QUFDbkkscUJBQVksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUscUJBQVksRUFBQyxDQUFDLENBQUM7QUFDbEgscUJBQVksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBRSxxQkFBWSxFQUFDLEVBQUUsa0JBQVcsQ0FBQyxDQUFDO0FBQ3ZJLHFCQUFZLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHO0lBQzFDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ2xDLENBQUMsQ0FBQztBQUVGLHVCQUF1QjtBQUN2QixxQ0FBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHO0lBQ25DLE9BQU8scUNBQXFDLENBQUMsdUJBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkcsQ0FBQyxDQUFDO0FBQ0YscUNBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFDQUFpQixFQUFDLEVBQUUscUNBQWlCLENBQUMsQ0FBQztBQUV6SSxPQUFPLENBQUMsd0JBQXdCLEdBQUcsV0FBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDdEUscUNBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQyxxQ0FBaUIsRUFBQyxDQUFDLENBQUM7QUFFakgsa0NBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQy9CLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxFQUFFLEVBQUMsa0JBQVc7SUFDZCxFQUFFLEVBQUMsa0JBQVc7SUFDZCxFQUFFLEVBQUMsa0JBQVc7SUFDZCxLQUFLLEVBQUMseUJBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQW9CLENBQUM7SUFDMUMsS0FBSyxFQUFDLHlCQUFTLENBQUMsSUFBSSxDQUFDLHlCQUFrQixDQUFDO0lBQ3hDLE1BQU0sRUFBQyx5QkFBUyxDQUFDLElBQUksQ0FBQyx5QkFBa0IsQ0FBQztDQUM1QyxDQUFDLENBQUM7QUFDSCxrQ0FBYyxDQUFDLFFBQVEsQ0FBQztJQUNwQixPQUFPLEVBQUUsa0JBQVc7SUFDcEIsUUFBUSxFQUFFLENBQUMsK0JBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7Q0FDekMsQ0FBQyxDQUFDO0FBRUgsK0ZBQStGO0FBQy9GLGtDQUFjLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLGtDQUFjLENBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFjLEVBQUMsQ0FBQyxDQUFDO0FBRXZKLDBGQUEwRjtBQUMxRixrQ0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBYyxFQUFDLEVBQUUscUNBQWlCLEVBQUUsZUFBTSxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUV6SSxxR0FBcUc7QUFDckcsa0NBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLCtCQUErQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWMsRUFBQyxFQUFFLHFDQUFpQixFQUFFLGVBQU0sRUFBRSwwQkFBZ0IsQ0FBQyxDQUFDO0FBRW5LLHlCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyx5QkFBa0IsRUFBQyxFQUFFLHNCQUFTLEVBQUUsb0JBQU8sRUFBRSxvQkFBTyxFQUFFLG9CQUFPLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0FBRTVLLFlBQVk7QUFDWixlQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFTLE1BQXdCLEVBQUUsYUFBa0IsQ0FBQztJQUM1RSxrQ0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUNGLGVBQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxlQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ3RFLGVBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQyxlQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ3BFLGVBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsc0JBQVMsRUFBRSxFQUFDLElBQUksRUFBQyxlQUFNLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDaEcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGVBQU0sRUFBQyxFQUFFLHFCQUFZLENBQUMsQ0FBQztBQUNsRixlQUFNLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLEVBQUUscUJBQVksQ0FBQyxDQUFDO0FBQ2xGLGVBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsaUNBQXdCLEVBQUUsRUFBQyxJQUFJLEVBQUMsZUFBTSxFQUFDLEVBQUUsaUNBQXdCLEVBQUUscUJBQVksQ0FBQyxDQUFDO0FBQ3JJLHlFQUF5RTtBQUV6RSxNQUFNLHFDQUFxQyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLHFCQUFZLEVBQUUsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLEVBQUUsd0NBQW9CLEVBQUUscUNBQWlCLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0FBQzVMLHdDQUFvQixDQUFDLFNBQWlCLENBQUMsaUJBQWlCLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBRSx3Q0FBb0IsRUFBQyxFQUFFLHFDQUFpQixFQUFFLG9CQUFPLEVBQUUsc0JBQVMsRUFBRSxvQkFBTyxDQUFDLENBQUM7QUFDMU0sd0NBQW9CLENBQUMsU0FBUyxDQUFDLHdCQUF3QixHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsd0NBQW9CLEVBQUMsQ0FBQyxDQUFDO0FBRS9KLGFBQWE7QUFDYixxQkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUc7SUFDNUIsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBQ0YscUJBQVcsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO0lBQ3BDLE9BQU8sbUJBQW1CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQztBQUNGLHFCQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRztJQUNoQyxPQUFPLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDdkQsQ0FBQyxDQUFDO0FBRUYsSUFBVSxtQkFBbUIsQ0FJNUI7QUFKRCxXQUFVLG1CQUFtQjtJQUNaLDJCQUFPLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsOEJBQThCLEVBQUUsc0JBQVMsRUFBRSxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUMsRUFBRSxxQkFBVyxDQUFDLENBQUM7SUFDekcsbUNBQWUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxzQkFBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBQyxFQUFFLHFCQUFXLENBQUMsQ0FBQztJQUN6SCwrQkFBVyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLFNBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxlQUFlLEVBQUUsSUFBSSxFQUFDLEVBQUUscUJBQVcsQ0FBQyxDQUFDO0FBQ3hJLENBQUMsRUFKUyxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBSTVCO0FBQ0QsMkJBQWlCLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLElBQUksRUFBQyxDQUFDLHFCQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDO0lBQzlCLFNBQVMsRUFBQyxDQUFDLHFCQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDO0NBQ3RDLENBQUMsQ0FBQztBQUVILGVBQWU7QUFDZiw2QkFBaUIsQ0FBQyxRQUFRLENBQUM7SUFDdkIsT0FBTyxFQUFDLGtCQUFXO0lBQ25CLEVBQUUsRUFBQyxrQkFBVztJQUNkLEVBQUUsRUFBQyxrQkFBVztJQUNkLFlBQVksRUFBRSxDQUFDLHNCQUFTLEVBQUUsSUFBSSxDQUFDO0lBQy9CLFFBQVEsRUFBRSxDQUFDLHNCQUFTLEVBQUUsSUFBSSxDQUFDO0lBQzNCLFFBQVEsRUFBRSxDQUFDLHNCQUFTLEVBQUUsSUFBSSxDQUFDO0lBQzNCLFlBQVksRUFBRSxDQUFDLHNCQUFTLEVBQUUsSUFBSSxDQUFDO0NBQ2xDLENBQUMsQ0FBQztBQUVILDRCQUFnQixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSw2QkFBaUIsRUFBRSxFQUFDLElBQUksRUFBQyw0QkFBZ0IsRUFBQyxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUUzTCxZQUFZO0FBQ1osK0JBQXNCLENBQUMsUUFBUSxDQUFDO0lBQzVCLFFBQVEsRUFBQyxDQUFDLDBDQUFpQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQztDQUMxRCxDQUFDLENBQUM7QUFDSCx3QkFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3Qiw0QkFBbUIsQ0FBQyxRQUFRLENBQUM7SUFDekIsT0FBTyxFQUFDLGtDQUFjLENBQUMsR0FBRyxFQUFFO0lBQzVCLEtBQUssRUFBQyxtQkFBVyxDQUFDLEdBQUcsRUFBRTtJQUN2QixRQUFRLEVBQUMsd0NBQW9CLENBQUMsR0FBRyxFQUFFO0NBQ3RDLENBQUMsQ0FBQztBQUNILGtCQUFTLENBQUMsUUFBUSxDQUFDO0lBQ2YsT0FBTyxFQUFDLGtCQUFXO0lBQ25CLGNBQWMsRUFBQyx1QkFBYyxDQUFDLEdBQUcsRUFBRTtJQUNuQyxpQkFBaUIsRUFBQywwQkFBaUIsQ0FBQyxHQUFHLEVBQUU7SUFDekMsbUJBQW1CLEVBQUMsNEJBQW1CLENBQUMsR0FBRyxFQUFFO0lBQzdDLFNBQVMsRUFBQyxrQkFBVztJQUNyQix1QkFBdUIsRUFBQyxDQUFDLHlCQUFTLEVBQUUsSUFBSSxDQUFDO0lBQ3pDLFNBQVMsRUFBQyxrQkFBUyxDQUFDLEdBQUcsRUFBRTtJQUN6Qix1QkFBdUIsRUFBQyxzQkFBUyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxpQkFBaUIsRUFBQywwQkFBaUIsQ0FBQyxHQUFHLEVBQUU7SUFDekMsYUFBYSxFQUFDLENBQUMsc0JBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7SUFDekMsUUFBUSxFQUFDLENBQUMsMkJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDO0lBQ3hDLFNBQVMsRUFBQyw0QkFBbUIsQ0FBQyxHQUFHLEVBQUU7SUFDbkMsT0FBTyxFQUFDLENBQUMsa0NBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7SUFDcEMsb0JBQW9CLEVBQUMscUNBQW9CLENBQUMsR0FBRyxFQUFFO0lBQy9DLE1BQU0sRUFBQyx3QkFBZSxDQUFDLEdBQUcsRUFBRTtJQUM1QixtQkFBbUIsRUFBQyxDQUFDLHlCQUFTLENBQUMsSUFBSSxDQUFDLDRCQUFtQixDQUFDLEVBQUUsSUFBSSxDQUFDO0NBQ2xFLENBQUMsQ0FBQztBQUNILGtCQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxhQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0JBQVMsRUFBQyxDQUFDLENBQUM7QUFDN0Ysd0JBQWUsQ0FBQyxRQUFRLENBQUM7SUFDckIsT0FBTyxFQUFDLGtCQUFXO0NBQ3RCLENBQUMsQ0FBQztBQUNILG9DQUEyQixDQUFDLFFBQVEsQ0FBQztJQUNqQyxtQkFBbUIsRUFBQyxDQUFDLGtCQUFXLEVBQUUsS0FBSyxDQUFDO0NBQzNDLENBQUMsQ0FBQztBQUNILHVCQUFjLENBQUMsUUFBUSxDQUFDO0lBQ3BCLE9BQU8sRUFBQyxrQkFBVztJQUNuQixNQUFNLEVBQUMsQ0FBQyx3QkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztJQUNwQyxTQUFTLEVBQUMsQ0FBQyxrQkFBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztJQUNqQyxjQUFjLEVBQUMsQ0FBQyxrQ0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztJQUMzQyxZQUFZLEVBQUMsQ0FBQyxvQ0FBMkIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUM7Q0FDMUQsQ0FBQyxDQUFDO0FBQ0YsdUJBQWMsQ0FBQyxTQUFpQixDQUFDLHFCQUFxQixHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsdUJBQWMsRUFBQyxFQUFFLHNCQUFTLENBQUMsQ0FBQztBQUVySyxjQUFjO0FBQ2QsbUJBQVEsQ0FBQyxNQUFNLENBQUM7SUFDWixLQUFLLEVBQUUsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQzFCLENBQUMsQ0FBQztBQUVILGVBQWU7QUFDZixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsc0JBQVMsRUFBRSxFQUFDLElBQUksRUFBQyxnQkFBSSxFQUFDLENBQUMsQ0FBQztBQUM5RixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxnQkFBSSxFQUFDLENBQUMsQ0FBQztBQUN2RixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxnQkFBSSxFQUFDLENBQUMsQ0FBQztBQUN2RixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsZ0JBQUksRUFBQyxDQUFDLENBQUM7QUFDM0UsZ0JBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsZ0JBQUksRUFBQyxFQUFFLG1CQUFNLENBQUMsQ0FBQztBQUNyRyxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxvQkFBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLGdCQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3RHLHFCQUFTLENBQUMsUUFBUSxDQUFDO0lBQ2YsTUFBTSxFQUFDLENBQUMsb0JBQU8sRUFBRSxJQUFJLENBQUM7Q0FDekIsQ0FBQyxDQUFDO0FBQ0gscUJBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFDNUYscUJBQVMsQ0FBQyxTQUFpQixDQUFDLFFBQVEsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxnQkFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ3hHLHFCQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxzQkFBUyxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUUsZUFBZSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7QUFDL0gscUJBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxFQUFFLHNCQUFTLENBQUMsQ0FBQztBQUN0SCxxQkFBUyxDQUFDLFNBQWlCLENBQUMsY0FBYyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxFQUFFLHFCQUFTLENBQUMsSUFBSSxDQUFDLDBCQUFnQixDQUFDLENBQUMsQ0FBQztBQUN4SixxQkFBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsaUJBQVcsRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUM3RyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsbUNBQW1DLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNqSCxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNoRyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUM5RixxQkFBUyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNqSCxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUN4RyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsK0JBQStCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0FBQ3ZILHFCQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsRUFBRSxxQkFBWSxDQUFDLENBQUM7QUFDMUgscUJBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxFQUFFLGlCQUFXLENBQUMsQ0FBQztBQUN2RyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMseUJBQXlCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLEVBQUUscUJBQVMsQ0FBQyxDQUFDO0FBQzdHLHFCQUFTLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ2hILHFCQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ3hHLHFCQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQzFHLHFCQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ3BHLHFCQUFTLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ2hILHFCQUFTLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFDbEgscUJBQVMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNsSCxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNoRyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUN4RyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNoSCxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUMxRyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxxQkFBUyxFQUFDLENBQUMsQ0FBQztBQUNwRyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ2xILHFCQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ3hHLHFCQUFTLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLHlCQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFDekgscUJBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFDM0cscUJBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLCtCQUErQixFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFDL0cscUJBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLCtCQUErQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFDOUcscUJBQVMsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLG9CQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMscUJBQVMsRUFBQyxDQUFDLENBQUM7QUFFakgsMkJBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsMkJBQWUsRUFBQyxFQUFFLHFCQUFTLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0FBQzdILDJCQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLDJCQUFlLEVBQUMsRUFBRSxvQkFBTyxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUNwSSwyQkFBZSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxvQkFBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLDJCQUFlLEVBQUMsRUFBRSxvQkFBTyxDQUFDLENBQUM7QUFDMUksMkJBQWUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsb0NBQW9DLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQywyQkFBZSxFQUFDLENBQUMsQ0FBQztBQUNuSSwyQkFBZSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsb0JBQU8sRUFBRSxFQUFDLElBQUksRUFBQywyQkFBZSxFQUFDLENBQUMsQ0FBQztBQUMzSCwyQkFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLEVBQUUscUJBQVMsRUFBRSxFQUFDLElBQUksRUFBQywyQkFBZSxFQUFDLEVBQUUsb0JBQU8sRUFBRSxvQkFBTyxDQUFDLENBQUM7QUFDbkksMkJBQWUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLHFCQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsMkJBQWUsRUFBQyxDQUFDLENBQUM7QUFDakksMkJBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLHFCQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQywyQkFBZSxFQUFFLGVBQWUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQy9KLDJCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLDJCQUFlLEVBQUMsRUFBRSxvQkFBTyxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUN0SSwyQkFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQywyQkFBZSxFQUFDLEVBQUUsb0JBQU8sRUFBRSxxQkFBUyxFQUFFLG9CQUFPLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0FBQ25KLDJCQUFlLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLDJCQUFlLEVBQUMsRUFBRSxxQkFBUyxDQUFDLENBQUM7QUFDekksMkJBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsMkJBQWUsRUFBQyxFQUFFLG9CQUFPLEVBQUUsb0JBQU8sQ0FBQyxDQUFDO0FBRXBJLFdBQVc7QUFDWCxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsc0JBQVMsRUFBRSxFQUFDLElBQUksRUFBQyxtQkFBVyxFQUFDLENBQUMsQ0FBQztBQUNuSCxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxvQkFBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLGFBQUssRUFBQyxDQUFDLENBQUM7QUFDckgsbUJBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsYUFBSyxFQUFDLEVBQUUsc0JBQVMsQ0FBQyxDQUFDO0FBQ3JILGFBQUssQ0FBQyxRQUFRLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQyxtQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztDQUN6QyxDQUFDLENBQUM7QUFDRixhQUFLLENBQUMsU0FBaUIsQ0FBQyxRQUFRLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsMkJBQVksRUFBRSxFQUFDLElBQUksRUFBQyxhQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQ2hHLG1CQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxhQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUMsbUJBQVcsRUFBQyxFQUFFLG1CQUFRLENBQUMsQ0FBQyJ9