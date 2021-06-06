tag @e[type=armor_stand,tag=barrier,r=10] add offbarrier
execute @e[type=armor_stand,tag=barrier,r=10] ~ ~ ~ particle minecraft:note_particle ~ ~ ~
tag @e[type=armor_stand,tag=barrier,tag=offbarrier,r=10] remove barrier
playsound random.orb @s