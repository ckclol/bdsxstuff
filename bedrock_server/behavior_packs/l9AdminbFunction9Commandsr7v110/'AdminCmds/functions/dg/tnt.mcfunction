function runtime/disguiseoff
tellraw @s {"rawtext":[{"text":"§7Now disguised as §9TNT§7. §cWARNING! §7You will explode soon.§r"}]}
summon tnt ~ ~ ~
tag @e[type=tnt,c=1,r=1] add morph
tag @s add tnt