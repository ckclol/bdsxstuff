function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Salmon§7.§r"}]}
summon salmon ~ ~ ~
tag @e[type=salmon,c=1,r=1] add morph
tag @s add salmon