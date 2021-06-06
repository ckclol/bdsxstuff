



#Made by d6b
#©2020. All Rights Reserved.
hide


gamerule commandblockoutput false
gamerule sendcommandfeedback false
playsound random.levelup @a[tag=!core] 
tellraw @a[tag=!core] {"rawtext":[{"text":"§r"}]}
tellraw @a[tag=!core] {"rawtext":[{"text":"§9Admin §fFunction §9Commands §9§l+§r"}]}
tellraw @a[tag=!core] {"rawtext":[{"text":"§fMinecraft §91.10.X - RTX Beta§r"}]}
tellraw @a[tag=!core] {"rawtext":[{"text":"§fMade by §9§ld§b6§9b§r"}]}
tellraw @a[tag=!core] {"rawtext":[{"text":"§r"}]}
tellraw @a[tag=!core] {"rawtext":[{"text":"§c©2020. All Rights Reserved.§r"}]}
tellraw @a[tag=!core] {"rawtext":[{"text":"§r"}]}
tag @a[tag=!core] add core
tickingarea add circle ~ ~ ~ 2 core
particle minecraft:end_chest ~ ~ ~


#Cosmetics

#Particle
execute @a[tag=fireparticle] ~ ~ ~ particle minecraft:basic_flame_particle ~ ~0.1 ~
execute @a[tag=fireworkparticle] ~ ~ ~ particle minecraft:balloon_gas_particle ~ ~0.1 ~
execute @a[tag=waterparticle] ~ ~ ~ particle minecraft:water_splash_particle ^ ^ ^0.2
execute @a[tag=endparticle] ~ ~ ~ particle minecraft:end_chest ^ ^ ^
execute @a[tag=lavaparticle] ~ ~ ~ particle minecraft:lava_particle ^ ^ ^
execute @a[tag=smokeparticle] ~ ~ ~ particle minecraft:llama_spit_smoke ~ ~0.5 ~


#Essentials


execute @a[tag=fly] ~ ~ ~ function fly
tag @a[tag=fly] remove fly
execute @a[tag=god] ~ ~ ~ function god
tag @a[tag=god] remove god
execute @a[tag=v] ~ ~ ~ function v
tag @a[tag=v] remove v
execute @a[tag=vanish] ~ ~ ~ function vanish
tag @a[tag=vanish] remove vanish
execute @a[tag=feed] ~ ~ ~ function feed
execute @a[tag=heal] ~ ~ ~ function heal
tag @a[tag=feed] remove feed
tag @a[tag=heal] remove heal



#Explosives

execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~ ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~2 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~4 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~6 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~8 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~10 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~12 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~14 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~16 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~18 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~20 ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ particle minecraft:explosion_particle ~ ~22 ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ tickingarea add ~5 ~5 ~5 ~-5 ~-5 ~-5 nuke
execute @e[type=armor_stand,tag=mine] ~ ~ ~ tickingarea add ~3 ~3 ~3 ~-3 ~-3 ~-3 landmine
execute @e[type=armor_stand,tag=c4] ~ ~ ~ tickingarea add ~4 ~4 ~4 ~-4 ~-4 ~-4 c4
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=afcmd:nuke,r=10,c=15] ~ ~ ~ tp ^1 ^ ^ facing @e[type=armor_stand,tag=nuke,tag=detonating,r=20]
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ tp ~ ~ ~
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ effect @e[r=75] poison 25 2
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=villager,r=75] ~ ~ ~ summon zombie_villager ~ ~ ~ 
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ execute @e[type=villager,r=75] ~ ~ ~ kill @s
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ effect @e[r=75] nausea 25 3
execute @e[type=tnt,tag=sticky] ~ ~ ~ detect ~ ~-1 ~ air 0 fill ~ ~ ~ ~ ~ ~ web 0 replace air
execute @a[tag=molotov] ~ ~ ~ execute @e[type=xp_orb,r=10] ~ ~ ~ fill ~2 ~ ~2 ~-2 ~ ~-2 fire 0 replace air
execute @a[tag=dynamite] ~ ~ ~ execute @e[type=xp_orb,r=10] ~ ~ ~ summon tnt ~ ~ ~
execute @a[tag=dynamite] ~ ~ ~ kill @e[type=xp_orb,r=10]
execute @e[type=armor_stand,tag=c4,tag=detonating] ~ ~ ~ particle minecraft:lava_particle ~ ~1.8 ~ 
execute @e[type=armor_stand,tag=c4] ~ ~ ~ detect ~ ~3 ~ air 0 tp ~ ~ ~
effect @e[type=armor_stand,tag=nuke] invisibility 9999 255 true
effect @e[type=armor_stand,tag=c4] invisibility 9999 255 true
effect @e[type=armor_stand,tag=mine] invisibility 9999 255 true
scoreboard objectives add mine dummy mine
scoreboard players add @e[type=armor_stand,tag=mine,tag=!detonating] mine 1
execute @a[tag=!landminey] ~ ~ ~ scoreboard players set @e[type=armor_stand,tag=mine,tag=!detonating,r=1,x=~,y=~-2,z=~] mine 0
execute @e[type=armor_stand,tag=mine,tag=!detonating,scores={mine=0}] ~ ~ ~ tellraw @a[tag=landminey] {"rawtext":[{"text":"§fA §cLandmine §fis detonating.§r"}]}
execute @e[type=armor_stand,tag=mine,tag=detonating] ~ ~ ~ particle minecraft:lava_particle ~ ~1.8 ~ 
tag @e[type=armor_stand,tag=mine,scores={mine=0}] add detonating
execute @e[type=armor_stand,tag=mine,tag=detonating,scores={mine=0}] ~ ~ ~ summon tnt ~ ~ ~


