tag @s[tag=teon] remove teon
tag @s[tag=teoff] remove teoff
tag @s[tag=terrainedit] add teoff
tag @s[tag=!terrainedit] add teon
tellraw @s[tag=teon] {"rawtext":[{"text":"§fEnabled §2Terrainedit"}]}
tellraw @s[tag=teoff] {"rawtext":[{"text":"§fDisabled §2Terrainedit"}]}
playsound random.orb @s
tag @s[tag=teon,tag=!ter20,tag=!ter5,tag=!ter10] add ter10
tag @s[tag=teon,tag=!brush1,tag=!brush5,tag=!brush10] add brush3
tag @s[tag=teon] add terrainedit
tag @s[tag=teoff] remove terrainedit