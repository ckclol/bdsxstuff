"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionReqeust = exports.ConnectionRequest = exports.Certificate = exports.JsonValue = exports.JsonValueType = void 0;
const tslib_1 = require("tslib");
const common_1 = require("bdsx/common");
const cxxvector_1 = require("bdsx/cxxvector");
const makefunc_1 = require("bdsx/makefunc");
const mce_1 = require("bdsx/mce");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const proc_1 = require("./proc");
var JsonValueType;
(function (JsonValueType) {
    JsonValueType[JsonValueType["Null"] = 0] = "Null";
    JsonValueType[JsonValueType["Int32"] = 1] = "Int32";
    JsonValueType[JsonValueType["Int64"] = 2] = "Int64";
    JsonValueType[JsonValueType["Float64"] = 3] = "Float64";
    JsonValueType[JsonValueType["String"] = 4] = "String";
    JsonValueType[JsonValueType["Boolean"] = 5] = "Boolean";
    JsonValueType[JsonValueType["Array"] = 6] = "Array";
    JsonValueType[JsonValueType["Object"] = 7] = "Object";
})(JsonValueType = exports.JsonValueType || (exports.JsonValueType = {}));
let JsonValue = class JsonValue extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.type = JsonValueType.Null;
    }
    [nativetype_1.NativeType.dtor]() {
        common_1.abstract();
    }
    size() {
        common_1.abstract();
    }
    isMember(name) {
        common_1.abstract();
    }
    get(key) {
        if (typeof key === 'number') {
            if ((key | 0) === key) {
                return jsonValueGetByInt(this, key);
            }
            key = key + '';
        }
        return jsonValueGetByString(this, key);
    }
    getMemberNames() {
        const members = jsonValueGetMemberNames.call(this);
        const array = members.toArray();
        members.dispose();
        return array;
    }
    value() {
        const type = this.type;
        switch (type) {
            case JsonValueType.Null:
                return null;
            case JsonValueType.Int32:
                return this.getInt32();
            case JsonValueType.Int64:
                return this.getInt64AsFloat();
            case JsonValueType.Float64:
                return this.getFloat64();
            case JsonValueType.String: {
                const ptr = this.getNullablePointer();
                return ptr === null ? '' : ptr.getString();
            }
            case JsonValueType.Boolean:
                return this.getBoolean();
            case JsonValueType.Array: {
                const out = [];
                const n = this.size();
                for (let i = 0; i < n; i++) {
                    out[i] = this.get(i).value();
                }
                return out;
            }
            case JsonValueType.Object: {
                const out = {};
                for (const key of this.getMemberNames()) {
                    out[key] = this.get(key).value();
                }
                return out;
            }
            default:
                throw Error(`unexpected type: ${type}`);
        }
    }
    valueOf() {
        return +this.value();
    }
    toString() {
        return this.value() + '';
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativetype_1.uint8_t, 8)
], JsonValue.prototype, "type", void 0);
JsonValue = tslib_1.__decorate([
    nativeclass_1.nativeClass(0x10)
], JsonValue);
exports.JsonValue = JsonValue;
const jsonValueGetByInt = makefunc_1.makefunc.js(proc_1.proc2['??AValue@Json@@QEAAAEAV01@H@Z'], JsonValue, null, JsonValue, nativetype_1.int32_t);
const jsonValueGetByString = makefunc_1.makefunc.js(proc_1.proc2['??AValue@Json@@QEAAAEAV01@PEBD@Z'], JsonValue, null, JsonValue, makefunc_1.makefunc.Utf8);
const jsonValueGetMemberNames = makefunc_1.makefunc.js(proc_1.proc['Json::Value::getMemberNames'], cxxvector_1.CxxVector.make(nativetype_1.CxxString), { this: JsonValue, structureReturn: true });
JsonValue.prototype.isMember = makefunc_1.makefunc.js(proc_1.proc['Json::Value::isMember'], nativetype_1.bool_t, { this: JsonValue }, makefunc_1.makefunc.Utf8);
JsonValue.prototype.size = makefunc_1.makefunc.js(proc_1.proc['Json::Value::size'], nativetype_1.int32_t, { this: JsonValue });
JsonValue.prototype[nativetype_1.NativeType.dtor] = makefunc_1.makefunc.js(proc_1.proc['Json::Value::~Value'], nativetype_1.void_t, { this: JsonValue });
let Certificate = class Certificate extends nativeclass_1.NativeClass {
    getXuid() {
        common_1.abstract();
    }
    /**
     * alias of getIdentityName
     */
    getId() {
        return this.getIdentityName();
    }
    getIdentityName() {
        common_1.abstract();
    }
    getIdentity() {
        common_1.abstract();
    }
    getIdentityString() {
        return mce_1.mce.UUID.toString(this.getIdentity());
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(JsonValue, 0x50)
], Certificate.prototype, "json", void 0);
Certificate = tslib_1.__decorate([
    nativeclass_1.nativeClass(null)
], Certificate);
exports.Certificate = Certificate;
class ConnectionRequest extends nativeclass_1.NativeClass {
    getJson() {
        const ptr = this.something;
        if (ptr === null)
            return null;
        return ptr.json;
    }
    getJsonValue() {
        var _a;
        return (_a = this.getJson()) === null || _a === void 0 ? void 0 : _a.value();
    }
    getDeviceId() {
        const json = this.getJson();
        if (json === null)
            throw Error('Json object not found in ConnectionRequest');
        return json.get('DeviceId').toString();
    }
    getDeviceOS() {
        const json = this.getJson();
        if (json === null)
            throw Error('Json object not found in ConnectionRequest');
        return +json.get('DeviceOS');
    }
}
exports.ConnectionRequest = ConnectionRequest;
/**
 * @deprecated typo!
 */
exports.ConnectionReqeust = ConnectionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubnJlcS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5yZXEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHdDQUF1QztBQUN2Qyw4Q0FBMkM7QUFDM0MsNENBQXlDO0FBQ3pDLGtDQUErQjtBQUMvQixrREFBeUU7QUFDekUsZ0RBQTBGO0FBQzFGLGlDQUFxQztBQUVyQyxJQUFZLGFBVVg7QUFWRCxXQUFZLGFBQWE7SUFFckIsaURBQVEsQ0FBQTtJQUNSLG1EQUFTLENBQUE7SUFDVCxtREFBUyxDQUFBO0lBQ1QsdURBQVcsQ0FBQTtJQUNYLHFEQUFVLENBQUE7SUFDVix1REFBVyxDQUFBO0lBQ1gsbURBQVMsQ0FBQTtJQUNULHFEQUFVLENBQUE7QUFDZCxDQUFDLEVBVlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFVeEI7QUFHRCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEseUJBQVc7SUFJdEMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0QsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUNiLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJO1FBQ0EsaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXO1FBQ2hCLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBaUI7UUFDakIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ2pCLE9BQU8saUJBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsR0FBRyxHQUFHLEdBQUcsR0FBQyxFQUFFLENBQUM7U0FDaEI7UUFDRCxPQUFPLG9C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