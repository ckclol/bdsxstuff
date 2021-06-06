import { BackupManager } from "@bdsx/backup";
import { bedrockServer } from "bdsx/launcher";
import { CommandRawText } from "bdsx/bds/command";
import { command } from "bdsx";

const backupManager = new BackupManager(bedrockServer);
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

command.register('echo', 'repeat text').overload((param, origin, output)=>{
    console.log(param.rawtext.text);
}, { rawtext:CommandRawText });