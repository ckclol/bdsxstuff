function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Shulker§7.§r"}]}
summon shulker ~ ~ ~
tag @e[type=shulker,c=1,r=1] add morph
tag @s add shulker