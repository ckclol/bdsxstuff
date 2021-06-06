tag @s remove nofly
tag @s remove mayfly
tag @s[tag=!flyon] add mayfly
tag @s[tag=flyon] add nofly
tellraw @s[tag=mayfly] {"rawtext":[{"text":"§bFly §fenabled.§r"}]}
tellraw @s[tag=nofly] {"rawtext":[{"text":"§bFly §fdisabled.§r"}]}
ability @s[tag=mayfly] mayfly true
ability @s[tag=nofly] mayfly false
tag @s[tag=mayfly] add flyon
tag @s[tag=nofly] remove flyon
playsound random.orb @s