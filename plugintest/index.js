"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backup_1 = require("@bdsx/backup");
const launcher_1 = require("bdsx/launcher");
const command_1 = require("bdsx/bds/command");
const bdsx_1 = require("bdsx");
const backupManager = new backup_1.BackupManager(launcher_1.bedrockServer);
backupManager.init({
    backupOnStart: true,
    skipIfNoActivity: true,
    backupOnPlayerConnected: true,
    backupOnPlayerDisconnected: true,
    interval: 30,
    minIntervalBetweenBackups: 5
}).then((res) => {
    console.log(`backup manager initiated`);
});
bdsx_1.command.register('echo', 'repeat text').overload((param, origin, output) => {
    console.log(param.rawtext.text);
}, { rawtext: command_1.CommandRawText });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUE2QztBQUM3Qyw0Q0FBOEM7QUFDOUMsOENBQWtEO0FBQ2xELCtCQUErQjtBQUUvQixNQUFNLGFBQWEsR0FBRyxJQUFJLHNCQUFhLENBQUMsd0JBQWEsQ0FBQyxDQUFDO0FBQ3ZELGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDZixhQUFhLEVBQUUsSUFBSTtJQUNuQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLHVCQUF1QixFQUFFLElBQUk7SUFDN0IsMEJBQTBCLEVBQUUsSUFBSTtJQUNoQyxRQUFRLEVBQUUsRUFBRTtJQUNaLHlCQUF5QixFQUFFLENBQUM7Q0FDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsRUFBRTtJQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFDLHdCQUFjLEVBQUUsQ0FBQyxDQUFDIn0=