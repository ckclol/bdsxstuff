"use strict";
/**
 * util for managing the async tasks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcurrencyQueue = void 0;
const os = require("os");
const EMPTY = Symbol();
const cpuCount = os.cpus().length;
const concurrencyCount = Math.min(Math.max(cpuCount * 2, 8), cpuCount);
class ConcurrencyQueue {
    constructor(concurrency = concurrencyCount) {
        this.concurrency = concurrency;
        this.reserved = [];
        this.endResolve = null;
        this.endReject = null;
        this.endPromise = null;
        this.idleResolve = null;
        this.idleReject = null;
        this.idlePromise = null;
        this._ref = 0;
        this._error = EMPTY;
        this.verbose = false;
        this._next = () => {
            if (this.verbose)
                console.log(`Task - ${'*'.repeat(this.getTaskCount())}`);
            if (this.reserved.length === 0) {
                if (this.idles === 0 && this.idleResolve !== null) {
                    this.idleResolve();
                    this.idleResolve = null;
                    this.idleReject = null;
                    this.idlePromise = null;
                }
                this.idles++;
                this._fireEnd();
                return;
            }
            const task = this.reserved.shift();
            return task().then(this._next, err => this.error(err));
        };
        this.idles = this.concurrency;
    }
    _fireEnd() {
        if (this._ref === 0 && this.idles === this.concurrency) {
            if (this.verbose)
                console.log('Task - End');
            if (this.endResolve !== null) {
                this.endResolve();
                this.endResolve = null;
                this.endReject = null;
                this.endPromise = null;
            }
        }
    }
    error(err) {
        this._error = err;
        if (this.endReject !== null) {
            this.endReject(err);
            this.endResolve = null;
            this.endReject = null;
        }
        if (this.idleReject !== null) {
            this.idleReject(err);
            this.idleResolve = null;
            this.idleReject = null;
        }
        this.idlePromise = this.endPromise = Promise.reject(this._error);
    }
    ref() {
        this._ref++;
    }
    unref() {
        this._ref--;
        this._fireEnd();
    }
    onceHasIdle() {
        if (this.idlePromise !== null)
            return this.idlePromise;
        if (this.idles !== 0)
            return Promise.resolve();
        return this.idlePromise = new Promise((resolve, reject) => {
            this.idleResolve = resolve;
            this.idleReject = reject;
        });
    }
    onceEnd() {
        if (this.endPromise !== null)
            return this.endPromise;
        if (this.idles === this.concurrency)
            return Promise.resolve();
        return this.endPromise = new Promise((resolve, reject) => {
            this.endResolve = resolve;
            this.endReject = reject;
        });
    }
    run(task) {
        this.reserved.push(task);
        if (this.idles === 0) {
            if (this.verbose)
                console.log(`Task - ${'*'.repeat(this.getTaskCount())}`);
            if (this.reserved.length > (this.concurrency >> 1)) {
                if (this.verbose)
                    console.log('Task - Drain');
                return this.onceHasIdle();
            }
            return Promise.resolve();
        }
        this.idles--;
        this._next();
        return Promise.resolve();
    }
    getTaskCount() {
        return this.reserved.length + this.concurrency - this.idles;
    }
}
exports.ConcurrencyQueue = ConcurrencyQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25jdXJyZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUVILHlCQUEwQjtBQUUxQixNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUV2QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFckUsTUFBYSxnQkFBZ0I7SUFhekIsWUFBNkIsY0FBYyxnQkFBZ0I7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBWDFDLGFBQVEsR0FBeUIsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQ2xDLGNBQVMsR0FBMEIsSUFBSSxDQUFDO1FBQ3hDLGVBQVUsR0FBc0IsSUFBSSxDQUFDO1FBQ3JDLGdCQUFXLEdBQW1CLElBQUksQ0FBQztRQUNuQyxlQUFVLEdBQTBCLElBQUksQ0FBQztRQUN6QyxnQkFBVyxHQUFzQixJQUFJLENBQUM7UUFDdEMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFdBQU0sR0FBTyxLQUFLLENBQUM7UUFDcEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQU1OLFVBQUssR0FBNEIsR0FBRSxFQUFFO1lBQ2xELElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUss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