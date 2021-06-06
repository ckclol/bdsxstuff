function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Cod§7.§r"}]}
summon cod ~ ~ ~
tag @e[type=cod,c=1,r=1] add morph
tag @s add cod