function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Arrow§7.§r"}]}
summon arrow ^ ^ ^-1
tag @e[type=arrow,c=1,r=1] add morph
tag @s add arrow