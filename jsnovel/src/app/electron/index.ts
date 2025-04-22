import { app, BrowserWindow } from "electron";
import { join } from "path";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 640,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            contextIsolation: true, // importante para seguridad
            nodeIntegration: false,
        },
        title: "NovelJs - Preview",
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:5173"); // si estás usando Vite
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, "../dist/index.html"));
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

import("./preload.js")