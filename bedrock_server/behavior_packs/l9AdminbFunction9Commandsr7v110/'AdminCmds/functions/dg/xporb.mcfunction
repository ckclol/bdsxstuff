function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9XP Orb§7.§r"}]}
summon xp_orb ^ ^ ^-1
tag @e[type=xp_orb,c=1,r=1] add morph
tag @s add xp_orb