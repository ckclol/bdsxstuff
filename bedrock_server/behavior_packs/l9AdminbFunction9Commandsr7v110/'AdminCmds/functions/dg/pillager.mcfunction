function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Pillager§7.§r"}]}
summon pillager ~ ~ ~
tag @e[type=pillager,c=1,r=1] add morph
tag @s add pillager