"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = exports.getErrorSource = exports.remapAndPrintError = exports.remapStackLine = exports.remapStack = exports.remapError = exports.mapSourcePosition = exports.retrieveSourceMap = void 0;
const source_map_1 = require("source-map");
const util_1 = require("./util");
const path = require("path");
const fs = require("fs");
// Only install once if called multiple times
let uncaughtShimInstalled = false;
// Maps a file path to a string containing the file contents
const fileContentsCache = {};
// Maps a file path to a source map for that file
const sourceMapCache = {};
// Regex for detecting source maps
const reSourceMap = /^data:application\/json[^,]+base64,/;
// Priority list of retrieve handlers
const retrieveFileHandlers = [];
const retrieveMapHandlers = [];
function hasGlobalProcessEventEmitter() {
    return ((typeof process === 'object') && (process !== null) && (typeof process.on === 'function'));
}
function handlerExec(list) {
    return function (arg) {
        for (let i = 0; i < list.length; i++) {
            const ret = list[i](arg);
            if (ret) {
                return ret;
            }
        }
        return null;
    };
}
const retrieveFile = handlerExec(retrieveFileHandlers);
retrieveFileHandlers.push((path) => {
    // Trim the path to make sure there is no extra whitespace.
    path = path.trim();
    if (/^file:/.test(path)) {
        // existsSync/readFileSync can't handle file protocol, but once stripped, it works
        path = path.replace(/file:\/\/\/(\w:)?/, (protocol, drive) => drive ?
            '' : // file:///C:/dir/file -> C:/dir/file
            '/' // file:///root-dir/file -> /root-dir/file
        );
    }
    if (path in fileContentsCache) {
        return fileContentsCache[path];
    }
    let contents = '';
    try {
        if (fs.existsSync(path)) {
            // Otherwise, use the filesystem
            contents = fs.readFileSync(path, 'utf8');
        }
    }
    catch (er) {
        /* ignore any errors */
    }
    return fileContentsCache[path] = contents;
});
// Support URLs relative to a directory, but be careful about a protocol prefix
// in case we are in the browser (i.e. directories may start with "http://" or "file:///")
function supportRelativeURL(file, url) {
    if (!file)
        return url;
    const dir = path.dirname(file);
    const match = /^\w+:\/\/[^/]*/.exec(dir);
    let protocol = match ? match[0] : '';
    const startPath = dir.slice(protocol.length);
    if (protocol && /^\/\w:/.test(startPath)) {
        // handle file:///C:/ paths
        protocol += '/';
        return protocol + path.resolve(dir.slice(protocol.length), url).replace(/\\/g, '/');
    }
    return protocol + path.resolve(dir.slice(protocol.length), url);
}
function retrieveSourceMapURL(source) {
    // Get the URL of the source map
    const fileData = retrieveFile(source);
    const re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg;
    // Keep executing the search to find the *last* sourceMappingURL to avoid
    // picking up sourceMappingURLs from comments, strings, etc.
    let lastMatch = null;
    let match;
    while ((match = re.exec(fileData)) !== null)
        lastMatch = match;
    if (!lastMatch)
        return null;
    return lastMatch[1];
}
// Can be overridden by the retrieveSourceMap option to install. Takes a
// generated source filename; returns a {map, optional url} object, or null if
// there is no source map.  The map field may be either a string or the parsed
// JSON object (ie, it must be a valid argument to the SourceMapConsumer
// constructor).
exports.retrieveSourceMap = handlerExec(retrieveMapHandlers);
retrieveMapHandlers.push(source => {
    let sourceMappingURL = retrieveSourceMapURL(source);
    if (!sourceMappingURL)
        return null;
    // Read the contents of the source map
    let sourceMapData;
    if (reSourceMap.test(sourceMappingURL)) {
        // Support source map URL as a data url
        const rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
        sourceMapData = Buffer.from(rawData, "base64").toString();
        sourceMappingURL = source;
    }
    else {
        // Support source map URLs relative to the source URL
        sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
        sourceMapData = retrieveFile(sourceMappingURL);
    }
    if (!sourceMapData) {
        return null;
    }
    return {
        url: sourceMappingURL,
        map: sourceMapData
    };
});
function mapSourcePosition(position) {
    let sourceMap = sourceMapCache[position.source];
    if (!sourceMap) {
        // Call the (overrideable) retrieveSourceMap function to get the source map.
        const urlAndMap = exports.retrieveSourceMap(position.source);
        if (urlAndMap) {
            sourceMap = sourceMapCache[position.source] = {
                url: urlAndMap.url,
                map: new source_map_1.SourceMapConsumer(urlAndMap.map)
            };
            // Load all sources stored inline with the source map into the file cache
            // to pretend like they are already loaded. They may not exist on disk.
            if (sourceMap.map) {
                sourceMap.map.sources.forEach(source => {
                    const contents = sourceMap.map.sourceContentFor(source);
                    if (contents) {
                        const url = supportRelativeURL(sourceMap.url, source);
                        fileContentsCache[url] = contents;
                    }
                });
            }
        }
        else {
            sourceMap = sourceMapCache[position.source] = {
                url: null,
                map: null
            };
        }
    }
    // Resolve the source URL relative to the URL of the source map
    if (sourceMap && sourceMap.map) {
        const originalPosition = sourceMap.map.originalPositionFor(position);
        // Only return the original position if a matching line was found. If no
        // matching line is found then we return position instead, which will cause
        // the stack trace to print the path and line for the compiled file. It is
        // better to give a precise location in the compiled file than a vague
        // location in the original file.
        if (originalPosition.source !== null) {
            originalPosition.source = supportRelativeURL(sourceMap.url, originalPosition.source);
            return originalPosition;
        }
    }
    return position;
}
exports.mapSourcePosition = mapSourcePosition;
function remapError(err) {
    err.stack = remapStack(err.stack);
    return err;
}
exports.remapError = remapError;
/**
 * remap filepath to original filepath
 */
