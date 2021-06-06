"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastMessage = exports.sendMessage = void 0;
const _1 = require(".");
const packets_1 = require("./bds/packets");
const event_1 = require("./event");
const native_1 = require("./native");
let playerList = Array();
function sendMessage(player, message) {
    let packet = packets_1.TextPacket.create();
    packet.message = message;
    player.sendPacket(packet);
    packet.dispose();
}
exports.sendMessage = sendMessage;
event_1.events.packetAfter(_1.MinecraftPacketIds.Login).on((ptr, netId) => {
    playerList.push(netId);
});
native_1.NetworkIdentifier.close.on(netId => {
    let index = playerList.indexOf(netId);
    if (index > -1)
        playerList.splice(index, 1);
});
function broadcastMessage(message) {
    let packet = packets_1.TextPacket.create();
    packet.type = packets_1.TextPacket.Types.Raw; //Raw, Chat and Announcement TextPacket types do basically the same thing
    packet.message = message;
    playerList.forEach(netId => {
        packet.sendTo(netId);
    });
    packet.dispose();
}
exports.broadcastMessage = broadcastMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0JBQXFEO0FBQ3JELDJDQUEyQztBQUMzQyxtQ0FBaUM7QUFDakMscUNBQTZDO0FBRTdDLElBQUksVUFBVSxHQUFHLEtBQUssRUFBRSxDQUFDO0FBRXpCLFNBQWdCLFdBQVcsQ0FBQyxNQUFvQixFQUFFLE9BQWU7SUFDN0QsSUFBSSxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBTEQsa0NBS0M7QUFDRCxjQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQVEsRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNyRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsMEJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUMvQixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsT0FBZTtJQUM1QyxJQUFJLE1BQU0sR0FBRyxvQkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMseUVBQXlFO0lBQzdHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBUkQsNENBUUMifQ==