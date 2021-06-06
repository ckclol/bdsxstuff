execute @e[type=armor_stand,tag=barrier,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9Stats:§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=small,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9Size: §7Small§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=medium,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9Size: §7Medium§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=big,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9Size: §7Large§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=!pushitems,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9PushItems: §7False§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=pushitems,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9PushItems: §bTrue§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=!pushplayer,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9Pushplayer: §7False§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=pushplayer,r=10] ~ ~ ~ tellraw @a[r=10] {"rawtext":[{"text":"§9Pushplayer: §bTrue§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=!pushadmins,r=10] ~ ~ ~ tellraw @a[r=10,tag=admin] {"rawtext":[{"text":"§9Pushadmins: §7False§r"}]}
execute @e[type=armor_stand,tag=barrier,tag=pushadmins,r=10] ~ ~ ~ tellraw @a[r=10,tag=admin] {"rawtext":[{"text":"§9Pushadmins: §bTrue§r"}]}