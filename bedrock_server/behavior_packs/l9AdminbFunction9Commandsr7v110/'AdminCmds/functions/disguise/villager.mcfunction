function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Villager§7.§r"}]}
summon villager ~ ~ ~
tag @e[type=villager,c=1,r=1] add morph
tag @s add villager