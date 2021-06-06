function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Parrot§7.§r"}]}
summon parrot ~ ~ ~
tag @e[type=parrot,c=1,r=1] add morph
tag @s add parrot