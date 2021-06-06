function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Donkey§7.§r"}]}
summon donkey ~ ~ ~
tag @e[type=donkey,c=1,r=1] add morph
tag @s add donkey