function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Vindicator§7.§r"}]}
summon vindicator ~ ~ ~
tag @e[type=vindicator,c=1,r=1] add morph
tag @s add vindicator
replaceitem entity @s slot.hotbar 0 iron_axe