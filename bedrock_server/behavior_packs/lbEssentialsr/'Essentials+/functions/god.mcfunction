tag @s remove getgod
tag @s remove nogod
tag @s[tag=!godon] add getgod
tag @s[tag=godon] add nogod
effect @s[tag=getgod] resistance 9999 255 true
effect @s[tag=getgod] fire_resistance 9999 255 true
effect @s[tag=getgod] weakness 9999 255 true
effect @s[tag=getgod] water_breathing 9999 255 true
effect @s[tag=nogod] resistance 0
effect @s[tag=nogod] fire_resistance 0
effect @s[tag=nogod] weakness 0
effect @s[tag=nogod] water_breathing 0
tellraw @s[tag=getgod] {"rawtext":[{"text":"§bGod Mode §fenabled.§r"}]}
tellraw @s[tag=nogod] {"rawtext":[{"text":"§bGod Mode §fdisabled.§r"}]}
tag @s[tag=getgod] add godon
tag @s[tag=nogod] remove godon
playsound random.orb @s