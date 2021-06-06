function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Tropical Fish§7.§r"}]}
summon tropicalfish ~ ~ ~
tag @e[type=tropicalfish,c=1,r=1] add morph
tag @s add tropicalfish