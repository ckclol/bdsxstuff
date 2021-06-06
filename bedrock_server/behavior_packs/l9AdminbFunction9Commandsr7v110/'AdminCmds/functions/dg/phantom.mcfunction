function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Phantom§7.§r"}]}
summon phantom ~ ~ ~
tag @e[type=phantom,c=1,r=1] add morph
tag @s add phantom 