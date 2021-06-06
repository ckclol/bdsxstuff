function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Witch§7.§r"}]}
summon witch ~ ~ ~
tag @e[type=witch,c=1,r=1] add morph
tag @s add witch
replaceitem entity @s slot.hotbar 8 splash_potion 1 19