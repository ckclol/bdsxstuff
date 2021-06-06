"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocType = exports.DocMethod = exports.DocField = void 0;
const styling_1 = require("./styling");
const READONLY = /^READ ONLY. /;
const WILL_BE = / Will be: (.+)\.$/;
const CAN_BE = / Can be: (.+)\.$/;
const typeRemap = new Map();
typeRemap.set('String', { type: 'string' });
typeRemap.set('Positive Integer', { type: 'number', comment: true });
typeRemap.set('Integer', { type: 'number', comment: true });
typeRemap.set('JavaScript Object', { type: 'any', comment: true });
typeRemap.set('Boolean', { type: 'boolean' });
typeRemap.set('Decimal', { type: 'number' });
typeRemap.set('JSON Object', { type: 'any' });
typeRemap.set('Range [a, b]', { type: '[number, number]' });
typeRemap.set('Minecraft Filter', { type: 'MinecraftFilter' });
typeRemap.set('Vector [a, b, c]', { type: 'VectorArray' });
typeRemap.set('List', { type: 'any[]' });
function stripRegExp(str, regexp, onmatch) {
    const res = regexp.exec(str);
    if (res === null)
        return str;
    str = str.substr(0, res.index) + str.substr(res.index + res[0].length);
    onmatch(res);
    return str;
}
class DocField {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    static fromRow(row) {
        var _a, _b, _c, _d, _e, _f;
        const name = ((_a = row.Name) === null || _a === void 0 ? void 0 : _a.text) || '';
        let type = ((_b = row.Type) === null || _b === void 0 ? void 0 : _b.text) || '';
        let desc = ((_c = row.Description) === null || _c === void 0 ? void 0 : _c.text) || ((_d = row.Value) === null || _d === void 0 ? void 0 : _d.text) || '';
        let readonly = false;
        const defval = ((_e = row.DefaultValue) === null || _e === void 0 ? void 0 : _e.text) || '';
        desc = stripRegExp(desc, READONLY, () => {
            readonly = true;
        });
        desc = stripRegExp(desc, WILL_BE, matched => {
            type = matched[1];
        });
        desc = stripRegExp(desc, CAN_BE, matched => {
            type = matched[1].split(' or ').join('|');
        });
        const inner = (_f = row.Description) === null || _f === void 0 ? void 0 : _f.table;
        let ntype;
        if (inner) {
            ntype = DocType.fromTable(inner);
            if (type === 'List')
                ntype.arrayWrapped = true;
        }
        else {
            ntype = new DocType;
            const remapped = typeRemap.get(type);
            if (remapped) {
                if (remapped.comment)
                    desc = `${type}.\n${desc}`;
                ntype.inlineTypeName = remapped.type;
            }
            else {
                const iname = styling_1.styling.apiObjectNameToInterfaceName(type);
                if (iname !== null) {
                    ntype.inlineTypeName = iname;
                }
                else {
                    ntype.inlineTypeName = type;
                }
            }
            if (type === 'JavaScript Object') {
                if (name.endsWith('_position')) {
                    ntype.inlineTypeName = 'VectorXYZ';
                }
                else
                    switch (name) {
                        case 'ticking_area':
                            ntype.inlineTypeName = 'ITickingArea';
                            break;
                    }
            }
        }
        if (defval) {
            desc += `\n@default ${defval}`;
            ntype.optional = true;
        }
        const field = new DocField(name, ntype);
        ntype.readonly = readonly;
        ntype.desc = desc;
        return field;
    }
}
exports.DocField = DocField;
const PARAM = /^param([0-9]+):(.+)$/;
class DocMethod {
    constructor(name) {
        this.name = name;
        this.params = [];
        this.return = null;
        this.deleted = false;
        this.desc = '';
    }
    static fromDocFix(name, docfix) {
        const method = new DocMethod(name);
        if (docfix === null) {
            method.deleted = true;
        }
        else {
            method.desc = docfix.desc || '';
            for (const param in docfix) {
                const reg = PARAM.exec(param);
                if (reg === null)
                    continue;
                const fieldfix = DocType.fromDocFix(docfix[param]);
                method.params[+reg[1]] = new DocField(reg[2], fieldfix);
            }
            for (let i = 0; i < method.params.length; i++) {
                if (!method.params[i]) {
                    console.error(`${method.name}: ${i + 1} parameter is not provided`);
                    method.params.length = i;
                    break;
                }
            }
            if (docfix.return !== undefined) {
                method.return = DocType.fromDocFix(docfix.return);
            }
        }
        return method;
    }
    setCamel() {
        for (const param of this.params) {
            param.name = styling_1.styling.toCamelStyle(param.name, ' ');
        }
    }
    getField(name) {
        for (const field of this.params) {
            if (!field)
                continue;
            if (field.name === name)
                return field;
        }
        return null;
    }
    patch(docfix) {
        for (const param of this.params) {
            if (!param)
                continue;
            const paramFix = docfix.getField(param.name);
            if (paramFix === null)
                continue;
            const fixtype = paramFix.type;
            const type = paramFix.type;
            if (fixtype.inlineTypeName)
                type.inlineTypeName = fixtype.inlineTypeName;
            if (fixtype.optional)
                type.optional = true;
        }
        if (docfix.return !== null) {
            if (this.return === null)
                this.return = docfix.return;
            else
                this.return.patch(docfix.return);
        }
        if (docfix.deleted)
            this.deleted = true;
        if (docfix.desc)
            this.desc = docfix.desc;
        return this;
    }
}
exports.DocMethod = DocMethod;
class DocType {
    constructor() {
        this.fields = [];
        this.methods = [];
        this.inlineTypeName = '';
        this.desc = '';
        this.optional = false;
        this.readonly = false;
        this.arrayWrapped = false;
        this.wrapToArray = '';
        this.deleted = false;
    }
    static inline(name) {
        const type = new DocType;
        type.inlineTypeName = name;
        return type;
    }
    static fromTable(table) {
        const out = new DocType;
        for (const row of table) {
            out.fields.push(DocField.fromRow(row));
        }
        return out;
    }
    static fromDocFix(docfix) {
        const out = new DocType;
        if (docfix === null) {
            out.deleted = true;
        }
        else if (typeof docfix === 'string') {
            out.inlineTypeName = docfix;
            out.optional = undefined;
            out.readonly = undefined;
        }
        else {
            out.desc = docfix.desc || '';
            out.inlineTypeName = docfix.type || '';
            out.optional = docfix.optional;
            out.readonly = docfix.readonly;
            switch (typeof docfix.wrapToArray) {
                case 'string':
                    out.wrapToArray = docfix.wrapToArray;
                    break;
                case 'boolean':
                    out.arrayWrapped = docfix.wrapToArray;
                    break;
            }
            for (const key in docfix) {
                const item = docfix[key];
                if (key.startsWith('field:')) {
                    const type = DocType.fromDocFix(item);
                    out.fields.push(new DocField(key.substr(6), type));
                }
                else if (key.startsWith('method:')) {
                    const method = DocMethod.fromDocFix(key.substr(7), item);
                    out.methods.push(method);
                }
            }
        }
        return out;
    }
    isVectorXYZ() {
        if (this.methods.length !== 0)
            return false;
        if (this.fields.length !== 3)
            return false;
        const obj = new Set(['x', 'y', 'z']);
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (field.type.inlineTypeName !== 'number')
                return false;
            if (!obj.delete(field.name))
                return false;
        }
        console.assert(obj.size === 0);
        return true;
    }
    getFieldType(name) {
        for (const field of this.fields) {
            if (field.name === name)
                return field.type;
        }
        return null;
    }
    getMethod(name) {
        for (const method of this.methods) {
            if (method.name === name)
                return method;
        }
        return null;
    }
    patch(docfix) {
        for (const fieldFix of docfix.fields) {
            const type = this.getFieldType(fieldFix.name);
            if (type === null) {
                this.fields.push(fieldFix);
                this.inlineTypeName = '';
            }
            else {
                type.patch(fieldFix.type);
            }
        }
        for (const methodFix of docfix.methods) {
            const method = this.getMethod(methodFix.name);
            if (method === null) {
                this.methods.push(methodFix);
                this.inlineTypeName = '';
            }
            else {
                method.patch(methodFix);
            }
        }
        if (docfix.deleted)
            this.deleted = true;
        if (docfix.desc)
            this.desc = docfix.desc;
        if (docfix.inlineTypeName) {
            this.inlineTypeName = docfix.inlineTypeName;
            this.fields.length = 0;
            this.methods.length = 0;
        }
        if (docfix.optional !== undefined)
            this.optional = docfix.optional;
        if (docfix.readonly !== undefined)
            this.readonly = docfix.readonly;
        if (docfix.wrapToArray) {
            const inner = new DocType;
            inner.set(this);
            inner.arrayWrapped = true;
            this.fields.push(new DocField(docfix.wrapToArray, inner));
        }
        if (docfix.arrayWrapped) {
            this.arrayWrapped = true;
        }
        return this;
    }
    set(other) {
        this.fields.push(...other.fields);
        this.methods.push(...other.methods);
        this.inlineTypeName = other.inlineTypeName;
        this.desc = other.desc;
        this.optional = other.optional;
        this.readonly = other.readonly;
        this.arrayWrapped = other.arrayWrapped;
        this.deleted = other.deleted;
    }
    clear() {
        this.fields.length = 0;
        this.methods.length = 0;
        this.inlineTypeName = '';
        this.desc = '';
        this.optional = false;
        this.readonly = false;
        this.arrayWrapped = false;
        this.deleted = false;
        this.wrapToArray = '';
    }
    async writeTo(name, writer) {
        if (this.deleted)
            return;
        const tab = '';
        if (this.desc) {
            await writer.write(`${tab}/**\n`);
            await writer.write(`${tab} * ${this.desc.replace(/\n/g, `\n${tab} * `)}\n`);
            await writer.write(`${tab} */\n`);
        }
        if (this.inlineTypeName !== '') {
            await writer.write(`type ${name} = ${this.inlineTypeName};\n\n`);
            return;
        }
        const tabi = '    ';
        if (this.arrayWrapped)
            await writer.write(`type ${name} = {`);
        else
            await writer.write(`interface ${name} {\n`);
        for (const field of this.fields) {
            if (field.type.deleted)
                continue;
            if (field.type.desc) {
                await writer.write(`${tabi}/**\n`);
                await writer.write(`${tabi} * ${field.type.desc.replace(/\n/g, `\n${tabi} * `)}\n`);
                await writer.write(`${tabi} */\n`);
            }
            await writer.write(`${tabi}${field.type.stringify(tabi, field.name, { ignoreOptional: true })};\n`);
        }
        for (const method of this.methods) {
            if (method.deleted)
                continue;
            await writer.write(`${tabi}/**\n`);
            if (method.desc)
                await writer.write(`${tabi} * ${method.desc}\n`);
            for (const param of method.params) {
                if (param.type.desc) {
                    await writer.write(`${tabi} * @param ${param.name} ${param.type.desc.replace(/\n/g, `\n${tabi} *    `)}\n`);
                }
            }
            if (method.return !== null) {
                if (method.return.desc) {
                    await writer.write(`${tabi} * @return ${method.return.desc.replace(/\n/g, `\n${tabi} *    `)}\n`);
                }
            }
            await writer.write(`${tabi} */\n`);
            const arr = [];
            for (const param of method.params) {
                if (param.type.deleted)
                    continue;
                arr.push(`${param.type.stringify(tabi, param.name, { ignoreReadonly: true })}`);
            }
            await writer.write(`${tabi}${method.name}(${arr.join(', ')}):${method.return === null ? 'void' : method.return.stringify(tabi, '')};\n`);
        }
        if (this.arrayWrapped)
            await writer.write(`}[]\n`);
        else
            await writer.write(`}\n\n`);
    }
    stringify(tab, name, opts = {}) {
        if (this.arrayWrapped)
            opts.ignoreOptional = false;
        if (name !== '') {
            name = styling_1.styling.toFieldName(name);
            if (!opts.ignoreReadonly && this.readonly)
                name = `readonly ${name}`;
            if (!opts.ignoreOptional && this.optional)
                name += '?';
            name += ':';
        }
        let out = name;
        if (this.isVectorXYZ()) {
            out += 'VectorXYZ';
        }
        else {
            const tabi = `${tab}    `;
            if (this.inlineTypeName) {
                out += this.inlineTypeName.replace(/\n/g, `\n${tabi}`);
            }
            else {
                out += '{\n';
                for (const field of this.fields) {
                    if (field.type.desc) {
                        out += `${tabi}/**\n`;
                        out += `${tabi} * ${field.type.desc.replace(/\n/g, `\n${tabi} * `)}\n`;
                        out += `${tabi} */\n`;
                    }
                    out += `${tabi}${field.type.stringify(tabi, field.name, opts)},\n`;
                }
                out = out.substr(0, out.length - 2);
                out += `\n${tab}}`;
            }
        }
        if (this.arrayWrapped)
            out += '[]';
        return out;
    }
    static async writeTableKeyUnion(name, prefix, rows, key, value, writer) {
        await writer.write(`interface ${name}Map {\n`);
        const tabi = '    ';
        for (const row of rows) {
            const id = row[key].text;
            if (!id.startsWith(prefix)) {
                console.error(`   └ ${id}: Prefix is not ${prefix}`);
                continue;
            }
            const v = value(id);
            if (v === null)
                continue;
            await writer.write(`${tabi}${JSON.stringify(v)}:void;\n`);
        }
        await writer.write(`}\n`);
        await writer.write(`type ${name} = keyof ${name}Map;\n\n`);
    }
}
exports.DocType = DocType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQW9DO0FBR3BDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztBQUNoQyxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztBQUNwQyxNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztBQUVsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFHckIsQ0FBQztBQUNMLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDekMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDbEUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3pELFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2hFLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDM0MsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUMxQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzVDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztBQUMxRCxTQUFTLENBQUMsR0FBRyxD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