function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Zombie Pigman§7.§r"}]}
summon zombie_pigman ~ ~ ~
tag @e[type=zombie_pigman,c=1,r=1] add morph
tag @s add zombie_pigman
replaceitem entity @s slot.hotbar 0 golden_sword