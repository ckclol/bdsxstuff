function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Sheep§7.§r"}]}
summon sheep ~ ~ ~
tag @e[type=sheep,c=1,r=1] add morph
tag @s add sheep