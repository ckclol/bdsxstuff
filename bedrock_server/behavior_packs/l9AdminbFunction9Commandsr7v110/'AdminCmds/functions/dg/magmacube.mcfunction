function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Magma Cube§7.§r"}]}
summon magma_cube ~ ~ ~
tag @e[type=magma_cube,c=1,r=1] add morph
tag @s add magma_cube