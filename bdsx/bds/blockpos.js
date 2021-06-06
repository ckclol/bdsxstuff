"use strict";
var BlockPos_1, Vec3_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelativeFloat = exports.Vec3 = exports.BlockPos = void 0;
const tslib_1 = require("tslib");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
let BlockPos = BlockPos_1 = class BlockPos extends nativeclass_1.NativeClass {
    static create(x, y, z) {
        const v = new BlockPos_1(true);
        v.x = x;
        v.y = y;
        v.z = z;
        return v;
    }
    toJSON() {
        return { x: this.x, y: this.y, z: this.z };
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], BlockPos.prototype, "x", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], BlockPos.prototype, "y", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.int32_t)
], BlockPos.prototype, "z", void 0);
BlockPos = BlockPos_1 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], BlockPos);
exports.BlockPos = BlockPos;
let Vec3 = Vec3_1 = class Vec3 extends nativeclass_1.NativeClass {
    static create(x, y, z) {
        const v = new Vec3_1(true);
        v.x = x;
        v.y = y;
        v.z = z;
        return v;
    }
    toJSON() {
        return { x: this.x, y: this.y, z: this.z };
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], Vec3.prototype, "x", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], Vec3.prototype, "y", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], Vec3.prototype, "z", void 0);
Vec3 = Vec3_1 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], Vec3);
exports.Vec3 = Vec3;
let RelativeFloat = class RelativeFloat extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.float32_t)
], RelativeFloat.prototype, "value", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bool_t)
], RelativeFloat.prototype, "is_relative", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.bin64_t, 0)
], RelativeFloat.prototype, "bin_value", void 0);
RelativeFloat = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], RelativeFloat);
exports.RelativeFloat = RelativeFloat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2twb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9ja3Bvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF1RTtBQUN2RSw4Q0FBOEU7QUFHOUUsSUFBYSxRQUFRLGdCQUFyQixNQUFhLFFBQVMsU0FBUSx5QkFBVztJQVFyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQVEsRUFBRSxDQUFRLEVBQUUsQ0FBUTtRQUN0QyxNQUFNLENBQUMsR0FBRyxJQUFJLFVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKLENBQUE7QUFqQkc7SUFEQyx5QkFBVyxDQUFDLG9CQUFPLENBQUM7bUNBQ1g7QUFFVjtJQURDLHlCQUFXLENBQUMscUJBQVEsQ0FBQzttQ0FDWDtBQUVYO0lBREMseUJBQVcsQ0FBQyxvQkFBTyxDQUFDO21DQUNYO0FBTkQsUUFBUTtJQURwQix5QkFBVyxFQUFFO0dBQ0QsUUFBUSxDQW1CcEI7QUFuQlksNEJBQVE7QUFzQnJCLElBQWEsSUFBSSxZQUFqQixNQUFhLElBQUssU0FBUSx5QkFBVztJQVFqQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQVEsRUFBRSxDQUFRLEVBQUUsQ0FBUTtRQUN0QyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKLENBQUE7QUFqQkc7SUFEQyx5QkFBVyxDQUFDLHNCQUFTLENBQUM7K0JBQ1g7QUFFWjtJQURDLHlCQUFXLENBQUMsc0JBQVMsQ0FBQzsrQkFDWDtBQUVaO0lBREMseUJBQVcsQ0FBQyxzQkFBUyxDQUFDOytCQUNYO0FBTkgsSUFBSTtJQURoQix5QkFBVyxFQUFFO0dBQ0QsSUFBSSxDQW1CaEI7QUFuQlksb0JBQUk7QUFzQmpCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSx5QkFBVztDQVE3QyxDQUFBO0FBTkc7SUFEQyx5QkFBVyxDQUFDLHNCQUFTLENBQUM7NENBQ1A7QUFFaEI7SUFEQyx5QkFBVyxDQUFDLG1CQUFNLENBQUM7a0RBQ0Q7QUFHbkI7SUFEQyx5QkFBVyxDQUFDLG9CQUFPLEVBQUUsQ0FBQyxDQUFDO2dEQUNOO0FBUFQsYUFBYTtJQUR6Qix5QkFBVyxFQUFFO0dBQ0QsYUFBYSxDQVF6QjtBQVJZLHNDQUFhIn0=