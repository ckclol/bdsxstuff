function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Husk§7.§r"}]}
summon husk ~ ~ ~
tag @e[type=husk,c=1,r=1] add morph
tag @s add husk