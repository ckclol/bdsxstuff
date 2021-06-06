"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
const colors = require("colors");
let passed = 0;
let skipped = 0;
let testnum = 1;
let testcount = 0;
class Tester {
    constructor() {
        this.subject = '';
        this.errored = false;
        this.done = false;
        this.skipped = false;
    }
    log(message) {
        console.log(`[test/${this.subject}] ${message}`);
    }
    _error(message, errorpos) {
        console.error(colors.red(`[test/${this.subject}] failed. ${message}`));
        console.error(colors.red(errorpos));
        if (!this.errored) {
            if (this.done) {
                if (this.skipped)
                    skipped--;
                else
                    passed--;
                console.error(colors.red(`[test] FAILED (${passed}/${testcount})`));
            }
            this.errored = true;
            this.skipped = false;
            Tester.errored = true;
        }
    }
    error(message, stackidx = 2) {
        const stack = Error().stack;
        this._error(message, source_map_support_1.remapStackLine(util_1.getLineAt(stack, stackidx)).stackLine);
    }
    processError(err) {
        const stack = (source_map_support_1.remapError(err).stack || '').split('\n');
        this._error(err.message, stack[1]);
        console.error(stack.slice(2).join('\n'));
    }
    fail() {
        this.error('', 3);
    }
    assert(cond, message) {
        if (!cond)
            this.error(message, 3);
    }
    equals(actual, expected, message = '', toString = v => v + '') {
        if (actual !== expected) {
            if (message !== '')
                message = ', ' + message;
            this.error(`Expected: ${toString(expected)}, Actual: ${toString(actual)}${message}`, 3);
        }
    }
    skip(message) {
        this.skipped = true;
        this.log(message);
    }
    static async test(tests) {
        await new Promise(resolve => setTimeout(resolve, 100)); // run after examples
        // pass one tick, wait until result of the list command example
        {
            const system = server.registerSystem(0, 0);
            await new Promise(resolve => {
                system.update = () => {
                    resolve();
                    system.update = undefined;
                };
            });
        }
        console.log(`[test] node version: ${process.versions.node}`);
        console.log(`[test] engine version: ${process.jsEngine}@${process.versions[process.jsEngine]}`);
        const testlist = Object.entries(tests);
        testcount += testlist.length;
        for (const [subject, test] of testlist) {
            const tester = new Tester;
            try {
                console.log(`[test] (${testnum++}/${testcount}) ${subject}`);
                tester.subject = subject;
                tester.errored = false;
                await test.call(tester);
                if (tester.skipped)
                    skipped++;
                else if (!tester.errored)
                    passed++;
                tester.done = true;
            }
            catch (err) {
                tester.processError(err);
            }
        }
        if (skipped !== 0) {
            console.error(colors.yellow(`[test] SKIPPED (${skipped}/${testcount})`));
            testcount -= skipped;
        }
        if (passed !== testcount) {
            console.error(colors.red(`[test] FAILED (${passed}/${testcount})`));
        }
        else {
            console.log(`[test] PASSED (${passed}/${testcount})`);
        }
    }
}
exports.Tester = Tester;
Tester.errored = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUFrRTtBQUNsRSxpQ0FBbUM7QUFDbkMsaUNBQWtDO0FBRWxDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNmLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDaEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBRWxCLE1BQWEsTUFBTTtJQUFuQjtRQUNJLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBb0dwQixDQUFDO0lBaEdHLEdBQUcsQ0FBQyxPQUFjO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQWMsRUFBRSxRQUFlO1FBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNYLElBQUksSUFBSSxDQUFDLE9BQU87b0JBQUUsT0FBTyxFQUFFLENBQUM7O29CQUN2QixNQUFNLEVBQUUsQ0FBQztnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLE1BQU0sSUFBSSxTQUFTLEdBQUcsQ0FB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