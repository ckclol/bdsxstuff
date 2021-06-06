"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingErrorContainer = exports.ParsingError = exports.ErrorPosition = exports.TextLineParser = exports.LanguageParser = exports.TextParser = void 0;
const colors = require("colors");
const util_1 = require("./util");
const SPACE_REG = /^([\s\uFEFF\xA0]*)(.*[^\s\uFEFF\xA0])[\s\uFEFF\xA0]*$/;
const DEFAULT_SEPERATOR = util_1.str2set('!@#%^&*()+-=`~[]{};\':",./<>?');
const SPACES = util_1.str2set(' \t\r\n\uFEFF\xa0');
class TextParser {
    constructor(context) {
        this.context = context;
        this.i = 0;
    }
    getFrom(from) {
        return this.context.substring(from, this.i);
    }
    eof() {
        return this.i >= this.context.length;
    }
    peek() {
        return this.context.charAt(this.i);
    }
    endsWith(str) {
        return this.context.endsWith(str, this.i);
    }
    nextIf(str) {
        if (!this.context.startsWith(str, this.i))
            return false;
        this.i += str.length;
        return true;
    }
    skipSpaces() {
        const nonspace = /[^\s\uFEFF\xA0]/g;
        nonspace.lastIndex = this.i;
        const res = nonspace.exec(this.context);
        if (res === null) {
            this.i = this.context.length;
            return;
        }
        this.i = res.index;
    }
}
exports.TextParser = TextParser;
class LanguageParser extends TextParser {
    constructor(context, seperators = DEFAULT_SEPERATOR) {
        super(context);
        this.seperators = seperators;
        for (const chr of SPACES) {
            this.seperators.add(chr);
        }
    }
    readIdentifier() {
        this.skipSpaces();
        const from = this.i;
        for (;;) {
            if (this.i >= this.context.length)
                break;
            const code = this.context.charCodeAt(this.i);
            if (this.seperators.has(code))
                break;
            this.i++;
        }
        if (from === this.i)
            return null;
        return this.context.substring(from, this.i);
    }
    readOperator(operators) {
        this.skipSpaces();
        const from = this.i;
        if (from >= this.context.length)
            return null;
        let out = '';
        for (;;) {
            const code = this.context.charCodeAt(this.i);
            if (!this.seperators.has(code))
                break;
            out += String.fromCharCode(code);
            if (out.length !== 1 && !operators.has(out))
                break;
            this.i++;
        }
        return this.context.substring(from, this.i);
    }
    readTo(needle) {
        const context = this.context;
        const idx = context.indexOf(needle, this.i);
        const matched = (idx === -1 ? context.substr(this.i) : context.substring(this.i, idx)).trim();
        this.i = idx === -1 ? context.length : idx + 1;
        return matched;
    }
    readAll() {
        return this.context.substr(this.i).trim();
    }
}
exports.LanguageParser = LanguageParser;
class TextLineParser extends TextParser {
    constructor(context, lineNumber, offset = 0) {
        super(context);
        this.lineNumber = lineNumber;
        this.offset = offset;
        this.matchedIndex = 0;
        this.matchedWidth = context.length;
    }
    static prespace(text) {
        return text.match(/^[\s\uFEFF\xA0]*/)[0].length;
    }
    static trim(context) {
        const matched = SPACE_REG.exec(context);
        if (matched === null)
            return ['', 0, context.length];
        const res = matched[2];
        return [res, matched[1].length, res.length];
    }
    readQuotedStringTo(chr) {
        let p = this.i + 1;
        for (;;) {
            const np = this.context.indexOf(chr, p);
            if (np === -1) {
                this.matchedIndex = this.i + this.offset;
                this.matchedWidth = 1;
                throw this.error('qouted string does not end');
            }
            let count = 0;
            p = np;
            for (;;) {
                const chr = this.context.charAt(--p);
                if (chr === '\\') {
                    count++;
                    continue;
                }
                break;
            }
            if ((count & 1) === 0) {
                const out = this.context.substring(this.i - 1, np + 1);
                this.matchedIndex = this.i + this.offset;
                this.matchedWidth = out.length;
                this.i = np + 1;
                try {
                    return JSON.parse(out);
                }
                catch (err) {
                    throw this.error(err.message);
                }
            }
            p = np + 1;
        }
    }
    readQuotedString() {
        this.skipSpaces();
        const chr = this.context.charAt(this.i);
        if (chr !== '"' && chr !== "'")
            return null;
        return this.readQuotedStringTo(chr);
    }
    readToSpace() {
        const context = this.context;
        const spaceMatch = /[\s\uFEFF\xA0]+/g;
        spaceMatch.lastIndex = this.i;
        for (;;) {
            const res = spaceMatch.exec(context);
            let content;
            this.matchedIndex = this.i + this.offset;
            if (res === null) {
                content = context.substr(this.i);
                this.matchedWidth = content.length;
                this.i = this.context.length;
            }
            else {
                if (res.index === 0) {
                    this.i = spaceMatch.lastIndex;
                    continue;
                }
                content = context.substring(this.i, res.index);
                this.matchedWidth = content.length;
                this.i = spaceMatch.lastIndex;
            }
            return content;
        }
    }
    *splitWithSpaces() {
        const context = this.context;
        if (this.i >= context.length)
            return;
        const oriindex = this.matchedIndex;
        const offset = this.offset;
        const spaceMatch = /[\s\uFEFF\xA0]+/g;
        spaceMatch.lastIndex = this.i;
        for (;;) {
            const res = spaceMatch.exec(context);
            let content;
            if (res === null) {
                content = context.substr(this.i);
            }
            else {
                if (res.index === 0) {
                    this.i = spaceMatch.lastIndex;
                    continue;
                }
                content = context.substring(this.i, res.index);
            }
            this.offset = this.matchedIndex = this.i + offset;
            this.matchedWidth = content.length;
            this.i = 0;
            yield this.context = content;
            if (res === null)
                break;
            this.i = spaceMatch.lastIndex;
        }
        this.offset = offset;
        this.context = context;
        this.i = context.length;
        this.matchedWidth = this.matchedIndex + this.matchedWidth - oriindex;
        this.matchedIndex = oriindex;
    }
    readTo(needle) {
        const context = this.context;
        const idx = context.indexOf(needle, this.i);
        const [matched, prespace, width] = TextLineParser.trim(idx === -1 ? context.substr(this.i) : context.substring(this.i, idx));
        this.matchedIndex = this.offset + this.i + prespace;
        this.matchedWidth = width;
        this.i = idx === -1 ? context.length : idx + 1;
        return matched;
    }
    readAll() {
        const [matched, prespace, width] = TextLineParser.trim(this.context.substr(this.i));
        this.matchedIndex = this.i + prespace;
        this.matchedWidth = width;
        this.i = this.context.length;
        return matched;
    }
    *split(needle) {
        const context = this.context;
        if (this.i >= context.length)
            return;
        const oriindex = this.matchedIndex;
        const offset = this.offset;
        for (;;) {
            const idx = context.indexOf(needle, this.i);
            const [matched, prespace, width] = TextLineParser.trim(idx === -1 ? context.substr(this.i) : context.substring(this.i, idx));
            this.offset = this.matchedIndex = this.i + prespace + offset;
            this.matchedWidth = width;
            this.i = 0;
            yield this.context = matched;
            if (idx === -1)
                break;
            this.i = idx + 1;
        }
        this.offset = offset;
        this.context = context;
        this.i = context.length;
        this.matchedWidth = this.matchedIndex + this.matchedWidth - oriindex;
        this.matchedIndex = oriindex;
    }
    error(message) {
        return new ParsingError(message, {
            column: this.matchedIndex,
            width: this.matchedWidth,
            line: this.lineNumber
        });
    }
    getPosition() {
        return {
            line: this.lineNumber,
            column: this.matchedIndex,
            width: this.matchedWidth
        };
    }
}
exports.TextLineParser = TextLineParser;
class ErrorPosition {
    constructor(message, severity, pos) {
        this.message = message;
        this.severity = severity;
        this.pos = pos;
    }
    report(sourcePath, lineText) {
        console.error();
        const pos = this.pos;
        if (pos !== null) {
            console.error(`${colors.cyan(sourcePath)}:${colors.yellow(pos.line + '')}:${colors.yellow(pos.column + '')} - ${colors.red(this.severity)}: ${this.message}`);
            if (lineText !== null) {
                const linestr = pos.line + '';
                console.error(`${colors.black(colors.bgWhite(linestr))} ${lineText}`);
                console.error(colors.bgWhite(' '.repeat(linestr.length)) + ' '.repeat(pos.column + 1) + colors.red('~'.repeat(Math.max(pos.width, 1))));
            }
        }
        else {
            console.error(`${colors.cyan(sourcePath)} - ${colors.red(this.severity)}: ${this.message}`);
            if (lineText !== null) {
                console.error(`${colors.bgWhite(' ')} ${lineText}`);
            }
        }
    }
}
exports.ErrorPosition = ErrorPosition;
class ParsingError extends Error {
    constructor(message, pos) {
        super(pos !== null ? `${message}, line:${pos.line}` : message);
        this.pos = pos;
        this.errors = [];
        this.errors.push(new ErrorPosition(message, 'error', pos));
    }
    report(sourcePath, lineText) {
        this.errors[0].report(sourcePath, lineText);
    }
    reportAll(sourcePath, sourceText) {
        for (const err of this.errors) {
            err.report(sourcePath, sourceText);
        }
    }
}
exports.ParsingError = ParsingError;
class ParsingErrorContainer {
    constructor() {
        this.error = null;
    }
    add(error) {
        if (this.error !== null) {
            this.error.errors.push(...error.errors);
        }
        else {
            this.error = error;
        }
    }
}
exports.ParsingErrorContainer = ParsingErrorContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHRwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQWtDO0FBQ2xDLGlDQUFpQztBQUVqQyxNQUFNLFNBQVMsR0FBRyx1REFBdUQsQ0FBQztBQUMxRSxNQUFNLGlCQUFpQixHQUFHLGNBQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRW5FLE1BQU0sTUFBTSxHQUFHLGNBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRTVDLE1BQWEsVUFBVTtJQUVuQixZQUNXLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRmxCLE1BQUMsR0FBRyxDQUFDLENBQUM7SUFHYixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVc7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELEdBQUc7UUFDQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFVO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEQsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3JC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