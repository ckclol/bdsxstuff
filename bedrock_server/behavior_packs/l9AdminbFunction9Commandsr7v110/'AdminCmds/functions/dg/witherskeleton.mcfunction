function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Wither Skeleton§7.§r"}]}
summon wither_skeleton ~ ~ ~
tag @e[type=wither_skeleton,c=1,r=1] add morph
tag @s add wither_skeleton
replaceitem entity @s slot.hotbar 0 stone_sword