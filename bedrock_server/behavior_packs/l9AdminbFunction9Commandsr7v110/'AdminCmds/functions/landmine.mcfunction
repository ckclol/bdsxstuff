tag @s add landminey
summon armor_stand ~ ~-1.85 ~
tag @e[type=armor_stand,x=~,y=~-1.85,z=~,c=1,r=1] add mine
replaceitem entity @e[type=armor_stand,tag=c4] slot.armor.head 0 skull 0
tellraw @s {"rawtext":[{"text":"§cLandmine §7placed.§r"}]}
playsound beacon.activate @s
effect @e[type=armor_stand,tag=mine] invisibility 9999 255 true