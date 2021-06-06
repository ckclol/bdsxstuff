function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Llama§7.§r"}]}
summon llama ~ ~ ~
tag @e[type=llama,c=1,r=1] add morph
tag @s add llama