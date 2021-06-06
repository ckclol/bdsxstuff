import { MinecraftPacketIds, ServerPlayer } from ".";
import { TextPacket } from "./bds/packets";
import { events } from "./event";
import { NetworkIdentifier } from "./native";

let playerList = Array();

export function sendMessage(player: ServerPlayer, message: string) {
    let packet = TextPacket.create();
    packet.message = message;
    player.sendPacket(packet);
    packet.dispose();
}
events.packetAfter(MinecraftPacketIds.Login).on((ptr: any, netId: any) => {
    playerList.push(netId);
});
NetworkIdentifier.close.on(netId => {
    let index = playerList.indexOf(netId);
    if(index > -1) playerList.splice(index, 1);
});
export function broadcastMessage(message: string) {
    let packet = TextPacket.create();
    packet.type = TextPacket.Types.Raw; //Raw, Chat and Announcement TextPacket types do basically the same thing
    packet.message = message;
    playerList.forEach(netId => {
        packet.sendTo(netId);
    });
    packet.dispose();
}