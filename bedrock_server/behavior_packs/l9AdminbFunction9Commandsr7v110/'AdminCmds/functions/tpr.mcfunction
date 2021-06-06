tag @s add self
playsound random.orb @s
tp @r[tag=!self]
tag @s remove self
tellraw @s {"rawtext":[{"text":"§cYou§7 have been teleported to a §cRandom User§7.§r"}]}