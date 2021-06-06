tellraw @a {"rawtext":[{"text":"§eHerobrine joined the game"}]}
execute @a ~ ~ ~ execute @e[type=!item,type=!armor_stand,tag=!admin,r=100,c=20] ~ ~ ~ summon lightning_bolt ~ ~1 ~
effect @a[tag=!admin] blindness 3 255 true
effect @a[tag=!admin] nausea 5 255 true
tellraw @a[tag=admin] {"rawtext":[{"text":"§cHerobrine Troll §fexecuted."}]}
playsound random.orb @a[tag=admin]