import { app, BrowserWindow, ipcMain } from "electron";
import { join, resolve } from "path";
import { loadEnvFile } from "process";
/* import { readFileSync } from "fs";
import { runInThisContext } from "vm"; */

import { PROJECT_PATH } from "../../shared/constants";
import registerEvents from "./events";

loadEnvFile(resolve(PROJECT_PATH, ".development.env"));

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
    await registerEvents(ipcMain)

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

    console.log("--> ", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:5173"); // si estás usando Vite
    } else {
        console.log("--> ", resolve(PROJECT_PATH, "src/shared/index.html"));
        mainWindow.loadFile(resolve(PROJECT_PATH, "src/shared/index.html"));
    }

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    await createWindow()
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});