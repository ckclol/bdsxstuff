function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Enderman§7.§r"}]}
summon enderman ~ ~ ~
tag @e[type=enderman,c=1,r=1] add morph
tag @s add enderman
replaceitem entity @s slot.hotbar 8 ender_pearl 8