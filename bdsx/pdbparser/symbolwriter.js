"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imagesections_1 = require("./imagesections");
const symbolparser_1 = require("./symbolparser");
const fs = require("fs");
const path = require("path");
const styling_1 = require("../externs/bds-scripting/styling");
const specialNameRemap = new Map();
specialNameRemap.set("`vector deleting destructor'", '__vector_deleting_destructor');
specialNameRemap.set("`scalar deleting destructor'", '__scalar_deleting_destructor');
specialNameRemap.set('any', '_any');
specialNameRemap.set('string', '_string');
specialNameRemap.set('function', '_function');
specialNameRemap.set('add', '_add');
specialNameRemap.set('Symbol', '_Symbol');
specialNameRemap.set("`vftable'", '__vftable');
specialNameRemap.set("`vbtable'", '__vbtable');
specialNameRemap.set('operator=', 'operator_assign');
specialNameRemap.set('operator+', 'operator_add');
specialNameRemap.set('operator==', 'operator_equals');
specialNameRemap.set('operator>>', 'operator_shr');
specialNameRemap.set('operator<<', 'operator_shl');
specialNameRemap.set('operator()', 'operator_call');
specialNameRemap.set('getString', '_getString');
const IGNORE_THIS = {};
const outpath = path.join(__dirname, 'globals');
try {
    fs.mkdirSync(outpath);
}
catch (err) {
}
function filterToFunction(filters) {
    filters = filters.filter(f => f !== null);
    return id => {
        for (const filter of filters) {
            switch (typeof filter) {
                case 'string':
                    if (id.name === filter)
                        return true;
                    break;
                case 'function':
                    if (filter(id))
                        return true;
                    break;
                default:
                    if (filter.test(id.name))
                        return true;
                    break;
            }
        }
        return false;
    };
}
function getFiltered(filters) {
    const filter = filterToFunction(filters);
    const filted = [];
    for (let i = 0; i < ids.length;) {
        const id = ids[i];
        if (filter(id)) {
            filted.push(id);
            if (i === ids.length - 1) {
                ids.pop();
            }
            else {
                ids[i] = ids.pop();
            }
        }
        else {
            i++;
        }
    }
    return filted;
}
function templateSpecialized(name) {
    const base = symbolparser_1.PdbIdentifier.global.get(name);
    if (!base.isTemplate)
        return null;
    return id => id === base || id.templateBase === base;
}
function templateArgs(name, idx) {
    const base = symbolparser_1.PdbIdentifier.global.get(name);
    if (!base.isTemplate)
        return null;
    const list = new WeakSet();
    for (const spec of base.specialized) {
        list.add(spec.arguments[idx]);
    }
    return id => list.has(id);
}
function perTemplateArg(name, idx, ...filters) {
    const base = symbolparser_1.PdbIdentifier.global.get(name);
    if (!base.isTemplate)
        return null;
    const func = filterToFunction(filters);
    return id => {
        if (id.templateBase !== base)
            return false;
        return func(id.arguments[idx]);
    };
}
function getFirstIterableItem(item) {
    for (const v of item) {
        return v;
    }
    return undefined;
}
function checkIterableItemCount(iter, n) {
    for (const item of iter) {
        n--;
        if (n === 0)
            return true;
    }
    return false;
}
function parameterFilter(param) {
    if (param.templateBase !== null) {
        if (param.templateBase.name === 'JsonParseState')
            return false;
    }
    return true;
}
var IdType;
(function (IdType) {
    IdType[IdType["Type"] = 0] = "Type";
    IdType[IdType["Value"] = 1] = "Value";
})(IdType || (IdType = {}));
class ImportName {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
class ImportTarget {
    constructor(path) {
        this.path = path;
        this.imports = new Map;
        this.varName = null;
    }
}
class TsWriter {
    constructor() {
        this.text = '';
        this.tabtext = '';
        this.opened = null;
    }
    appendAtLastLine(str) {
        if (!this.text.endsWith('\n'))
            return;
        this.text = this.text.substr(0, this.text.length - 1) + str + '\n';
    }
    writeln(text) {
        if (this.opened !== null) {
            this.text += this.opened;
            this.opened = null;
        }
        if (!text) {
            this.text += '\n';
        }
        else {
            text = text.trim();
            if (text === '') {
                this.text += '\n';
            }
            else {
                this.text += `${this.tabtext}${text}\n`;
            }
        }
    }
    open(openstr, always) {
        if (this.opened !== null) {
            this.text += this.opened;
            this.opened = null;
        }
        if (always) {
            this.text += `${this.tabtext}${openstr}\n`;
            this.tab();
            return;
        }
        this.opened = `${this.tabtext}${openstr}\n`;
        this.tab();
    }
    close(closestr) {
        this.detab();
        if (this.opened === null) {
            this.text += `${this.tabtext}${closestr}\n`;
        }
        else {
            this.opened = null;
        }
    }
    tab() {
        this.tabtext += '    ';
    }
    detab() {
        this.tabtext = this.tabtext.substr(0, this.tabtext.length - 4);
    }
}
class TsFileBase {
    constructor(path) {
        this.path = path;
    }
    makeTarget() {
        return new ImportTarget(this.path);
    }
}
class TsFileExtern extends TsFileBase {
}
const imports = {
    nativetype: new TsFileExtern('../../nativetype'),
    complextype: new TsFileExtern('../../complextype'),
    nativeclass: new TsFileExtern('../../nativeclass'),
    makefunc: new TsFileExtern('../../makefunc'),
    dll: new TsFileExtern('../../dll'),
    core: new TsFileExtern('../../core'),
    common: new TsFileExtern('../../common'),
    pointer: new TsFileExtern('../../pointer'),
};
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Member"] = 0] = "Member";
    FieldType[FieldType["Static"] = 1] = "Static";
    FieldType[FieldType["InNamespace"] = 2] = "InNamespace";
})(FieldType || (FieldType = {}));
function getFieldType(item) {
    if (item.isClassLike || item.isType || item.parent.isNamespaceLike)
        return FieldType.InNamespace;
    if (item.isStatic)
        return FieldType.Static;
    return FieldType.Member;
}
function makeTemplateParameters(item) {
    const params = [];
    if (item.specialized.length === 0) {
        throw Error(`${item.name}: has not the specialized class`);
    }
    const first = item.specialized[0];
    let arglen = first.arguments.length;
    const slen = item.specialized.length;
    let variadic = false;
    for (let i = 1; i < slen; i++) {
        const n = item.specialized[i].arguments.length;
        if (n !== arglen) {
            variadic = true;
            if (n < arglen)
                arglen = n;
        }
    }
    arglen += namespaceTemplatePass.length;
    for (let i = 0; i < arglen; i++) {
        params.push('T' + i);
    }
    if (variadic) {
        params.push('ARGS');
        item.minTemplateArgs = arglen;
    }
    return params;
}
const namespaceTemplatePass = [];
let insideOfClass = false;
let isStatic = false;
class TsFile extends TsFileBase {
    constructor() {
        super(...arguments);
        this.imports = new Map();
        this.source = new TsWriter;
        this.globalNames = new Map();
        this.currentNs = symbolparser_1.PdbIdentifier.global;
    }
    makeGlobalName(name) {
        let counter = this.globalNames.get(name);
        if (counter == null) {
            this.globalNames.set(name, 1);
            return name;
        }
        for (;;) {
            const nname = name + (++counter);
            if (!this.globalNames.has(nname)) {
                this.globalNames.set(nname, counter);
                return nname;
            }
        }
    }
    _getVarName(type) {
        let baseid = type;
        for (;;) {
            if (baseid.paramVarName)
                return baseid.paramVarName;
            if (baseid.decoedFrom !== null) {
                baseid = baseid.decoedFrom;
            }
            else if (baseid.functionBase !== null) {
                baseid = baseid.functionBase;
            }
            else if (baseid.templateBase !== null) {
                baseid = baseid.templateBase;
            }
            else {
                break;
            }
        }
        let basename = this.getNameOnly(baseid, IdType.Value);
        if (basename.endsWith('_t'))
            basename = basename.substr(0, basename.length - 2);
        basename = styling_1.styling.toCamelStyle(basename, /[[\] :*]/g, false);
        return basename;
    }
    *enterNamespace(item) {
        const name = this.getNameOnly(item, IdType.Value);
        this.source.open(`export namespace ${name} {`);
        const oldns = this.currentNs;
        this.currentNs = item;
        yield;
        this.source.close(`}`);
        this.currentNs = oldns;
    }
    importDirect(hint, module) {
        if (module == null) {
            throw Error(`${hint}: host not found`);
        }
        if (module === this)
            throw Error(`${hint}: self direct import`);
        let target = this.imports.get(module);
        if (target == null) {
            this.imports.set(module, target = module.makeTarget());
        }
        else {
            if (target.varName !== null) {
                return target.varName;
            }
        }
        const name = path.basename(module.path);
        target.varName = this.makeGlobalName(name);
        return target.varName;
    }
    importName(host, name, idType) {
        if (host === this)
            return name;
        if (host !== undefined) {
            let target = this.imports.get(host);
            if (!target)
                this.imports.set(host, target = host.makeTarget());
            const imported = target.imports.get(name);
            let renamed;
            if (imported == null) {
                renamed = this.makeGlobalName(name);
                target.imports.set(name, new ImportName(renamed, idType));
            }
            else {
                renamed = imported.name;
                if (idType > imported.type) {
                    imported.type = idType;
                }
            }
            return renamed;
        }
        else {
            throw Error(`${name}: host not found`);
        }
    }
    importId(id) {
        if (id.parent !== symbolparser_1.PdbIdentifier.global)
            return;
    }
    isClassMethod(id, isStatic) {
        return !id.isType && id.parent.isClassLike && !(isStatic || id.isStatic);
    }
    getNameOnly(item, idType, opts = {}) {
        if (item.templateBase !== null) {
            throw Error(`${item}: getName with template`);
        }
        if (item.parent === null) {
            throw Error(`${item.name} has not parent`);
        }
        if (item.isLambda)
            throw IGNORE_THIS;
        let name = item.removeParameters().name;
        if (item.parent.isClassLike) {
            if (item.parent.name === name) {
                let result = '';
                if (opts.needDot)
                    result += '.';
                return result + '__constructor';
            }
            else {
                if (name.startsWith('~')) {
                    const NativeType = this.importName(imports.nativetype, 'NativeType', idType);
                    return `[${NativeType}.dtor]`;
                }
            }
        }
        const remapped = specialNameRemap.get(name);
        if (remapped !== undefined) {
            name = remapped;
        }
        else if (name.startsWith("`vector deleting destructor'")) {
            name = '__vector_deleting_destructor_' + item.arguments.join('_');
        }
        else if (name.startsWith("`vftable'")) {
            name = '__vftable_for_' + item.arguments.map(id => id.name).join('_');
        }
        if (item.parent === symbolparser_1.PdbIdentifier.global && !item.isConstant) {
            if (!opts.needDot) {
                name = this.importName(item.host, name, idType);
            }
        }
        if (opts.needDot)
            name = '.' + name;
        return name;
    }
    getDeclaration(item, type, define) {
        if (item.templateBase !== null) {
            throw Error(`${item}: getNameDeclaration with template`);
        }
        if (item.parent === null) {
            throw Error(`${item.name} has not parent`);
        }
        if (item.isLambda)
            throw IGNORE_THIS;
        let result = '';
        if (insideOfClass) {
            if (isStatic) {
                result += 'static ';
            }
        }
        else {
            if (define == null)
                throw Error(`non class member but no define`);
            result += `export ${define} `;
        }
        result += this.getNameOnly(item, IdType.Value);
        if (type !== null)
            result += ':' + type;
        return result;
    }
    getName(item, idType, opts = {}) {
        if (item.templateBase !== null) {
            throw Error(`${item}: getName with template`);
        }
        if (item.parent === null) {
            throw Error(`${item.name} has not parent`);
        }
        if (item.isLambda)
            throw IGNORE_THIS;
        let result = '';
        let needDot = false;
        if (item.parent === symbolparser_1.PdbIdentifier.global) {
            if (opts.assignee) {
                const name = this.importDirect(item, item.host);
                result += name;
                needDot = true;
            }
        }
        else {
            result = this.stringify(item.parent, idType);
            if (insideOfClass && !isStatic && !item.isType && idType !== IdType.Type && item.parent.isClassLike) {
                result += '.prototype';
            }
            needDot = true;
        }
        return result + this.getNameOnly(item, idType, { needDot });
    }
    makeVarParams(args, thisType) {
        const names = new Map();
        const namearr = [];
        for (let i = 0; i < args.length; i++) {
            const basename = this._getVarName(args[i]);
            let name = basename;
            const info = names.get(name);
            if (info === undefined) {
                names.set(name, { index: i, counter: 1 });
            }
            else {
                if (info.counter === 1) {
                    namearr[info.index] = basename + '_' + info.counter;
                }
                info.counter++;
                name = basename + '_' + info.counter;
            }
            namearr[i] = name;
        }
        for (let i = 0; i < namearr.length; i++) {
            namearr[i] = `${namearr[i]}:${this.stringify(args[i], IdType.Type, { isParameter: true })}`;
        }
        if (thisType != null) {
            namearr.unshift('this:' + this.stringify(thisType, IdType.Type, { isParameter: true }));
        }
        return namearr.join(', ');
    }
    getArgNames(args, idType) {
        return args.map(id => {
            if (id instanceof Array) {
                return `[${id.map(id => this.stringify(id, idType)).join(', ')}]`;
            }
            return this.stringify(id, idType);
        }).join(', ');
    }
    stringify(id, idType, opts = {}) {
        if (id.isLambda)
            throw IGNORE_THIS;
        if (id.redirectedFrom !== null) {
            return this.stringify(id.redirectedFrom, idType, opts);
        }
        if (id.decoedFrom !== null && id.deco === 'const')
            return this.stringify(id.decoedFrom, idType, opts);
        if (id.jsTypeName != null) {
            return this.importName(imports.nativetype, id.jsTypeName, idType);
        }
        if (id.decoedFrom !== null && (id.deco === '*' || id.deco === '&')) {
            if (idType === IdType.Value && id.isValue) {
                if (id.decoedFrom.address === 0) {
                    console.error(`${id.source}: address not found`);
                    throw IGNORE_THIS;
                }
                return this.getName(id, idType);
            }
            const str = this.stringify(id.decoedFrom, idType);
            const Wrapper = this.importName(imports.pointer, 'Wrapper', idType);
            if (idType === IdType.Type) {
                if (opts.isField || opts.isParameter) {
                    return str;
                }
                else {
                    return `${Wrapper}<${str}>`;
                }
            }
            else {
                if (opts.isParameter) {
                    return str;
                }
                else if (opts.isField) {
                    return `${str}.ref()`;
                }
                else {
                    return `${Wrapper}.make(${str}.ref())`;
                }
            }
        }
        let templateEnd = false;
        if (opts.templatePass == null) {
            opts.templatePass = [];
            templateEnd = true;
        }
        let out = '';
        if (id.templateBase !== null) {
            const from = opts.templatePass.length;
            for (const arg of id.arguments) {
                opts.templatePass.push(arg);
            }
            id = id.templateBase;
            if (id.minTemplateArgs != null) {
                const internal = opts.templatePass.splice(from + id.minTemplateArgs);
                for (const comp of internal) {
                    if (comp instanceof Array)
                        throw Error(`${id}: array is not allowed`);
                }
                opts.templatePass.push(internal);
            }
        }
        else {
            if (id.isMemberPointer) {
                const base = this.stringify(id.memberPointerBase, idType);
                const type = this.stringify(id.returnType, idType);
                const MemberPointer = this.importName(imports.complextype, 'MemberPointer', idType);
                if (idType === IdType.Type) {
                    return `${MemberPointer}<${base}, ${type}>`;
                }
                else {
                    return `${MemberPointer}.make(${base}, ${type})`;
                }
            }
            if (id.isFunctionType) {
                if (idType === IdType.Type) {
                    const params = this.makeVarParams(id.arguments);
                    return `(${params})=>${this.stringify(id.returnType, idType)}`;
                }
                else {
                    const NativeFunctionType = this.importName(imports.complextype, 'NativeFunctionType', idType);
                    return `${NativeFunctionType}.make(${this.stringify(id.returnType, idType)}, null, ${id.arguments.map(id => this.stringify(id, idType))})`;
                }
            }
        }
        let needDot = false;
        if (id.parent !== symbolparser_1.PdbIdentifier.global && id.parent !== this.currentNs) {
            out += this.stringify(id.parent, idType, { templatePass: opts.templatePass });
            needDot = true;
        }
        out += this.getNameOnly(id, idType, { needDot });
        if (!templateEnd || opts.templatePass.length === 0) {
            return out;
        }
        if (idType === IdType.Type) {
            return `${out}<${this.getArgNames(opts.templatePass, IdType.Type)}>`;
        }
        else {
            return `${out}.make<typeof ${out}, ${out}<${this.getArgNames(opts.templatePass, IdType.Type)}>>(${this.getArgNames(opts.templatePass, IdType.Value)})`;
        }
    }
    getConstructorType(item) {
        if (item.isClassLike) {
            const NativeClassType = this.importName(imports.nativeclass, 'NativeClassType', IdType.Type);
            return `${NativeClassType}<${this.stringify(item, IdType.Type)}>`;
        }
        else {
            throw Error(`${item}: Not implemented constructor type`);
        }
    }
    isSkipable(item) {
        if (item.isFunction)
            return true;
        if (item.decoedFrom !== null)
            return true;
        if (item.isLambda)
            return true;
        if (item.isFunctionBase && item.templateBase !== null)
            return true;
        return false;
    }
    writeAll() {
        function remapNameStyle(pair) {
            return pair[0] === pair[1] ? pair[0] : `${pair[0]} as ${pair[1]}`;
        }
        let importtext = '\n';
        for (const target of this.imports.values()) {
            if (target.varName !== null) {
                importtext += `import ${target.varName} = require("${target.path}");\n`;
            }
            const types = [];
            const values = [];
            for (const [name, imported] of target.imports) {
                switch (imported.type) {
                    case IdType.Type:
                        types.push([name, imported.name]);
                        break;
                    case IdType.Value:
                        values.push([name, imported.name]);
                        break;
                }
            }
            if (types.length !== 0)
                importtext += `import type { ${types.map(remapNameStyle).join(', ')} } from "${target.path}";\n`;
            if (values.length !== 0)
                importtext += `import { ${values.map(remapNameStyle).join(', ')} } from "${target.path}";\n`;
        }
        importtext += '\n';
        fs.writeFileSync(path.join(outpath, this.path + '.ts'), importtext + this.source.text);
        this.source.text = '';
    }
}
class TsFileImplement extends TsFile {
    _makeFunction(item) {
        const dll = this.importName(imports.dll, 'dll', IdType.Value);
        if (item.returnType === null) {
            throw Error(`${item}: function but no return type`);
        }
        const makefunc = this.importName(imports.makefunc, 'makefunc', IdType.Value);
        const params = item.arguments.map(id => this.stringify(id, IdType.Value, { isParameter: true }));
        if (this.isClassMethod(item, false)) {
            params.unshift(`{this:${this.stringify(item.parent, IdType.Value, { isParameter: true })}}`);
        }
        else {
            if (params.length !== 0) {
                params.unshift('null');
            }
        }
        params.unshift(this.stringify(item.returnType, IdType.Value, { isParameter: true }));
        params.unshift(`${dll}.current.add(${item.address})`);
        return `${makefunc}.js(${params.join(', ')})`;
    }
    _writeImplements(target, item) {
        if (item.address === 0) {
            console.error(`${item}: does not have the address`);
            throw IGNORE_THIS;
        }
        if (item.returnType === null) {
            const targetName = this.getName(target, IdType.Value, { assignee: true });
            if (!item.isVFTable && item.arguments.length !== 0)
                console.error(`${item}: function but no return type`);
            const dll = this.importName(imports.dll, 'dll', IdType.Value);
            this.source.writeln(`${targetName} = ${dll}.current.add(${item.address});`);
        }
        else if (item.isFunction) {
            const targetName = this.getName(target, IdType.Value, { assignee: true });
            this.source.writeln(`${targetName} = ${this._makeFunction(item)};`);
        }
        else {
            if (target.parent === null) {
                throw Error(`${target}: has not parent`);
            }
            let parent = '';
            if (target.parent === symbolparser_1.PdbIdentifier.global) {
                parent = this.importDirect(target, target.host);
            }
            else {
                parent = this.stringify(target.parent, IdType.Value);
            }
            const dll = this.importName(imports.dll, 'dll', IdType.Value);
            const NativeType = this.importName(imports.nativetype, 'NativeType', IdType.Value);
            const type = this.stringify(item.returnType, IdType.Value, { isField: true });
            const key = this.getNameOnly(target, IdType.Value);
            this.source.writeln(`${NativeType}.definePointedProperty(${parent}, '${key}', ${dll}.current.add(${item.address}), ${type});`);
        }
    }
    writeAssign(field) {
        try {
            const target = field.base.removeTemplateParameters();
            this.source.writeln(`// ${field.base.source}`);
            const overloads = field.overloads;
            if (overloads == null || overloads.length === 0) {
                this._writeImplements(target, field.base);
            }
            else if (overloads.length === 1) {
                this._writeImplements(target, overloads[0]);
            }
            else {
                const OverloadedFunction = this.importName(imports.complextype, 'OverloadedFunction', IdType.Value);
                let out = `${OverloadedFunction}.make()\n`;
                for (const overload of overloads) {
                    try {
                        const params = overload.arguments.map(id => this.stringify(id, IdType.Value, { isParameter: true }));
                        params.unshift('null');
                        params.unshift(this._makeFunction(overload));
                        out += `// ${overload.source}\n`;
                        out += `.overload(${params.join(', ')})\n`;
                    }
                    catch (err) {
                        if (err !== IGNORE_THIS)
                            throw err;
                    }
                }
                out = out.substr(0, out.length - 1);
                const targetName = this.getName(target, IdType.Value, { assignee: true });
                this.source.writeln(`${targetName} = ${out};`);
            }
        }
        catch (err) {
            if (err === IGNORE_THIS)
                return;
            throw err;
        }
    }
}
class IdField {
    constructor(base) {
        this.base = base;
        this.overloads = [];
    }
}
class IdFieldMap {
    constructor() {
        this.map = new Map();
    }
    append(list) {
        for (const item of list) {
            this.get(item.base).overloads.push(...item.overloads);
        }
        return this;
    }
    get(base) {
        let nametarget = base;
        if (base.functionBase !== null) {
            nametarget = base.functionBase;
        }
        if (base.templateBase !== null) {
            nametarget = base.templateBase;
        }
        const name = nametarget.name;
        let field = this.map.get(name);
        if (field != null)
            return field;
        field = new IdField(base);
        this.map.set(name, field);
        return field;
    }
    clear() {
        this.map.clear();
    }
    get size() {
        return this.map.size;
    }
    values() {
        return this.map.values();
    }
    [Symbol.iterator]() {
        return this.map.values();
    }
}
class FieldInfo {
    constructor() {
        this.inNamespace = new IdFieldMap;
        this.staticMember = new IdFieldMap;
        this.member = new IdFieldMap;
    }
    push(base, item) {
        this.set(base).overloads.push(item);
    }
    set(item) {
        if (item.templateBase !== null) {
            throw Error('base is template');
        }
        switch (getFieldType(item)) {
            case FieldType.Member: return this.member.get(item);
            case FieldType.Static: return this.staticMember.get(item);
            case FieldType.InNamespace: return this.inNamespace.get(item);
        }
    }
}
class TsFileDeclaration extends TsFile {
    constructor(path, ...filters) {
        super(path);
        this.implements = new TsFileImplement(path + '_impl');
        this.ids = getFiltered(filters);
        this.ids.sort();
        for (const id of this.ids) {
            id.host = this;
        }
        TsFileDeclaration.all.push(this);
    }
    hasOverloads(item) {
        return item.isTemplateFunctionBase || (item.isFunctionBase && item.templateBase === null);
    }
    _writeGlobalRedirect(item) {
        try {
            const ori = item.redirectTo;
            if (ori === null) {
                console.error(`${item}: is not redirecting`);
                return;
            }
            const from = ori.redirectedFrom;
            ori.redirectedFrom = null;
            this.source.writeln(`${this.getDeclaration(item, null, 'type')} = ${this.stringify(ori, IdType.Type)};`);
            this.source.writeln(`${this.getDeclaration(item, this.getConstructorType(ori), 'let')};`);
            this.implements.source.writeln(`${this.implements.getName(item, IdType.Value, { assignee: true })} = ${this.implements.stringify(ori, IdType.Value)};`);
            ori.redirectedFrom = from;
        }
        catch (err) {
            if (err === IGNORE_THIS)
                return;
            throw err;
        }
    }
    _writeOverloads(field) {
        try {
            const overloads = field.overloads;
            if (overloads.length === 0) {
                throw Error(`empty overloads`);
            }
            if (!insideOfClass && isStatic) {
                throw Error(`${overloads[0]}: is static but not in the class`);
            }
            let prefix = '';
            if (!insideOfClass)
                prefix = 'export function ';
            const name = this.getNameOnly(field.base, IdType.Value);
            if (overloads.length === 1) {
                const item = overloads[0];
                if (item.returnType === null) {
                    if (item.arguments.length !== 0)
                        console.error(`${item}: no has the return type but has the arguments types`);
                    const StaticPointer = this.importName(imports.core, 'StaticPointer', IdType.Type);
                    this.source.writeln(`// ${item.source}`);
                    this.source.writeln(`${prefix}${item.removeParameters().name}:${StaticPointer};`);
                }
                else {
                    const abstract = this.importName(imports.common, 'abstract', IdType.Value);
                    const params = this.makeVarParams(item.arguments, item.parent.templateBase !== null ? item.parent : null);
                    this.source.writeln(`// ${item.source}`);
                    this.source.writeln(`${prefix}${name}(${params}):${this.stringify(item.returnType, IdType.Type, { isParameter: true })} { ${abstract}(); }`);
                }
            }
            else {
                for (const over of overloads) {
                    this.source.writeln(`// ${over.source}`);
                    const params = this.makeVarParams(over.arguments, over.parent.templateBase !== null ? over.parent : null);
                    this.source.writeln(`${prefix}${name}(${params}):${this.stringify(over.returnType, IdType.Type, { isParameter: true })};`);
                }
                this.source.writeln(`${prefix}${name}(...args:any[]):any { abstract(); }`);
            }
        }
        catch (err) {
            if (err === IGNORE_THIS)
                return;
            throw err;
        }
    }
    _writeField(item) {
        try {
            this.source.writeln(`// ${item.source}`);
            if (item.returnType !== null) {
                const type = this.stringify(item.returnType, IdType.Type, { isField: true });
                this.source.writeln(`${this.getDeclaration(item, `${type}`, 'let')};`);
            }
            else {
                const StaticPointer = this.importName(imports.core, 'StaticPointer', IdType.Type);
                this.source.writeln(`${this.getDeclaration(item, StaticPointer, 'let')};`);
            }
            this.implements.writeAssign(new IdField(item));
        }
        catch (err) {
            if (err === IGNORE_THIS)
                return;
            throw err;
        }
    }
    _getField(out, base) {
        if (base.isDecoedType || base.isFunctionType || base.templateBase !== null || base.functionBase !== null) {
            return;
        }
        if (this.hasOverloads(base)) {
            for (const o of base.allOverloads()) {
                if (base.isTemplateFunctionBase) {
                    if (o.arguments.some(arg => arg.getArraySize() !== null))
                        continue;
                }
                if (o.arguments.some(arg => parameterFilter(arg))) {
                    continue;
                }
                if (parameterFilter(o.parent)) {
                    continue;
                }
                if (o.returnType !== null && parameterFilter(o.returnType)) {
                    continue;
                }
                out.push(base, o);
            }
        }
        else {
            out.set(base);
        }
    }
    getAllFields(item) {
        const out = new FieldInfo;
        if (item.specialized.length !== 0) {
            for (const specialized of item.specialized) {
                for (const child of specialized.children.values()) {
                    this._getField(out, child);
                }
            }
        }
        for (const child of item.children.values()) {
            this._getField(out, child);
        }
        return out;
    }
    _writeClass(item) {
        try {
            let opened = false;
            let params = null;
            if (item.isTemplate || namespaceTemplatePass.length !== 0) {
                params = item.isTemplate ? makeTemplateParameters(item) : namespaceTemplatePass;
                const NativeTemplateClass = this.importName(imports.complextype, 'NativeTemplateClass', IdType.Value);
                this.source.writeln(`// ${item.source}`);
                const paramsText = (params.length !== 0) ? `<${params.join(', ')}>` : '';
                this.source.open(`export class ${this.getNameOnly(item, IdType.Value)}${paramsText} extends ${NativeTemplateClass} {`, true);
                opened = true;
            }
            else {
                if (item.isClassLike) {
                    const NativeClass = this.importName(imports.nativeclass, 'NativeClass', IdType.Value);
                    this.source.writeln(`// ${item.source}`);
                    this.source.open(`export class ${this.getNameOnly(item, IdType.Value)} extends ${NativeClass} {`, true);
                    opened = true;
                }
            }
            const fields = this.getAllFields(item);
            if (opened) {
                insideOfClass = true;
                for (const field of fields.staticMember) {
                    isStatic = true;
                    this.writeMembers(field);
                    isStatic = false;
                }
                for (const field of fields.member) {
                    this.writeMembers(field);
                }
                this.source.close(`}`);
                insideOfClass = false;
            }
            const templatePassCount = namespaceTemplatePass.length;
            if (params !== null) {
                namespaceTemplatePass.push(...params.slice(templatePassCount));
            }
            for (const _ of this.enterNamespace(item)) {
                for (const field of fields.inNamespace) {
                    try {
                        this.writeMembers(field);
                    }
                    catch (err) {
                        if (err !== IGNORE_THIS)
                            throw err;
                    }
                }
            }
            namespaceTemplatePass.length = templatePassCount;
        }
        catch (err) {
            if (err === IGNORE_THIS)
                return;
            throw err;
        }
    }
    writeMembers(field) {
        const overloads = field.overloads;
        if (overloads.length !== 0) {
            // set default constructor
            if (insideOfClass) {
                for (const overload of overloads) {
                    if (overload.arguments.length === 0 && overload.functionBase.name === overload.parent.name) {
                        const NativeType = this.importName(imports.nativetype, 'NativeType', IdType.Value);
                        this.source.writeln(`[${NativeType}.ctor]():void{ return this.__constructor(); }`);
                        break;
                    }
                }
            }
            // write overloads
            try {
                this._writeOverloads(field);
                this.implements.writeAssign(field);
            }
            catch (err) {
                if (err !== IGNORE_THIS)
                    throw err;
            }
        }
        else {
            const base = field.base;
            if (base.isFunction) {
                this._writeField(base);
            }
            else if (base.isClassLike) {
                if (!insideOfClass) {
                    this._writeClass(base);
                }
            }
            else if (this.isSkipable(base)) {
                // empty
            }
            else if (base.name.startsWith("`vftable'") || base.name === "`vbtable'") {
                base.isStatic = true;
                this._writeField(base);
            }
            else if (base.isStatic) {
                this._writeField(base);
            }
            else if (base.isRedirectType) {
                this._writeGlobalRedirect(base);
            }
            else if (base.templateBase === null) {
                if (!insideOfClass) {
                    this._writeClass(base);
                }
            }
            // throw Error(`${base.source || base}: unexpected identifier`);
        }
    }
    writeAll() {
        const out = new FieldInfo;
        for (const item of this.ids) {
            this._getField(out, item);
        }
        if (out.staticMember.size !== 0) {
            const first = getFirstIterableItem(out.staticMember);
            throw Error(`global static member: ${first.base}`);
        }
        for (const field of out.inNamespace) {
            this.writeMembers(field);
        }
        for (const field of out.member) {
            this.writeMembers(field);
        }
        super.writeAll();
        this.implements.source.writeln();
        this.implements.writeAll();
    }
}
TsFileDeclaration.all = [];
const bool_t = symbolparser_1.PdbIdentifier.global.get('bool');
const void_t = symbolparser_1.PdbIdentifier.global.get('void');
const float_t = symbolparser_1.PdbIdentifier.global.get('float');
const double_t = symbolparser_1.PdbIdentifier.global.get('double');
const char_t = symbolparser_1.PdbIdentifier.global.get('char');
const schar_t = symbolparser_1.PdbIdentifier.global.get('char signed');
const uchar_t = symbolparser_1.PdbIdentifier.global.get('char unsigned');
const short_t = symbolparser_1.PdbIdentifier.global.get('short');
const ushort_t = symbolparser_1.PdbIdentifier.global.get('short unsigned');
const int_t = symbolparser_1.PdbIdentifier.global.get('int');
const uint_t = symbolparser_1.PdbIdentifier.global.get('int unsigned');
const __int64_t = symbolparser_1.PdbIdentifier.global.get('__int64');
const __uint64_t = symbolparser_1.PdbIdentifier.global.get('__int64 unsigned');
const typename_t = symbolparser_1.PdbIdentifier.global.get('typename');
const voidptr_t = symbolparser_1.PdbIdentifier.global.get('void*');
const voidconstptr_t = symbolparser_1.PdbIdentifier.global.get('void const*');
const std = symbolparser_1.PdbIdentifier.std;
const string_t = std.get('basic_string<char,std::char_traits<char>,std::allocator<char> >');
schar_t.jsTypeName = 'int8_t';
bool_t.jsTypeName = 'bool_t';
bool_t.paramVarName = 'b';
void_t.jsTypeName = 'void_t';
char_t.jsTypeName = 'int8_t';
char_t.paramVarName = 'c';
uchar_t.jsTypeName = 'uint8_t';
uchar_t.paramVarName = 'uc';
short_t.jsTypeName = 'int16_t';
short_t.paramVarName = 's';
ushort_t.jsTypeName = 'uint16_t';
ushort_t.paramVarName = 'us';
int_t.jsTypeName = 'int32_t';
int_t.paramVarName = 'i';
uint_t.jsTypeName = 'uint32_t';
uint_t.paramVarName = 'u';
__int64_t.jsTypeName = 'bin64_t';
__int64_t.paramVarName = 'i';
__uint64_t.jsTypeName = 'bin64_t';
__uint64_t.paramVarName = 'u';
voidptr_t.jsTypeName = 'VoidPointer';
voidptr_t.paramVarName = 'p';
voidconstptr_t.jsTypeName = 'VoidPointer';
voidconstptr_t.paramVarName = 'p';
float_t.jsTypeName = 'float32_t';
float_t.paramVarName = 'f';
double_t.jsTypeName = 'float64_t';
double_t.paramVarName = 'd';
std.get('string').redirect(string_t);
symbolparser_1.PdbIdentifier.global.get('RakNet').get('RakNetRandom').setAsClass();
// remove useless identities
symbolparser_1.PdbIdentifier.global.children.delete('[type]');
symbolparser_1.PdbIdentifier.global.children.delete('void');
symbolparser_1.PdbIdentifier.global.children.delete('bool');
symbolparser_1.PdbIdentifier.global.children.delete('char');
symbolparser_1.PdbIdentifier.global.children.delete('short');
symbolparser_1.PdbIdentifier.global.children.delete('long');
symbolparser_1.PdbIdentifier.global.children.delete('int');
symbolparser_1.PdbIdentifier.global.children.delete('__int64');
symbolparser_1.PdbIdentifier.global.children.delete('float');
symbolparser_1.PdbIdentifier.global.children.delete('double');
for (const [key, value] of symbolparser_1.PdbIdentifier.global.children) {
    if (key.startsWith('`')) { // remove private symbols
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (key.startsWith('<lambda_')) { // remove lambdas
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (/^[0-9]+$/.test(key)) { // remove numbers
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (key.startsWith('{')) { // code chunk?
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (key === '...') { // variadic args
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (key.startsWith('__imp_')) { // import
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (/^main\$dtor\$[0-9]+$/.test(key)) { // dtor in main
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (value.isFunctionBase && value.templateBase !== null) { // skip symbols that have base. they will be writed through the base
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (value.functionBase !== null) { // skip symbols that have base. they will be writed through the base
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (value.isType && value.returnType !== null) { // function type
        symbolparser_1.PdbIdentifier.global.children.delete(key);
    }
    else if (value.templateBase !== null && /^[A-Z]/.test(value.name) && value.address === 0) { // expect
        value.setAsClass();
        value.templateBase.setAsClass();
    }
    else if (value.address !== 0) {
        const section = imagesections_1.imageSections.getSectionOfRva(value.address);
        if (section === null) {
            console.error(`${value.name}: Unknown section`);
            continue;
        }
        switch (section.name) {
            case '.pdata': // exception info
                symbolparser_1.PdbIdentifier.global.children.delete(key);
                break;
            case '.data': // user section?
            case '.rdata': // readonly
                value.setAsFunction();
                break;
            default:
                console.error(`${section.name}, ${value.name}: unspecified section`);
                break;
        }
    }
}
const ids = [...symbolparser_1.PdbIdentifier.global.children.values()];
// new TsFileWithImpl('./commandbase', /^Command/, /CommandOrigin$/);
// new TsFileWithImpl('./commands', /Command$/);
// new TsFileWithImpl('./packets', /Packet$/);
// new TsFileWithImpl('./makepacket', /^make_packet/);
// new TsFileWithImpl('./packethandlers', /^PacketHandlerDispatcherInstance/);
// new TsFileWithImpl('./components', /Component$/);
// new TsFileWithImpl('./definations', /Definition$/, templateSpecialized('DefinitionSerializer'), templateSpecialized('DefinitionInstanceTyped'), templateSpecialized('EntityComponentDefinition'), templateSpecialized('definition'));
// new TsFileWithImpl('./receips', /Recipe$/);
// new TsFileWithImpl('./listeners', /Listener$/);
// new TsFileWithImpl('./filters', /Test$/, templateSpecialized('FilterOperationNode'), templateSpecialized('FilteredTransformationAttributes'));
// new TsFileWithImpl('./items', /Item$/, perTemplateArg('SharedPtr', 0, /Item$/), perTemplateArg('WeakPtr', 0, /Item$/));
// new TsFileWithImpl('./blocks', /Block[2-4]?$/, perTemplateArg('SharedPtr', 0, /Block[2-4]?$/, perTemplateArg('WeakPtr', 0, /Block[2-4]?$/)));
// new TsFileWithImpl('./actorbases', /Actor$/, /Player$/);
// new TsFileWithImpl('./actors', templateArgs('_actorFromClass', 0));
// new TsFileWithImpl('./actorfrom', /^_actorFromClass/);
// new TsFileWithImpl('./definations', templateSpecialized('DefinitionInstance'));
// new TsFileWithImpl('./scripts', /^Script/);
// new TsFileWithImpl('./actorgoals', templateArgs('ActorGoalDefinition', 0), templateArgs('ActorGoalDefinition', 1), templateSpecialized('ActorGoalDefinition'));
// new TsFileWithImpl('./descriptions', /Description$/);
// new TsFileWithImpl('./filtertest', /^FilterTest/);
// new TsFileWithImpl('./structures', /Pieces$/, /^Structure/);
// new TsFileWithImpl('./biomes', templateSpecialized('BiomeDecorationAttributes'), templateSpecialized('WeightedBiomeAttributes'), /^Biome/);
// new TsFileWithImpl('./molang', /^Molang/);
// new TsFileWithImpl('./features', /Feature$/, /Features$/);
// new TsFileWithImpl('./attributes', /^Attribute/);
// new TsFileWithImpl('./itemstates', templateSpecialized('ItemStateVariant'), templateArgs('ItemStateVariant', 0));
// new TsFileWithImpl('./server',
//     'ServerInstance',
//     'Minecraft',
//     'MinecraftEventing',
//     'VanilaGameModuleServer',
//     'MinecraftScheduler',
//     'MinecraftWorkerPool');
// new TsFileWithImpl('./typeid', /^type_id/, /^typeid_t/);
new TsFileDeclaration('./raknet', 'RakNet');
new TsFileDeclaration('./std', 'std', 'strchr', 'strcmp', 'strcspn', 'strerror_s', 'strncmp', 'strncpy', 'strrchr', 'strspn', 'strstart', 'strstr', 'strtol', 'strtoul', 'wcsstr', 'wchar_t', 'tan', 'tanh', 'cos', 'cosf', 'cosh', 'sin', 'sinf', 'sinh', 'log', 'log10', 'log1p', 'log2', 'logf', 'fabs', 'asin', 'asinf', 'asinh', 'atan2f', 'fclose', 'feof', 'ferror', 'fgets', 'fflush', 'free', 'malloc', '_aligned_malloc', 'delete', 'delete[]', 'delete[](void * __ptr64)', 'delete[](void * __ptr64,unsigned __int64)');
new TsFileDeclaration('./zlib', /^unz/, /^zip/, /^zc/, /^zlib_/, 'z_errmsg');
new TsFileDeclaration('./quickjs', /^js_/, /^JS_/, /^lre_/, /^string_/);
new TsFileDeclaration('./openssl', /^EVP_/, /^OPENSSL_/, /^OSSL_/, /^RSA_/, /^SEED_/, /^SHA1/, /^SHA224/, /^SHA256/, /^SHA384/, /^SHA3/, /^SHA512/, /^X509/, /^X509V3/, /^X448/, /^X25519/, /^XXH64/, /^curve448_/, /^openssl_/, /^rand_/, /^d2i_/, /^ec_/, /^i2a_/, /^hmac_/, /^i2c_/, /^i2d_/, /^i2o_/, /^i2s_/, /^i2t_/, /^i2v_/, /^o2i_/, /^v3_/, /^v2i_/, /^x448_/, /^x509_/, /^ecdh_/, /^dsa_/, /_meth$/, /^CMS_/, /^CRYPTO_/, /^AES_/, /^ASN1_/);
// new TsFileWithImpl('./classes', id=>id.isClassLike);
// new TsFileWithImpl('./remainings', ()=>true);
new TsFileDeclaration('./minecraft', () => true);
for (const file of TsFileDeclaration.all) {
    file.writeAll();
}
console.log(`global id count: ${symbolparser_1.PdbIdentifier.global.children.size}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9sd3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3ltYm9sd3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQWdEO0FBQ2hELGlEQUErQztBQUMvQyx5QkFBMEI7QUFDMUIsNkJBQThCO0FBQzlCLDhEQUEyRDtBQUUzRCxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0FBQ25ELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3JGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3JGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzlDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDL0MsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDbEQsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxZQUFZLEVB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LEdBQUcsR0FBRyxDQUFDO0FBQzNCLFFBQVEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQ2pDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQzdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQzdCLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQy9CLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQzFCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQ2pDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQzdCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQzlCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO0FBQ3JDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQzdCLGNBQWMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO0FBQzFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBQ2pDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQzNCLFFBQVEsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBQ2xDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXJDLDRCQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFcEUsNEJBQTRCO0FBRTVCLDRCQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFD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