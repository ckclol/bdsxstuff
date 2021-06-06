tag @s add self
playsound random.orb @s
tp @r[tag=!self] @s
tag @s remove self
tellraw @s {"rawtext":[{"text":"§7Teleported a §crandom user §7to §cyou§r"}]}