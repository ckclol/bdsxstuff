function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Dolphin§7.§r"}]}
summon dolphin ~ ~ ~
tag @e[type=dolphin,c=1,r=1] add morph
tag @s add dolphin