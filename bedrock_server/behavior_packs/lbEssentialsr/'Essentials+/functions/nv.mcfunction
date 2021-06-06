tag @s[tag=nvon] remove nvon
tag @s[tag=nvoff] remove nvoff
tag @s[tag=nvenabled] add nvoff
tag @s[tag=!nvenabled] add nvon
effect @s[tag=nvon] night_vision 999999 255 true 
effect @s[tag=nvoff] night_vision 0
tellraw @s[tag=nvon] {"rawtext":[{"text":"§bNight Vision §fEnabled"}]}
tellraw @s[tag=nvoff] {"rawtext":[{"text":"§bNight Vision §fDisabled"}]}
playsound random.orb @s
tag @s[tag=nvon] add nvenabled
tag @s[tag=nvoff] remove nvenabled