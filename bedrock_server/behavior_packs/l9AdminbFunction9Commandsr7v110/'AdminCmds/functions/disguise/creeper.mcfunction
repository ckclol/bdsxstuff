function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Creeper§7.§r"}]}
summon creeper ~ ~ ~
tag @e[type=creeper,c=1,r=1] add morph
tag @s add creeper