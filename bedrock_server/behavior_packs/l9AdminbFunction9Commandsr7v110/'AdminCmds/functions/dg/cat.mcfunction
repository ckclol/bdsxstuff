function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Cat§7.§r"}]}
summon cat ~ ~ ~
tag @e[type=cat,r=1,c=1] add morph
tag @s add cat