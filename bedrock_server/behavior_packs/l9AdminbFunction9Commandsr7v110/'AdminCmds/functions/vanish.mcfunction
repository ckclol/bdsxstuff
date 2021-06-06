tag @s remove getvanish
tag @s remove unvanish
tag @s[tag=vanished] add unvanish
tag @s[tag=!vanished] add getvanish
tellraw @s[tag=getvanish] {"rawtext":[{"text":"§9§l[§b+§9]§r §fYou §bDisappeared§f!§r"}]}
tellraw @s[tag=unvanish] {"rawtext":[{"text":"§9§l[§b+§9]§r §fYou §bReappeared§f!§r"}]}
tellraw @s[tag=!ftime] {"rawtext":[{"text":"§9§l[§b+§9]§r §cWarning§f: You are still §cvisible§f in §cPlayerlist§f!§r"}]}
tag @s[tag=!ftime] add ftime
effect @s[tag=unvanish] invisibility 0
effect @s[tag=unvanish] night_vision 0
effect @s[tag=unvanish] invisibility 100000 0 true
effect @s[tag=unvanish] night_vision 100000 0 true
tag @s[tag=unvanish] remove vanished
tag @s[tag=getvanish] add vanished
tag @s[tag=unvanish] add unvanished
tag @s[tag=getvanish] remove unvanished