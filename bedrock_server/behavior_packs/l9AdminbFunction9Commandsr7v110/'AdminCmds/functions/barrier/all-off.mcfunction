tag @e[type=armor_stand,tag=barrier] add offbarrier
execute @e[type=armor_stand,tag=barrier] ~ ~ ~ particle minecraft:note_particle ~ ~ ~
tag @e[type=armor_stand,tag=barrier,tag=offbarrier] remove barrier
playsound random.orb @s