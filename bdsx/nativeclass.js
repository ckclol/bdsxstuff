"use strict";
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeArray = exports.nativeClass = exports.nativeField = exports.NativeClass = void 0;
const common_1 = require("./common");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
const util_1 = require("./util");
const isNativeClass = Symbol();
const isSealed = Symbol();
const fieldmap = Symbol();
function accessor(key) {
    if (typeof key === 'number')
        return `[${key}]`;
    if (/^[a-zA-Z_$][a-zA-Z_$]*$/.test(key))
        return `.${key}`;
    return `[${JSON.stringify(key)}]`;
}
class StructureDefination {
    constructor(supercls) {
        this.bitoffset = 0;
        this.bitTargetSize = 0;
        this.fields = {};
        this.eof = supercls[nativetype_1.NativeType.size];
        this.align = supercls[nativetype_1.NativeType.align];
    }
    define(clazz, size) {
        if (size == null) {
            if (size === null) {
                this.eof = null;
            }
            else {
                size = this.eof !== null ? (((this.eof + this.align - 1) / this.align) | 0) * this.align : null;
            }
        }
        else {
            if (this.eof !== null) {
                if (this.eof > size)
                    throw Error(`field offsets are bigger than the class size. fields_end=${this.eof}, size=${size}`);
            }
            this.eof = size;
        }
        if (makefunc_1.makefunc.np2js in clazz) {
            clazz[nativetype_1.NativeType.getter] = wrapperGetter;
            clazz[nativetype_1.NativeType.descriptor] = wrapperDescriptor;
        }
        sealClass(clazz);
        clazz[fieldmap] = this.fields;
        Object.freeze(this.fields);
        const propmap = new nativetype_1.NativeDescriptorBuilder;
        for (const key in this.fields) {
            const [type, offset, bitmask] = this.fields[key];
            type[nativetype_1.NativeType.descriptor](propmap, key, offset, bitmask);
        }
        const params = propmap.params;
        const supercls = clazz.__proto__.prototype;
        const idx = params.push(supercls) - 1;
        function override(ctx, type) {
            const superfn = supercls[type];
            const manual = clazz.prototype[type];
            if (ctx.code !== '') {
                const func = new Function('NativeType', 'types', ctx.code);
                if (superfn === manual) {
                    clazz.prototype[type] = function () {
                        superfn.call(this);
                        func.call(this, nativetype_1.NativeType, params);
                    };
                }
                else {
                    clazz.prototype[type] = function () {
                        superfn.call(this);
                        func.call(this, nativetype_1.NativeType, params);
                        manual.call(this);
                    };
                }
            }
            else if (superfn !== manual) {
                clazz.prototype[type] = function () {
                    superfn.call(this);
                    manual.call(this);
                };
            }
        }
        override(propmap.ctor, nativetype_1.NativeType.ctor);
        override(propmap.dtor, nativetype_1.NativeType.dtor);
        if (propmap.ctor_copy.code !== '') {
            if (!clazz.prototype.hasOwnProperty(nativetype_1.NativeType.ctor_copy)) {
                let code = propmap.ctor_copy.code;
                if (clazz.prototype[nativetype_1.NativeType.ctor_copy] !== common_1.emptyFunc) {
                    code = `types[${idx}][NativeType.ctor_copy].call(this);\n${code}`;
                }
                const func = new Function('NativeType', 'types', 'o', propmap.ctor_copy.code);
                clazz.prototype[nativetype_1.NativeType.ctor_copy] = function (o) {
                    func.call(this, nativetype_1.NativeType, params, o);
                };
            }
        }
        clazz[core_1.StructurePointer.contentSize] =
            clazz.prototype[nativetype_1.NativeType.size] =
                clazz[nativetype_1.NativeType.size] = size;
        clazz[nativetype_1.NativeType.align] = this.align;
        Object.defineProperties(clazz.prototype, propmap.desc);
    }
    field(key, type, fieldOffset, bitField) {
        if (util_1.isBaseOf(type, NativeClass)) {
            sealClass(type);
        }
        const alignofType = type[nativetype_1.NativeType.align];
        if (alignofType > this.align)
            this.align = alignofType;
        let offset = 0;
        if (fieldOffset != null) {
            offset = fieldOffset;
        }
        else {
            if (this.eof === null) {
                throw Error('Cannot set a field without the offset, if the sizeof previous field or super class is unknown');
            }
            offset = (((this.eof + alignofType - 1) / alignofType) | 0) * alignofType;
        }
        const sizeofType = type[nativetype_1.NativeType.size];
        if (sizeofType === null) {
            if (bitField != null) {
                throw Error(`${type.name} does not support the bit mask`);
            }
            this.fields[key] = [type, offset, null];
            this.eof = null;
        }
        else {
            let bitmaskinfo = null;
            let nextOffset = offset;
            if (bitField != null) {
                if (!(type instanceof nativetype_1.NativeType) || !type.supportsBitMask()) {
                    throw Error(`${type.name} does not support the bit mask`);
                }
                const maxBits = sizeofType * 8;
                if (bitField >= maxBits)
                    throw Error(`Too big bit mask, ${type.name} maximum is ${maxBits}`);
                const nextBitOffset = this.bitoffset + bitField;
                let shift = 0;
                if (this.bitoffset === 0 || this.bitTargetSize !== sizeofType || nextBitOffset > maxBits) {
                    // next bit field
                    this.bitoffset = bitField;
                    nextOffset = offset + sizeofType;
                }
                else {
                    offset -= sizeofType;
                    shift = this.bitoffset;
                    this.bitoffset = nextBitOffset;
                }
                this.bitTargetSize = sizeofType;
                const mask = ((1 << bitField) - 1) << shift;
                bitmaskinfo = [shift, mask];
            }
            else {
                this.bitoffset = 0;
                this.bitTargetSize = 0;
                nextOffset = offset + sizeofType;
            }
            this.fields[key] = [type, offset, bitmaskinfo];
            if (this.eof !== null && nextOffset > this.eof) {
                this.eof = nextOffset;
            }
        }
    }
}
const structures = new WeakMap();
class NativeClass extends core_1.StructurePointer {
    static isNativeClassType(type) {
        return isNativeClass in type;
    }
    [(_a = nativetype_1.NativeType.size, _b = nativetype_1.NativeType.align, _c = core_1.StructurePointer.contentSize, _d = isNativeClass, _e = isSealed, _f = makefunc_1.makefunc.pointerReturn, nativetype_1.NativeType.size, nativetype_1.NativeType.ctor)]() {
        // empty
    }
    [nativetype_1.NativeType.dtor]() {
        // empty
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        // empty
    }
    [nativetype_1.NativeType.ctor_move](from) {
        this[nativetype_1.NativeType.ctor_copy](from);
    }
    [nativetype_1.NativeType.setter](from) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_copy](from);
    }
    static [nativetype_1.NativeType.ctor](ptr) {
        ptr.as(this)[nativetype_1.NativeType.ctor]();
    }
    static [nativetype_1.NativeType.dtor](ptr) {
        ptr.as(this)[nativetype_1.NativeType.dtor]();
    }
    static [nativetype_1.NativeType.ctor_copy](to, from) {
        to.as(this)[nativetype_1.NativeType.ctor_copy](from.as(this));
    }
    static [nativetype_1.NativeType.ctor_move](to, from) {
        to.as(this)[nativetype_1.NativeType.ctor_move](from.as(this));
    }
    static [nativetype_1.NativeType.setter](ptr, value, offset) {
        const nptr = ptr.addAs(this, offset, (offset || 0) >> 31);
        nptr[nativetype_1.NativeType.setter](value);
    }
    static [nativetype_1.NativeType.getter](ptr, offset) {
        return ptr.addAs(this, offset, (offset || 0) >> 31);
    }
    static [nativetype_1.NativeType.descriptor](builder, key, offset) {
        const type = this;
        builder.desc[key] = {
            configurable: true,
            get() {
                const value = type[nativetype_1.NativeType.getter](this, offset);
                Object.defineProperty(this, key, { value });
                return value;
            }
        };
        if (type[nativetype_1.NativeType.ctor] !== common_1.emptyFunc) {
            builder.ctor.code += `this${accessor(key)}[NativeType.ctor]();\n`;
        }
        if (type[nativetype_1.NativeType.dtor] !== common_1.emptyFunc) {
            builder.dtor.code += `this${accessor(key)}[NativeType.dtor]();\n`;
        }
        builder.ctor_copy.code += `this${accessor(key)}[NativeType.ctor_copy](o${accessor(key)});\n`;
    }
    /**
     * alias of [NativeType.ctor]() and [Native.ctor_copy]();
     */
    construct(copyFrom) {
        if (copyFrom == null) {
            this[nativetype_1.NativeType.ctor]();
        }
        else {
            this[nativetype_1.NativeType.ctor_copy](copyFrom);
        }
    }
    /**
     * alias of [NativeType.dtor]();
     */
    destruct() {
        this[nativetype_1.NativeType.dtor]();
    }
    static next(ptr, count) {
        const clazz = this;
        const size = clazz[core_1.StructurePointer.contentSize];
        if (size === null) {
            throw Error('Cannot call the next with the unknown sized structure');
        }
        return ptr.addAs(this, count * size);
    }
    /**
     * Cannot construct & Unknown size
     */
    static abstract(fields, defineSize, defineAlign) {
        const clazz = this;
        clazz.define(fields, defineSize, defineAlign, true);
    }
    static define(fields, defineSize, defineAlign = null, abstract = false) {
        const clazz = this;
        if (makefunc_1.makefunc.np2js in clazz) {
            clazz[nativetype_1.NativeType.getter] = wrapperGetter;
            clazz[nativetype_1.NativeType.descriptor] = wrapperDescriptor;
        }
        if (clazz.hasOwnProperty(isSealed)) {
            throw Error('Cannot define the structure of the already used');
        }
        const superclass = clazz.__proto__;
        sealClass(superclass);
        const def = new StructureDefination(superclass);
        structures.set(clazz, def);
        for (const key in fields) {
            const type = fields[key];
            if (type instanceof Array) {
                def.field(key, type[0], type[1]);
            }
            else {
                def.field(key, type);
            }
        }
        if (abstract)
            def.eof = null;
        if (defineAlign !== null)
            def.align = defineAlign;
        def.define(clazz, defineSize);
    }
    static defineAsUnion(fields, abstract = false) {
        const clazz = this;
        for (const key in fields) {
            const item = fields[key];
            if (!(item instanceof Array)) {
                fields[key] = [item, 0];
            }
        }
        return clazz.define(fields, undefined, undefined, abstract);
    }
    static ref() {
        return singleton_1.Singleton.newInstance(NativeClass, this, () => makeReference(this));
    }
    static offsetOf(field) {
        return this[fieldmap][field][1];
    }
    static typeOf(field) {
        return this[fieldmap][field][0];
    }
}
exports.NativeClass = NativeClass;
NativeClass[_a] = 0;
NativeClass[_b] = 1;
NativeClass[_c] = 0;
NativeClass[_d] = true;
NativeClass[_e] = true;
NativeClass[_f] = true;
NativeClass.prototype[nativetype_1.NativeType.size] = 0;
NativeClass.prototype[nativetype_1.NativeType.ctor] = common_1.emptyFunc;
NativeClass.prototype[nativetype_1.NativeType.dtor] = common_1.emptyFunc;
NativeClass.prototype[nativetype_1.NativeType.ctor_copy] = common_1.emptyFunc;
function sealClass(cls) {
    let node = cls;
    while (!node.hasOwnProperty(isSealed)) {
        node[isSealed] = true;
        node = node.__proto__;
    }
}
function nativeField(type, fieldOffset, bitMask) {
    return (obj, key) => {
        const clazz = obj.constructor;
        let def = structures.get(clazz);
        if (def === undefined)
            structures.set(clazz, def = new StructureDefination(clazz.__proto__));
        def.field(key, type, fieldOffset, bitMask);
    };
}
exports.nativeField = nativeField;
function nativeClass(size, align = null) {
    return (clazz) => {
        const def = structures.get(clazz);
        if (def === undefined) {
            if (makefunc_1.makefunc.np2js in clazz) {
                clazz[nativetype_1.NativeType.getter] = wrapperGetter;
                clazz[nativetype_1.NativeType.descriptor] = wrapperDescriptor;
            }
            sealClass(clazz);
            const superclass = clazz.__proto__;
            clazz[core_1.StructurePointer.contentSize] =
                clazz.prototype[nativetype_1.NativeType.size] =
                    clazz[nativetype_1.NativeType.size] = size === undefined ? superclass[nativetype_1.NativeType.size] : size;
            clazz[nativetype_1.NativeType.align] = align == null ? superclass[nativetype_1.NativeType.align] : align;
        }
        else {
            structures.delete(clazz);
            if (align !== null)
                def.align = align;
            def.define(clazz, size);
        }
    };
}
exports.nativeClass = nativeClass;
function wrapperGetter(ptr, offset) {
    return this[makefunc_1.makefunc.np2js](ptr.addAs(this, offset));
}
function wrapperDescriptor(builder, key, offset) {
    const clazz = this;
    builder.desc[key] = {
        configurable: true,
        get() {
            const value = clazz[makefunc_1.makefunc.np2js](this.addAs(clazz, offset));
            Object.defineProperty(this, key, { value });
            return value;
        }
    };
    if (clazz[nativetype_1.NativeType.ctor] !== common_1.emptyFunc) {
        builder.ctor.code += `this${accessor(key)}[NativeType.ctor]();\n`;
    }
    if (clazz[nativetype_1.NativeType.dtor] !== common_1.emptyFunc) {
        builder.dtor.code += `this${accessor(key)}[NativeType.dtor]();\n`;
    }
    builder.ctor_copy.code += `this${accessor(key)}[NativeType.ctor_copy](o${accessor(key)});\n`;
}
class NativeArray extends core_1.PrivatePointer {
    static [nativetype_1.NativeType.getter](ptr, offset) {
        return ptr.addAs(this, offset, offset >> 31);
    }
    static [nativetype_1.NativeType.setter](ptr, value, offset) {
        throw Error("non assignable");
    }
    static [nativetype_1.NativeType.descriptor](builder, key, offset) {
        const type = this;
        builder.desc[key] = {
            configurable: true,
            get() {
                const value = this.addAs(type, offset, offset >> 31);
                Object.defineProperty(this, key, { value });
                return value;
            }
        };
        if (type[nativetype_1.NativeType.ctor] !== common_1.emptyFunc) {
            builder.ctor.code += `this${accessor(key)}[NativeType.ctor]();\n`;
        }
        if (type[nativetype_1.NativeType.dtor] !== common_1.emptyFunc) {
            builder.dtor.code += `this${accessor(key)}[NativeType.dtor]();\n`;
        }
        builder.ctor_copy.code += `this${accessor(key)}[NativeType.ctor_copy](o${accessor(key)});\n`;
    }
    get(i) {
        const offset = i * this.componentType[nativetype_1.NativeType.size];
        return this.componentType[nativetype_1.NativeType.getter](this, offset);
    }
    toArray() {
        const n = this.length;
        const out = new Array(n);
        for (let i = 0; i < n; i++) {
            out[i] = this.get(i);
        }
        return out;
    }
    *[(_g = nativetype_1.NativeType.align, Symbol.iterator)]() {
        const n = this.length;
        for (let i = 0; i < n; i++) {
            yield this.get(i);
        }
    }
    static make(itemType, count) {
        var _h, _j, _k;
        const itemSize = itemType[nativetype_1.NativeType.size];
        if (itemSize === null)
            throw Error('Unknown size of item. NativeArray needs item size');
        const propmap = new nativetype_1.NativeDescriptorBuilder;
        propmap.desc.length = { value: count };
        let off = 0;
        for (let i = 0; i < count; i++) {
            itemType[nativetype_1.NativeType.descriptor](propmap, i, off, null);
            off += itemSize;
        }
        class NativeArrayImpl extends NativeArray {
            static isTypeOf(v) {
                return v instanceof NativeArrayImpl;
            }
        }
        _h = nativetype_1.NativeType.size, _j = core_1.StructurePointer.contentSize, _k = nativetype_1.NativeType.align, nativetype_1.NativeType.size;
        NativeArrayImpl[_h] = off;
        NativeArrayImpl[_j] = off;
        NativeArrayImpl[_k] = itemType[nativetype_1.NativeType.align];
        NativeArrayImpl.prototype[nativetype_1.NativeType.size] = off;
        NativeArrayImpl.prototype.length = count;
        NativeArrayImpl.prototype.componentType = itemType;
        Object.defineProperties(NativeArrayImpl.prototype, propmap.desc);
        return NativeArrayImpl;
    }
}
exports.NativeArray = NativeArray;
NativeArray[_g] = 1;
exports.MantleClass = NativeClass;
function makeReference(type) {
    const clazz = type;
    function wrapperGetterRef(ptr, offset) {
        return clazz[makefunc_1.makefunc.np2js](ptr.getNullablePointerAs(clazz, offset));
    }
    function wrapperSetterRef(ptr, value, offset) {
        ptr.setPointer(clazz[makefunc_1.makefunc.js2np](value), offset);
    }
    function getterRef(ptr, offset) {
        return ptr.getNullablePointerAs(type, offset);
    }
    function setterRef(ptr, value, offset) {
        return ptr.setPointer(value, offset);
    }
    const getter = makefunc_1.makefunc.np2js in type ? wrapperGetterRef : getterRef;
    const setter = makefunc_1.makefunc.js2np in type ? wrapperSetterRef : setterRef;
    return new nativetype_1.NativeType(type.name + '*', 8, 8, clazz.isTypeOf, getter, setter, clazz[makefunc_1.makefunc.js2npAsm], clazz[makefunc_1.makefunc.np2jsAsm], clazz[makefunc_1.makefunc.np2npAsm]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuYXRpdmVjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEscUNBQTZFO0FBQzdFLGlDQUFxRztBQUNyRyx5Q0FBc0M7QUFDdEMsNkNBQXlFO0FBQ3pFLDJDQUF3QztBQUN4QyxpQ0FBa0M7QUFVbEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFMUIsU0FBUyxRQUFRLENBQUMsR0FBaUI7SUFDL0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQUUsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQy9DLElBQUkseUJBQXlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUMxRCxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ3RDLENBQUM7QUFnQkQsTUFBTSxtQkFBbUI7SUFVckIsWUFBWSxRQUE2QjtRQUp6QyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFpRSxFQUFFLENBQUM7UUFHdEUsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxNQUFNLENBQXdCLEtBQXdCLEVBQUUsSUFBaUI7UUFDckUsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFD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QUVmLHVCQUFVLENBQUMsSUFBSSxFQUFDO1FBQ2IsUUFBUTtJQUNaLENBQUM7SUFDRCxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2IsUUFBUTtJQUNaLENBQUM7SUFDRCxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBUztRQUM1QixRQUFRO0lBQ1osQ0FBQztJQUNELENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFTO1FBQzVCLElBQUksQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxDQUFDLHVCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBUztRQUN6QixJQUFJLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQWlCO1FBQ3RDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQWlCO1FBQ3RDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQWdCLEVBQUUsSUFBa0I7UUFDOUQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUMsdUJBQVUs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