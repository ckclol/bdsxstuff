"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
const singleton = Symbol();
class Singleton extends WeakMap {
    newInstance(param, allocator) {
        let instance = this.get(param);
        if (instance)
            return instance;
        instance = allocator();
        return instance;
    }
    static newInstance(base, param, mapper) {
        let map = base[singleton];
        if (map === undefined)
            base[singleton] = map = new Singleton;
        return map.newInstance(param, mapper);
    }
}
exports.Singleton = Singleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xldG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2xldG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLE1BQU0sU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBRTNCLE1BQWEsU0FBYSxTQUFRLE9BQWU7SUFDN0MsV0FBVyxDQUFJLEtBQU8sRUFBRSxTQUFlO1FBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDOUIsUUFBUSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFJLElBQWdELEVBQUUsS0FBYSxFQUFFLE1BQVk7UUFDL0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQzdELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBYkQsOEJBYUMifQ==