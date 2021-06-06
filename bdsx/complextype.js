"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPointer = exports.NativeFunctionType = exports.NativeTemplateClass = exports.OverloadedFunction = void 0;
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
class OverloadedEntry {
    constructor(thisType, args, func) {
        this.thisType = thisType;
        this.args = args;
        this.func = func;
    }
    check(thisv, args) {
        if (this.thisType !== null) {
            if (!this.thisType.isTypeOf(thisv))
                return false;
        }
        for (let i = 0; i < args.length; i++) {
            if (this.args[i].isTypeOf(args[i]))
                return false;
        }
        return true;
    }
}
var OverloadedFunction;
(function (OverloadedFunction) {
    function make() {
        const overloads = [];
        const tfunc = function (...args) {
            for (const entry of overloads) {
                if (!entry.check(this, args))
                    continue;
                return entry.func.apply(this, args);
            }
            throw Error(`template function not found`);
        };
        tfunc.overload = function (fn, opts = {}, ...args) {
            overloads.push(new OverloadedEntry(opts.this || null, args, fn));
            return this;
        };
        return tfunc;
    }
    OverloadedFunction.make = make;
})(OverloadedFunction = exports.OverloadedFunction || (exports.OverloadedFunction = {}));
class NativeTemplateClass extends nativeclass_1.NativeClass {
    static make(...items) {
        class SpecializedTemplateClass extends this {
        }
        Object.defineProperty(SpecializedTemplateClass, 'name', { value: `${this.name}<${items.map(item => item.name || item.toString()).join(',')}>` });
        return SpecializedTemplateClass;
    }
}
exports.NativeTemplateClass = NativeTemplateClass;
class NativeFunctionType extends nativeclass_1.NativeClass {
    constructor() {
        super(...arguments);
        this.func = null;
    }
    call(...args) {
        if (this.func === null) {
            console.log(`NativeFunctionType.call has potential for memory leaks.`);
            console.log(`a function(${this}) is allocated.`);
            this.func = makefunc_1.makefunc.js(this, this.returnType, this.options, ...this.parameterTypes);
        }
        return this.func(...args);
    }
    static make(returnType, opts, ...params) {
        class NativeFunctionTypeImpl extends NativeFunctionType {
        }
        NativeFunctionTypeImpl.prototype.parameterTypes = params;
        NativeFunctionTypeImpl.prototype.returnType = returnType;
        NativeFunctionTypeImpl.prototype.options = opts || null;
        return NativeFunctionTypeImpl;
    }
}
exports.NativeFunctionType = NativeFunctionType;
class MemberPointer extends core_1.VoidPointer {
    static make(base, type) {
        class MemberPointerImpl extends MemberPointer {
        }
        MemberPointerImpl.prototype.base = base;
        MemberPointerImpl.prototype.type = type;
        return MemberPointerImpl;
    }
}
exports.MemberPointer = MemberPointer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxleHR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wbGV4dHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBNkQ7QUFDN0QseUNBQXdGO0FBQ3hGLCtDQUE2RDtBQVM3RCxNQUFNLGVBQWU7SUFDakIsWUFDb0IsUUFBdUIsRUFDdkIsSUFBZ0IsRUFDaEIsSUFBeUI7UUFGekIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQXFCO0lBRTdDLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBYSxFQUFFLElBQWM7UUFDL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3BEO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7U0FDcEQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFFRCxJQUFpQixrQkFBa0IsQ0FnQmxDO0FBaEJELFdBQWlCLGtCQUFrQjtJQUMvQixTQUFnQixJQUFJO1FBQ2hCLE1BQU0sU0FBUyxHQUFxQixFQUFFLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsVUFBdUIsR0FBRyxJQUFVO1lBQzlDLEtBQUssTUFBTSxLQUFLLElBQUksU0FBUyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO29CQUFF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