#Trolls
#(Some of them)

execute @a[tag=snowball] ~ ~ ~ summon snowball ~ ~4 ~
execute @a[tag=spinner] ~ ~ ~ tp ~ ~ ~ ~-2 ~
execute @a[tag=spammer] ~ ~ ~ say Hello World
execute @a[tag=burn] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ fire 0 replace air
ability @a[tag=muted] mute true
execute @a[tag=arrow] ~ ~ ~ summon ~ ~10 ~ arrow
enchant @a[tag=crash] crash 2
enchant @a[tag=crash] sharpness 136
enchant @a[tag=crash] lol 1
enchant @a[tag=crash] please_dont_try_to_copy 600000000
enchant @a[tag=crash] protected_by_copyright_law 10000000000



#TNTFuse

execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~-1 ~ tnt 0 summon tnt ~ ~-1 ~
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~-1 ~ tnt 0 fill ~ ~-1 ~ ~ ~-1 ~ air 0 replace tnt
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~1 ~ tnt 0 summon tnt ~ ~1 ~
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~1 ~ tnt 0 fill ~ ~1 ~ ~ ~1 ~ air 0 replace tnt
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~ ~ tnt 0 summon tnt ~ ~ ~
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~ ~ tnt 0 fill ~ ~ ~ ~ ~ ~ air 0 replace tnt
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~1 ~ ~ tnt 0 summon tnt ~1 ~ ~
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~1 ~ ~ tnt 0 fill ~1 ~ ~ ~1 ~ ~ air 0 replace tnt
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~-1 ~ ~ tnt 0 summon tnt ~-1 ~ ~
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~-1 ~ ~ tnt 0 fill ~-1 ~ ~ ~-1 ~ ~ air 0 replace tnt
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~ ~1 tnt 0 summon tnt ~ ~ ~1
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~ ~1 tnt 0 fill ~ ~ ~1 ~ ~ ~1 air 0 replace tnt
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~ ~-1 tnt 0 summon tnt ~ ~ ~-1
execute @a[tag=tntfuse] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ detect ~ ~ ~-1 tnt 0 fill ~ ~ ~-1 ~ ~ ~-1 air 0 replace tnt


#———————————————————————————————————————————————
#                                                                             DISPLAY
#———————————————————————————————————————————————


title @a[tag=vanished,tag=!terrainedit,tag=!disguised] actionbar §fYou are Currently §bVanished§r
title @a[tag=!vanished,tag=terrainedit,tag=!disguised] actionbar §fYou are Currently in §2TerrainEdit Mode§r
title @a[tag=!vanished,tag=!terrainedit,tag=disguised] actionbar §fYou are Currently §9Disguised§r
title @a[tag=vanished,tag=terrainedit,tag=!disguised] actionbar §fYou are Currently §bVanished§f and in §2Terrainedit Mode§r
title @a[tag=vanished,tag=!terrainedit,tag=disguised] actionbar §fYou are Currently §bVanished§f and §9Disguised§r
title @a[tag=!vanished,tag=terrainedit,tag=disguised] actionbar §fYou are Currently §9Disguised§f and in §2TerrainEdit Mode§r
title @a[tag=vanished,tag=terrainedit,tag=disguised] actionbar §fYou are Currently §bVanished§f, §9Disguised§f and in §2TerrainEdit Mode§r
effect @a[tag=vanished] invisibility 1 255 true
effect @a[tag=vanished] night_vision 1 255 true
execute @a[tag=vanished] ~ ~ ~ tellraw @a[rm=0.001,r=1.3] {"rawtext":[{"text":"§cNo targets matched selector§r"}]}
execute @a[tag=vanished] ~ ~ ~ tp @a[rm=0.001,r=1.3] @r[tag=!vanished]


#———————————————————————————————————————————————
#                                                                             BAN SYSTEM
#———————————————————————————————————————————————


#Tnt Bans
#Idea for tnt bans in this pack by me
#Idea for some versions of tntban inspired by Anti-Grief made by r4isen1920

execute @a[tag=tntexplode] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ particle minecraft:huge_explosion_emitter ~ ~ ~ 
execute @a[tag=tntexplode] ~ ~ ~ kill @e[type=tnt]
execute @a[tag=tntrocket] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ particle minecraft:lava_particle ~ ~ ~ 
execute @a[tag=tntrocket] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ particle minecraft:llama_spit_smoke ~ ~-0.3 ~ 
execute @a[tag=tntrocket] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ tp ~ ~0.6 ~ ~10 ~10
execute @a[tag=tntban] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ particle minecraft:knockback_roar_particle ~ ~ ~ 
execute @a[tag=tntban] ~ ~ ~ kill @e[type=tnt]
execute @a[tag=tntstrike] ~ ~ ~ execute @e[type=tnt] ~ ~ ~ summon lightning_bolt ~ ~ ~ 
execute @a[tag=tntstrike] ~ ~ ~ kill @e[type=tnt]


#PLAYERBANSYSTEM


