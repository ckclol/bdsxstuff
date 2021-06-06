tag @s add c4d
summon armor_stand ~ ~-1.85 ~
tag @e[type=armor_stand,x=~,y=~-1.85,z=~,c=1,r=1] add c4
replaceitem entity @e[type=armor_stand,tag=c4] slot.armor.head 0 skull 1 1
tellraw @s {"rawtext":[{"text":"§cC4 §7placed.§r"}]}
playsound beacon.activate @s
effect @e[type=armor_stand,tag=c4] invisibility 9999 255 true