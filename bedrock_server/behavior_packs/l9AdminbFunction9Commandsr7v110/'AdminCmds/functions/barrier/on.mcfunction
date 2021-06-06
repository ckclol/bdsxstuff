tag @e[type=armor_stand,tag=offbarrier,r=10] add barrier
execute @e[type=armor_stand,tag=offbarrier,r=10] ~ ~ ~ particle minecraft:note_particle ~ ~ ~
tag @e[type=armor_stand,tag=barrier,tag=offbarrier,r=10] remove offbarrier
playsound random.orb @s