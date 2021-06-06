tag @s remove tntstrike
tag @a[tag=tntban] remove tntban
tag @a[tag=tntrocket] remove tntrocket
tag @s[tag=!tntexplode] add tntexplode
playsound random.orb @s
tellraw @s {"rawtext":[{"text":"§cTNT §7will now fake explode§7.§r"}]}