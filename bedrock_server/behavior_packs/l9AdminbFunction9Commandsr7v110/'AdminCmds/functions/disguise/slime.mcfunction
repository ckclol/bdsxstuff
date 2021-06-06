function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Slime§7.§r"}]}
summon slime ~ ~ ~
tag @e[type=slime,c=1,r=1] add morph
tag @s add slime