function remapStack(stack) {
    if (stack === undefined)
        return undefined;
    const state = { nextPosition: null, curPosition: null };
    const frames = stack.split('\n');
    let i = frames.length - 1;
    for (; i >= 1; i--) {
        const frame = remapStackLine(frames[i], state);
        if (frame.internal)
            continue;
        frames.length = i + 1;
        frames[i] = frame.stackLine;
        state.nextPosition = state.curPosition;
        break;
    }
    for (; i >= 1; i--) {
        const frame = remapStackLine(frames[i], state);
        frames[i] = frame.stackLine;
        state.nextPosition = state.curPosition;
    }
    return frames.join('\n');
}
exports.remapStack = remapStack;
/**
 * remap filepath to original filepath for one line
 */
function remapStackLine(stackLine, state = { nextPosition: null, curPosition: null }) {
    const matched = /^ {3}at (.+) \(([^(]+)\)$/.exec(stackLine);
    if (!matched)
        return { stackLine, internal: false };
    const fnname = matched[1];
    const source = matched[2];
    // provides interface backward compatibility
    if (source === 'native code' || source === 'native code:0:0') {
        state.curPosition = null;
        return { stackLine, internal: false };
    }
    const srcmatched = /^(.+):(\d+):(\d+)$/.exec(source);
    if (!srcmatched)
        return { stackLine, internal: false };
    const isEval = fnname === 'eval code';
    if (isEval) {
        return { stackLine, internal: false };
    }
    const file = srcmatched[1];
    const line = +srcmatched[2];
    const column = +srcmatched[3] - 1;
    const position = mapSourcePosition({
        source: file,
        line: line,
        column: column
    });
    state.curPosition = position;
    return {
        stackLine: `   at ${fnname} (${position.source}:${position.line}:${position.column + 1})`,
        internal: position.source.startsWith('internal/')
    };
}
exports.remapStackLine = remapStackLine;
/**
 * remap stack and print
 */
function remapAndPrintError(err) {
    if (err && err.stack) {
        console.error(remapStack(err.stack));
    }
    else {
        console.error(err);
    }
}
exports.remapAndPrintError = remapAndPrintError;
// Generate position and snippet of original source with pointer
function getErrorSource(error) {
    const match = /\n {3}at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
    if (match) {
        const source = match[1];
        const line = +match[2];
        const column = +match[3];
        // Support the inline sourceContents inside the source map
        let contents = fileContentsCache[source];
        // Support files on disk
        if (!contents && fs && fs.existsSync(source)) {
            try {
                contents = fs.readFileSync(source, 'utf8');
            }
            catch (er) {
                contents = '';
            }
        }
        // Format the line from the original source code like node does
        if (contents) {
            const code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
            if (code) {
                return `${source}:${line}\n${code}\n${new Array(column).join(' ')}^`;
            }
        }
    }
    return null;
}
exports.getErrorSource = getErrorSource;
function printErrorAndExit(error) {
    const source = getErrorSource(error);
    // Ensure error is printed synchronously and not truncated
    const handle = process.stderr._handle;
    if (handle && handle.setBlocking) {
        handle.setBlocking(true);
    }
    if (source) {
        console.error();
        console.error(source);
    }
    console.error(error.stack);
    process.exit(1);
}
function shimEmitUncaughtException() {
    const origEmit = process.emit;
    process.emit = function (type, ...args) {
        if (type === 'uncaughtException') {
            const err = args[0];
            if (err && err.stack) {
                err.stack = remapStack(err.stack);
                const hasListeners = (this.listeners(type).length > 0);
                if (!hasListeners) {
                    return printErrorAndExit(err);
                }
            }
        }
        else if (type === 'unhandledRejection') {
            const err = args[0];
            if (err && err.stack)
                err.stack = remapStack(err.stack);
        }
        return origEmit.apply(this, arguments);
    };
}
function install() {
    if (uncaughtShimInstalled)
        return;
    let installHandler = true;
    try {
        const worker_threads = module.require('worker_threads');
        if (worker_threads.isMainThread === false) {
            installHandler = false;
        }
    }
    catch (e) { }
    if (installHandler && hasGlobalProcessEventEmitter()) {
        uncaughtShimInstalled = true;
        shimEmitUncaughtException();
    }
    console.trace = function (...messages) {
        const err = remapStack(util_1.removeLine(Error(messages.map(util_1.anyToString).join(' ')).stack || '', 1, 2));
        console.error(`Trace${err.substr(5)}`);
    };
}
exports.install = install;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLW1hcC1zdXBwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic291cmNlLW1hcC1zdXBwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUErQztBQUMvQyxpQ0FBK0Q7QUFDL0QsNkJBQThCO0FBQzlCLHlCQUEwQjtBQXdCMUIsNkNBQTZDO0FBQzdDLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0FBRWxDLDREQUE0RDtBQUM1RCxNQUFNLGlCQUFpQixHQUEyQixFQUFFLENBQUM7QUFFckQsaURBQWlEO0FBQ2pELE1BQU0sY0FBYyxHQUFxRCxFQUFFLENBQUM7QUFFNUUsa0NBQWtDO0FBQ2xDLE1BQU0sV0FBVyxHQUFHLHFDQUFxQyxDQUFDO0FBRTFELHFDQUFxQztBQUNyQyxNQUFNLG9CQUFvQixHQUFpQyxFQUFFLENBQUM7QUFDOUQsTUFBTSxtQkFBbUIsR0FBMkMsRUFBRSxDQUFDO0FBRXZFLFNBQVMsNEJBQTRCO0lBQ2pDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDdkcsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFPLElBQXVCO0lBQzlDLE9BQU8sVUFBVSxHQUFHO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLEdBQUcsQ0FBQzthQUNkO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxZQUFZ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