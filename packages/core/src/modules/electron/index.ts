import { app, BrowserWindow, ipcMain } from 'electron';
import { DEFAULT_VALUES } from '../../constants';
import { Colors } from '../../utils';
import ERROR_DEFINITIONS from '../../error';

class ElectronInstance implements NElectronModule.IElectronInstance {
    private static instance: ElectronInstance;
    private _app: Electron.App;
    private _browserWindow: Electron.BrowserWindow | null = null;
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
    createBrowserWindow(): Electron.BrowserWindow {
        return this._browserWindow = new BrowserWindow(DEFAULT_VALUES.ELECTRON);
    }
    startBrowserWindow(): void {
        if (!this._browserWindow) throw new Error(
            Colors.ErrorText(`${this.constructor.name} - ${ERROR_DEFINITIONS.ELECTRON.BROWSER_WINDOW} has no browser window`)
        );
        
        console.log(process.env.NODE_ENV);

        this._browserWindow.loadFile('index.html');
    }
    getBrowserWindow(): Electron.BrowserWindow {
        if (!this._browserWindow) throw new Error(
            Colors.ErrorText(`${this.constructor.name} - ${ERROR_DEFINITIONS.ELECTRON.BROWSER_WINDOW} has no browser window`)
        );

        return this._browserWindow;
    }
    getApp(): Electron.App {
        return this._app;
    }
    getIpcMain(): typeof Electron.ipcMain {
        return this._ipcMain;
    }
}

const electron = ElectronInstance.getInstance();
export default electron;