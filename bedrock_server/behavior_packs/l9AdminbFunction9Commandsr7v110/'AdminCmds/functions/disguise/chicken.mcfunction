function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Chicken§7.§r"}]}
summon chicken ~ ~ ~
tag @e[type=chicken,c=1,r=1] add morph
tag @s add chicken