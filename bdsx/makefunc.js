"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makefunc = exports.RawTypeId = void 0;
const assembler_1 = require("./assembler");
const symbols_1 = require("./bds/symbols");
require("./codealloc");
const common_1 = require("./common");
const core_1 = require("./core");
const dllraw_1 = require("./dllraw");
const makefunc_defines_1 = require("./makefunc_defines");
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
const asmcode = require("./asm/asmcode");
/**
 * @deprecated use NativeType (int32_t, float32_t, float64_t, ...)
 */
var RawTypeId;
(function (RawTypeId) {
    /** @deprecated use int32_t */
    RawTypeId[RawTypeId["Int32"] = 0] = "Int32";
    /** @deprecated use int64_as_float_t */
    RawTypeId[RawTypeId["FloatAsInt64"] = 1] = "FloatAsInt64";
    /** @deprecated use float32_t */
    RawTypeId[RawTypeId["Float32"] = 2] = "Float32";
    /** @deprecated use float64_t */
    RawTypeId[RawTypeId["Float64"] = 3] = "Float64";
    /** @deprecated use makefunc.Ansi */
    RawTypeId[RawTypeId["StringAnsi"] = 4] = "StringAnsi";
    /** @deprecated use makefunc.Utf8 */
    RawTypeId[RawTypeId["StringUtf8"] = 5] = "StringUtf8";
    /** @deprecated use makefunc.Utf16 */
    RawTypeId[RawTypeId["StringUtf16"] = 6] = "StringUtf16";
    /** @deprecated use makefunc.Buffer */
    RawTypeId[RawTypeId["Buffer"] = 7] = "Buffer";
    /** @deprecated use bin64_t */
    RawTypeId[RawTypeId["Bin64"] = 8] = "Bin64";
    /** @deprecated use bool_t */
    RawTypeId[RawTypeId["Boolean"] = 9] = "Boolean";
    /** @deprecated use makefunc.JsValueRef */
    RawTypeId[RawTypeId["JsValueRef"] = 10] = "JsValueRef";
    /** @deprecated use void_t */
    RawTypeId[RawTypeId["Void"] = 11] = "Void";
    /** @deprecated use float64_t */
    RawTypeId[RawTypeId["Float"] = 3] = "Float";
})(RawTypeId = exports.RawTypeId || (exports.RawTypeId = {}));
const nullValueRef = core_1.chakraUtil.asJsValueRef(null);
const functionMap = new core_1.AllocatedPointer(0x100);
core_1.chakraUtil.JsAddRef(functionMap);
const functionMapPtr = functionMap.add(0x80);
function initFunctionMap() {
    function setFunctionMap(name, address) {
        if (address === undefined)
            throw Error(`Unexpected value for ${name}`);
        functionMap.setPointer(address, makefunc_defines_1.makefuncDefines[name] + 0x80);
    }
    function chakraCoreToMakeFuncMap(funcName) {
        const constname = `fn_${funcName}`;
        const offset = makefunc_defines_1.makefuncDefines[constname];
        if (typeof offset !== 'number')
            throw Error(`${constname} not found`);
        setFunctionMap(constname, core_1.cgate.GetProcAddress(chakraCoreDll, funcName));
    }
    function chakraCoreToDef(funcName) {
        asmcode[funcName] = core_1.cgate.GetProcAddress(chakraCoreDll, funcName);
    }
    const chakraCoreDll = core_1.cgate.GetModuleHandleW('ChakraCore.dll');
    setFunctionMap('fn_getout', asmcode.getout);
    setFunctionMap('fn_str_np2js', asmcode.str_np2js);
    setFunctionMap('fn_str_js2np', asmcode.str_js2np);
    setFunctionMap('fn_stack_free_all', core_1.chakraUtil.stack_free_all);
    setFunctionMap('fn_utf16_js2np', asmcode.utf16_js2np);
    setFunctionMap('fn_pointer_js2class', core_1.chakraUtil.pointer_js2class);
    setFunctionMap('fn_bin64', asmcode.bin64);
    chakraCoreToMakeFuncMap('JsNumberToInt');
    chakraCoreToMakeFuncMap('JsBoolToBoolean');
    chakraCoreToMakeFuncMap('JsBooleanToBool');
    setFunctionMap('fn_getout_invalid_parameter', asmcode.getout_invalid_parameter);
    chakraCoreToMakeFuncMap('JsIntToNumber');
    chakraCoreToMakeFuncMap('JsNumberToDouble');
    setFunctionMap('fn_buffer_to_pointer', asmcode.buffer_to_pointer);
    chakraCoreToMakeFuncMap('JsDoubleToNumber');
    chakraCoreToMakeFuncMap('JsPointerToString');
    chakraCoreToMakeFuncMap('JsStringToPointer');
    setFunctionMap('fn_ansi_np2js', core_1.chakraUtil.from_ansi);
    setFunctionMap('fn_utf8_np2js', core_1.chakraUtil.from_utf8);
    setFunctionMap('fn_utf16_np2js', asmcode.utf16_np2js);
    setFunctionMap('fn_pointer_np2js', asmcode.pointer_np2js);
    setFunctionMap('fn_pointer_np2js_nullable', asmcode.pointer_np2js_nullable);
    setFunctionMap('fn_getout_invalid_parameter_count', asmcode.getout_invalid_parameter_count);
    chakraCoreToMakeFuncMap('JsCallFunction');
    setFunctionMap('fn_pointer_js_new', asmcode.pointer_js_new);
    chakraCoreToMakeFuncMap('JsSetException');
    setFunctionMap('fn_returnPoint', null);
    asmcode.printf = symbols_1.proc.printf;
    asmcode.GetCurrentThreadId = dllraw_1.dllraw.kernel32.GetCurrentThreadId;
    asmcode.memcpy = dllraw_1.dllraw.vcruntime140.memcpy;
    asmcode.asyncAlloc = core_1.uv_async.alloc;
    asmcode.asyncPost = core_1.uv_async.post;
    asmcode.sprintf = symbols_1.proc2.sprintf;
    asmcode.vsnprintf = symbols_1.proc2.vsnprintf;
    asmcode.malloc = dllraw_1.dllraw.ucrtbase.malloc;
    asmcode.Sleep = dllraw_1.dllraw.kernel32.Sleep;
    chakraCoreToDef('JsHasException');
    chakraCoreToDef('JsCreateTypeError');
    chakraCoreToDef('JsGetValueType');
    chakraCoreToDef('JsStringToPointer');
    chakraCoreToDef('JsGetArrayBufferStorage');
    chakraCoreToDef('JsGetTypedArrayStorage');
    chakraCoreToDef('JsGetDataViewStorage');
    chakraCoreToDef('JsConstructObject');
    asmcode.js_null = nullValueRef;
    asmcode.js_true = core_1.chakraUtil.asJsValueRef(true);
    chakraCoreToDef('JsGetAndClearException');
    asmcode.runtimeErrorFire = core_1.runtimeError.fire;
    asmcode.runtimeErrorRaise = core_1.runtimeError.raise;
}
initFunctionMap();
const PARAMNUM_RETURN = -1;
const PARAMNUM_THIS = 0;
const PARAM_OFFSET = 3;
function throwTypeError(paramNum, name, value, detail) {
    let out = '';
    if (paramNum === PARAMNUM_RETURN)
        out = 'Invalid return ';
    else if (paramNum === PARAMNUM_THIS)
        out = 'Invalid this ';
    else
        out = 'Invalid parameter ';
    out += `${name}(${value})`;
    if (paramNum > 0)
        out += ` at ${paramNum}`;
    out += `, ${detail}`;
    throw Error(out);
}
function checkTypeIsFunction(value, paramNum) {
    const type = typeof value;
    if (type !== 'function') {
        throwTypeError(paramNum, 'type', type, 'function required');
    }
}
function pointerClassOrThrow(paramNum, type) {
    if (!util_1.isBaseOf(type, core_1.VoidPointer)) {
        const name = type.name + '';
        throwTypeError(paramNum, 'class', name, '*Pointer class required');
    }
}
const makefuncTypeMap = [];
function remapType(type) {
    if (typeof type === 'number') {
        if (makefuncTypeMap.length === 0) {
            const { bool_t, int32_t, int64_as_float_t, float64_t, float32_t, bin64_t, void_t } = require('./nativetype');
            makefuncTypeMap[RawTypeId.Boolean] = bool_t;
            makefuncTypeMap[RawTypeId.Int32] = int32_t;
            makefuncTypeMap[RawTypeId.FloatAsInt64] = int64_as_float_t;
            makefuncTypeMap[RawTypeId.Float64] = float64_t;
            makefuncTypeMap[RawTypeId.Float32] = float32_t;
            makefuncTypeMap[RawTypeId.StringAnsi] = makefunc.Ansi;
            makefuncTypeMap[RawTypeId.StringUtf8] = makefunc.Utf8;
            makefuncTypeMap[RawTypeId.StringUtf16] = makefunc.Utf16;
            makefuncTypeMap[RawTypeId.Buffer] = makefunc.Buffer;
            makefuncTypeMap[RawTypeId.Bin64] = bin64_t;
            makefuncTypeMap[RawTypeId.JsValueRef] = makefunc.JsValueRef;
            makefuncTypeMap[RawTypeId.Void] = void_t;
        }
        const res = makefuncTypeMap[type];
        if (!res)
            throw Error(`Invalid RawTypeId: ${type}`);
        return res;
    }
    return type;
}
function qwordMove(asm, target, source) {
    asm.qmov_t_t(target, source);
}
class ParamInfoMaker {
    constructor(returnType, opts, params) {
        this.params = [];
        if (opts != null) {
            this.structureReturn = !!opts.structureReturn;
            this.thisType = opts.this;
            this.useThis = !!this.thisType;
            if (this.useThis) {
                if (!util_1.isBaseOf(this.thisType, core_1.VoidPointer)) {
                    throw Error('Non pointer at this');
                }
            }
        }
        else {
            this.structureReturn = false;
            this.useThis = false;
        }
        this.countOnCalling = params.length;
        this.countOnCpp = this.countOnCalling + (+this.useThis) + (+this.structureReturn);
        if (this.structureReturn)
            params.unshift(StructureReturnAllocation);
        if (this.useThis)
            params.unshift(this.thisType);
        {
            const info = new makefunc.ParamInfo;
            info.offsetForLocalSpace = null;
            info.type = returnType;
            info.numberOnMaking = 2;
            info.numberOnUsing = PARAMNUM_RETURN;
            info.needDestruction = this.structureReturn;
            this.return = info;
        }
        for (let i = 0; i < params.length; i++) {
            const info = new makefunc.ParamInfo;
            info.offsetForLocalSpace = null;
            info.needDestruction = false;
            if (this.useThis && i === 0) {
                info.type = this.thisType;
                info.numberOnMaking = 3;
                info.type = params[0];
                info.numberOnUsing = PARAMNUM_THIS;
            }
            else if (this.structureReturn && i === +this.useThis) {
                info.type = this.return.type;
                info.numberOnMaking = 2;
                info.type = StructureReturnAllocation;
                info.numberOnUsing = PARAMNUM_RETURN;
            }
            else {
                const indexOnUsing = i - +this.structureReturn - +this.useThis;
                const indexOnMaking = PARAM_OFFSET + indexOnUsing;
                info.numberOnMaking = indexOnMaking + 1;
                info.numberOnUsing = indexOnUsing + 1;
                info.type = params[i];
            }
            this.params.push(info);
        }
    }
}
function symbolNotFound() {
    throw Error('symbol not found');
}
class DupCheck {
    constructor() {
        this.map = new Map();
    }
    check(target) {
        const str = String(target);
        const oldstack = this.map.get(str);
        if (oldstack !== undefined) {
            console.error(`Duplicated ${str}`);
            console.error(source_map_support_1.remapStack(oldstack));
            return;
        }
        this.map.set(str, util_1.removeLine(Error().stack, 0, 1));
    }
}
// const dupcheck = new DupCheck;
var makefunc;
(function (makefunc) {
    makefunc.js2np = Symbol('makefunc.js2np');
    makefunc.np2js = Symbol('makefunc.np2js');
    makefunc.js2npAsm = Symbol('makefunc.js2npAsm');
    makefunc.np2jsAsm = Symbol('makefunc.np2jsAsm');
    makefunc.np2npAsm = Symbol('makefunc.np2npAsm');
    makefunc.js2npLocalSize = Symbol('makefunc.js2npLocalSize');
    makefunc.pointerReturn = Symbol('makefunc.pointerReturn');
    makefunc.nullAlsoInstance = Symbol('makefunc.nullAlsoInstance');
    class ParamableT {
        constructor(name, _js2npAsm, _np2jsAsm, _np2npAsm, _np2js, _js2np) {
            this.name = name;
            this[makefunc.js2npAsm] = _js2npAsm;
            this[makefunc.np2jsAsm] = _np2jsAsm;
            this[makefunc.np2npAsm] = _np2npAsm;
            this[makefunc.np2js] = _np2js;
            this[makefunc.js2np] = _js2np;
        }
    }
    makefunc.ParamableT = ParamableT;
    class ParamInfo {
    }
    makefunc.ParamInfo = ParamInfo;
    class Target {
        equals(other) {
            if (this.memory) {
                return other.memory && this.reg === other.reg && this.offset === other.offset;
            }
            return !other.memory && this.reg === other.reg;
        }
        getTemp() {
            return this.reg !== assembler_1.Register.r10 ? assembler_1.Register.r10 : assembler_1.Register.r11;
        }
        getFTemp() {
            return this.freg !== assembler_1.FloatRegister.xmm5 ? assembler_1.FloatRegister.xmm5 : assembler_1.FloatRegister.xmm6;
        }
        static register(reg, freg) {
            const ti = new Target;
            ti.reg = reg;
            ti.freg = freg;
            ti.memory = false;
            return ti;
        }
        static memory(reg, offset) {
            const ti = new Target;
            ti.reg = reg;
            ti.offset = offset;
            ti.memory = true;
            return ti;
        }
        tempPtr(...sources) {
            if (this.memory)
                return this;
            return Target.tempPtr(...sources);
        }
        static tempPtr(...sources) {
            let offsets = 0;
            for (const src of sources) {
                if (src.memory && src.reg === assembler_1.Register.rbp) {
                    console.assert(src.offset % 8 === 0);
                    offsets |= 1 << (src.offset >> 3);
                    continue;
                }
            }
            let offset = 0;
            while ((offsets & 1) !== 0) {
                offsets >>>= 1;
                offset += 8;
            }
            return Target.memory(assembler_1.Register.rbp, offset);
        }
    }
    Target.return = Target.register(assembler_1.Register.rax, assembler_1.FloatRegister.xmm0);
    Target[0] = Target.register(assembler_1.Register.rcx, assembler_1.FloatRegister.xmm0);
    Target[1] = Target.register(assembler_1.Register.rdx, assembler_1.FloatRegister.xmm1);
    Target[2] = Target.register(assembler_1.Register.r8, assembler_1.FloatRegister.xmm2);
    Target[3] = Target.register(assembler_1.Register.r9, assembler_1.FloatRegister.xmm3);
    makefunc.Target = Target;
    class Maker extends assembler_1.X64Assembler {
        constructor(pi, stackSize, useGetOut) {
            super(new Uint8Array(64), 0);
            this.pi = pi;
            this.stackSize = stackSize;
            this.useStackAllocator = false;
            this.push_r(assembler_1.Register.rdi);
            this.push_r(assembler_1.Register.rsi);
            this.push_r(assembler_1.Register.rbp);
            this.mov_r_c(assembler_1.Register.rdi, functionMapPtr);
            if (useGetOut) {
                this.mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_returnPoint);
            }
            this.push_r(assembler_1.Register.rax);
            if (useGetOut) {
                this.lea_r_rp(assembler_1.Register.rax, assembler_1.Register.rsp, 1, 1);
                this.mov_rp_r(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_returnPoint, assembler_1.Register.rax);
            }
        }
        calculateStackSize() {
            // align
            const alignmentOffset = 8;
            this.stackSize -= alignmentOffset;
            this.stackSize = ((this.stackSize + 0xf) & ~0xf);
            this.stackSize += alignmentOffset;
        }
        end() {
            this.add_r_c(assembler_1.Register.rsp, this.stackSize);
            this.pop_r(assembler_1.Register.rcx);
            this.pop_r(assembler_1.Register.rbp);
            this.mov_rp_r(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_returnPoint, assembler_1.Register.rcx);
            this.pop_r(assembler_1.Register.rsi);
            this.pop_r(assembler_1.Register.rdi);
            this.ret();
        }
        qmov_t_c(target, value) {
            if (target.memory) {
                const temp = target.reg !== assembler_1.Register.r10 ? assembler_1.Register.r10 : assembler_1.Register.r11;
                this.mov_r_c(temp, value);
                this.mov_rp_r(target.reg, 1, target.offset, temp);
            }
            else {
                this.mov_r_c(target.reg, value);
            }
        }
        qmov_t_t(target, source) {
            if (target.memory) {
                if (source.memory) {
                    if (target === source) {
                        // same
                    }
                    else {
                        const temp = target.getTemp();
                        this.mov_r_rp(temp, source.reg, 1, source.offset, assembler_1.OperationSize.qword);
                        this.mov_rp_r(target.reg, 1, target.offset, temp, assembler_1.OperationSize.qword);
                    }
                }
                else {
                    this.mov_rp_r(target.reg, 1, target.offset, source.reg, assembler_1.OperationSize.qword);
                }
            }
            else {
                if (source.memory) {
                    this.mov_r_rp(target.reg, source.reg, 1, source.offset, assembler_1.OperationSize.qword);
                }
                else {
                    if (target === source) {
                        // same
                    }
                    else {
                        this.mov_r_r(target.reg, source.reg, assembler_1.OperationSize.qword);
                    }
                }
            }
        }
        lea_t_rp(target, source, multiply, offset) {
            if (target.memory) {
                if (offset === 0) {
                    this.mov_rp_r(target.reg, 1, target.offset, source, assembler_1.OperationSize.qword);
                }
                else {
                    const temp = target.getTemp();
                    this.lea_r_rp(temp, source, multiply, offset, assembler_1.OperationSize.qword);
                    this.mov_rp_r(target.reg, 1, target.offset, temp, assembler_1.OperationSize.qword);
                }
            }
            else {
                if (offset === 0 && target.reg === source)
                    return;
                this.lea_r_rp(target.reg, source, multiply, offset, assembler_1.OperationSize.qword);
            }
        }
        mov_t_t(target, source, size) {
            if (size === assembler_1.OperationSize.void)
                return;
            if (size > assembler_1.OperationSize.qword)
                throw Error('Unexpected operation size: ' + assembler_1.OperationSize[size]);
            if (size === assembler_1.OperationSize.qword)
                return this.qmov_t_t(target, source);
            if (target.memory) {
                if (source.memory) {
                    if (target === source) {
                        // same
                    }
                    else {
                        const temp = target.getTemp();
                        if (size >= assembler_1.OperationSize.dword) {
                            this.mov_r_rp(temp, source.reg, 1, source.offset, size);
                        }
                        else {
                            this.movzx_r_rp(temp, source.reg, 1, source.offset, assembler_1.OperationSize.dword, size);
                        }
                        this.mov_rp_r(target.reg, 1, target.offset, temp, size);
                    }
                }
                else {
                    this.mov_rp_r(target.reg, 1, target.offset, source.reg, size);
                }
            }
            else {
                if (source.memory) {
                    if (size >= assembler_1.OperationSize.dword) {
                        this.mov_r_rp(target.reg, source.reg, 1, source.offset, size);
                    }
                    else {
                        this.movzx_r_rp(target.reg, source.reg, 1, source.offset, assembler_1.OperationSize.dword, size);
                    }
                }
                else {
                    if (target === source) {
                        // same
                    }
                    else {
                        this.mov_r_r(target.reg, source.reg, assembler_1.OperationSize.dword);
                    }
                }
            }
        }
        mov2dw_t_t(target, source, size, signed) {
            if (size === assembler_1.OperationSize.void)
                return;
            if (size > assembler_1.OperationSize.qword)
                throw Error('Unexpected operation size: ' + assembler_1.OperationSize[size]);
            if (target.memory) {
                if (source.memory) {
                    if (target === source) {
                        // same
                    }
                    else {
                        const temp = target.getTemp();
                        if (size >= assembler_1.OperationSize.dword) {
                            this.mov_r_rp(temp, source.reg, 1, source.offset, size);
                        }
                        else {
                            if (signed)
                                this.movsx_r_rp(temp, source.reg, 1, source.offset, assembler_1.OperationSize.dword, size);
                            else
                                this.movzx_r_rp(temp, source.reg, 1, source.offset, assembler_1.OperationSize.dword, size);
                        }
                        this.mov_rp_r(target.reg, 1, target.offset, temp, assembler_1.OperationSize.dword);
                    }
                }
                else {
                    this.mov_rp_r(target.reg, 1, target.offset, source.reg, assembler_1.OperationSize.dword);
                }
            }
            else {
                if (source.memory) {
                    if (size >= assembler_1.OperationSize.dword) {
                        this.mov_r_rp(target.reg, source.reg, 1, source.offset, size);
                    }
                    else {
                        if (signed)
                            this.movsx_r_rp(target.reg, source.reg, 1, source.offset, assembler_1.OperationSize.dword, size);
                        else
                            this.movzx_r_rp(target.reg, source.reg, 1, source.offset, assembler_1.OperationSize.dword, size);
                    }
                }
                else {
                    if (size >= assembler_1.OperationSize.dword) {
                        if (target === source) {
                            // same
                        }
                        else {
                            this.mov_r_r(target.reg, source.reg, assembler_1.OperationSize.dword);
                        }
                    }
                    else {
                        if (signed)
                            this.movsx_r_r(target.reg, source.reg, assembler_1.OperationSize.dword, size);
                        else
                            this.movzx_r_r(target.reg, source.reg, assembler_1.OperationSize.dword, size);
                    }
                }
            }
        }
        /**
         * int64_t -> float64_t
         */
        cvtsi2sd_t_t(target, source) {
            if (target.memory) {
                if (source.memory) {
                    const ftemp = target.getFTemp();
                    this.cvtsi2sd_f_rp(ftemp, source.reg, 1, source.offset);
                    this.movsd_rp_f(target.reg, 1, target.offset, ftemp);
                }
                else {
                    this.cvtsi2sd_f_r(assembler_1.FloatRegister.xmm0, source.reg);
                    this.movsd_rp_f(target.reg, 1, target.offset, assembler_1.FloatRegister.xmm0);
                }
            }
            else {
                if (source.memory) {
                    this.cvtsi2sd_f_rp(target.freg, source.reg, 1, source.offset);
                }
                else {
                    this.cvtsi2sd_f_r(target.freg, source.reg);
                }
            }
        }
        /**
         * float64_t -> int64_t
         */
        cvttsd2si_t_t(target, source) {
            if (target.memory) {
                const temp = target.getTemp();
                if (source.memory) {
                    this.cvttsd2si_r_rp(temp, source.reg, 1, source.offset);
                    this.mov_rp_r(target.reg, 1, target.offset, temp);
                }
                else {
                    this.cvttsd2si_r_f(temp, source.freg);
                    this.mov_rp_r(target.reg, 1, target.offset, temp);
                }
            }
            else {
                if (source.memory) {
                    this.cvttsd2si_r_rp(target.reg, source.reg, 1, source.offset);
                }
                else {
                    this.cvttsd2si_r_f(target.reg, source.freg);
                }
            }
        }
        /**
         * float32_t -> float64_t
         */
        cvtss2sd_t_t(target, source) {
            if (target.memory) {
                if (source.memory) {
                    const ftemp = target.getFTemp();
                    this.cvtss2sd_f_rp(ftemp, source.reg, 1, source.offset);
                    this.movsd_rp_f(target.reg, 1, target.offset, ftemp);
                }
                else {
                    this.cvtss2sd_f_f(assembler_1.FloatRegister.xmm0, source.freg);
                    this.movsd_rp_f(target.reg, 1, target.offset, assembler_1.FloatRegister.xmm0);
                }
            }
            else {
                if (source.memory) {
                    this.cvtss2sd_f_rp(target.freg, source.reg, 1, source.offset);
                }
                else {
                    this.cvtss2sd_f_f(target.freg, source.freg);
                }
            }
        }
        /**
         * float64_t -> float32_t
         */
        cvtsd2ss_t_t(target, source) {
            if (target.memory) {
                if (source.memory) {
                    const ftemp = target.getFTemp();
                    this.cvtsd2ss_f_rp(ftemp, source.reg, 1, source.offset);
                    this.movss_rp_f(target.reg, 1, target.offset, ftemp);
                }
                else {
                    this.cvtsd2ss_f_f(assembler_1.FloatRegister.xmm0, source.freg);
                    this.movss_rp_f(target.reg, 1, target.offset, assembler_1.FloatRegister.xmm0);
                }
            }
            else {
                if (source.memory) {
                    this.cvtsd2ss_f_rp(target.freg, source.reg, 1, source.offset);
                }
                else {
                    this.cvtsd2ss_f_f(target.freg, source.freg);
                }
            }
        }
        movss_t_t(target, source) {
            if (target.memory) {
                if (source.memory) {
                    if (target === source) {
                        // same
                    }
                    else {
                        const temp = target.getTemp();
                        this.mov_r_rp(temp, source.reg, 1, source.offset, assembler_1.OperationSize.dword);
                        this.mov_rp_r(target.reg, 1, target.offset, temp, assembler_1.OperationSize.dword);
                    }
                }
                else {
                    this.movss_rp_f(target.reg, 1, target.offset, source.freg);
                }
            }
            else {
                if (source.memory) {
                    this.movss_f_rp(target.freg, source.reg, 1, source.offset);
                }
                else {
                    if (target === source) {
                        // same
                    }
                    else {
                        this.movss_f_f(target.freg, source.freg);
                    }
                }
            }
        }
        movsd_t_t(target, source) {
            if (target.memory) {
                if (source.memory) {
                    if (target === source) {
                        // same
                    }
                    else {
                        const temp = target.getTemp();
                        this.mov_r_rp(temp, source.reg, 1, source.offset);
                        this.mov_rp_r(target.reg, 1, target.offset, temp);
                    }
                }
                else {
                    this.movsd_rp_f(target.reg, 1, target.offset, source.freg);
                }
            }
            else {
                if (source.memory) {
                    this.movsd_f_rp(target.freg, source.reg, 1, source.offset);
                }
                else {
                    if (target === source) {
                        // same
                    }
                    else {
                        this.movsd_f_f(target.freg, source.freg);
                    }
                }
            }
        }
        jsNumberToInt(target, source, size, info) {
            const temp = target.tempPtr();
            this.qmov_t_t(makefunc.Target[0], source);
            this.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
            this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsNumberToInt);
            this.throwIfNonZero(info);
            this.mov_t_t(target, temp, size);
        }
        jsUintToNumber(target, source, size, info) {
            const temp = target.tempPtr();
            this.mov2dw_t_t(makefunc.Target[0], source, size, false);
            this.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
            this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsIntToNumber);
            this.throwIfNonZero(info);
            this.qmov_t_t(target, temp);
        }
        jsIntToNumber(target, source, size, info, signed) {
            const temp = target.tempPtr();
            this.mov2dw_t_t(makefunc.Target[0], source, size, signed);
            this.lea_r_rp(assembler_1.Register.rdx, temp.reg, 1, temp.offset);
            this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsIntToNumber);
            this.throwIfNonZero(info);
            this.qmov_t_t(target, temp);
        }
        nativeToJs(info, target, source) {
            if (info.type === StructureReturnAllocation) {
                throw Error('Unsupported');
                // this.pi.returnType[np2jsAsm](this, target, source, info);
            }
            const wrapper = info.type[makefunc.np2js];
            if (wrapper) {
                core_1.chakraUtil.JsAddRef(wrapper);
                const temp = target.tempPtr();
                this.sub_r_c(assembler_1.Register.rsp, 0x30);
                info.type[makefunc.np2jsAsm](this, makefunc.Target.memory(assembler_1.Register.rsp, 0x28), source, info);
                this.mov_r_c(assembler_1.Register.rax, nullValueRef);
                this.mov_rp_r(assembler_1.Register.rsp, 1, 0x20, assembler_1.Register.rax);
                this.mov_r_c(assembler_1.Register.rcx, core_1.chakraUtil.asJsValueRef(wrapper));
                this.lea_r_rp(assembler_1.Register.rdx, assembler_1.Register.rsp, 1, 0x20);
                this.mov_r_c(assembler_1.Register.r8, 2);
                this.lea_r_rp(assembler_1.Register.r9, temp.reg, 1, temp.offset);
                this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsCallFunction);
                this.throwIfNonZero(info);
                this.add_r_c(assembler_1.Register.rsp, 0x30);
                this.qmov_t_t(target, temp);
            }
            else {
                info.type[makefunc.np2jsAsm](this, target, source, info);
            }
        }
        jsToNative(info, target, source) {
            if (info.type === StructureReturnAllocation) {
                if (this.pi.return.offsetForLocalSpace !== null) {
                    this.lea_t_rp(target, assembler_1.Register.rbp, 1, this.pi.return.offsetForLocalSpace);
                }
                else if ('prototype' in this.pi.return.type) {
                    core_1.chakraUtil.JsAddRef(this.pi.return.type);
                    this.lea_r_rp(assembler_1.Register.rdx, assembler_1.Register.rbp, 1, this.offsetForStructureReturn);
                    this.mov_r_c(assembler_1.Register.rcx, core_1.chakraUtil.asJsValueRef(this.pi.return.type));
                    this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_pointer_js_new);
                    this.qmov_t_t(target, makefunc.Target.return);
                }
                else {
                    throw Error(`${this.pi.return.type.name} is not constructible`);
                }
                return;
            }
            const wrapper = info.type[makefunc.js2np];
            if (wrapper) {
                core_1.chakraUtil.JsAddRef(wrapper);
                const temp = target.tempPtr();
                this.sub_r_c(assembler_1.Register.rsp, 0x30);
                info.type[makefunc.js2npAsm](this, makefunc.Target.memory(assembler_1.Register.rsp, 0x28), source, info);
                this.mov_r_c(assembler_1.Register.rax, nullValueRef);
                this.mov_rp_r(assembler_1.Register.rsp, 1, 0x20, assembler_1.Register.rax);
                this.mov_r_c(assembler_1.Register.rcx, core_1.chakraUtil.asJsValueRef(wrapper));
                this.lea_r_rp(assembler_1.Register.rdx, assembler_1.Register.rsp, 1, 0x20);
                this.mov_r_c(assembler_1.Register.r8, 2);
                this.lea_r_rp(assembler_1.Register.r9, temp.reg, 1, temp.offset);
                this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsCallFunction);
                this.throwIfNonZero(info);
                this.add_r_c(assembler_1.Register.rsp, 0x30);
                this.qmov_t_t(target, temp);
            }
            else {
                info.type[makefunc.js2npAsm](this, target, source, info);
            }
        }
        throwIfNonZero(info) {
            this.test_r_r(assembler_1.Register.rax, assembler_1.Register.rax, assembler_1.OperationSize.dword);
            this.jz_label('!');
            this.mov_r_c(assembler_1.Register.rcx, info.numberOnUsing);
            this.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_getout_invalid_parameter);
            this.close_label('!');
        }
    }
    makefunc.Maker = Maker;
    /**
     * make the JS function as a native function.
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     */
    function np(jsfunction, returnType, opts, ...params) {
        const pimaker = new ParamInfoMaker(remapType(returnType), opts, params.map(remapType)); // check param count also
        if (pimaker.structureReturn)
            throw Error(`makefunc.np does not support structureReturn:true`); // TODO: support
        core_1.chakraUtil.JsAddRef(jsfunction);
        checkTypeIsFunction(jsfunction, 1);
        const spaceForTemp = 0x10;
        const spaceForOutput = 0x8;
        const spaceForFunctionCalling = 0x20;
        const paramsSize = pimaker.countOnCalling * 8 + 8; // params + this
        const func = new Maker(pimaker, paramsSize, false);
        if (opts && opts.nativeDebugBreak)
            func.debugBreak();
        func.stackSize += spaceForTemp; // space for tempPtr()
        func.stackSize += spaceForOutput; // space for the output of JsCallFunction
        func.stackSize += spaceForFunctionCalling; // space for the function calling
        // calculate local space size
        {
            const localSize = pimaker.return.type[makefunc.js2npLocalSize];
            if (localSize)
                func.stackSize += localSize;
        }
        func.calculateStackSize();
        // local spaces
        const argStackOffset = 0x28;
        let offset = paramsSize + spaceForTemp + spaceForOutput + spaceForFunctionCalling - func.stackSize - argStackOffset;
        {
            const localSize = pimaker.return.type[makefunc.js2npLocalSize];
            if (localSize) {
                pimaker.return.offsetForLocalSpace = offset;
                offset += localSize;
            }
        }
        // 0x28~ - js arguments
        // 0x20~0x28 - space for the output for JsCallFunction
        // 0x00~0x20 - parameters for JsCallFunction
        func.lea_r_rp(assembler_1.Register.rbp, assembler_1.Register.rsp, 1, argStackOffset);
        const activeRegisters = Math.min(pimaker.countOnCpp, 4);
        if (activeRegisters > 1) {
            for (let i = 1; i < activeRegisters; i++) {
                const param = pimaker.params[i];
                param.type[makefunc.np2npAsm](func, Target.memory(assembler_1.Register.rbp, i * 8), Target[i], param);
            }
        }
        func.lea_r_rp(assembler_1.Register.rsi, assembler_1.Register.rsp, 1, -func.stackSize + 0x20); // without calling stack
        func.sub_r_c(assembler_1.Register.rsp, func.stackSize);
        offset = 0;
        if (!pimaker.useThis) {
            func.mov_r_c(assembler_1.Register.rax, nullValueRef);
            func.mov_rp_r(assembler_1.Register.rsi, 1, 0, assembler_1.Register.rax);
        }
        for (let i = 0; i < pimaker.countOnCpp; i++) {
            const info = pimaker.params[i];
            if (i === 0) {
                func.nativeToJs(info, Target.memory(assembler_1.Register.rsi, info.numberOnUsing * 8), Target[0]);
            }
            else {
                func.nativeToJs(info, Target.memory(assembler_1.Register.rsi, info.numberOnUsing * 8), Target.memory(assembler_1.Register.rbp, offset));
            }
            offset += 8;
        }
        func.mov_r_c(assembler_1.Register.rcx, core_1.chakraUtil.asJsValueRef(jsfunction));
        func.lea_r_rp(assembler_1.Register.rdx, assembler_1.Register.rsp, 1, 0x20);
        func.mov_r_c(assembler_1.Register.r8, pimaker.countOnCalling + 1);
        func.mov_r_r(assembler_1.Register.r9, assembler_1.Register.rbp);
        func.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_JsCallFunction);
        func.test_r_r(assembler_1.Register.rax, assembler_1.Register.rax);
        func.jz_label('!');
        func.mov_r_r(assembler_1.Register.rcx, assembler_1.Register.rax);
        func.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_getout);
        func.close_label('!');
        func.jsToNative(pimaker.return, makefunc.Target.return, Target.memory(assembler_1.Register.rbp, 0));
        func.end();
        return func.alloc();
    }
    makefunc.np = np;
    /**
     * make the native function as a JS function.
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     *
     * @param returnType *_t or *Pointer
     * @param params *_t or *Pointer
     */
    function js(functionPointer, returnType, opts, ...params) {
        // if (functionPointer instanceof VoidPointer) {
        //     dupcheck.check(functionPointer);
        // }
        const returnTypeResolved = remapType(returnType);
        const pimaker = new ParamInfoMaker(returnTypeResolved, opts, params.map(remapType)); // check param count also
        let vfoff;
        if (functionPointer instanceof Array) {
            vfoff = functionPointer[0];
            if (typeof vfoff !== 'number') {
                throwTypeError(1, 'type', typeof functionPointer, '*Pointer or [number, number] required');
            }
        }
        else if (!(functionPointer instanceof core_1.VoidPointer)) {
            return symbolNotFound;
        }
        const paramsSize = pimaker.countOnCpp * 8;
        const func = new Maker(pimaker, paramsSize, true);
        if (opts && opts.nativeDebugBreak)
            func.debugBreak();
        const spaceForTemp = 0x10;
        const spaceForCalling = 0x20;
        func.stackSize += spaceForTemp; // space for tempPtr()
        func.stackSize += spaceForCalling;
        if (pimaker.structureReturn) {
            func.stackSize += 8; // structureReturn space
            const localSize = pimaker.return.type[makefunc.js2npLocalSize];
            if (localSize)
                func.stackSize += localSize;
            else if (pimaker.return.type[core_1.StructurePointer.contentSize] == null) {
                throw Error(`unknown size, need the size for structureReturn:true (${pimaker.return.type.name})`);
            }
        }
        // calculate local space size
        for (const param of pimaker.params) {
            const localSize = param.type[makefunc.js2npLocalSize];
            if (localSize)
                func.stackSize += localSize;
        }
        func.calculateStackSize();
        // structure return space
        let offset = spaceForTemp;
        if (pimaker.structureReturn) {
            func.offsetForStructureReturn = offset;
            offset += 8;
            const localSize = pimaker.return.type[makefunc.js2npLocalSize];
            if (localSize) {
                pimaker.return.offsetForLocalSpace = offset;
                offset += localSize;
            }
        }
        // local spaces
        for (const param of pimaker.params) {
            const localSize = param.type[makefunc.js2npLocalSize];
            if (localSize) {
                param.offsetForLocalSpace = offset;
                offset += localSize;
            }
        }
        let targetfuncptr;
        if (vfoff === undefined) {
            targetfuncptr = functionPointer;
        }
        else {
            targetfuncptr = null;
        }
        if (pimaker.countOnCalling !== 0) {
            func.cmp_r_c(assembler_1.Register.r9, pimaker.countOnCalling + 1);
            func.jz_label('!');
            func.mov_r_c(assembler_1.Register.rdx, pimaker.countOnCalling);
            func.lea_r_rp(assembler_1.Register.rcx, assembler_1.Register.r9, 1, -1);
            func.jmp_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_getout_invalid_parameter_count);
            func.close_label('!');
        }
        func.mov_r_r(assembler_1.Register.rsi, assembler_1.Register.r8);
        func.lea_r_rp(assembler_1.Register.rbp, assembler_1.Register.rsp, 1, -func.stackSize + paramsSize + spaceForCalling);
        func.sub_r_c(assembler_1.Register.rsp, func.stackSize);
        if (pimaker.countOnCpp > 1) {
            const last = pimaker.countOnCpp - 1;
            let offset = -paramsSize;
            for (let i = 0; i < pimaker.countOnCpp; i++) {
                const info = pimaker.params[i];
                func.jsToNative(info, i !== last ? Target.memory(assembler_1.Register.rbp, offset) : i < 4 ?
                    Target[i] :
                    Target.memory(assembler_1.Register.rbp, offset), Target.memory(assembler_1.Register.rsi, info.numberOnUsing * 8));
                offset += 8;
            }
            if (func.useStackAllocator) {
                func.mov_r_c(assembler_1.Register.rax, core_1.chakraUtil.stack_ptr);
                func.or_rp_c(assembler_1.Register.rax, 1, 0, 1);
            }
            // paramCountOnCpp >= 2
            const n = Math.min(pimaker.countOnCpp - 1, 4);
            for (let i = 0; i < n; i++) {
                pimaker.params[i].type[makefunc.np2npAsm](func, makefunc.Target[i], Target.memory(assembler_1.Register.rsp, 8 * i + spaceForCalling), pimaker.params[i]);
            }
        }
        else {
            if (pimaker.countOnCpp !== 0) {
                const pi = pimaker.params[0];
                func.jsToNative(pi, makefunc.Target[0], Target.memory(assembler_1.Register.rsi, pi.numberOnUsing * 8));
            }
            if (func.useStackAllocator) {
                func.mov_r_c(assembler_1.Register.rax, core_1.chakraUtil.stack_ptr);
                func.or_rp_c(assembler_1.Register.rax, 1, 0, 1);
            }
        }
        func.add_r_c(assembler_1.Register.rsp, spaceForCalling);
        if (targetfuncptr !== null) {
            func.call64(targetfuncptr, assembler_1.Register.rax);
        }
        else {
            const thisoff = functionPointer[1] || 0;
            func.mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rcx, 1, thisoff);
            func.call_rp(assembler_1.Register.rax, 1, vfoff);
        }
        func.sub_r_c(assembler_1.Register.rsp, spaceForCalling);
        let returnTarget = Target.return;
        let returnInMemory = null;
        if (func.useStackAllocator) {
            returnTarget = Target.memory(assembler_1.Register.rbp, 0);
        }
        if (pimaker.structureReturn) {
            if (pimaker.return.offsetForLocalSpace !== null) {
                if (pimaker.return.type[makefunc.pointerReturn]) {
                    func.lea_t_rp(Target[0], assembler_1.Register.rbp, 1, pimaker.return.offsetForLocalSpace);
                }
                else {
                    pimaker.return.type[makefunc.np2npAsm](func, Target[0], Target.memory(assembler_1.Register.rbp, pimaker.return.offsetForLocalSpace), pimaker.return);
                }
                func.nativeToJs(pimaker.return, returnTarget, Target[0]);
            }
            else {
                returnInMemory = Target.memory(assembler_1.Register.rbp, func.offsetForStructureReturn);
            }
        }
        else {
            func.nativeToJs(pimaker.return, returnTarget, Target.return);
        }
        if (func.useStackAllocator) {
            func.mov_r_c(assembler_1.Register.rdx, core_1.chakraUtil.stack_ptr);
            func.and_rp_c(assembler_1.Register.rdx, 1, 0, -2);
            func.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_stack_free_all);
        }
        if (returnInMemory !== null) {
            func.qmov_t_t(Target.return, returnInMemory);
        }
        else if (func.useStackAllocator) {
            func.qmov_t_t(Target.return, returnTarget);
        }
        func.end();
        const nativecode = func.alloc();
        const funcout = core_1.chakraUtil.JsCreateFunction(nativecode, null);
        funcout.pointer = functionPointer;
        return funcout;
    }
    makefunc.js = js;
    makefunc.asJsValueRef = core_1.chakraUtil.asJsValueRef;
    makefunc.Ansi = new ParamableT('Ansi', (asm, target, source, info) => {
        asm.qmov_t_t(Target[0], source);
        asm.xor_r_r(assembler_1.Register.r9, assembler_1.Register.r9);
        asm.mov_r_c(assembler_1.Register.r8, core_1.chakraUtil.stack_ansi);
        asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_str_js2np);
        asm.qmov_t_t(target, Target.return);
        asm.useStackAllocator = true;
    }, (asm, target, source, info) => {
        const temp = target.tempPtr();
        asm.qmov_t_t(Target[0], source);
        asm.lea_r_rp(assembler_1.Register.r8, temp.reg, 1, temp.offset);
        asm.xor_r_r(assembler_1.Register.rdx, assembler_1.Register.rdx);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_ansi_np2js);
        asm.throwIfNonZero(info);
        asm.qmov_t_t(target, temp);
    }, qwordMove);
    makefunc.Utf8 = new ParamableT('Utf8', (asm, target, source, info) => {
        asm.qmov_t_t(Target[0], source);
        asm.xor_r_r(assembler_1.Register.r9, assembler_1.Register.r9);
        asm.mov_r_c(assembler_1.Register.r8, core_1.chakraUtil.stack_utf8);
        asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_str_js2np);
        asm.qmov_t_t(target, Target.return);
        asm.useStackAllocator = true;
    }, (asm, target, source, info) => {
        const temp = target.tempPtr();
        asm.qmov_t_t(Target[0], source);
        asm.lea_r_rp(assembler_1.Register.r8, temp.reg, 1, temp.offset);
        asm.xor_r_r(assembler_1.Register.rdx, assembler_1.Register.rdx);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_utf8_np2js);
        asm.throwIfNonZero(info);
        asm.qmov_t_t(target, temp);
    }, qwordMove);
    makefunc.Utf16 = new ParamableT('Utf16', (asm, target, source, info) => {
        asm.qmov_t_t(Target[0], source);
        asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_utf16_js2np);
        asm.qmov_t_t(target, Target.return);
    }, (asm, target, source, info) => {
        asm.qmov_t_t(Target[0], source);
        asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_utf16_np2js);
        asm.qmov_t_t(target, Target.return);
    }, qwordMove);
    makefunc.Buffer = new ParamableT('Buffer', (asm, target, source, info) => {
        asm.qmov_t_t(Target[0], source);
        asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_buffer_to_pointer);
        asm.qmov_t_t(target, Target.return);
    }, (asm, target, source, info) => {
        asm.qmov_t_t(Target[0], source);
        asm.mov_r_c(assembler_1.Register.rdx, info.numberOnUsing);
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_utf16_np2js);
        asm.qmov_t_t(target, Target.return);
    }, qwordMove);
    makefunc.JsValueRef = new ParamableT('JsValueRef', qwordMove, qwordMove, qwordMove);
})(makefunc = exports.makefunc || (exports.makefunc = {}));
const StructureReturnAllocation = new makefunc.ParamableT('StructureReturnAllocation', common_1.abstract, common_1.abstract, qwordMove);
core_1.VoidPointer[makefunc.js2npAsm] = function (asm, target, source, info) {
    pointerClassOrThrow(info.numberOnMaking, info.type);
    asm.qmov_t_t(makefunc.Target[0], source);
    asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_pointer_js2class);
    asm.test_r_r(assembler_1.Register.rax, assembler_1.Register.rax);
    asm.jz_label('!'); // cannot use cmovnz
    asm.mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rax, 1, 0x10);
    asm.close_label('!');
    asm.qmov_t_t(target, makefunc.Target.return);
};
core_1.VoidPointer[makefunc.np2jsAsm] = function (asm, target, source, info) {
    pointerClassOrThrow(info.numberOnMaking, info.type);
    core_1.chakraUtil.JsAddRef(info.type);
    asm.qmov_t_t(makefunc.Target[1], source);
    asm.mov_r_c(assembler_1.Register.rcx, core_1.chakraUtil.asJsValueRef(info.type));
    if (info.type[makefunc.nullAlsoInstance] || (info.numberOnUsing === PARAMNUM_RETURN && asm.pi.structureReturn)) {
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_pointer_np2js);
    }
    else {
        asm.call_rp(assembler_1.Register.rdi, 1, makefunc_defines_1.makefuncDefines.fn_pointer_np2js_nullable);
    }
    asm.qmov_t_t(target, makefunc.Target.return);
};
core_1.VoidPointer[makefunc.np2npAsm] = qwordMove;
core_1.VoidPointer.prototype[assembler_1.asm.splitTwo32Bits] = function () {
    return [this.getAddressLow(), this.getAddressHigh()];
};
Uint8Array.prototype[assembler_1.asm.splitTwo32Bits] = function () {
    const ptr = new core_1.NativePointer;
    ptr.setAddressFromBuffer(this);
    return [ptr.getAddressLow(), ptr.getAddressHigh()];
};
assembler_1.X64Assembler.prototype.make = function (returnType, opts, ...params) {
    return makefunc.js(this.alloc(), returnType, opts, ...params);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZWZ1bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWtlZnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBc0g7QUFDdEgsMkNBQTRDO0FBQzVDLHVCQUFxQjtBQUNyQixxQ0FBZ0Q7QUFDaEQsaUNBQWtKO0FBQ2xKLHFDQUFrQztBQUNsQyx5REFBcUQ7QUFDckQsNkRBQWtEO0FBQ2xELGlDQUE4QztBQUM5Qyx5Q0FBMEM7QUFFMUM7O0dBRUc7QUFDSCxJQUFZLFNBMkJYO0FBM0JELFdBQVksU0FBUztJQUNqQiw4QkFBOEI7SUFDakMsMkNBQUssQ0FBQTtJQUNGLHVDQUF1QztJQUMxQyx5REFBWSxDQUFBO0lBQ1QsZ0NBQWdDO0lBQ25DLCtDQUFPLENBQUE7SUFDSixnQ0FBZ0M7SUFDbkMsK0NBQU8sQ0FBQTtJQUNKLG9DQUFvQztJQUN2QyxxREFBVSxDQUFBO0lBQ1Asb0NBQW9DO0lBQ3ZDLHFEQUFVLENBQUE7SUFDUCxxQ0FBcUM7SUFDeEMsdURBQVcsQ0FBQTtJQUNSLHNDQUFzQztJQUN6Qyw2Q0FBTSxDQUFBO0lBQ0gsOEJBQThCO0lBQ2pDLDJDQUFLLENBQUE7SUFDRiw2QkFBNkI7SUFDaEMsK0NBQU8sQ0FBQTtJQUNKLDBDQUEwQztJQUM3QyxzREFBVSxDQUFBO0lBQ1AsNkJBQTZCO0lBQ2hDLDBDQUFJLENBQUE7SUFDRCxnQ0FBZ0M7SUFDbkMsMkNBQVMsQ0FBQTtBQUNWLENBQUMsRUEzQlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUEyQnBCO0FBSUQsTUFBTSxZQUFZLEdBQUcsaUJBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsTUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxpQkFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUks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