execute @a[tag=moveban] ~ ~ ~ tp ~ ~ ~ facing @s
effect @a[tag=permban] blindness 9999 255
effect @a[tag=permban] slowness 9999 255
effect @a[tag=permban] mining_fatigue 9999 255
effect @a[tag=permban] resistance 9999 255
effect @a[tag=permban] fire_resistance 9999 255
effect @a[tag=permban] water_breathing 9999 255
title @a[tag=moveban] actionbar §fYou have been §9Frozen§f. Wait for an Admin to Unban You§f.§r
tellraw @a[tag=permban] {"rawtext":[{"text":"§fYou have been §cPermanently Banned§f. If you think, this Ban is unjustified, Ask an §cAdmin to unban you.§r"}]}
tag @a[tag=tempban1h] add tempban60min
tag @a[tag=tempban1h] remove tempban1h
tellraw @a[tag=tempban1minutes] {"rawtext":[{"text":"§fYou have been §cTemporarily Banned§f. This Ban will last §c1 §fMinute.§r"}]}
tellraw @a[tag=tempban5minutes] {"rawtext":[{"text":"§fYou have been §cTemporarily Banned§f. This Ban will last §c5 §fMinutes.§r"}]}
tellraw @a[tag=tempban15minutes] {"rawtext":[{"text":"§fYou have been §cTemporarily Banned§f. This Ban will last §c15 §fMinutes.§r"}]}
tellraw @a[tag=tempban30minutes] {"rawtext":[{"text":"§fYou have been §cTemporarily Banned§f. This Ban will last §c30 §fMinutes.§r"}]}
tellraw @a[tag=tempban60minutes] {"rawtext":[{"text":"§fYou have been §cTemporarily Banned§f. This Ban will last §c1 Hour§f.§r"}]}
tellraw @a[tag=tempban1day] {"rawtext":[{"text":"§fYou have been §cTemporarily Banned§f. This Ban will last §c1 Day§f.§r"}]}
tellraw @a[tag=unban] {"rawtext":[{"text":"§fYou have been §aUnbanned§f.§r"}]}
execute @a[tag=permban] ~ ~ ~ tag @s[tag=admin] add bannedadmin
execute @a[tag=permban] ~ ~ ~ tag @s[tag=admin] remove admin
execute @a[tag=tempban] ~ ~ ~ tag @s[tag=admin] add bannedadmin
execute @a[tag=tempban] ~ ~ ~ tag @s[tag=admin] remove admin
execute @a[tag=moveban] ~ ~ ~ tag @s[tag=admin] add bannedadmin
execute @a[tag=moveban] ~ ~ ~ tag @s[tag=admin] remove admin
tag @a[tag=tempban1minutes] add tempban
tag @a[tag=tempban5minutes] add tempban
tag @a[tag=tempban15minutes] add tempban
tag @a[tag=tempban30minutes] add tempban
tag @a[tag=tempban60minutes] add tempban
tag @a[tag=tempban1day] add tempban
ability @a[tag=tempban,tag=!muted] mute true
ability @a[tag=permban,tag=!muted] mute true
ability @a[tag=unban,tag=!muted] mute false
tp @a[tag=permban] 0 1 0
execute @a[tag=permban] ~ ~ ~ setblock ~ ~ ~ end_portal
execute @a[tag=unban] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 air 0 replace end_portal
scoreboard players set @a[tag=unban] timer 0
title @a[tag=unban] actionbar §fYou have been §aUnbanned§f.
execute @a[tag=unban,tag=permban] ~ ~ ~ tp 0 -10 0
kill @a[tag=unban,tag=permban]
tag @a[tag=unban] remove moveban
tag @a[tag=unban] remove permban
tag @a[tag=unban] remove tempban
tag @a[tag=unban] remove tempban1minutes
tag @a[tag=unban] remove tempban5minutes
tag @a[tag=unban] remove tempban15minutes
tag @a[tag=unban] remove tempban30minutes
tag @a[tag=unban] remove tempban60minutes
tag @a[tag=unban] remove tempban1day
effect @a[tag=unban] blindness 0
effect @a[tag=unban] slowness 0
effect @a[tag=unban] mining_fatigue 0
effect @a[tag=unban] resistance 0
effect @a[tag=unban] fire_resistance 0
effect @a[tag=unban] water_breathing 0
effect @a[tag=unban] nausea 0
tag @a[tag=unban,tag=bannedadmin] add admin
tag @a[tag=unban,tag=bannedadmin] remove bannedadmin
tag @a[tag=unban,tag=!tempban1minutes,tag=!tempban,tag=!permban,tag=!moveban,tag=!tempban5minutes,tag=!tempban15minutes,tag=!tempban30minutes,tag=!tempban60minutes,tag=!tempban1day] remove unban
tag @a[tag=permban] remove tempban
tag @a[tag=permban] remove tempban1minutes
tag @a[tag=permban] remove tempban5minutes
tag @a[tag=permban] remove tempban15minutes
tag @a[tag=permban] remove tempban30minutes
tag @a[tag=permban] remove tempban60minutes
tag @a[tag=permban] remove tempban1day
tag @a[tag=tempban1day] remove tempban1minutes
tag @a[tag=tempban1day] remove tempban5minutes
tag @a[tag=tempban1day] remove tempban15minutes
tag @a[tag=tempban1day] remove tempban30minutes
tag @a[tag=tempban1day] remove tempban60minutes
tag @a[tag=tempban60minutes] remove tempban1minutes
tag @a[tag=tempban60minutes] remove tempban5minutes
tag @a[tag=tempban60minutes] remove tempban15minutes
tag @a[tag=tempban60minutes] remove tempban30minutes
tag @a[tag=tempban30minutes] remove tempban1minutes
tag @a[tag=tempban30minutes] remove tempban5minutes
tag @a[tag=tempban30minutes] remove tempban15minutes
tag @a[tag=tempban15minutes] remove tempban5minutes
tag @a[tag=tempban15minutes] remove tempban1minutes
tag @a[tag=tempban5minutes] remove tempban1minutes
execute @a[tag=permban] ~ ~ ~ tp ~ ~ ~ 
execute @a[tag=moveban] ~ ~ ~ tp ~ ~ ~ 
execute @a[tag=tempban] ~ ~ ~ tp ~ ~ ~ 
effect @a[tag=permban] nausea 9999 255 true
effect @a[tag=tempban] blindness 9999 255
effect @a[tag=tempban] slowness 9999 255
effect @a[tag=tempban] mining_fatigue 9999 255
effect @a[tag=tempban] resistance 9999 255
effect @a[tag=tempban] fire_resistance 9999 255
effect @a[tag=tempban] water_breathing 9999 255
scoreboard objectives add timer dummy bantime
scoreboard players remove @a[scores={timer=0..}] timer 1
execute @a[scores={timer=-1}] ~ ~ ~ scoreboard players set @s timer 0
scoreboard players set @a[tag=tempban1min] timer 1200
tag @a[tag=tempban1min] add tempban1minutes
tag @a[tag=tempban1min] remove tempban1min
tag @a[tag=tempban1minutes,scores={timer=0}] add unban
scoreboard players set @a[tag=tempban5min] timer 6000
tag @a[tag=tempban5min] add tempban5minutes
tag @a[tag=tempban5min] remove tempban5min
tag @a[tag=tempban5minutes,scores={timer=0}] add unban
scoreboard players set @a[tag=tempban15min] timer 18000
tag @a[tag=tempban15min] add tempban15minutes
tag @a[tag=tempban15min] remove tempban15min
tag @a[tag=tempban15minutes,scores={timer=0}] add unban
scoreboard players set @a[tag=tempban30min] timer 36000
tag @a[tag=tempban30min] add tempban30minutes
tag @a[tag=tempban30min] remove tempban30min
tag @a[tag=tempban30minutes,scores={timer=0}] add unban
scoreboard players set @a[tag=tempban60min] timer 72000
tag @a[tag=tempban60min] add tempban60minutes
tag @a[tag=tempban60min] remove tempban60min
tag @a[tag=tempban60minutes,scores={timer=0}] add unban
scoreboard players set @a[tag=tempban1d] timer 1440000
tag @a[tag=tempban1d] add tempban1day
tag @a[tag=tempban1d] remove tempban1d
tag @a[tag=tempban1day,scores={timer=0}] add unban



