import { app, BrowserWindow, dialog, nativeTheme } from "electron";
import { join, resolve } from "path";

// Events
import { ElectronEvents } from "./app/events";
import CreateShortcuts from "./app/shortcuts";

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient("electron-fiddle", process.execPath, [
        resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient("electron-fiddle");
  }

  nativeTheme.themeSource = "dark";

  const createWindow = () => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      frame: false,
      webPreferences: {
        preload: join(__dirname, "preload.js"),
      },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(
        join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
      );
    }
    
    mainWindow.on("ready-to-show", () => {
      mainWindow.show();
    });
  };

  app.whenReady().then(() => {
    createWindow();
    CreateShortcuts(mainWindow);
    ElectronEvents(mainWindow);
  });

  app.on("second-instance", (event, argv) => {
    // Manejar la URL si ya hay una instancia
    const url = argv.find((arg) => arg.startsWith("electron-fiddle://"));
    if (url && mainWindow) {
      dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
    }
  });

  app.on("open-url", (event, url) => {
    event.preventDefault();
    if (mainWindow) {
      dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}
