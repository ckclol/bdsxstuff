"use strict";
var SharedPtrBase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedPointer = exports.SharedPtr = exports.SharedPtrBase = void 0;
const tslib_1 = require("tslib");
const capi_1 = require("./capi");
const common_1 = require("./common");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
const templatename_1 = require("./templatename");
let SharedPtrBase = SharedPtrBase_1 = class SharedPtrBase extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.useRef = 1;
        this.weakRef = 1;
    }
    addRef() {
        this.interlockedIncrement32(8); // useRef
        this.interlockedIncrement32(16); // weakRef
    }
    release() {
        if (this.interlockedDecrement32(0x8) === 0) {
            this._Destroy();
        }
        if (this.interlockedDecrement32(0xc) === 0) {
            this._DeleteThis();
        }
    }
    _DeleteThis() {
        common_1.abstract();
    }
    _Destroy() {
        common_1.abstract();
    }
    static make(type) {
        return singleton_1.Singleton.newInstance(SharedPtrBase_1, type, () => {
            class SharedPtrBaseImpl extends SharedPtrBase_1 {
            }
            SharedPtrBaseImpl.define({ value: type });
            return SharedPtrBaseImpl;
        });
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], SharedPtrBase.prototype, "vftable", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], SharedPtrBase.prototype, "useRef", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint32_t)
], SharedPtrBase.prototype, "weakRef", void 0);
SharedPtrBase = SharedPtrBase_1 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], SharedPtrBase);
exports.SharedPtrBase = SharedPtrBase;
SharedPtrBase.prototype._Destroy = makefunc_1.makefunc.js([0], nativetype_1.void_t, { this: SharedPtrBase });
SharedPtrBase.prototype._DeleteThis = makefunc_1.makefunc.js([8], nativetype_1.void_t, { this: SharedPtrBase });
const sizeOfSharedPtrBase = SharedPtrBase[nativetype_1.NativeType.size];
/**
 * wrapper for std::shared_ptr
 */
class SharedPtr extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.p = null;
        this.ref = null;
    }
    [nativetype_1.NativeType.dtor]() {
        if (this.ref !== null)
            this.ref.release();
    }
    [nativetype_1.NativeType.ctor_copy](value) {
        this.p = value.p;
        this.ref = value.ref;
        if (this.ref !== null)
            this.ref.addRef();
    }
    [nativetype_1.NativeType.ctor_move](value) {
        this.p = value.p;
        this.ref = value.ref;
        value.p = null;
        value.ref = null;
    }
    ctor_move(value) {
        this.p = value.p;
        this.ref = value.ref;
        value.ref = null;
    }
    assign(value) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_copy](value);
        return this;
    }
    assign_move(value) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_move](value);
        return this;
    }
    exists() {
        return this.ref !== null;
    }
    addRef() {
        this.ref.addRef();
    }
    assignTo(dest) {
        const ctor = this.constructor;
        const ptr = dest.as(ctor);
        ptr.assign(this);
    }
    dispose() {
        if (this.ref !== null) {
            this.ref.release();
            this.ref = null;
        }
        this.p = null;
    }
    static make(cls) {
        const clazz = cls;
        return singleton_1.Singleton.newInstance(SharedPtr, cls, () => {
            const Base = SharedPtrBase.make(clazz);
            class TypedSharedPtr extends SharedPtr {
                create(vftable) {
                    const size = Base[nativetype_1.NativeType.size];
                    if (size === null)
                        throw Error(`cannot allocate the non sized class`);
                    this.ref = capi_1.capi.malloc(size).as(Base);
                    this.ref.vftable = vftable;
                    this.ref.construct();
                    this.p = this.ref.addAs(clazz, sizeOfSharedPtrBase);
                }
            }
            Object.defineProperty(TypedSharedPtr, 'name', { value: templatename_1.templateName('std::shared_ptr', clazz.name) });
            TypedSharedPtr.define({
                p: clazz.ref(),
                ref: Base.ref(),
            });
            return TypedSharedPtr;
        });
    }
}
exports.SharedPtr = SharedPtr;
/**
 * @deprecated
 */
class SharedPointer extends core_1.StaticPointer {
    constructor(sharedptr) {
        super(sharedptr.p);
        this.sharedptr = sharedptr;
    }
    assignTo(dest) {
        this.assignTo(dest);
    }
    dispose() {
        this.sharedptr.dispose();
    }
}
exports.SharedPointer = SharedPointer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkcG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZHBvaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBOEI7QUFDOUIscUNBQW9DO0FBQ3BDLGlDQUFvRDtBQUNwRCx5Q0FBc0M7QUFDdEMsK0NBQXVGO0FBQ3ZGLDZDQUFrRTtBQUNsRSwyQ0FBd0M7QUFDeEMsaURBQThDO0FBRzlDLElBQWEsYUFBYSxxQkFBMUIsTUFBYSxhQUFpQixTQUFRLHlCQUFXO0lBUzdDLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVTtJQUMvQyxDQUFDO0lBQ0QsT0FBTztRQUNILElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUNELFdBQVc7UUFDUCxpQkFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsUUFBUTtRQUNKLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFJLElBQVk7UUFDdkIsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxlQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUUsRUFBRTtZQUNsRCxNQUFNLGlCQUFr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