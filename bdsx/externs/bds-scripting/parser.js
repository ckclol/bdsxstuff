"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const htmlutil_1 = require("./htmlutil");
const styling_1 = require("./styling");
const type_1 = require("./type");
const filewriter_1 = require("../../writer/filewriter");
const DOCURL_SCRIPTING = 'https://bedrock.dev/docs/stable/Scripting';
const DOCURL_ADDONS = 'https://bedrock.dev/docs/stable/Addons';
const OUT_SCRIPTING = path.join(__dirname, '../generated.scripting.d.ts');
const OUT_ADDONS = path.join(__dirname, '../generated.addons.d.ts');
const docfixRaw = require('./docfix.json');
const docfix = new Map();
for (const name in docfixRaw) {
    const item = docfixRaw[name];
    docfix.set(name, type_1.DocType.fromDocFix(item));
}
const BINDING_SUFFIX = ' Bindings';
const COMPONENT_SUFFIX = ' Components';
const EVENT_SUFFIX = ' Events';
const system = new type_1.DocType;
const compMap = new type_1.DocType;
const listenerEvents = new type_1.DocType;
const triggerEvents = new type_1.DocType;
async function printInterface(writer, iname, s) {
    let type = null;
    try {
        type = type_1.DocType.fromTable(s.searchTableAsObject());
    }
    finally {
        const docfixItem = docfix.get(iname);
        if (docfixItem) {
            if (type)
                type.patch(docfixItem);
            else
                type = docfixItem;
        }
        if (type === null) {
            type = type_1.DocType.inline('any');
            type.desc = 'Not documented';
        }
        await type.writeTo(iname, writer);
    }
}
async function printComponent(writer, id, postfix, s) {
    const ns = id.indexOf(':');
    if (ns === -1) {
        console.error(`   └ ${id}: Component without colon`);
        return '';
    }
    const name = `I${styling_1.styling.toCamelStyle(id.substr(ns + 1), '_', true)}${postfix}`;
    console.log(`   └ ${id}: ${name}`);
    await printInterface(writer, name, s);
    return name;
}
async function parseScriptingDoc() {
    console.log('# Parse Scripting Document');
    const base = await htmlutil_1.htmlutil.wgetElement(DOCURL_SCRIPTING, 'html', 'body', 'div', 'div', 'div', 'div', 'div', 'div');
    if (base === null) {
        console.error(`Scripting: Target element not found`);
        return;
    }
    const writer = new filewriter_1.FileWriter(OUT_SCRIPTING);
    await writer.write(`/**\n * Generated with bdsx/bds-scripting/parser.ts\n * docfix.json overrides it.\n * Please DO NOT modify this directly.\n */\ndeclare global {\n\n`);
    try {
        const s = new htmlutil_1.HtmlSearcher(base);
        await s.minecraftDocHeader('Item', 'h1', async (node, id) => {
            console.log(id);
            const iname = styling_1.styling.apiObjectNameToInterfaceName(id);
            if (iname !== null) {
                if (iname === 'IBlock') { // doc bug, wrong <p> tag
                    const p = s.nextIf('p');
                    if (p) {
                        const table = htmlutil_1.htmlutil.firstChild(p);
                        if (table && table.tagName === 'TABLE') {
                            s.enter(p);
                        }
                    }
                }
                console.log(` └ interface ${iname}`);
                await printInterface(writer, iname, s);
                if (iname === 'ILevelTickingArea') {
                    s.leave();
                }
            }
            else if (id.endsWith(BINDING_SUFFIX) || id === 'Entity Queries' || id === 'Slash Commands') {
                await s.minecraftDocHeader('Function', 'h2', async (node, id) => {
                    console.log(` └ ${id}`);
                    const p = s.nextIf('p');
                    const desc = p !== null ? p.innerText : '';
                    const funcidx = id.indexOf('(');
                    if (funcidx !== -1) {
                        const funcloseidx = id.lastIndexOf(')');
                        const funcname = id.substr(0, funcidx).trim();
                        const paramNameMap = new Map();
                        const paramNames = id.substring(funcidx + 1, funcloseidx).split(',');
                        for (let i = 0; i < paramNames.length; i++) {
                            paramNameMap.set(paramNames[i].trim(), i);
                        }
                        const method = new type_1.DocMethod(funcname);
                        method.desc = desc;
                        system.methods.push(method);
                        const docfixItem = docfix.get('IVanillaServerSystem').getMethod(funcname);
                        if (docfixItem !== null && docfixItem.deleted)
                            return;
                        try {
                            await s.each('Types', node => {
                                if (node.innerHTML === 'Parameters')
                                    return true; // doc bug, 'addFilterToQuery' has not anchor
                                return htmlutil_1.htmlutil.checks(node, { tag: 'h3', class: 'anchored-heading' }, { tag: 'span' });
                            }, node => {
                                const span = htmlutil_1.htmlutil.follow(node, 'span');
                                const id = span !== null ? span.id : node.innerHTML;
                                switch (id) {
                                    case 'Parameters': {
                                        const structure = type_1.DocType.fromTable(s.searchTableAsObject());
                                        const fields = structure.fields;
                                        const nfields = [];
                                        for (const field of fields) {
                                            const fieldIndex = paramNameMap.get(field.name);
                                            if (fieldIndex === undefined) {
                                                console.error(`param name not found: ${field.name}`);
                                                continue;
                                            }
                                            nfields[fieldIndex] = field;
                                        }
                                        method.params.push(...nfields.filter(v => v));
                                        method.setCamel();
                                        break;
                                    }
                                    case 'Return Value': {
                                        const structure = type_1.DocType.fromTable(s.searchTableAsObject());
                                        if (structure.fields.length !== 0) {
                                            method.return = structure.fields[0].type;
                                        }
                                        break;
                                    }
                                }
                            });
                        }
                        finally {
                            if (docfixItem !== null)
                                method.patch(docfixItem);
                        }
                    }
                });
            }
            else if (id.endsWith(COMPONENT_SUFFIX)) {
                if (id === 'Client Components')
                    return;
                await s.minecraftDocHeader('Components', 'h2', async (node, id) => {
                    const name = await printComponent(writer, id, 'Component', s);
                    if (name) {
                        compMap.fields.push(new type_1.DocField(id, type_1.DocType.inline(`IComponent<${name}>`)));
                    }
                });
            }
            else if (id.endsWith(EVENT_SUFFIX)) {
                if (id === 'Client Events')
                    return;
                await s.minecraftDocHeader('Types', 'h2', async (node, id) => {
                    console.log(` └ ${id}`);
                    switch (id) {
                        case 'Listening Events':
                            await s.minecraftDocHeader('Events', 'h3', async (node, id) => {
                                const name = await printComponent(writer, id, 'EventData', s);
                                if (name) {
                                    listenerEvents.fields.push(new type_1.DocField(id, type_1.DocType.inline(`IEventData<${name}>`)));
                                }
                            });
                            break;
                        case 'Trigger-able Events':
                            await s.minecraftDocHeader('Events', 'h3', async (node, id) => {
                                const name = await printComponent(writer, id, 'Parameters', s);
                                if (name) {
                                    triggerEvents.fields.push(new type_1.DocField(id, type_1.DocType.inline(`IEventData<${name}>`)));
                                }
                            });
                            break;
                    }
                });
            }
        });
    }
    catch (err) {
        if (err === htmlutil_1.HtmlSearcher.EOF)
            return;
        console.error(err && (err.stack || err));
    }
    finally {
        await compMap.writeTo('MinecraftComponentNameMap', writer);
        await triggerEvents.writeTo('MinecraftServerEventNameMap', writer);
        await listenerEvents.writeTo('MinecraftClientEventNameMap', writer);
        system.patch(docfix.get('IVanillaServerSystem'));
        await system.writeTo('IVanillaServerSystem', writer);
        await writer.write('}\nexport {};\n');
        await writer.end();
    }
}
async function parseAddonsDoc() {
    console.log('# Parse Addons Document');
    const base = await htmlutil_1.htmlutil.wgetElement(DOCURL_ADDONS, 'html', 'body', 'div', 'div', 'div', 'div', 'div', 'div');
    if (base === null) {
        console.error(`Addons: Target element not found`);
        return;
    }
    const s = new htmlutil_1.HtmlSearcher(base);
    let blockParsed = false;
    const writer = new filewriter_1.FileWriter(OUT_ADDONS);
    await writer.write(`/**\n * Generated with bdsx/bds-scripting/parser.ts\n * Please DO NOT modify this directly.\n */\n`);
    await writer.write(`declare global {\n\n`);
    try {
        await s.minecraftDocHeader('Blocks', 'h1', async (node, id) => {
            console.log(id);
            switch (id) {
                case 'Blocks':
                    if (blockParsed)
                        break;
                    blockParsed = true;
                    await type_1.DocType.writeTableKeyUnion('BlockId', 'minecraft:', s.searchTableAsObject(), 'Name', v => v, writer);
                    break;
                case 'Entities': {
                    const table = s.searchTableAsObject();
                    await type_1.DocType.writeTableKeyUnion('EntityId', '', table, 'Identifier', v => `minecraft:${v}`, writer);
                    // await DocType.writeTableKeyUnion('EntityFullId', '', table, 'Identifier', row=>row.FullID.text, writer);
                    // await DocType.writeTableKeyUnion('EntityShortId', '', table, 'Identifier', row=>row.ShortID.text, writer);
                    break;
                }
                case 'Items': {
                    const table = s.searchTableAsObject();
                    await type_1.DocType.writeTableKeyUnion('ItemId', '', table, 'Name', name => {
                        if (name.startsWith('item.'))
                            return null;
                        return `minecraft:${name}`;
                    }, writer);
                    // await DocType.writeTableKeyUnion('ItemNumberId', '', table, 'Name', row=>row['ID'].text, writer);
                    break;
                }
                case 'Entity Damage Source': {
                    await type_1.DocType.writeTableKeyUnion('MinecraftDamageSource', '', s.searchTableAsObject(), 'DamageSource', v => v, writer);
                    break;
                }
            }
        });
    }
    catch (err) {
        if (err === htmlutil_1.HtmlSearcher.EOF)
            return;
        console.error(err && (err.stack || err));
    }
    finally {
        await writer.write('}\n');
        await writer.write('export {};\n');
        await writer.end();
    }
}
(async () => {
    await parseScriptingDoc();
    await parseAddonsDoc();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQThCO0FBQzlCLHlDQUFvRDtBQUNwRCx1Q0FBb0M7QUFDcEMsaUNBQTZFO0FBQzdFLHdEQUFxRDtBQUVyRCxNQUFNLGdCQUFnQixHQUFHLDJDQUEyQyxDQUFDO0FBQ3JFLE1BQU0sYUFBYSxHQUFHLHdDQUF3QyxDQUFDO0FBRS9ELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDMUUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUVwRSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUEyQyxDQUFDO0FBQ3JGLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO0FBQzFDLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxFQUFFO0lBQzFCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxjQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDOUM7QUFJRCxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFDbkMsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7QUFDdkMsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBTyxDQUFDO0FBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDO0FBQzVCLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBTyxDQUFDO0FBQ25DLE1BQU0sYUFBYSxHQUFHLElBQUksY0FBTyxDQUFDO0FBRWxDLEtBQUssVUFBVSxjQUFjLENBQUMsTUFBaUIsRUFBRSxLQUFZLEVB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