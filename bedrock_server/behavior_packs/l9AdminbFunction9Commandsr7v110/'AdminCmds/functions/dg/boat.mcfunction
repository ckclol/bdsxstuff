function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Boat§7.§r"}]}
summon boat ~ ~ ~
tag @e[type=boat,c=1,r=1] add morph
tag @s add boat