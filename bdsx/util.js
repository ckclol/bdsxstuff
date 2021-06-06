"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignature = exports.arrayEquals = exports.str2set = exports.anyToString = exports.isBaseOf = exports.isFile = exports.isDirectory = exports.getLineAt = exports.removeLine = exports.indexOfLine = exports._tickCallback = exports.unhex = exports.hex = exports.memcheck = exports.memdiff_contains = exports.memdiff = void 0;
const fs = require("fs");
function memdiff(dst, src) {
    const size = src.length;
    if (dst.length !== size)
        throw Error(`size unmatched(dst[${dst.length}] != src[${src.length}])`);
    const diff = [];
    let needEnd = false;
    for (let i = 0; i !== size; i++) {
        if (src[i] === dst[i]) {
            if (!needEnd)
                continue;
            diff.push(i);
            needEnd = false;
        }
        else {
            if (needEnd)
                continue;
            diff.push(i);
            needEnd = true;
        }
    }
    if (needEnd)
        diff.push(size);
    return diff;
}
exports.memdiff = memdiff;
function memdiff_contains(larger, smaller) {
    let small_i = 0;
    const smaller_size = smaller.length;
    const larger_size = larger.length;
    if (larger_size === 0) {
        return smaller_size === 0;
    }
    for (let i = 0; i < larger_size;) {
        const large_from = larger[i++];
        const large_to = larger[i++];
        for (;;) {
            if (small_i === smaller_size)
                return true;
            const small_from = smaller[small_i];
            if (small_from < large_from)
                return false;
            if (small_from > large_to)
                break;
            if (small_from === large_to)
                return false;
            const small_to = smaller[small_i + 1];
            if (small_to > large_to)
                return false;
            if (small_to === large_to) {
                small_i += 2;
                break;
            }
            small_i += 2;
        }
    }
    return true;
}
exports.memdiff_contains = memdiff_contains;
function memcheck(code, originalCode, skip) {
    const diff = memdiff(code, originalCode);
    if (skip !== undefined) {
        if (memdiff_contains(skip, diff))
            return null;
    }
    return diff;
}
exports.memcheck = memcheck;
function hex(values, nextLinePer) {
    const size = values.length;
    if (size === 0)
        return '';
    if (nextLinePer === undefined)
        nextLinePer = size;
    const out = [];
    for (let i = 0; i < size;) {
        if (i !== 0 && (i % nextLinePer) === 0)
            out.push(10);
        const v = values[i++];
        const n1 = (v >> 4);
        if (n1 < 10)
            out.push(n1 + 0x30);
        else
            out.push(n1 + (0x41 - 10));
        const n2 = (v & 0x0f);
        if (n2 < 10)
            out.push(n2 + 0x30);
        else
            out.push(n2 + (0x41 - 10));
        out.push(0x20);
    }
    out.pop();
    return String.fromCharCode(...out);
}
exports.hex = hex;
function unhex(hex) {
    const hexes = hex.split(/[ \t\r\n]+/g);
    const out = new Uint8Array(hexes.length);
    for (let i = 0; i < hexes.length; i++) {
        out[i] = parseInt(hexes[i], 16);
    }
    return out;
}
exports.unhex = unhex;
exports._tickCallback = process._tickCallback;
/**
 * @param lineIndex first line is zero
 */
function indexOfLine(context, lineIndex, p = 0) {
    for (;;) {
        if (lineIndex === 0)
            return p;
        const idx = context.indexOf('\n', p);
        if (idx === -1)
            return -1;
        p = idx + 1;
        lineIndex--;
    }
}
exports.indexOfLine = indexOfLine;
/**
 * removeLine("a \n b \n c", 1, 2) === "a \n c"
 * @param lineFrom first line is zero
 * @param lineTo first line is one
 */
