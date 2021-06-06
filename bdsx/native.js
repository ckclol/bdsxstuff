"use strict";
/**
 * @deprecated redirection for old bdsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPdb = exports.free = exports.malloc = exports.std$_Allocate$16 = exports.NativeModule = exports.SharedPointer = exports.Actor = exports.NativePointer = exports.StaticPointer = exports.NetworkIdentifier = exports.nethook = exports.serverControl = exports.ipfilter = exports.setOnCommandListener = exports.setOnRuntimeErrorListener = exports.setOnErrorListener = void 0;
const core = require("./core");
const actor_1 = require("./bds/actor");
const networkidentifier_1 = require("./bds/networkidentifier");
const capi_1 = require("./capi");
const cxxvector_1 = require("./cxxvector");
const dll_1 = require("./dll");
const legacy_1 = require("./legacy");
const nethook_1 = require("./nethook");
const servercontrol_1 = require("./servercontrol");
const sharedpointer_1 = require("./sharedpointer");
function defaultErrorMethod(err) {
    console.error(err);
}
/**
 * Catch global errors
 * default error printing is disabled if cb returns false
 * @deprecated use bedrockServer.error.on
 */
function setOnErrorListener(cb) {
    if (cb) {
        core.jshook.setOnError(err => {
            if (cb(err) !== false) {
                console.error(err.stack || (err + ''));
            }
        });
    }
    else {
        core.jshook.setOnError(defaultErrorMethod);
    }
}
exports.setOnErrorListener = setOnErrorListener;
/**
 * @deprecated use bedrockServer.close.on
 */
exports.setOnRuntimeErrorListener = legacy_1.legacy.setOnRuntimeErrorListener;
/**
 * @deprecated
 */
function setOnCommandListener(cb) {
    throw Error('not implemented');
}
exports.setOnCommandListener = setOnCommandListener;
/**
 * @deprecated use bdsx.ipfilter
 */
exports.ipfilter = core.ipfilter;
/**
 * @deprecated use bdsx.serverControl
 */
exports.serverControl = servercontrol_1.serverControl;
/**
 * @deprecated use bdsx.nethook
*/
exports.nethook = nethook_1.nethook;
/**
 * @deprecated use bdsx.NetworkIdentifier
*/
exports.NetworkIdentifier = networkidentifier_1.NetworkIdentifier;
/**
 * @deprecated use bdsx.StaticPointer
*/
exports.StaticPointer = core.StaticPointer;
/**
 * @deprecated use bdsx.NativePointer
*/
exports.NativePointer = core.NativePointer;
/**
 * @deprecated use bdsx.Actor
*/
exports.Actor = actor_1.Actor;
/**
 * @deprecated use bdsx.SharedPtr
 */
exports.SharedPointer = sharedpointer_1.SharedPointer;
/**
 * @deprecated use bdsx.NativeModule
 */
exports.NativeModule = dll_1.NativeModule;
/**
 * the alloc function for std::vector
 * @deprecated why are you using it?, use capi.malloc
 */
exports.std$_Allocate$16 = cxxvector_1.CxxVector._alloc16;
/**
 * memory allocate by native c
 * @deprecated use capi.malloc
 */
exports.malloc = capi_1.capi.malloc;
/**
 * memory release by native c
 * @deprecated use capi.free
 */
exports.free = capi_1.capi.free;
/**
 * @deprecated use analyzer.loadMap
 */
function loadPdb() {
    return core.pdb.getAll();
}
exports.loadPdb = loadPdb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7O0FBRUgsK0JBQWdDO0FBQ2hDLHVDQUFtRDtBQUNuRCwrREFBdUY7QUFDdkYsaUNBQThCO0FBQzlCLDJDQUF3QztBQUN4QywrQkFBMkQ7QUFDM0QscUNBQWtDO0FBQ2xDLHVDQUFxRDtBQUNyRCxtREFBdUU7QUFDdkUsbURBQXVFO0FBRXZFLFNBQVMsa0JBQWtCLENBQUMsR0FBUztJQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsRUFBeUM7SUFDeEUsSUFBSSxFQUFFLEVBQUU7UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUEsRUFBRTtZQUN4QixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTjtTQUFNO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUM5QztBQUNMLENBQUM7QUFWRCxnREFVQztBQUdEOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBRyxlQUFNLENBQUMseUJBQXlCLENBQUM7QUFFMUU7O0dBRUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxFQUE2RDtJQUM5RixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCxvREFFQztBQUVEOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUV0Qzs7R0FFRztBQUNVLFFBQUEsYUFBYSxHQUFHLDZCQUFtQixDQUFDO0FBRWpEOztFQUVFO0FBQ1csUUFBQSxPQUFPLEdBQUcsaUJBQWEsQ0FBQztBQUVyQzs7RUFFRTtBQUNXLFFBQUEsaUJBQWlCLEdBQUcscUNBQXVCLENBQUM7QUFNekQ7O0VBRUU7QUFDVyxRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBR2hEOztFQUVFO0FBQ1csUUFBQSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUdoRDs7RUFFRTtBQUNXLFFBQUEsS0FBSyxHQUFHLGFBQVcsQ0FBQztBQUdqQzs7R0FFRztBQUNVLFFBQUEsYUFBYSxHQUFHLDZCQUFtQixDQUFDO0FBR2pEOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFHL0M7OztHQUdHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBRyxxQkFBUyxDQUFDLFFBQVEsQ0FBQztBQUVuRDs7O0dBR0c7QUFDVSxRQUFBLE1BQU0sR0FBRyxXQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2xDOzs7R0FHRztBQUNVLFFBQUEsSUFBSSxHQUFHLFdBQUksQ0FBQyxJQUFJLENBQUM7QUFFOUI7O0dBRUc7QUFDSCxTQUFnQixPQUFPO0lBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBRkQsMEJBRUMifQ==