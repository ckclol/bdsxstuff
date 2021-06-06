"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_types;
(function (bedrock_types) {
    let MinecraftComponent;
    (function (MinecraftComponent) {
        /**
         * @deprecated use strings directly
         * This component represents the armor contents of an entity. The component contains an array of ItemStack JS API Objects representing each slot in the armor container. NOTE: Currently items and containers are read-only. Slots are ordered from head to feet.
         */
        MinecraftComponent["ArmorContainer"] = "minecraft:armor_container";
        /**
         * @deprecated use strings directly
         * This component controls the Attack Damage attribute from the entity. It allows you to change the current minimum and maximum values. Once the changes are applied, the current attack of the entity will be reset to the minimum specified. With the minimum and maximum changed to the values specified. Any buffs or debuffs will be left intact.
         */
        MinecraftComponent["Attack"] = "minecraft:attack";
        /**
         * @deprecated use strings directly
         * Controls the collision box of the entity. When changes to the component are applied the entity's collision box is immediately updated to reflect the new dimensions. WARNING: If the change of the collision box dimensions would cause the entity to be inside a block, the entity might become stuck there and start suffocating.
         */
        MinecraftComponent["CollisionBox"] = "minecraft:collision_box";
        /**
         * @deprecated use strings directly
         * Defines an array of damages and how the entity reacts to them - including whether the entity ignores that damage or not. Currently Minecraft triggers can't be properly serialized so any existing triggers will be completely replaced when applyComponentChanges().
         */
        MinecraftComponent["DamageSensor"] = "minecraft:damage_sensor";
        /**
         * @deprecated use strings directly
         * Defines the loot table the entity uses to defines its equipment. Once the changes are applied, the equipment is re-rolled and a new set of equipment is chosen for the entity.
         */
        MinecraftComponent["Equipment"] = "minecraft:equipment";
        /**
         * @deprecated use strings directly
         * Defines how many and what items the entity can be equipped with.
         */
        MinecraftComponent["Equippable"] = "minecraft:equippable";
        /**
         * @deprecated use strings directly
         * Controls the entity's explosion, timer until the explosion, and whether the timer is counting down or not.
         */
        MinecraftComponent["Explode"] = "minecraft:explode";
        /**
         * @deprecated use strings directly
         * This component represents the contents of an entity's hands. The component contains an array of ItemStack JS API Objects representing each slot in the hand container. NOTE: Currently items and containers are read-only. Slot 0 is main-hand Slot 1 is off-hand.
         */
        MinecraftComponent["HandContainer"] = "minecraft:hand_container";
        /**
         * @deprecated use strings directly
         * Defines how the entity can be healed by the player. This doesn't control how much health the entity can have; you must use the Health component for that instead.
         */
        MinecraftComponent["Healable"] = "minecraft:healable";
        /**
         * @deprecated use strings directly
         * Defines the current and maximum possible health of the entity. Upon applying the component back to the entity the health will change. If it reaches 0 or below the entity will die.
         */
        MinecraftComponent["Health"] = "minecraft:health";
        /**
         * @deprecated use strings directly
         * This component represents the hotbar contents of a player. The component contains an array of ItemStack JS API Objects representing each slot in the hotbar. NOTE: Currently items and containers are read-only. Slots are ordered left to right.
         */
        MinecraftComponent["HotbarContainer"] = "minecraft:hotbar_container";
        /**
         * @deprecated use strings directly
         * Defines the ways the player can interact with the entity to which this component is applied.
         */
        MinecraftComponent["Interact"] = "minecraft:interact";
        /**
         * @deprecated use strings directly
         * Defines the entity's inventory (size, restrictions, etc.). Currently this does not allow changing the entity's inventory contents.
         */
        MinecraftComponent["Inventory"] = "minecraft:inventory";
        /**
         * @deprecated use strings directly
         * This component represents the inventory contents of an entity. The component contains an array of ItemStack JS API Objects representing each slot in the inventory. NOTE: Currently items and containers are read-only.Slot 0-8 is the hotbar, 9-16 is the top row of the player's inventory, 17-24 is the middle row, 25-32 is the bottom row
         */
        MinecraftComponent["InventoryContainer"] = "minecraft:inventory_container";
        /**
         * @deprecated use strings directly
         * Makes the entity look at another entity. Once applied, if an entity of the specified type is nearby and can be targeted the entity will turn towards it.
         */
        MinecraftComponent["LookAt"] = "minecraft:lookat";
        /**
         * @deprecated use strings directly
         * Nameable component describes an entity's ability to be named using a nametag and whether the name shows up or not once applied. Additionally, scripting allows setting the name of the entity directly with the property 'name'.
         */
        MinecraftComponent["Nameable"] = "minecraft:nameable";
        /**
         * @deprecated use strings directly
         * This component allows you to control an entity's current position in the world. Once applied the entity will be teleported to the new position specified.
         */
        MinecraftComponent["Position"] = "minecraft:position";
        /**
         * @deprecated use strings directly
         * This component allows you to control an entity's current rotation in the world as well as the entity's head rotation. Once applied, the entity will be rotated as specified.
         */
        MinecraftComponent["Rotation"] = "minecraft:rotation";
        /**
         * @deprecated use strings directly
         * Defines the entity's ranged attacks. This doesn't allow the entity to use a ranged attack: it only defines what kind of projectile it shoots.
         */
        MinecraftComponent["Shooter"] = "minecraft:shooter";
        /**
         * @deprecated use strings directly
         * Controls the entity's ability to spawn an entity or an item. This is similar to the chicken's ability to lay eggs after a set amount of time.
         */
        MinecraftComponent["SpawnEntity"] = "minecraft:spawn_entity";
        /**
         * @deprecated use strings directly
         * This controls the entity's ability to teleport itself (similar to the Enderman). If you wish to teleport the entity once use the Position component instead.
         */
        MinecraftComponent["Teleport"] = "minecraft:teleport";
        /**
         * @deprecated use strings directly
         * The tick world component is a read-only component that allows users to access the ticking areas on entities as well as the ticking area's data.
         */
        MinecraftComponent["TickWorld"] = "minecraft:tick_world";
    })(MinecraftComponent = bedrock_types.MinecraftComponent || (bedrock_types.MinecraftComponent = {}));
    let MinecraftDimension;
    (function (MinecraftDimension) {
        /**
         * @deprecated use strings directly
         */
        MinecraftDimension["Overworld"] = "overworld";
        /**
         * @deprecated use strings directly
         */
        MinecraftDimension["Nether"] = "nether";
        /**
         * @deprecated use strings directly
         */
        MinecraftDimension["End"] = "the end";
    })(MinecraftDimension = bedrock_types.MinecraftDimension || (bedrock_types.MinecraftDimension = {}));
    let MinecraftParticleEffect;
    (function (MinecraftParticleEffect) {
        /**
         * @deprecated use strings directly
         * Beacon effects
         */
        MinecraftParticleEffect["MobSpellAmbient"] = "minecraft:mobspellambient";
        /**
         * @deprecated use strings directly
         * Attacking a villager in a village
         */
        MinecraftParticleEffect["VillagerAngry"] = "minecraft:villagerangry";
        /**
         * @deprecated use strings directly
         * Breaking blocks, sprinting, iron golems walking
         */
        MinecraftParticleEffect["BlockBreak"] = "minecraft:blockbreak";
        /**
         * @deprecated use strings directly
         * Breaking armor stands, falling
         */
        MinecraftParticleEffect["BlockDust"] = "minecraft:blockdust";
        /**
         * @deprecated use strings directly
         * Entities in water, guardian laser beams, fishing
         */
        MinecraftParticleEffect["Bubble"] = "minecraft:bubble";
        /**
         * @deprecated use strings directly
         * After jumping into water while on fire
         */
        MinecraftParticleEffect["Evaporation"] = "minecraft:evaporation";
        /**
         * @deprecated use strings directly
         * Critical hits, bows, evoker fangs
         */
        MinecraftParticleEffect["CriticalHit"] = "minecraft:crit";
        /**
         * @deprecated use strings directly
         * 	An ender dragon's breath and dragon fireballs
         */
        MinecraftParticleEffect["DragonBreath"] = "minecraft:dragonbreath";
        /**
         * @deprecated use strings directly
         * Dripping lava through blocks
         */
        MinecraftParticleEffect["DripLava"] = "minecraft:driplava";
        /**
         * @deprecated use strings directly
         * 	Dripping water through blocks, wet sponges, leaves when raining
         */
        MinecraftParticleEffect["DripWater"] = "minecraft:dripwater";
        /**
         * @deprecated use strings directly
         * Redstone ore, powered redstone dust, redstone torches, powered redstone repeaters
         */
        MinecraftParticleEffect["RedstoneDust"] = "minecraft:reddust";
        /**
         * @deprecated use strings directly
         * Splash potions, lingering potions, bottles o' enchanting, evokers.
         */
        MinecraftParticleEffect["Spell"] = "minecraft:spell";
        /**
         * @deprecated use strings directly
         * Elder Gardians
         * note: wiki has a question mark
         */
        MinecraftParticleEffect["MobAppearance"] = "minecraft:mobappearance";
        /**
         * @deprecated use strings directly
         * From bookshelves near an enchanting table.
         */
        MinecraftParticleEffect["EnchantingTable"] = "minecraft:enchantingtable";
        /**
         * @deprecated use strings directly
         * End rods, shulker bullets.
         */
        MinecraftParticleEffect["EndRod"] = "minecraft:endrod";
        /**
         * @deprecated use strings directly
         * 	Status effects, lingering potions, tipped arrows, trading, withered armor (linger potion particles decrease when the "minimal" particle setting is used).
         */
        MinecraftParticleEffect["MobSpell"] = "minecraft:mobspell";
        /**
         * @deprecated use strings directly
         * Explosions, ghast fireballs, wither skulls, ender dragon death, shearing mooshrooms.
         */
        MinecraftParticleEffect["LargeExplosion"] = "minecraft:largeexplode";
        /**
         * @deprecated use strings directly
         * Floating sand, gravel, concrete powder, and anvils.
         */
        MinecraftParticleEffect["FallingDust"] = "minecraft:fallingdust";
        /**
         * @deprecated use strings directly
         * Firework rocket trail and explosion (trail is not shown when the "minimal" particle setting is used), when dolphins track shipwrecks and underwater ruins.
         */
        MinecraftParticleEffect["FireworksSpark"] = "minecraft:fireworksspark";
        /**
         * @deprecated use strings directly
         * Fishing
         */
        MinecraftParticleEffect["WaterWake"] = "minecraft:waterwake";
        /**
         * @deprecated use strings directly
         * 	Torches, furnaces, magma cubes, spawners.
         */
        MinecraftParticleEffect["Flame"] = "minecraft:flame";
        /**
         * @deprecated use strings directly
         * 	Bone mealing a crop, trading with villagers, feeding baby animals, walking or jumping on turtle eggs.
         */
        MinecraftParticleEffect["VillagerHappy"] = "minecraft:villagerhappy";
        /**
         * @deprecated use strings directly
         * Breeding and taming animals.
         */
        MinecraftParticleEffect["Heart"] = "minecraft:heart";
        /**
         * @deprecated use strings directly
         * Explosions, ender dragon death.
         */
        MinecraftParticleEffect["HugeExplosion"] = "minecraft:hugeexplosion";
        /**
         * @deprecated use strings directly
         * Instant health/damage splash and lingering potions, spectral arrows.
         */
        MinecraftParticleEffect["MobSpellInstantaneous"] = "minecraft:mobspellinstantaneous";
        /**
         * @deprecated use strings directly
         * 	Eating, thrown eggs, splash potions, eyes of ender, breaking tools.
         */
        MinecraftParticleEffect["IconCrack"] = "minecraft:iconcrack";
        /**
         * @deprecated use strings directly
         * Jumping slimes.
         */
        MinecraftParticleEffect["Slime"] = "minecraft:slime";
        /**
         * @deprecated use strings directly
         * Thrown snowballs, creating withers, creating iron golems.
         */
        MinecraftParticleEffect["SnowballPoof"] = "minecraft:snowballpoof";
        /**
         * @deprecated use strings directly
         * Fire, minecart with furnace, blazes, water flowing into lava, lava flowing into water.
         */
        MinecraftParticleEffect["LargeSmoke"] = "minecraft:largesmoke";
        /**
         * @deprecated use strings directly
         * Lava
         */
        MinecraftParticleEffect["Lava"] = "minecraft:lava";
        /**
         * @deprecated use strings directly
         * Burning entities, blazes for example.
         */
        MinecraftParticleEffect["MobFlame"] = "minecraft:mobflame";
        /**
         * @deprecated use strings directly
         * Mycelium blocks.
         */
        MinecraftParticleEffect["TownAura"] = "minecraft:townaura";
        /**
         * @deprecated use strings directly
         * Activated Conduits.
         */
        MinecraftParticleEffect["Nautilus"] = "minecraft:nautilus";
        /**
         * @deprecated use strings directly
         * Emitted from note blocks and jukeboxes
         */
        MinecraftParticleEffect["Note"] = "minecraft:note";
        /**
         * @deprecated use strings directly
         * Explosions, death of mobs, mobs spawned from a spawner, silverfish infesting blocks.
         */
        MinecraftParticleEffect["Explode"] = "minecraft:explode";
        /**
         * @deprecated use strings directly
         * 	Nether portals, endermen, endermites, ender pearls, eyes of ender, ender chests, dragon eggs, teleporting from eating chorus fruits, end gateway portals.
         */
        MinecraftParticleEffect["Portal"] = "minecraft:portal";
        /**
         * @deprecated use strings directly
         * Rain
         */
        MinecraftParticleEffect["RainSplash"] = "minecraft:rainsplash";
        /**
         * @deprecated use strings directly
         * 	Torches, primed TNT, droppers, dispensers, end portals, brewing stands, spawners, furnaces, ghast fireballs, wither skulls, taming, withers, lava (when raining), placing an eye of ender in an end portal frame, redstone torches burning out.
         */
        MinecraftParticleEffect["Smoke"] = "minecraft:smoke";
        /**
         * @deprecated use strings directly
         * Entities in water, wolves shaking off after swimming, boats.
         */
        MinecraftParticleEffect["WaterSplash"] = "minecraft:watersplash";
        /**
         * @deprecated use strings directly
         * Produced by squids when attacked
         */
        MinecraftParticleEffect["Ink"] = "minecraft:ink";
        /**
         * @deprecated use strings directly
         * ?
         */
        MinecraftParticleEffect["Terrain"] = "minecraft:terrain";
        /**
         * @deprecated use strings directly
         * Activated totem of undying.
         */
        MinecraftParticleEffect["Totem"] = "minecraft:totem";
        /**
         * @deprecated use strings directly
         * ?
         */
        MinecraftParticleEffect["TrackingEmitter"] = "minecraft:trackingemitter";
        /**
         * @deprecated use strings directly
         * Witches.
         */
        MinecraftParticleEffect["WitchSpell"] = "minecraft:witchspell";
    })(MinecraftParticleEffect = bedrock_types.MinecraftParticleEffect || (bedrock_types.MinecraftParticleEffect = {}));
    let ReceiveFromMinecraftServer;
    (function (ReceiveFromMinecraftServer) {
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a player starts to destroy a block.
         */
        ReceiveFromMinecraftServer["BlockDestructionStarted"] = "minecraft:block_destruction_started";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a player stops destroying a block.
         */
        ReceiveFromMinecraftServer["BlockDestructionStopped"] = "minecraft:block_destruction_stopped";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a player interacts with a block.
         */
        ReceiveFromMinecraftServer["BlockInteractedWith"] = "minecraft:block_interacted_with";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity acquires an item.
         */
        ReceiveFromMinecraftServer["EntityAcquiredItem"] = "minecraft:entity_acquired_item";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity changes the item carried in their hand.
         */
        ReceiveFromMinecraftServer["EntityCarriedItemChanged"] = "minecraft:entity_carried_item_changed";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity is added to the world.
         */
        ReceiveFromMinecraftServer["EntityCreated"] = "minecraft:entity_created";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity dies. This won't be triggered when an entity is removed (such as when using destroyEntity).
         */
        ReceiveFromMinecraftServer["EntityDeath"] = "minecraft:entity_death";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity drops an item.
         */
        ReceiveFromMinecraftServer["EntityDroppedItem"] = "minecraft:entity_dropped_item";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity equips an item in their armor slots.
         */
        ReceiveFromMinecraftServer["EntityEquippedArmor"] = "minecraft:entity_equipped_armor";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity becomes a rider on another entity.
         */
        ReceiveFromMinecraftServer["EntityStartRiding"] = "minecraft:entity_start_riding";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity stops riding another entity.
         */
        ReceiveFromMinecraftServer["EntityStopRiding"] = "minecraft:entity_stop_riding";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity is ticked. This event will not fire when a player is ticked.
         */
        ReceiveFromMinecraftServer["EntityTick"] = "minecraft:entity_tick";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever an entity uses an item.
         */
        ReceiveFromMinecraftServer["EntityUseItem"] = "minecraft:entity_use_item";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a piston moves a block.
         */
        ReceiveFromMinecraftServer["PistonMovedBlock"] = "minecraft:piston_moved_block";
        /**
         * @deprecated use strings directly
         * This event is used to play a sound effect. Currently, sounds can only be played at a fixed position in the world. Global sounds and sounds played by an entity will be supported in a later update.
         */
        ReceiveFromMinecraftServer["PlaySound"] = "minecraft:play_sound";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a player attacks an entity.
         */
        ReceiveFromMinecraftServer["PlayerAttackedEntity"] = "minecraft:player_attacked_entity";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a player destroys a block.
         */
        ReceiveFromMinecraftServer["PlayerDestroyedBlock"] = "minecraft:player_destroyed_block";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever a player places a block.
         */
        ReceiveFromMinecraftServer["PlayerPlacedBlock"] = "minecraft:player_placed_block";
        /**
         * @deprecated use strings directly
         * This event is triggered whenever the weather changes. It contains information about the weather it is changing to.
         */
        ReceiveFromMinecraftServer["WeatherChanged"] = "minecraft:weather_changed";
    })(ReceiveFromMinecraftServer = bedrock_types.ReceiveFromMinecraftServer || (bedrock_types.ReceiveFromMinecraftServer = {}));
    let SendToMinecraftServer;
    (function (SendToMinecraftServer) {
        /**
         * @deprecated use strings directly
         * This event is used to send a chat message from the server to the players. The event data is the message being sent as a string. Special formatting is supported the same way it would be if a player was sending the message.
         */
        SendToMinecraftServer["DisplayChat"] = "minecraft:display_chat_event";
        /**
         * @deprecated use strings directly
         * This event is used to execute a slash command on the server with the World Owner permission level. The event data contains the slash command as a string. The slash command will be processed and will run after the event is sent.
         */
        SendToMinecraftServer["ExecuteCommand"] = "minecraft:execute_command";
        /**
         * @deprecated use strings directly
         * This event is used to play a sound effect. Currently, sounds can only be played at a fixed position in the world. Global sounds and sounds played by an entity will be supported in a later update.
         */
        SendToMinecraftServer["PlaySound"] = "minecraft:play_sound";
        /**
         * @deprecated use strings directly
         * This event is used to turn various levels of logging on and off for server scripts. Note that turning logging on/off is not limited to the script that broadcasted the event. It will affect ALL server scripts including those in other Behavior Packs that are applied to the world. See the Debugging section for more information on logging.
         */
        SendToMinecraftServer["ScriptLoggerConfig"] = "minecraft:script_logger_config";
        /**
         * @deprecated use strings directly
         * This event is used to create a particle effect that will follow an entity around. This particle effect is visible to all players. Any effect defined in a JSON file (both in your resource pack and in Minecraft) can be used here. MoLang variables defined in the JSON of the effect can then be used to control that effect by changing them in the entity to which it is attached.
         */
        SendToMinecraftServer["SpawnParticleAttachedEntity"] = "minecraft:spawn_particle_attached_entity";
        /**
         * @deprecated use strings directly
         * This event is used to create a static particle effect in the world. This particle effect is visible to all players. Any effect defined in a JSON file (both in your resource pack and in Minecraft) can be used here. Once the effect is spawned you won't be able to control it further.
         */
        SendToMinecraftServer["SpawnParticleInWorld"] = "minecraft:spawn_particle_in_world";
    })(SendToMinecraftServer = bedrock_types.SendToMinecraftServer || (bedrock_types.SendToMinecraftServer = {}));
})(bedrock_types || (bedrock_types = {}));
global.MinecraftComponent = bedrock_types.MinecraftComponent;
global.MinecraftDimension = bedrock_types.MinecraftDimension;
global.MinecraftParticleEffect = bedrock_types.MinecraftParticleEffect;
global.ReceiveFromMinecraftServer = bedrock_types.ReceiveFromMinecraftServer;
global.SendToMinecraftServer = bedrock_types.SendToMinecraftServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bWZpbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVudW1maWxsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFVLGFBQWEsQ0FvZXRCO0FBcGVELFdBQVUsYUFBYTtJQUVuQixJQUFZLGtCQStHWDtJQS9HRCxXQUFZLGtCQUFrQjtRQUMxQjs7O1dBR0c7UUFDSCxrRUFBNEMsQ0FBQTtRQUM1Qzs7O1dBR0c7UUFDSCxpREFBMkIsQ0FBQTtRQUMzQjs7O1dBR0c7UUFDSCw4REFBd0MsQ0FBQTtRQUN4Qzs7O1dBR0c7UUFDSCw4REFBd0MsQ0FBQTtRQUN4Qzs7O1dBR0c7UUFDSCx1REFBaUMsQ0FBQTtRQUNqQzs7O1dBR0c7UUFDSCx5REFBbUMsQ0FBQTtRQUNuQzs7O1dBR0c7UUFDSCxtREFBNkIsQ0FBQTtRQUM3Qjs7O1dBR0c7UUFDSCxnRUFBMEMsQ0FBQTtRQUMxQzs7O1dBR0c7UUFDSCxxREFBK0IsQ0FBQTtRQUMvQjs7O1dBR0c7UUFDSCxpREFBMkIsQ0FBQTtRQUMzQjs7O1dBR0c7UUFDSCxvRUFBOEMsQ0FBQTtRQUM5Qzs7O1dBR0c7UUFDSCxxREFBK0IsQ0FBQTtRQUMvQjs7O1dBR0c7UUFDSCx1REFBaUMsQ0FBQTtRQUNqQzs7O1dBR0c7UUFDSCwwRUFBb0QsQ0FBQTtRQUNwRDs7O1dBR0c7UUFDSCxpREFBMkIsQ0FBQTtRQUMzQjs7O1dBR0c7UUFDSCxxREFBK0IsQ0FBQTtRQUMvQjs7O1dBR0c7UUFDSCxxREFBK0IsQ0FBQTtRQUMvQjs7O1dBR0c7UUFDSCxxREFBK0IsQ0FBQTtRQUMvQjs7O1dBR0c7UUFDSCxtREFBNkIsQ0FBQTtRQUM3Qjs7O1dBR0c7UUFDSCw0REFBc0MsQ0FBQTtRQUN0Qzs7O1dBR0c7UUFDSCxxREFBK0IsQ0FBQTtRQUMvQjs7O1dBR0c7UUFDSCx3REFBa0MsQ0FBQTtJQUN0QyxDQUFDLEVBL0dXLGtCQUFrQixHQUFsQixnQ0FBa0IsS0FBbEIsZ0NBQWtCLFFBK0c3QjtJQUVE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