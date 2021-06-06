function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Bat§7.§r"}]}
summon bat ~ ~ ~
tag @e[type=bat,c=1,r=1] add morph
tag @s add bat