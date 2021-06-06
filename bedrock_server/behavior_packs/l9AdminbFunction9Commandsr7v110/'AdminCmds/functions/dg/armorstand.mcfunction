function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Armor Stand§7.§r"}]}
summon armor_stand ~ ~ ~
tag @e[type=armor_stand,c=1,r=1] add morph
tag @s add armor_stand