function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Iron Golem§7.§r"}]}
summon iron_golem ~ ~ ~
tag @e[type=iron_golem,c=1,r=1] add morph
tag @s add iron_golem