tag @e[type=armor_stand,tag=offbarrier] add barrier
execute @e[type=armor_stand,tag=offbarrier] ~ ~ ~ particle minecraft:note_particle ~ ~ ~
tag @e[type=armor_stand,tag=barrier,tag=offbarrier] remove offbarrier
playsound random.orb @s