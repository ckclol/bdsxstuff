function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Pig§7.§r"}]}
summon pig ~ ~ ~
tag @e[type=pig,c=1,r=1] add morph
tag @s add pig