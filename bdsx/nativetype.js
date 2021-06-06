"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.bin128_t = exports.bin64_t = exports.CxxString = exports.float64_t = exports.float32_t = exports.int64_as_float_t = exports.long_t = exports.int32_t = exports.int16_t = exports.int8_t = exports.uint64_as_float_t = exports.ulong_t = exports.uint32_t = exports.uint16_t = exports.uint8_t = exports.bool_t = exports.void_t = exports.NativeType = exports.NativeDescriptorBuilder = void 0;
const assembler_1 = require("./assembler");
const symbols_1 = require("./bds/symbols");
const common_1 = require("./common");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const makefunc_defines_1 = require("./makefunc_defines");
const singleton_1 = require("./singleton");
var NativeTypeFn;
(function (NativeTypeFn) {
    NativeTypeFn.size = Symbol('size');
    NativeTypeFn.align = Symbol('align');
    NativeTypeFn.getter = Symbol('getter');
    NativeTypeFn.setter = Symbol('setter');
    NativeTypeFn.ctor = Symbol('ctor');
    NativeTypeFn.dtor = Symbol('dtor');
    NativeTypeFn.ctor_copy = Symbol('ctor_copy');
    NativeTypeFn.ctor_move = Symbol('ctor_move');
    NativeTypeFn.isNativeClass = Symbol('isNativeClass');
    NativeTypeFn.descriptor = Symbol('descriptor');
    NativeTypeFn.bitGetter = Symbol('bitGetter');
    NativeTypeFn.bitSetter = Symbol('bitSetter');
})(NativeTypeFn || (NativeTypeFn = {}));
function defaultCopy(size) {
    return (to, from) => {
        to.copyFrom(from, size);
    };
}
class NativeDescriptorBuilder {
    constructor() {
        this.desc = {};
        this.params = [];
        this.ctor = new NativeDescriptorBuilder.UseContextCtor;
        this.dtor = new NativeDescriptorBuilder.UseContextDtor;
        this.ctor_copy = new NativeDescriptorBuilder.UseContextCtorCopy;
    }
}
exports.NativeDescriptorBuilder = NativeDescriptorBuilder;
(function (NativeDescriptorBuilder) {
    class UseContext {
        constructor() {
            this.code = '';
            this._use = false;
            this.offset = 0;
        }
        setPtrOffset(offset) {
            if (!this._use) {
                this._use = true;
                this.initUse();
            }
            const delta = offset - this.offset;
            if (delta !== 0)
                this.code += `ptr.move(${delta});\n`;
            this.offset = offset;
        }
    }
    NativeDescriptorBuilder.UseContext = UseContext;
    class UseContextCtor extends UseContext {
        initUse() {
            this.code += `const ptr = this.add();\n`;
        }
    }
    NativeDescriptorBuilder.UseContextCtor = UseContextCtor;
    class UseContextDtor extends UseContext {
        initUse() {
            this.code += `const ptr = this.add();\n`;
        }
    }
    NativeDescriptorBuilder.UseContextDtor = UseContextDtor;
    class UseContextCtorCopy extends UseContext {
        setPtrOffset(offset) {
            if (!this._use) {
                this._use = true;
                this.initUse();
            }
            const delta = offset - this.offset;
            if (delta !== 0)
                this.code += `ptr.move(${delta});\noptr.move(${delta});\n`;
            this.offset = offset;
        }
        initUse() {
            this.code += `const ptr = this.add();\nconst optr = o.add();\n`;
        }
    }
    NativeDescriptorBuilder.UseContextCtorCopy = UseContextCtorCopy;
})(NativeDescriptorBuilder = exports.NativeDescriptorBuilder || (exports.NativeDescriptorBuilder = {}));
function numericBitGetter(ptr, shift, mask, offset) {
    const value = this[NativeType.getter](ptr, offset);
    return (value & mask) >> shift;
}
function numericBitSetter(ptr, value, shift, mask, offset) {
    value = ((value << shift) & mask) | (this[NativeType.getter](ptr, offset) & ~mask);
    this[NativeType.setter](ptr, value, offset);
}
class NativeType extends makefunc_1.makefunc.ParamableT {
    constructor(name, size, align, isTypeOf, get, set, js2npAsm, np2jsAsm, np2npAsm, ctor = common_1.emptyFunc, dtor = common_1.emptyFunc, ctor_copy = defaultCopy(size), ctor_move = ctor_copy) {
        super(name, js2npAsm, np2jsAsm, np2npAsm);
        this[_a] = common_1.abstract;
        this[_b] = common_1.abstract;
        this[NativeType.size] = size;
        this[NativeType.align] = align;
        this.isTypeOf = isTypeOf;
        this[NativeType.getter] = get;
        this[NativeType.setter] = set;
        this[NativeType.ctor] = ctor;
        this[NativeType.dtor] = dtor;
        this[NativeType.ctor_copy] = ctor_copy;
        this[NativeType.ctor_move] = ctor_move;
        this[makefunc_1.makefunc.js2npLocalSize] = size;
    }
    supportsBitMask() {
        return this[NativeTypeFn.bitGetter] !== common_1.abstract;
    }
    extends(fields, name) {
        const type = this;
        const ntype = new NativeType(name !== null && name !== void 0 ? name : this.name, type[NativeType.size], type[NativeType.align], type.isTypeOf, type[NativeType.getter], type[NativeType.setter], type[makefunc_1.makefunc.js2npAsm], type[makefunc_1.makefunc.np2jsAsm], type[makefunc_1.makefunc.np2npAsm], type[NativeType.ctor], type[NativeType.dtor], type[NativeType.ctor_copy], type[NativeType.ctor_move]);
        if (fields) {
            for (const field in fields) {
                ntype[field] = fields[field];
            }
        }
        return ntype;
    }
    ref() {
        return singleton_1.Singleton.newInstance(NativeType, this, () => makeReference(this));
    }
    [(NativeTypeFn.getter, NativeTypeFn.setter, NativeTypeFn.ctor, NativeTypeFn.dtor, NativeTypeFn.ctor_move, NativeTypeFn.ctor_copy, NativeTypeFn.size, NativeTypeFn.align, makefunc_1.makefunc.js2npAsm, makefunc_1.makefunc.np2jsAsm, makefunc_1.makefunc.np2npAsm, makefunc_1.makefunc.js2npLocalSize, _a = NativeTypeFn.bitGetter, _b = NativeTypeFn.bitSetter, NativeTypeFn.descriptor)](builder, key, offset, mask) {
        common_1.abstract();
    }
    static defaultDescriptor(builder, key, offset, bitmask) {
        const type = this;
        if (bitmask !== null) {
            if (!(type instanceof NativeType))
                throw Error(`${this.name} does not support the bit mask`);
            builder.desc[key] = {
                get() { return type[NativeTypeFn.bitGetter](this, bitmask[0], bitmask[1], offset); },
                set(value) { return type[NativeTypeFn.bitSetter](this, value, bitmask[0], bitmask[1], offset); }
            };
        }
        else {
            builder.desc[key] = {
                get() { return type[NativeType.getter](this, offset); },
                set(value) { return type[NativeType.setter](this, value, offset); }
            };
        }
        let ctorbase = type.prototype;
        if (!ctorbase || !(NativeType.ctor in ctorbase))
            ctorbase = type;
        const typeidx = builder.params.push(type) - 1;
        if (ctorbase[NativeType.ctor] !== common_1.emptyFunc) {
            builder.ctor.setPtrOffset(offset);
            builder.ctor.code += `types[${typeidx}][NativeType.ctor](ptr);\n`;
        }
        if (ctorbase[NativeType.dtor] !== common_1.emptyFunc) {
            builder.dtor.setPtrOffset(offset);
            builder.dtor.code += `types[${typeidx}][NativeType.dtor](ptr);\n`;
        }
        builder.ctor_copy.setPtrOffset(offset);
        builder.ctor_copy.code += `types[${typeidx}][NativeType.ctor_copy](ptr, optr);\n`;
    }
    static definePointedProperty(target, key, pointer, type) {
        Object.defineProperty(target, key, {
            get() {
                return type[NativeType.getter](pointer);
            },
            set(value) {
                return type[NativeType.setter](pointer, value);
            }
        });
    }
}
exports.NativeType = NativeType;
NativeType.getter = NativeTypeFn.getter;
NativeType.setter = NativeTypeFn.setter;
NativeType.ctor = NativeTypeFn.ctor;
NativeType.dtor = NativeTypeFn.dtor;
NativeType.ctor_copy = NativeTypeFn.ctor_copy;
NativeType.ctor_move = NativeTypeFn.ctor_move;
NativeType.size = NativeTypeFn.size;
NativeType.align = NativeTypeFn.align;
NativeType.descriptor = NativeTypeFn.descriptor;
NativeType.prototype[NativeTypeFn.descriptor] = NativeType.defaultDescriptor;
function makeReference(type) {
    return new NativeType(`${type.name}*`, 8, 8, type.isTypeOf, (ptr) => type[NativeType.getter](ptr.getPointer()), (ptr, v) => type[NativeType.setter](ptr.getPointer(), v), type[makefunc_1.makefunc.js2npAsm], type[makefunc_1.makefunc.np2jsAsm], type[makefunc_1.makefunc.np2npAsm]);
}
core_1.VoidPointer[NativeType.size] = 8;
core_1.VoidPointer[NativeType.align] = 8;
core_1.VoidPointer[NativeType.getter] = function (ptr, offset) {
    return ptr.getPointerAs(this, offset);
};
core_1.VoidPointer[NativeType.setter] = function (ptr, value, offset) {
    ptr.setPointer(value, offset);
};
core_1.VoidPointer[NativeType.ctor] = common_1.emptyFunc;
core_1.VoidPointer[NativeType.dtor] = common_1.emptyFunc;
core_1.VoidPointer[NativeType.ctor_copy] = function (to, from) {
    to.copyFrom(from, 8);
};
core_1.VoidPointer[NativeType.ctor_move] = function (to, from) {
    this[NativeType.ctor_copy](to, from);
};
core_1.VoidPointer[NativeType.descriptor] = NativeType.defaultDescriptor;
core_1.VoidPointer.isTypeOf = function (v) {
    return v instanceof this;
};
const undefValueRef = core_1.chakraUtil.asJsValueRef(undefined);
exports.void_t = new NativeType('void', 0, 1, v => v === undefined, common_1.emptyFunc, common_1.emptyFunc, common_1.emptyFunc, (asm, target, source, info) => {
    if (info.numberOnUsing !== -1)
        throw Error(`void_t cannot be the parameter`);
    asm.qmov_t_c(target, undefValueRef);
}, common_1.emptyFunc);
Object.freeze(exports.void_t);
exports.bool_t = new NativeType('bool', 1, 1, v => v === undefined, (ptr, offset) => ptr.getBoolean(offset), (ptr, v, offset) => ptr.setBoolean(v, offset), (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsBooleanToBool);
    asm.throwIfNonZero(info);
    asm.mov_t_t(target, temp, assembler_1.OperationSize.byte);
}, (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.mov_t_t(makefunc_1.makefunc.Target[0], source, assembler_1.OperationSize.byte);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsBoolToBoolean);
    asm.throwIfNonZero(info);
    asm.qmov_t_t(target, temp);
}, (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.byte));
exports.bool_t[NativeTypeFn.bitGetter] = (ptr, shift, mask, offset) => {
    const value = ptr.getUint8(offset);
    return (value & mask) !== 0;
};
exports.bool_t[NativeTypeFn.bitSetter] = (ptr, value, shift, mask, offset) => {
    const nvalue = ((+value) << shift) | (ptr.getUint8(offset) & ~mask);
    ptr.setUint8(nvalue, offset);
};
Object.freeze(exports.bool_t);
exports.uint8_t = new NativeType('unsigned char', 1, 1, v => typeof v === 'number' && (v | 0) === v && 0 <= v && v <= 0xff, (ptr, offset) => ptr.getInt8(offset), (ptr, v, offset) => ptr.setInt8(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.byte, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.byte, info, false), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.byte));
exports.uint8_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.uint8_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.uint8_t);
exports.uint16_t = new NativeType('unsigned short', 2, 2, v => typeof v === 'number' && (v | 0) === v && 0 <= v && v <= 0xffff, (ptr, offset) => ptr.getInt16(offset), (ptr, v, offset) => ptr.setInt16(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.word, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.word, info, false), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.word));
exports.uint16_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.uint16_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.uint16_t);
exports.uint32_t = new NativeType('unsigned int', 4, 4, v => typeof v === 'number' && (v >>> 0) === v, (ptr, offset) => ptr.getUint32(offset), (ptr, v, offset) => ptr.setUint32(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.dword, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.dword, info, false), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.dword));
exports.uint32_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.uint32_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.uint32_t);
exports.ulong_t = new NativeType('unsigned long', 4, 4, v => typeof v === 'number' && (v >>> 0) === v, (ptr, offset) => ptr.getUint32(offset), (ptr, v, offset) => ptr.setUint32(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.dword, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.dword, info, false), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.dword));
exports.ulong_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.ulong_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.ulong_t);
exports.uint64_as_float_t = new NativeType('unsigned __int64', 8, 8, v => typeof v === 'number' && Math.round(v) === v && 0 <= v && v < 0x10000000000000000, (ptr, offset) => ptr.getUint64AsFloat(offset), (ptr, v, offset) => ptr.setUint64WithFloat(v, offset), (asm, target, source, info) => {
    // TODO: negative number to higher number
    const temp = target.tempPtr();
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsNumberToDouble);
    asm.throwIfNonZero(info);
    asm.cvttsd2si_t_t(target, temp);
}, (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.cvtsi2sd_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsDoubleToNumber);
    asm.throwIfNonZero(info);
    asm.qmov_t_t(target, temp);
    // TODO: negative number to zero
}, (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.qword));
Object.freeze(exports.uint64_as_float_t);
exports.int8_t = new NativeType('char', 1, 1, v => typeof v === 'number' && (v | 0) === v && -0x80 <= v && v <= 0x7f, (ptr, offset) => ptr.getUint8(offset), (ptr, v, offset) => ptr.setUint8(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.byte, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.byte, info, true), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.byte));
exports.int8_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.int8_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.int8_t);
exports.int16_t = new NativeType('short', 2, 2, v => typeof v === 'number' && (v | 0) === v && -0x8000 <= v && v <= 0x7fff, (ptr, offset) => ptr.getUint16(offset), (ptr, v, offset) => ptr.setUint16(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.word, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.word, info, true), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.word));
exports.int16_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.int16_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.int16_t);
exports.int32_t = new NativeType('int', 4, 4, v => typeof v === 'number' && (v | 0) === v, (ptr, offset) => ptr.getInt32(offset), (ptr, v, offset) => ptr.setInt32(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.dword, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.dword, info, true), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.dword));
exports.int32_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.int32_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.int32_t);
exports.long_t = new NativeType('long', 4, 4, v => typeof v === 'number' && (v | 0) === v, (ptr, offset) => ptr.getInt32(offset), (ptr, v, offset) => ptr.setInt32(v, offset), (asm, target, source, info) => asm.jsNumberToInt(target, source, assembler_1.OperationSize.dword, info), (asm, target, source, info) => asm.jsIntToNumber(target, source, assembler_1.OperationSize.dword, info, true), (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.dword));
exports.long_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.long_t[NativeTypeFn.bitSetter] = numericBitSetter;
Object.freeze(exports.long_t);
exports.int64_as_float_t = new NativeType('__int64', 8, 8, v => typeof v === 'number' && Math.round(v) === v && -0x8000000000000000 <= v && v < 0x8000000000000000, (ptr, offset) => ptr.getInt64AsFloat(offset), (ptr, v, offset) => ptr.setInt64WithFloat(v, offset), (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsNumberToDouble);
    asm.throwIfNonZero(info);
    asm.cvttsd2si_t_t(target, temp);
}, (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.cvtsi2sd_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsDoubleToNumber);
    asm.throwIfNonZero(info);
    asm.qmov_t_t(target, temp);
}, (asm, target, source) => asm.mov_t_t(target, source, assembler_1.OperationSize.qword));
Object.freeze(exports.int64_as_float_t);
exports.float32_t = new NativeType('float', 4, 4, v => typeof v === 'number', (ptr, offset) => ptr.getFloat32(offset), (ptr, v, offset) => ptr.setFloat32(v, offset), (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsNumberToDouble);
    asm.throwIfNonZero(info);
    asm.cvtsd2ss_t_t(target, temp);
}, (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.cvtss2sd_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsDoubleToNumber);
    asm.throwIfNonZero(info);
    asm.qmov_t_t(target, temp);
}, (asm, target, source) => asm.movss_t_t(target, source));
Object.freeze(exports.float32_t);
exports.float64_t = new NativeType('double', 8, 8, v => typeof v === 'number', (ptr, offset) => ptr.getFloat64(offset), (ptr, v, offset) => ptr.setFloat64(v, offset), (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsNumberToDouble);
    asm.throwIfNonZero(info);
    asm.movsd_t_t(target, temp);
}, (asm, target, source, info) => {
    const temp = target.tempPtr();
    asm.movsd_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsDoubleToNumber);
    asm.throwIfNonZero(info);
    asm.qmov_t_t(target, temp);
}, (asm, target, source) => asm.movsd_t_t(target, source));
Object.freeze(exports.float64_t);
const string_ctor = makefunc_1.makefunc.js(symbols_1.proc2['??0?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@QEAA@XZ'], exports.void_t, null, core_1.VoidPointer);
const string_dtor = makefunc_1.makefunc.js(symbols_1.proc['std::basic_string<char,std::char_traits<char>,std::allocator<char> >::_Tidy_deallocate'], exports.void_t, null, core_1.VoidPointer);
exports.CxxString = new NativeType('std::basic_string<char,std::char_traits<char>,std::allocator<char> >', 0x20, 8, v => typeof v === 'string', (ptr, offset) => ptr.getCxxString(offset), (ptr, v, offset) => ptr.setCxxString(v, offset), (asm, target, source, info) => {
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.lea_r_rp(assembler_1.Register.r9, assembler_1.Register.rbp, 1, info.offsetForLocalSpace + 0x10);
    asm.mov_r_c(assembler_1.Register.r8, core_1.chakraUtil.stack_utf8);
    asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_str_js2np);
    asm.mov_r_rp(assembler_1.Register.rcx, assembler_1.Register.rbp, 1, info.offsetForLocalSpace + 0x10);
    asm.cmp_r_c(assembler_1.Register.rcx, 15);
    asm.ja_label('!');
    asm.mov_r_rp(assembler_1.Register.rdx, assembler_1.Register.rax, 1, 8);
    asm.mov_rp_r(assembler_1.Register.rbp, 1, info.offsetForLocalSpace + 0x08, assembler_1.Register.rdx);
    asm.mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rax, 1, 0);
    asm.mov_r_c(assembler_1.Register.rcx, 15);
    asm.close_label('!');
    asm.mov_rp_r(assembler_1.Register.rbp, 1, info.offsetForLocalSpace, assembler_1.Register.rax);
    asm.mov_rp_r(assembler_1.Register.rbp, 1, info.offsetForLocalSpace + 0x18, assembler_1.Register.rcx);
    asm.lea_t_rp(target, assembler_1.Register.rbp, 1, info.offsetForLocalSpace);
    asm.useStackAllocator = true;
}, (asm, target, source, info) => {
    const sourceTemp = source.tempPtr();
    if (info.needDestruction)
        asm.qmov_t_t(sourceTemp, source);
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.mov_r_rp(assembler_1.Register.rdx, assembler_1.Register.rcx, 1, 0x10);
    asm.mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rcx, 1, 0x18);
    asm.cmp_r_c(assembler_1.Register.rax, 15);
    asm.cmova_r_rp(assembler_1.Register.rcx, assembler_1.Register.rcx, 1, 0);
    asm.add_r_r(assembler_1.Register.rdx, assembler_1.Register.rcx);
    const temp = target.tempPtr(source, sourceTemp);
    asm.lea_r_rp(assembler_1.Register.r8, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_utf8_np2js);
    asm.throwIfNonZero(info);
    if (info.needDestruction) {
        asm.qmov_t_t(makefunc_1.makefunc.Target[0], sourceTemp);
        asm.call64(string_dtor.pointer, assembler_1.Register.rax);
    }
    asm.qmov_t_t(target, temp);
}, (asm, target, source) => asm.qmov_t_t(target, source), string_ctor, string_dtor, (to, from) => {
    to.setCxxString(from.getCxxString());
}, (to, from) => {
    to.copyFrom(from, 0x20);
    string_ctor(from);
});
exports.CxxString[makefunc_1.makefunc.pointerReturn] = true;
Object.freeze(exports.CxxString);
exports.bin64_t = new NativeType('unsigned __int64', 8, 8, v => typeof v === 'string' && v.length === 4, (ptr, offset) => ptr.getBin64(offset), (ptr, v, offset) => ptr.setBin(v, offset), (asm, target, source, info) => {
    asm.qmov_t_t(makefunc_1.makefunc.Target[0], source);
    asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_bin64);
    asm.qmov_t_t(target, makefunc_1.makefunc.Target.return);
}, (asm, target, source, info) => {
    const temp = target.tempPtr(source);
    const sourceTemp = source.tempPtr(target, temp);
    asm.lea_r_rp(assembler_1.Register.rcx, sourceTemp.reg, 1, sourceTemp.offset);
    if (source.memory) {
        asm.mov_rp_r(assembler_1.Register.rcx, 1, 0, source.reg);
    }
    asm.mov_r_c(assembler_1.Register.rdx, 4);
    asm.lea_r_rp(assembler_1.Register.r8, temp.reg, 1, temp.offset);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsPointerToString);
    asm.throwIfNonZero(info);
    asm.qmov_t_t(target, temp);
}, (asm, target, source) => asm.qmov_t_t(target, source)).extends({
    one: '\u0001\0\0\0',
    zero: '\0\0\0\0',
    minus_one: '\uffff\uffff\uffff\uffff',
});
Object.freeze(exports.bin64_t);
exports.bin128_t = new NativeType('unsigned __int128', 16, 8, v => typeof v === 'string' && v.length === 8, (ptr) => ptr.getBin(8), (ptr, v) => ptr.setBin(v), () => { throw Error('bin128_t is not supported for the function type'); }, () => { throw Error('bin128_t is not supported for the function type'); }, () => { throw Error('bin128_t is not supported for the function type'); }).extends({
    one: '\u0001\0\0\0',
    zero: '\0\0\0\0',
    minus_one: '\uffff\uffff\uffff\uffff',
});
Object.freeze(exports.bin128_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZldHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdGl2ZXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDJDQUFzRDtBQUN0RCwyQ0FBNEM7QUFDNUMscUNBQStDO0FBQy9DLGlDQUFnRTtBQUNoRSx5Q0FBc0M7QUFDdEMseURBQXFEO0FBQ3JELDJDQUF3QztBQUV4QyxJQUFVLFlBQVksQ0FhckI7QUFiRCxXQUFVLFlBQVk7SUFDTCxpQkFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixrQkFBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixtQkFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixtQkFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixpQkFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixpQkFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoQyxzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoQywwQkFBYSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4Qyx1QkFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoQyxzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqRCxDQUFDLEVBYlMsWUFBWSxLQUFaLFlBQVksUUFhckI7QUErQkQsU0FBUyxXQUFXLENBQUMsSUFBVztJQUM1QixPQUFPLENBQUMsRUFBZ0IsRUFBRSxJQUFrQixFQUFDLEVBQUU7UUFDM0MsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIs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QUFDLEVBQUUsTUFBTSxFQUFDLEVBQUUsQ0FBQSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFDM0MsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFBRTtJQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxrQ0FBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbEUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDLEVBQ0QsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFBRTtJQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxrQ0FBZSxDQUFDLG1CQUFtQixDQUFDLENB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