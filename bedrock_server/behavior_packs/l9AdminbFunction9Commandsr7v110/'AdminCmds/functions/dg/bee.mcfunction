function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as a §9Bee§7.§r"}]}
summon minecraft:bee ~ ~ ~
tag @e[type=bee,c=1,r=1] add disguise
tag @s add bee