import type { BrowserWindow, IpcMainEvent } from "electron";
import { ipcMain } from "electron";
import { ListEvents, WebEvents } from "../../constants";
import { fileData } from "../utils";
import { join } from "path";

const LenguagesData = fileData(
  join(__dirname, "../../src/assets/lenguage.json")
);

export function ElectronEvents(mainWindow: BrowserWindow) {
  try {
    ipcMain.on( ListEvents.windowControl, ( _event: IpcMainEvent, WindowEventName: PropDeclarations.windowControl_eventType) => {
        if (WindowEventName === "close") {
          return mainWindow.close();
        } else if (WindowEventName === "minimize") {
          return mainWindow.minimize();
        } else if (WindowEventName === "maximize") {
          if (mainWindow.isMaximized()) return mainWindow.restore();
          return mainWindow.maximize();
        }
      });
    ipcMain.on(WebEvents.PreloadContent, (_event) => _event.returnValue = {
        lenguage: typeof LenguagesData === "string" ? LenguagesData : "",
      });
    } catch (err) {
        console.log(err);
    }
}

export function NodeEvents() {
  return;
}
