import { contextBridge } from "electron";
import settings from "../modules/settings";

const SettingsPort = settings.getConfigKey("port");

const GameAPI = {};
const DevAPI = {};

contextBridge.exposeInMainWorld("GameAPI", GameAPI);
if (SettingsPort) {
    contextBridge.exposeInMainWorld("DevAPI", DevAPI);
}