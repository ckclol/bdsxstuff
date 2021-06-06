"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const child_process = require("child_process");
const os = require("os");
if (process.argv[2] === undefined) {
    console.error(colors.red(`[BDSX-Plugins] Please provide an argument for the target path of the new plugin`));
    process.exit(-1);
}
const targetPath = path.resolve(process.argv[2]);
if (fs.existsSync(targetPath)) {
    console.error(colors.red(`[BDSX-Plugins] '${targetPath}' directory already exists`));
    console.error(colors.red(`[BDSX-Plugins] Please execute it with a new path`));
    process.exit(0);
}
function mkdirRecursiveSync(dirpath) {
    try {
        fs.mkdirSync(dirpath);
        return;
    }
    catch (err) {
        if (err.code === 'EEXIST')
            return;
        if (['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) !== -1)
            throw err;
    }
    mkdirRecursiveSync(path.dirname(dirpath));
    fs.mkdirSync(dirpath);
}
mkdirRecursiveSync(targetPath);
const basename = path.basename(targetPath);
const targetdir = targetPath + path.sep;
// index.ts
{
    const clsname = camelize(basename);
    const exampleSource = `
import { events } from "bdsx/event";

console.log('[plugin:${clsname}] allocated');

events.serverOpen.on(()=>{
    console.log('[plugin:${clsname}] launching');
});

events.serverClose.on(()=>{
    console.log('[plugin:${clsname}] closed');
});

`;
    fs.writeFileSync(`${targetdir}index.ts`, exampleSource, 'utf-8');
}
// package.json
{
    const bdsxPath = path.join(__dirname, '..');
    const examplejson = {
        "name": `@bdsx/${basename}`,
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "keywords": [],
        "author": "",
        "license": "ISC",
        "bdsxPlugin": true,
        "scripts": {
            "build": "tsc",
            "watch": "tsc -w",
            "prepare": "tsc"
        },
        "devDependencies": {
            "bdsx": `file:${path.relative(targetPath, bdsxPath).replace(/\\/g, '/')}`,
            "@types/node": "^12.20.5",
            "typescript": "^4.2.3"
        }
    };
    fs.writeFileSync(`${targetdir}package.json`, JSON.stringify(examplejson, null, 2).replace(/\n/g, os.EOL), 'utf-8');
}
// tsconfig.json
{
    const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));
    delete tsconfig.exclude;
    tsconfig.declaration = true;
    fs.writeFileSync(`${targetdir}tsconfig.json`, JSON.stringify(tsconfig, null, 2).replace(/\n/g, os.EOL), 'utf-8');
}
// .npmignore
{
    const npmignore = `
/.git
*.ts
!*.d.ts
`;
    fs.writeFileSync(`${targetdir}.npmignore`, npmignore, 'utf-8');
}
// .gitignore
{
    const gitignore = `
/node_modules
*.js
*.d.ts
`;
    fs.writeFileSync(`${targetdir}.gitignore`, gitignore, 'utf-8');
}
// README.md
{
    const readme = `
# ${basename} Plugin
The plugin for bdsx
`;
    fs.writeFileSync(`${targetdir}README.md`, readme, 'utf-8');
}
function camelize(context) {
    const reg = /[a-zA-Z]+/g;
    let out = '';
    for (;;) {
        const matched = reg.exec(context);
        if (matched === null)
            return out;
        const word = matched[0];
        out += word.charAt(0).toLocaleUpperCase() + word.substr(1);
    }
}
const currentdir = process.cwd();
process.chdir(targetdir);
child_process.execSync('npm i', { stdio: 'inherit' });
process.chdir(currentdir);
let rpath = path.relative(currentdir, targetdir).replace(/\\/g, '/');
if (!rpath.startsWith('.'))
    rpath = `./${rpath}`;
child_process.execSync(`npm i "${rpath}"`, { stdio: 'inherit' });
console.log(`[BDSX-Plugins] Generated at ${targetPath}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUM5QixpQ0FBa0M7QUFDbEMsK0NBQWdEO0FBQ2hELHlCQUEwQjtBQUUxQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO0lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDLENBQUM7SUFDN0csT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BCO0FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsVUFBVSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDckYsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUMsQ0FBQztJQUM5RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ25CO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxPQUFjO0lBQ3RDLElBQUk7UUFDQSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU87S0FDVjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFBRSxPQUFPO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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