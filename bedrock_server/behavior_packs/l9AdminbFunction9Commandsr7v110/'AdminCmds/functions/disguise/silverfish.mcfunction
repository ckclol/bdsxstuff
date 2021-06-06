function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Silverfish§7.§r"}]}
summon silverfish ~ ~ ~
tag @e[type=silverfish,c=1,r=1] add morph
tag @s add silverfish