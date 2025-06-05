
import { app, BrowserWindow, ipcMain } from "electron";
import { join, resolve } from "path";
import { loadEnvFile } from "process";

loadEnvFile(resolve(process.cwd(), ".development.env"));

import { PROJECT_PATH } from "../../shared/constants";
import registerEvents from "./events";

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
    await registerEvents(ipcMain)

    mainWindow = new BrowserWindow({
        width: 960,
        height: 640,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            nodeIntegration: false,
        },
        title: "NovelJs - Preview",
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:5173");
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