function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Zombie Horse§7.§r"}]}
summon zombie_horse ~ ~ ~
tag @e[type=zombie_horse,c=1,r=1] add morph
tag @s add zombie_horse