function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Vex§7.§r"}]}
summon vex ~ ~ ~
tag @e[type=vex,c=1,r=1] add morph
tag @s add vex
replaceitem entity @s slot.hotbar 0 diamond_sword 