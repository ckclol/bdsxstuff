"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exehacker = void 0;
const assembler_1 = require("./assembler");
const proc_1 = require("./bds/proc");
/**
 * @deprecated use procHacker instead
 */
var exehacker;
(function (exehacker) {
    /**
     * @deprecated use procHacker.nopping instead
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    function nopping(subject, key, offset, originalCode, ignoreArea) {
        proc_1.procHacker.nopping(subject, key, offset, originalCode, ignoreArea);
    }
    exehacker.nopping = nopping;
    /**
     * @deprecated use procHacker.hooking or procHacker.hookingRawWithCallOriginal instead
     * @param key target symbol name
     * @param to call address
     */
    function hooking(dummy, key, to, ignore, ignore2) {
        proc_1.procHacker.hookingRawWithCallOriginal(key, to, [assembler_1.Register.rcx, assembler_1.Register.rdx, assembler_1.Register.r8, assembler_1.Register.r9], []);
    }
    exehacker.hooking = hooking;
    /**
     * @deprecated use procHacker.patching instead
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param newCode call address
     * @param tempRegister using register to call
     * @param call true - call, false - jump
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    function patching(subject, key, offset, newCode, tempRegister, call, originalCode, ignoreArea) {
        proc_1.procHacker.patching(subject, key, offset, newCode, tempRegister, call, originalCode, ignoreArea);
    }
    exehacker.patching = patching;
    /**
     * @deprecated use procHacker.jumping instead
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param jumpTo jump address
     * @param tempRegister using register to jump
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    function jumping(subject, key, offset, jumpTo, tempRegister, originalCode, ignoreArea) {
        proc_1.procHacker.jumping(subject, key, offset, jumpTo, tempRegister, originalCode, ignoreArea);
    }
    exehacker.jumping = jumping;
    /**
     * @deprecated use procHacker.write instead
     */
    function write(key, offset, asm) {
        proc_1.procHacker.write(key, offset, asm);
    }
    exehacker.write = write;
})(exehacker = exports.exehacker || (exports.exehacker = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlaGFja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhlaGFja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUFxRDtBQUNyRCxxQ0FBOEM7QUFJOUM7O0dBRUc7QUFDSCxJQUFpQixTQUFTLENBMER6QjtBQTFERCxXQUFpQixTQUFTO0lBRXRCOzs7Ozs7O09BT0c7SUFDSCxTQUFnQixPQUFPLENBQUMsT0FBYyxFQUFFLEdBQXFCLEVBQUUsTUFBYSxFQUFFLFlBQXFCLEVBQUUsVUFBbUI7UUFDcEgsaUJBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFGZSxpQkFBTyxVQUV0QixDQUFBO0lBRUQ7Ozs7T0FJRztJQUNILFNBQWdCLE9BQU8sQ0FBQyxLQUFZLEVBQUUsR0FBcUIsRUFBRSxFQUFlLEVBQUUsTUFBZSxFQUFFLE9BQWdCO1FBQzNHLGlCQUFVLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLG9CQUFRLENBQUMsR0FBRyxFQUFFLG9CQUFRLENBQUMsRUFBRSxFQUFFLG9CQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUZlLGlCQUFPLFVBRXRCLENBQUE7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBZ0IsUUFBUSxDQUFDLE9BQWMsRUFBRSxHQUFxQixFQUFFLE1BQWEsRUFBRSxPQUFtQixFQUFFLFlBQXFCLEVBQUUsSUFBWSxFQUFFLFlBQXFCLEVBQUUsVUFBbUI7UUFDL0ssaUJBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFGZSxrQkFBUSxXQUV2QixDQUFBO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsU0FBZ0IsT0FBTyxDQUFDLE9BQWMsRUFBRSxHQUFxQixFQUFFLE1BQWEsRUFBRSxNQUFrQixFQUFFLFlBQXFCLEVBQUUsWUFBcUIsRUFBRSxVQUFtQjtRQUMvSixpQkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRmUsaUJBQU8sVUFFdEIsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsU0FBZ0IsS0FBSyxDQUFDLEdBQWMsRUFBRSxNQUFhLEVBQUUsR0FBZ0I7UUFDakUsaUJBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRmUsZUFBSyxRQUVwQixDQUFBO0FBQ0wsQ0FBQyxFQTFEZ0IsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUEwRHpCIn0=