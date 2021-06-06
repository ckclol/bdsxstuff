function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as a §9Fox§7.§r"}]}
summon minecraft:fox ~ ~ ~
tag @e[type=fox,c=1,r=1] add disguise
tag @s add fox