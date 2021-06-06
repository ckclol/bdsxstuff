"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
const enchantFunction_1 = require("bdsx/community/enchantFunction");
const send_1 = require("bdsx/send");
const nativetype_1 = require("bdsx/nativetype");
const event_1 = require("bdsx/event");
bdsx_1.chat.on(ev => {
    if (ev.message.startsWith('!')) {
        console.log(ev.message);
        send_1.broadcastMessage("mark ! " + ev.message);
        return bdsx_1.CANCEL;
    }
});
// commands
event_1.events.serverOpen.on(() => {
    bdsx_1.command.register('tempipban', 'temp ipban').overload((param, origin) => {
        let player = origin.getEntity();
        if (player.getCommandPermissionLevel() == 2) {
            console.log("unban" + param.ip, param.seconds);
            bdsx_1.ipfilter.add(param.ip, param.seconds);
        }
    }, {
        ip: nativetype_1.CxxString,
        seconds: nativetype_1.int32_t
    });
    bdsx_1.command.register('ipban', 'ipban').overload((param, origin) => {
        let player = origin.getEntity();
        if (player.getCommandPermissionLevel() == 2) {
            console.log("ban" + param.ip);
            bdsx_1.ipfilter.add(param.ip);
        }
    }, {
        ip: nativetype_1.CxxString,
    });
    bdsx_1.command.register('unbanip', 'unban ip').overload((param, origin) => {
        let player = origin.getEntity();
        if (player.getCommandPermissionLevel() == 2) {
            console.log("unban" + param.ip);
            bdsx_1.ipfilter.remove(param.ip);
        }
    }, {
        ip: nativetype_1.CxxString
    });
    bdsx_1.command.register('banself', 'ban yourself').overload((param, origin) => {
        let player = origin.getEntity();
        if (player.getCommandPermissionLevel() == 2) {
            let name = player.getName();
            let ip = player.getNetworkIdentifier().getAddress();
            console.log("banself" + name);
            bdsx_1.ipfilter.add(ip);
        }
    }, {});
    bdsx_1.command.register('ban', 'abuse admin powers').overload((param, origin) => {
        let player = origin.getEntity();
        if (player.getCommandPermissionLevel() == 2) {
            console.log("ban" + param.player.getName());
            bdsx_1.ipfilter.add(param.player.getNetworkIdentifier().getAddress());
        }
    }, {
        player: nativetype_1.CxxString
    });
    bdsx_1.command.register('tempban', 'temping bans').overload((param, origin) => {
        let player = origin.getEntity();
        if (player.getCommandPermissionLevel() == 2) {
            console.log("tempban" + param.ip, param.seconds);
            bdsx_1.ipfilter.add(param.ip, param.seconds);
        }
    }, {
        ip: nativetype_1.CxxString,
        seconds: nativetype_1.int32_t
    });
    bdsx_1.command.register('test', 'bdsx command example').overload((param, origin, output) => {
        console.log("test");
    }, {});
    bdsx_1.command.register('ench', 'Enchant unsafe enchants').overload((param, origin) => {
        console.log("enchant");
        let player = origin.getEntity();
        let permissionLevel = player.getPermissionLevel();
        if (permissionLevel !== 2) {
            send_1.sendMessage(player, "You don't have permission to use this command!");
            return bdsx_1.CANCEL;
        }
        if (param.level > 32767 || param.level < -32768) {
            send_1.sendMessage(player, "Number must be <= to 32767 and >= -32768");
            return bdsx_1.CANCEL;
        }
        enchantFunction_1.enchantSelectedItem(player, enchantFunction_1.Enchantment[param.enchantment], param.level, true);
        send_1.sendMessage(player, "Enchanted held item successfully");
    }, {
        enchantment: nativetype_1.CxxString,
        level: nativetype_1.int32_t
    });
});
bdsx_1.nethook.after(bdsx_1.PacketId.Login).on((ptr, netid, pkid) => {
    const ip = netid.getAddress();
    const cert = ptr.connreq.cert;
    const xuid = cert.getXuid();
    const username = cert.getId();
    console.log(`${username}> IP=${ip}, XUID=${xuid}`);
    bdsx_1.nethook.send(bdsx_1.MinecraftPacketIds.StartGame).on(packet => {
        packet.settings.seed = -0;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF5STtBQUN6SSxvRUFBa0Y7QUFDbEYsb0NBQTBEO0FBQzFELGdEQUFxRDtBQUNyRCxzQ0FBb0M7QUFJcEMsV0FBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUEsRUFBRTtJQUNULElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsdUJBQWdCLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxPQUFPLGFBQU0sQ0FBQztLQUNoQjtBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUgsV0FBVztBQUNYLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixjQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLEVBQUU7UUFDbEUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBa0IsQ0FBQztRQUNoRCxJQUFJLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxlQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQyxFQUFFO1FBQ0MsRUFBRSxFQUFFLHNCQUFTO1FBQ2IsT0FBTyxFQUFFLG9CQUFPO0tBQ25CLENBQUMsQ0FBQztJQUNILGNBQU8sQ0FBQyxRQUFRLENB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