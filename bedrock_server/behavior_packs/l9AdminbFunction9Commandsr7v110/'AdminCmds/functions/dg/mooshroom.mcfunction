function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Mooshroom§7.§r"}]}
summon mooshroom ~ ~ ~
tag @e[type=mooshroom,c=1,r=1] add morph
tag @s add mooshroom