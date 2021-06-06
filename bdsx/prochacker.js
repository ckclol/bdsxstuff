"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcHacker = void 0;
const assembler_1 = require("./assembler");
const core_1 = require("./core");
const disassembler_1 = require("./disassembler");
const dll_1 = require("./dll");
const hacktool_1 = require("./hacktool");
const makefunc_1 = require("./makefunc");
const unlocker_1 = require("./unlocker");
const util_1 = require("./util");
const colors = require("colors");
const FREE_REGS = [
    assembler_1.Register.rax,
    assembler_1.Register.r10,
    assembler_1.Register.r11,
];
class AsmMover extends assembler_1.X64Assembler {
    constructor(origin, codesize) {
        super(new Uint8Array(32), 0);
        this.origin = origin;
        this.codesize = codesize;
        this.freeregs = new Set(FREE_REGS);
        this.inpos = 0;
    }
    getUnusing() {
        for (const r of this.freeregs.values()) {
            return r;
        }
        return null;
    }
    asmFromOrigin(oper) {
        const splits = oper.splits;
        const basename = splits[0];
        let ripDependedParam = null;
        const params = oper.parameters();
        for (const info of params) {
            switch (info.type) {
                case 'r':
                    this.freeregs.delete(info.register);
                    break;
                case 'rp':
                    this.freeregs.delete(info.register);
                    if (info.register === assembler_1.Register.rip) {
                        ripDependedParam = info;
                    }
                    break;
            }
        }
        if ((basename.startsWith('j') || basename === 'call') && splits.length === 2 && splits[1] === 'c') {
            // jump
            const offset = this.inpos + oper.args[0] + oper.size;
            if (offset < 0 || offset > this.codesize) {
                const tmpreg = this.getUnusing();
                if (tmpreg === null)
                    throw Error(`Not enough free registers`);
                const jmp_r = assembler_1.asm.code[`${basename}_r`];
                if (jmp_r) {
                    this.mov_r_c(tmpreg, this.origin.add(offset));
                    jmp_r.call(this, tmpreg);
                }
                else {
                    const reversed = oper.reverseJump();
                    this[`${reversed}_label`]('!');
                    this.jmp64(this.origin.add(offset), tmpreg);
                    this.close_label('!');
                }
                this.inpos += oper.size;
                return;
            }
            else {
                // TOFIX: remap offset if the code size is changed when rewriting.
            }
        }
        else {
            if (ripDependedParam !== null) {
                const tmpreg = this.getUnusing();
                if (tmpreg === null)
                    throw Error(`Not enough free registers`);
                oper.args[ripDependedParam.argi] = tmpreg;
                oper.args[ripDependedParam.argi + 2] = 0;
                this.mov_r_c(tmpreg, this.origin.add(this.inpos + oper.size + ripDependedParam.offset));
                this[oper.splits.join('_')](...oper.args);
                this.inpos += oper.size;
                return;
            }
        }
        oper.code.apply(this, oper.args);
        this.inpos += oper.size;
    }
    moveCode(codes, key, required) {
        let ended = false;
        for (const oper of codes.operations) {
            const basename = oper.splits[0];
            if (ended) {
                if (oper.code === assembler_1.asm.code.nop || oper.code === assembler_1.asm.code.int3) {
                    continue;
                }
                throw Error(`Failed to hook ${String(key)}, Too small area to patch, require=${required}, actual=${this.inpos}`);
            }
            if (basename === 'ret' || basename === 'jmp' || basename === 'call') {
                ended = true;
            }
            this.asmFromOrigin(oper);
        }
    }
    end() {
        const tmpreg = this.getUnusing();
        const originend = this.origin.add(this.codesize);
        if (tmpreg != null)
            this.jmp64(originend, tmpreg);
        else
            this.jmp64_notemp(originend);
    }
}
/**
 * Procedure hacker
 */
