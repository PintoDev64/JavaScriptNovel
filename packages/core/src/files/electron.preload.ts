import { contextBridge } from "electron";

const GameAPI = {};
const DevAPI = {};

contextBridge.exposeInMainWorld("GameAPI", GameAPI);
if (true) {
    contextBridge.exposeInMainWorld("DevAPI", DevAPI);
}