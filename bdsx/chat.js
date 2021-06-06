"use strict";
const krevent_1 = require("krevent");
const packetids_1 = require("./bds/packetids");
const common_1 = require("./common");
const event_1 = require("./event");
class ChatEventImpl {
    constructor(name, message, networkIdentifier) {
        this.name = name;
        this.message = message;
        this.networkIdentifier = networkIdentifier;
        this.isModified = false;
    }
    setName(name) {
        this.isModified = true;
        this.name = name;
    }
    setMessage(message) {
        this.isModified = true;
        this.message = message;
    }
}
class ChatManager extends krevent_1.EventEx {
    constructor() {
        super(...arguments);
        this.chatlistener = (ptr, networkIdentifier, packetId) => {
            const name = ptr.name;
            const message = ptr.message;
            const ev = new ChatEventImpl(name, message, networkIdentifier);
            if (this.fire(ev) === common_1.CANCEL)
                return common_1.CANCEL;
            if (ev.isModified) {
                ptr.name = ev.name;
                ptr.message = ev.message;
            }
        };
    }
    onStarted() {
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on(this.chatlistener);
    }
    onCleared() {
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).remove(this.chatlistener);
    }
    /** @deprecated use nethook.before(MinecraftPacketIds.Text).on */
    on(listener) {
        super.on(listener);
    }
}
module.exports = new ChatManager();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHFDQUFpRDtBQUVqRCwrQ0FBcUQ7QUFFckQscUNBQWtDO0FBQ2xDLG1DQUFpQztBQWVqQyxNQUFNLGFBQWE7SUFHZixZQUNXLElBQVcsRUFDWCxPQUFjLEVBQ2QsaUJBQW1DO1FBRm5DLFNBQUksR0FBSixJQUFJLENBQU87UUFDWCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUx2QyxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBTzFCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBVztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBYztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0NBQ0o7QUFHRCxNQUFNLFdBQVksU0FBUSxpQkFBcUI7SUFBL0M7O1FBQ3FCLGlCQUFZLEdBQUcsQ0FBQyxHQUFjLEVBQUUsaUJBQW1DLEVBQUUsUUFBMkIsRUFBYSxFQUFFO1lBQzVILE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUM1QixNQUFNLEVBQUUsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDL0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLGVBQU07Z0JBQUUsT0FBTyxlQUFNLENBQUM7WUFDNUMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFO2dCQUNmLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDbkIsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDO0lBYU4sQ0FBQztJQVhHLFNBQVM7UUFDTCxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELFNBQVM7UUFDTCxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxFQUFFLENBQUMsUUFBc0I7UUFDckIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFHRCxpQkFBUyxJQUFJLFdBQVcsRUFBaUMsQ0FBQyJ9