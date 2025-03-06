import { NParser } from "noveljs.compiler/dist/types/src/types";

export namespace NUtils {
    export interface Colors {
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
    export interface LogFunctions {
        Process: (text: string) => void
    }
    export interface Utilities {
        /**
         * 
         */
        getEnviroment: () => string | undefined
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
        /**
         * Get the path to the library files
         * @returns The path to the library local files
         */
        getLibraryFiles: () => string;
        /**
         * Get the path to the project files
         * @returns The path to the project files
         */
        getProjectFiles: (fileURL: string) => string;
    }
}

export namespace NConstants {
    export interface DEFAULT_VALUES {
        readonly ELECTRON: Electron.BrowserWindowConstructorOptions;
        readonly SETTINGS: Partial<NSettingsModule.ISettignsStructure>;
    }
}

export namespace NElectronModule {
    export interface IElectronInstance {
        /**
         * Get the electron app instance
         */
        getApp(): Electron.App;
        /**
         * Create a new browser window
         */
        createBrowserWindow(): void;
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
        getIpcMain(): Electron.IpcMain;
    }
}

export namespace NSettingsModule {
    export type ISettignsStructure = Partial<{
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
        scripts: string;
        /**
         * The path to the translator file
         */
        traslator: string;
        advanced: Partial<{
            indexFile: string
        }>;
    }>
    export interface ISettings {
        /**
         * Get the actual configuration object
         */
        getConfig(): ISettignsStructure;
        /**
         * Set the configuration object
         */
        setConfig(config: ISettignsStructure): void;
        /**
         * Get a specific key from the configuration object
         */
        getConfigKey(key: keyof ISettignsStructure): any;
    }
}

export namespace NInterpreterModule {
    export interface IInstructionsStructure {
        Variables: NParser.INode[]
        Specials: NParser.INode[]
        Scenes: NParser.INode[]
    }

    export interface IInterpreter {
        setInstructions(InstruccionObject: NInterpreterModule.IInstructionsStructure): void
        getInstructions(): IInstructionsStructure
    }
}