"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllPlugins = exports.loadedPlugins = void 0;
const fs_1 = require("fs");
const path = require("path");
const colors = require("colors");
const child_process = require("child_process");
const source_map_support_1 = require("./source-map-support");
const concurrency_1 = require("./concurrency");
const os = require("os");
class PromCounter {
    constructor() {
        this.resolve = null;
        this.counter = 0;
        this.prom = Promise.resolve();
    }
    ref() {
        if (this.counter === 0) {
            this.prom = new Promise(resolve => {
                this.resolve = resolve;
            });
        }
        this.counter++;
    }
    unref() {
        this.counter--;
        if (this.counter === 0) {
            this.resolve();
            this.resolve = null;
        }
    }
    wait() {
        return this.prom;
    }
}
const BDSX_SCOPE = '@bdsx/';
exports.loadedPlugins = [];
async function loadAllPlugins() {
    let packagejsonModified = false;
    const projpath = path.resolve(process.cwd(), process.argv[1]);
    const pluginspath = `${projpath}${path.sep}plugins`;
    const taskQueue = new concurrency_1.ConcurrencyQueue;
    const loaded = new Set();
    function requestLoad(counter, name, json) {
        if (loaded.has(name))
            return;
        loaded.add(name);
        counter.ref();
        taskQueue.run(async () => {
            try {
                const jsonpath = require.resolve(`${name}/package.json`);
                const json = JSON.parse(await fs_1.promises.readFile(jsonpath, 'utf-8'));
                if (json.bdsxPlugin) {
                    await loadPackageJson(name, json, false);
                }
            }
            catch (err) {
                loaded.delete(name);
                if (json && json.dependencies[name].startsWith('file:./plugins/')) {
                    try {
                        const stat = await fs_1.promises.stat(`${pluginspath}${path.sep}${name.substr(BDSX_SCOPE.length)}`);
                        console.log(stat);
                    }
                    catch (err) {
                        if (err.code === 'ENOENT') {
                            console.error(colors.red(`[BDSX-Plugins] ${name}: removed`));
                            delete json.dependencies[name];
                            packagejsonModified = true;
                            counter.unref();
                            return;
                        }
                    }
                }
                console.error(colors.red(`[BDSX-Plugins] Failed to read '${name}/package.json'`));
            }
            counter.unref();
        });
    }
    async function loadPackageJson(name, json, rootPackage) {
        if (!json) {
            console.error(`[BDSX-Plugins] Invalid ${name}/package.json`);
            return false;
        }
        if (!json.dependencies)
            return true;
        const counter = new PromCounter;
        for (const name in json.dependencies) {
            if (!name.startsWith(BDSX_SCOPE))
                continue;
            requestLoad(counter, name, rootPackage ? json : null);
        }
        await counter.wait();
        return true;
    }
    // read package.json
    const packagejson = `${projpath}${path.sep}package.json`;
    let mainjson;
    try {
        mainjson = JSON.parse(await fs_1.promises.readFile(packagejson, 'utf-8'));
    }
    catch (err) {
        console.error(colors.red(`[BDSX-Plugins] Failed to load`));
        if (err.code === 'ENOENT') {
            console.error(colors.red(`[BDSX-Plugins] 'package.json' not found. Please set the entry point to the directory containing package.json`));
        }
        else {
            console.error(colors.red(`[BDSX-Plugins] Failed to read package.json. ${err.message}`));
        }
        return;
    }
    try {
        // load plugins from package.json
        loadPackageJson('[entrypoint]', mainjson, true);
        await taskQueue.onceEnd();
        // load plugins from the directory
        const plugins = await fs_1.promises.readdir(pluginspath, { withFileTypes: true });
        const newplugins = [];
        for (const info of plugins) {
            if (!info.isDirectory())
                continue;
            const plugin = info.name;
            const fullname = `${BDSX_SCOPE}${plugin}`;
            if (mainjson.dependencies[fullname])
                continue;
            mainjson.dependencies[fullname] = `file:./plugins/${plugin}`;
            packagejsonModified = true;
            newplugins.push(fullname);
            try {
                const json = JSON.parse(await fs_1.promises.readFile(`${pluginspath}${path.sep}${plugin}${path.sep}package.json`, 'utf-8'));
                if (json.name !== fullname) {
                    console.error(colors.red(`[BDSX-Plugins] Wrong plugin name. Name in 'package.json' must be '${fullname}' but was '${json.name}'`));
                    continue;
                }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    console.error(colors.red(`[BDSX-Plugins] 'plugins/${plugin}/package.json' not found. Plugins need 'package.json'`));
                }
                else {
                    console.error(colors.red(`[BDSX-Plugins] Failed to read 'plugins/${plugin}/package.json'. ${err.message}`));
                }
            }
            console.log(colors.green(`[BDSX-Plugins] ${fullname}: added`));
        }
        // apply changes
        if (packagejsonModified) {
            console.error(`[BDSX-Plugins] Apply the package changes`);
            await fs_1.promises.writeFile(packagejson, JSON.stringify(mainjson, null, 2).replace('\n', os.EOL));
            child_process.execSync('npm i', { stdio: 'inherit', cwd: projpath });
            const counter = new PromCounter;
            for (const plugin of newplugins) {
                requestLoad(counter, plugin);
            }
            await counter.wait();
        }
        await taskQueue.onceEnd();
        // import
        if (loaded.size === 0) {
            console.log('[BDSX-Plugins] No Plugins');
        }
        else {
            let index = 0;
            for (const name of loaded) {
                try {
                    exports.loadedPlugins.push(name);
                    console.log(colors.green(`[BDSX-Plugins] Loading ${name} (${++index}/${loaded.size})`));
                    require(name);
                }
                catch (err) {
                    console.error(colors.red(`[BDSX-Plugins] Failed to load ${name}`));
                    console.error(source_map_support_1.remapStack(err.stack));
                }
            }
        }
    }
    catch (err) {
        console.error(colors.red(`[BDSX-Plugins] ${err.message}`));
    }
}
exports.loadAllPlugins = loadAllPlugins;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkJBQW1DO0FBQ25DLDZCQUE4QjtBQUM5QixpQ0FBa0M7QUFDbEMsK0NBQWdEO0FBQ2hELDZEQUFrRDtBQUNsRCwrQ0FBaUQ7QUFDakQseUJBQTBCO0FBRTFCLE1BQU0sV0FBVztJQUFqQjtRQUNZLFlBQU8sR0FBbUIsSUFBSSxDQUFDO1FBQy9CLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixTQUFJLEdBQWlCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQXNCbkQsQ0FBQztJQXBCRyxHQUFHO1FBQ0MsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRyxDQUFDO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDO0FBRWYsUUFBQSxhQUFhLEdBQWEsRUFBRSxDQUFDO0FBRW5DLEtBQUssVUFBVSxjQUFjO0lBQ2hDLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENB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