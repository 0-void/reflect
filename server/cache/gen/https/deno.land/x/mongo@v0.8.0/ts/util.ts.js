import { prepare } from "../deps.ts";
// @ts-ignore
const DenoCore = Deno.core;
const PLUGIN_NAME = "deno_mongo";
let mongoPluginId;
const decoder = new TextDecoder();
const encoder = new TextEncoder();
const pendingCommands = new Map();
let nextCommandId = 0;
export async function init(releaseUrl) {
    const options = {
        name: PLUGIN_NAME,
        urls: {
            darwin: `${releaseUrl}/lib${PLUGIN_NAME}.dylib`,
            windows: `${releaseUrl}/${PLUGIN_NAME}.dll`,
            linux: `${releaseUrl}/lib${PLUGIN_NAME}.so`,
        },
    };
    await prepare(options);
    mongoPluginId = DenoCore.ops()["mongo_command"];
    DenoCore.setAsyncHandler(mongoPluginId, (msg) => {
        const { command_id, data } = JSON.parse(decoder.decode(msg));
        const resolver = pendingCommands.get(command_id);
        resolver && resolver(data);
    });
}
export function encode(str) {
    return encoder.encode(str);
}
export function decode(data) {
    return decoder.decode(data);
}
export function dispatch(command, ...data) {
    const control = encoder.encode(JSON.stringify(command));
    if (!mongoPluginId) {
        throw new Error("The plugin must be initialized before use");
    }
    return DenoCore.dispatch(mongoPluginId, control, ...data);
}
export function dispatchAsync(command, ...data) {
    return new Promise((resolve) => {
        const commandId = nextCommandId++;
        pendingCommands.set(commandId, resolve);
        const control = encoder.encode(JSON.stringify({
            ...command,
            command_id: commandId,
        }));
        if (!mongoPluginId) {
            throw new Error("The plugin must be initialized before use");
        }
        DenoCore.dispatch(mongoPluginId, control, ...data);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUdyQyxhQUFhO0FBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBUXJCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUM7QUFFakMsSUFBSSxhQUFxQixDQUFDO0FBRTFCLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUNsQyxNQUFNLGVBQWUsR0FBeUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV4RSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFRdEIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsVUFBa0I7SUFDM0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsR0FBRyxVQUFVLE9BQU8sV0FBVyxRQUFRO1lBQy9DLE9BQU8sRUFBRSxHQUFHLFVBQVUsSUFBSSxXQUFXLE1BQU07WUFDM0MsS0FBSyxFQUFFLEdBQUcsVUFBVSxPQUFPLFdBQVcsS0FBSztTQUM1QztLQUNGLENBQUM7SUFFRixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2QixhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRWhELFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBZSxFQUFFLEVBQUU7UUFDMUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxHQUFXO0lBQ2hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxJQUFnQjtJQUNyQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQ3RCLE9BQWdCLEVBQ2hCLEdBQUcsSUFBdUI7SUFFMUIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7S0FDOUQ7SUFDRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBRSxDQUFDO0FBQzdELENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixPQUFnQixFQUNoQixHQUFHLElBQXVCO0lBRTFCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixNQUFNLFNBQVMsR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUNsQyxlQUFlLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2IsR0FBRyxPQUFPO1lBQ1YsVUFBVSxFQUFFLFNBQVM7U0FDdEIsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUM5RDtRQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9