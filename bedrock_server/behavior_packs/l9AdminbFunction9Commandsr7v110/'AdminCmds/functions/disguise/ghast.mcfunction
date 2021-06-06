function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Ghast§7.§r"}]}
summon ghast ~ ~ ~
tag @e[type=ghast,c=1,r=1] add morph
tag @s add ghast