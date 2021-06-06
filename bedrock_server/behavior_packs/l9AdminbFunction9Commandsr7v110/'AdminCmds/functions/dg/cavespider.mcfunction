function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Cave Spider§7.§r"}]}
summon cave_spider ~ ~ ~
tag @e[type=cave_spider,c=1,r=1] add morph
tag @s add cave_spider