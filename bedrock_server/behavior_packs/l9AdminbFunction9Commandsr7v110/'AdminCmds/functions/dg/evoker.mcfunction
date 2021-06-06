function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Evoker§7.§r"}]}
summon evoker ~ ~ ~
tag @e[type=evoker,c=1,r=1] add morph
tag @s add evoker