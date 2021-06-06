function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Ocelot§7.§r"}]}
summon ocelot ~ ~ ~
tag @e[type=ocelot,c=1,r=1] add morph
tag @s add ocelot