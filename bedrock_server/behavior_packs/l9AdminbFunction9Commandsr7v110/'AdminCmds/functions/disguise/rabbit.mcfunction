function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Rabbit§7.§r"}]}
summon rabbit ~ ~ ~
tag @e[type=rabbit,c=1,r=1] add morph
tag @s add rabbit