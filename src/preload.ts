// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { ListEvents, WebEvents } from "./constants";

const api: Api = {
  windowControls: (eventType: "close" | "maximize" | "minimize") => {
    ipcRenderer.send(ListEvents.windowControl, eventType);
  },
  PreloadContent: () => {
    return ipcRenderer.sendSync(WebEvents.PreloadContent);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("noveljs", api);
  } catch (error) {
    console.error(error);
  }
}