#Entitybarriers
effect @e[type=armor_stand,tag=barrier] invisibility 999999 25 true
effect @e[type=armor_stand,tag=barrier] slowness 999999 25 true
effect @e[type=armor_stand,tag=barrier] resistance 999999 25 true
effect @e[type=armor_stand,tag=barrier] fire_resistance 999999 255 true
effect @e[type=armor_stand,tag=barrier] night_vision 999999 255 true
execute @e[type=armor_stand,tag=barrier,tag=small,tag=!pushplayer,tag=!pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!player,type=!item,tag=!admin,r=8,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=small,tag=!pushplayer,tag=!pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=!pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!item,tag=!admin,r=8,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=!pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=small,tag=!pushplayer,tag=pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!player,tag=!admin,r=8,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=small,tag=!pushplayer,tag=pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=!pushitems,tag=pushadmins] ~ ~ ~ execute @e[type=!item,r=8,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=!pushitems,tag=pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=pushitems,tag=!pushadmins] ~ ~ ~ execute @e[tag=!admin,r=8,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=pushitems,tag=pushadmins] ~ ~ ~ execute @e[r=8,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer,tag=pushitems,tag=pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=medium,tag=!pushplayer,tag=!pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!player,type=!item,tag=!admin,r=16] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=medium,tag=!pushplayer,tag=!pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=!pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!item,tag=!admin,r=16,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=!pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=medium,tag=!pushplayer,tag=pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!player,tag=!admin,r=16,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=medium,tag=!pushplayer,tag=pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=!pushitems,tag=pushadmins] ~ ~ ~ execute @e[type=!item,r=16,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=!pushitems,tag=pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=pushitems,tag=!pushadmins] ~ ~ ~ execute @e[tag=!admin,r=16,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=pushitems,tag=pushadmins] ~ ~ ~ execute @e[r=16,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=medium,tag=pushplayer,tag=pushitems,tag=pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=big,tag=!pushplayer,tag=!pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!player,type=!item,tag=!admin,r=24,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=big,tag=!pushplayer,tag=!pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=!pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!item,tag=!admin,r=24,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=!pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=!pushitems,tag=pushadmins] ~ ~ ~ execute @e[type=!item,r=24,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=!pushitems,tag=pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=big,tag=!pushplayer,tag=pushitems,tag=!pushadmins] ~ ~ ~ execute @e[type=!player,tag=!admin,r=24,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=big,tag=!pushplayer,tag=pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=pushitems,tag=!pushadmins] ~ ~ ~ execute @e[tag=!admin,r=24,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=pushitems,tag=!pushadmins]
execute @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=pushitems,tag=pushadmins] ~ ~ ~ execute @e[r=24,tag=!barrier] ~ ~ ~ tp ^ ^0.2 ^-0.3 facing @e[type=armor_stand,tag=barrier,tag=big,tag=pushplayer,tag=pushitems,tag=pushadmins]
execute @e[type=armor_stand,tag=barrier] ~ ~ ~ particle minecraft:magnesium_salts_emitter ~ ~0.5 ~
execute @e[type=armor_stand,tag=barrier] ~ ~ ~ tickingarea add ~ ~ ~ 8 barrier
execute @e[type=armor_stand,tag=barrier,tag=small,tag=pushplayer] ~ ~ ~ execute @a[r=8.3] ~ ~ ~ particle minecraft:falling_dust_dragon_egg_particle ^-0.2 ^0.75 ^0.3






