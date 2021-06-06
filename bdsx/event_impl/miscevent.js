"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRegenerateEvent = void 0;
const proc_1 = require("../bds/proc");
const server_1 = require("../bds/server");
const core_1 = require("../core");
const event_1 = require("../event");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
class QueryRegenerateEvent {
    constructor(motd, levelname, currentPlayers, maxPlayers) {
        this.motd = motd;
        this.levelname = levelname;
        this.currentPlayers = currentPlayers;
        this.maxPlayers = maxPlayers;
    }
}
exports.QueryRegenerateEvent = QueryRegenerateEvent;
event_1.events.serverOpen.on(() => {
    const _onQueryRegenerate = proc_1.procHacker.hooking("RakNetServerLocator::announceServer", nativetype_1.bin64_t, null, core_1.VoidPointer, pointer_1.CxxStringWrapper, pointer_1.CxxStringWrapper, core_1.VoidPointer, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.bool_t)(onQueryRegenerate);
    function onQueryRegenerate(rakNetServerLocator, motd, levelname, gameType, currentPlayers, maxPlayers, v) {
        const event = new QueryRegenerateEvent(motd.value, levelname.value, currentPlayers, maxPlayers);
        event_1.events.queryRegenerate.fire(event);
        motd.value = event.motd;
        levelname.value = event.levelname;
        return _onQueryRegenerate(rakNetServerLocator, motd, levelname, gameType, event.currentPlayers, event.maxPlayers, v);
    }
    server_1.serverInstance.minecraft.something.shandler.updateServerAnnouncement();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzY2V2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWlzY2V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0Msa0NBQXNDO0FBQ3RDLG9DQUFrQztBQUNsQyw4Q0FBeUQ7QUFDekQsd0NBQThDO0FBUzlDLE1BQWEsb0JBQW9CO0lBQzdCLFlBQ1csSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLGNBQXNCLEVBQ3RCLFVBQWtCO1FBSGxCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVE7SUFFN0IsQ0FBQztDQUNKO0FBUkQsb0RBUUM7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsTUFBTSxrQkFBa0IsR0FBRyxpQkFBVSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxvQkFBTyxFQUFFLElBQUksRUFBRSxrQkFBVyxFQUFFLDBCQUFnQixFQUFFLDBCQUFnQixFQUFFLGtCQUFXLEVBQUUsb0JBQU8sRUFBRSxvQkFBTyxFQUFFLG1CQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9NLFNBQVMsaUJBQWlCLENBQUMsbUJBQWdDLEVBQUUsSUFBc0IsRUFBRSxTQUEyQixFQUFFLFFBQXFCLEVBQUUsY0FBc0IsRUFBRSxVQUFrQixFQUFFLENBQVU7UUFDM0wsTUFBTSxLQUFLLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hHLGNBQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN4QixTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDbEMsT0FBTyxrQkFBa0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUNELHVCQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQyJ9