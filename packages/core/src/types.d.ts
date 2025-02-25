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
    interface LogFunctions {
        Process: (text: string) => void
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

declare namespace NConstants {
    interface DEFAULT_VALUES {
        readonly ELECTRON: Electron.BrowserWindowOptions;
        readonly SETTINGS: Partial<NSettingsModule.ISettignsStructure>;
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
        scripts: string;
        /**
         * The path to the translator file
         */
        traslator: string;
        advanced: Partial<{
            electron: Electron.BrowserWindowOptions;
            indexFile: string
        }>;
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
        /**
         * Get a specific key from the configuration object
         */
        getConfigKey(key: keyof ISettignsStructure): any;
    }
}


declare namespace NParser {
    interface INode {
        type: TNodeType
        name?: string
        value?: string | number | boolean | INode
        arguments?: INode[]
        body?: INode[]
        predirectives?: INode[]
        directives?: INode[]
        elements?: INode[]
    }
}

declare namespace NInterpreterModule {
    interface IInstructionsStructure {
        Variables: NParser.INode[]
        Specials: NParser.INode[]
        Scenes: NParser.INode[]
    }

    interface IInterpreter {
        setInstructions(InstruccionObject: NInterpreterModule.IInstructionsStructure): void
        getInstructions(): IInstructionsStructure
    }
}