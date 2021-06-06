import { CANCEL, command, ipfilter, ServerPlayer, chat, nethook, PacketId, NetworkIdentifier, netevent, MinecraftPacketIds } from "bdsx";
import { enchantSelectedItem, Enchantment } from "bdsx/community/enchantFunction";
import { sendMessage, broadcastMessage } from "bdsx/send";
import { CxxString, int32_t } from "bdsx/nativetype";
import { events } from "bdsx/event";
import { LevelSettings, StartGamePacket } from "bdsx/bds/packets";
import { str2set } from "bdsx/util";

chat.on(ev=>{
   if (ev.message.startsWith('!')) {
       console.log(ev.message);
       broadcastMessage("mark ! " + ev.message);
      return CANCEL;
   }
});

// commands
events.serverOpen.on(() => {
    command.register('tempipban', 'temp ipban').overload((param, origin)=> {
        let player = origin.getEntity() as ServerPlayer;
        if (player.getCommandPermissionLevel() == 2) {
            console.log("unban" + param.ip, param.seconds);
            ipfilter.add(param.ip, param.seconds);
        }
    }, {
        ip: CxxString,
        seconds: int32_t
    });
    command.register('ipban', 'ipban').overload((param, origin)=> {
        let player = origin.getEntity() as ServerPlayer;
        if (player.getCommandPermissionLevel() == 2) {
            console.log("ban" + param.ip);
            ipfilter.add(param.ip);
        }
    }, {
        ip: CxxString,
    });
    command.register('unbanip', 'unban ip').overload((param, origin)=> {
        let player = origin.getEntity() as ServerPlayer;
        if (player.getCommandPermissionLevel() == 2) {
            console.log("unban" + param.ip);
            ipfilter.remove(param.ip);
        }
    }, {
        ip: CxxString
    });
    command.register('banself', 'ban yourself').overload((param, origin)=> {
        let player = origin.getEntity() as ServerPlayer;
        if (player.getCommandPermissionLevel() == 2) {
            let name = player.getName();
            let ip = player.getNetworkIdentifier().getAddress();
            console.log("banself" + name);
            ipfilter.add(ip);
        }
    }, {});
    command.register('ban', 'abuse admin powers').overload((param, origin)=> {
        let player = origin.getEntity() as ServerPlayer;
        if (player.getCommandPermissionLevel() == 2) {
            console.log("ban" + param.player.getName());
            ipfilter.add(param.player.getNetworkIdentifier().getAddress());
        }
    }, {
        player: CxxString
    });
    command.register('tempban', 'temping bans').overload((param, origin)=> {
        let player = origin.getEntity() as ServerPlayer;
        if (player.getCommandPermissionLevel() == 2) {
            console.log("tempban" + param.ip, param.seconds);
            ipfilter.add(param.ip, param.seconds);
        }
    }, {
        ip: CxxString,
        seconds: int32_t
    });
    command.register('test', 'bdsx command example').overload((param, origin, output)=>{
        console.log("test");
    },{});
    command.register('ench', 'Enchant unsafe enchants').overload((param, origin)=>{
        console.log("enchant");
        let player = origin.getEntity() as ServerPlayer;
    let permissionLevel = player.getPermissionLevel();
    if (permissionLevel !== 2) {
        sendMessage(player, "You don't have permission to use this command!");
        return CANCEL;
    }

    if (param.level > 32767 || param.level < -32768) {
        sendMessage(player, "Number must be <= to 32767 and >= -32768");
        return CANCEL;
    }

    enchantSelectedItem(player, Enchantment[param.enchantment], param.level, true);
    sendMessage(player, "Enchanted held item successfully");
}, {
    enchantment: CxxString,
    level: int32_t
});
});

nethook.after(PacketId.Login).on((ptr, netid, pkid)=>{
    const ip = netid.getAddress();
    const cert = ptr.connreq.cert;
    const xuid = cert.getXuid();
    const username = cert.getId();
    console.log(`${username}> IP=${ip}, XUID=${xuid}`);
    nethook.send(MinecraftPacketIds.StartGame).on(packet=>{
        packet.settings.seed = -0;
    });
});