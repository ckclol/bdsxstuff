function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Minecart§7.§r"}]}
summon minecart ~ ~ ~
tag @e[type=minecart,c=1,r=1] add morph
tag @s add minecart