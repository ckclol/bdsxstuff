function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Drowned§7.§r"}]}
summon drowned ~ ~ ~
tag @e[type=drowned,c=1,r=1] add morph
tag @s add drowned