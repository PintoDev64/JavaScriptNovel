const ERROR_DEFINITIONS = {
    SETTINGS: {
        /**
         * Failed to load configuration file
         * @reason File is missing or default values ​​cannot be loaded
         */
        MISSING: "SETTINGS_MISSING",
        INVALID: "SETTINGS_INVALID"
    },
    ELECTRON: {
        BROWSER_WINDOW: "ELECTRON_BROWSER_WINDOW",
        IPC_MAIN: "ELECTRON_IPC_MAIN"
    },
}

export default ERROR_DEFINITIONS;