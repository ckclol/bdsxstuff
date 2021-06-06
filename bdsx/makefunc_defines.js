"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makefuncDefines = void 0;
const core_1 = require("./core");
exports.makefuncDefines = {
    fn_JsStringToPointer: -0x60,
    fn_JsCreateError: -0x58,
    fn_getout: -0x50,
    fn_str_np2js: -0x48,
    fn_str_js2np: -0x40,
    fn_stack_free_all: -0x38,
    fn_utf16_js2np: -0x30,
    fn_pointer_js2class: -0x28,
    fn_bin64: -0x20,
    fn_JsNumberToInt: -0x18,
    fn_JsBoolToBoolean: -0x10,
    fn_JsBooleanToBool: -0x08,
    fn_getout_invalid_parameter: 0x0,
    fn_JsIntToNumber: 0x08,
    fn_JsNumberToDouble: 0x10,
    fn_buffer_to_pointer: 0x18,
    fn_JsDoubleToNumber: 0x20,
    fn_JsPointerToString: 0x28,
    fn_ansi_np2js: 0x30,
    fn_utf8_np2js: 0x38,
    fn_utf16_np2js: 0x40,
    fn_pointer_np2js: 0x48,
    fn_pointer_np2js_nullable: 0x50,
    fn_getout_invalid_parameter_count: 0x58,
    fn_JsCallFunction: 0x60,
    fn_pointer_js_new: 0x68,
    fn_JsSetException: 0x70,
    fn_returnPoint: 0x78,
    asyncSize: core_1.uv_async.sizeOfTask,
    sizeOfCxxString: 0x20,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZWZ1bmNfZGVmaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1ha2VmdW5jX2RlZmluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWtDO0FBRXJCLFFBQUEsZUFBZSxHQUFHO0lBQzNCLG9CQUFvQixFQUFFLENBQUMsSUFBSTtJQUMzQixnQkFBZ0IsRUFBRSxDQUFDLElBQUk7SUFDdkIsU0FBUyxFQUFFLENBQUMsSUFBSTtJQUNoQixZQUFZLEVBQUUsQ0FBQyxJQUFJO0lBQ25CLFlBQVksRUFBRSxDQUFDLElBQUk7SUFDbkIsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJO0lBQ3hCLGNBQWMsRUFBRSxDQUFDLElBQUk7SUFDckIsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJO0lBQzFCLFFBQVEsRUFBRSxDQUFDLElBQUk7SUFDZixnQkFBZ0IsRUFBRSxDQUFDLElBQUk7SUFDdkIsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJO0lBQ3pCLGtCQUFrQixFQUFFLENBQUMsSUFBSTtJQUN6QiwyQkFBMkIsRUFBRSxHQUFHO0lBQ2hDLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsbUJBQW1CLEVBQUUsSUFBSTtJQUN6QixvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLG1CQUFtQixFQUFFLElBQUk7SUFDekIsb0JBQW9CLEVBQUUsSUFBSTtJQUMxQixhQUFhLEVBQUUsSUFBSTtJQUNuQixhQUFhLEVBQUUsSUFBSTtJQUNuQixjQUFjLEVBQUUsSUFBSTtJQUNwQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLHlCQUF5QixFQUFFLElBQUk7SUFDL0IsaUNBQWlDLEVBQUUsSUFBSTtJQUN2QyxpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixjQUFjLEVBQUUsSUFBSTtJQUVwQixTQUFTLEVBQUUsZUFBUSxDQUFDLFVBQVU7SUFDOUIsZUFBZSxFQUFFLElBQUk7Q0FDeEIsQ0FBQyJ9