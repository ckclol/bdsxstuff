function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Skeleton Horse§7.§r"}]}
summon skeleton_horse ~ ~ ~
tag @e[type=skeleton_horse,c=1,r=1] add morph
tag @s add skeleton_horse