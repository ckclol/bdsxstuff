"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const blessed = require("blessed");
const fs = require("fs");
const SELECTABLE_ITEM_STYLE = {
    fg: 'magenta',
    selected: {
        bg: 'blue'
    }
};
function exec(command) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, {
            encoding: 'utf-8'
        }, (err, output) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(output);
            }
        });
    });
}
function execWithoutError(command) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, {
            encoding: 'utf-8'
        }, (err, output) => {
            resolve(output);
        });
    });
}
class PackageInfo {
    constructor(info, deps) {
        this.versions = null;
        this.name = info.name;
        this.desc = info.description || '';
        this.author = info.publisher.username;
        this.date = info.date;
        this.version = info.version;
        const installedInfo = deps && deps[this.name];
        this.installed = installedInfo && installedInfo.version || '';
    }
    async getVersions() {
        if (this.versions !== null)
            return this.versions;
        const versions = await exec(`npm view "${this.name}" versions --json`);
        return this.versions = JSON.parse(versions.replace(/'/g, '"'));
    }
    static async search(name, deps) {
        const output = await execWithoutError(`npm search --json "${name}"`);
        const result = JSON.parse(output);
        return result.map(item => new PackageInfo(item, deps));
    }
    toMenuString() {
        const author = this.author;
        const MAX_LEN = 18;
        return [this.installed || 'No', this.name, this.desc, author.length > MAX_LEN ? `${author.substr(0, MAX_LEN - 3)}...` : author, this.date];
    }
    toString() {
        return JSON.stringify(this);
    }
}
let screen = null;
function loadingWrap(text, prom) {
    if (screen === null)
        throw Error('blessed.screen not found');
    const loading = blessed.loading({
        border: 'line',
        top: 3,
        width: '100%-1'
    });
    screen.append(loading);
    loading.load(text);
    screen.render();
    return prom.then(v => {
        loading.stop();
        loading.destroy();
        return v;
    }, err => {
        loading.stop();
        loading.destroy();
        throw err;
    });
}
let latestSelected = 0;
let latestSearched = '';
function searchAndSelect(prefix, deps) {
    return new Promise(resolve => {
        if (screen === null)
            throw Error('blessed.screen not found');
        const scr = screen;
        const search = blessed.textbox({
            border: 'line',
            keys: true,
            mouse: true,
            width: '100%-1',
            height: 3,
            style: {
                fg: 'blue',
                focus: {
                    fg: 'white'
                }
            },
        });
        const table = blessed.listtable({
            border: 'line',
            keys: true,
            mouse: true,
            style: {
                header: {
                    fg: 'blue',
                    bold: true
                },
                cell: SELECTABLE_ITEM_STYLE
            },
            top: 3,
            scrollable: true,
            width: '100%-1',
            height: '100%-3',
            align: 'left',
        });
        let packages = [];
        let preparing = true;
        table.on('select item', (item, index) => {
            if (preparing)
                return;
            setTimeout(() => {
                latestSelected = index;
            }, 0);
        });
        table.on('select', (item, index) => {
            const plugin = packages[index - 1];
            if (!plugin)
                return;
            table.destroy();
            search.destroy();
            resolve(plugin);
        });
        table.key('up', () => {
            if (latestSelected === 1) {
                processInput();
            }
        });
        search.key('down', () => {
            if (packages.length !== 0) {
                search.cancel();
            }
        });
        search.key('C-c', () => {
            process.exit(0);
        });
        async function searchText(name) {
            if (name === '') {
                table.setData([['Please enter the plugin name for searching']]);
                processInput();
                return;
            }
            scr.remove(table);
            packages = await loadingWrap('Searching...', PackageInfo.search(name, deps));
            scr.append(table);
            preparing = false;
            if (packages.length === 0) {
                latestSelected = -1;
                table.setData([['No result']]);
                processInput();
            }
            else {
                table.setData([['Installed', 'Name', 'Description', 'Author', 'Date']].concat(packages.map(item => item.toMenuString())));
                table.select(latestSelected);
                table.focus();
                scr.render();
            }
        }
        function processInput() {
            table.select(-1);
            scr.render();
            search.readInput(async (err, value) => {
                if (value == null) {
                    table.select(1);
                    table.focus();
                    scr.render();
                    return;
                }
                latestSearched = value;
                searchText(prefix + value);
            });
        }
        table.key('escape', processInput);
        scr.append(search);
        search.setValue(latestSearched);
        scr.append(table);
        searchText(prefix + latestSearched);
    });
}
function selectVersion(name, latestVersion, installedVersion, versions) {
    return new Promise(resolve => {
        if (screen === null)
            throw Error('blessed.screen not found');
        const vnames = versions.reverse().map(v => `${name}@${v}`);
        let installed = false;
        for (let i = 0; i < versions.length; i++) {
            let moveToTop = false;
            if (versions[i] === latestVersion) {
                vnames[i] += ' (Latest)';
                moveToTop = true;
            }
            if (versions[i] === installedVersion) {
                vnames[i] += ' (Installed)';
                moveToTop = true;
                installed = true;
            }
            if (moveToTop) {
                vnames.unshift(vnames.splice(i, 1)[0]);
                versions.unshift(versions.splice(i, 1)[0]);
            }
        }
        if (installed) {
            vnames.unshift('Remove');
            versions.unshift('');
        }
        const list = blessed.list({
            items: vnames,
            border: 'line',
            style: SELECTABLE_ITEM_STYLE,
            top: 3,
            scrollable: true,
            width: '100%-1',
            height: '100%-3',
            keys: true,
            mouse: true,
        });
        screen.append(list);
        list.select(0);
        list.focus();
        screen.render();
        list.key('escape', () => {
            list.destroy();
            resolve(null);
        });
        list.on('select', (item, index) => {
            list.destroy();
            resolve(versions[index]);
        });
    });
}
(async () => {
    for (;;) {
        if (screen === null) {
            screen = blessed.screen({
                smartCSR: true
            });
            screen.title = 'BDSX Plugin Manager';
            screen.key(['q', 'C-c'], (ch, key) => process.exit(0));
        }
        const packagejson = JSON.parse(fs.readFileSync('./package-lock.json', 'utf8'));
        const deps = packagejson.dependencies || {};
        const plugin = await searchAndSelect('@bdsx/', deps);
        const topbox = blessed.box({
            border: 'line',
            width: '100%',
            height: 3,
            content: plugin.name,
        });
        screen.append(topbox);
        screen.render();
        const versions = await loadingWrap('Loading...', plugin.getVersions());
        const version = await selectVersion(plugin.name, plugin.version, plugin.installed, versions);
        topbox.destroy();
        if (version === null)
            continue;
        screen.destroy();
        screen = null;
        if (version === '') {
            child_process.execSync(`npm r ${plugin.name}`, { stdio: 'inherit' });
        }
        else {
            child_process.execSync(`npm i ${plugin.name}@${version}`, { stdio: 'inherit' });
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
})().catch(err => console.error(err.stack));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtDQUFnRDtBQUNoRCxtQ0FBb0M7QUFDcEMseUJBQTBCO0FBRTFCLE1BQU0scUJBQXFCLEdBQUc7SUFDMUIsRUFBRSxFQUFFLFNBQVM7SUFDYixRQUFRLEVBQUU7UUFDTixFQUFFLEVBQUUsTUFBTTtLQUNiO0NBQ0osQ0FBQztBQTBCRixTQUFTLElBQUksQ0FBQyxPQUFjO0lBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLEVBQUU7UUFDbEMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDeEIsUUFBUSxFQUFFLE9BQU87U0FDcEIsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsRUFBRTtZQUNkLElBQUksR0FBRyxFQUFFO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBR0QsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFjO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLEVBQUU7UUFDbEMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDeEIsUUFBUSxFQUFFLE9BQU87U0FDcEIsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsRUFBRTtZQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELE1BQU0sV0FBVztJQVViLFlBQVksSUFBcUIsRUFBRSxJQUFzQztRQUZqRSxhQUFRLEdBQWlCLElBQUksQ0FBQztRQUdsQyxJQUFJLENB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