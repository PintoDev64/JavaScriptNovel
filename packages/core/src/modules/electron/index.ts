import { app, BrowserWindow, ipcMain } from 'electron';
import { DEFAULT_VALUES } from '../../constants';
import { Utilities } from '../../utils';
import { ERROR_DEFINITIONS, NovelCoreError } from '../../error';

export default class ElectronInstance implements NElectronModule.IElectronInstance {
    private static instance: ElectronInstance;
    private _app: typeof app;
    private _browserWindow: BrowserWindow | null = null;
    private _ipcMain: typeof ipcMain;

    private constructor() {
        this._app = app;
        this._ipcMain = ipcMain;
    }
    /**
     * Get the instance of the electron module
     * @returns The instance of the electron module
     */
    static getInstance(): ElectronInstance {
        if (!ElectronInstance.instance) ElectronInstance.instance = new ElectronInstance();
        return ElectronInstance.instance;
    }
    createBrowserWindow(): BrowserWindow {
        return this._browserWindow = new BrowserWindow(DEFAULT_VALUES.ELECTRON);
    }
    startBrowserWindow(): void {
        if (!this._browserWindow) throw new NovelCoreError(
            this.constructor.name,
            ERROR_DEFINITIONS.ELECTRON.BROWSER_WINDOW
        )

        console.log(process.env["NODE_ENV"]);
        console.log(Utilities.getProjectFiles('index.html'));
        this._browserWindow.loadFile(Utilities.getProjectFiles('index.html'));
    }
    getBrowserWindow(): BrowserWindow {
        if (!this._browserWindow) throw new NovelCoreError(
            this.constructor.name,
            ERROR_DEFINITIONS.ELECTRON.BROWSER_WINDOW
        )

        return this._browserWindow;
    }
    getApp(): typeof app {
        return this._app;
    }
    getIpcMain(): typeof ipcMain {
        return this._ipcMain;
    }
}