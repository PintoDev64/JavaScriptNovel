declare namespace NUtils {
    interface Colors {
        /**
         * Color the text red
         * @param text The text to color
         * @returns The colored text
         */
        ErrorText: (text: string) => string;
        /**
         * Color the text yellow
         * @param text The text to color
         * @returns The colored text
         */
        WarningText: (text: string) => string;
        /**
         * Color the text cyan
         * @param text The text to color
         * @returns The colored text
         */
        InfoText: (text: string) => string;
        /**
         * Color the text green
         * @param text The text to color
         * @returns The colored text
         */
        SuccessText: (text: string) => string;
    }
    interface Utilities {
        /**
         * Get the current date and time
         * @returns The current date and time
         */
        getCurrentDateTime: (local: string) => string;
        /**
         * Get the current content of a JSON file 
         * @param path The path to the JSON file
         * @returns The content of the JSON file
         * @async
         */
        getSyncJSONFile: (path: string) => NSettingsModule.ISettignsStructure | undefined;
    }
}

declare namespace NConstants {
    interface DEFAULT_VALUES {
        readonly ELECTRON: Electron.BrowserWindowConstructorOptions;
        readonly SETTINGS: NSettingsModule.ISettignsStructure;
    }
}

declare namespace NElectronModule {
    interface IElectronInstance {
        /**
         * Get the electron app instance
         */
        getApp(): Electron.App;
        /**
         * Create a new browser window
         */
        createBrowserWindow(): Electron.BrowserWindow;
        /**
         * Start the browser window
         */
        startBrowserWindow(): void;
        /**
         * Get the browser window instance
         */
        getBrowserWindow(): Electron.BrowserWindow;
        /**
         * Get the ipcMain instance
         */
        getIpcMain(): typeof Electron.ipcMain;
    }
}

declare namespace NSettingsModule {
    type ISettignsStructure = Partial<{
        /**
         * Allows you to select components in the game view (development only)
         */
        interactivity: boolean;
        /**
         * The port to run the Vite server on
         */
        port: number;
        /**
         * The directory where the scripts are stored
         */
        scriptDir: string;
        /**
         * The path to the translator file
         */
        traslator: string;
        advanced: {
            electron: Electron.BrowserWindowConstructorOptions;
        };
    }>
    interface ISettings {
        /**
         * Get the actual configuration object
         */
        getConfig(): ISettignsStructure;
        /**
         * Set the configuration object
         */
        setConfig(config: ISettignsStructure): void;

    }
}