"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const colors = require("colors");
function checkVersion(installed, required) {
    let ifGreater = false;
    let ifEqual = false;
    let ifLess = false;
    let updateMinorVersion = false;
    let updatePatchVersion = false;
    const comparison = required.match(/^~|\^|>=?|<=?/);
    if (comparison !== null) {
        switch (comparison[0]) {
            case '^':
                updateMinorVersion = true;
                ifEqual = true;
                break;
            case '~':
                updatePatchVersion = true;
                ifEqual = true;
                break;
            case '>=':
                ifGreater = true;
                ifEqual = true;
                break;
            case '>':
                ifGreater = true;
                break;
            case '<=':
                ifLess = true;
                ifEqual = true;
                break;
            case '<':
                ifLess = true;
                break;
        }
        required = required.substr(comparison[0].length);
    }
    else {
        ifEqual = true;
    }
    const requiredNums = required.split('.');
    if (comparison === null && !/^[0-9]+$/.test(requiredNums[0]))
        return true;
    let last = requiredNums[requiredNums.length - 1];
    if (last === 'x') {
        for (;;) {
            requiredNums.pop();
            if (requiredNums.length === 0)
                return true;
            last = requiredNums[requiredNums.length - 1];
            if (last === 'x')
                continue;
            break;
        }
    }
    for (let i = 0; i < requiredNums.length; i++) {
        const diff = installed[i] - +requiredNums[i];
        if (diff > 0) {
            if (updateMinorVersion && i >= 1)
                return true;
            if (updatePatchVersion && i >= 2)
                return true;
            return ifGreater;
        }
        if (diff < 0)
            return ifLess;
    }
    return ifEqual;
}
function checkVersionSyntax(pkgname, installed, requireds) {
    const installedSplited = installed.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)$/);
    if (installedSplited === null) {
        throw Error(`${pkgname}: Invalid installed version string (${installed})`);
    }
    installedSplited.shift();
    const installedNums = installedSplited.map(str => +str);
    for (const reqs of requireds.split(/ *\|\| */)) {
        const [req1, req2] = reqs.split(/ *- */, 2);
        if (req2 !== undefined) {
            if (checkVersion(installedNums, req1) && checkVersion(installedNums, '<=' + req2))
                return true;
        }
        else {
            if (checkVersion(installedNums, req1))
                return true;
        }
    }
    return false;
}
const packagejsonPath = path.resolve(process.cwd(), process.argv[1], 'package.json');
const packagejson = JSON.parse(fs.readFileSync(packagejsonPath, 'utf-8'));
let needUpdate = false;
const requiredDeps = packagejson.dependencies;
for (const name in requiredDeps) {
    const requiredVersion = requiredDeps[name];
    if (requiredVersion.startsWith('file:./plugins/'))
        continue;
    try {
        const installed = require(`${name}/package.json`);
        const installedVersion = installed.version;
        if (!checkVersionSyntax(name, installedVersion, requiredVersion)) {
            console.error(colors.red(`${name}: version does not match (installed=${installedVersion}, required=${requiredVersion})`));
            needUpdate = true;
        }
    }
    catch (err) {
        if (err.code !== 'MODULE_NOT_FOUND') {
            throw err;
        }
        console.error(colors.red(`${name}: not installed`));
        needUpdate = true;
    }
}
if (needUpdate) {
    console.error(colors.yellow(`Please use 'npm i' or '${process.platform === 'win32' ? "update.bat" : "update.sh"}' to update`));
    process.exit(-1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2ttb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2ttb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQThCO0FBQzlCLHlCQUEwQjtBQUMxQixpQ0FBa0M7QUFHbEMsU0FBUyxZQUFZLENBQUMsU0FBa0IsRUFBRSxRQUFlO0lBQ3JELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBRS9CLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkQsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQ3JCLFFBQVEsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLEtBQUssR0FBRztnQkFDSixrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLEdBQUc7Z0JBQ0osU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDakIsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLE1BQU07U0FDVDtRQUNE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