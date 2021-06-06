function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Panda§7.§r"}]}
summon panda ~ ~ ~
tag @e[type=panda,c=1,r=1] add morph
tag @s add panda