#———————————————————————————————————————————————
#                                                                             DISGUISE
#———————————————————————————————————————————————


tag @e[tag=morph] add disguise
tag @e[tag=morph] remove morph
effect @e[type=cod,tag=disguise] water_breathing 1 2 true
effect @e[type=salmon,tag=disguise] water_breathing 1 2 true
effect @e[type=squid,tag=disguise] water_breathing 1 2 true
effect @e[type=guardian,tag=disguise] water_breathing 1 2 true
effect @e[type=elder_guardian,tag=disguise] water_breathing 1 2 true
effect @e[type=pufferfish,tag=disguise] water_breathing 1 2 true
effect @e[type=dolphin,tag=disguise] water_breathing 1 2 true
effect @e[type=tropicalfish,tag=disguise] water_breathing 1 2 true
effect @e[type=turtle,tag=disguise] water_breathing 1 2 true
effect @e[type=drowned,tag=disguise] water_breathing 1 2 true
effect @e[type=drowned,tag=disguise] fire_resistance 1 2 true
execute @a[tag=disguised,tag=cod] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=salmon] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=pufferfish] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=dolphin] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=tropicalfish] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=drowned] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=turtle] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=squid] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=guardian] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=elder_guardian] ~ ~ ~ detect ~ ~ ~ water 0 effect @s water_breathing 1 2 true
execute @a[tag=disguised,tag=cod] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=salmon] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=pufferfish] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=dolphin] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=tropicalfish] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=drowned] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=turtle] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=squid] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=guardian] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @a[tag=disguised,tag=elder_guardian] ~ ~ ~ detect ~ ~ ~ water 0 effect @s night_vision 1 2 true
execute @e[type=iron_golem,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=iron_golem,r=2] health_boost 1 19 true
execute @e[type=iron_golem,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=iron_golem,r=2] strength 1 1 true
execute @e[type=witch,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=witch,r=2] health_boost 1 1 true
execute @e[type=shulker,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=shulker,r=2] health_boost 1 2 true
execute @e[type=enderman,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=enderman,r=2] health_boost 1 4 true
execute @e[type=polar_bear,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=polar_bear,r=2] health_boost 1 2 true
execute @e[type=llama,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=llama,r=2] health_boost 1 2 true
execute @e[type=vindicator,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=vindicator,r=2] health_boost 1 0 true
execute @e[type=evoker,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=evoker,r=2] health_boost 1 0 true
execute @e[type=vex,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=vex,r=2] health_boost 1 0 true
execute @e[type=pillager,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=pillager,r=2] health_boost 1 0 true
execute @e[type=ravager,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=ravager,r=2] health_boost 1 19 true
execute @e[type=ghast,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=ghast,r=2] fire_resistance 1 2 true
execute @e[type=wither,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=wither,r=2] health_boost 1 59 true
execute @e[type=blaze,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=blaze,r=2] fire_resistance 1 2 true
execute @e[type=wither_skeleton,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=wither_skeleton,r=2] fire_resistance 1 2 true
execute @e[type=magma_cube,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=magma_cube,r=2] fire_resistance 1 2 true
execute @e[type=cat,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=cat,r=2] speed 1 2 true
execute @e[type=ocelot,tag=disguise] ~ ~ ~ effect @a[tag=disguised,tag=ocelot,r=2] speed 1 2 true
execute @e[type=bat,tag=disguise] ~ ~ ~ execute @a[m=!c,tag=bat,tag=disguised,tag=!flyon,r=1] ~ ~ ~ function fly
execute @e[type=bee,tag=disguise] ~ ~ ~ execute @a[m=!c,tag=bee,tag=disguised,tag=!flyon,r=1] ~ ~ ~ function fly
execute @e[type=blaze,tag=disguise] ~ ~ ~ execute @a[m=!c,tag=blaze,tag=disguised,tag=!flyon,r=1] ~ ~ ~ function fly
execute @e[type=phantom,tag=disguise] ~ ~ ~ execute @a[m=!c,tag=phantom,tag=disguised,tag=!flyon,r=1] ~ ~ ~ function fly
execute @e[type=vex,tag=disguise] ~ ~ ~ execute @a[m=!c,tag=vex,tag=disguised,tag=!flyon,r=1] ~ ~ ~ function fly

