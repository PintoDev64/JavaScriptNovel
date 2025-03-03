import { contextBridge } from "electron";

const GameAPI = {};
const DevAPI = {};

contextBridge.exposeInMainWorld("NovelJsAPIGameAPI", GameAPI);
if (true) {
    contextBridge.exposeInMainWorld("NovelJsAPIDevAPI", DevAPI);
}