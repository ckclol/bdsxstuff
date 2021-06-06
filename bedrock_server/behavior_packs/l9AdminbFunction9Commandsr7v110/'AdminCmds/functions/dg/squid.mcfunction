function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Squid§7.§r"}]}
summon squid ~ ~ ~
tag @e[type=squid,c=1,r=1] add morph
tag @s add squid