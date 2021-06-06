function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Ravager§7.§r"}]}
summon ravager ~ ~ ~
tag @e[type=ravager,c=1,r=1] add morph
tag @s add ravager