"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerJumpEvent = exports.PlayerUseItemEvent = exports.PlayerCritEvent = exports.PlayerPickupItemEvent = exports.PlayerJoinEvent = exports.PlayerDropItemEvent = exports.PlayerAttackEvent = exports.EntityCreatedEvent = exports.EntitySneakEvent = exports.EntityHealEvent = exports.EntityHurtEvent = void 0;
const actor_1 = require("../bds/actor");
const attribute_1 = require("../bds/attribute");
const inventory_1 = require("../bds/inventory");
const packetids_1 = require("../bds/packetids");
const packets_1 = require("../bds/packets");
const player_1 = require("../bds/player");
const proc_1 = require("../bds/proc");
const common_1 = require("../common");
const core_1 = require("../core");
const event_1 = require("../event");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
class EntityHurtEvent {
    constructor(entity, damage) {
        this.entity = entity;
        this.damage = damage;
    }
}
exports.EntityHurtEvent = EntityHurtEvent;
class EntityHealEvent {
    constructor(entity, damage) {
        this.entity = entity;
        this.damage = damage;
    }
}
exports.EntityHealEvent = EntityHealEvent;
class EntitySneakEvent {
    constructor(entity, isSneaking) {
        this.entity = entity;
        this.isSneaking = isSneaking;
    }
}
exports.EntitySneakEvent = EntitySneakEvent;
class EntityCreatedEvent {
    constructor(entity) {
        this.entity = entity;
    }
}
exports.EntityCreatedEvent = EntityCreatedEvent;
class ActorDamageSource extends nativeclass_1.NativeClass {
}
class PlayerAttackEvent {
    constructor(player, victim) {
        this.player = player;
        this.victim = victim;
    }
}
exports.PlayerAttackEvent = PlayerAttackEvent;
class PlayerDropItemEvent {
    constructor(player, itemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }
}
exports.PlayerDropItemEvent = PlayerDropItemEvent;
class PlayerJoinEvent {
    constructor(player) {
        this.player = player;
    }
}
exports.PlayerJoinEvent = PlayerJoinEvent;
class PlayerPickupItemEvent {
    constructor(player, itemActor) {
        this.player = player;
        this.itemActor = itemActor;
    }
}
exports.PlayerPickupItemEvent = PlayerPickupItemEvent;
class PlayerCritEvent {
    constructor(player) {
        this.player = player;
    }
}
exports.PlayerCritEvent = PlayerCritEvent;
class PlayerUseItemEvent {
    constructor(player, useMethod, itemStack) {
        this.player = player;
        this.useMethod = useMethod;
        this.itemStack = itemStack;
    }
}
exports.PlayerUseItemEvent = PlayerUseItemEvent;
class PlayerJumpEvent {
    constructor(player) {
        this.player = player;
    }
}
exports.PlayerJumpEvent = PlayerJumpEvent;
// function onPlayerJump(player: Player):void {
//     const event = new PlayerJumpEvent(player);
//     console.log(player.getName());
//     // events.playerUseItem.fire(event);    Not work yet
//     return _onPlayerJump(event.player);
// }
// const _onPlayerJump = procHacker.hooking('Player::jumpFromGround', void_t, null, Player)(onPlayerJump);
function onPlayerUseItem(player, item, useMethod, v) {
    const event = new PlayerUseItemEvent(player, useMethod, item);
    event_1.events.playerUseItem.fire(event);
    return _onPlayerUseItem(event.player, event.itemStack, event.useMethod, v);
}
const _onPlayerUseItem = proc_1.procHacker.hooking('Player::useItem', nativetype_1.void_t, null, player_1.Player, inventory_1.ItemStack, nativetype_1.int32_t, nativetype_1.bool_t)(onPlayerUseItem);
function onPlayerCrit(player) {
    const event = new PlayerCritEvent(player);
    event_1.events.playerCrit.fire(event);
    return _onPlayerCrit(event.player);
}
const _onPlayerCrit = proc_1.procHacker.hooking('Player::_crit', nativetype_1.void_t, null, player_1.Player)(onPlayerCrit);
function onEntityHurt(entity, actorDamageSource, damage, v1, v2) {
    const event = new EntityHurtEvent(entity, damage);
    if (event_1.events.entityHurt.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        return _onEntityHurt(event.entity, actorDamageSource, event.damage, v1, v2);
    }
}
const _onEntityHurt = proc_1.procHacker.hooking("Actor::hurt", nativetype_1.bool_t, null, actor_1.Actor, core_1.VoidPointer, nativetype_1.int32_t, nativetype_1.bool_t, nativetype_1.bool_t)(onEntityHurt);
function onEntityHeal(attributeDelegate, oldHealth, newHealth, v) {
    if (oldHealth < newHealth) {
        const event = new EntityHurtEvent(attributeDelegate.getPointerAs(actor_1.Actor, 0x20), newHealth - oldHealth);
        if (event_1.events.entityHeal.fire(event) === common_1.CANCEL) {
            event.entity.setAttribute(attribute_1.AttributeId.Health, oldHealth);
            return false;
        }
        else {
            attributeDelegate.setPointer(event.entity, 0x20);
            return _onEntityHeal(attributeDelegate, oldHealth, newHealth, v);
        }
    }
    return _onEntityHeal(attributeDelegate, oldHealth, newHealth, v);
}
const _onEntityHeal = proc_1.procHacker.hooking("HealthAttributeDelegate::change", nativetype_1.bool_t, null, core_1.NativePointer, nativetype_1.float32_t, nativetype_1.float32_t, core_1.VoidPointer)(onEntityHeal);
function onEntitySneak(Script, entity, isSneaking) {
    const event = new EntitySneakEvent(entity, isSneaking);
    event_1.events.entitySneak.fire(event);
    return _onEntitySneak(Script, event.entity, event.isSneaking);
}
const _onEntitySneak = proc_1.procHacker.hooking('ScriptServerActorEventListener::onActorSneakChanged', nativetype_1.bool_t, null, packets_1.ScriptCustomEventPacket, actor_1.Actor, nativetype_1.bool_t)(onEntitySneak);
function onEntityCreated(Script, entity) {
    const event = new EntityCreatedEvent(entity);
    event_1.events.entityCreated.fire(event);
    return _onEntityCreated(Script, event.entity);
}
const _onEntityCreated = proc_1.procHacker.hooking('ScriptServerActorEventListener::onActorCreated', nativetype_1.bool_t, null, packets_1.ScriptCustomEventPacket, actor_1.Actor)(onEntityCreated);
// function onEntityDeath(Script:ScriptCustomEventPacket, entity:Actor, actorDamageSource:ActorDamageSource, ActorType:number):boolean {
//     const event = new EntityDeathEvent(entity, actorDamageSource, ActorType);
//     console.log(`${entity} ${actorDamageSource} ${ActorType}`)
//     events.entityCreated.fire(event);
//     return _onEntityDeath(Script, event.entity, event.damageSource, event.ActorType);
// }
// const _onEntityDeath = procHacker.hooking('ScriptServerActorEventListener::onActorDeath', bool_t, null, ScriptCustomEventPacket, Actor, ActorDamageSource, int32_t)(onEntityDeath);
function onPlayerAttack(player, victim) {
    const event = new PlayerAttackEvent(player, victim);
    if (event_1.events.playerAttack.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        return _onPlayerAttack(event.player, event.victim);
    }
}
const _onPlayerAttack = proc_1.procHacker.hooking("Player::attack", nativetype_1.bool_t, null, player_1.Player, actor_1.Actor)(onPlayerAttack);
function onPlayerDropItem(player, itemStack, v) {
    const event = new PlayerDropItemEvent(player, itemStack);
    if (event_1.events.playerDropItem.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        return _onPlayerDropItem(event.player, event.itemStack, v);
    }
}
const _onPlayerDropItem = proc_1.procHacker.hooking("Player::drop", nativetype_1.bool_t, null, player_1.Player, inventory_1.ItemStack, nativetype_1.bool_t)(onPlayerDropItem);
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.SetLocalPlayerAsInitialized).on((pk, ni) => {
    const event = new PlayerJoinEvent(ni.getActor());
    event_1.events.playerJoin.fire(event);
});
function onPlayerPickupItem(player, itemActor, v1, v2) {
    const event = new PlayerPickupItemEvent(player, itemActor);
    if (event_1.events.playerPickupItem.fire(event) === common_1.CANCEL) {
        return false;
    }
    else {
        return _onPlayerPickupItem(event.player, itemActor, v1, v2);
    }
}
const _onPlayerPickupItem = proc_1.procHacker.hooking("Player::take", nativetype_1.bool_t, null, player_1.Player, actor_1.Actor, nativetype_1.int32_t, nativetype_1.int32_t)(onPlayerPickupItem);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5ZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnRpdHlldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBcUM7QUFDckMsZ0RBQStDO0FBQy9DLGdEQUE2QztBQUM3QyxnREFBc0Q7QUFDdEQsNENBQXlEO0FBQ3pELDBDQUF1QztBQUN2QyxzQ0FBeUM7QUFDekMsc0NBQW1DO0FBQ25DLGtDQUFxRDtBQUNyRCxvQ0FBa0M7QUFDbEMsZ0RBQTZDO0FBQzdDLDhDQUFtRTtBQU9uRSxNQUFhLGVBQWU7SUFDeEIsWUFDVyxNQUFhLEVBQ2IsTUFBYztRQURkLFdBQU0sR0FBTixNQUFNLENBQU87UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRXpCLENBQUM7Q0FDSjtBQU5ELDBDQU1DO0FBTUQsTUFBYSxlQUFlO0lBQ3hCLFlBQ1csTUFBYSxFQUNYLE1BQWM7UUFEaEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNYLFdBQU0sR0FBTixNQUFNLENBQVE7SUFFM0IsQ0FBQztDQUNKO0FBTkQsMENBTUM7QUFNRCxNQUFhLGdCQUFnQjtJQUN6QixZQUNXLE1BQWEsRUFDYixVQUFtQjtRQURuQixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBUztJQUU5QixDQUFDO0NBQ0o7QUFORCw0Q0FNQztBQUtELE1BQWEsa0JBQWtCO0lBQzNCLFlBQ1csTUFBYTtRQUFiLFdBQU0sR0FBTixNQUFNLENBQU87SUFFeEIsQ0FBQztDQUNKO0FBTEQsZ0RBS0M7QUFFRCxNQUFNLGlCQUFrQixTQUFRLHlCQUFXO0NBQzFDO0FBb0JELE1BQWEsaUJBQWlCO0lBQzFCLFlBQ1csTUFBYyxFQUNkLE1BQWE7UUFEYixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBTztJQUV4QixDQUFDO0NBQ0o7QUFORCw4Q0FNQztBQU1ELE1BQWEsbUJBQW1CO0lBQzVCLFlBQ1csTUFBYyxFQUNk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