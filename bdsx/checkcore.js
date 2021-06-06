"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nversion = require("./version-bdsx.json");
const core_1 = require("./core");
const colors = require("colors");
if (core_1.cgate.bdsxCoreVersion !== nversion) {
    const oversion = core_1.cgate.bdsxCoreVersion || '1.0.0.1';
    console.error(colors.red('[BDSX] BDSX Core outdated'));
    console.error(colors.red(`[BDSX] Current version: ${oversion}`));
    console.error(colors.red(`[BDSX] Required version: ${nversion}`));
    console.log("[BDSX] Please run 'npm i' or " + process.platform === "win32" ? 'update.bat' : 'update.sh' + " to update");
    process.exit(0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tjb3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tjb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0RBQWlEO0FBQ2pELGlDQUErQjtBQUMvQixpQ0FBa0M7QUFFbEMsSUFBSSxZQUFLLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBRTtJQUNwQyxNQUFNLFFBQVEsR0FBRyxZQUFLLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQztJQUNwRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDO0lBQ3hILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbkIifQ==