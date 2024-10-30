import { globalShortcut } from "electron";
import type { BrowserWindow } from 'electron'

export default function CreateShortcuts(window: BrowserWindow) {
    globalShortcut.register("CommandOrControl+Shift+Alt+T", () => {
        if (window.isAlwaysOnTop()) return window.setAlwaysOnTop(false) 
        window.setAlwaysOnTop(true)
    });
}
