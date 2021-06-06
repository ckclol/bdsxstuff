tag @e[type=player] add bprotected
tag @e[type=armor_stand] add bprotected
tag @e[type=ender_eye] add bprotected
tag @e[type=item] add bprotected
tag @e[type=xp_orb] add bprotected
tag @e[type=arrow] add bprotected
tag @e[type=ender_pearl] add bprotected
tag @e[type=leash] add bprotected
kill @e[tag=!bprotected]
tellraw @s {"rawtext":[{"text":"§fAll Mobs have been §bkilled§f."}]}
tag @e remove bprotected
playsound random.orb @s