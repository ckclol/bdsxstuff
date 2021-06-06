function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Polar Bear§7.§r"}]}
summon polar_bear ~ ~ ~
tag @e[type=polar_bear,c=1,r=1] add morph
tag @s add polar_bear