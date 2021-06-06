tag @s add self
playsound random.orb @s
tp @r[tag=!self] @s
tag @s remove self
tellraw @s {"rawtext":[{"text":"§fA §bRandom Player§f has been teleported to §bYou§f.§r"}]}