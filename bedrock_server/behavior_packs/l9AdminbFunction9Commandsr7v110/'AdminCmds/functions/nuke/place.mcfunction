tag @s add nukey
summon armor_stand ~ ~-5 ~
tag @e[type=armor_stand,x=~,y=~-5,z=~,c=1,r=1] add nuke
replaceitem entity @e[type=armor_stand,tag=nuke] slot.armor.head 0 skull 1
tellraw @s {"rawtext":[{"text":"§cNuke §7placed.§r"}]}
tellraw @s {"rawtext":[{"text":"§cWarning! §7May get very laggy when detonating.§r"}]}
playsound beacon.activate @s
effect @e[type=armor_stand,tag=nuke] invisibility 9999 255 true