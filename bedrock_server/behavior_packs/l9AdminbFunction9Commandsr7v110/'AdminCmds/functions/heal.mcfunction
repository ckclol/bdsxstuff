effect @s clear
effect @s[m=!creative] fire_resistance 1 255 true
effect @s[m=!creative] instant_health 1 255 true
effect @s[m=!creative] saturation 2 255 true
effect @s[m=!creative] fire_resistance 0
tellraw @s {"rawtext":[{"text":"§fYou have been §bHealed§f.§r"}]}
playsound random.orb @s