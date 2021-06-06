function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Zombie Villager§7.§r"}]}
summon zombie_villager ~ ~ ~
tag @e[type=zombie_villager,c=1,r=1] add morph
tag @s add zombie_villager