execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~ ~ ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~10 ~ ~10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~-10 ~ ~10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~-10 ~ ~-10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~10 ~ ~-10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~10 ~ ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~-10 ~ ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~ ~-10 ~10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~ ~-10 ~-10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~ ~-10 ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~10 ~-10 ~10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~-10 ~-10 ~10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~-10 ~-10 ~-10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~10 ~-10 ~-10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~10 ~-10 ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~-10 ~-10 ~
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~ ~-10 ~10
execute @e[type=armor_stand,tag=nuke] ~ ~ ~ summon afcmd:nuke ~ ~-10 ~-10
tag @e[type=armor_stand,tag=nuke] add detonating
execute @e[type=armor_stand,tag=nuke,tag=detonating] ~ ~ ~ tellraw @a[tag=nukey] {"rawtext":[{"text":"§cNuke §7detonating.§r"}]}
tag @a[tag=nukey] remove nukey