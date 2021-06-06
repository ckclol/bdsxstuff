"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension = void 0;
const nativeclass_1 = require("bdsx/nativeclass");
const common_1 = require("../common");
const nativetype_1 = require("../nativetype");
const proc_1 = require("./proc");
class Dimension extends nativeclass_1.NativeClass {
    getDimensionId() {
        common_1.abstract();
    }
}
exports.Dimension = Dimension;
Dimension.prototype.getDimensionId = proc_1.procHacker.js('Dimension::getDimensionId', nativetype_1.int32_t, { this: Dimension, structureReturn: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGltZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGltZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtEQUErQztBQUMvQyxzQ0FBcUM7QUFFckMsOENBQXdDO0FBRXhDLGlDQUFvQztBQUVwQyxNQUFhLFNBQVUsU0FBUSx5QkFBVztJQUN0QyxjQUFjO1FBQ1YsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBSkQsOEJBSUM7QUFFRCxTQUFTLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxpQkFBVSxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxvQkFBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyJ9