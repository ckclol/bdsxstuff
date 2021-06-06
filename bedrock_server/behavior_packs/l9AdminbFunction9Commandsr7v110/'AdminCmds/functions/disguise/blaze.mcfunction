function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9Blaze§7.§r"}]}
summon blaze ~ ~ ~
tag @e[type=blaze,c=1,r=1] add morph
tag @s add blaze