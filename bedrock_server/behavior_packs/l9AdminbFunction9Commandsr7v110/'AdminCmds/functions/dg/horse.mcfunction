function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Horse§7.§r"}]}
summon horse ~ ~ ~
tag @e[type=horse,c=1,r=1] add morph
tag @s add horse