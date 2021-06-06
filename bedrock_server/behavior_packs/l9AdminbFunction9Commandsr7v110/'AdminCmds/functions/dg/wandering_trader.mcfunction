function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Wandering Trader§7.§r"}]}
summon wandering_trader ~ ~ ~
tag @e[type=wandering_trader,c=1,r=1] add morph
tag @s add wandering_trader