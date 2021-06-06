function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Sea Turtle§7.§r"}]}
summon turtle ~ ~ ~
tag @e[type=turtle,c=1,r=1] add morph
tag @s add turtle