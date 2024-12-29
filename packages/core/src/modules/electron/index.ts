import { app, BrowserWindow, ipcMain } from 'electron';
import { DEFAULT_VALUES } from '../../constants';
import { Colors, Utilities } from '../../utils';
import ERROR_DEFINITIONS from '../../error';

class ElectronInstance implements NElectronModule.IElectronInstance {
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
        if (!this._browserWindow) throw new Error(
            Colors.ErrorText(`${this.constructor.name} - ${ERROR_DEFINITIONS.ELECTRON.BROWSER_WINDOW}: has no browser window`)
        );
        
        console.log(process.env.NODE_ENV);

        this._browserWindow.loadFile(Utilities.getProjectFiles('index.html'));
    }
    getBrowserWindow(): BrowserWindow {
        if (!this._browserWindow) throw new Error(
            Colors.ErrorText(`${this.constructor.name} - ${ERROR_DEFINITIONS.ELECTRON.BROWSER_WINDOW}: has no browser window`)
        );

        return this._browserWindow;
    }
    getApp(): typeof app {
        return this._app;
    }
    getIpcMain(): typeof ipcMain {
        return this._ipcMain;
    }
}

const electron = ElectronInstance.getInstance();
export default electron;