execute @a[tag=disguised,tag=fox] ~ ~ ~ tp @e[type=fox,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=bee] ~ ~ ~ tp @e[type=bee,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=blaze] ~ ~ ~ tp @e[type=blaze,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=bat] ~ ~ ~ tp @e[type=bat,r=2,c=1,tag=disguise] ~ ~0.3 ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=slime] ~ ~ ~ tp @e[type=slime,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=cow] ~ ~ ~ tp @e[type=cow,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=husk] ~ ~ ~ tp @e[type=husk,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=minecart] ~ ~ ~ tp @e[type=minecart,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=creeper] ~ ~ ~ tp @e[type=creeper,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=ghast] ~ ~ ~ tp @e[type=ghast,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^2
execute @a[tag=disguised,tag=iron_golem] ~ ~ ~ tp @e[type=iron_golem,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=enderman] ~ ~ ~ tp @e[type=enderman,r=15,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=zombie] ~ ~ ~ tp @e[type=zombie,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=wither_skeleton] ~ ~ ~ tp @e[type=wither_skeleton,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=arrow] ~ ~ ~ tp @e[type=arrow,r=2,c=1,tag=disguise] ~ ~1.25 ~ facing ^ ^ ^-1
execute @a[tag=disguised,tag=xp_orb] ~ ~ ~ tp @e[type=xp_orb,r=2,c=1,tag=disguise] ~ ~1.25 ~ facing ^ ^ ^-1
execute @a[tag=disguised,tag=cod] ~ ~ ~ tp @e[type=cod,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=cat] ~ ~ ~ tp @e[type=cat,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=salmon] ~ ~ ~ tp @e[type=salmon,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=panda] ~ ~ ~ tp @e[type=panda,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=cow] ~ ~ ~ tp @e[type=cow,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=pig] ~ ~ ~ tp @e[type=pig,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=sheep] ~ ~ ~ tp @e[type=sheep,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=chicken] ~ ~ ~ tp @e[type=chicken,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=wolf] ~ ~ ~ tp @e[type=wolf,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=tnt] ~ ~ ~ tp @e[type=tnt,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
scoreboard objectives add tnttimer dummy TnTexplodeTimer
execute @a[tag=disguised,tag=tnt,scores={tnttimer=0}] ~ ~ ~ tp @e[type=tnt,tag=disguise,r=1,c=1] ~ -10 ~
execute @a[tag=disguised,tag=tnt,scores={tnttimer=0}] ~ ~ ~ summon tnt ~ ~ ~
execute @a[tag=disguised,tag=tnt,scores={tnttimer=0}] ~ ~ ~ tag @e[type=tnt,r=1,c=1] add disguise
scoreboard players set @a[tag=disguised,tag=tnt,scores={tnttimer=0}] tnttimer 65
scoreboard players set @a[tag=disguised,tag=tnt,scores={tnttimer=-1}] tnttimer 65
scoreboard players remove @a[tag=disguised,tag=tnt] tnttimer 1
execute @a[tag=disguised,tag=ocelot] ~ ~ ~ tp @e[type=ocelot,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=polar_bear] ~ ~ ~ tp @e[type=polar_bear,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=mooshroom] ~ ~ ~ tp @e[type=mooshroom,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=parrot] ~ ~ ~ tp @e[type=parrot,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=rabbit] ~ ~ ~ tp @e[type=rabbit,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=llama] ~ ~ ~ tp @e[type=llama,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=horse] ~ ~ ~ tp @e[type=horse,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=tropicalfish] ~ ~ ~ tp @e[type=tropicalfish,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=skeleton_horse] ~ ~ ~ tp @e[type=skeleton_horse,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=zombie_horse] ~ ~ ~ tp @e[type=zombie_horse,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=donkey] ~ ~ ~ tp @e[type=donkey,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=mule] ~ ~ ~ tp @e[type=mule,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=pufferfish] ~ ~ ~ tp @e[type=pufferfish,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=dolphin] ~ ~ ~ tp @e[type=dolphin,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=turtle] ~ ~ ~ tp @e[type=turtle,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=silverfish] ~ ~ ~ tp @e[type=silverfish,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=skeleton] ~ ~ ~ tp @e[type=skeleton,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=stray] ~ ~ ~ tp @e[type=stray,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=spider] ~ ~ ~ tp @e[type=spider,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=cave_spider] ~ ~ ~ tp @e[type=cave_spider,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=squid] ~ ~ ~ tp @e[type=squid,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=guardian] ~ ~ ~ tp @e[type=guardian,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=elder_guardian] ~ ~ ~ tp @e[type=elder_guardian,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=drowned] ~ ~ ~ tp @e[type=drowned,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=zombie_pigman] ~ ~ ~ tp @e[type=zombie_pigman,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=witch] ~ ~ ~ tp @e[type=witch,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=endermite] ~ ~ ~ tp @e[type=endermite,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=magma_cube] ~ ~ ~ tp @e[type=magma_cube,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=vindicator] ~ ~ ~ tp @e[type=vindicator,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=evoker] ~ ~ ~ tp @e[type=evoker,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=vex] ~ ~ ~ tp @e[type=vex,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=villager] ~ ~ ~ tp @e[type=villager,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=ravager] ~ ~ ~ tp @e[type=ravager,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=shulker] ~ ~ ~ tp @e[type=shulker,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=pillager] ~ ~ ~ tp @e[type=pillager,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=phantom] ~ ~ ~ tp @e[type=phantom,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=wandering_trader] ~ ~ ~ tp @e[type=wandering_trader,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=zombie_villager] ~ ~ ~ tp @e[type=zombie_villager,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.35 ^1.5
execute @a[tag=disguised,tag=wither] ~ ~ ~ tp @e[type=wither,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=armor_stand] ~ ~ ~ tp @e[type=armor_stand,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=boat] ~ ~ ~ tp @e[type=boat,r=2,c=1,tag=disguise] ~ ~ ~ facing ^ ^0.8 ^1
execute @a[tag=disguised,tag=boat] ~ ~ ~ execute @e[type=boat,tag=disguise,r=2,c=1] ~ ~ ~ tp @s ~ ~ ~ ~90 ~
execute @a[tag=disguised,tag=minecart] ~ ~ ~ execute @e[type=minecart,tag=disguise,r=2,c=1] ~ ~ ~ tp @s ~ ~ ~ ~90 ~

execute @e[type=fox ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=bee ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=minecart ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=zombie ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=creeper ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=husk ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=slime ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=bat ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=blaze ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=ghast ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=iron_golem ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=enderman ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=zombie ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=wither_skeleton ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=arrow ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=xp_orb ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=cod ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=cat ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=salmon ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=panda ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=cow ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=pig ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=sheep ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=chicken ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=tnt ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=wolf ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=polar_bear ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=ocelot ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=mooshroom ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=parrot ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=rabbit ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=llama ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=horse ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=tropicalfish ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=skeleton_horse ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=zombie_horse ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=donkey ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=mule ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=pufferfish ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=dolphin ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=turtle ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=silverfish ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=skeleton ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=stray ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=spider ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=cave_spider ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=squid ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=guardian ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=elder_guardian ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=drowned ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=zombie_pigman ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=witch ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=endermite ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=magma_cube ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=vindicator ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=evoker ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=vex ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=villager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=ravager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=shulker ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=pillager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=phantom ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=zombie_villager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=wandering_trader ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=wither ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=armor_stand ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true
execute @e[type=boat ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] invisibility 1 255 true

execute @e[type=fox ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=bee ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=minecart ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=zombie ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=creeper ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=husk ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=slime ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=bat ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=blaze ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=ghast ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=iron_golem ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=enderman ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=zombie ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=wither_skeleton ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=arrow ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=xp_orb ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=cod ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=cat ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=salmon ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=panda ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=cow ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=pig ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=sheep ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=chicken ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=tnt ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=wolf ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=polar_bear ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=ocelot ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=mooshroom ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=parrot ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=rabbit ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=llama ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=horse ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=tropicalfish ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=skeleton_horse ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=zombie_horse ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=donkey ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=mule ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=pufferfish ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=dolphin ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=turtle ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=silverfish ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=skeleton ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=stray ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=spider ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=cave_spider ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=squid ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=guardian ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=elder_guardian ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=drowned ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=zombie_pigman ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=witch ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=endermite ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=magma_cube ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=vindicator ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=evoker ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=vex ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=villager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=ravager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=shulker ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=pillager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=phantom ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=zombie_villager ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=wandering_trader ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=wither ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=armor_stand ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true
execute @e[type=boat ,tag=disguise] ~ ~ ~ effect @a[tag=disguised,r=2] slowness 1 2 true




#———————————————————————————————————————————————
#                                                                             TERRAINEDIT
#———————————————————————————————————————————————




replaceitem entity @a[tag=terrainedit] slot.hotbar 0 grass 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 1 dirt 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 2 stone 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 3 gravel 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 4 bucket 1 8
replaceitem entity @a[tag=terrainedit] slot.hotbar 5 sand 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 6 sandstone 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 7 glass 1
replaceitem entity @a[tag=terrainedit] slot.hotbar 8 paper 1

execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="dirt",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add tedirt
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="grass block",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add tegrass
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="glass",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add teglass
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="stone",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add testone
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="water bucket",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add tewater
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="gravel",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add tegravel
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="sand",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add tesand
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="sandstone",r=3] ~ ~ ~ tag @a[tag=terrainedit,r=3] add tesandstone

execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="dirt",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="grass block",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="glass",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="stone",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="water bucket",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="gravel",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="sand",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="sandstone",r=3] ~ ~ ~ tag @s add terraineditblock
execute @a[tag=terrainedit] ~ ~ ~ execute @e[type=item,name="paper",r=3] ~ ~ ~ tag @s add terraineditblock

execute @a[tag=tegrass,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[type=item,tag=terraineditblock,name="grass block",r=15,c=1] ^ ^ ^10
execute @a[tag=tewater,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="water bucket",r=15,c=1] ^ ^ ^10
execute @a[tag=teglass,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="glass",r=15,c=1] ^ ^ ^10
execute @a[tag=testone,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="stone",r=15,c=1] ^ ^ ^10
execute @a[tag=tedirt,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="dirt",r=15,c=1] ^ ^ ^10
execute @a[tag=tegravel,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="gravel",r=15,c=1] ^ ^ ^10
execute @a[tag=tesand,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="sand",r=15,c=1] ^ ^ ^10
execute @a[tag=tesandstone,tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="sandstone",r=15,c=1] ^ ^ ^10
execute @a[tag=terrainedit,tag=ter10] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ^ ^ ^10

execute @a[tag=tegrass,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="grass block",r=15,c=1] ^ ^ ^5
execute @a[tag=tewater,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="water bucket",r=15,c=1] ^ ^ ^5
execute @a[tag=teglass,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="glass",r=15,c=1] ^ ^ ^5
execute @a[tag=testone,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="stone",r=15,c=1] ^ ^ ^5
execute @a[tag=tedirt,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="dirt",r=15,c=1] ^ ^ ^5
execute @a[tag=tegravel,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="gravel",r=15,c=1] ^ ^ ^5
execute @a[tag=tesand,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="sand",r=15,c=1] ^ ^ ^5
execute @a[tag=tesandstone,tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="sandstone",r=15,c=1] ^ ^ ^5
execute @a[tag=terrainedit,tag=ter5] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ^ ^ ^10

execute @a[tag=tegrass,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="grass block",r=25,c=1] ^ ^ ^20
execute @a[tag=tewater,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="water bucket",r=25,c=1] ^ ^ ^20
execute @a[tag=teglass,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="glass",r=25,c=1] ^ ^ ^20
execute @a[tag=testone,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="stone",r=25,c=1] ^ ^ ^20
execute @a[tag=tedirt,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="dirt",r=25,c=1] ^ ^ ^20
execute @a[tag=tegravel,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="gravel",r=25,c=1] ^ ^ ^20
execute @a[tag=tesand,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="cobblestone",r=25,c=1] ^ ^ ^20
execute @a[tag=tesand,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="sand",r=25,c=1] ^ ^ ^20
execute @a[tag=tesandstone,tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="sandstone",r=25,c=1] ^ ^ ^20
execute @a[tag=terrainedit,tag=ter20] ~ ~ ~ tp @e[tag=terraineditblock,type=item,name="paper",r=25,c=1] ^ ^ ^10

execute @a[tag=tedirt,tag=terrainedit,tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="dirt",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ dirt
execute @a[tag=tegravel,tag=terrainedit,tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="gravel",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ gravel
execute @a[tag=teglass,tag=terrainedit, tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="glass",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ air
execute @a[tag=testone,tag=terrainedit, tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="stone",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ stone
execute @a[tag=tegrass,tag=terrainedit,tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="grass block",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ grass
execute @a[tag=tesand,tag=terrainedit, tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sand",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ sand
execute @a[tag=tesandstone,tag=terrainedit, tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sandstone",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ sandstone
execute @a[tag=tewater,tag=terrainedit, tag=brush1] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="water bucket",r=25,c=1] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ water

execute @a[tag=tedirt,tag=terrainedit,tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="dirt",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 dirt
execute @a[tag=tegravel,tag=terrainedit,tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="gravel",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 gravel
execute @a[tag=teglass,tag=terrainedit, tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="glass",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 air
execute @a[tag=testone,tag=terrainedit, tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="stone",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 stone
execute @a[tag=tegrass,tag=terrainedit,tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="grass block",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 grass
execute @a[tag=tesand,tag=terrainedit, tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sand",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 sand
execute @a[tag=tesandstone,tag=terrainedit, tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sandstone",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 sandstone
execute @a[tag=tewater,tag=terrainedit, tag=brush3] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="water bucket",r=25,c=1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~-1 ~-1 water

execute @a[tag=tedirt,tag=terrainedit,tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="dirt",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 dirt
execute @a[tag=tegravel,tag=terrainedit,tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="gravel",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 gravel
execute @a[tag=teglass,tag=terrainedit, tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="glass",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 air
execute @a[tag=testone,tag=terrainedit, tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="stone",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 stone
execute @a[tag=tegrass,tag=terrainedit,tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="grass block",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 grass
execute @a[tag=tesand,tag=terrainedit, tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sand",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 sand
execute @a[tag=tesandstone,tag=terrainedit, tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sandstone",r=25,c=1] ~ ~ ~ fill ~2 ~2 ~2 ~-2 ~-2 ~-2 sandstone
execute @a[tag=tewater,tag=terrainedit, tag=brush5] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="water bucket",r=25,c=1] ~ ~ ~ fill ~ 2 ~2 ~2 ~-2 ~-2 ~-2 water

execute @a[tag=tedirt,tag=terrainedit,tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="dirt",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 dirt
execute @a[tag=tegravel,tag=terrainedit,tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="gravel",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 gravel
execute @a[tag=teglass,tag=terrainedit, tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="glass",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 air
execute @a[tag=testone,tag=terrainedit, tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="stone",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 stone
execute @a[tag=tegrass,tag=terrainedit,tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="grass block",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 grass
execute @a[tag=tesand,tag=terrainedit, tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sand",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 sand
execute @a[tag=tesandstone,tag=terrainedit, tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="sandstone",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 sandstone
execute @a[tag=tewater,tag=terrainedit, tag=brush10] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="water bucket",r=25,c=1] ~ ~ ~ fill ~4 ~4 ~4 ~-4 ~-4 ~-4 water

execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="dirt"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="stone"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="gravel"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="cobblestone"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="glass"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="water bucket"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="grass block"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="sand"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=25,name="sandstone"]
execute @a[tag=terrainedit] ~ ~ ~ execute @e[tag=terraineditblock,type=item,name="paper",r=15,c=1] ~ ~ ~ kill @e[tag=terraineditblock,type=item,r=20,name="paper"]