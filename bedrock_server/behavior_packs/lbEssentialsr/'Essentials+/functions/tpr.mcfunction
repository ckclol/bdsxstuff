tag @s add self
playsound random.orb @s
tp @r[tag=!self]
tag @s remove self
tellraw @s {"rawtext":[{"text":"§bYou§f have been teleported to a §bRandom Player§f.§r"}]}