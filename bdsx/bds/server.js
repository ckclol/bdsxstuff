"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInstance = exports.ServerInstance = exports.MinecraftServerScriptEngine = exports.ScriptFramework = exports.DedicatedServer = exports.Minecraft = exports.VanilaGameModuleServer = exports.Minecraft$Something = exports.EntityRegistryOwned = exports.VanilaServerGameplayEventListener = exports.ServerMetricsImpl = exports.ServerMetrics = exports.PrivateKeyManager = exports.Whitelist = exports.ResourcePackManager = exports.MinecraftEventing = void 0;
const nativeclass_1 = require("bdsx/nativeclass");
const common_1 = require("../common");
class MinecraftEventing extends nativeclass_1.NativeClass {
}
exports.MinecraftEventing = MinecraftEventing;
class ResourcePackManager extends nativeclass_1.NativeClass {
}
exports.ResourcePackManager = ResourcePackManager;
class Whitelist extends nativeclass_1.NativeClass {
}
exports.Whitelist = Whitelist;
class PrivateKeyManager extends nativeclass_1.NativeClass {
}
exports.PrivateKeyManager = PrivateKeyManager;
class ServerMetrics extends nativeclass_1.NativeClass {
}
exports.ServerMetrics = ServerMetrics;
class ServerMetricsImpl extends ServerMetrics {
}
exports.ServerMetricsImpl = ServerMetricsImpl;
class VanilaServerGameplayEventListener extends nativeclass_1.NativeClass {
}
exports.VanilaServerGameplayEventListener = VanilaServerGameplayEventListener;
class EntityRegistryOwned extends nativeclass_1.NativeClass {
}
exports.EntityRegistryOwned = EntityRegistryOwned;
/**
 * unknown instance
 */
class Minecraft$Something extends nativeclass_1.NativeClass {
}
exports.Minecraft$Something = Minecraft$Something;
class VanilaGameModuleServer extends nativeclass_1.NativeClass {
}
exports.VanilaGameModuleServer = VanilaGameModuleServer;
class Minecraft extends nativeclass_1.NativeClass {
    getLevel() {
        common_1.abstract();
    }
}
exports.Minecraft = Minecraft;
class DedicatedServer extends nativeclass_1.NativeClass {
}
exports.DedicatedServer = DedicatedServer;
class ScriptFramework extends nativeclass_1.NativeClass {
}
exports.ScriptFramework = ScriptFramework;
class MinecraftServerScriptEngine extends ScriptFramework {
}
exports.MinecraftServerScriptEngine = MinecraftServerScriptEngine;
class ServerInstance extends nativeclass_1.NativeClass {
    _disconnectAllClients(message) {
        common_1.abstract();
    }
    createDimension(id) {
        return this.minecraft.something.level.createDimension(id);
    }
    getActivePlayerCount() {
        return this.minecraft.something.level.getActivePlayerCount();
    }
    disconnectAllClients(message = "disconnectionScreen.disconnected") {
        this._disconnectAllClients(message);
    }
    disconnectClient(client, message = "disconnectionScreen.disconnected") {
        return this.minecraft.something.shandler.disconnectClient(client, message);
    }
    getMotd() {
        return this.minecraft.something.shandler.motd;
    }
    setMotd(motd) {
        return this.minecraft.something.shandler.setMotd(motd);
    }
    getMaxPlayers() {
        return this.minecraft.something.shandler.maxPlayers;
    }
    setMaxPlayers(count) {
        this.minecraft.something.shandler.setMaxPlayers(count);
    }
}
exports.ServerInstance = ServerInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLGtEQUErQztBQUcvQyxzQ0FBcUM7QUFPckMsTUFBYSxpQkFBa0IsU0FBUSx5QkFBVztDQUFHO0FBQXJELDhDQUFxRDtBQUNyRCxNQUFhLG1CQUFvQixTQUFRLHlCQUFXO0NBQUc7QUFBdkQsa0RBQXVEO0FBQ3ZELE1BQWEsU0FBVSxTQUFRLHlCQUFXO0NBQUc7QUFBN0MsOEJBQTZDO0FBQzdDLE1BQWEsaUJBQWtCLFNBQVEseUJBQVc7Q0FBRztBQUFyRCw4Q0FBcUQ7QUFDckQsTUFBYSxhQUFjLFNBQVEseUJBQVc7Q0FBRztBQUFqRCxzQ0FBaUQ7QUFDakQsTUFBYSxpQkFBa0IsU0FBUSxhQUFhO0NBQUc7QUFBdkQsOENBQXVEO0FBQ3ZELE1BQWEsaUNBQWtDLFNBQVEseUJBQVc7Q0FBRztBQUFyRSw4RUFBcUU7QUFDckUsTUFBYSxtQkFBb0IsU0FBUSx5QkFBVztDQUFHO0FBQXZELGtEQUF1RDtBQUV2RDs7R0FFRztBQUNILE1BQWEsbUJBQW9CLFNBQVEseUJBQVc7Q0FJbkQ7QUFKRCxrREFJQztBQUVELE1BQWEsc0JBQXVCLFNBQVEseUJBQVc7Q0FFdEQ7QUFGRCx3REFFQztBQUVELE1BQWEsU0FBVSxTQUFRLHlCQUFXO0lBa0J0QyxRQUFRO1FBQ0osaUJBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBckJELDhCQXFCQztBQUVELE1BQWEsZUFBZ0IsU0FBUSx5QkFBVztDQUMvQztBQURELDBDQUNDO0FBRUQsTUFBYSxlQUFnQixTQUFRLHlCQUFXO0NBRS9DO0FBRkQsMENBRUM7QUFFRCxNQUFhLDJCQUE0QixTQUFRLGVBQWU7Q0FFL0Q7QUFGRCxrRUFFQztBQUVELE1BQWEsY0FBZSxTQUFRLHlCQUFXO0lBT2pDLHFCQUFxQixDQUFDLE9BQWlCO1FBQzdDLGlCQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBYztRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELG9CQUFvQjtRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxVQUFlLGtDQUFrQztRQUNsRSxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELGdCQUFnQixDQUFDLE1BQXdCLEVBQUUsVUFBZSxrQ0FBa0M7UUFDeEYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ2xELENBQUM7SUFDRCxPQUFPLENBQUMsSUFBVztRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0QsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsYUFBYSxDQUFDLEtBQVk7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0o7QUFuQ0Qsd0NBbUNDIn0=