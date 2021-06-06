"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capi = void 0;
const asmcode = require("./asm/asmcode");
const core_1 = require("./core");
const dll_1 = require("./dll");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
var capi;
(function (capi) {
    capi.nodeThreadId = dll_1.dll.kernel32.GetCurrentThreadId();
    capi.debugBreak = makefunc_1.makefunc.js(asmcode.debugBreak, nativetype_1.void_t);
    asmcode.nodeThreadId = capi.nodeThreadId;
    /**
     * @deprecated use chakraUtil.asJsValueRef
     */
    capi.getJsValueRef = core_1.chakraUtil.asJsValueRef;
    function createThread(functionPointer, param = null, stackSize = 0) {
        const out = new Uint32Array(1);
        const handle = dll_1.dll.kernel32.CreateThread(null, stackSize, functionPointer, param, 0, out);
        return [handle, out[0]];
    }
    capi.createThread = createThread;
    function beginThreadEx(functionPointer, param = null) {
        const out = new Uint32Array(1);
        const handle = dll_1.dll.ucrtbase._beginthreadex(null, 0, functionPointer, param, 0, out);
        return [handle, out[0]];
    }
    capi.beginThreadEx = beginThreadEx;
    /**
     * memory allocate by native c
     */
    capi.malloc = dll_1.dll.ucrtbase.malloc;
    /**
     * memory release by native c
     */
    capi.free = dll_1.dll.ucrtbase.free;
    function isRunningOnWine() {
        return dll_1.dll.ntdll.wine_get_version !== null;
    }
    capi.isRunningOnWine = isRunningOnWine;
    /**
     * Keep the object from GC
     */
    function permanent(v) {
        core_1.chakraUtil.JsAddRef(v);
        return v;
    }
    capi.permanent = permanent;
})(capi = exports.capi || (exports.capi = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQTBDO0FBQzFDLGlDQUFnRTtBQUNoRSwrQkFBMEM7QUFDMUMseUNBQXNDO0FBQ3RDLDZDQUFzQztBQUV0QyxJQUFpQixJQUFJLENBNkNwQjtBQTdDRCxXQUFpQixJQUFJO0lBRUosaUJBQVksR0FBRyxTQUFHLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFFakQsZUFBVSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0lBRWxFLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBQSxZQUFZLENBQUM7SUFFcEM7O09BRUc7SUFDVSxrQkFBYSxHQUE0QixpQkFBVSxDQUFDLFlBQVksQ0FBQztJQUU5RSxTQUFnQixZQUFZLENBQUMsZUFBMkIsRUFBRSxRQUF5QixJQUFJLEVBQUUsWUFBbUIsQ0FBQztRQUN6RyxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUplLGlCQUFZLGVBSTNCLENBQUE7SUFFRCxTQUFnQixhQUFhLENBQUMsZUFBMkIsRUFBRSxRQUF5QixJQUFJO1FBQ3BGLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLFNBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEYsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBSmUsa0JBQWEsZ0JBSTVCLENBQUE7SUFFRDs7T0FFRztJQUNVLFdBQU0sR0FBZ0MsU0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDdkU7O09BRUc7SUFDVSxTQUFJLEdBQTJCLFNBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRTlELFNBQWdCLGVBQWU7UUFDM0IsT0FBTyxTQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRmUsb0JBQWUsa0JBRTlCLENBQUE7SUFFRDs7T0FFRztJQUNILFNBQWdCLFNBQVMsQ0FBSSxDQUFHO1FBQzVCLGlCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUhlLGNBQVMsWUFHeEIsQ0FBQTtBQUNMLENBQUMsRUE3Q2dCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQTZDcEIifQ==