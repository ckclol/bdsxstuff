execute @p[rm=0.1] ~ ~ ~ fill ~1 ~2 ~1 ~-1 ~-1 ~-1 obsidian 0 outline
execute @p[rm=0.1] ~ ~ ~ fill ~1 ~1 ~1 ~-1 ~1 ~-1 iron_bars 0 outline
execute @p[rm=0.1] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~ air 0 replace iron_bars 0
execute @p[rm=0.1] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~ air 0 replace obsidian 0
execute @p[rm=0.1] ~ ~ ~ particle minecraft:test_smoke_puff ~ ~ ~
playsound random.orb @s