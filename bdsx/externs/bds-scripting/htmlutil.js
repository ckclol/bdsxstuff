"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlSearcher = exports.htmlutil = exports.HtmlRule = void 0;
const node_html_parser_1 = require("node-html-parser");
const https = require("https");
class HtmlRule {
    constructor(filter) {
        this.filter = filter;
        this.finally = [];
    }
}
exports.HtmlRule = HtmlRule;
var htmlutil;
(function (htmlutil) {
    function* children(node) {
        for (const child of node.childNodes) {
            if (child.nodeType === node_html_parser_1.NodeType.ELEMENT_NODE) {
                yield child;
            }
        }
    }
    htmlutil.children = children;
    function firstChild(node) {
        for (const child of children(node)) {
            return child;
        }
        return null;
    }
    htmlutil.firstChild = firstChild;
    function* childrenFilter(node, opts) {
        let i = 0;
        for (const child of children(node)) {
            if (check(child, opts, i)) {
                yield child;
            }
            i++;
        }
    }
    htmlutil.childrenFilter = childrenFilter;
    function get(node, opt) {
        switch (typeof opt) {
            case 'number':
                for (const child of children(node)) {
                    if (opt === 0) {
                        return child;
                    }
                    opt--;
                }
                break;
            case 'string':
                opt = opt.toUpperCase();
                for (const child of children(node)) {
                    if (child.tagName === opt) {
                        return child;
                    }
                }
                break;
            case 'function':
                for (const child of children(node)) {
                    if (opt(child))
                        return child;
                }
                break;
            default:
                if (opt instanceof Array) {
                    for (const filter of opt) {
                        const item = get(node, filter);
                        if (item !== null)
                            return item;
                    }
                }
                else {
                    if (opt.tag)
                        opt.tag = opt.tag.toUpperCase();
                    for (const child of children(node)) {
                        if (opt.id && child.id !== opt.id)
                            continue;
                        if (opt.class && child.classNames.indexOf(opt.class) === -1)
                            continue;
                        if (opt.tag && child.tagName !== opt.tag)
                            continue;
                        return child;
                    }
                }
                break;
        }
        return null;
    }
    htmlutil.get = get;
    function follow(node, ...opts) {
        for (const opt of opts) {
            const child = get(node, opt);
            if (child === null)
                return null;
            node = child;
        }
        return node;
    }
    htmlutil.follow = follow;
    function check(node, opt, index) {
        switch (typeof opt) {
            case 'number': return index === opt;
            case 'string': return node.tagName === opt.toUpperCase();
            case 'function': return !!opt(node);
            default:
                if (opt instanceof Array) {
                    for (const filter of opt) {
                        if (check(node, filter))
                            return true;
                    }
                    return false;
                }
                else {
                    if (opt.id && node.id !== opt.id)
                        return false;
                    if (opt.class && node.classNames.indexOf(opt.class) === -1)
                        return false;
                    if (opt.tag && node.tagName !== opt.tag.toUpperCase())
                        return false;
                    return true;
                }
        }
    }
    htmlutil.check = check;
    function checks(node, opt, ...opts) {
        if (!check(node, opt))
            return null;
        return follow(node, ...opts);
    }
    htmlutil.checks = checks;
    function tableToObject(table) {
        const out = [];
        const keys = [];
        for (const row of htmlutil.childrenFilter(table, 'tr')) {
            let i = 0;
            const obj = {};
            let isCell = false;
            for (const cell of htmlutil.childrenFilter(row, ['td', 'th'])) {
                if (cell.tagName === 'TH') {
                    keys[i] = cell.innerText.replace(/ /g, '');
                }
                else {
                    if (cell.childNodes.length !== 0) {
                        const column = obj[keys[i]] = { text: cell.childNodes[0].innerText };
                        isCell = true;
                        const searcher = new HtmlSearcher(cell);
                        try {
                            column.table = htmlutil.tableToObject(searcher.search('table'));
                        }
                        catch (err) {
                            if (err !== HtmlSearcher.EOF)
                                throw err;
                        }
                    }
                }
                i++;
            }
            if (isCell) {
                out.push(obj);
            }
        }
        return out;
    }
    htmlutil.tableToObject = tableToObject;
    function wgetText(url) {
        return new Promise((resolve, reject) => {
            https.get(url, res => {
                let text = '';
                res.on('data', data => {
                    text += data.toString();
                });
                res.on('end', () => {
                    resolve(text);
                });
                res.on('error', reject);
            }).on('error', reject);
        });
    }
    htmlutil.wgetText = wgetText;
    async function wgetElement(url, ...followFilter) {
        const out = node_html_parser_1.parse(await wgetText(url));
        return follow(out, ...followFilter);
    }
    htmlutil.wgetElement = wgetElement;
})(htmlutil = exports.htmlutil || (exports.htmlutil = {}));
class HtmlSearcher {
    constructor(base) {
        this.base = base;
        this.index = -1;
        this.rules = [];
        this.queue = [];
    }
    current() {
        return this.base.childNodes[this.index];
    }
    nextIf(filter) {
        const oldidx = this.index;
        const element = this.next();
        if (!htmlutil.check(element, filter)) {
            this.index = oldidx;
            return null;
        }
        return element;
    }
    next() {
        for (;;) {
            const node = this.base.childNodes[++this.index];
            if (!node)
                throw HtmlSearcher.EOF;
            if (node.nodeType !== node_html_parser_1.NodeType.ELEMENT_NODE)
                continue;
            const element = node;
            for (let i = this.rules.length - 1; i >= 0; i--) {
                const rule = this.rules[i];
                if (htmlutil.check(element, rule.filter))
                    throw rule;
            }
            return element;
        }
    }
    search(filter) {
        for (;;) {
            const node = this.next();
            if (htmlutil.check(node, filter))
                return node;
        }
    }
    searchTableAsObject() {
        return htmlutil.tableToObject(this.search('table'));
    }
    async each(name, filter, wrap) {
        let count = 0;
        for (;;) {
            try {
                this.search(filter);
            }
            catch (err) {
                if (count === 0)
                    console.error(` └ no ${name}`);
                throw err;
            }
            const rule = new HtmlRule(filter);
            this.rules.push(rule);
            for (;;) {
                try {
                    count++;
                    await wrap(this.current());
                    break;
                }
                catch (err) {
                    if (err instanceof HtmlRule) {
                        if (rule === err)
                            continue;
                        this.rules.pop();
                    }
                    throw err;
                }
                finally {
                    for (const final of rule.finally) {
                        await final();
                    }
                    rule.finally.length = 0;
                }
            }
            this.rules.pop();
        }
    }
    minecraftDocHeader(name, headerTag, inner) {
        return this.each(name, node => htmlutil.checks(node, { tag: headerTag, class: 'anchored-heading' }, { tag: 'span' }), async (node) => {
            const id = htmlutil.follow(node, 'span').id;
            await inner(node, id);
        });
    }
    async inside(target, fn) {
        this.enter(target);
        try {
            await fn();
        }
        catch (err) {
            if (err === HtmlSearcher.EOF)
                return;
            throw err;
        }
        this.leave();
    }
    onexit(final) {
        const last = this.rules[this.rules.length - 1];
        last.finally.push(final);
    }
    enter(target) {
        this.queue.push([this.base, this.index]);
        this.base = target;
        this.index = -1;
    }
    leave() {
        const last = this.queue.pop();
        if (!last)
            throw Error('Out of bounds');
        this.base = last[0];
        this.index = last[1];
    }
}
exports.HtmlSearcher = HtmlSearcher;
HtmlSearcher.EOF = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodG1sdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBNkU7QUFDN0UsK0JBQWdDO0FBRWhDLE1BQWEsUUFBUTtJQUNqQixZQUE0QixNQUF1QjtRQUF2QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUVuQyxZQUFPLEdBQWdDLEVBQUUsQ0FBQztJQUQxRCxDQUFDO0NBRUo7QUFKRCw0QkFJQztBQUVELElBQWlCLFFBQVEsQ0F1SnhCO0FBdkpELFdBQWlCLFFBQVE7SUFHckIsUUFBZ0IsQ0FBQyxDQUFBLFFBQVEsQ0FBQyxJQUFnQjtRQUN0QyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLDJCQUFRLENBQUMsWUFBWSxFQUFFO2dCQUMxQyxNQUFNLEtBQW9CLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFOZ0IsaUJBQVEsV0FNeEIsQ0FBQTtJQUNELFNBQWdCLFVBQVUsQ0FBQyxJQUFnQjtRQUN2QyxLQUFLLE1BQU0sS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFMZSxtQkFBVSxhQUt6QixDQUFBO0lBQ0QsUUFBZ0IsQ0FBQyxDQUFBLGNBQWMsQ0FBQyxJQUFnQixFQUFFLElBQVc7UUFDekQsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ1IsS0FBSyxNQUFNLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDdkIsTUFBTSxLQUFLLENBQUM7YUFDZjtZQUNELENBQUMsRUFBRSxDQUFDO1NBQ1A7SUFDTCxDQUFDO0lBUmdCLHVCQUFj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