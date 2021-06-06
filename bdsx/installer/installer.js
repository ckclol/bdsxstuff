'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs_ori = require("fs");
const unzipper = require("unzipper");
const path = require("path");
const readline = require("readline");
const ProgressBar = require("progress");
const follow_redirects_1 = require("follow-redirects");
const BDSX_CORE_VERSION = require("../version-bdsx.json");
const BDS_VERSION = require("../version-bds.json");
const BDSX_YES = process.env.BDSX_YES;
if (BDSX_YES === 'skip') {
    process.exit(0);
}
const sep = path.sep;
const BDS_LINK = `https://minecraft.azureedge.net/bin-win/bedrock-server-${BDS_VERSION}.zip`;
const BDSX_CORE_LINK = `https://github.com/bdsx/bdsx-core/releases/download/${BDSX_CORE_VERSION}/bdsx-core-${BDSX_CORE_VERSION}.zip`;
let agreeOption = false;
function yesno(question, defaultValue) {
    const yesValues = ['yes', 'y'];
    const noValues = ['no', 'n'];
    return new Promise(resolve => {
        if (BDSX_YES === "false") {
            return resolve(false);
        }
        if (!process.stdin.isTTY || BDSX_YES === "true") {
            return resolve(true);
        }
        if (agreeOption) {
            console.log("Agreed by -y");
            return resolve(true);
        }
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(`${question} `, async (answer) => {
            rl.close();
            const cleaned = answer.trim().toLowerCase();
            if (cleaned === '' && defaultValue !== undefined)
                return resolve(defaultValue);
            if (yesValues.indexOf(cleaned) >= 0)
                return resolve(true);
            if (noValues.indexOf(cleaned) >= 0)
                return resolve(false);
            process.stdout.write('\nInvalid Response.\n');
            process.stdout.write(`Answer either yes : (${yesValues.join(', ')}) \n`);
            process.stdout.write(`Or no: (${noValues.join(', ')}) \n\n`);
            resolve(yesno(question, defaultValue));
        });
    });
}
const fs = {
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs_ori.readFile(path, 'utf-8', (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    },
    writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs_ori.writeFile(path, content, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    },
    readdir(path) {
        return new Promise((resolve, reject) => {
            fs_ori.readdir(path, 'utf-8', (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    },
    mkdir(path) {
        return new Promise((resolve, reject) => {
            fs_ori.mkdir(path, (err) => {
                if (err) {
                    if (err.code === 'EEXIST')
                        resolve();
                    else
                        reject(err);
                }
                else
                    resolve();
            });
        });
    },
    _processMkdirError(dirname, err) {
        if (err.code === 'EEXIST') {
            return true;
        }
        if (err.code === 'ENOENT') {
            throw new Error(`EACCES: permission denied, mkdir '${dirname}'`);
        }
        return false;
    },
    rmdir(path) {
        return new Promise((resolve, reject) => {
            fs_ori.rmdir(path, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    },
    stat(path) {
        return new Promise((resolve, reject) => {
            fs_ori.stat(path, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    },
    unlink(path) {
        return new Promise((resolve, reject) => {
            fs_ori.unlink(path, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    },
    copyFile(from, to) {
        return new Promise((resolve, reject) => {
            const rd = fs_ori.createReadStream(from);
            rd.on("error", reject);
            const wr = fs_ori.createWriteStream(to);
            wr.on("error", reject);
            wr.on("close", () => {
                resolve();
            });
            rd.pipe(wr);
        });
    },
    exists(path) {
        return fs.stat(path).then(() => true, () => false);
    },
    async del(filepath) {
        const stat = await fs.stat(filepath);
        if (stat.isDirectory()) {
            const files = await fs.readdir(filepath);
            for (const file of files) {
                await fs.del(path.join(filepath, file));
            }
            await fs.rmdir(filepath);
        }
        else {
            await fs.unlink(filepath);
        }
    }
};
const KEEPS = new Set([
    `${sep}whitelist.json`,
    `${sep}valid_known_packs.json`,
    `${sep}server.properties`,
    `${sep}permissions.json`,
]);
class MessageError extends Error {
    constructor(msg) {
        super(msg);
    }
}
async function removeInstalled(dest, files) {
    for (let i = files.length - 1; i >= 0; i--) {
        try {
            const file = files[i];
            if (file.endsWith(sep)) {
                await fs.rmdir(path.join(dest, file.substr(0, file.length - 1)));
            }
            else {
                await fs.unlink(path.join(dest, file));
            }
        }
        catch (err) {
        }
    }
}
let installInfo;
const argv = process.argv;
const bdsPath = process.argv[2];
for (let i = 3; i < argv.length; i++) {
    const arg = process.argv[i];
    switch (arg) {
        case '-y':
            agreeOption = true;
            break;
    }
}
const installInfoPath = `${bdsPath}${sep}installinfo.json`;
async function readInstallInfo() {
    try {
        const file = await fs.readFile(installInfoPath);
        installInfo = JSON.parse(file);
        if (!installInfo)
            installInfo = {};
    }
    catch (err) {
        if (err.code !== 'ENOENT')
            throw err;
        installInfo = {};
    }
}
function saveInstallInfo() {
    return fs.writeFile(installInfoPath, JSON.stringify(installInfo, null, 4));
}
class InstallItem {
    constructor(opts) {
        this.opts = opts;
    }
    async _downloadAndUnzip() {
        const url = this.opts.url;
        const dest = path.join(this.opts.targetPath);
        const writedFiles = [];
        const zipfiledir = path.join(__dirname, 'zip');
        try {
            await fs.del(zipfiledir);
        }
        catch (err) { }
        const bar = new ProgressBar(`${this.opts.name}: Install :bar :current/:total`, {
            total: 1,
            width: 20,
        });
        const dirhas = new Set();
        dirhas.add(dest);
        async function mkdirRecursive(dirpath) {
            if (dirhas.has(dirpath))
                return;
            await mkdirRecursive(path.dirname(dirpath));
            await fs.mkdir(dirpath);
        }
        await new Promise((resolve, reject) => {
            follow_redirects_1.https.get(url, (response) => {
                bar.total = +response.headers['content-length'];
                if (response.statusCode !== 200) {
                    reject(new MessageError(`${this.opts.name}: ${response.statusCode} ${response.statusMessage}, Failed to download ${url}`));
                    return;
                }
                response.on('data', (data) => {
                    bar.tick(data.length);
                });
                const zip = response.pipe(unzipper.Parse());
                zip.on('entry', async (entry) => {
                    let filepath = entry.path;
                    if (sep !== '/')
                        filepath = filepath.replace(/\//g, sep);
                    else
                        filepath = filepath.replace(/\\/g, sep);
                    if (!filepath.startsWith(sep)) {
                        filepath = sep + filepath;
                        entry.path = filepath;
                    }
                    else {
                        entry.path = filepath.substr(1);
                    }
                    writedFiles.push(filepath);
                    const extractPath = path.join(dest, entry.path);
                    if (entry.type === 'Directory') {
                        await mkdirRecursive(extractPath);
                        entry.autodrain();
                        return;
                    }
                    if (this.opts.skipExists) {
                        const exists = await fs.exists(path.join(dest, entry.path));
                        if (exists) {
                            entry.autodrain();
                            return;
                        }
                    }
                    await mkdirRecursive(path.dirname(extractPath));
                    entry.pipe(fs_ori.createWriteStream(extractPath)).on('error', reject);
                }).on('finish', () => {
                    resolve();
                    bar.terminate();
                }).on('error', reject);
            }).on('error', reject);
        });
        return writedFiles;
    }
    async _install() {
        const oldFiles = this.opts.oldFiles;
        if (oldFiles) {
            for (const oldfile of oldFiles) {
                try {
                    await fs.del(path.join(this.opts.targetPath, oldfile));
                }
                catch (err) {
                }
            }
        }
        const preinstall = this.opts.preinstall;
        if (preinstall)
            await preinstall();
        const writedFiles = await this._downloadAndUnzip();
        installInfo[this.opts.key] = this.opts.version;
        const postinstall = this.opts.postinstall;
        if (postinstall)
            await postinstall(writedFiles);
    }
    async install() {
        await fs.mkdir(this.opts.targetPath);
        const name = this.opts.name;
        const key = this.opts.key;
        if (installInfo[key] === undefined) {
            const keyFile = this.opts.keyFile;
            if (keyFile && await fs.exists(path.join(this.opts.targetPath, keyFile))) {
                if (await yesno(`${name}: Would you like to use what already installed?`)) {
                    installInfo[key] = 'manual';
                    console.log(`${name}: manual`);
                    return;
                }
            }
            const confirm = this.opts.confirm;
            if (confirm)
                await confirm();
            await this._install();
            console.log(`${name}: Installed successfully`);
        }
        else if (installInfo[key] === null || installInfo[key] === 'manual') {
            console.log(`${name}: manual`);
        }
        else if (installInfo[key] === this.opts.version) {
            console.log(`${name}: ${this.opts.version}`);
        }
        else {
            console.log(`${name}: Old (${installInfo[key]})`);
            console.log(`${name}: New (${this.opts.version})`);
            await this._install();
            console.log(`${name}: Updated`);
        }
    }
}
const bds = new InstallItem({
    name: 'BDS',
    version: BDS_VERSION,
    url: BDS_LINK,
    targetPath: bdsPath,
    key: 'bdsVersion',
    keyFile: 'bedrock_server.exe',
    skipExists: true,
    async confirm() {
        console.log(`This will download and install Bedrock Dedicated Server to '${path.resolve(bdsPath)}'`);
        console.log(`BDS Version: ${BDS_VERSION}`);
        console.log(`Minecraft End User License Agreement: https://account.mojang.com/terms`);
        console.log(`Privacy Policy: https://go.microsoft.com/fwlink/?LinkId=521839`);
        const ok = await yesno("Do you agree to the terms above? (y/n)");
        if (!ok)
            throw new MessageError("Canceled");
    },
    async preinstall() {
        if (installInfo.files) {
            await removeInstalled(bdsPath, installInfo.files);
        }
    },
    async postinstall(writedFiles) {
        installInfo.files = writedFiles.filter(file => !KEEPS.has(file));
    }
});
const bdsxCore = new InstallItem({
    name: 'bdsx-core',
    version: BDSX_CORE_VERSION,
    url: BDSX_CORE_LINK,
    targetPath: bdsPath,
    key: 'bdsxCoreVersion',
    keyFile: 'Chakra.dll',
    oldFiles: ['mods'],
});
(async () => {
    try {
        await readInstallInfo();
        await bds.install();
        await bdsxCore.install();
        await saveInstallInfo();
    }
    catch (err) {
        if (err instanceof MessageError) {
            console.error(err.message);
        }
        else {
            console.error(err.stack);
        }
        await saveInstallInfo();
        process.exit(-1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYiw2QkFBOEI7QUFDOUIscUNBQXNDO0FBQ3RDLDZCQUE4QjtBQUM5QixxQ0FBc0M7QUFDdEMsd0NBQXlDO0FBQ3pDLHVEQUF5QztBQUN6QywwREFBMkQ7QUFDM0QsbURBQW9EO0FBRXBELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ3RDLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTtJQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ25CO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUVyQixNQUFNLFFBQVEsR0FBRywwREFBMEQsV0FBVyxNQUFNLENBQUM7QUFDN0YsTUFBTSxjQUFjLEdBQUcsdURBQXVELGlCQUFpQixjQUFjLGlCQUFpQixNQUFNLENBQUM7QUFFckksSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBRXhCLFNBQVMsS0FBSyxDQUFDLFFBQWUsRUFBRSxZQUFxQjtJQUNqRCxNQUFNLFNBQVMsR0FBRyxDQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLFFBQVEsR0FBSSxDQUFFLElBQUksRUFBRSxHQUFHLENBQUUsQ0FBQztJQUVoQyxPQUFPLElBQUksT0FBTyxDQUFVLE9BQU8sQ0FBQSxFQUFFO1FBQ2pDLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUN0QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzdDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxXQUFXLEVBQUU7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