declare namespace NConstants {
    interface DEFAULT_VALUES {
        readonly ELECTRON: Electron.BrowserWindowOptions;
        readonly SETTINGS: NSettingsModule.ISettignsStructure;
    }
}

declare namespace NSettingsModule {
    type ISettignsStructure = Partial<{
        interactivity: boolean;
        port: number;
        scriptDir: string;
        advanced: {
            electron: Electron.BrowserWindowOptions;
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