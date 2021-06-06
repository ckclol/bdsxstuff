summon armor_stand ~ ~ ~ 
tag @e[type=armor_stand,r=1,c=1,tag=!barrier] add barrier
tag @e[type=armor_stand,r=1,c=1,tag=barrier] add small
playsound random.orb @s
tellraw @s {"rawtext":[{"text":"§9Entity Barrier§f succesfully placed.§r"}]}
function stats