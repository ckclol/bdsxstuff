function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Guardian§7.§r"}]}
summon guardian ~ ~ ~
tag @e[type=guardian,c=1,r=1] add morph
tag @s add guardian