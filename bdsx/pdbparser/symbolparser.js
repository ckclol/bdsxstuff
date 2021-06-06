"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdbIdentifier = void 0;
const core_1 = require("../core");
const templatename_1 = require("../templatename");
const textparser_1 = require("../textparser");
const pdbcache_1 = require("./pdbcache");
const ProgressBar = require("progress");
const OPERATORS = new Set([
    '::',
]);
const OPERATORS_FOR_OPERATOR = new Set([
    '++',
    '--',
    '>>',
    '<<',
    '&&',
    '||',
    '!=',
    '==',
    '>=',
    '<=',
    '()',
    '[]',
    '+=',
    '-=',
    '*=',
    '/=',
    '%=',
    '&=',
    '^=',
    '|=',
    '<<=',
    '>>=',
    '->',
]);
const SPECIAL_NAMES = [
    ["dynamic initializer for '", true],
    ["dynamic atexit destructor for '", true],
    ["anonymous namespace'", false],
    ["scalar deleting destructor'", false],
    ["eh vector constructor iterator'", false],
    ["eh vector copy constructor iterator'", false],
    ["eh vector destructor iterator'", false],
    ["vector deleting destructor'", false],
    ["RTTI Type Descriptor'", false],
];
const FIELD_FOR_CLASS = new Set([
    "`vector deleting destructor'",
    "`scalar deleting destructor'",
]);
// "operator=",
// "operator+",
// "operator-",
// "operator*",
// "operator/",
// "operator%",
// "operator()",
// "operator[]",
// "operator==",
// "operator!=",
// "operator>=",
// "operator<=",
// "operator>",
// "operator<",
// "operator+=",
// "operator-=",
// "operator*=",
// "operator/=",
// "operator%=",
// "operator>>",
// "operator<<",
class PdbIdentifier {
    constructor(name) {
        this.name = name;
        this.modifier = null;
        this.isVirtualFunction = false;
        this.isNamespaceLike = false;
        this.isNamespace = false;
        this.isClassLike = false;
        this.isFunction = false;
        this.isFunctionBase = false;
        this.isTemplateFunctionBase = false;
        this.isMemberPointer = false;
        this.isEnum = false;
        this.isTemplate = false;
        this.isPrivate = false;
        this.isLambda = false;
        this.isType = false;
        this.arraySize = null;
        this.isFunctionType = false;
        this.isDecoedType = false;
        this.isBasicType = false;
        this.isRedirectType = false;
        this.isConstructor = false;
        this.deco = '';
        this.decoedFrom = null;
        this.memberPointerBase = null;
        this.isValue = false;
        this.isConstant = false;
        this.callingConvension = null;
        this.isDestructor = false;
        this.isStatic = false;
        this.isThunk = false;
        this.isVFTable = false;
        this.parent = null;
        this.templateBase = null;
        this.functionBase = null;
        this.returnType = null;
        this.children = new Map();
        this.arguments = [];
        this.specialized = [];
        this.overloads = [];
        this.address = 0;
        this.redirectTo = null;
        this.redirectedFrom = null;
        this.source = '';
        this.constFunction = null;
        this.ref = 0;
        this.argumentsSet = false;
    }
    addRef() {
        this.ref++;
    }
    release() {
        this.ref--;
        if (this.ref === 0) {
            this.parent.children.delete(this.name);
        }
    }
    getTemplateTypes() {
        if (this.specialized.length === 0)
            throw Error('No template');
        const specialized = this.specialized[0];
        return specialized.arguments.map(item => {
            if (item.isClassLike)
                return typename;
            if (item.isBasicType)
                return typename;
            if (item.isConstant) {
                debugger;
                return typename;
            }
            if (item.isValue) {
                debugger;
                return typename;
            }
            return typename;
        });
    }
    union(other) {
        if (this === other)
            return this;
        debugger;
        return this;
    }
    unionParameters(to) {
        if (to === null)
            return this.arguments.slice();
        const n = Math.max(to.length, this.arguments.length);
        for (let i = 0; i < n; i++) {
            const a = to[i];
            const b = this.arguments[i];
            to[i] = (a && b) ? a.union(b) : (a || b);
        }
        return to;
    }
    hasArrayParam() {
        for (const param of this.arguments) {
            if (param.getArraySize() !== null)
                return true;
        }
        return false;
    }
    *allOverloads() {
        if (this.isTemplate) {
            for (const s of this.specialized) {
                for (const o of s.overloads) {
                    if (o.hasArrayParam())
                        continue;
                    if (o.address === 0)
                        continue;
                    yield o;
                }
            }
        }
        else if (this.isFunctionBase) {
            for (const o of this.overloads) {
                if (o.address === 0)
                    continue;
                yield o;
            }
        }
    }
    isPointerLike() {
        if (this.deco === '&' || this.deco === '*')
            return true;
        if (this.decoedFrom !== null)
            return this.decoedFrom.isPointerLike();
        return false;
    }
    decorate(deco, from) {
        let name = this.name;
        if (/^[a-zA-z]/.test(deco)) {
            name += ' ';
        }
        name += deco;
        const id = this.parent.get(name);
        if (id === this)
            throw Error(`self deco linked (deco:${deco})`);
        id.isType = true;
        id.isDecoedType = true;
        id.deco = deco;
        id.decoedFrom = this;
        id.source = parser.getFrom(from);
        return id;
    }
    getArraySize() {
        let node = this;
        for (;;) {
            if (node.decoedFrom === null)
                return null;
            if (node.arraySize !== null)
                return node.arraySize;
            node = node.decoedFrom;
        }
    }
    decay() {
        let id = this;
        for (;;) {
            if (id.decoedFrom === null)
                return id;
            id = id.decoedFrom;
        }
    }
    removeParameters() {
        return this.functionBase || this;
    }
    removeTemplateParameters() {
        return this.templateBase || this;
    }
    get(name) {
        let id = this.children.get(name);
        if (id !== undefined)
            return id;
        this.children.set(name, id = new PdbIdentifier(name));
        id.parent = this;
        return id;
    }
    constVal(name) {
        const id = this.get(name);
        id.isConstant = true;
        id.isValue = true;
        return id;
    }
    toString() {
        let name = '';
        if (this.parent === null || this.parent === PdbIdentifier.global)
            name = this.name.toString();
        else
            name = this.parent.toString() + '::' + this.name.toString();
        if (this.returnType !== null) {
            if (!this.isType) {
                return this.returnType.toString() + ' ' + name;
            }
        }
        return name;
    }
    setArguments(args) {
        if (this.argumentsSet) {
            return;
        }
        this.argumentsSet = true;
        this.arguments = args;
    }
    setAsNamespace() {
        this.isNamespaceLike = true;
        this.isNamespace = true;
    }
    setAsBasicType() {
        this.isType = true;
        this.isBasicType = true;
    }
    setAsClass() {
        this.isClassLike = true;
        this.isType = true;
        this.isNamespaceLike = true;
        if (this.templateBase !== null) {
            this.templateBase.setAsClass();
        }
    }
    setAsEnum() {
        this.isEnum = true;
        this.isClassLike = true;
        this.isType = true;
        this.isNamespaceLike = true;
    }
    setAsFunction() {
        this.isFunction = true;
    }
    getTypeOfIt() {
        if (this.isValue) {
            if (this.parent === PdbIdentifier.global) {
                if (this.isConstant && /^[0-9]+$/.test(this.name)) {
                    return PdbIdentifier.global.get('int');
                }
            }
        }
        return PdbIdentifier.global.get('typename');
    }
    redirect(target) {
        this.redirectTo = target;
        target.redirectedFrom = this;
        this.isRedirectType = true;
    }
}
exports.PdbIdentifier = PdbIdentifier;
PdbIdentifier.global = new PdbIdentifier('');
PdbIdentifier.std = PdbIdentifier.global.get('std');
PdbIdentifier.global.setAsNamespace();
PdbIdentifier.std.setAsNamespace();
PdbIdentifier.global.get('__int64').setAsBasicType();
PdbIdentifier.global.get('__int64 unsigned').setAsBasicType();
PdbIdentifier.global.get('int').setAsBasicType();
PdbIdentifier.global.get('int unsigned').setAsBasicType();
PdbIdentifier.global.get('long').setAsBasicType();
PdbIdentifier.global.get('long unsigned').setAsBasicType();
PdbIdentifier.global.get('short').setAsBasicType();
PdbIdentifier.global.get('short unsigned').setAsBasicType();
PdbIdentifier.global.get('char').setAsBasicType();
PdbIdentifier.global.get('char unsigned').setAsBasicType();
PdbIdentifier.global.get('float').setAsBasicType();
PdbIdentifier.global.get('double').setAsBasicType();
const void_t = PdbIdentifier.global.get('void');
void_t.setAsBasicType();
const typename = PdbIdentifier.global.get('typename');
typename.isType = true;
const parser = new textparser_1.LanguageParser('');
function printParserState(id) {
    if (id)
        console.log(id + '');
    console.log(parser.context);
    console.log(' '.repeat(parser.i) + '^');
}
function must(next, id) {
    if (parser.nextIf(next))
        return;
    printParserState(id);
    throw Error(`unexpected character(Expected=${next}, Actual=${parser.peek()})`);
}
function setAsFunction(func, funcbase, args, returnType, isType) {
    if (args.length === 1 && args[0] === void_t) {
        args.length = 0;
    }
    func.setArguments(args);
    funcbase.overloads.push(func);
    func.returnType = returnType;
    if (isType) {
        func.isType = true;
        func.isFunctionType = true;
    }
    else {
        func.setAsFunction();
        func.functionBase = funcbase;
        funcbase.isFunctionBase = true;
        const templateBase = funcbase.templateBase;
        if (templateBase !== null) {
            templateBase.isTemplateFunctionBase = true;
            func.templateBase = templateBase;
        }
    }
}
function parseParameters(funcbase, returnType, isType) {
    const prev = parser.i - 1;
    const args = [];
    for (;;) {
        if (parser.nextIf('...')) {
            parser.readOperator(OPERATORS);
            args.push(PdbIdentifier.global.get('...'));
        }
        else {
            const arg = parseIdentity(',)');
            arg.isType = true;
            args.push(arg);
        }
        if (parser.endsWith(','))
            continue;
        if (!parser.endsWith(')')) {
            printParserState();
            throw Error(`Unexpected end`);
        }
        break;
    }
    const id = funcbase.parent.get(funcbase.name + parser.getFrom(prev));
    setAsFunction(id, funcbase, args, returnType, isType);
    return id;
}
class Deco {
    constructor() {
        this.chain = null;
    }
    add(chain) {
        chain.chain = this.chain;
        this.chain = chain;
    }
    clear() {
        this.chain = null;
    }
}
class DecoRoot extends Deco {
    apply(id) {
        if (this.chain === null)
            return id;
        return this.chain.apply(id);
    }
}
function parseDeco(base, info, from, sourceFrom, eof) {
    const deco = new DecoRoot;
    for (;;) {
        const prev = parser.i;
        const oper = parser.readOperator(OPERATORS);
        if (oper === null) {
            if (eof !== '') {
                printParserState();
                throw Error(`Unexpected end`);
            }
            return deco.apply(base);
        }
        else if (oper === '' || oper === '`' || oper === '<') {
            if (oper !== '') {
                parser.i = prev;
            }
            const beforeKeyword = parser.i;
            const keyword = parser.readIdentifier();
            if (keyword === 'const') {
                const decoed = base.decorate(keyword, sourceFrom);
                if (base.isFunction) {
                    base.constFunction = decoed;
                    setAsFunction(decoed, base.functionBase, base.arguments.slice(), base.returnType, base.isType);
                    decoed.isType = false;
                }
                base = decoed;
            }
            else if (keyword === '__cdecl' || keyword === '__stdcall') {
                info.callingConvension = keyword;
                info.isFunction = true;
            }
            else if (keyword === '__ptr64') {
                // do nothing
            }
            else {
                parser.i = beforeKeyword;
                const fnOrThisType = parseIdentity(info.isFunction ? '(' : eof, { isTypeInside: true });
                const returnType = deco.apply(base);
                deco.clear();
                if (parser.endsWith('(')) {
                    base = parseParameters(fnOrThisType, returnType, false);
                    base.source = parser.getFrom(sourceFrom);
                    info.isFunction = false;
                }
                else if (parser.endsWith('*')) {
                    base = PdbIdentifier.global.get(returnType + ' ' + fnOrThisType + '::*');
                    base.isMemberPointer = true;
                    base.memberPointerBase = fnOrThisType;
                    base.returnType = returnType;
                    base.isType = true;
                    base.source = parser.getFrom(sourceFrom);
                }
                else {
                    if (info.isFunction) {
                        // vcall, code chunk?
                    }
                    base = fnOrThisType;
                    base.returnType = returnType;
                    base.source = parser.getFrom(sourceFrom);
                    return base;
                }
            }
        }
        else if (eof.indexOf(oper) !== -1) {
            return base;
        }
        else if (oper === '&' || oper === '*') {
            base = base.decorate(oper, sourceFrom);
        }
        else if (oper === '(') {
            if (info.isFunction) {
                const baseType = base.isMemberPointer ? base.memberPointerBase : base;
                const returnType = base.isMemberPointer ? base.returnType : base;
                base = parseParameters(baseType, returnType, true);
                info.isFunction = false;
                if (base.isMemberPointer) {
                    base.isType = true;
                    base.isFunctionType = true;
                }
            }
            else {
                base = parseDeco(base, info, from, sourceFrom, ')');
            }
        }
        else if (oper === '[') {
            const number = parser.readIdentifier();
            if (number === null) {
                printParserState(base);
                throw Error(`Invalid number ${number}`);
            }
            if (!/^[0-9]+$/.test(number)) {
                printParserState(base);
                throw Error(`Unexpected index ${number}`);
            }
            must(']');
            base = base.decorate(`[${number}]`, sourceFrom);
            base.arraySize = +number;
            +number;
        }
        else {
            parser.i--;
            printParserState(base);
            throw Error(`Unexpected operator ${oper}`);
        }
    }
}
function parseIdentity(eof, info = {}, scope = PdbIdentifier.global) {
    if (info.isTypeInside === undefined)
        info.isTypeInside = false;
    parser.skipSpaces();
    const sourceFrom = parser.i;
    for (;;) {
        parser.skipSpaces();
        const from = parser.i;
        let id;
        let idname;
        for (;;) {
            const idnameNormal = parser.readIdentifier();
            idname = parser.getFrom(from);
            if (idnameNormal === null) {
                const oper = parser.readOperator(OPERATORS);
                if (oper === '~') {
                    continue;
                }
                else if (oper !== null && info.isTypeInside && oper === '*') {
                    scope.isClassLike = true;
                    scope.isType = true;
                    return scope;
                }
                else if (oper === '<') {
                    const innerText = parser.readTo('>');
                    const lambdaName = parser.getFrom(from);
                    if (innerText === 'lambda_invoker_cdecl') {
                        id = scope.get(lambdaName);
                        id.setAsFunction();
                        id.source = parser.getFrom(sourceFrom);
                    }
                    else if (/^lambda_[a-z0-9]+$/.test(innerText)) {
                        id = scope.get(lambdaName);
                        id.isLambda = true;
                        id.source = parser.getFrom(sourceFrom);
                        id.setAsClass();
                    }
                    else if (/^unnamed-type-.+$/.test(innerText)) {
                        id = scope.get(lambdaName);
                        id.source = parser.getFrom(sourceFrom);
                    }
                    else {
                        printParserState();
                        throw Error(`Unexpected name <${innerText}>`);
                    }
                }
                else if (oper === '-') {
                    const idname = parser.readIdentifier();
                    if (idname === null) {
                        printParserState();
                        throw Error(`Unexpected end`);
                    }
                    if (!/^[0-9]+$/.test(idname)) {
                        printParserState();
                        throw Error(`Unexpected identifier ${idname}`);
                    }
                    id = PdbIdentifier.global.constVal(idname);
                }
                else if (oper === '&') {
                    id = parseSymbol(eof);
                    id.isValue = true;
                    id.source = parser.getFrom(sourceFrom);
                    id = id.decorate('&', from);
                    id.isValue = true;
                    id.source = parser.getFrom(sourceFrom);
                    return id;
                }
                else if (oper === '`') {
                    _idfind: {
                        if (parser.nextIf("vftable'") || parser.nextIf("vbtable'")) {
                            scope.setAsClass();
                            if (parser.nextIf('{for `')) {
                                const arg = parseSymbol("'");
                                must('}');
                                id = scope.get(parser.getFrom(from));
                                id.setArguments([arg]);
                            }
                            else {
                                id = scope.get(parser.getFrom(from));
                            }
                            id.isVFTable = true;
                        }
                        else if (parser.nextIf("vcall'")) {
                            const arg = parser.readTo("'");
                            parser.readTo("'");
                            id = scope.get(parser.getFrom(from));
                            id.isPrivate = true;
                            id.setArguments([PdbIdentifier.global.get(arg)]);
                            eof = eof.replace(/\(/, '');
                        }
                        else {
                            for (const [sname, hasParam] of SPECIAL_NAMES) {
                                if (parser.nextIf(sname)) {
                                    if (hasParam) {
                                        const iid = parseIdentity("'", {}, scope);
                                        must("'");
                                        id = scope.get(parser.getFrom(from));
                                        id.setArguments([iid]);
                                    }
                                    else {
                                        id = scope.get(parser.getFrom(from));
                                    }
                                    break _idfind;
                                }
                            }
                            const arg = parseSymbol("'");
                            parser.readTo("'");
                            id = scope.get(parser.getFrom(from));
                            id.isPrivate = true;
                            id.setArguments([arg]);
                            id.source = parser.getFrom(sourceFrom);
                        }
                    }
                }
                else {
                    parser.i--;
                    printParserState();
                    throw Error(`Unexpected operator ${oper}`);
                }
            }
            else {
                let isUnsigned = 0;
                if (scope === PdbIdentifier.global && /^[0-9]+$/.test(idname)) {
                    id = PdbIdentifier.global.constVal(idname);
                }
                else if (idname === '__cdecl' || idname === '__stdcall') {
                    if (scope === PdbIdentifier.global) {
                        id = void_t;
                    }
                    else {
                        throw Error(`Invalid scope(${scope}) for ${idname}`);
                    }
                    parser.i = from;
                    break;
                }
                else if (idname === 'const') {
                    id = parseIdentity(eof);
                    id.isValue = true;
                    id.isConstant = true;
                    return id;
                }
                else if (idname === 'enum') {
                    id = parseIdentity(eof, { isClassLike: true });
                    return id;
                }
                else if (idname === 'class') {
                    id = parseIdentity(eof, { isClassLike: true });
                    return id;
                }
                else if (idname === 'struct') {
                    return parseIdentity(eof, { isClassLike: true });
                }
                else if (idname === 'operator') {
                    const oi = parser.i;
                    const oper = parser.readOperator(OPERATORS_FOR_OPERATOR);
                    const oi2 = parser.i;
                    const oper2 = parser.readOperator(OPERATORS);
                    if (oper === '<<' && oper2 === '') {
                        parser.i = oi;
                        idname += parser.readOperator(OPERATORS);
                    }
                    else {
                        parser.i = oi2;
                        idname += oper;
                    }
                }
                else if (idname === 'unsigned') {
                    isUnsigned = 1;
                    idname = parser.readIdentifier();
                    if (idname === null) {
                        idname = 'int';
                    }
                }
                else if (idname === 'signed') {
                    isUnsigned = 2;
                    idname = parser.readIdentifier();
                    if (idname === null) {
                        idname = 'int';
                    }
                }
                else if (idname === 'delete') {
                    if (parser.nextIf('[]')) {
                        idname += '[]';
                    }
                }
                else if (idname === 'new') {
                    if (parser.nextIf('[]')) {
                        idname += '[]';
                    }
                }
                id = scope.get(idname);
                if (isUnsigned !== 0) {
                    id = id.decorate((isUnsigned === 1 ? 'unsigned' : 'signed'), sourceFrom);
                    id.setAsBasicType();
                }
                if (idname.startsWith('~')) {
                    id.parent.setAsClass();
                }
                id.source = parser.getFrom(sourceFrom);
            }
            break;
        }
        if (FIELD_FOR_CLASS.has(idname)) {
            if (id.parent === PdbIdentifier.std)
                debugger;
            id.parent.setAsClass();
        }
        id.addRef();
        if (parser.nextIf('`')) {
            id.release();
            const adjustor = parser.readTo("'");
            let matched;
            if ((matched = adjustor.match(/^adjustor{([0-9]+)}$/))) {
                id = scope.get(id.name + adjustor);
                id.arguments.push(PdbIdentifier.global.constVal(matched[1]));
            }
            else if ((matched = adjustor.match(/^vtordisp{([0-9]+),([0-9]+)}$/))) {
                id = scope.get(id.name + adjustor);
                const v1 = PdbIdentifier.global.constVal(matched[1]);
                const v2 = PdbIdentifier.global.constVal(matched[2]);
                id.arguments.push(v1, v2);
            }
            else {
                printParserState();
                throw Error(`Invalid adjustor ${adjustor}`);
            }
            id.source = parser.getFrom(sourceFrom);
        }
        while (parser.nextIf('<')) {
            id.isTemplate = true;
            const args = [];
            if (!parser.nextIf('>')) {
                for (;;) {
                    const arg = parseIdentity(",>");
                    args.push(arg);
                    if (parser.endsWith(','))
                        continue;
                    if (!parser.endsWith('>')) {
                        printParserState();
                        throw Error(`Unexpected end`);
                    }
                    break;
                }
            }
            const base = id.parent.templateBase;
            if (base !== null && base.name === id.name) {
                // template constructor base
                id.parent.children.delete(id.name);
            }
            const template = id;
            id = id.parent.get(templatename_1.templateName(template.name, ...args.map(id => id.toString())));
            id.setArguments(args);
            id.templateBase = template;
            id.source = parser.getFrom(sourceFrom);
            template.specialized.push(id);
        }
        parser.skipSpaces();
        if (parser.nextIf('::')) {
            id.isNamespaceLike = true;
            scope = id;
        }
        else {
            if (info.isClassLike) {
                id.setAsClass();
            }
            id.source = parser.getFrom(sourceFrom);
            return parseDeco(id, { callingConvension: null, isFunction: false }, from, sourceFrom, eof);
        }
    }
}
function parseSymbol(eof, isFunction = false) {
    const from = parser.i;
    let modifier = null;
    const isThunk = parser.nextIf('[thunk]:');
    if (parser.nextIf('public:')) {
        modifier = 'public';
    }
    else if (parser.nextIf('private:')) {
        modifier = 'private';
    }
    else if (parser.nextIf('protected:')) {
        modifier = 'protected';
    }
    parser.skipSpaces();
    const virtualFunction = parser.nextIf('virtual');
    const isStatic = parser.nextIf('static');
    const id = parseIdentity(eof, { isTypeInside: isFunction });
    if (modifier !== null) {
        id.modifier = modifier;
        id.decay().parent.setAsClass();
    }
    if (virtualFunction) {
        id.setAsFunction();
        id.isVirtualFunction = true;
        id.decay().parent.setAsClass();
    }
    if (isStatic) {
        id.isStatic = true;
        id.decay().parent.setAsClass();
    }
    id.isThunk = isThunk;
    id.source = parser.getFrom(from);
    return id;
}
function parse(from = 0, to) {
    let index = 0;
    const cache = new pdbcache_1.PdbCache;
    if (to === undefined)
        to = cache.total;
    const bar = new ProgressBar('loading [:bar] :current/:total', to - from);
    for (const { address, name, flags, tag } of cache) {
        if (index++ < from)
            continue;
        bar.tick();
        parser.context = core_1.pdb.undecorate(name, 0);
        parser.i = 0;
        const id = parseSymbol('');
        id.address = address;
        id.source = parser.context;
        if (index >= to)
            break;
    }
    bar.terminate();
    cache.close();
}
PdbIdentifier.global.get('bool').isBasicType = true;
PdbIdentifier.global.get('void').isBasicType = true;
PdbIdentifier.global.get('float').isBasicType = true;
PdbIdentifier.global.get('double').isBasicType = true;
PdbIdentifier.global.get('char').isBasicType = true;
PdbIdentifier.global.get('char unsigned').isBasicType = true;
PdbIdentifier.global.get('short').isBasicType = true;
PdbIdentifier.global.get('short unsigned').isBasicType = true;
PdbIdentifier.global.get('int').isBasicType = true;
PdbIdentifier.global.get('int unsigned').isBasicType = true;
PdbIdentifier.global.get('__int64').isBasicType = true;
PdbIdentifier.global.get('__int64 unsigned').isBasicType = true;
PdbIdentifier.global.get('typename').isBasicType = true;
PdbIdentifier.global.get('void*').isBasicType = true;
// parser.context = "class Block const * __ptr64 const __ptr64 VanillaBlocks::mElement104";
// parseSymbol('');
parse(0, 10000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3ltYm9scGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUE4QjtBQUM5QixrREFBK0M7QUFDL0MsOENBQStDO0FBQy9DLHlDQUFzQztBQUN0Qyx3Q0FBeUM7QUFFekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQVM7SUFDOUIsSUFBSTtDQUNQLENBQUMsQ0FBQztBQUVILE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxHQUFHLENBQVM7SUFDM0MsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixLQUFLO0lBQ0wsS0FBSztJQUNMLElBQUk7Q0FDUCxDQUFDLENBQUM7QUFFSCxNQUFNLGFBQWEsR0FBdUI7SUFDdEMsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUM7SUFDbkMsQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUM7SUFDekMsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUM7SUFDL0IsQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUM7SUFDdEMsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUM7SUFDMUMsQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLENBQUM7SUFDL0MsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUM7SUFDekMsQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUM7SUFDdEMsQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUM7Q0FDbkMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFTO0lBQ3BDLDhCQUE4QjtJQUM5Qiw4QkFBOEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUgsZUFBZTtBQUNmLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZixlQUFlO0FBRWYsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUVoQixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLGVBQWU7QUFFZixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBRWhCLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFFaEIsTUFBYSxhQUFhO0lBZ0R0QixZQUNXLElBQVc7UUFBWCxTQUFJLEdBQUosSUFBSSxDQUFPO1FBaERmLGFBQVEsR0FBZSxJQUFJLENBQUM7UUFDNUIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsY0FBUyxHQUFlLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsZUFBVSxHQUFzQixJQUFJLENBQUM7UUFDckMsc0JBQWlCLEdBQXNCLElBQUksQ0FBQztRQUM1QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBc0IsSUFBSSxDQUFDO1FBQ2pDLGlCQUFZLEdBQXNCLElBQUksQ0FBQztRQUN2QyxpQkFBWSxHQUFzQixJQUFJLENBQUM7UUFDdkMsZUFBVSxHQUFzQixJQUFJLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBQ3JELGNBQVMsR0FBbUIsRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUNqQyxjQUFTLEdBQW1CLEVBQUUsQ0FBQztRQUMvQixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osZUFBVSxHQUFzQixJQUFJLENBQUM7UUFDckMsbUJBQWMsR0FBc0IsSUFBSSxDQUFDO1FBQ3pDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixrQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDeEMsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUVQLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBSTdCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsTUFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQSxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLFdBQVc7Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFDdEMsSUFBSSxJQUFJLENBQUMsV0FBVztnQkFBRSxPQUFPLFFBQVEsQ0FBQztZQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLFFBQVEsQ0FBQztnQkFDVCxPQUFPLFFBQVEsQ0FBQzthQUNuQjtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxRQUFRLENBQUM7Z0JBQ1QsT0FBTyxRQUFRLENBQUM7YUFDbkI7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBbUI7UUFDckIsSUFBSSxJQUFJLEtBQUssS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQztRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBdUI7UUFDbkMsSUFBSSxFQUFFLEtBQUssSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUvQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDbEQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsQ0FBQyxZQUFZO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO29CQUN6QixJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUU7d0JBQUUsU0FBUztvQkFDaEMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUM7d0JBQUUsU0FBUztvQkFDOUIsTUFBTSxDQUFDLENBQUM7aUJBQ1g7YUFDSjtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzVCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUM7b0JBQUUsU0FBUztnQkFDOUIsTUFBTSxDQUFDLENBQUM7YUFDWDtTQUNKO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBVyxFQUFFLElBQVc7UUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxJQUFJLEdBQUcsQ0FBQztTQUNmO1FBQ0QsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNiLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksRUFBRSxLQUFLLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQywwQkFBMEIsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNqQixFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN2QixFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNmLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQWlCLElBQUksQ0FBQztRQUM5QixTQUFTO1lBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25ELElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLEVBQUUsR0FBaUIsSUFBSSxDQUFDO1FBQzVCLFNBQVM7WUFDTCxJQUFJLEVBQUUsQ0FBQyxVQUFVLEtBQUssSUFBSTtnQkFBRSxPQUFPLEVBQUUsQ0FBQztZQUN0QyxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3QkFBd0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVc7UUFDWCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLEVBQUUsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDckIsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUMsTUFBTTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztZQUN6RixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ2xEO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQW9CO1FBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQyxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQzthQUNKO1NBQ0o7UUFDRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxRQUFRLENBQUMsTUFBb0I7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQzs7QUEzUEwsc0NBK1BDO0FBRmlCLG9CQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0IsaUJBQUcsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUd4RCxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RDLGFBQWEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDckQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM5RCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNqRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMxRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNsRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMzRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzVELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ2xELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzNELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25ELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3BELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4QixNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RCxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUV2QixNQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFPdEMsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFpQjtJQUN2QyxJQUFJLEVBQUU7UUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxTQUFTLElBQUksQ0FBQyxJQUFXLEVBQUUsRUFBaUI7SUFDeEMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU87SUFDaEMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsTUFBTSxLQUFLLENBQUMsaUNBQWlDLElBQUksWUFBWSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25GLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxJQUFrQixFQUFFLFFBQXNCLEVBQUUsSUFBb0IsRUFBRSxVQUF3QixFQUFFLE1BQWM7SUFDN0gsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUM3QixJQUFJLE1BQU0sRUFBRTtRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBQzlCO1NBQU07UUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDN0IsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUc7WUFDeEIsWUFBWSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUNwQztLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLFFBQXNCLEVBQUUsVUFBd0IsRUFBRSxNQUFjO0lBQ3JGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sSUFBSSxHQUFtQixFQUFFLENBQUM7SUFDaEMsU0FBUztRQUNMLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsU0FBUztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLE1BQU0sS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakM7UUFDRCxNQUFNO0tBQ1Q7SUFDRCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RSxhQUFhLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQWUsSUFBSTtJQUFuQjtRQUNJLFVBQUssR0FBYSxJQUFJLENBQUM7SUFXM0IsQ0FBQztJQVJHLEdBQUcsQ0FBQyxLQUFVO1FBQ1YsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBRUQsTUFBTSxRQUFTLFNBQVEsSUFBSTtJQUN2QixLQUFLLENBQUMsRUFBZ0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUk7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQUVELFNBQVMsU0FBUyxDQUNkLElBQWtCLEVBQ2xCLElBQWdCLEVBQ2hCLElBQVcsRUFDWCxVQUFpQixFQUNqQixHQUFVO0lBRVYsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUM7SUFFMUIsU0FBUztRQUNMLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDZixJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7Z0JBQ1osZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsTUFBTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNqQztZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDcEQsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1lBQ0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEMsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztvQkFDNUIsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ2pCO2lCQUFNLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssV0FBVyxFQUFFO2dCQUN6RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUMxQjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLGFBQWE7YUFDaEI7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7Z0JBQ3pCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRWIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixJQUFJLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7aUJBQzNCO3FCQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0IsSUFBSSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxHQUFHLEdBQUMsWUFBWSxHQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQztvQkFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNILElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDakIscUJBQXFCO3FCQUN4QjtvQkFDRCxJQUFJLEdBQUcsWUFBWSxDQUFDO29CQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QyxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1NBQ0o7YUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMxQzthQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN2RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xFLElBQUksR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2lCQUM5QjthQUNKO2lCQUFNO2dCQUNILElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0o7YUFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDckIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDakIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixNQUFNLEtBQUssQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUM3QztZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVWLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUN6QixDQUFDLE1BQU0sQ0FBQztTQUNYO2FBQU07WUFDSCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDWCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixNQUFNLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUM5QztLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEdBQVUsRUFBRSxPQUEyRSxFQUFFLEVBQUUsUUFBb0IsYUFBYSxDQUFDLE1BQU07SUFDdEosSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVM7UUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUMvRCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUU1QixTQUFTO1FBQ0wsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFdEIsSUFBSSxFQUFnQixDQUFDO1FBRXJCLElBQUksTUFBa0IsQ0FBQztRQUN2QixTQUFTO1lBQ0wsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzdDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO29CQUNkLFNBQVM7aUJBQ1o7cUJBQU0sSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtvQkFDM0QsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNwQixPQUFPLEtBQUssQ0FBQztpQkFDaEI7cUJBQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO29CQUNyQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLFNBQVMsS0FBSyxzQkFBc0IsRUFBRTt3QkFDdEMsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUMxQzt5QkFBTSxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDN0MsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3ZDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQkFDbkI7eUJBQU0sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzVDLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMzQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQzFDO3lCQUFNO3dCQUNILGdCQUFnQixFQUFFLENBQUM7d0JBQ25CLE1BQU0sS0FBSyxDQUFDLG9CQUFvQixTQUFTLEdBQUcsQ0FBQyxDQUFDO3FCQUNqRDtpQkFDSjtxQkFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7b0JBQ3JCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO3dCQUNqQixnQkFBZ0IsRUFBRSxDQUFDO3dCQUNuQixNQUFNLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3FCQUNqQztvQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDMUIsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDbkIsTUFBTSxLQUFLLENBQUMseUJBQXlCLE1BQU0sRUFBRSxDQUFDLENBQUM7cUJBQ2xEO29CQUNELEVBQUUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUM7cUJBQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO29CQUNyQixFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDbEIsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzVCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNsQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sRUFBRSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtvQkFDckIsT0FBTyxFQUFDO3dCQUNKLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUN4RCxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7NEJBQ25CLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQ0FDekIsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ1YsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNyQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs2QkFDMUI7aUNBQU07Z0NBQ0gsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDRCxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt5QkFDdkI7NkJBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUNoQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNuQixFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNwQixFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7eUJBQy9COzZCQUFNOzRCQUNILEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxhQUFhLEVBQUU7Z0NBQzNDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQ0FDdEIsSUFBSSxRQUFRLEVBQUU7d0NBQ1YsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7d0NBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3Q0FDVixFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0NBQ3JDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FDQUMxQjt5Q0FBTTt3Q0FDSCxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUNBQ3hDO29DQUNELE1BQU0sT0FBTyxDQUFDO2lDQUNqQjs2QkFDSjs0QkFDRCxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ25CLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDckMsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBQ3BCLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQzFDO3FCQUNKO2lCQUNKO3FCQUFPO29CQUNKLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDWCxnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixNQUFNLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBRW5CLElBQUksS0FBSyxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0QsRUFBRSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QztxQkFBTSxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFdBQVcsRUFBRTtvQkFDdkQsSUFBSSxLQUFLLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTt3QkFDaEMsRUFBRSxHQUFHLE1BQU0sQ0FBQztxQkFDZjt5QkFBTTt3QkFDSCxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLE1BQU0sRUFBRSxDQUFDLENBQUM7cUJBQ3hEO29CQUNELE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNoQixNQUFNO2lCQUNUO3FCQUFNLElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRTtvQkFDM0IsRUFBRSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUNyQixPQUFPLEVBQUUsQ0FBQztpQkFDYjtxQkFBTSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7b0JBQzFCLEVBQUUsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7b0JBQzdDLE9BQU8sRUFBRSxDQUFDO2lCQUNiO3FCQUFNLElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRTtvQkFDM0IsRUFBRSxHQUFHLGFBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDN0MsT0FBTyxFQUFFLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO29CQUM1QixPQUFPLGFBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDbEQ7cUJBQU0sSUFBRyxNQUFNLEtBQUssVUFBVSxFQUFFO29CQUM3QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNwQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3pELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdDLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO3dCQUMvQixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDZCxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDNUM7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQztxQkFDbEI7aUJBQ0o7cUJBQU0sSUFBRyxNQUFNLEtBQUssVUFBVSxFQUFFO29CQUM3QixVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNmLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ2pDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTt3QkFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQztxQkFDbEI7aUJBQ0o7cUJBQU0sSUFBRyxNQUFNLEtBQUssUUFBUSxFQUFFO29CQUMzQixVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNmLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ2pDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTt3QkFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQztxQkFDbEI7aUJBQ0o7cUJBQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO29CQUM1QixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3JCLE1BQU0sSUFBSSxJQUFJLENBQUM7cUJBQ2xCO2lCQUNKO3FCQUFNLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtvQkFDekIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNyQixNQUFNLElBQUksSUFBSSxDQUFDO3FCQUNsQjtpQkFDSjtnQkFDRCxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO29CQUNsQixFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3pFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixFQUFFLENBQUMsTUFBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUMzQjtnQkFDRCxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUM7WUFDRCxNQUFNO1NBQ1Q7UUFFRCxJQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxHQUFHO2dCQUFFLFFBQVEsQ0FBQztZQUM5QyxFQUFFLENBQUMsTUFBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzNCO1FBRUQsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1osSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxPQUE2QixDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BELEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEU7aUJBQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsRUFBRTtnQkFDcEUsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakMsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0gsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsTUFBTSxLQUFLLENBQUMsb0JBQW9CLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDL0M7WUFDRCxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFckIsTUFBTSxJQUFJLEdBQW1CLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDckIsU0FBUztvQkFDTCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzt3QkFBRSxTQUFTO29CQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDdkIsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDbkIsTUFBTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztxQkFDakM7b0JBQ0QsTUFBTTtpQkFDVDthQUNKO1lBQ0QsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU8sQ0FBQyxZQUFZLENBQUM7WUFDckMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDeEMsNEJBQTRCO2dCQUM1QixFQUFFLENBQUMsTUFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTyxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQSxFQUFFLENBQUEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7WUFDM0IsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixFQUFFLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUMxQixLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM3RjtLQUNKO0FBRUwsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQVUsRUFBRSxhQUFxQixLQUFLO0lBQ3ZELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEIsSUFBSSxRQUFRLEdBQWUsSUFBSSxDQUFDO0lBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzFCLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDdkI7U0FBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbEMsUUFBUSxHQUFHLFNBQVMsQ0FBQztLQUN4QjtTQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNwQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0tBQzFCO0lBQ0QsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6QyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDekQsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQ25CLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkM7SUFDRCxJQUFJLGVBQWUsRUFBRTtRQUNqQixFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkIsRUFBRSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25DO0lBQ0QsSUFBSSxRQUFRLEVBQUU7UUFDVixFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNuQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25DO0lBQ0QsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDckIsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLE9BQWMsQ0FBQyxFQUFFLEVBQVU7SUFFdEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBUSxDQUFDO0lBQzNCLElBQUksRUFBRSxLQUFLLFNBQVM7UUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUV2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkUsS0FBSyxNQUFNLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLElBQUksS0FBSyxFQUFFO1FBQzdDLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSTtZQUFFLFNBQVM7UUFDN0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxLQUFLLElBQUksRUFBRTtZQUFFLE1BQU07S0FDMUI7SUFDRCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3BELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDcEQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUNyRCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3RELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDcEQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUM3RCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3JELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUM5RCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ25ELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDNUQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2RCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDaEUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN4RCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBRXJELDJGQUEyRjtBQUMzRixtQkFBbUI7QUFFbkIsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyJ9