"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxStringPointer = exports.CxxStringStructure = exports.CxxStringWrapper = exports.Pointer = exports.Wrapper = void 0;
const common_1 = require("./common");
const dll_1 = require("./dll");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
class Wrapper extends nativeclass_1.NativeClass {
    static make(type) {
        class TypedWrapper extends Wrapper {
        }
        Object.defineProperty(TypedWrapper, 'name', { value: type.name });
        TypedWrapper.prototype.type = type;
        TypedWrapper.define({ value: type });
        return TypedWrapper;
    }
    static [nativetype_1.NativeType.ctor_copy](to, from) {
        to.copyFrom(from, 8);
    }
    static [nativetype_1.NativeType.ctor_move](to, from) {
        to.copyFrom(from, 8);
    }
    static [nativetype_1.NativeType.descriptor](builder, key, offset) {
        const type = this;
        let obj = null;
        function init(ptr) {
            obj = ptr.getPointerAs(type, offset);
            Object.defineProperty(ptr, key, {
                get() {
                    return obj;
                },
                set(v) {
                    obj = v;
                    ptr.setPointer(v, offset);
                }
            });
        }
        builder.desc[key] = {
            configurable: true,
            get() {
                init(this);
                return obj;
            }
        };
    }
}
exports.Wrapper = Wrapper;
/** @deprecated renamed to Wrapper<T> */
class Pointer extends Wrapper {
    static make(type) {
        class TypedPointer extends Pointer {
        }
        TypedPointer.prototype.type = type;
        TypedPointer.defineAsUnion({ p: type, value: type });
        return TypedPointer;
    }
}
exports.Pointer = Pointer;
class CxxStringWrapper extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        common_1.abstract();
    }
    [nativetype_1.NativeType.dtor]() {
        common_1.abstract();
    }
    [nativetype_1.NativeType.ctor_copy](other) {
        common_1.abstract();
    }
    /**
     * @deprecated use .destruct
     */
    dispose() {
        this.destruct();
    }
    get value() {
        return this.getCxxString();
    }
    set value(str) {
        this.setCxxString(str);
    }
    get valueptr() {
        if (this.capacity >= 0x10)
            return this.getPointer();
        else
            return this.add();
    }
    reserve(nsize) {
        const capacity = this.capacity;
        if (nsize > capacity) {
            const orivalue = this.valueptr;
            this.capacity = nsize;
            const dest = dll_1.dll.ucrtbase.malloc(nsize + 1);
            dest.copyFrom(orivalue, this.length);
            if (capacity >= 0x10)
                dll_1.dll.ucrtbase.free(orivalue);
            this.setPointer(dest);
            if (dest === null) {
                this.setString("[out of memory]\0");
                this.capacity = 15;
                this.length = 15;
                return;
            }
        }
    }
    resize(nsize) {
        this.reserve(nsize);
        this.length = nsize;
    }
}
exports.CxxStringWrapper = CxxStringWrapper;
CxxStringWrapper.define({
    length: [nativetype_1.int64_as_float_t, 0x10],
    capacity: [nativetype_1.int64_as_float_t, 0x18]
});
CxxStringWrapper.prototype[nativetype_1.NativeType.ctor] = function () { return nativetype_1.CxxString[nativetype_1.NativeType.ctor](this); };
CxxStringWrapper.prototype[nativetype_1.NativeType.dtor] = function () { return nativetype_1.CxxString[nativetype_1.NativeType.dtor](this); };
CxxStringWrapper.prototype[nativetype_1.NativeType.ctor_copy] = function (other) {
    return nativetype_1.CxxString[nativetype_1.NativeType.ctor_copy](this, other);
};
/** @deprecated renamed to CxxStringWrapper */
exports.CxxStringStructure = CxxStringWrapper;
/** @deprecated use CxxStringWrapper */
exports.CxxStringPointer = Wrapper.make(nativetype_1.CxxString);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQW9DO0FBRXBDLCtCQUE0QjtBQUM1QiwrQ0FBNEM7QUFDNUMsNkNBQXNHO0FBWXRHLE1BQXNCLE9BQVcsU0FBUSx5QkFBVztJQUloRCxNQUFNLENBQUMsSUFBSSxDQUFJLElBQTRCO1FBQ3ZDLE1BQU0sWUFBYSxTQUFRLE9BQVU7U0FHcEM7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDaEUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBVyxDQUFDO1FBQzFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBVyxFQUFDLENBQUMsQ0FBQztRQUN6QyxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTSxDQUFDLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFnQixFQUFFLElBQWtCO1FBQzlELEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQWdCLEVBQUUsSUFBa0I7UUFDOUQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQTJCLE9BQStCLEVBQUUsR0FBVSxFQUFFLE1BQWE7UUFDL0csTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksR0FBRyxHQUFvQixJQUFJLENBQUM7UUFFaEMsU0FBUyxJQUFJLENBQUMsR0FBaUI7WUFDM0IsR0FBRyxHQUFH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