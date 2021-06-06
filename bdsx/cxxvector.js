"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxVector = void 0;
const proc_1 = require("./bds/proc");
const common_1 = require("./common");
const core_1 = require("./core");
const dll_1 = require("./dll");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
const templatename_1 = require("./templatename");
const VECTOR_SIZE = 0x18;
/**
 * std::vector<T>
 * C++ standard dynamic array class
 */
class CxxVector extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        dll_1.dll.vcruntime140.memset(this, 0, VECTOR_SIZE);
    }
    [nativetype_1.NativeType.dtor]() {
        const ptr = this.getPointer(0);
        dll_1.dll.ucrtbase.free(ptr);
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        const sizeBytes = from.sizeBytes();
        const ptr = dll_1.dll.ucrtbase.malloc(sizeBytes);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const size = sizeBytes / compsize | 0;
        const srcptr = from.getPointer(0);
        this.setPointer(ptr, 0);
        for (let i = 0; i < size; i++) {
            this._ctor(ptr, i);
            this._copy(ptr, from._get(srcptr, i), i);
            ptr.move(compsize);
            srcptr.move(compsize);
        }
        this.setPointer(ptr, 8);
        this.setPointer(ptr, 16);
    }
    _resize(newsizeBytes, newcapBytes, oldptr, oldsizeBytes) {
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const allocated = CxxVector._alloc16(newcapBytes);
        this.setPointer(allocated, 0);
        const oldsize = oldsizeBytes / compsize | 0;
        const newsize = newsizeBytes / compsize | 0;
        this._move_alloc(allocated, oldptr, Math.min(oldsize, newsize));
        dll_1.dll.ucrtbase.free(oldptr);
        for (let i = oldsize; i < newsize; i++) {
            this._ctor(allocated, i);
            allocated.move(compsize);
        }
        this.setPointer(allocated, 8);
        allocated.move(newcapBytes - newsizeBytes);
        this.setPointer(allocated, 16);
    }
    set(idx, component) {
        const type = this.componentType;
        const compsize = type[nativetype_1.NativeType.size];
        let begptr = this.getPointer(0);
        const oldsizeBytes = this.getPointer(8).subptr(begptr);
        if (idx * compsize < oldsizeBytes) {
            begptr.move(idx * compsize);
            this._copy(begptr, component, idx);
            return;
        }
        const capBytes = this.getPointer(16).subptr(begptr);
        let newBytes = idx * compsize;
        if (newBytes >= capBytes) {
            newBytes += compsize;
            this._resize(newBytes, Math.max(capBytes * 2, newBytes), begptr, oldsizeBytes);
            begptr = this.getPointer(0);
        }
        begptr.move(idx * compsize);
        this._copy(begptr, component, idx);
    }
    get(idx) {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const size = endptr.subptr(beginptr) / compsize | 0;
        if (idx < 0 || idx >= size)
            return null;
        beginptr.move(idx * compsize);
        return this._get(beginptr, idx);
    }
    pop() {
        const begptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        if (endptr.equals(begptr))
            return false;
        const compsize = this.componentType[nativetype_1.NativeType.size];
        endptr.move(-compsize, -1);
        const idx = endptr.subptr(begptr) / compsize | 0;
        this._dtor(endptr, idx);
        this.setPointer(endptr, 8);
        return true;
    }
    push(component) {
        let begptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const idx = endptr.subptr(begptr) / compsize | 0;
        const capptr = this.getPointer(16);
        if (capptr.equals(endptr)) {
            const oldsizeBytes = endptr.subptr(begptr);
            const capBytes = capptr.subptr(begptr);
            const newsizeBytes = oldsizeBytes + compsize;
            this._resize(newsizeBytes, Math.max(capBytes * 2, newsizeBytes), begptr, oldsizeBytes);
            begptr = this.getPointer(0);
        }
        begptr.move(idx * compsize);
        this._copy(begptr, component, idx);
    }
    resize(size) {
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const begin = this.getPointer(0);
        const end = this.getPointer(8);
        const oldsizeBytes = end.subptr(begin);
        const osize = (oldsizeBytes / compsize) | 0;
        if (size <= osize) {
            begin.move(size * compsize);
            this.setPointer(begin, 8);
            let i = size;
            while (!begin.equals(end)) {
                this._dtor(begin, i++);
                begin.move(compsize);
            }
            return;
        }
        const cap = this.getPointer(16);
        const capBytes = cap.subptr(begin);
        const newBytes = size * compsize;
        if (newBytes <= capBytes) {
            begin.move(newBytes);
            this.setPointer(begin, 8);
            let i = osize;
            while (!end.equals(begin)) {
                this._ctor(end, i++);
                end.move(compsize);
            }
            return;
        }
        this._resize(newBytes, Math.max(capBytes * 2, newBytes), begin, oldsizeBytes);
    }
    size() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        return endptr.subptr(beginptr) / this.componentType[nativetype_1.NativeType.size] | 0;
    }
    sizeBytes() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        return endptr.subptr(beginptr);
    }
    capacity() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(16);
        return endptr.subptr(beginptr) / this.componentType[nativetype_1.NativeType.size] | 0;
    }
    toArray() {
        const n = this.size();
        const out = new Array(n);
        for (let i = 0; i < n; i++) {
            out[i] = this.get(i);
        }
        return out;
    }
    setFromArray(array) {
        const n = array.length;
        this.resize(n);
        for (let i = 0; i < n; i++) {
            this.set(i, array[i]);
        }
    }
    *[Symbol.iterator]() {
        const n = this.size();
        for (let i = 0; i < n; i++) {
            yield this.get(i);
        }
    }
    /**
     * @deprecated use .destruct()
     */
    dispose() {
        this[nativetype_1.NativeType.dtor]();
    }
    static make(type) {
        return singleton_1.Singleton.newInstance(CxxVector, type, () => {
            if (type[nativetype_1.NativeType.size] === undefined)
                throw Error("CxxVector needs the component size");
            if (nativeclass_1.NativeClass.isNativeClassType(type)) {
                class VectorImpl extends CxxVector {
                    constructor() {
                        super(...arguments);
                        this.cache = [];
                    }
                    _move_alloc(allocated, oldptr, movesize) {
                        const clazz = this.componentType;
                        const compsize = this.componentType[nativetype_1.NativeType.size];
                        const oldptrmove = oldptr.add();
                        for (let i = 0; i < movesize; i++) {
                            const new_item = allocated.as(clazz);
                            const old_item = this._get(allocated, i);
                            this.cache[i] = new_item;
                            new_item[nativetype_1.NativeType.ctor_move](old_item);
                            old_item[nativetype_1.NativeType.dtor]();
                            this.componentType[nativetype_1.NativeType.ctor_move](allocated, oldptrmove);
                            allocated.move(compsize);
                            oldptrmove.move(compsize);
                        }
                    }
                    _get(ptr, index) {
                        const item = this.cache[index];
                        if (item !== undefined)
                            return item;
                        const type = this.componentType;
                        return this.cache[index] = ptr.as(type);
                    }
                    _dtor(ptr, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.dtor]();
                    }
                    _ctor(ptr, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.ctor]();
                    }
                    _copy(ptr, from, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.setter](from);
                    }
                }
                VectorImpl.componentType = type;
                VectorImpl.prototype.componentType = type;
                VectorImpl.abstract({}, VECTOR_SIZE, 8);
                return VectorImpl;
            }
            else {
                class VectorImpl extends CxxVector {
                    _move_alloc(allocated, oldptr, movesize) {
                        const compsize = this.componentType[nativetype_1.NativeType.size];
                        const oldptrmove = oldptr.add();
                        for (let i = 0; i < movesize; i++) {
                            this.componentType[nativetype_1.NativeType.ctor_move](allocated, oldptrmove);
                            allocated.move(compsize);
                            oldptrmove.move(compsize);
                        }
                    }
                    _get(ptr) {
                        const type = this.componentType;
                        return type[nativetype_1.NativeType.getter](ptr);
                    }
                    _dtor(ptr) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.dtor](ptr);
                    }
                    _ctor(ptr) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.ctor](ptr);
                    }
                    _copy(ptr, from) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.setter](ptr, from);
                    }
                }
                VectorImpl.componentType = type;
                Object.defineProperty(VectorImpl, 'name', { value: templatename_1.templateName('std::vector', type.name, templatename_1.templateName('std::allocator', type.name)) });
                VectorImpl.prototype.componentType = type;
                VectorImpl.abstract({}, VECTOR_SIZE, 8);
                return VectorImpl;
            }
        });
    }
    static _alloc16(size) {
        common_1.abstract();
    }
}
exports.CxxVector = CxxVector;
CxxVector._alloc16 = proc_1.procHacker.js("std::_Allocate<16,std::_Default_allocate_traits,0>", core_1.NativePointer, null, nativetype_1.int64_as_float_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3h4dmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3h4dmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUF3QztBQUN4QyxxQ0FBb0M7QUFDcEMsaUNBQW9EO0FBQ3BELCtCQUE0QjtBQUM1QiwrQ0FBNkQ7QUFDN0QsNkNBQWtFO0FBQ2xFLDJDQUF3QztBQUN4QyxpREFBOEM7QUFTOUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBR3pCOzs7R0FHRztBQUNILE1BQXNCLFNBQWEsU0FBUSx5QkFBVztJQVFsRCxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2IsU0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsU0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFpQjtRQUNwQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsU0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxHQUFHLFNBQVMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVB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QUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsTUFBTSxZQUFZLEdBQUcsWUFBWSxHQUFDLFFBQVEsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBVztRQUNkLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxNQUFNLEtBQUssR0FBRyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxL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