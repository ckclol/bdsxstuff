

#These Features are all in development so some of them might not work
#dont copy
hide


#Mystery Box

scoreboard players set @e[scores={mboxtimer=-1}] mboxtimer 0
execute @e[type=armor_stand,tag=mbox2] ~ ~ ~ tp ~ ~ ~
scoreboard objectives add mboxtimer dummy §5MysteryBoxTimer
scoreboard players remove @e[type=armor_stand,tag=mysterybox] mboxtimer 1
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ tp @e[type=armor_stand,c=1,r=5,tag=mbox2] ~ ~3 ~
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ effect @e[type=armor_stand,r=5,tag=mbox2] invisibility 1 255 true
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=!mbox] ~ ~ ~ scoreboard players set @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1] mboxtimer 100
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ tag @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1] add mbox
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~ execute @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1,scores={mboxtimer=100}] ~ ~ ~ tag @s add running
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~ execute @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1,tag=running] ~ ~ ~ particle minecraft:totem_particle ~ ~4 ~
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~ execute @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1,tag=running] ~ ~ ~ execute @e[type=armor_stand,tag=mbox2,c=1,r=2,x=~,y=~3,z=~] ~ ~ ~ tp ~ ~ ~ ~5 ~5
replaceitem entity @e[type=armor_stand,tag=mbox2] slot.armor.head 0 skull
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~ execute @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1,tag=running] ~ ~ ~ execute @e[type=armor_stand,tag=mbox2,c=1,r=2,x=~,y=~3,z=~] ~ ~ ~ particle minecraft:lava_particle ~ ~3 ~
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~ execute @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1,tag=!running] ~ ~ ~ kill @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox]
execute @e[type=armor_stand,tag=mysterybox] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~ execute @e[type=armor_stand,tag=mysterybox,x=~,y=~-4,z=~,r=3,c=1,scores={mboxtimer=0}] ~ ~ ~ tag @s remove running
execute @e[type=armor_stand,tag=mysterybox,tag=running] ~ ~ ~ execute @e[type=item,name="Diamond",x=~,y=~4,z=~,r=2,c=1,tag=mbox] ~ ~ ~


#Spawn

effect @e[type=armor_stand,tag=spawn] invisibility 999 255 true
effect @e[type=armor_stand,tag=spawn] resistance 999 255 true
effect @e[type=armor_stand,tag=spawn] fire_resistance 999 255 true
execute @e[type=armor_stand,tag=spawn] ~ ~ ~ tp ~ ~ ~ 
execute @e[type=armor_stand,tag=spawn] ~ ~ ~ particle minecraft:end_chest ~ ~4 ~
execute @e[type=armor_stand,tag=spawn] ~ ~ ~ tickingarea add ~5 ~ ~5 ~-5 ~20 ~-5 spawn
execute @e[type=armor_stand,tag=spawn,tag=protect] ~ ~ ~ effect @a[x=~,y=~4,z=~,r=20] mining_fatigue 1 255 true
execute @e[type=armor_stand,tag=spawn,tag=protect] ~ ~ ~ effect @a[x=~,y=~4,z=~,r=20] resistance 1 255 true
execute @e[type=armor_stand,tag=spawn,tag=protect] ~ ~ ~ effect @a[x=~,y=~4,z=~,r=20] fire_resistance 1 255 true
execute @e[type=armor_stand,tag=spawn,tag=protect] ~ ~ ~ effect @a[x=~,y=~4,z=~,r=20] water_breathing 1 255 true