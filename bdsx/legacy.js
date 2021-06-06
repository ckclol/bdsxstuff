"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacy = void 0;
const core_1 = require("./core");
const source_map_support_1 = require("./source-map-support");
let onRuntimeError = null;
/**
 * @deprecated legacy support
 */
var legacy;
(function (legacy) {
    /**
     * @deprecated just catch it from bedrockServer.launch()
     */
    function setOnRuntimeErrorListener(cb) {
        onRuntimeError = cb;
    }
    legacy.setOnRuntimeErrorListener = setOnRuntimeErrorListener;
    /**
     * @deprecated this is a implementation for mimic old bdsx
     */
    function catchAndSendToRuntimeErrorListener(err) {
        source_map_support_1.remapError(err);
        if (!(err instanceof core_1.RuntimeError)) {
            console.error(err.stack || err.message);
            return;
        }
        let defmsg = true;
        const lastSender = core_1.ipfilter.getLastSender();
        if (onRuntimeError !== null) {
            try {
                defmsg = onRuntimeError(err.stack, err.nativeStack || '', lastSender) !== false;
            }
            catch (err) {
                const errstr = err.stack;
                console.log("[Error in onRuntimeError callback]");
                console.log(errstr);
            }
        }
    }
    legacy.catchAndSendToRuntimeErrorListener = catchAndSendToRuntimeErrorListener;
})(legacy = exports.legacy || (exports.legacy = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGVnYWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFnRDtBQUNoRCw2REFBa0Q7QUFHbEQsSUFBSSxjQUFjLEdBQXFGLElBQUksQ0FBQztBQUU1Rzs7R0FFRztBQUNILElBQWlCLE1BQU0sQ0FrQ3RCO0FBbENELFdBQWlCLE1BQU07SUFHbkI7O09BRUc7SUFDSCxTQUFnQix5QkFBeUIsQ0FBQyxFQUFvRjtRQUMxSCxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFGZSxnQ0FBeUIsNEJBRXhDLENBQUE7SUFFRDs7T0FFRztJQUNILFNBQWdCLGtDQUFrQyxDQUFDLEdBQVM7UUFDeEQsK0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksbUJBQVksQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWxCLE1BQU0sVUFBVSxHQUFHLGVBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUU1QyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDekIsSUFBSTtnQkFDQSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLEtBQUssS0FBSyxDQUFDO2FBQ3BGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQU0sQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0o7SUFDTCxDQUFDO0lBbkJlLHlDQUFrQyxxQ0FtQmpELENBQUE7QUFFTCxDQUFDLEVBbENnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFrQ3RCIn0=