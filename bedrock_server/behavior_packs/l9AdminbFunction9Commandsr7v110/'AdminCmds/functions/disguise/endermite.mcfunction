function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Endermite§7.§r"}]}
summon endermite ~ ~ ~
tag @e[type=endermite,c=1,r=1] add morph
tag @s add endermite