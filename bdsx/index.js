"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bedrockServer = exports.analyzer = exports.capi = exports.SharedPtr = exports.AttributeId = exports.DimensionId = exports.bin = exports.NativeModule = exports.nativetype = exports.serverInstance = exports.native = exports.netevent = exports.chat = exports.serverControl = exports.command = exports.nethook = exports.MinecraftPacketIds = exports.ServerPlayer = exports.Actor = exports.NetworkIdentifier = exports.loadMap = exports.setOnErrorListener = exports.setOnRuntimeErrorListener = exports.PacketId = exports.RawTypeId = exports.CANCEL = exports.sendPacket = exports.createPacket = exports.jshook = exports.ipfilter = exports.NativePointer = exports.StaticPointer = exports.VoidPointer = void 0;
if (global.bdsx !== undefined) {
    throw Error('bdsx is imported twice');
}
global.bdsx = true;
require("./polyfill");
require("./bds/enumfiller");
const analyzer_1 = require("./analyzer");
Object.defineProperty(exports, "analyzer", { enumerable: true, get: function () { return analyzer_1.analyzer; } });
const actor_1 = require("./bds/actor");
Object.defineProperty(exports, "Actor", { enumerable: true, get: function () { return actor_1.Actor; } });
Object.defineProperty(exports, "DimensionId", { enumerable: true, get: function () { return actor_1.DimensionId; } });
const attribute_1 = require("./bds/attribute");
Object.defineProperty(exports, "AttributeId", { enumerable: true, get: function () { return attribute_1.AttributeId; } });
const networkidentifier_1 = require("./bds/networkidentifier");
Object.defineProperty(exports, "NetworkIdentifier", { enumerable: true, get: function () { return networkidentifier_1.NetworkIdentifier; } });
const packetids_1 = require("./bds/packetids");
Object.defineProperty(exports, "MinecraftPacketIds", { enumerable: true, get: function () { return packetids_1.MinecraftPacketIds; } });
const player_1 = require("./bds/player");
Object.defineProperty(exports, "ServerPlayer", { enumerable: true, get: function () { return player_1.ServerPlayer; } });
const server_1 = require("./bds/server");
Object.defineProperty(exports, "serverInstance", { enumerable: true, get: function () { return server_1.serverInstance; } });
const bin_1 = require("./bin");
Object.defineProperty(exports, "bin", { enumerable: true, get: function () { return bin_1.bin; } });
const capi_1 = require("./capi");
Object.defineProperty(exports, "capi", { enumerable: true, get: function () { return capi_1.capi; } });
const common = require("./common");
const makefunc = require("./makefunc");
const dll_1 = require("./dll");
Object.defineProperty(exports, "NativeModule", { enumerable: true, get: function () { return dll_1.NativeModule; } });
const legacy_1 = require("./legacy");
const nethook_1 = require("./nethook");
Object.defineProperty(exports, "nethook", { enumerable: true, get: function () { return nethook_1.nethook; } });
const servercontrol_1 = require("./servercontrol");
Object.defineProperty(exports, "serverControl", { enumerable: true, get: function () { return servercontrol_1.serverControl; } });
const sharedpointer_1 = require("./sharedpointer");
Object.defineProperty(exports, "SharedPtr", { enumerable: true, get: function () { return sharedpointer_1.SharedPtr; } });
const util_1 = require("./util");
const launcher_1 = require("./launcher");
Object.defineProperty(exports, "bedrockServer", { enumerable: true, get: function () { return launcher_1.bedrockServer; } });
const makefuncModule = require("./makefunc");
const core = require("./core");
const netevent = require("./netevent");
exports.netevent = netevent;
const chat = require("./chat");
exports.chat = chat;
const nativetype = require("./nativetype");
exports.nativetype = nativetype;
const native = require("./native");
exports.native = native;
exports.VoidPointer = core.VoidPointer;
exports.StaticPointer = core.StaticPointer;
exports.NativePointer = core.NativePointer;
exports.ipfilter = core.ipfilter;
exports.jshook = core.jshook;
exports.createPacket = nethook_1.nethook.createPacket;
exports.sendPacket = nethook_1.nethook.sendPacket;
exports.CANCEL = common.CANCEL;
exports.RawTypeId = makefunc.RawTypeId;
/** @deprecated use MinecraftPacketIds, matching to the original name  */
exports.PacketId = packetids_1.MinecraftPacketIds;
const command_1 = require("./command");
Object.defineProperty(exports, "command", { enumerable: true, get: function () { return command_1.command; } });
common.RawTypeId = makefunc.RawTypeId;
exports.NativePointer.prototype.readHex = function (size, nextLinePer = 16) {
    return util_1.hex(this.readBuffer(size), nextLinePer);
};
exports.NativePointer.prototype.analyze = function () {
    return analyzer_1.analyzer.analyze(this);
};
core.makefunc = makefuncModule.makefunc;
/**
 * @deprecated use bedrockServer.close.on
 */
exports.setOnRuntimeErrorListener = legacy_1.legacy.setOnRuntimeErrorListener;
/**
 * Catch global errors.
 * the default error printing is disabled if cb returns false.
 * @deprecated use bedrockServer.error.on
 */
exports.setOnErrorListener = native.setOnErrorListener;
/**
 * @deprecated use analyzer.loadMap
 */
exports.loadMap = analyzer_1.analyzer.loadMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTQSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0lBQzNCLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Q0FDekM7QUFDRCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUduQixzQkFBb0I7QUFDcEIsNEJBQTBCO0FBRTFCLHlDQUFzQztBQStKbEMseUZBL0pLLG1CQUFRLE9BK0pMO0FBOUpaLHVDQUFpRDtBQTZJN0Msc0ZBN0lLLGFBQUssT0E2SUw7QUFhTCw0RkExSlksbUJBQVcsT0EwSlo7QUF6SmYsK0NBQThDO0FBMEoxQyw0RkExSkssdUJBQVcsT0EwSkw7QUF6SmYsK0RBQTREO0FBMEl4RCxrR0ExSUsscUNBQWlCLE9BMElMO0FBeklyQiwrQ0FBcUQ7QUE0SWpELG1HQTVJSyw4QkFBa0IsT0E0SUw7QUEzSXRCLHlDQUE0QztBQTBJeEMsNkZBMUlLLHFCQUFZLE9BMElMO0FBekloQix5Q0FBOEM7QUFpSjFDLCtGQWpKSyx1QkFBYyxPQWlKTDtBQWhKbEIsK0JBQTRCO0FBbUp4QixvRkFuSkssU0FBRyxPQW1KTDtBQWxKUCxpQ0FBOEI7QUFzSjFCLHFGQXRKSyxXQUFJLE9Bc0pMO0FBckpSLG1DQUFvQztBQUNwQyx1Q0FBd0M7QUFDeEMsK0JBQXFDO0FBOElqQyw2RkE5SUssa0JBQVksT0E4SUw7QUE3SWhCLHFDQUFrQztBQUNsQyx1Q0FBb0M7QUFvSWhDLHdGQXBJSyxpQkFBTyxPQW9JTDtBQW5JWCxtREFBZ0Q7QUFxSTVDLDhGQXJJSyw2QkFBYSxPQXFJTDtBQXBJakIsbURBQTRDO0FBOEl4QywwRkE5SUsseUJBQVMsT0E4SUw7QUE3SWIsaUNBQTZCO0FBQzdCLHlDQUEyQztBQStJdkMsOEZBL0lLLHdCQUFhLE9BK0lMO0FBN0lqQiw2Q0FBOEM7QUFDOUMsK0JBQWdDO0FBQ2hDLHVDQUF3QztBQWdJcEMsNEJBQVE7QUEvSFosK0JBQWdDO0FBOEg1QixvQkFBSTtBQTdIUiwyQ0FBNEM7QUFpSXhDLGdDQUFVO0FBaElkLG1DQUFvQztBQThIaEMsd0JBQU07QUE1SEksUUFBQSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUMvQixRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQ25DLFFBQUEsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDbkMsUUFBQSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUN6QixRQUFBLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3JCLFFBQUEsWUFBWSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDO0FBQ3BDLFFBQUEsVUFBVSxHQUFHLGlCQUFPLENBQUMsVUFBVSxDQUFDO0FBQ2hDLFFBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDdkIsUUFBQSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUU3Qyx5RUFBeUU7QUFDM0QsUUFBQSxRQUFRLEdBQUcsOEJBQWtCLENBQUM7QUFDNUMsdUNBQW9DO0FBNEdoQyx3RkE1R0ssaUJBQU8sT0E0R0w7QUFoR1gsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO0FBaUV0QyxxQkFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBUyxJQUFXLEVBQUUsY0FBcUIsRUFBRTtJQUMzRSxPQUFPLFVBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQztBQUNGLHFCQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRztJQUM5QixPQUFPLG1CQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQztBQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUN4Qzs7R0FFRztBQUNVLFFBQUEseUJBQXlCLEdBQUcsZUFBTSxDQUFDLHlCQUF5QixDQUFDO0FBRzFFOzs7O0dBSUc7QUFDVSxRQUFBLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztBQUU1RDs7R0FFRztBQUNVLFFBQUEsT0FBTyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDIn0=