"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
try {
    // remove old files
    fs.unlinkSync(`${__dirname}${path.sep}installer.js`);
    fs.unlinkSync(`${__dirname}${path.sep}installer.js.map`);
}
catch (err) {
}
require("./installer");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlCQUEwQjtBQUMxQiw2QkFBOEI7QUFFOUIsSUFBSTtJQUNBLG1CQUFtQjtJQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztDQUM1RDtBQUFDLE9BQU8sR0FBRyxFQUFFO0NBQ2I7QUFFRCx1QkFBcUIifQ==