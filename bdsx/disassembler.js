"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disasm = void 0;
const assembler_1 = require("./assembler");
const core_1 = require("./core");
const util_1 = require("./util");
const colors = require("colors");
function readConstNumber(size, ptr) {
    switch (size) {
        case assembler_1.OperationSize.byte:
            return ptr.readInt8();
        case assembler_1.OperationSize.word:
            return ptr.readInt16();
        case assembler_1.OperationSize.dword:
            return ptr.readInt32();
        default:
            throw Error(`Unexpected operation size: ${size}`);
    }
}
function readConst(size, ptr) {
    switch (size) {
        case assembler_1.OperationSize.void:
            return 0;
        case assembler_1.OperationSize.byte:
            return ptr.readInt8();
        case assembler_1.OperationSize.word:
            return ptr.readInt16();
        case assembler_1.OperationSize.dword:
            return ptr.readInt32();
        case assembler_1.OperationSize.qword:
            return ptr.readBin64();
        default:
            throw Error(`Unexpected operation size: ${size}`);
    }
}
function walk_offset(rex, ptr) {
    const v = ptr.readUint8();
    const r1 = (v & 0x7) | ((rex & 1) << 3);
    const r2 = ((v >> 3) & 0x7) | ((rex & 4) << 1);
    if ((v & 0xc0) !== 0xc0) {
        if (r1 === assembler_1.Register.rsp && ptr.readUint8() !== 0x24) {
            return null;
        }
    }
    if ((v & 0xc0) === 0) {
        if (r1 === assembler_1.Register.rbp) {
            return {
                offset: assembler_1.OperationSize.dword,
                r1: assembler_1.Register.rip,
                r2
            };
        }
    }
    switch (v & 0xc0) {
        case 0x40:
            return {
                offset: assembler_1.OperationSize.byte,
                r1,
                r2,
            };
        case 0x80:
            return {
                offset: assembler_1.OperationSize.dword,
                r1,
                r2,
            };
        case 0xc0:
            return {
                offset: null,
                r1,
                r2,
            };
    }
    return {
        offset: assembler_1.OperationSize.void,
        r1,
        r2,
    };
}
function walk_oper_r_c(oper, register, chr, size) {
    return new assembler_1.asm.Operation(assembler_1.asm.code[`${assembler_1.Operator[oper]}_r_c`], [register, chr, size]);
}
function walk_oper_rp_c(oper, register, multiply, offset, chr, size) {
    return new assembler_1.asm.Operation(assembler_1.asm.code[`${assembler_1.Operator[oper]}_rp_c`], [register, multiply, offset, chr, size]);
}
function walk_ojmp(jumpoper, offset) {
    return new assembler_1.asm.Operation(assembler_1.asm.code[`${assembler_1.JumpOperation[jumpoper]}_c`], [offset]);
}
function walk_addr_oper(opername, dwordBit, readBit, info, size, ptr, isFloat) {
    const sig = isFloat ? 'f' : 'r';
    if (dwordBit === 0)
        size = assembler_1.OperationSize.byte;
    if (readBit) { // reverse
        if (info.offset === null) { // mov_r_r
            return new assembler_1.asm.Operation(assembler_1.asm.code[`${opername}_${sig}_${sig}`], [info.r2, info.r1, size]);
        }
        else {
            const offset = readConst(info.offset, ptr);
            return new assembler_1.asm.Operation(assembler_1.asm.code[`${opername}_${sig}_rp`], [info.r2, info.r1, 1, offset, size]);
        }
    }
    else {
        if (info.offset === null) { // mov_r_r
            return new assembler_1.asm.Operation(assembler_1.asm.code[`${opername}_${sig}_${sig}`], [info.r1, info.r2, size]);
        }
        else {
            const offset = readConst(info.offset, ptr);
            return new assembler_1.asm.Operation(assembler_1.asm.code[`${opername}_rp_${sig}`], [info.r1, 1, offset, info.r2, size]);
        }
    }
}
function walk_raw(ptr) {
    let rex = 0x40;
    let wordoper = false;
    let rexSetted = false;
    let size = assembler_1.OperationSize.dword;
    let foperSize = assembler_1.OperationSize.void;
    for (;;) {
        const v = ptr.readUint8();
        if (rexSetted && (v & 0xf8) === 0xb8) { // movabs
            return new assembler_1.asm.Operation(assembler_1.asm.code.movabs_r_c, [((rex & 1) << 3) | (v & 7), readConst(size, ptr)]);
        }
        else if ((v & 0xfe) === 0xf2) { // rep
            if (ptr.getUint8() === 0x0f) { // double or float operation
                foperSize = ((v & 1) !== 0) ? assembler_1.OperationSize.dword : assembler_1.OperationSize.qword;
                continue;
            }
            else { // rep
                if ((v & 1) !== 0) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.repz, []);
                }
                else {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.repnz, []);
                }
            }
        }
        else if (v === 0x63) {
            const info = walk_offset(rex, ptr);
            if (info === null) {
                // bad
            }
            else {
                return walk_addr_oper('movsxd', 1, 0, info, size, ptr, false);
            }
        }
        else if (v === 0x65) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.gs, []);
        }
        else if (v === 0x64) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.fs, []);
        }
        else if (v === 0x2e) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.cs, []);
        }
        else if (v === 0x26) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.es, []);
        }
        else if (v === 0x36) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.ss, []);
        }
        else if ((v & 0xf2) === 0x40) { // rex
            rex = v;
            rexSetted = true;
            if (rex & 0x08) {
                size = assembler_1.OperationSize.qword;
            }
            continue;
        }
        else if (v === 0x66) { // data16
            wordoper = true;
            size = assembler_1.OperationSize.word;
            continue;
        }
        else if (v === 0x98) {
            if (wordoper)
                return new assembler_1.asm.Operation(assembler_1.asm.code.cbw, []);
            if (size === assembler_1.OperationSize.qword)
                return new assembler_1.asm.Operation(assembler_1.asm.code.cdqe, []);
            return new assembler_1.asm.Operation(assembler_1.asm.code.cwde, []);
        }
        else if (v === 0x90) { // nop
            return new assembler_1.asm.Operation(assembler_1.asm.code.nop, []);
        }
        else if (v === 0xcc) { // int3
            return new assembler_1.asm.Operation(assembler_1.asm.code.int3, []);
        }
        else if (v === 0xcd) { // int
            const code = ptr.readUint8();
            return new assembler_1.asm.Operation(assembler_1.asm.code.int_c, [code]);
        }
        else if (v === 0xc3) { // ret
            return new assembler_1.asm.Operation(assembler_1.asm.code.ret, []);
        }
        else if (v === 0xff) {
            const info = walk_offset(rex, ptr);
            if (info === null) {
                // bad
            }
            else {
                if (info.r2 === 4) {
                    if (info.offset === null) {
                        return new assembler_1.asm.Operation(assembler_1.asm.code.jmp_r, [info.r1]);
                    }
                    else {
                        const offset = readConstNumber(info.offset, ptr);
                        return new assembler_1.asm.Operation(assembler_1.asm.code.jmp_rp, [info.r1, 1, offset]);
                    }
                }
                else if (info.r2 === 2) {
                    if (info.offset === null) {
                        return new assembler_1.asm.Operation(assembler_1.asm.code.call_r, [info.r1]);
                    }
                    else {
                        const offset = readConstNumber(info.offset, ptr);
                        return new assembler_1.asm.Operation(assembler_1.asm.code.call_rp, [info.r1, 1, offset]);
                    }
                }
                else {
                    // bad
                }
            }
        }
        else if ((v & 0xc0) === 0x00) { // operation
            if ((v & 6) === 6) {
                if (v === 0x0f) { // 0x0f
                    const v2 = ptr.readUint8();
                    if ((v2 & 0xf0) === 0x80) {
                        const jumpoper = v2 & 0xf;
                        const offset = ptr.readInt32();
                        return walk_ojmp(jumpoper, offset);
                    }
                    else {
                        const info = walk_offset(rex, ptr);
                        if (info === null) { // xmm operations
                            // bad
                        }
                        else if ((v2 & 0xfe) === 0x28) { // movaps read
                            if (foperSize === assembler_1.OperationSize.qword) {
                                // bad
                            }
                            else if (foperSize === assembler_1.OperationSize.dword) {
                                // bad
                            }
                            else { // packed
                                return walk_addr_oper('movaps', 1, (v2 & 1) ^ 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                            }
                        }
                        else if ((v2 & 0xfe) === 0xbe) { // movsx
                            const wordbit = (v2 & 1);
                            const oper = walk_addr_oper('movsx', 1, 1, info, size, ptr, false);
                            oper.args.push(wordbit !== 0 ? assembler_1.OperationSize.word : assembler_1.OperationSize.byte);
                            return oper;
                        }
                        else if ((v2 & 0xfe) === 0xb6) { // movzx
                            const wordbit = (v2 & 1);
                            const oper = walk_addr_oper('movzx', 1, 1, info, size, ptr, false);
                            oper.args.push(wordbit !== 0 ? assembler_1.OperationSize.word : assembler_1.OperationSize.byte);
                            return oper;
                        }
                        else if ((v2 & 0xfe) === 0x10) { // read
                            const readbit = (v2 & 1) ^ 1;
                            if (foperSize === assembler_1.OperationSize.qword) {
                                return walk_addr_oper('movsd', 1, readbit, info, assembler_1.OperationSize.qword, ptr, true);
                            }
                            else if (foperSize === assembler_1.OperationSize.dword) {
                                return walk_addr_oper('movss', 1, readbit, info, assembler_1.OperationSize.dword, ptr, true);
                            }
                            else { // packed
                                return walk_addr_oper('movups', 1, readbit, info, assembler_1.OperationSize.xmmword, ptr, true);
                            }
                        }
                        else if (v2 === 0x5a) { // convert precision
                            if (foperSize === assembler_1.OperationSize.qword) {
                                return walk_addr_oper('cvtsd2ss', 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                            }
                            else if (foperSize === assembler_1.OperationSize.dword) {
                                return walk_addr_oper('cvtsd2ss', 1, 1, info, assembler_1.OperationSize.dword, ptr, true);
                            }
                            else {
                                if (wordoper) {
                                    return walk_addr_oper('cvtpd2ps', 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                }
                                else {
                                    return walk_addr_oper('cvtps2pd', 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                }
                            }
                        }
                        else if (v2 === 0x2c) { // truncated f2i
                            if (foperSize === assembler_1.OperationSize.qword) {
                                return walk_addr_oper('cvttsd2si', 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                            }
                            else if (foperSize === assembler_1.OperationSize.dword) {
                                return walk_addr_oper('cvttss2si', 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                            }
                            else {
                                if (wordoper) {
                                    return walk_addr_oper('cvttpd2pi', 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                }
                                else {
                                    return walk_addr_oper('cvttps2pi', 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                }
                            }
                        }
                        else if (v2 === 0x2d) { // f2i
                            if (foperSize === assembler_1.OperationSize.qword) {
                                return walk_addr_oper('cvtsd2si', 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                            }
                            else if (foperSize === assembler_1.OperationSize.dword) {
                                return walk_addr_oper('cvtss2si', 1, 1, info, assembler_1.OperationSize.dword, ptr, true);
                            }
                            else {
                                if (wordoper) {
                                    return walk_addr_oper('cvtpd2pi', 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                }
                                else {
                                    return walk_addr_oper('cvtps2pi', 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                }
                            }
                        }
                        else if (v2 === 0x2a) { // i2f
                            if (foperSize === assembler_1.OperationSize.qword) {
                                return walk_addr_oper('cvtsi2sd', 1, 1, info, size, ptr, true);
                            }
                            else if (foperSize === assembler_1.OperationSize.dword) {
                                return walk_addr_oper('cvtsi2ss', 1, 1, info, size, ptr, true);
                            }
                            else {
                                if (wordoper) {
                                    return walk_addr_oper('cvtpi2pd', 1, 1, info, assembler_1.OperationSize.mmword, ptr, true);
                                }
                                else {
                                    return walk_addr_oper('cvtpi2ps', 1, 1, info, assembler_1.OperationSize.mmword, ptr, true);
                                }
                            }
                        }
                    }
                }
            }
            else {
                const oper = (v >> 3) & 7;
                if ((v & 0x04) !== 0) {
                    if ((v & 1) === 0)
                        size = assembler_1.OperationSize.byte;
                    const chr = ptr.readInt32();
                    return walk_oper_r_c(oper, assembler_1.Register.rax, chr, size);
                }
                const info = walk_offset(rex, ptr);
                if (info === null)
                    break; // bad
                return walk_addr_oper(assembler_1.Operator[oper], v & 1, v & 2, info, size, ptr, false);
            }
        }
        else if ((v & 0xfe) === 0xe8) { // jmp or call dword
            const value = ptr.readInt32();
            if (v & 1) { // jmp
                return new assembler_1.asm.Operation(assembler_1.asm.code.jmp_c, [value]);
            }
            else { // call
                return new assembler_1.asm.Operation(assembler_1.asm.code.call_c, [value]);
            }
        }
        else if ((v & 0xf0) === 0x50) { // push or pop
            const reg = (v & 0x7) | ((rex & 0x1) << 3);
            if (size === assembler_1.OperationSize.dword)
                size = assembler_1.OperationSize.qword;
            if (v & 0x08)
                return new assembler_1.asm.Operation(assembler_1.asm.code.pop_r, [reg, size]);
            else
                return new assembler_1.asm.Operation(assembler_1.asm.code.push_r, [reg, size]);
        }
        else if ((v & 0xfc) === 0x84) { // test or xchg
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if ((v & 0x2) !== 0) { // xchg
                if (info.offset === null) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.xchg_r_r, [info.r1, info.r2, size]);
                }
                else {
                    const offset = readConstNumber(info.offset, ptr);
                    return new assembler_1.asm.Operation(assembler_1.asm.code.xchg_r_rp, [info.r1, info.r2, 1, offset, size]);
                }
            }
            else { // test
                if (info.offset === null) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.test_r_r, [info.r1, info.r2, size]);
                }
                else {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.test_r_rp, [info.r1, info.r2, 1, info.offset, size]);
                }
            }
        }
        else if ((v & 0xfc) === 0x80) { // const operation
            const lowflag = v & 3;
            if (lowflag === 2)
                break; // bad
            if (lowflag === 0)
                size = assembler_1.OperationSize.byte;
            let constsize = size === assembler_1.OperationSize.qword ? assembler_1.OperationSize.dword : size;
            if (lowflag === 3)
                constsize = assembler_1.OperationSize.byte;
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if (info.offset === null) {
                const chr = readConstNumber(constsize, ptr);
                return walk_oper_r_c(info.r2 & 7, info.r1, chr, size);
            }
            else {
                const offset = readConstNumber(info.offset, ptr);
                const chr = readConstNumber(constsize, ptr);
                return walk_oper_rp_c(info.r2 & 7, info.r1, 1, offset, chr, size);
            }
        }
        else if ((v & 0xfe) === 0xc6) { // mov rp c
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if (!(v & 0x01))
                size = assembler_1.OperationSize.byte;
            if (info.offset === null) {
                const value = readConst(size, ptr);
                return new assembler_1.asm.Operation(assembler_1.asm.code.mov_r_c, [info.r1, value, size]);
            }
            else {
                const offset = readConst(info.offset, ptr);
                const value = readConst(size === assembler_1.OperationSize.qword ? assembler_1.OperationSize.dword : size, ptr);
                return new assembler_1.asm.Operation(assembler_1.asm.code.mov_rp_c, [info.r1, 1, offset, value, size]);
            }
        }
        else if ((v & 0xf8) === 0x88) { // mov variation
            if (v === 0xef)
                break; // bad
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if (v === 0x8d) { // lea rp_c
                if (info.offset === null)
                    break; // bad
                const offset = readConst(info.offset, ptr);
                return new assembler_1.asm.Operation(assembler_1.asm.code.lea_r_rp, [info.r2, info.r1, 1, offset, size]);
            }
            if (v & 0x04)
                size = assembler_1.OperationSize.word;
            return walk_addr_oper('mov', v & 1, v & 2, info, size, ptr, false);
        }
        else if ((v & 0xf0) === 0x70) {
            const jumpoper = v & 0xf;
            const offset = ptr.readInt8();
            return walk_ojmp(jumpoper, offset);
        }
        break;
    }
    return null;
}
var disasm;
(function (disasm) {
    function walk(ptr) {
        const low = ptr.getAddressLow();
        const high = ptr.getAddressHigh();
        const res = walk_raw(ptr);
        if (res !== null) {
            res.size = (ptr.getAddressHigh() - high) * 0x100000000 + (ptr.getAddressLow() - low);
            return res;
        }
        ptr.setAddress(low, high);
        let size = 16;
        while (size !== 0) {
            try {
                console.error(colors.red('disasm.walk: unimplemented opcode, failed'));
                console.error(colors.red('disasm.walk: Please send rua.kr this error'));
                console.trace(colors.red(`opcode: ${util_1.hex(ptr.getBuffer(size))}`));
                break;
            }
            catch (err) {
                size--;
            }
        }
        return null;
    }
    disasm.walk = walk;
    function process(ptr, size) {
        const operations = [];
        const nptr = ptr.as(core_1.NativePointer);
        let oper = null;
        let ressize = 0;
        while ((ressize < size) && (oper = disasm.walk(nptr)) !== null) {
            operations.push(oper);
            ressize += oper.size;
        }
        return new assembler_1.asm.Operations(operations, ressize);
    }
    disasm.process = process;
    function check(hexstr, quiet) {
        const buffer = typeof hexstr === 'string' ? util_1.unhex(hexstr) : hexstr;
        const ptr = new core_1.NativePointer;
        ptr.setAddressFromBuffer(buffer);
        const opers = [];
        if (!quiet)
            console.log();
        let oper = null;
        let pos = 0;
        const size = buffer.length;
        while ((pos < size) && (oper = disasm.walk(ptr)) !== null) {
            const posend = pos + oper.size;
            if (!quiet)
                console.log(oper + '' + colors.gray(` // ${util_1.hex(buffer.subarray(pos, posend))}`));
            pos = posend;
            opers.push(oper);
        }
        return new assembler_1.asm.Operations(opers, pos);
    }
    disasm.check = check;
})(disasm = exports.disasm || (exports.disasm = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzYXNzZW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF5RztBQUN6RyxpQ0FBb0Q7QUFFcEQsaUNBQW9DO0FBQ3BDLGlDQUFrQztBQVFsQyxTQUFTLGVBQWUsQ0FBQyxJQUFrQixFQUFFLEdBQWlCO0lBQzFELFFBQVEsSUFBSSxFQUFFO1FBQ2QsS0FBSyx5QkFBYSxDQUFDLElBQUk7WUFDbkIsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsS0FBSyx5QkFBYSxDQUFDLElBQUk7WUFDbkIsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0IsS0FBSyx5QkFBYSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0I7WUFDSSxNQUFNLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyRDtBQUNMLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBQyxJQUFrQixFQUFFLEdBQWlCO0lBQ3BELFFBQVEsSUFBSSxFQUFFO1FBQ2QsS0FBSyx5QkFBYSxDQUFDLElBQUk7WUFDbkIsT0FBTyxDQUFDLENBQUM7UUFDYixLQUFLLHlCQUFhLENBQUMsSUFBSTtZQUNuQixPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixLQUFLLHlCQUFhLENBQUMsSUFBSTtZQUNuQixPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixLQUFLLHlCQUFhLENBQUMsS0FBSztZQUNwQixPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixLQUFLLHlCQUFhLENBQUMsS0FBSztZQUNwQixPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQjtZQUNJLE1BQU0sS0FBSyxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3JEO0FBQ0wsQ0FB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