"use strict";
// launcher.ts is the launcher for BDS
// These scripts are run before launching BDS
// So there are no 'server' variable yet
// launcher.ts will import ./index.ts after launching BDS.
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("bdsx/source-map-support");
source_map_support_1.install();
require("bdsx/checkcore");
require("bdsx/checkmd5");
require("bdsx/checkmodules");
const launcher_1 = require("bdsx/launcher");
const plugins_1 = require("bdsx/plugins");
const event_1 = require("bdsx/event");
console.log("  _____      _____ \n".green +
    "  \\    \\    /    / \n".green +
    "   \\".green + "___ ".white + "\\".green + "__".white + "/".green + " ___".white + "/  \n".green +
    "   | _ )   \\/ __|  \n".white +
    "   | _ \\ |) \\__ \\  \n".white +
    "   |___/___/|___/  \n".white +
    "   /    /  \\    \\  \n".green +
    "  /____/    \\____\\ \n".green);
(async () => {
    event_1.events.serverClose.on(() => {
        console.log('[BDSX] bedrockServer closed');
        setTimeout(() => {
            console.log('[BDSX] node.js is processing...');
        }, 3000).unref();
    });
    await plugins_1.loadAllPlugins();
    // launch BDS
    console.log('[BDSX] bedrockServer is launching...');
    await launcher_1.bedrockServer.launch();
    /**
     * send stdin to bedrockServer.executeCommandOnConsole
     * without this, you need to control stdin manually
     */
    launcher_1.bedrockServer.DefaultStdInHandler.install();
    // run index
    require('./index');
})().catch(source_map_support_1.remapAndPrintError);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esc0NBQXNDO0FBQ3RDLDZDQUE2QztBQUM3Qyx3Q0FBd0M7QUFDeEMsMERBQTBEOztBQUUxRCxnRUFBaUc7QUFDakcsNEJBQXVCLEVBQUUsQ0FBQztBQUUxQiwwQkFBd0I7QUFDeEIseUJBQXVCO0FBQ3ZCLDZCQUEyQjtBQUUzQiw0Q0FBOEM7QUFDOUMsMENBQThDO0FBRTlDLHNDQUFvQztBQUVwQyxPQUFPLENBQUMsR0FBRyxDQUNYLHVCQUF1QixDQUFDLEtBQUs7SUFDN0IseUJBQXlCLENBQUMsS0FBSztJQUMvQixPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSztJQUNqRyx3QkFBd0IsQ0FBQyxLQUFLO0lBQzlCLDBCQUEwQixDQUFDLEtBQUs7SUFDaEMsdUJBQXVCLENBQUMsS0FBSztJQUM3Qix5QkFBeUIsQ0FBQyxLQUFLO0lBQy9CLHlCQUF5QixDQUFDLEtBQUssQ0FDOUIsQ0FBQztBQUVGLENBQUMsS0FBSyxJQUFFLEVBQUU7SUFFTixjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzNDLFVBQVUsQ0FBQyxHQUFFLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSx3QkFBYyxFQUFFLENBQUM7SUFFdkIsYUFBYTtJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUNwRCxNQUFNLHdCQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFN0I7OztPQUdHO0lBQ0gsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUU1QyxZQUFZO0lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLHVDQUFrQixDQUFDLENBQUMifQ==