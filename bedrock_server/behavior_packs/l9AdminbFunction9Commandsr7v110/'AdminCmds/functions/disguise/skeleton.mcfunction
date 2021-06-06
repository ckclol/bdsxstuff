function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Skeleton§7.§r"}]}
summon skeleton ~ ~ ~
tag @e[type=skeleton,c=1,r=1] add morph
tag @s add skeleton 