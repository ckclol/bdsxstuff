"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayMap = void 0;
class ArrayMap {
    constructor() {
        this.map = new Map();
    }
    has(key) {
        const arr = this.map.get(key);
        if (arr == null)
            return false;
        return arr.length !== 0;
    }
    count(key) {
        const arr = this.map.get(key);
        if (arr == null)
            return 0;
        return arr.length;
    }
    push(key, value) {
        const array = this.map.get(key);
        if (array != null)
            array.push(value);
        else
            this.map.set(key, [value]);
    }
    pop(key) {
        const array = this.map.get(key);
        if (array == null)
            return undefined;
        const out = array.pop();
        if (array.length === 0) {
            this.map.delete(key);
        }
        return out;
    }
    delete(key) {
        return this.map.delete(key);
    }
    clear() {
        this.map.clear();
    }
    keys() {
        return this.map.keys();
    }
    values() {
        return this.map.values();
    }
    entires() {
        return this.map.entries();
    }
    [Symbol.iterator]() {
        return this.map.entries();
    }
}
exports.ArrayMap = ArrayMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXltYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcnJheW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxNQUFhLFFBQVE7SUFBckI7UUFDcUIsUUFBRyxHQUFHLElBQUksR0FBRyxFQUFZLENBQUM7SUFxRC9DLENBQUM7SUFuREcsR0FBRyxDQUFDLEdBQU87UUFDUCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQU87UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBTyxFQUFFLEtBQU87UUFDakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFPO1FBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQU87UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQXRERCw0QkFzREMifQ==