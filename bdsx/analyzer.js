"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzer = void 0;
const core_1 = require("./core");
let analyzeMap;
let symbols = null;
var analyzer;
(function (analyzer) {
    function loadMap() {
        if (analyzeMap)
            return;
        analyzeMap = new Map();
        if (symbols === null) {
            symbols = core_1.pdb.getAll();
        }
        for (const name in symbols) {
            analyzeMap.set(symbols[name] + '', name);
        }
    }
    analyzer.loadMap = loadMap;
    function analyze(ptr, count = 32) {
        const nptr = ptr.add();
        loadMap();
        console.log(`[analyze: ${nptr}]`);
        try {
            for (let i = 0; i < count; i++) {
                let offset = (i * 8).toString(16);
                offset = '0'.repeat(Math.max(3 - offset.length, 0)) + offset;
                const addr = nptr.readPointer();
                const addrstr = addr + '';
                const addrname = analyzeMap.get(addrstr);
                if (addrname) {
                    console.log(`${offset}: ${addrname}(${addrstr})`);
                    continue;
                }
                try {
                    const addr2 = addr.getPointer();
                    const addr2str = addr2 + '';
                    const addr2name = analyzeMap.get(addr2str);
                    if (addr2name) {
                        console.log(`${offset}: ${addrstr}: ${addr2name}(${addr2str})`);
                    }
                    else {
                        console.log(`${offset}: ${addrstr}: ${addr2str}`);
                    }
                }
                catch (err) {
                    const nums = [];
                    for (let i = 0; i < addrstr.length; i += 2) {
                        nums.push(parseInt(addrstr.substr(i, 2), 16));
                    }
                    if (nums.every(n => n < 0x7f)) {
                        nums.reverse();
                        const text = String.fromCharCode(...nums.map(n => n < 0x20 ? 0x20 : n));
                        console.log(`${offset}: ${addrstr} ${text}`);
                    }
                    else {
                        console.log(`${offset}: ${addrstr}`);
                    }
                }
            }
        }
        catch (err) {
            console.log('[VA]');
        }
    }
    analyzer.analyze = analyze;
})(analyzer = exports.analyzer || (exports.analyzer = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmFseXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBeUQ7QUFFekQsSUFBSSxVQUF3QyxDQUFDO0FBQzdDLElBQUksT0FBTyxHQUFzQyxJQUFJLENBQUM7QUFFdEQsSUFBaUIsUUFBUSxDQTJEeEI7QUEzREQsV0FBaUIsUUFBUTtJQUVyQixTQUFnQixPQUFPO1FBQ25CLElBQUksVUFBVTtZQUFFLE9BQU87UUFDdkIsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3ZDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNsQixPQUFPLEdBQUcsVUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCO1FBRUQsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPLEVBQUU7WUFDeEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQVZlLGdCQUFPLFVBVXRCLENBQUE7SUFFRCxTQUFnQixPQUFPLENBQUMsR0FBZSxFQUFFLFFBQWEsRUFBRTtRQUNwRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQ0EsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUUzRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBQyxFQUFFLENBQUM7Z0JBRXhCLE1BQU0sUUFBUSxHQUFHLFVBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLElBQUksUUFBUSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7b0JBQ2xELFNBQVM7aUJBQ1o7Z0JBRUQsSUFBSTtvQkFDQSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2hDLE1BQU0sUUFBUSxHQUFHLEtBQUssR0FBQyxFQUFFLENBQUM7b0JBQzFCLE1BQU0sU0FBUyxHQUFHLFVBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzVDLElBQUksU0FBUyxFQUFFO3dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEtBQUssT0FBTyxLQUFLLFNBQVMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO3FCQUNuRTt5QkFBTTt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxLQUFLLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3FCQUNyRDtpQkFDSjtnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDVixNQUFNLElBQUksR0FBWSxFQUFFLENBQUM7b0JBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBRyxDQUFDLEVBQUU7d0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ2pEO29CQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxLQUFLLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRDt5QkFBTTt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUM7cUJBQ3hDO2lCQUNKO2FBQ0o7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUE1Q2UsZ0JBQU8sVUE0Q3RCLENBQUE7QUFDTCxDQUFDLEVBM0RnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQTJEeEIifQ==