"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.type_id = exports.HasTypeId = exports.typeid_t = void 0;
const tslib_1 = require("tslib");
const core_1 = require("../core");
const dbghelp_1 = require("../dbghelp");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
const templatename_1 = require("../templatename");
let typeid_t = class typeid_t extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint16_t)
], typeid_t.prototype, "id", void 0);
typeid_t = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], typeid_t);
exports.typeid_t = typeid_t;
const counterWrapper = Symbol();
const typeidmap = Symbol();
const IdCounter = pointer_1.Wrapper.make(nativetype_1.uint16_t);
/**
 * dummy class for typeid
 */
class HasTypeId extends nativeclass_1.NativeClass {
}
exports.HasTypeId = HasTypeId;
_a = typeidmap;
HasTypeId[_a] = new WeakMap();
function type_id(base, type) {
    const map = base[typeidmap];
    const typeid = map.get(type);
    if (typeid instanceof typeid_t) {
        return typeid;
    }
    const counter = base[counterWrapper];
    if (counter.value === 0)
        throw Error('Cannot make type_id before launch');
    if (typeid !== undefined) {
        const newid = makefunc_1.makefunc.js(typeid, typeid_t, { structureReturn: true })();
        map.set(type, newid);
        return newid;
    }
    else {
        const newid = new typeid_t(true);
        newid.id = counter.value++;
        map.set(type, newid);
        return newid;
    }
}
exports.type_id = type_id;
(function (type_id) {
    function pdbimport(base, types) {
        const symbols = types.map(v => templatename_1.templateName('type_id', base.name, v.name));
        const counter = templatename_1.templateName('typeid_t', base.name) + '::count';
        symbols.push(counter);
        const addrs = core_1.pdb.getList(core_1.pdb.coreCachePath, {}, symbols, false, dbghelp_1.UNDNAME_NAME_ONLY);
        symbols.pop();
        base[counterWrapper] = addrs[counter].as(IdCounter);
        const map = base[typeidmap];
        for (let i = 0; i < symbols.length; i++) {
            const addr = addrs[symbols[i]];
            if (addr === undefined)
                continue;
            map.set(types[i], addr);
        }
    }
    type_id.pdbimport = pdbimport;
})(type_id = exports.type_id || (exports.type_id = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0NBQTZDO0FBQzdDLHdDQUErQztBQUMvQywwQ0FBdUM7QUFDdkMsZ0RBQXVFO0FBQ3ZFLDhDQUErQztBQUMvQyx3Q0FBcUM7QUFDckMsa0RBQStDO0FBRy9DLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVksU0FBUSx5QkFBVztDQUczQyxDQUFBO0FBREc7SUFEQyx5QkFBVyxDQUFDLHFCQUFRLENBQUM7b0NBQ1Y7QUFGSCxRQUFRO0lBRHBCLHlCQUFXLEVBQUU7R0FDRCxRQUFRLENBR3BCO0FBSFksNEJBQVE7QUFLckIsTUFBTSxjQUFjLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDaEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFM0IsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMscUJBQVEsQ0FBQyxDQUFDO0FBR3pDOztHQUVHO0FBQ0gsTUFBYSxTQUFVLFNBQVEseUJBQVc7O0FBQTFDLDhCQUdDO0tBRG9CLFNBQVM7QUFBVixhQUFXLEdBQUcsSUFBSSxPQUFPLEVBQTBDLENBQUM7QUFHeEYsU0FBZ0IsT0FBTyxDQUE0QixJQUFrQyxFQUFFLElBQVk7SUFDL0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsSUFBSSxNQUFNLFlBQVksUUFBUSxFQUFFO1FBQzVCLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JDLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQUUsTUFBTSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUMxRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDdEIsTUFBTSxLQUFLLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxLQUFLLENBQUM7S0FDaEI7U0FBTTtRQUNILE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFPLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQW5CRCwwQkFtQkM7QUFFRCxXQUFpQixPQUFPO0lBQ3BCLFNBQWdCLFNBQVMsQ0FBQyxJQUFxQixFQUFFLEtBQWlCO1FBQzlELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSwyQkFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLDJCQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBQyxTQUFTLENBQUM7UUFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QixNQUFNLEtBQUssR0FBRyxVQUFHLENBQUMsT0FBTyxDQUFDLFVBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsMkJBQWlCLENBQUMsQ0FBQztRQUVwRixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksSUFBSSxLQUFLLFNBQVM7Z0JBQUUsU0FBUztZQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFqQmUsaUJBQVMsWUFpQnhCLENBQUE7QUFDTCxDQUFDLEVBbkJnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFtQnZCIn0=