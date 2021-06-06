execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
execute @e[type=armor_stand,tag=c4] ~ ~ ~ summon tnt ~ ~ ~
tag @e[type=armor_stand,tag=c4] add detonating
execute @e[type=armor_stand,tag=c4,tag=detonating] ~ ~ ~ tellraw @a[tag=c4d] {"rawtext":[{"text":"§cC4 §7detonated.§r"}]}
tag @a[tag=c4d] remove c4d