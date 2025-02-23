import { contextBridge } from "electron";
import NovelJsSettings from "../modules/settings";

const SettingsPort = NovelJsSettings.getConfigKey("port");

const GameAPI = {};
const DevAPI = {};

contextBridge.exposeInMainWorld("GameAPI", GameAPI);
if (SettingsPort) {
    contextBridge.exposeInMainWorld("DevAPI", DevAPI);
}