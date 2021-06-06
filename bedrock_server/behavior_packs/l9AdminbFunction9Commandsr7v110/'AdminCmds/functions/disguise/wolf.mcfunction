function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Wolf§7.§r"}]}
summon wolf ~ ~ ~
tag @e[type=wolf,c=1,r=1] add morph
tag @s add wolf