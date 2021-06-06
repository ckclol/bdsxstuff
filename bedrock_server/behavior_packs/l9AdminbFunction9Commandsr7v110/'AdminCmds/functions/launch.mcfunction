tag @s add self
effect @p[tag=!self] levitation 3 255 true
playsound random.explode @p[tag=!self]
tellraw @p[tag=!self] {"rawtext":[{"text":"§c§lBOOOM!!§r"}]}
tag @s remove self
playsound random.orb @s
tellraw @s {"rawtext":[{"text":"§7You shot the nearest player up in the sky.§r"}]}