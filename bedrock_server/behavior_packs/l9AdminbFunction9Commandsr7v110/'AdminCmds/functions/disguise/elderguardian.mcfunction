function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Elder Guardian§7.§r"}]}
summon elder_guardian ~ ~ ~
tag @e[type=elder_guardian,c=1,r=1] add morph
tag @s add elder_guardian