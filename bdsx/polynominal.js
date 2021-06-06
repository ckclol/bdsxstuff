"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polynominal = void 0;
const textparser_1 = require("./textparser");
function unexpected() {
    throw Error('Unexpected operation');
}
function method(a, b, method) {
    return [a, b, method];
}
var polynominal;
(function (polynominal) {
    class Operand {
        _constantOperating(oper, other) {
            return null;
        }
        equals(other) {
            return false;
        }
        equalsConstant(v) {
            return false;
        }
        add(other) {
            const res = this._constantOperating(operation.binaryPlus, other);
            if (res !== null)
                return res;
            for (const [a, b, func] of operation.add) {
                if (this instanceof a && other instanceof b) {
                    const res = func(this, other);
                    if (res === null)
                        continue;
                    return res;
                }
                if (this instanceof b && other instanceof a) {
                    const res = func(other, this);
                    if (res === null)
                        continue;
                    return res;
                }
            }
            const out = new Additive;
            out.add(this); // must not normalize
            out.add(other);
            return out;
        }
        multiply(other) {
            const res = this._constantOperating(operation.binaryMultiply, other);
            if (res !== null)
                return res;
            for (const [a, b, func] of operation.multiply) {
                if (this instanceof a && other instanceof b) {
                    const res = func(this, other);
                    if (res === null)
                        continue;
                    return res;
                }
                if (this instanceof b && other instanceof a) {
                    const res = func(other, this);
                    if (res === null)
                        continue;
                    return res;
                }
            }
            const out = new Multiplicative;
            out.multiply(this); // must not normalize
            out.multiply(other);
            return out;
        }
        exponent(other) {
            const res = this._constantOperating(operation.binaryExponent, other);
            if (res !== null)
                return res;
            return new polynominal.Variable(this, other);
        }
        asAdditive() {
            const out = new Additive;
            const mult = new Multiplicative;
            mult.pushVariable(new Variable(this, new Constant(1)));
            out.pushTerm(mult);
            return out;
        }
        defineVariable(name, value) {
            return this;
        }
        toString() {
            unexpected();
        }
    }
    polynominal.Operand = Operand;
    class Constant extends Operand {
        constructor(value) {
            super();
            this.value = value;
        }
        _constantOperating(oper, other) {
            if (!(other instanceof Constant))
                return null;
            this.value = oper.operationConst(this.value, other.value);
            return this;
        }
        equals(other) {
            if (!(other instanceof Constant))
                return false;
            return this.value === other.value;
        }
        equalsConstant(v) {
            return this.value === v;
        }
        asAdditive() {
            const out = new Additive;
            out.constant = this.value;
            return out;
        }
        toString() {
            return this.value + '';
        }
    }
    polynominal.Constant = Constant;
    class Name extends Operand {
        constructor(name) {
            super();
            this.name = name;
            this.column = -1;
            this.length = -1;
        }
        equals(other) {
            if (!(other instanceof Name))
                return false;
            return this.name === other.name;
        }
        defineVariable(name, value) {
            if (name === this.name)
                return new Constant(value);
            return this;
        }
        toString() {
            return this.name;
        }
    }
    polynominal.Name = Name;
    class Variable extends Operand {
        constructor(term, degree) {
            super();
            this.term = term;
            this.degree = degree;
        }
        equals(other) {
            if (!(other instanceof Variable))
                return false;
            return this.degree.equals(other.degree) && this.term.equals(other.term);
        }
        asAdditive() {
            const out = new Additive;
            out.pushVariable(this);
            return out;
        }
        defineVariable(name, value) {
            this.term = this.term.defineVariable(name, value);
            this.degree = this.degree.defineVariable(name, value);
            return this.normalize();
        }
        normalize() {
            if (this.degree instanceof Constant) {
                if (this.term instanceof Constant) {
                    return new Constant(this.term.value ** this.degree.value);
                }
                if (this.degree.value === 0) {
                    return new Constant(1);
                }
                if (this.degree.value === 1) {
                    return this.term;
                }
            }
            if (this.term instanceof Constant) {
                if (this.term.value === 0) {
                    return new Constant(0);
                }
                if (this.term.value === 1) {
                    return new Constant(1);
                }
            }
            return this;
        }
        toString() {
            if (this.degree instanceof Constant && this.degree.value === 1)
                return this.term + '';
            return `(${this.term}^${this.degree})`;
        }
    }
    polynominal.Variable = Variable;
    class Multiplicative extends Operand {
        constructor() {
            super(...arguments);
            this.variables = [];
            this.constant = 1;
        }
        has(v) {
            for (const thisv of this.variables) {
                if (thisv.equals(v))
                    return true;
            }
            return false;
        }
        isOnlyVariable(o) {
            if (this.variables.length !== 1)
                return false;
            if (!this.variables[0].equals(o))
                return false;
            return true;
        }
        isSameVariables(o) {
            const arr = this.variables.slice();
            _foundSame: for (const v of o.variables) {
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i].equals(v))
                        continue;
                    const last = arr.length - 1;
                    if (i !== last) {
                        arr[i] = arr.pop();
                    }
                    else {
                        arr.length = last;
                    }
                    continue _foundSame;
                }
                return false;
            }
            return true;
        }
        pushVariable(v) {
            for (const thisvar of this.variables) {
                if (!v.term.equals(thisvar.term))
                    continue;
                v.degree = v.degree.multiply(thisvar);
                return;
            }
            this.variables.push(v);
        }
        pushMultiplicative(item) {
            this.constant *= item.constant;
            for (const term of item.variables) {
                this.pushVariable(term);
            }
        }
        asAdditive() {
            const out = new Additive;
            out.pushTerm(this);
            return out;
        }
        defineVariable(name, value) {
            const out = new Multiplicative;
            out.constant = this.constant;
            for (const v of this.variables) {
                out.multiply(v.defineVariable(name, value));
            }
            return out.normalize();
        }
        normalize() {
            if (this.constant === 0)
                return new Constant(0);
            if (this.variables.length === 0)
                return new Constant(this.constant);
            if (this.variables.length === 1 && this.constant === 1)
                return this.variables[0];
            return this;
        }
        toString() {
            if (this.variables.length === 0)
                return this.constant + '';
            if (this.constant === 1) {
                if (this.variables.length === 1)
                    return this.variables[0] + '';
                return `(${this.variables.join('*')})`;
            }
            return `(${this.variables.join('*')}*${this.constant})`;
        }
    }
    polynominal.Multiplicative = Multiplicative;
    class Additive extends Operand {
        constructor() {
            super(...arguments);
            this.terms = [];
            this.constant = 0;
        }
        pushTerm(term) {
            for (let i = 0; i < this.terms.length; i++) {
                const thisterm = this.terms[i];
                if (!term.isSameVariables(thisterm))
                    continue;
                thisterm.pushMultiplicative(term);
                if (thisterm.constant === 0) {
                    this.terms.splice(i, 1);
                }
                return;
            }
            this.terms.push(term);
        }
        pushVariable(variable) {
            for (const term of this.terms) {
                if (term.isOnlyVariable(variable)) {
                    term.constant++;
                    return;
                }
            }
            const mult = new Multiplicative;
            mult.variables.push(variable);
            this.terms.push(mult);
        }
        pushAddtive(item) {
            this.constant += item.constant;
            for (const term of item.terms) {
                this.pushTerm(term);
            }
        }
        asAdditive() {
            return this;
        }
        defineVariable(name, value) {
            const out = new Additive;
            out.constant = this.constant;
            for (const term of this.terms) {
                out.add(term.defineVariable(name, value));
            }
            return out.normalize();
        }
        normalize() {
            if (this.terms.length === 1 && this.constant === 0)
                return this.terms[0];
            if (this.terms.length === 0)
                return new Constant(this.constant);
            return this;
        }
        toString() {
            if (this.terms.length === 0)
                return this.constant + '';
            return `(${this.terms.join('+')}+${this.constant})`;
        }
    }
    polynominal.Additive = Additive;
    class Operation extends Operand {
        constructor(oper, operands) {
            super();
            this.oper = oper;
            this.operands = operands;
        }
        toString() {
            return `(${this.operands.join(this.oper.name)})`;
        }
        defineVariable(name, value) {
            const values = [];
            for (let i = 0; i < this.operands.length; i++) {
                const operand = this.operands[i].defineVariable(name, value);
                this.operands[i] = operand;
                if (operand instanceof Constant)
                    values.push(operand.value);
            }
            if (values.length === this.operands.length)
                return new Constant(this.oper.operationConst(...values));
            return this;
        }
    }
    polynominal.Operation = Operation;
    class Operator {
        constructor(precedence, operationConst, operation = function (...args) {
            return new Operation(this, args);
        }) {
            this.precedence = precedence;
            this.operationConst = operationConst;
            this.operation = operation;
        }
        toString() {
            return this.name;
        }
    }
    polynominal.Operator = Operator;
    /**
     * @return null if invalid
     */
    function parseToNumber(text) {
        let i = 0;
        let firstchr = text.charCodeAt(i);
        const minus = (firstchr === 0x2d);
        if (minus) {
            do {
                firstchr = text.charCodeAt(++i);
                if (isNaN(firstchr))
                    return null;
            } while (firstchr === 0x20 || firstchr === 0x09 || firstchr === 0x0d || firstchr === 0x0a);
        }
        if (text.charAt(text.length - 1) === 'h') {
            const numstr = text.substring(i, text.length - 1);
            if (/^[a-fA-F0-9]+$/.test(numstr)) {
                return parseInt(numstr, 16);
            }
            return null;
        }
        else {
            if (0x30 <= firstchr && firstchr <= 0x39) { // number
                const n = +text.substr(i);
                if (isNaN(n))
                    return null;
                return minus ? -n : n;
            }
        }
        return null;
    }
    polynominal.parseToNumber = parseToNumber;
    function parse(text, lineNumber = 0, offset = 0) {
        const parser = new textparser_1.LanguageParser(text);
        const ungettedOperators = [];
        function error(message, word) {
            throw new textparser_1.ParsingError(message, {
                column: offset + parser.i - word.length,
                width: word.length,
                line: lineNumber
            });
        }
        function readOperator(...types) {
            if (ungettedOperators.length !== 0) {
                return ungettedOperators.shift();
            }
            const opername = parser.readOperator(OPERATORS);
            if (opername === null) {
                return OPER_EOF;
            }
            const opers = OPERATORS.get(opername);
            if (opers === undefined)
                error(`Unexpected operator '${opername}'`, opername);
            for (const type of types) {
                const oper = opers[type];
                if (oper !== undefined)
                    return oper;
            }
            error(`Unexpected operator '${opername}' for ${types.join(',')}`, opername);
        }
        function ungetOperator(oper) {
            ungettedOperators.push(oper);
        }
        function readOperand() {
            const word = parser.readIdentifier();
            if (word === null)
                return null;
            const n = parseToNumber(word);
            let out;
            if (n === null) {
                out = new Name(word);
                out.column = parser.i - word.length;
                out.length = word.length;
            }
            else {
                if (isNaN(n))
                    throw error(`Unexpected number: ${word}`, word);
                out = new Constant(n);
            }
            return out;
        }
        function readStatement(endPrecedence) {
            let operand = readOperand();
            if (operand === null) {
                const oper = readOperator('unaryPrefix');
                if (oper === OPER_EOF) {
                    error('unexpected end', '');
                }
                else if (oper.name === '(') {
                    operand = readStatement(OPER_CLOSE.precedence);
                    const endoper = readOperator('unarySuffix');
                    if (endoper !== OPER_CLOSE)
                        error(`Unexpected operator: '${oper}', expected: ')'`, endoper.name);
                }
                else {
                    return oper.operation(readStatement(oper.precedence));
                }
            }
            for (;;) {
                const oper = readOperator('binary', 'unarySuffix');
                if (oper.precedence <= endPrecedence) {
                    ungetOperator(oper);
                    return operand;
                }
                if (oper.type === 'unarySuffix') {
                    if (operand instanceof Constant) {
                        operand.value = oper.operationConst(operand.value);
                    }
                    else {
                        operand = oper.operation(operand);
                    }
                    continue;
                }
                const operand2 = readStatement(oper.precedence);
                if ((operand instanceof Constant) && (operand2 instanceof Constant)) {
                    operand.value = oper.operationConst(operand.value, operand2.value);
                }
                else {
                    operand = oper.operation(operand, operand2);
                }
            }
        }
        return readStatement(-1);
    }
    polynominal.parse = parse;
})(polynominal = exports.polynominal || (exports.polynominal = {}));
var operation;
(function (operation) {
    operation.add = [
        method(polynominal.Additive, polynominal.Constant, (a, b) => {
            a.constant += b.value;
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Variable, (a, b) => {
            a.pushVariable(b);
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Multiplicative, (a, b) => {
            a.pushTerm(b);
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Additive, (a, b) => {
            a.pushAddtive(b);
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Name, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Operand, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
    ];
    operation.multiply = [
        method(polynominal.Multiplicative, polynominal.Multiplicative, (a, b) => {
            a.pushMultiplicative(b);
            return a.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Variable, (a, b) => {
            a.pushVariable(b);
            return a.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Constant, (a, b) => {
            a.constant *= b.value;
            return a.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Name, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
        method(polynominal.Variable, polynominal.Operand, (a, b) => {
            if (a.term.equals(b)) {
                a.degree = a.degree.add(new polynominal.Constant(1));
                return a.normalize();
            }
            return null;
        }),
        method(polynominal.Additive, polynominal.Operand, (a, b) => {
            const out = new polynominal.Additive;
            for (const term of a.terms) {
                out.add(term.multiply(b));
            }
            out.add(new polynominal.Constant(a.constant).multiply(b));
            return out.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Operand, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
    ];
    operation.binaryPlus = new polynominal.Operator(14, (a, b) => a + b, (a, b) => a.add(b));
    operation.binaryMultiply = new polynominal.Operator(15, (a, b) => a * b, (a, b) => a.multiply(b));
    operation.binaryExponent = new polynominal.Operator(16, (a, b) => a ** b, (a, b) => a.exponent(b));
})(operation || (operation = {}));
const OPERATORS = new Map();
OPERATORS.set('**', {
    binary: operation.binaryExponent
});
OPERATORS.set('*', {
    binary: operation.binaryMultiply
});
OPERATORS.set('/', { binary: new polynominal.Operator(15, (a, b) => a / b, (a, b) => a.multiply(b.exponent(new polynominal.Constant(-1)))) });
OPERATORS.set('+', {
    unaryPrefix: new polynominal.Operator(17, v => v, v => v),
    binary: operation.binaryPlus
});
OPERATORS.set('-', {
    unaryPrefix: new polynominal.Operator(17, v => -v, v => v.multiply(new polynominal.Constant(-1))),
    binary: new polynominal.Operator(14, (a, b) => a - b, (a, b) => a.add(b.multiply(new polynominal.Constant(-1))))
});
OPERATORS.set('~', { unaryPrefix: new polynominal.Operator(17, v => ~v) });
OPERATORS.set('<<', { binary: new polynominal.Operator(13, (a, b) => a << b) });
OPERATORS.set('>>', { binary: new polynominal.Operator(13, (a, b) => a >> b) });
OPERATORS.set('>>>', { binary: new polynominal.Operator(13, (a, b) => a >>> b) });
OPERATORS.set('&', { binary: new polynominal.Operator(10, (a, b) => a & b) });
OPERATORS.set('^', { binary: new polynominal.Operator(9, (a, b) => a ^ b) });
OPERATORS.set('|', { binary: new polynominal.Operator(8, (a, b) => a | b) });
OPERATORS.set('(', { unaryPrefix: new polynominal.Operator(0, unexpected, unexpected) });
OPERATORS.set(')', { unarySuffix: new polynominal.Operator(0, unexpected, unexpected) });
OPERATORS.set(';', { unarySuffix: new polynominal.Operator(0, unexpected, unexpected) });
for (const [name, oper] of OPERATORS.entries()) {
    if (oper.unaryPrefix) {
        oper.unaryPrefix.name = name;
        oper.unaryPrefix.type = 'unarySuffix';
    }
    if (oper.unarySuffix) {
        oper.unarySuffix.name = name;
        oper.unarySuffix.type = 'unarySuffix';
    }
    if (oper.binary) {
        oper.binary.name = name;
        oper.binary.type = 'binary';
    }
}
const OPER_EOF = new polynominal.Operator(-1, unexpected);
const OPER_CLOSE = OPERATORS.get(')').unarySuffix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seW5vbWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2x5bm9taW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEQ7QUFFNUQsU0FBUyxVQUFVO0lBQ2YsTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBSUQsU0FBUyxNQUFNLENBQ1gsQ0FBZ0IsRUFBRSxDQUFnQixFQUFFLE1BQTZDO0lBQ2pGLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFRCxJQUFpQixXQUFXLENBbWMzQjtBQW5jRCxXQUFpQixXQUFXO0lBQ3hCLE1BQWEsT0FBTztRQUNOLGtCQUFrQixDQUFDLElBQWEsRUFBRSxLQUFhO1lBQ3JELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBYTtZQUNoQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsY0FBYyxDQUFDLENBQVE7WUFDbkIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELEdBQUcsQ0FBQyxLQUFhO1lBQ2IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxHQUFHLEtBQUssSUFBSTtnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUM3QixLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxFQUFFO29CQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM5QixJQUFJLEdBQUcsS0FBSyxJQUFJO3dCQUFFLFNBQVM7b0JBQzNCLE9BQU8sR0FB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QUFDLEdBQUcsRUFBRTtJQUNmLE1BQU0sRUFBRSxTQUFTLENBQUMsY0FBYztDQUNuQyxDQUFDLENBQUM7QUFDSCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFdEksU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVU7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdGLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDM0csQ0FBQyxDQUFDO0FBQ0gsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXpFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTdFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXhFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN6RixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXpGLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7S0FDekM7SUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztLQUN6QztJQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7S0FDL0I7Q0FDSjtBQUVELE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMxRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDLFdBQVksQ0FBQyJ9