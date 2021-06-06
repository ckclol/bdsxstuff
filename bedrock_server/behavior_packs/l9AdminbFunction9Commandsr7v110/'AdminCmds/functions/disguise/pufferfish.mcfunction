function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Pufferfish§7.§r"}]}
summon pufferfish ~ ~ ~
tag @e[type=pufferfish,c=1,r=1] add morph
tag @s add pufferfish