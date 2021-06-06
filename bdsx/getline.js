"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLine = void 0;
const asmcode = require("./asm/asmcode");
const proc_1 = require("./bds/proc");
const capi_1 = require("./capi");
const core_1 = require("./core");
const dll_1 = require("./dll");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const getline = proc_1.proc2["??$getline@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@YAAEAV?$basic_istream@DU?$char_traits@D@std@@@0@$$QEAV10@AEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@0@D@Z"];
const string_ctor = nativetype_1.CxxString[nativetype_1.NativeType.ctor].pointer;
const string_dtor = nativetype_1.CxxString[nativetype_1.NativeType.dtor].pointer;
const string_size = nativetype_1.CxxString[nativetype_1.NativeType.size];
if (!string_ctor || !string_dtor) {
    throw Error('cannot find the constructor and the destructor of std::string');
}
asmcode.std_cin = dll_1.dll.msvcp140.std_cin;
asmcode.uv_async_alloc = core_1.uv_async.alloc;
asmcode.getLineProcessTask = makefunc_1.makefunc.np((asyncTask) => {
    const str = asyncTask.addAs(pointer_1.CxxStringWrapper, core_1.uv_async.sizeOfTask);
    const value = str.value;
    str[nativetype_1.NativeType.dtor]();
    const cb = asyncTask.getJsValueRef(core_1.uv_async.sizeOfTask + string_size);
    cb(value);
}, nativetype_1.void_t, null, core_1.StaticPointer);
asmcode.std_getline = getline;
asmcode.uv_async_post = core_1.uv_async.post;
asmcode.std_string_ctor = string_ctor;
// const endTask = makefunc.np((asyncTask:StaticPointer)=>{
//     const cb:GetLineCallback = asyncTask.getJsValueRef(uv_async.sizeOfTask);
//     cb(null);
// }, void_t, null, StaticPointer);
class GetLine {
    constructor(online) {
        this.online = online;
        core_1.chakraUtil.JsAddRef(this.online);
        core_1.uv_async.open();
        const [handle] = capi_1.capi.createThread(asmcode.getline, makefunc_1.makefunc.asJsValueRef(this.online));
        this.thread = handle;
    }
    close() {
        dll_1.dll.kernel32.TerminateThread(this.thread, 0);
        core_1.chakraUtil.JsRelease(this.online);
        core_1.uv_async.close();
    }
}
exports.GetLine = GetLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0bGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldGxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQTBDO0FBQzFDLHFDQUFtQztBQUNuQyxpQ0FBOEI7QUFDOUIsaUNBQTBFO0FBQzFFLCtCQUEwQztBQUMxQyx5Q0FBc0M7QUFDdEMsNkNBQTZEO0FBQzdELHVDQUE2QztBQUk3QyxNQUFNLE9BQU8sR0FBRyxZQUFLLENBQUMscUxBQXFMLENBQUMsQ0FBQztBQUM3TSxNQUFNLFdBQVcsR0FBZ0Isc0JBQVMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBUyxDQUFDLE9BQU8sQ0FBQztBQUM1RSxNQUFNLFdBQVcsR0FBZ0Isc0JBQVMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBUyxDQUFDLE9BQU8sQ0FBQztBQUM1RSxNQUFNLFdBQVcsR0FBRyxzQkFBUyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFL0MsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsRUFBRTtJQUM5QixNQUFNLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO0NBQ2hGO0FBRUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxTQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUN2QyxPQUFPLENBQUMsY0FBYyxHQUFHLGVBQVEsQ0FBQyxLQUFLLENBQUM7QUFDeEMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBdUIsRUFBQyxFQUFFO0lBQ2hFLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsMEJBQWdCLEVBQUUsZUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDeEIsR0FBRyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN2QixNQUFNLEVBQUUsR0FBbUIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxlQUFRLENBQUMsVUFBVSxHQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BGLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNkLENBQUMsRUFBRSxtQkFBTSxFQUFFLElBQUksRUFBRSxvQkFBYSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFDOUIsT0FBTyxDQUFDLGFBQWEsR0FBRyxlQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3RDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO0FBRXRDLDJEQUEyRDtBQUMzRCwrRUFBK0U7QUFDL0UsZ0JBQWdCO0FBQ2hCLG1DQUFtQztBQUVuQyxNQUFhLE9BQU87SUFFaEIsWUFBNkIsTUFBMEI7UUFBMUIsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDbkQsaUJBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLG1CQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLO1FBQ0QsU0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsZUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQWZELDBCQWVDIn0=