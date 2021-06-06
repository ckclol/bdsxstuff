"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockSource = exports.Block = exports.BlockLegacy = void 0;
const common_1 = require("bdsx/common");
const nativeclass_1 = require("bdsx/nativeclass");
class BlockLegacy extends nativeclass_1.NativeClass {
    getCommandName() {
        common_1.abstract();
    }
    getCreativeCategory() {
        common_1.abstract();
    }
    /**
     * Will not affect actual destroy time but will affect the speed of cracks
     */
    setDestroyTime(time) {
        common_1.abstract();
    }
    getDestroyTime() {
        return this.getFloat32(0x12C);
    }
}
exports.BlockLegacy = BlockLegacy;
class Block extends nativeclass_1.NativeClass {
    _getName() {
        common_1.abstract();
    }
    getName() {
        return this._getName().str;
    }
}
exports.Block = Block;
class BlockSource extends nativeclass_1.NativeClass {
    getBlock(blockPos) {
        common_1.abstract();
    }
}
exports.BlockSource = BlockSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBdUM7QUFDdkMsa0RBQStDO0FBSS9DLE1BQWEsV0FBWSxTQUFRLHlCQUFXO0lBQ3hDLGNBQWM7UUFDVixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsbUJBQW1CO1FBQ2YsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLElBQVc7UUFDdEIsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKO0FBaEJELGtDQWdCQztBQUVELE1BQWEsS0FBTSxTQUFRLHlCQUFXO0lBRXhCLFFBQVE7UUFDZCxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFSRCxzQkFRQztBQUVELE1BQWEsV0FBWSxTQUFRLHlCQUFXO0lBQ3hDLFFBQVEsQ0FBQyxRQUFpQjtRQUN0QixpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFKRCxrQ0FJQyJ9