execute @a ~ ~ ~ kill @e[type=item]
execute @a ~ ~ ~ kill @e[type=tnt]
tellraw @s {"rawtext":[{"text":"§bLag§f has been §bCleared§f.§r"}]}
playsound random.orb @s