function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Mule§7.§r"}]}
summon mule ~ ~ ~
tag @e[type=mule,c=1,r=1] add morph
tag @s add mule