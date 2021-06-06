function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Spider§7.§r"}]}
summon spider ~ ~ ~
tag @e[type=spider,c=1,r=1] add morph
tag @s add spider