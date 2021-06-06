tag @s[tag=!tntban] add tntban
tag @a[tag=tntrocket] remove tntrocket
tag @a[tag=tntexplode] remove tntexplode
playsound random.orb @s
tellraw @s {"rawtext":[{"text":"§cTNT §7will just disappear§7.§r"}]}
tag @s remove tntstrike