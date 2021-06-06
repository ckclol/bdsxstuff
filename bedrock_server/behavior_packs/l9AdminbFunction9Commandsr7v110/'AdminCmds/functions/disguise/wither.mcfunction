function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Wither§7.§r"}]}
summon wither ~ ~ ~
tag @e[type=wither,c=1,r=1] add morph
tag @s add wither