"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const colors = require("colors");
const TARGET_MD5 = 'E1EC6B3D64A84D310D9F4C21F7FA45D4';
if (core_1.bedrock_server_exe.md5 !== TARGET_MD5) {
    console.error(colors.red('[BDSX] MD5 Hash does not match'));
    console.error(colors.red(`[BDSX] target MD5 = ${TARGET_MD5}`));
    console.error(colors.red(`[BDSX] current MD5 = ${core_1.bedrock_server_exe.md5}`));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2ttZDUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja21kNS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUE0QztBQUM1QyxpQ0FBa0M7QUFFbEMsTUFBTSxVQUFVLEdBQUcsa0NBQWtDLENBQUM7QUFDdEQsSUFBSSx5QkFBa0IsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUFFO0lBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7SUFDNUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3Qix5QkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDL0UifQ==