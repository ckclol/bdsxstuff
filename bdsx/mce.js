"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mce = void 0;
const proc_1 = require("./bds/proc");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const bin_1 = require("./bin");
var mce;
(function (mce) {
    mce.UUID = nativetype_1.bin128_t.extends({
        v1(uuid) {
            return uuid.charCodeAt(0) | (uuid.charCodeAt(1) << 16);
        },
        v2(uuid) {
            return uuid.charCodeAt(2);
        },
        v3(uuid) {
            return uuid.charCodeAt(3);
        },
        v4(uuid) {
            return uuid.substr(4);
        },
        generate() {
            return generateUUID().value;
        },
        toString(uuid) {
            const hex = bin_1.bin.hex(uuid);
            const u1 = hex.substr(0, 8);
            const u2 = hex.substr(8, 4);
            const u3 = hex.substr(12, 4);
            const u4 = hex.substr(16, 4);
            const u5 = hex.substr(20);
            return `${u1}-${u2}-${u3}-${u4}-${u5}`;
        },
    }, 'UUID');
    /** @deprecated use UUIDWrapper */
    mce.UUIDPointer = pointer_1.Pointer.make(mce.UUID);
    mce.UUIDWrapper = pointer_1.Wrapper.make(mce.UUID);
})(mce = exports.mce || (exports.mce = {}));
const generateUUID = proc_1.procHacker.js("Crypto::Random::generateUUID", mce.UUIDWrapper, { structureReturn: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUF3QztBQUN4Qyw2Q0FBcUU7QUFDckUsdUNBQTZDO0FBQzdDLCtCQUE0QjtBQUU1QixJQUFpQixHQUFHLENBZ0NuQjtBQWhDRCxXQUFpQixHQUFHO0lBRUgsUUFBSSxHQUFHLHFCQUFRLENBQUMsT0FBTyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFTO1lBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsRUFBRSxDQUFDLElBQVM7WUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNELEVBQUUsQ0FBQyxJQUFTO1lBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFDRCxFQUFFLENBQUMsSUFBUztZQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0QsUUFBUTtZQUNKLE9BQU8sWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxRQUFRLENBQUMsSUFBUztZQUNkLE1BQU0sR0FBRyxHQUFHLFNBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQzNDLENBQUM7S0FDSixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRVgsa0NBQWtDO0lBQ3JCLGVBQVcsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsZUFBVyxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0RCxDQUFDLEVBaENnQixHQUFHLEdBQUgsV0FBRyxLQUFILFdBQUcsUUFnQ25CO0FBRUQsTUFBTSxZQUFZLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDIn0=