function removeLine(context, lineFrom, lineTo) {
    const idx = indexOfLine(context, lineFrom);
    if (idx === -1)
        return context;
    const next = indexOfLine(context, lineTo - lineFrom, idx);
    if (next === -1)
        return context.substr(0, idx - 1);
    else
        return context.substr(0, idx) + context.substr(next);
}
exports.removeLine = removeLine;
/**
 * @param lineIndex first line is zero
 */
function getLineAt(context, lineIndex) {
    const idx = indexOfLine(context, lineIndex);
    if (idx === -1)
        return context;
    const next = context.indexOf('\n', idx);
    if (next === -1)
        return context.substr(idx);
    else
        return context.substring(idx, next);
}
exports.getLineAt = getLineAt;
function isDirectory(file) {
    try {
        return fs.statSync(file).isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.isDirectory = isDirectory;
function isFile(filepath) {
    try {
        return fs.statSync(filepath).isFile();
    }
    catch (err) {
        return false;
    }
}
exports.isFile = isFile;
function isBaseOf(t, base) {
    if (typeof t !== 'function')
        return false;
    if (t === base)
        return true;
    return t.prototype instanceof base;
}
exports.isBaseOf = isBaseOf;
function anyToString(v) {
    const circular = new WeakSet();
    let out = '';
    function writeArray(v) {
        if (v.length === 0) {
            out += '[]';
            return;
        }
        out += '[ ';
        out += v[0];
        for (let i = 1; i < v.length; i++) {
            out += ', ';
            write(v[i]);
        }
        out += '] ';
    }
    function writeObject(v) {
        if (v === null) {
            out += 'null';
            return;
        }
        if (circular.has(v)) {
            out += '[Circular]';
            return;
        }
        circular.add(v);
        if (v instanceof Array) {
            writeArray(v);
        }
        else {
            const entires = Object.entries(v);
            if (entires.length === 0) {
                out += '{}';
                return;
            }
            out += '{ ';
            {
                const [name, value] = entires[0];
                out += name;
                out += ': ';
                write(value);
            }
            for (let i = 1; i < entires.length; i++) {
                const [name, value] = entires[i];
                out += ', ';
                out += name;
                out += ': ';
                write(value);
            }
            out += ' }';
        }
    }
    function write(v) {
        switch (typeof v) {
            case 'object':
                writeObject(v);
                break;
            case 'string':
                out += JSON.stringify(v);
                break;
            default:
                out += v;
                break;
        }
    }
    if (typeof v === 'object') {
        writeObject(v);
    }
    else {
        return `${v}`;
    }
    return out;
}
exports.anyToString = anyToString;
function str2set(str) {
    const out = new Set();
    for (let i = 0; i < str.length; i++) {
        out.add(str.charCodeAt(i));
    }
    return out;
}
exports.str2set = str2set;
function arrayEquals(arr1, arr2, count) {
    for (let i = 0; i < count; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
exports.arrayEquals = arrayEquals;
function makeSignature(sig) {
    if (sig.length > 4)
        throw Error('too long');
    let out = 0;
    for (let i = 0; i < 4; i++) {
        out += sig.charCodeAt(i) << (i * 8);
    }
    return out;
}
exports.makeSignature = makeSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUJBQTBCO0FBRTFCLFNBQWdCLE9BQU8sQ0FBQyxHQUF1QixFQUFFLEdBQXVCO0lBQ3BFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLElBQUk7UUFBRSxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUVqRyxNQUFNLElBQUksR0FBWSxFQUFFLENBQUM7SUFDekIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPO2dCQUFFLFNBQVM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkI7YUFBTTtZQUNILElBQUksT0FBTztnQkFBRSxTQUFTO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO0tBQ0o7SUFDRCxJQUFJLE9BQU87UUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFwQkQsMEJBb0JDO0FBQ0QsU0FBZ0IsZ0JBQWdCLENBQUMsTUFBZSxFQUFFLE9BQWdCO0lBQzlELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixNQUFNLFlBQVksR0FBRyxPQUFP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