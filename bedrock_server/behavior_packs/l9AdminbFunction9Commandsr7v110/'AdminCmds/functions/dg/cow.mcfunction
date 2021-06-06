function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Cow§7.§r"}]}
summon cow ~ ~ ~
tag @e[type=cow,c=1,r=1] add morph
tag @s add cow