function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Stray§7.§r"}]}
summon stray ~ ~ ~
tag @e[type=stray,c=1,r=1] add morph
tag @s add stray
replaceitem entity @s slot.hotbar 1 bow
replaceitem entity @s slot.hotbar 8 arrow 16