class ProcHacker {
    constructor(map) {
        this.map = map;
    }
    append(nmap) {
        const map = this.map;
        for (const key in nmap) {
            map[key] = nmap[key];
        }
        return this;
    }
    /**
     * @param subject name of hooking
     * @param key target symbol
     * @param offset offset from target
     * @param ptr target pointer
     * @param originalCode old codes
     * @param ignoreArea pairs of offset, ignores partial bytes.
     */
    check(subject, key, offset, ptr, originalCode, ignoreArea) {
        const buffer = ptr.getBuffer(originalCode.length);
        const diff = util_1.memdiff(buffer, originalCode);
        if (!util_1.memdiff_contains(ignoreArea, diff)) {
            console.error(colors.red(`${subject}: ${key}+0x${offset.toString(16)}: code does not match`));
            console.error(colors.red(`[${util_1.hex(buffer)}] != [${util_1.hex(originalCode)}]`));
            console.error(colors.red(`diff: ${JSON.stringify(diff)}`));
            console.error(colors.red(`${subject}: skip`));
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    nopping(subject, key, offset, originalCode, ignoreArea) {
        let ptr = this.map[key];
        if (!ptr) {
            console.error(colors.red(`${subject}: skip, symbol "${key}" not found`));
            return;
        }
        ptr = ptr.add(offset);
        const size = originalCode.length;
        const unlock = new unlocker_1.MemoryUnlocker(ptr, size);
        if (this.check(subject, key, offset, ptr, originalCode, ignoreArea)) {
            dll_1.dll.vcruntime140.memset(ptr, 0x90, size);
        }
        unlock.done();
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hookingRaw(key, to) {
        const origin = this.map[key];
        if (!origin)
            throw Error(`Symbol ${String(key)} not found`);
        const REQUIRE_SIZE = 12;
        const codes = disassembler_1.disasm.process(origin, REQUIRE_SIZE);
        const out = new AsmMover(origin, codes.size);
        out.moveCode(codes, key, REQUIRE_SIZE);
        out.end();
        const original = out.alloc();
        const unlock = new unlocker_1.MemoryUnlocker(origin, codes.size);
        hacktool_1.hacktool.jump(origin, to, assembler_1.Register.rax, codes.size);
        unlock.done();
        return original;
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hookingRawWithCallOriginal(key, to, keepRegister, keepFloatRegister) {
        const origin = this.map[key];
        if (!origin)
            throw Error(`Symbol ${String(key)} not found`);
        const REQUIRE_SIZE = 12;
        const codes = disassembler_1.disasm.process(origin, REQUIRE_SIZE);
        const out = new AsmMover(origin, codes.size);
        for (const reg of keepRegister) {
            out.freeregs.add(reg);
        }
        out.saveAndCall(to, keepRegister, keepFloatRegister);
        out.moveCode(codes, key, REQUIRE_SIZE);
        out.end();
        const unlock = new unlocker_1.MemoryUnlocker(origin, codes.size);
        hacktool_1.hacktool.jump(origin, out.alloc(), assembler_1.Register.rax, codes.size);
        unlock.done();
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hooking(key, returnType, opts, ...params) {
        return callback => {
            const to = makefunc_1.makefunc.np(callback, returnType, opts, ...params);
            return makefunc_1.makefunc.js(this.hookingRaw(key, to), returnType, opts, ...params);
        };
    }
    /**
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param newCode call address
     * @param tempRegister using register to call
     * @param call true - call, false - jump
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    patching(subject, key, offset, newCode, tempRegister, call, originalCode, ignoreArea) {
        let ptr = this.map[key];
        if (!ptr) {
            console.error(colors.red(`${subject}: skip, symbol "${key}" not found`));
            return;
        }
        ptr = ptr.add(offset);
        if (!ptr) {
            console.error(colors.red(`${subject}: skip`));
            return;
        }
        const size = originalCode.length;
        const unlock = new unlocker_1.MemoryUnlocker(ptr, size);
        if (this.check(subject, key, offset, ptr, originalCode, ignoreArea)) {
            hacktool_1.hacktool.patch(ptr, newCode, tempRegister, size, call);
        }
        unlock.done();
    }
    /**
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param jumpTo jump address
     * @param tempRegister using register to jump
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    jumping(subject, key, offset, jumpTo, tempRegister, originalCode, ignoreArea) {
        let ptr = this.map[key];
        if (!ptr) {
            console.error(colors.red(`${subject}: skip, symbol "${key}" not found`));
            return;
        }
        ptr = ptr.add(offset);
        const size = originalCode.length;
        const unlock = new unlocker_1.MemoryUnlocker(ptr, size);
        if (this.check(subject, key, offset, ptr, originalCode, ignoreArea)) {
            hacktool_1.hacktool.jump(ptr, jumpTo, tempRegister, size);
        }
        unlock.done();
    }
    write(key, offset, asm, subject, originalCode, ignoreArea) {
        const buffer = asm.buffer();
        const ptr = this.map[key].add(offset);
        const unlock = new unlocker_1.MemoryUnlocker(ptr, buffer.length);
        if (originalCode) {
            if (subject == null)
                subject = key + '';
            if (originalCode.length < buffer.length) {
                console.error(colors.red(`${subject}: ${key}+0x${offset.toString(16)}: writing space is too small`));
                unlock.done();
                return;
            }
            if (!this.check(subject, key, offset, ptr, originalCode, ignoreArea || [])) {
                unlock.done();
                return;
            }
            ptr.writeBuffer(buffer);
            ptr.fill(0x90, originalCode.length - buffer.length); // nop fill
        }
        else {
            ptr.writeBuffer(buffer);
        }
        unlock.done();
    }
    /**
     * make the native function as a JS function.
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     *
     * @param returnType *_t or *Pointer
     * @param params *_t or *Pointer
     */
    js(key, returnType, opts, ...params) {
        return makefunc_1.makefunc.js(this.map[key], returnType, opts, ...params);
    }
    /**
     * get symbols from cache.
     * if symbols don't exist in cache. it reads pdb.
     * @param undecorate if it's set with UNDNAME_*, it uses undecorated(demangled) symbols
     */
    static load(cacheFilePath, names, undecorate) {
        return new ProcHacker(core_1.pdb.getList(cacheFilePath, {}, names, false, undecorate));
    }
}
exports.ProcHacker = ProcHacker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2hhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2NoYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXlFO0FBQ3pFLGlDQUF3RTtBQUN4RSxpREFBd0M7QUFDeEMsK0JBQTRCO0FBQzVCLHlDQUFzQztBQUN0Qyx5Q0FBOEc7QUFDOUcseUNBQTRDO0FBQzVDLGlDQUF3RDtBQUN4RCxpQ0FBa0M7QUFFbEMsTUFBTSxTQUFTLEdBQWM7SUFDekIsb0JBQVEsQ0FBQyxHQUFHO0lBQ1osb0JBQVEsQ0FBQyxHQUFHO0lBQ1osb0JBQVEsQ0FBQyxHQUFHO0NBQ2YsQ0FBQztBQUVGLE1BQU0sUUFBUyxTQUFRLHdCQUFZO0lBRS9CLFlBQTRCLE1BQWtCLEVBQWtCLFFBQWU7UUFDM0UsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBREwsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFrQixhQUFRLEdBQVIsUUFBUSxDQUFPO1FBSS9ELGFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBVyxTQUFTLENBQUMsQ0FBQztRQUNqRCxVQUFLLEdBQUcsQ0FBQyxDQUFDO0lBSGpCLENBQUM7SUFLRCxVQUFVO1FBQ04sS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQWtCO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksZ0JBQWdCLEdBQXFDLElBQUksQ0FBQztRQUM5RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakMsS0FBSyxNQUFNLElB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