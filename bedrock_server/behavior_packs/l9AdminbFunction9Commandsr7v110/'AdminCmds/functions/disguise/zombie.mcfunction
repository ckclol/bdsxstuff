function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Zombie§7.§r"}]}
summon zombie ~ ~ ~
tag @e[type=zombie,c=1,r=1] add morph
tag @s add zombie