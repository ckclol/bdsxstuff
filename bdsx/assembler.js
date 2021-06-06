"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asm = exports.X64Assembler = exports.JumpOperation = exports.Operator = exports.OperationSize = exports.FloatRegister = exports.Register = void 0;
const bin_1 = require("./bin");
const polynominal_1 = require("./polynominal");
const source_map_support_1 = require("./source-map-support");
const textparser_1 = require("./textparser");
const util_1 = require("./util");
const bufferstream_1 = require("./writer/bufferstream");
const scriptwriter_1 = require("./writer/scriptwriter");
const fs = require("fs");
const colors = require("colors");
var Register;
(function (Register) {
    Register[Register["absolute"] = -2] = "absolute";
    Register[Register["rip"] = -1] = "rip";
    Register[Register["rax"] = 0] = "rax";
    Register[Register["rcx"] = 1] = "rcx";
    Register[Register["rdx"] = 2] = "rdx";
    Register[Register["rbx"] = 3] = "rbx";
    Register[Register["rsp"] = 4] = "rsp";
    Register[Register["rbp"] = 5] = "rbp";
    Register[Register["rsi"] = 6] = "rsi";
    Register[Register["rdi"] = 7] = "rdi";
    Register[Register["r8"] = 8] = "r8";
    Register[Register["r9"] = 9] = "r9";
    Register[Register["r10"] = 10] = "r10";
    Register[Register["r11"] = 11] = "r11";
    Register[Register["r12"] = 12] = "r12";
    Register[Register["r13"] = 13] = "r13";
    Register[Register["r14"] = 14] = "r14";
    Register[Register["r15"] = 15] = "r15";
})(Register = exports.Register || (exports.Register = {}));
var FloatRegister;
(function (FloatRegister) {
    FloatRegister[FloatRegister["xmm0"] = 0] = "xmm0";
    FloatRegister[FloatRegister["xmm1"] = 1] = "xmm1";
    FloatRegister[FloatRegister["xmm2"] = 2] = "xmm2";
    FloatRegister[FloatRegister["xmm3"] = 3] = "xmm3";
    FloatRegister[FloatRegister["xmm4"] = 4] = "xmm4";
    FloatRegister[FloatRegister["xmm5"] = 5] = "xmm5";
    FloatRegister[FloatRegister["xmm6"] = 6] = "xmm6";
    FloatRegister[FloatRegister["xmm7"] = 7] = "xmm7";
    FloatRegister[FloatRegister["xmm8"] = 8] = "xmm8";
    FloatRegister[FloatRegister["xmm9"] = 9] = "xmm9";
    FloatRegister[FloatRegister["xmm10"] = 10] = "xmm10";
    FloatRegister[FloatRegister["xmm11"] = 11] = "xmm11";
    FloatRegister[FloatRegister["xmm12"] = 12] = "xmm12";
    FloatRegister[FloatRegister["xmm13"] = 13] = "xmm13";
    FloatRegister[FloatRegister["xmm14"] = 14] = "xmm14";
    FloatRegister[FloatRegister["xmm15"] = 15] = "xmm15";
})(FloatRegister = exports.FloatRegister || (exports.FloatRegister = {}));
var MovOper;
(function (MovOper) {
    MovOper[MovOper["Register"] = 0] = "Register";
    MovOper[MovOper["Const"] = 1] = "Const";
    MovOper[MovOper["Read"] = 2] = "Read";
    MovOper[MovOper["Write"] = 3] = "Write";
    MovOper[MovOper["WriteConst"] = 4] = "WriteConst";
    MovOper[MovOper["Lea"] = 5] = "Lea";
})(MovOper || (MovOper = {}));
var FloatOper;
(function (FloatOper) {
    FloatOper[FloatOper["None"] = 0] = "None";
    FloatOper[FloatOper["Convert_f2i"] = 1] = "Convert_f2i";
    FloatOper[FloatOper["Convert_i2f"] = 2] = "Convert_i2f";
    FloatOper[FloatOper["ConvertTruncated_f2i"] = 3] = "ConvertTruncated_f2i";
    FloatOper[FloatOper["ConvertPrecision"] = 4] = "ConvertPrecision";
})(FloatOper || (FloatOper = {}));
var FloatOperSize;
(function (FloatOperSize) {
    FloatOperSize[FloatOperSize["xmmword"] = 0] = "xmmword";
    FloatOperSize[FloatOperSize["singlePrecision"] = 1] = "singlePrecision";
    FloatOperSize[FloatOperSize["doublePrecision"] = 2] = "doublePrecision";
})(FloatOperSize || (FloatOperSize = {}));
var OperationSize;
(function (OperationSize) {
    OperationSize[OperationSize["void"] = 0] = "void";
    OperationSize[OperationSize["byte"] = 1] = "byte";
    OperationSize[OperationSize["word"] = 2] = "word";
    OperationSize[OperationSize["dword"] = 3] = "dword";
    OperationSize[OperationSize["qword"] = 4] = "qword";
    OperationSize[OperationSize["mmword"] = 5] = "mmword";
    OperationSize[OperationSize["xmmword"] = 6] = "xmmword";
})(OperationSize = exports.OperationSize || (exports.OperationSize = {}));
const sizemap = new Map([
    ['void', { bytes: 0, size: OperationSize.void }],
    ['byte', { bytes: 1, size: OperationSize.byte }],
    ['word', { bytes: 2, size: OperationSize.word }],
    ['dword', { bytes: 4, size: OperationSize.dword }],
    ['qword', { bytes: 8, size: OperationSize.qword }],
    ['xmmword', { bytes: 16, size: OperationSize.xmmword }],
]);
var Operator;
(function (Operator) {
    Operator[Operator["add"] = 0] = "add";
    Operator[Operator["or"] = 1] = "or";
    Operator[Operator["adc"] = 2] = "adc";
    Operator[Operator["sbb"] = 3] = "sbb";
    Operator[Operator["and"] = 4] = "and";
    Operator[Operator["sub"] = 5] = "sub";
    Operator[Operator["xor"] = 6] = "xor";
    Operator[Operator["cmp"] = 7] = "cmp";
})(Operator = exports.Operator || (exports.Operator = {}));
var JumpOperation;
(function (JumpOperation) {
    JumpOperation[JumpOperation["jo"] = 0] = "jo";
    JumpOperation[JumpOperation["jno"] = 1] = "jno";
    JumpOperation[JumpOperation["jb"] = 2] = "jb";
    JumpOperation[JumpOperation["jae"] = 3] = "jae";
    JumpOperation[JumpOperation["je"] = 4] = "je";
    JumpOperation[JumpOperation["jne"] = 5] = "jne";
    JumpOperation[JumpOperation["jbe"] = 6] = "jbe";
    JumpOperation[JumpOperation["ja"] = 7] = "ja";
    JumpOperation[JumpOperation["js"] = 8] = "js";
    JumpOperation[JumpOperation["jns"] = 9] = "jns";
    JumpOperation[JumpOperation["jp"] = 10] = "jp";
    JumpOperation[JumpOperation["jnp"] = 11] = "jnp";
    JumpOperation[JumpOperation["jl"] = 12] = "jl";
    JumpOperation[JumpOperation["jge"] = 13] = "jge";
    JumpOperation[JumpOperation["jle"] = 14] = "jle";
    JumpOperation[JumpOperation["jg"] = 15] = "jg";
})(JumpOperation = exports.JumpOperation || (exports.JumpOperation = {}));
const INT8_MIN = -0x80;
const INT8_MAX = 0x7f;
const INT16_MAX = 0x7fff;
const INT32_MIN = -0x80000000;
const INT32_MAX = 0x7fffffff;
const COMMENT_REGEXP = /[;#]/;
function split64bits(value) {
    switch (typeof value) {
        case 'string':
            return bin_1.bin.int32_2(value);
        case 'object':
            return value[asm.splitTwo32Bits]();
        case 'number': {
            const lowbits = value | 0;
            let highbits = ((value - lowbits) / 0x100000000);
            highbits = highbits >= 0 ? Math.floor(highbits) : Math.ceil(highbits);
            return [lowbits, highbits];
        }
        default:
            throw Error(`invalid constant value: ${value}`);
    }
}
function is32Bits(value) {
    switch (typeof value) {
        case 'string': {
            const [low, high] = bin_1.bin.int32_2(value);
            return high === (low >> 31);
        }
        case 'object': {
            const [low, high] = value[asm.splitTwo32Bits]();
            return high === (low >> 31);
        }
        case 'number':
            return value === (value | 0);
        default:
            throw Error(`invalid constant value: ${value}`);
    }
}
class SplitedJump {
    constructor(info, label, args, pos) {
        this.info = info;
        this.label = label;
        this.args = args;
        this.pos = pos;
    }
}
class AsmChunk extends bufferstream_1.BufferWriter {
    constructor(array, size) {
        super(array, size);
        this.prev = null;
        this.next = null;
        this.jump = null;
        this.ids = [];
        this.unresolved = [];
    }
    setInt32(n, offset) {
        if (this.size + 4 < offset)
            throw RangeError('Out of range');
        n |= 0;
        this.array[n] = offset;
        this.array[n + 1] = offset >> 8;
        this.array[n + 2] = offset >> 16;
        this.array[n + 3] = offset >> 24;
    }
    connect(next) {
        if (this.next !== null)
            throw Error('Already connected chunk');
        if (next.prev !== null)
            throw Error('Already connected chunk');
        this.next = next;
        next.prev = this;
    }
    removeNext() {
        const chunk = this.next;
        if (chunk === null)
            return false;
        this.jump = chunk.jump;
        chunk.jump = null;
        for (const label of chunk.ids) {
            label.chunk = this;
            label.offset += this.size;
        }
        this.ids.push(...chunk.ids);
        for (const jump of chunk.unresolved) {
            jump.offset += this.size;
        }
        this.unresolved.push(...chunk.unresolved);
        this.write(chunk.buffer());
        const next = chunk.next;
        this.next = next;
        if (next !== null)
            next.prev = this;
        chunk.unresolved.length = 0;
        chunk.ids.length = 0;
        chunk.next = null;
        chunk.prev = null;
        return true;
    }
    resolveAll() {
        for (const unresolved of this.unresolved) {
            const addr = unresolved.address;
            const size = unresolved.bytes;
            let offset = addr.offset - unresolved.offset - size;
            if (addr.chunk === MEMORY_INDICATE_CHUNK) {
                offset += this.size;
            }
            else if (addr.chunk === null) {
                throw new textparser_1.ParsingError(`${addr.name}: Label not found`, unresolved.pos);
            }
            else if (addr.chunk !== this) {
                throw Error('Different chunk. internal problem.');
            }
            const arr = this.array;
            let i = unresolved.offset;
            const to = i + size;
            for (; i !== to; i++) {
                arr[i] = offset;
                offset >>= 8;
            }
        }
        this.unresolved.length = 0;
    }
}
class Identifier {
    constructor(name) {
        this.name = name;
    }
}
class Constant extends Identifier {
    constructor(name, value) {
        super(name);
        this.value = value;
    }
}
class AddressIdentifier extends Identifier {
    constructor(name, chunk, offset) {
        super(name);
        this.chunk = chunk;
        this.offset = offset;
    }
}
class Label extends AddressIdentifier {
    constructor(name) {
        super(name, null, 0);
    }
}
class Defination extends AddressIdentifier {
    constructor(name, chunk, offset, size) {
        super(name, chunk, offset);
        this.size = size;
    }
}
class JumpInfo {
    constructor(byteSize, dwordSize, addrSize, func) {
        this.byteSize = byteSize;
        this.dwordSize = dwordSize;
        this.addrSize = addrSize;
        this.func = func;
    }
}
class UnresolvedConstant {
    constructor(offset, bytes, address, pos) {
        this.offset = offset;
        this.bytes = bytes;
        this.address = address;
        this.pos = pos;
    }
}
const SIZE_MAX_VAL = {
    [OperationSize.byte]: INT8_MAX,
    [OperationSize.word]: INT16_MAX,
    [OperationSize.dword]: INT32_MAX,
    [OperationSize.qword]: bin_1.bin.make64(INT32_MAX, -1),
};
const MEMORY_INDICATE_CHUNK = new AsmChunk(new Uint8Array(0), 0);
const PARAM_REG_OFFSETS = [
    null,
    -0x00,
    -0x08,
    null,
    null,
    null,
    null,
    null,
    -0x10,
    -0x18, // r9,
];
class X64Assembler {
    constructor(buffer, size) {
        this.memoryChunkSize = 0;
        this.memoryChunkAlign = 1;
        this.constChunk = null;
        this.sehUnwindCount = 0;
        this.sehFuncCount = 0;
        this.ids = new Map();
        this.scopeStack = [];
        this.scope = new Set();
        this.pos = null;
        this.chunk = new AsmChunk(buffer, size);
    }
    _polynominal(text, offset, lineNumber) {
        let res = polynominal_1.polynominal.parse(text, lineNumber, offset);
        for (const [name, value] of this.ids) {
            if (!(value instanceof Constant))
                continue;
            res = res.defineVariable(name, value.value);
        }
        return res;
    }
    _polynominalToAddress(text, offset, lineNumber) {
        const poly = this._polynominal(text, offset, lineNumber).asAdditive();
        let varcount = 0;
        function error(message, column = 0, width = text.length) {
            throw new textparser_1.ParsingError(message, {
                column: offset + column,
                width: width,
                line: lineNumber
            });
        }
        const regs = [];
        let mult = 1;
        for (const term of poly.terms) {
            if (term.variables.length > 1) {
                error(`polynominal is too complex, variables are multiplying`);
            }
            const v = term.variables[0];
            if (!v.degree.equalsConstant(1))
                error(`polynominal is too complex, degree is not 1`);
            if (!(v.term instanceof polynominal_1.polynominal.Name))
                error('polynominal is too complex, complex term');
            switch (term.constant) {
                case 1:
                case 2:
                case 4:
                case 8:
                    break;
                default: error('unexpected constant for multiplying. only possible with 1,2,4,8');
            }
            const type = regmap.get(v.term.name.toLowerCase());
            if (type) {
                const [argname, reg, size] = type;
                if (argname.short !== 'r')
                    error(`unexpected identifier: ${v.term.name}`, v.term.column, v.term.length);
                if (size !== OperationSize.qword)
                    error(`unexpected register: ${v.term.name}`);
                varcount++;
                if (varcount >= 3)
                    error(`polynominal has too many variables`);
                if (term.constant !== 1) {
                    if (mult !== 1)
                        error('too many multiplying.');
                    mult = term.constant;
                    regs.unshift(reg);
                }
                else {
                    regs.push(reg);
                }
            }
            else {
                const identifier = this.ids.get(v.term.name);
                if (!identifier) {
                    error(`identifier not found: ${v.term.name}`, v.term.column, v.term.length);
                }
                error(`Invalid identifier: ${v.term.name}`, v.term.column, v.term.length);
            }
        }
        if (regs.length > 3)
            error('Too many registers');
        while (regs.length < 2)
            regs.push(null);
        return {
            r1: regs[0],
            r2: regs[1],
            multiply: mult,
            offset: poly.constant
        };
    }
    getDefAreaSize() {
        return this.memoryChunkSize;
    }
    getDefAreaAlign() {
        return this.memoryChunkAlign;
    }
    setDefArea(size, align) {
        this.memoryChunkSize = size;
        this.memoryChunkAlign = align;
        const alignbit = Math.log2(align);
        if ((alignbit | 0) !== alignbit)
            throw Error(`Invalid alignment ${align}`);
    }
    connect(cb) {
        return cb(this);
    }
    put(value) {
        this.chunk.put(value);
        return this;
    }
    write(...values) {
        this.chunk.write(values);
        return this;
    }
    writeBuffer(buffer) {
        this.chunk.write(buffer);
        return this;
    }
    writeInt16(value) {
        return this.write(value & 0xff, (value >>> 8) & 0xff);
    }
    writeInt32(value) {
        return this.write(value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24));
    }
    labels() {
        this._normalize();
        const labels = {};
        for (const [name, label] of this.ids) {
            if (label instanceof Label) {
                labels[name] = label.offset;
            }
        }
        return labels;
    }
    defs() {
        this._normalize();
        const labels = {};
        for (const [name, label] of this.ids) {
            if (label instanceof Defination) {
                labels[name] = label.offset;
            }
        }
        return labels;
    }
    exports() {
        this._normalize();
        const labels = {};
        for (const [name, label] of this.ids) {
            if (label instanceof Defination) {
                labels[name] = label.offset;
            }
        }
        return labels;
    }
    buffer() {
        this._normalize();
        return this.chunk.buffer();
    }
    ret() {
        return this.put(0xc3);
    }
    nop() {
        return this.put(0x90);
    }
    debugBreak() {
        return this.int3();
    }
    int3() {
        return this.put(0xcc);
    }
    int_c(n) {
        if (n === 3)
            return this.int3();
        return this.write(0xcd, n & 0xff);
    }
    cbw() {
        return this.write(0x66, 0x98);
    }
    cwde() {
        return this.write(0x98);
    }
    cdqe() {
        return this.write(0x48, 0x98);
    }
    gs() {
        return this.put(0x65);
    }
    fs() {
        return this.put(0x64);
    }
    ds() {
        return this;
    }
    cs() {
        return this.put(0x2e);
    }
    es() {
        return this.put(0x26);
    }
    ss() {
        return this.put(0x36);
    }
    repz() {
        return this.write(0xf3);
    }
    repnz() {
        return this.write(0xf2);
    }
    _target(opcode, r1, r2, r3, targetRegister, multiplying, offset, oper) {
        if (r2 !== null) {
            opcode |= (r2 & 7) << 3;
        }
        if (oper === MovOper.Register || oper === MovOper.Const) {
            if (offset !== 0)
                throw Error('Register operation with offset');
            return this.put(opcode | (r1 & 7) | 0xc0);
        }
        if (offset !== (offset | 0))
            throw Error(`need int32 offset, offset=${offset}`);
        if (r1 === Register.absolute) {
            if (r3 !== null) {
                throw Error('Invalid opcode');
            }
            this.put(opcode | 0x04);
            this.put(0x25);
            this.writeInt32(offset);
            return this;
        }
        else if (r1 === Register.rip) {
            if (r3 !== null) {
                throw Error('Invalid opcode');
            }
            this.put(opcode | 0x05);
            this.writeInt32(offset);
            return this;
        }
        if (offset === 0 && r1 !== Register.rbp) {
            // empty
        }
        else if (INT8_MIN <= offset && offset <= INT8_MAX) {
            opcode |= 0x40;
        }
        else {
            opcode |= 0x80;
        }
        if (r3 !== null) {
            if (r1 === Register.rsp) {
                throw Error(`Invalid operation r1=rsp, r3=${Register[r3]}`);
            }
            switch (multiplying) {
                case 1: break;
                case 2:
                    opcode |= 0x40;
                    break;
                case 4:
                    opcode |= 0x80;
                    break;
                case 8:
                    opcode |= 0xc0;
                    break;
                default: throw Error(`Invalid multiplying ${multiplying}`);
            }
            this.put(opcode | 0x04);
            opcode |= (r3 & 7) << 3;
        }
        this.put((r1 & 7) | opcode);
        if (targetRegister === Register.rsp) {
            this.put(0x24);
        }
        if (opcode & 0x40)
            this.put(offset);
        else if (opcode & 0x80) {
            this.writeInt32(offset);
        }
        return this;
    }
    _rex(r1, r2, r3, size) {
        if (size === OperationSize.word)
            this.put(0x66);
        let rex = 0x40;
        if (size === OperationSize.qword)
            rex |= 0x08;
        if (r1 >= Register.r8)
            rex |= 0x01;
        if (r2 !== null && r2 >= Register.r8)
            rex |= 0x04;
        if (r3 !== null && r3 >= Register.r8)
            rex |= 0x02;
        if (rex !== 0x40)
            this.put(rex);
    }
    _const(v, size) {
        const [low32, high32] = split64bits(v);
        if (size === OperationSize.byte) {
            this.put(low32 & 0xff);
        }
        else if (size === OperationSize.word) {
            this.writeInt16(low32 & 0xffff);
        }
        else if (size === OperationSize.qword) {
            this.writeInt32(low32);
            this.writeInt32(high32);
        }
        else {
            this.writeInt32(low32);
        }
        return this;
    }
    _mov(r1, r2, r3, multiply, offset, value, oper, size) {
        this._rex(r1, r2, r3, size);
        let opcode = 0;
        if (size === OperationSize.byte) {
            if (oper === MovOper.WriteConst) {
                this.put(0xc6);
            }
            else if (oper === MovOper.Const) {
                opcode |= 0xb0;
            }
        }
        else {
            if (oper === MovOper.WriteConst) {
                this.put(0xc7);
            }
            else if (oper === MovOper.Const) {
                if (size === OperationSize.qword && is32Bits(value)) {
                    size = OperationSize.dword;
                    this.put(0xc7);
                    opcode |= 0xc0;
                }
                else {
                    opcode |= 0xb8;
                }
            }
        }
        if (oper !== MovOper.Const && oper !== MovOper.WriteConst) {
            if (oper === MovOper.Lea && size !== OperationSize.dword && size !== OperationSize.qword) {
                throw Error('Invalid operation');
            }
            let memorytype = 0x88;
            if (oper === MovOper.Lea)
                memorytype |= 0x05;
            else if (oper === MovOper.Read)
                memorytype |= 0x02;
            if (size !== OperationSize.byte)
                memorytype |= 0x01;
            this.put(memorytype);
        }
        if (oper === MovOper.Const) {
            this.put(opcode | (r1 & 7));
        }
        else {
            this._target(opcode, r1, r2, r3, r1, multiply, offset, oper);
        }
        if (oper === MovOper.WriteConst) {
            this._const(value, size === OperationSize.qword ? OperationSize.dword : size);
        }
        else if (oper === MovOper.Const) {
            this._const(value, size);
        }
        return this;
    }
    _jmp(isCall, r, multiply, offset, oper) {
        if (r >= Register.r8)
            this.put(0x41);
        this.put(0xff);
        this._target(isCall ? 0x10 : 0x20, r, null, null, r, multiply, offset, oper);
        return this;
    }
    _jmp_r(isCall, r) {
        return this._jmp(isCall, r, 1, 0, MovOper.Register);
    }
    movabs_r_c(dest, value, size = OperationSize.qword) {
        if (size !== OperationSize.qword)
            throw Error(`Invalid operation size ${OperationSize[size]}`);
        return this.mov_r_c(dest, value, size);
    }
    def(name, size, bytes, align, exportDef = false) {
        if (align < 1)
            align = 1;
        const alignbit = Math.log2(align);
        if ((alignbit | 0) !== alignbit)
            throw Error(`Invalid alignment ${align}`);
        if (align > this.memoryChunkAlign) {
            this.memoryChunkAlign = align;
        }
        const memSize = this.memoryChunkSize;
        const offset = (memSize + align - 1) & ~(align - 1);
        this.memoryChunkSize = offset + bytes;
        if (name === '')
            return this;
        if (this.ids.has(name))
            throw Error(`${name} is already defined`);
        this.ids.set(name, new Defination(name, MEMORY_INDICATE_CHUNK, offset, size));
        if (!exportDef)
            this.scope.add(name);
        return this;
    }
    lea_r_cp(dest, offset, size = OperationSize.qword) {
        return this.mov_r_c(dest, offset, size);
    }
    lea_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        if (offset === 0 && src !== Register.rip) {
            if (dest === src)
                return this;
            return this.mov_r_r(dest, src, size);
        }
        return this._mov(src, dest, null, multiply, offset, 0, MovOper.Lea, size);
    }
    lea_r_rrp(dest, src1, src2, multiply, offset, size = OperationSize.qword) {
        return this._mov(src1, dest, src2, multiply, offset, 0, MovOper.Lea, size);
    }
    /**
     * move register to register
     */
    mov_r_r(dest, src, size = OperationSize.qword) {
        return this._mov(dest, src, null, 1, 0, 0, MovOper.Register, size);
    }
    /**
     * move const to register
     */
    mov_r_c(dest, value, size = OperationSize.qword) {
        if (size === OperationSize.qword || size === OperationSize.dword) {
            const [low, high] = split64bits(value);
            if (low === 0 && high === 0)
                return this.xor_r_r(dest, dest);
        }
        return this._mov(dest, 0, null, 1, 0, value, MovOper.Const, size);
    }
    /**
     * move const to register pointer
     */
    mov_rp_c(dest, multiply, offset, value, size = OperationSize.qword) {
        return this._mov(dest, null, null, multiply, offset, value, MovOper.WriteConst, size);
    }
    /**
     * move register to register pointer
     */
    mov_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._mov(dest, src, null, multiply, offset, 0, MovOper.Write, size);
    }
    /**
     * move register pointer to register
     */
    mov_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._mov(src, dest, null, multiply, offset, 0, MovOper.Read, size);
    }
    _imul(r1, r2, multiply, offset, size, oper) {
        if (size !== OperationSize.dword && size !== OperationSize.qword && size !== OperationSize.word)
            throw Error('unsupported');
        this._rex(r1, r2, null, size);
        this.write(0x0f, 0xaf);
        this._target(0x00, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    imul_r_r(dest, src, size = OperationSize.qword) {
        return this._imul(src, dest, 1, 0, size, MovOper.Register);
    }
    imul_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._imul(src, dest, multiply, offset, size, MovOper.Write);
    }
    imul_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._imul(src, dest, multiply, offset, size, MovOper.Read);
    }
    idiv_r(src, size = OperationSize.qword) {
        this._rex(src, null, null, size);
        return this.write(0xf7, 0xf8 | src);
    }
    /**
     * jump with register
     */
    jmp_r(register) {
        return this._jmp_r(false, register);
    }
    /**
     * call with register
     */
    call_r(register) {
        return this._jmp_r(true, register);
    }
    /**
     * jump with register pointer
     */
    jmp_rp(register, multiply, offset) {
        return this._jmp(false, register, multiply, offset, MovOper.Read);
    }
    /**
     * call with register pointer
     */
    call_rp(register, multiply, offset) {
        return this._jmp(true, register, multiply, offset, MovOper.Read);
    }
    /**
     * mov tmpreg, 64bits
     * call tmpreg
     */
    call64(value, tempRegister) {
        this.mov_r_c(tempRegister, value);
        this.call_r(tempRegister);
        return this;
    }
    saveAndCall(target, keepRegister, keepFloatRegister) {
        const fullsize = keepRegister.length * 8;
        for (const r of keepRegister) {
            const off = PARAM_REG_OFFSETS[r];
            if (off == null)
                throw Error(`${Register[r]} is not the register of arguments`);
            this.mov_rp_r(Register.rsp, 1, off + fullsize, r);
        }
        if (keepFloatRegister.length !== 0) {
            this.sub_r_c(Register.rsp, 0x18);
            for (let i = 0; i < keepFloatRegister.length; i++) {
                if (i !== 0)
                    this.sub_r_c(Register.rsp, 0x10);
                this.movdqa_rp_f(Register.rsp, 1, 0, keepFloatRegister[i]);
            }
            this
                .sub_r_c(Register.rsp, 0x30)
                .call64(target, Register.rax)
                .add_r_c(Register.rsp, 0x30);
            for (let i = keepFloatRegister.length - 1; i >= 0; i--) {
                this.movdqa_f_rp(keepFloatRegister[i], Register.rsp, 1, 0);
                if (i !== 0)
                    this.add_r_c(Register.rsp, 0x10);
            }
            this.sub_r_c(Register.rsp, 0x18);
        }
        else {
            this
                .sub_r_c(Register.rsp, 0x28)
                .call64(target, Register.rax)
                .add_r_c(Register.rsp, 0x28);
        }
        for (const r of keepRegister) {
            const off = PARAM_REG_OFFSETS[r];
            this.mov_r_rp(r, Register.rsp, 1, off + fullsize);
        }
        return this;
    }
    /**
     * mov tmpreg, 64bits
     * jmp tmpreg
     */
    jmp64(value, tempRegister) {
        this.mov_r_c(tempRegister, value);
        this.jmp_r(tempRegister);
        return this;
    }
    /**
     * mov [rsp-4], high32(v)
     * mov [rsp-8],  low32(v)
     * jmp [rsp-8]
     */
    jmp64_notemp(value) {
        const [low32, high32] = split64bits(value);
        this.mov_rp_c(Register.rsp, 1, -8, low32, OperationSize.dword);
        this.mov_rp_c(Register.rsp, 1, -4, high32, OperationSize.dword);
        this.jmp_rp(Register.rsp, 1, -8);
        return this;
    }
    jmp_c(offset) {
        if (INT8_MIN <= offset && offset <= INT8_MAX) {
            return this.write(0xeb, offset);
        }
        else {
            this.put(0xe9);
            this.writeInt32(offset);
            return this;
        }
    }
    call_c(offset) {
        this.put(0xe8);
        this.writeInt32(offset);
        return this;
    }
    _movaps(r1, r2, oper, multiply, offset) {
        this._rex(r1, r2, null, OperationSize.dword);
        this.put(0x0f);
        let v = 0x28;
        if (oper === MovOper.Write)
            v |= 1;
        this.put(v);
        this._target(0, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    movaps_f_f(dest, src) {
        return this._movaps(src, dest, MovOper.Register, 1, 0);
    }
    movaps_f_rp(dest, src, multiply, offset) {
        return this._movaps(src, dest, MovOper.Read, multiply, offset);
    }
    movaps_rp_f(dest, multiply, offset, src) {
        return this._movaps(dest, src, MovOper.Write, multiply, offset);
    }
    movdqa_rp_f(dest, multiply, offset, src) {
        this.write(0x66, 0x0f, 0x7f);
        this._target(0, dest, src, null, dest, multiply, offset, MovOper.Write);
        return this;
    }
    movdqa_f_rp(dest, src, multiply, offset) {
        this.write(0x66, 0x0f, 0x7f);
        this._target(0, src, dest, null, src, multiply, offset, MovOper.Read);
        return this;
    }
    _jmp_o(oper, offset) {
        if (INT8_MIN <= offset && offset <= INT8_MAX) {
            return this.write(0x70 | oper, offset);
        }
        else {
            this.put(0x0f);
            this.put(0x80 | oper);
            this.writeInt32(offset);
        }
        return this;
    }
    jz_c(offset) { return this._jmp_o(JumpOperation.je, offset); }
    jnz_c(offset) { return this._jmp_o(JumpOperation.jne, offset); }
    jo_c(offset) { return this._jmp_o(JumpOperation.jo, offset); }
    jno_c(offset) { return this._jmp_o(JumpOperation.jno, offset); }
    jb_c(offset) { return this._jmp_o(JumpOperation.jb, offset); }
    jae_c(offset) { return this._jmp_o(JumpOperation.jae, offset); }
    je_c(offset) { return this._jmp_o(JumpOperation.je, offset); }
    jne_c(offset) { return this._jmp_o(JumpOperation.jne, offset); }
    jbe_c(offset) { return this._jmp_o(JumpOperation.jbe, offset); }
    ja_c(offset) { return this._jmp_o(JumpOperation.ja, offset); }
    js_c(offset) { return this._jmp_o(JumpOperation.js, offset); }
    jns_c(offset) { return this._jmp_o(JumpOperation.jns, offset); }
    jp_c(offset) { return this._jmp_o(JumpOperation.jp, offset); }
    jnp_c(offset) { return this._jmp_o(JumpOperation.jnp, offset); }
    jl_c(offset) { return this._jmp_o(JumpOperation.jl, offset); }
    jge_c(offset) { return this._jmp_o(JumpOperation.jge, offset); }
    jle_c(offset) { return this._jmp_o(JumpOperation.jle, offset); }
    jg_c(offset) { return this._jmp_o(JumpOperation.jg, offset); }
    _cmov_o(jmpoper, r1, r2, r3, multiply, offset, oper, size) {
        this._rex(r1, r2, r3, size);
        this.put(0x0f);
        this.put(0x40 | jmpoper);
        this._target(0, r1, r2, r3, r2, multiply, offset, oper);
        return this;
    }
    cmovz_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.je, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovnz_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jne, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovo_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jo, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovno_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jno, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovb_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jb, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovae_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jae, src, dest, null, 1, 0, MovOper.Register, size); }
    cmove_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.je, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovne_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jne, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovbe_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jbe, src, dest, null, 1, 0, MovOper.Register, size); }
    cmova_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.ja, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovs_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.js, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovns_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jns, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovp_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jp, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovnp_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jnp, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovl_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jl, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovge_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jge, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovle_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jle, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovg_r_r(dest, src, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jg, src, dest, null, 1, 0, MovOper.Register, size); }
    cmovz_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.je, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovnz_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jne, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovo_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jo, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovno_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jno, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovb_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jb, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovae_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jae, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmove_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.je, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovne_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jne, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovbe_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jbe, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmova_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.ja, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovs_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.js, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovns_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jns, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovp_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jp, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovnp_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jnp, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovl_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jl, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovge_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jge, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovle_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jle, src, dest, null, multiply, offset, MovOper.Read, size); }
    cmovg_r_rp(dest, src, multiply, offset, size = OperationSize.qword) { return this._cmov_o(JumpOperation.jg, src, dest, null, multiply, offset, MovOper.Read, size); }
    /**
     * push register
     */
    push_r(register, size = OperationSize.qword) {
        if (size === OperationSize.word) {
            this.put(0x66);
        }
        else {
            if (size !== OperationSize.qword)
                throw Error(`Operand size mismatch for push: ${OperationSize[size]}`);
        }
        if (register >= Register.r8)
            this.put(0x41);
        this.put(0x50 | (register & 7));
        return this;
    }
    /**
     * push const
     */
    push_c(value) {
        if (value !== (value | 0))
            throw Error('need int32 integer');
        if (INT8_MIN <= value && value <= INT8_MAX) {
            this.put(0x6A);
            this.put(value);
        }
        else {
            this.put(0x68);
            this.writeInt32(value);
        }
        return this;
    }
    push_rp(r, multiply, offset) {
        if (r >= Register.r8)
            this.put(0x41);
        this.put(0xff);
        this._target(0x30, r, null, null, r, multiply, offset, MovOper.Write);
        return this;
    }
    pop_r(r, size = OperationSize.qword) {
        if (size === OperationSize.word) {
            this.put(0x66);
        }
        else {
            if (size !== OperationSize.qword)
                throw Error(`Operand size mismatch for push: ${OperationSize[size]}`);
        }
        if (r >= Register.r8)
            this.put(0x41);
        this.put(0x58 | (r & 7));
        return this;
    }
    _test(r1, r2, multiply, offset, size, oper) {
        this._rex(r1, r2, null, size);
        if (size === OperationSize.byte)
            this.put(0x84);
        else
            this.put(0x85);
        this._target(0, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    test_r_r(r1, r2, size = OperationSize.qword) {
        return this._test(r1, r2, 1, 0, size, MovOper.Register);
    }
    test_r_rp(r1, r2, multiply, offset, size = OperationSize.qword) {
        return this._test(r1, r2, multiply, offset, size, MovOper.Read);
    }
    _xchg(r1, r2, multiply, offset, size, oper) {
        this._rex(r1, r2, null, size);
        if (size === OperationSize.byte)
            this.put(0x86);
        else
            this.put(0x87);
        this._target(0, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    xchg_r_r(r1, r2, size = OperationSize.qword) {
        return this._xchg(r1, r2, 1, 0, size, MovOper.Register);
    }
    xchg_r_rp(r1, r2, multiply, offset, size = OperationSize.qword) {
        return this._xchg(r1, r2, multiply, offset, size, MovOper.Read);
    }
    _oper(movoper, oper, r1, r2, multiply, offset, chr, size) {
        if (chr !== (chr | 0))
            throw Error('need 32bits integer');
        this._rex(r1, r2, null, size);
        let lowflag = size === OperationSize.byte ? 0 : 1;
        if (movoper === MovOper.WriteConst || movoper === MovOper.Const) {
            const is8bits = (INT8_MIN <= chr && chr <= INT8_MAX);
            if (!is8bits && size === OperationSize.byte)
                throw Error('need 8bits integer');
            if (!is8bits && r1 === Register.rax && movoper === MovOper.Const) {
                this.put(0x04 | lowflag | (oper << 3));
                this.writeInt32(chr);
            }
            else {
                if (is8bits) {
                    if (lowflag !== 0)
                        lowflag = 3;
                }
                this.put(0x80 | lowflag);
                this._target(0, r1, oper, null, r1, multiply, offset, movoper);
                if (is8bits)
                    this.put(chr);
                else
                    this.writeInt32(chr);
            }
        }
        else {
            this.put(lowflag | (oper << 3));
            this._target(0, r1, r2, null, r1, multiply, offset, movoper);
        }
        return this;
    }
    cmp_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.cmp, dest, src, 1, 0, 0, size);
    }
    sub_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.sub, dest, src, 1, 0, 0, size);
    }
    add_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.add, dest, src, 1, 0, 0, size);
    }
    sbb_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.sbb, dest, src, 1, 0, 0, size);
    }
    adc_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.adc, dest, src, 1, 0, 0, size);
    }
    xor_r_r(dest, src, size = OperationSize.qword) {
        if (dest === src && size === OperationSize.qword)
            size = OperationSize.dword;
        return this._oper(MovOper.Register, Operator.xor, dest, src, 1, 0, 0, size);
    }
    or_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.or, dest, src, 1, 0, 0, size);
    }
    and_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.and, dest, src, 1, 0, 0, size);
    }
    cmp_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.cmp, dest, null, 1, 0, chr, size);
    }
    sub_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.sub, dest, null, 1, 0, chr, size);
    }
    add_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.add, dest, null, 1, 0, chr, size);
    }
    sbb_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.sbb, dest, null, 1, 0, chr, size);
    }
    adc_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.adc, dest, null, 1, 0, chr, size);
    }
    xor_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.xor, dest, null, 1, 0, chr, size);
    }
    or_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.or, dest, null, 1, 0, chr, size);
    }
    and_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.and, dest, null, 1, 0, chr, size);
    }
    cmp_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.cmp, dest, 0, multiply, offset, chr, size);
    }
    sub_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.sub, dest, 0, multiply, offset, chr, size);
    }
    add_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.add, dest, 0, multiply, offset, chr, size);
    }
    sbb_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.sbb, dest, 0, multiply, offset, chr, size);
    }
    adc_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.adc, dest, 0, multiply, offset, chr, size);
    }
    xor_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.xor, dest, 0, multiply, offset, chr, size);
    }
    or_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.or, dest, 0, multiply, offset, chr, size);
    }
    and_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.and, dest, 0, multiply, offset, chr, size);
    }
    cmp_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.cmp, src, dest, multiply, offset, 0, size);
    }
    sub_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.sub, src, dest, multiply, offset, 0, size);
    }
    add_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.add, src, dest, multiply, offset, 0, size);
    }
    sbb_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.sbb, src, dest, multiply, offset, 0, size);
    }
    adc_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.adc, src, dest, multiply, offset, 0, size);
    }
    xor_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.xor, src, dest, multiply, offset, 0, size);
    }
    or_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.or, src, dest, multiply, offset, 0, size);
    }
    and_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.and, src, dest, multiply, offset, 0, size);
    }
    cmp_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.cmp, dest, src, multiply, offset, 0, size);
    }
    sub_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.sub, dest, src, multiply, offset, 0, size);
    }
    add_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.add, dest, src, multiply, offset, 0, size);
    }
    sbb_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.sbb, dest, src, multiply, offset, 0, size);
    }
    adc_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.adc, dest, src, multiply, offset, 0, size);
    }
    xor_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.xor, dest, src, multiply, offset, 0, size);
    }
    or_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.or, dest, src, multiply, offset, 0, size);
    }
    and_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.and, dest, src, multiply, offset, 0, size);
    }
    shr_r_c(dest, chr, size = OperationSize.qword) {
        this._rex(dest, 0, null, size);
        this.put(0xc1);
        this.put(0xe8 | dest);
        this.put(chr % 128);
        return this;
    }
    shl_r_c(dest, chr, size = OperationSize.qword) {
        this._rex(dest, 0, null, size);
        this.put(0xc1);
        this.put(0xe0 | dest);
        this.put(chr % 128);
        return this;
    }
    _movsx(dest, src, multiply, offset, destsize, srcsize, oper) {
        if (destsize == null || srcsize == null)
            throw Error(`Need operand size`);
        if (srcsize > OperationSize.dword)
            throw Error(`Unexpected source operand size, ${OperationSize[destsize] || destsize}`);
        if (destsize <= srcsize)
            throw Error(`Unexpected operand size, ${OperationSize[srcsize] || srcsize} to ${OperationSize[destsize] || destsize}`);
        this._rex(src, dest, null, destsize);
        switch (srcsize) {
            case OperationSize.byte:
                this.put(0x0f);
                this.put(0xbe);
                break;
            case OperationSize.word:
                this.put(0x0f);
                this.put(0xbf);
                break;
            case OperationSize.dword:
                this.put(0x63);
                break;
            default:
                throw Error(`Invalid destination operand size, ${OperationSize[srcsize] || srcsize}`);
        }
        return this._target(0, src, dest, null, src, multiply, offset, oper);
    }
    movsx_r_rp(dest, src, multiply, offset, destsize, srcsize) {
        return this._movsx(dest, src, multiply, offset, destsize, srcsize, MovOper.Read);
    }
    movsxd_r_rp(dest, src, multiply, offset) {
        return this.movsx_r_rp(dest, src, multiply, offset, OperationSize.qword, OperationSize.dword);
    }
    movsx_r_r(dest, src, destsize, srcsize) {
        return this._movsx(dest, src, 1, 0, destsize, srcsize, MovOper.Register);
    }
    movsxd_r_r(dest, src) {
        return this.movsx_r_r(dest, src, OperationSize.qword, OperationSize.dword);
    }
    _movzx(r1, r2, r3, multiply, offset, destsize, srcsize, oper) {
        if (destsize == null || srcsize == null)
            throw Error(`Need operand size`);
        if (srcsize >= OperationSize.dword)
            throw Error(`Unexpected source operand size, ${OperationSize[destsize]}`);
        if (destsize <= srcsize)
            throw Error(`Unexpected operand size, ${OperationSize[srcsize]} to ${OperationSize[destsize]}`);
        this._rex(r1, r2, null, destsize);
        this.put(0x0f);
        let opcode = 0xb6;
        if (srcsize === OperationSize.word)
            opcode |= 1;
        this.put(opcode);
        return this._target(0, r1, r2, r3, r1, multiply, offset, oper);
    }
    movzx_r_r(dest, src, destsize, srcsize) {
        return this._movzx(src, dest, null, 1, 0, destsize, srcsize, MovOper.Register);
    }
    movzx_r_rp(dest, src, multiply, offset, destsize, srcsize) {
        return this._movzx(src, dest, null, multiply, offset, destsize, srcsize, MovOper.Read);
    }
    _movsf(r1, r2, r3, multiply, offset, fsize, oper, foper, size) {
        switch (fsize) {
            case FloatOperSize.doublePrecision:
                this.put(0xf2);
                break;
            case FloatOperSize.singlePrecision:
                this.put(0xf3);
                break;
            case FloatOperSize.xmmword: break;
        }
        this._rex(r1, r2, null, size);
        this.put(0x0f);
        switch (foper) {
            case FloatOper.ConvertPrecision:
                this.put(0x5a);
                break;
            case FloatOper.ConvertTruncated_f2i:
                this.put(0x2c);
                break;
            case FloatOper.Convert_f2i:
                this.put(0x2d);
                break;
            case FloatOper.Convert_i2f:
                this.put(0x2a);
                break;
            default:
                if (oper === MovOper.Write)
                    this.put(0x11);
                else
                    this.put(0x10);
                break;
        }
        return this._target(0, r1, r2, r3, r1, multiply, offset, oper);
    }
    movups_rp_f(dest, multiply, offset, src) {
        return this._movsf(dest, src, null, multiply, offset, FloatOperSize.xmmword, MovOper.Write, FloatOper.None, OperationSize.dword);
    }
    movups_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.None, OperationSize.dword);
    }
    movups_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.None, OperationSize.dword);
    }
    movsd_rp_f(dest, multiply, offset, src) {
        return this._movsf(dest, src, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Write, FloatOper.None, OperationSize.dword);
    }
    movsd_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.None, OperationSize.dword);
    }
    movsd_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.None, OperationSize.dword);
    }
    movss_rp_f(dest, multiply, offset, src) {
        return this._movsf(dest, src, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Write, FloatOper.None, OperationSize.dword);
    }
    movss_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.None, OperationSize.dword);
    }
    movss_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.None, OperationSize.dword);
    }
    cvtsi2sd_f_r(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtsi2sd_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvtpi2ps_f_r(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtpi2ps_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvtpi2pd_f_r(dest, src, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtpi2pd_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvtsd2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtsd2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvtpd2pi_r_f(dest, src, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtpd2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvtps2pi_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtps2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvttsd2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttsd2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttps2pi_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttps2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttpd2pi_r_f(dest, src, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttpd2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvtsi2ss_f_r(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtsi2ss_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvttss2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttss2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvtss2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtss2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvtsd2ss_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtsd2ss_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtss2sd_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtss2sd_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtps2pd_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtps2pd_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtpd2ps_f_f(dest, src) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtpd2ps_f_rp(dest, src, multiply, offset) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    label(labelName, exportDef = false) {
        const label = this._getJumpTarget(labelName);
        if ((label instanceof Defination) || label.chunk !== null) {
            throw Error(`${labelName} is already defined`);
        }
        label.chunk = this.chunk;
        label.offset = this.chunk.size;
        this.chunk.ids.push(label);
        if (!exportDef)
            this.scope.add(labelName);
        let now = this.chunk;
        let prev = now.prev;
        while (prev !== null && prev.jump.label === label) {
            this._resolveLabelSizeForward(prev, prev.jump);
            now = prev;
            prev = now.prev;
        }
        return this;
    }
    remove_label(name) {
        const label = this.ids.get(name);
        if (!label)
            return this;
        if (!(label instanceof Label))
            throw Error(`${name} is not label`);
        this.ids.delete(name);
        label.name = '';
        return this;
    }
    close_label(labelName) {
        const label = this.ids.get(labelName);
        if (!(label instanceof Label))
            throw Error(`${labelName} is not label`);
        if (label.chunk !== null)
            throw Error(`${labelName} is already defined`);
        label.chunk = this.chunk;
        label.offset = this.chunk.size;
        this.chunk.ids.push(label);
        let now = this.chunk;
        let prev = now.prev;
        while (prev !== null && prev.jump.label === label) {
            this._resolveLabelSizeForward(prev, prev.jump);
            now = prev;
            prev = now.prev;
        }
        this.ids.delete(labelName);
        return this;
    }
    _getJumpTarget(labelName) {
        const id = this.ids.get(labelName);
        if (id) {
            if (id instanceof Defination) {
                if (id.size !== OperationSize.qword)
                    throw Error(`${labelName} size unmatched`);
                return id;
            }
            if (!(id instanceof Label))
                throw Error(`${labelName} is not label`);
            return id;
        }
        const label = new Label(labelName);
        this.ids.set(labelName, label);
        return label;
    }
    jmp_label(labelName) {
        const label = this._getJumpTarget(labelName);
        if (label instanceof Defination) {
            this.jmp_rp(Register.rip, 1, 0);
            this._registerUnresolvedConstant(label, 4);
            return this;
        }
        if (label.chunk === null) {
            return this._genChunk(X64Assembler.jmp_c_info, label, []);
        }
        this._resolveLabelSizeBackward(this.chunk, new SplitedJump(X64Assembler.jmp_c_info, label, [], this.pos));
        return this;
    }
    call_label(labelName) {
        const label = this._getJumpTarget(labelName);
        if (label instanceof Defination) {
            this.call_rp(Register.rip, 1, 0);
            this._registerUnresolvedConstant(label, 4);
            return this;
        }
        if (label.chunk === null) {
            this.call_c(0);
            this._registerUnresolvedConstant(label, 4);
            return this;
        }
        this._resolveLabelSizeBackward(this.chunk, new SplitedJump(X64Assembler.call_c_info, label, [], this.pos), true);
        return this;
    }
    _jmp_o_label(oper, labelName) {
        const label = this._getJumpTarget(labelName);
        if (!(label instanceof Label))
            throw Error(`Unexpected identifier ${labelName}`);
        if (label.chunk === null) {
            return this._genChunk(X64Assembler.jmp_o_info, label, [oper]);
        }
        this._resolveLabelSizeBackward(this.chunk, new SplitedJump(X64Assembler.jmp_o_info, label, [oper], this.pos));
        return this;
    }
    _registerUnresolvedConstant(id, bytes) {
        this.chunk.unresolved.push(new UnresolvedConstant(this.chunk.size - bytes, bytes, id, this.pos));
        this.pos = null;
    }
    _resolveLabelSize(chunk, jump, dwordSize) {
        const orichunk = this.chunk;
        this.chunk = chunk;
        if (dwordSize) {
            jump.info.func.call(this, ...jump.args, INT32_MAX);
            chunk.unresolved.push(new UnresolvedConstant(chunk.size - 4, 4, jump.label, jump.pos));
        }
        else {
            jump.info.func.call(this, ...jump.args, 0);
            chunk.unresolved.push(new UnresolvedConstant(chunk.size - 1, 1, jump.label, jump.pos));
        }
        chunk.removeNext();
        if (chunk.next === null)
            this.chunk = chunk;
        else
            this.chunk = orichunk;
    }
    _resolveLabelSizeBackward(jumpChunk, jump, dwordSize = null) {
        if (jump.label.chunk === jumpChunk) {
            let offset = jump.label.offset - jumpChunk.size;
            offset -= jump.info.byteSize;
            if (offset < INT8_MIN || offset > INT8_MAX) {
                offset = offset - jump.info.dwordSize + jump.info.byteSize;
            }
            jump.info.func.call(this, ...jump.args, offset);
            return;
        }
        if (dwordSize === null) {
            let offset = 0;
            offset -= jumpChunk.size;
            offset -= jump.info.dwordSize;
            let chunk = jumpChunk.prev;
            for (;;) {
                if (chunk === null) {
                    throw Error(`${jump.label.name}: failed to find label chunk`);
                }
                offset -= chunk.size;
                offset -= chunk.jump.info.dwordSize;
                if (chunk === jump.label.chunk) {
                    offset += jump.label.offset;
                    break;
                }
                chunk = chunk.prev;
            }
            dwordSize = (offset < INT8_MIN || offset > INT8_MAX);
        }
        this._resolveLabelSize(jumpChunk, jump, dwordSize);
    }
    _resolveLabelSizeForward(jumpChunk, jump, dwordSize = null) {
        if (jump.label.chunk === jumpChunk)
            throw Error(`cannot forward to self chunk`);
        if (dwordSize === null) {
            let chunk = jumpChunk.next;
            if (chunk === jump.label.chunk) {
                const orichunk = this.chunk;
                this.chunk = jumpChunk;
                jump.info.func.call(this, ...jump.args, jump.label.offset);
                jumpChunk.removeNext();
                if (jumpChunk.next === null)
                    this.chunk = jumpChunk;
                else
                    this.chunk = orichunk;
                return;
            }
            let offset = 0;
            for (;;) {
                offset += chunk.size;
                offset += chunk.jump.info.dwordSize;
                chunk = chunk.next;
                if (chunk === jump.label.chunk) {
                    offset += jump.label.offset;
                    break;
                }
            }
            dwordSize = (offset < INT8_MIN || offset > INT8_MAX);
        }
        this._resolveLabelSize(jumpChunk, jump, dwordSize);
    }
    _genChunk(info, label, args) {
        let chunk = this.chunk;
        let totalsize = 0;
        for (;;) {
            const prev = chunk.prev;
            if (prev === null)
                break;
            totalsize += chunk.size + info.byteSize;
            chunk = prev;
            if (totalsize >= 127) {
                this._resolveLabelSize(chunk, chunk.jump, true);
            }
        }
        chunk = this.chunk;
        chunk.jump = new SplitedJump(info, label, args, this.pos);
        this.pos = null;
        const nbuf = new AsmChunk(new Uint8Array(64), 0);
        chunk.next = nbuf;
        nbuf.prev = chunk;
        this.chunk = nbuf;
        return this;
    }
    _check(final) {
        const chunks = new WeakSet();
        const ids = new WeakSet();
        chunks.add(MEMORY_INDICATE_CHUNK);
        if (this.constChunk !== null) {
            chunks.add(this.constChunk);
        }
        const errors = new Map();
        function putError(name, message) {
            const arr = errors.get(name);
            if (arr)
                arr.push(message);
            else
                errors.set(name, [message]);
        }
        let chunk = this.chunk;
        if (chunk.next !== null) {
            putError('[main chunk]', 'main chunk has the next chunk');
        }
        while (chunk !== null) {
            chunks.add(chunk);
            for (const id of chunk.ids) {
                if (id.chunk !== chunk) {
                    putError(id.name, 'Chunk does not match');
                }
                ids.add(id);
            }
            chunk = chunk.prev;
        }
        chunk = this.chunk;
        for (const id of this.ids.values()) {
            if (id instanceof AddressIdentifier) {
                if (id.chunk === null) {
                    if (!final)
                        continue;
                    putError(id.name, 'Label is not defined');
                    continue;
                }
                if (!ids.has(id)) {
                    if (id.chunk === MEMORY_INDICATE_CHUNK)
                        continue;
                    putError(id.name, 'Unknown identifier');
                }
                if (!chunks.has(id.chunk)) {
                    const jumpTarget = id.chunk.jump;
                    putError(id.name, `Unknown chunk, ${(jumpTarget === null ? '[??]' : jumpTarget.label.name)}`);
                }
            }
        }
        if (errors.size !== 0) {
            for (const [name, messages] of errors) {
                for (const message of messages) {
                    console.error(colors.red(`${name}: ${message}`));
                }
            }
            process.exit(-1);
        }
    }
    _makeSeh() {
        const sehChunk = new AsmChunk(new Uint8Array(64), 0);
        const UNW_VERSION = 0x01;
        const UNW_FLAG_EHANDLER = 0x08;
        for (;;) {
            // UNWIND_INFO
            sehChunk.writeInt32(UNW_VERSION | UNW_FLAG_EHANDLER);
            sehChunk.writeInt32(0);
        }
        // let fnname = '';
        // let fnstart = 0;
        // for (const id of this.ids.values()) {
        //     if (!(id instanceof Label)) continue;
        //     if (fnname !== '') {
        //         sehChunk.writeInt32(fnstart);
        //         sehChunk.writeInt32(id.offset);
        //         sehChunk.writeInt32(0);
        //         continue;
        //     }
        //     fnname = id.name;
        //     fnstart = id.offset;
        // }
    }
    _normalize() {
        const errors = new textparser_1.ParsingErrorContainer;
        let prev = this.chunk.prev;
        while (prev !== null) {
            const jump = prev.jump;
            const label = jump.label;
            if (label.chunk === null) {
                errors.add(new textparser_1.ParsingError(`${label.name}: Identifier not found`, jump.pos));
            }
            else {
                this._resolveLabelSizeForward(prev, jump);
            }
            prev = prev.prev;
        }
        const chunk = this.chunk;
        if (chunk.next !== null || chunk.prev !== null) {
            throw Error(`All chunks don't merge. internal problem.`);
        }
        if (this.constChunk !== null) {
            chunk.connect(this.constChunk);
            this.constChunk = null;
            chunk.removeNext();
        }
        const memalign = this.memoryChunkAlign;
        const bufsize = (this.chunk.size + memalign - 1) & ~(memalign - 1);
        this.chunk.putRepeat(0xcc, bufsize - this.chunk.size);
        try {
            chunk.resolveAll();
        }
        catch (err) {
            if (err instanceof textparser_1.ParsingError) {
                errors.add(err);
            }
            else {
                throw err;
            }
        }
        if (errors.error !== null) {
            throw errors.error;
        }
        return this;
    }
    jz_label(label) { return this._jmp_o_label(JumpOperation.je, label); }
    jnz_label(label) { return this._jmp_o_label(JumpOperation.jne, label); }
    jo_label(label) { return this._jmp_o_label(JumpOperation.jo, label); }
    jno_label(label) { return this._jmp_o_label(JumpOperation.jno, label); }
    jb_label(label) { return this._jmp_o_label(JumpOperation.jb, label); }
    jae_label(label) { return this._jmp_o_label(JumpOperation.jae, label); }
    je_label(label) { return this._jmp_o_label(JumpOperation.je, label); }
    jne_label(label) { return this._jmp_o_label(JumpOperation.jne, label); }
    jbe_label(label) { return this._jmp_o_label(JumpOperation.jbe, label); }
    ja_label(label) { return this._jmp_o_label(JumpOperation.ja, label); }
    js_label(label) { return this._jmp_o_label(JumpOperation.js, label); }
    jns_label(label) { return this._jmp_o_label(JumpOperation.jns, label); }
    jp_label(label) { return this._jmp_o_label(JumpOperation.jp, label); }
    jnp_label(label) { return this._jmp_o_label(JumpOperation.jnp, label); }
    jl_label(label) { return this._jmp_o_label(JumpOperation.jl, label); }
    jge_label(label) { return this._jmp_o_label(JumpOperation.jge, label); }
    jle_label(label) { return this._jmp_o_label(JumpOperation.jle, label); }
    jg_label(label) { return this._jmp_o_label(JumpOperation.jg, label); }
    proc(name, exportDef = false) {
        this.label(name, exportDef);
        this.scopeStack.push(this.scope);
        this.scope = new Set;
        return this;
    }
    endp() {
        if (this.scopeStack.length === 0)
            throw Error(`end of scope`);
        const scope = this.scope;
        this.scope = this.scopeStack.pop();
        for (const name of scope) {
            this.ids.delete(name);
        }
        return this;
    }
    const(name, value, exportDef = false) {
        if (this.ids.has(name))
            throw Error(`${name} is already defined`);
        this.ids.set(name, new Constant(name, value));
        if (!exportDef)
            this.scope.add(name);
        return this;
    }
    compileLine(lineText, lineNumber) {
        const commentIdx = lineText.search(COMMENT_REGEXP);
        const parser = new textparser_1.TextLineParser(commentIdx === -1 ? lineText : lineText.substr(0, commentIdx), lineNumber);
        let paramIdx = -1;
        const sizes = [null, null];
        let extendingCommand = false;
        function setSize(nsize) {
            if (nsize === undefined)
                return;
            let idx = 0;
            if (extendingCommand) {
                idx = paramIdx;
                if (idx >= 2) {
                    throw parser.error(`Too many operand`);
                }
            }
            const osize = sizes[idx];
            if (osize === null) {
                sizes[idx] = nsize;
                return;
            }
            if (osize !== nsize) {
                throw parser.error(`Operation size unmatched (${OperationSize[osize]} != ${OperationSize[nsize]})`);
            }
        }
        function parseType(type) {
            let arraySize = 0;
            let brace = type.indexOf('[');
            let type_base = type;
            if (brace !== -1) {
                type_base = type_base.substr(0, brace).trim();
                brace++;
                const braceEnd = type.indexOf(']', brace);
                if (braceEnd === -1)
                    throw parser.error(`brace end not found: '${type}'`);
                const braceInner = type.substring(brace, braceEnd).trim();
                const trails = type.substr(braceEnd + 1).trim();
                if (trails !== '')
                    throw parser.error(`Unexpected characters '${trails}'`);
                const res = polynominal_1.polynominal.parseToNumber(braceInner);
                if (res === null)
                    throw parser.error(`Unexpected array length '${braceInner}'`);
                arraySize = res;
            }
            const size = sizemap.get(type_base);
            if (size === undefined)
                throw parser.error(`Unexpected type name '${type}'`);
            return { bytes: size.bytes * Math.max(arraySize, 1), size: size.size, align: size.bytes, arraySize };
        }
        const readConstString = (addressCommand, encoding) => {
            const quotedString = parser.readQuotedStringTo('"');
            if (quotedString === null)
                throw parser.error('Invalid quoted string');
            if (this.constChunk === null)
                this.constChunk = new AsmChunk(new Uint8Array(64), 0);
            const id = new Defination('[const]', this.constChunk, this.constChunk.size, OperationSize.void);
            this.constChunk.write(Buffer.from(quotedString + '\0', encoding));
            this.constChunk.ids.push(id);
            command += '_rp';
            callinfo.push('(register pointer)');
            if (addressCommand)
                setSize(OperationSize.qword);
            else
                setSize(id.size);
            args.push(Register.rip);
            args.push(0);
            unresolvedConstant = id;
            unresolvedPos = parser.getPosition();
            parser.skipSpaces();
        };
        const defining = (command, exportDef) => {
            switch (command) {
                case 'const': {
                    const [name, type] = parser.readToSpace().split(':');
                    let size = null;
                    if (type !== undefined) {
                        size = sizemap.get(type);
                        if (size === undefined)
                            throw parser.error(`Unexpected type syntax '${type}'`);
                    }
                    const text = parser.readAll();
                    const value = this._polynominal(text, parser.lineNumber, parser.matchedIndex);
                    if (!(value instanceof polynominal_1.polynominal.Constant)) {
                        throw parser.error(`polynominal is not constant '${text}'`);
                    }
                    let valueNum = value.value;
                    if (size !== null) {
                        switch (size.size) {
                            case OperationSize.byte:
                                valueNum = valueNum << 24 >> 24;
                                break;
                            case OperationSize.word:
                                valueNum = valueNum << 16 >> 16;
                                break;
                            case OperationSize.dword:
                                valueNum = valueNum | 0;
                                break;
                        }
                    }
                    try {
                        this.const(name, valueNum, exportDef);
                    }
                    catch (err) {
                        throw parser.error(err.message);
                    }
                    return true;
                }
                case 'def': {
                    const name = parser.readTo(':');
                    const type = parser.readAll();
                    const res = parseType(type);
                    try {
                        this.def(name, res.size, res.bytes, res.align, exportDef);
                    }
                    catch (err) {
                        throw parser.error(err.message);
                    }
                    return true;
                }
                case 'proc':
                    try {
                        this.proc(parser.readAll().trim(), exportDef);
                    }
                    catch (err) {
                        throw parser.error(err.message);
                    }
                    return true;
                default: return false;
            }
        };
        const command_base = parser.readToSpace();
        if (command_base === '')
            return;
        let command = command_base;
        const callinfo = [command_base];
        const totalIndex = parser.matchedIndex;
        let unresolvedConstant = null;
        let unresolvedPos = null;
        const args = [];
        if (!parser.eof()) {
            let addressCommand = false;
            let jumpOrCall = false;
            switch (command) {
                case 'export':
                    if (!defining(parser.readToSpace(), true)) {
                        throw parser.error(`non export-able syntax`);
                    }
                    return;
                case 'buildtrace': {
                    const value = this._polynominal(parser.readAll(), parser.lineNumber, parser.matchedIndex);
                    console.log(`buildtrace> ${value}`);
                    return;
                }
                case 'movsx':
                case 'movzx':
                    extendingCommand = true;
                    break;
                case 'lea':
                    addressCommand = true;
                    break;
                default:
                    if (command.startsWith('j') || command === 'call') {
                        jumpOrCall = true;
                    }
                    if (defining(command, false))
                        return;
                    break;
            }
            while (!parser.eof()) {
                paramIdx++;
                parser.skipSpaces();
                if (parser.nextIf('"')) {
                    readConstString(addressCommand, 'utf8');
                    continue;
                }
                else if (parser.nextIf('u"')) {
                    readConstString(addressCommand, 'utf16le');
                    continue;
                }
                const param = parser.readTo(',');
                const constval = polynominal_1.polynominal.parseToNumber(param);
                if (constval !== null) { // number
                    if (isNaN(constval)) {
                        throw parser.error(`Unexpected number syntax ${callinfo.join(' ')}'`);
                    }
                    command += '_c';
                    callinfo.push('(constant)');
                    args.push(constval);
                }
                else if (param.endsWith(']')) { // memory access
                    let end = param.indexOf('[');
                    if (end === null)
                        throw parser.error(`Unexpected bracket syntax ${param}'`);
                    const iparser = new textparser_1.TextLineParser(param.substr(0, end), lineNumber, parser.matchedIndex);
                    end++;
                    const bracketInnerStart = parser.matchedIndex + end + 1;
                    const words = [...iparser.splitWithSpaces()];
                    if (words.length !== 0) {
                        if (words[1] === 'ptr') {
                            const sizename = words[0];
                            const size = sizemap.get(sizename);
                            if (size === undefined || size.size === OperationSize.void) {
                                throw parser.error(`Unexpected size name: ${sizename}`);
                            }
                            if (addressCommand)
                                setSize(OperationSize.qword);
                            else
                                setSize(size.size);
                            words.splice(0, 2);
                        }
                        if (words.length !== 0) {
                            const segment = words.join('');
                            if (!segment.endsWith(':')) {
                                throw parser.error(`Invalid address syntax: ${segment}`);
                            }
                            switch (segment) {
                                case 'gs:':
                                    this.gs();
                                    break;
                                case 'fs:':
                                    this.fs();
                                    break;
                                case 'ss:':
                                    this.ss();
                                    break;
                                case 'cs:':
                                    this.cs();
                                    break;
                                case 'es:':
                                    this.es();
                                    break;
                                case 'ds:': break;
                                default:
                                    throw parser.error(`Unexpected segment: ${segment}`);
                            }
                        }
                    }
                    const inner = param.substring(end, param.length - 1);
                    const { r1, r2, multiply, offset } = this._polynominalToAddress(inner, bracketInnerStart, lineNumber);
                    if (r1 === null) {
                        args.push(Register.absolute);
                        callinfo.push('(constant pointer)');
                        command += '_rp';
                    }
                    else {
                        args.push(r1);
                        if (r2 === null) {
                            callinfo.push('(register pointer)');
                            command += '_rp';
                        }
                        else {
                            callinfo.push('(2 register pointer)');
                            command += '_rrp';
                            args.push(r2);
                        }
                    }
                    args.push(multiply);
                    args.push(offset);
                }
                else {
                    const type = regmap.get(param.toLowerCase());
                    if (type) {
                        const [name, reg, size] = type;
                        setSize(size);
                        command += `_${name.short}`;
                        args.push(reg);
                        callinfo.push(`(${name.name})`);
                    }
                    else {
                        const id = this.ids.get(param);
                        if (id instanceof Constant) {
                            command += '_c';
                            callinfo.push('(constant)');
                            args.push(id.value);
                        }
                        else if (id instanceof Defination) {
                            command += '_rp';
                            callinfo.push('(register pointer)');
                            if (id.size === OperationSize.void)
                                throw parser.error(`Invalid operand type`);
                            args.push(Register.rip);
                            args.push(1);
                            args.push(0);
                            unresolvedConstant = id;
                        }
                        else if (jumpOrCall) {
                            command += '_label';
                            args.push(param);
                            callinfo.push('(label)');
                        }
                        else {
                            command += '_rp';
                            callinfo.push('(register pointer)');
                            args.push(Register.rip);
                            args.push(1);
                            args.push(0);
                            if (id instanceof Label) {
                                unresolvedConstant = id;
                            }
                            else if (id !== undefined) {
                                throw parser.error(`Unexpected identifier '${id.name}'`);
                            }
                            else {
                                const label = new Label(param);
                                unresolvedConstant = label;
                                this.ids.set(param, label);
                            }
                        }
                        unresolvedPos = parser.getPosition();
                    }
                }
            }
        }
        parser.matchedIndex = totalIndex;
        parser.matchedWidth = parser.matchedIndex + parser.matchedWidth - totalIndex;
        if (command.endsWith(':')) {
            this.label(command.substr(0, command.length - 1).trim());
            return;
        }
        command = command.toLowerCase();
        if (sizes[0] !== null) {
            args.push(sizes[0]);
            if (sizes[1] !== null) {
                args.push(sizes[1]);
            }
        }
        const fn = this[command];
        if (typeof fn !== 'function') {
            throw parser.error(`Unexpected command '${callinfo.join(' ')}'`);
        }
        try {
            this.pos = unresolvedPos;
            fn.apply(this, args);
            if (unresolvedConstant !== null) {
                this.chunk.unresolved.push(new UnresolvedConstant(this.chunk.size - 4, 4, unresolvedConstant, unresolvedPos));
            }
        }
        catch (err) {
            console.log(source_map_support_1.remapStack(err.stack));
            throw parser.error(err.message);
        }
    }
    compile(source, defines, reportDirectWithFileName) {
        let p = 0;
        let lineNumber = 1;
        if (defines != null) {
            for (const name in defines) {
                this.const(name, defines[name]);
            }
        }
        const errs = new textparser_1.ParsingErrorContainer;
        for (;;) {
            const lineidx = source.indexOf('\n', p);
            const lineText = (lineidx === -1 ? source.substr(p) : source.substring(p, lineidx));
            try {
                this.compileLine(lineText, lineNumber);
            }
            catch (err) {
                if (err instanceof textparser_1.ParsingError) {
                    errs.add(err);
                    if (reportDirectWithFileName) {
                        err.report(reportDirectWithFileName, lineText);
                    }
                }
                else {
                    throw err;
                }
            }
            if (lineidx === -1)
                break;
            p = lineidx + 1;
            lineNumber++;
        }
        if (errs !== null && errs.error !== null)
            throw errs.error;
        try {
            this._normalize();
        }
        catch (err) {
            if (err instanceof textparser_1.ParsingError) {
                if (reportDirectWithFileName) {
                    err.report(reportDirectWithFileName, err.pos !== null ? util_1.getLineAt(source, err.pos.line - 1) : null);
                }
                errs.add(err);
                throw errs;
            }
            else {
                throw err;
            }
        }
    }
    save() {
        function writeArray(array, writer) {
            for (const item of array) {
                writer(item);
            }
            out.put(0);
        }
        function writeAddress(id) {
            out.writeNullTerminatedString(id.name);
            out.writeVarUint(id.offset - address);
            address = id.offset;
        }
        const out = new bufferstream_1.BufferWriter(new Uint8Array(64), 0);
        const labels = [];
        const defs = [];
        for (const id of this.ids.values()) {
            if (this.scope.has(id.name))
                continue;
            if (id instanceof Label) {
                labels.push(id);
            }
            else if (id instanceof Defination) {
                defs.push(id);
            }
        }
        labels.sort((a, b) => a.offset - b.offset);
        out.writeVarUint(Math.log2(this.memoryChunkAlign));
        let address = 0;
        writeArray(labels, writeAddress);
        address = 0;
        writeArray(defs, writeAddress);
        out.writeVarUint(this.memoryChunkSize - address);
        out.write(this.buffer());
        return out.buffer();
    }
    toTypeScript() {
        const buffer = this.buffer();
        const script = new scriptwriter_1.ScriptWriter;
        script.writeln("import { cgate, VoidPointer, NativePointer } from 'bdsx/core';");
        const n = buffer.length & ~1;
        script.writeln(`const buffer = cgate.allocExecutableMemory(${buffer.length + this.memoryChunkSize}, ${this.memoryChunkAlign});`);
        script.script += "buffer.setBin('";
        for (let i = 0; i < n;) {
            const low = buffer[i++];
            const high = buffer[i++];
            const hex = ((high << 8) | low).toString(16);
            const count = 4 - hex.length;
            script.script += '\\u';
            if (count !== 0)
                script.script += '0'.repeat(count);
            script.script += hex;
        }
        if (buffer.length !== n) {
            const low = buffer[n];
            const hex = ((0xcc << 8) | low).toString(16);
            const count = 4 - hex.length;
            script.script += '\\u';
            if (count !== 0)
                script.script += '0'.repeat(count);
            script.script += hex;
        }
        script.writeln("');");
        // script.writeln();
        script.writeln('export = {');
        script.tab(4);
        for (const id of this.ids.values()) {
            if (this.scope.has(id.name))
                continue;
            if (id instanceof Label) {
                script.writeln(`get ${id.name}():NativePointer{`);
                script.writeln(`    return buffer.add(${id.offset});`);
                script.writeln(`},`);
            }
            else if (id instanceof Defination) {
                const off = buffer.length + id.offset;
                if (id.size === undefined) {
                    script.writeln(`get ${id.name}():NativePointer{`);
                    script.writeln(`    return buffer.add(${off});`);
                    script.writeln(`},`);
                }
                else {
                    switch (id.size) {
                        case OperationSize.byte:
                            script.writeln(`get ${id.name}():number{`);
                            script.writeln(`    return buffer.getUint8(${off});`);
                            script.writeln(`},`);
                            script.writeln(`set ${id.name}(n:number):number{`);
                            script.writeln(`    buffer.setUint8(n, ${off});`);
                            script.writeln(`},`);
                            break;
                        case OperationSize.word:
                            script.writeln(`get ${id.name}():number{`);
                            script.writeln(`    return buffer.getUint16(${off});`);
                            script.writeln(`},`);
                            script.writeln(`set ${id.name}(n:number){`);
                            script.writeln(`    buffer.setUint16(n, ${off});`);
                            script.writeln(`},`);
                            break;
                        case OperationSize.dword:
                            script.writeln(`get ${id.name}():number{`);
                            script.writeln(`    return buffer.getInt32(${off});`);
                            script.writeln(`},`);
                            script.writeln(`set ${id.name}(n:number){`);
                            script.writeln(`    buffer.setInt32(n, ${off});`);
                            script.writeln(`},`);
                            break;
                        case OperationSize.qword:
                            script.writeln(`get ${id.name}():VoidPointer{`);
                            script.writeln(`    return buffer.getPointer(${off});`);
                            script.writeln(`},`);
                            script.writeln(`set ${id.name}(n:VoidPointer){`);
                            script.writeln(`    buffer.setPointer(n, ${off});`);
                            script.writeln(`},`);
                            break;
                        default:
                            script.writeln(`get ${id.name}():NativePointer{`);
                            script.writeln(`    return buffer.add(${off});`);
                            script.writeln(`},`);
                            break;
                    }
                }
            }
        }
        script.tab(-4);
        script.writeln('};');
        return script.script;
    }
    static load(bin) {
        const reader = new bufferstream_1.BufferReader(bin);
        function readArray(reader) {
            const out = [];
            for (;;) {
                const item = reader();
                if (item === null)
                    return out;
                out.push(item);
            }
        }
        function readAddress() {
            const name = reader.readNullTerminatedString();
            if (name === '')
                return null;
            const size = reader.readVarUint();
            address += size;
            return [name, address];
        }
        const memoryAlignBit = reader.readVarUint();
        let address = 0;
        const labels = readArray(readAddress);
        address = 0;
        const defs = readArray(readAddress);
        const memorySize = reader.readVarUint() + address;
        const buf = reader.remaining();
        const out = new X64Assembler(buf, buf.length);
        out.memoryChunkAlign = 1 << memoryAlignBit;
        out.memoryChunkSize = memorySize;
        for (const [name, offset] of labels) {
            if (out.ids.has(name))
                throw Error(`${name} is already defined`);
            const label = new Label(name);
            label.chunk = out.chunk;
            label.offset = offset;
            out.ids.set(name, label);
            out.chunk.ids.push(label);
        }
        for (const [name, offset] of defs) {
            if (out.ids.has(name))
                throw Error(`${name} is already defined`);
            const def = new Defination(name, MEMORY_INDICATE_CHUNK, offset, undefined);
            out.ids.set(name, def);
        }
        return out;
    }
}
exports.X64Assembler = X64Assembler;
X64Assembler.call_c_info = new JumpInfo(5, 5, 6, X64Assembler.prototype.call_c);
X64Assembler.jmp_c_info = new JumpInfo(2, 5, 6, X64Assembler.prototype.jmp_c);
X64Assembler.jmp_o_info = new JumpInfo(2, 6, -1, X64Assembler.prototype._jmp_o);
function asm() {
    return new X64Assembler(new Uint8Array(64), 0);
}
exports.asm = asm;
function shex(v) {
    if (typeof v === 'string')
        return `0x${bin_1.bin.toString(v, 16)}`;
    if (v < 0)
        return `-0x${(-v).toString(16)}`;
    else
        return `0x${v.toString(16)}`;
}
function shex_o(v) {
    if (typeof v === 'string')
        return `+0x${bin_1.bin.toString(v, 16)}`;
    if (v < 0)
        return `-0x${(-v).toString(16)}`;
    else
        return `+0x${v.toString(16)}`;
}
const REVERSE_MAP = {
    jo: 'jno',
    jno: 'jo',
    jb: 'jae',
    jae: 'jb',
    je: 'jne',
    jne: 'je',
    jbe: 'ja',
    ja: 'jbe',
    js: 'jns',
    jns: 'js',
    jp: 'jnp',
    jnp: 'jp',
    jl: 'jge',
    jge: 'jl',
    jle: 'jg',
    jg: 'jle',
};
class ArgName {
    constructor(name, short) {
        this.name = name;
        this.short = short;
    }
}
ArgName.Register = new ArgName('register', 'r');
ArgName.Const = new ArgName('const', 'c');
const regmap = new Map([
    ['rip', [ArgName.Register, Register.rip, OperationSize.qword]],
    ['rax', [ArgName.Register, Register.rax, OperationSize.qword]],
    ['rcx', [ArgName.Register, Register.rcx, OperationSize.qword]],
    ['rdx', [ArgName.Register, Register.rdx, OperationSize.qword]],
    ['rbx', [ArgName.Register, Register.rbx, OperationSize.qword]],
    ['rsp', [ArgName.Register, Register.rsp, OperationSize.qword]],
    ['rbp', [ArgName.Register, Register.rbp, OperationSize.qword]],
    ['rsi', [ArgName.Register, Register.rsi, OperationSize.qword]],
    ['rdi', [ArgName.Register, Register.rdi, OperationSize.qword]],
    ['r8', [ArgName.Register, Register.r8, OperationSize.qword]],
    ['r9', [ArgName.Register, Register.r9, OperationSize.qword]],
    ['r10', [ArgName.Register, Register.r10, OperationSize.qword]],
    ['r11', [ArgName.Register, Register.r11, OperationSize.qword]],
    ['r12', [ArgName.Register, Register.r12, OperationSize.qword]],
    ['r13', [ArgName.Register, Register.r13, OperationSize.qword]],
    ['r14', [ArgName.Register, Register.r14, OperationSize.qword]],
    ['r15', [ArgName.Register, Register.r15, OperationSize.qword]],
    ['eax', [ArgName.Register, Register.rax, OperationSize.dword]],
    ['ecx', [ArgName.Register, Register.rcx, OperationSize.dword]],
    ['edx', [ArgName.Register, Register.rdx, OperationSize.dword]],
    ['ebx', [ArgName.Register, Register.rbx, OperationSize.dword]],
    ['esp', [ArgName.Register, Register.rsp, OperationSize.dword]],
    ['ebp', [ArgName.Register, Register.rbp, OperationSize.dword]],
    ['esi', [ArgName.Register, Register.rsi, OperationSize.dword]],
    ['edi', [ArgName.Register, Register.rdi, OperationSize.dword]],
    ['r8d', [ArgName.Register, Register.r8, OperationSize.dword]],
    ['r9d', [ArgName.Register, Register.r9, OperationSize.dword]],
    ['r10d', [ArgName.Register, Register.r10, OperationSize.dword]],
    ['r11d', [ArgName.Register, Register.r11, OperationSize.dword]],
    ['r12d', [ArgName.Register, Register.r12, OperationSize.dword]],
    ['r13d', [ArgName.Register, Register.r13, OperationSize.dword]],
    ['r14d', [ArgName.Register, Register.r14, OperationSize.dword]],
    ['r15d', [ArgName.Register, Register.r15, OperationSize.dword]],
    ['ax', [ArgName.Register, Register.rax, OperationSize.word]],
    ['cx', [ArgName.Register, Register.rcx, OperationSize.word]],
    ['dx', [ArgName.Register, Register.rdx, OperationSize.word]],
    ['bx', [ArgName.Register, Register.rbx, OperationSize.word]],
    ['sp', [ArgName.Register, Register.rsp, OperationSize.word]],
    ['bp', [ArgName.Register, Register.rbp, OperationSize.word]],
    ['si', [ArgName.Register, Register.rsi, OperationSize.word]],
    ['di', [ArgName.Register, Register.rdi, OperationSize.word]],
    ['r8w', [ArgName.Register, Register.r8, OperationSize.word]],
    ['r9w', [ArgName.Register, Register.r9, OperationSize.word]],
    ['r10w', [ArgName.Register, Register.r10, OperationSize.word]],
    ['r11w', [ArgName.Register, Register.r11, OperationSize.word]],
    ['r12w', [ArgName.Register, Register.r12, OperationSize.word]],
    ['r13w', [ArgName.Register, Register.r13, OperationSize.word]],
    ['r14w', [ArgName.Register, Register.r14, OperationSize.word]],
    ['r15w', [ArgName.Register, Register.r15, OperationSize.word]],
    ['al', [ArgName.Register, Register.rax, OperationSize.byte]],
    ['cl', [ArgName.Register, Register.rcx, OperationSize.byte]],
    ['dl', [ArgName.Register, Register.rdx, OperationSize.byte]],
    ['bl', [ArgName.Register, Register.rbx, OperationSize.byte]],
    ['ah', [ArgName.Register, Register.rsp, OperationSize.byte]],
    ['ch', [ArgName.Register, Register.rbp, OperationSize.byte]],
    ['dh', [ArgName.Register, Register.rsi, OperationSize.byte]],
    ['bh', [ArgName.Register, Register.rdi, OperationSize.byte]],
    ['r8b', [ArgName.Register, Register.r8, OperationSize.byte]],
    ['r9b', [ArgName.Register, Register.r9, OperationSize.byte]],
    ['r10b', [ArgName.Register, Register.r10, OperationSize.byte]],
    ['r11b', [ArgName.Register, Register.r11, OperationSize.byte]],
    ['r12b', [ArgName.Register, Register.r12, OperationSize.byte]],
    ['r13b', [ArgName.Register, Register.r13, OperationSize.byte]],
    ['r14b', [ArgName.Register, Register.r14, OperationSize.byte]],
    ['r15b', [ArgName.Register, Register.r15, OperationSize.byte]],
]);
const regnamemap = [];
for (const [name, [type, reg, size]] of regmap) {
    regnamemap[reg | (size << 4)] = name;
}
function checkModified(ori, out) {
    const ostat = fs.statSync(ori);
    try {
        const nstat = fs.statSync(out);
        return ostat.mtimeMs >= nstat.mtimeMs;
    }
    catch (err) {
        return true;
    }
}
const defaultOperationSize = new WeakMap();
(function (asm) {
    asm.code = X64Assembler.prototype;
    defaultOperationSize.set(asm.code.movss_f_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.movss_f_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.movss_rp_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.movsd_f_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.movsd_f_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.movsd_rp_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsi2sd_f_r, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsi2sd_f_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsd2si_r_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsd2si_r_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvttsd2si_r_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvttsd2si_r_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsi2ss_f_r, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvtsi2ss_f_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvtss2si_r_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvtss2si_r_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvttss2si_r_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvttss2si_r_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.movups_f_f, OperationSize.xmmword);
    defaultOperationSize.set(asm.code.movups_f_rp, OperationSize.xmmword);
    defaultOperationSize.set(asm.code.movups_rp_f, OperationSize.xmmword);
    asm.splitTwo32Bits = Symbol('splitTwo32Bits');
    class Operation {
        constructor(code, args) {
            this.code = code;
            this.args = args;
            this.size = -1;
            this._splits = null;
        }
        get splits() {
            if (this._splits !== null)
                return this._splits;
            const name = this.code.name;
            return this._splits = name.split('_');
        }
        reverseJump() {
            return REVERSE_MAP[this.splits[0]] || null;
        }
        parameters() {
            const out = [];
            const splits = this.splits;
            let argi = 0;
            for (let i = 1; i < splits.length; i++) {
                const argi_ori = argi;
                const type = splits[i];
                if (type === 'r') {
                    const r = this.args[argi++];
                    if (typeof r !== 'number' || r < -1 || r >= 16) {
                        throw Error(`${this.code.name}: Invalid parameter ${r} at ${i}`);
                    }
                    out.push({
                        type, argi: argi_ori, parami: i, register: r
                    });
                }
                else if (type === 'rp') {
                    const r = this.args[argi++];
                    if (typeof r !== 'number' || r < -1 || r >= 16) {
                        throw Error(`${this.code.name}: Invalid parameter ${r} at ${i}`);
                    }
                    const multiply = this.args[argi++];
                    const offset = this.args[argi++];
                    out.push({
                        type, argi: argi_ori, parami: i, register: r,
                        multiply, offset
                    });
                }
                else if (type === 'c') {
                    const constant = this.args[argi++];
                    out.push({
                        type, argi: argi_ori, parami: i, constant
                    });
                }
                else if (type === 'f') {
                    const freg = this.args[argi++];
                    out.push({
                        type, argi: argi_ori, parami: i, register: freg
                    });
                }
                else if (type === 'label') {
                    const label = this.args[argi++];
                    out.push({
                        type, argi: argi_ori, parami: i, label
                    });
                }
                else {
                    argi++;
                }
            }
            return out;
        }
        toString() {
            var _a, _b;
            const { code, args } = this;
            const name = code.name;
            const splited = name.split('_');
            const cmd = splited.shift();
            let i = 0;
            for (const item of splited) {
                switch (item) {
                    case 'r':
                    case 'f':
                    case 'c':
                        i++;
                        break;
                    case 'rp': {
                        i += 3;
                        break;
                    }
                }
            }
            let sizei = i;
            const size = (_a = defaultOperationSize.get(code)) !== null && _a !== void 0 ? _a : args[sizei];
            i = 0;
            const argstr = [];
            for (const item of splited) {
                const nsize = (_b = args[sizei++]) !== null && _b !== void 0 ? _b : size;
                const v = args[i++];
                switch (item) {
                    case 'r':
                        argstr.push(getRegisterName(v, nsize));
                        break;
                    case 'f':
                        argstr.push(FloatRegister[v]);
                        break;
                    case 'c':
                        argstr.push(shex(v));
                        break;
                    case 'rp': {
                        const multiply = args[i++];
                        const offset = args[i++];
                        let str = `[${Register[v]}${multiply !== 1 ? `*${multiply}` : ''}${offset !== 0 ? shex_o(offset) : ''}]`;
                        if (nsize != null) {
                            str = `${OperationSize[nsize]} ptr ${str}`;
                        }
                        argstr.push(str);
                        break;
                    }
                }
            }
            if (argstr.length === 0)
                return cmd;
            return `${cmd} ${argstr.join(', ')}`;
        }
    }
    asm.Operation = Operation;
    class Operations {
        constructor(operations, size) {
            this.operations = operations;
            this.size = size;
        }
        toString() {
            const out = [];
            for (const oper of this.operations) {
                out.push(oper.toString());
            }
            return out.join('\n');
        }
        asm() {
            const code = asm();
            for (const { code: opcode, args } of this.operations) {
                opcode.apply(code, args);
            }
            return code;
        }
    }
    asm.Operations = Operations;
    function compile(source, defines, reportDirectWithFileName) {
        const code = asm();
        code.compile(source, defines, reportDirectWithFileName);
        return code.save();
    }
    asm.compile = compile;
    function load(bin) {
        return X64Assembler.load(bin);
    }
    asm.load = load;
    function loadFromFile(src, defines, reportDirect = false) {
        const basename = src.substr(0, src.lastIndexOf('.') + 1);
        const binpath = `${basename}bin`;
        let buffer;
        if (checkModified(src, binpath)) {
            buffer = asm.compile(fs.readFileSync(src, 'utf-8'), defines, reportDirect ? src : null);
            fs.writeFileSync(binpath, buffer);
            console.log(`Please reload it`);
            process.exit(0);
        }
        else {
            buffer = fs.readFileSync(binpath);
        }
        return asm.load(buffer);
    }
    asm.loadFromFile = loadFromFile;
    function getRegisterName(register, size) {
        if (size == null)
            size = OperationSize.qword;
        return regnamemap[register | (size << 4)] || `invalid_R${register}_S${size}`;
    }
    asm.getRegisterName = getRegisterName;
})(asm = exports.asm || (exports.asm = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzZW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUE0QjtBQUM1QiwrQ0FBNEM7QUFDNUMsNkRBQWtEO0FBQ2xELDZDQUFtRztBQUNuRyxpQ0FBbUM7QUFDbkMsd0RBQW1FO0FBQ25FLHdEQUFxRDtBQUNyRCx5QkFBMEI7QUFDMUIsaUNBQWtDO0FBRWxDLElBQVksUUFvQlg7QUFwQkQsV0FBWSxRQUFRO0lBRWhCLGdEQUFXLENBQUE7SUFDWCxzQ0FBTSxDQUFBO0lBQ04scUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxtQ0FBRSxDQUFBO0lBQ0YsbUNBQUUsQ0FBQTtJQUNGLHNDQUFHLENBQUE7SUFDSCxzQ0FBRyxDQUFBO0lBQ0gsc0NBQUcsQ0FBQTtJQUNILHNDQUFHLENBQUE7SUFDSCxzQ0FBRyxDQUFBO0lBQ0gsc0NBQUcsQ0FBQTtBQUNQLENBQUMsRUFwQlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFvQm5CO0FBRUQsSUFBWSxhQWtCWDtBQWxCRCxXQUFZLGFBQWE7SUFFckIsaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLG9EQUFLLENBQUE7SUFDTCxvREFBSyxDQUFBO0lBQ0wsb0RBQUssQ0FBQTtJQUNMLG9EQUFLLENBQUE7SUFDTCxvREFBSyxDQUFBO0lBQ0wsb0RBQUssQ0FBQTtBQUNULENBQUMsRUFsQlcsYUFB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QUFhO1FBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFrQixFQUFFLE1BQWE7UUFDNUMsSUFBSSxRQUFRLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLEtBQUssQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLEtBQUssQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLEtBQUssQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLEtBQUssQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLEtBQUssQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLEtBQUssQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQyxNQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLEtB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QUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3RHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWEsRUFBRSxRQUE0QixFQUFFLE1BQWEsRUFBRSxHQUFVLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZHLE9BQU8sSUFB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Q0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixTQUFTLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixRQUFRLENBQUMsS0FBWSxJQUFTLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRixJQUFJLENBQUMsSUFBVyxFQUFFLFlBQW9C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TUFBTSxHQUFHLElBQUksR0FBRyxDQUE2QztJQUMvRCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUvRCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2pFLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztBQUMvQixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO0lBQzVDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDeEM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxHQUFVLEVBQUUsR0FBVTtJQUN6QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLElBQUc7UUFDQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQ3pDO0lBQUMsT0FBTyxHQUFHLEVBQUM7UUFDVCxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQXVDLENBQUM7QUFFaEYsV0FBaUIsR0FBRztJQUVILFFBQUksR0FBUSxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQ2hELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25FLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25FLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FB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