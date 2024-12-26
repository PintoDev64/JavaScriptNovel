const ERROR_DEFINITIONS = {
    SETTINGS: {
        /**
         * Failed to load configuration file
         * @reason File is missing or default values ​​cannot be loaded
         */
        MISSING: "SETTINGS_MISSING",
        /**
         * Failed to load configuration file
         * @reason The file or content is invalid
         */
        INVALID: "SETTINGS_INVALID"
    },
    ELECTRON: {
        /**
         * The electron instance has no browser window
         * @reason The browser window has not been created
         */
        BROWSER_WINDOW: "ELECTRON_BROWSER_WINDOW",
        /**
         * The electron instance has no ipc main
         * @reason The ipc main has not been created
         */
        IPC_MAIN: "ELECTRON_IPC_MAIN"
    },
    UTILITIES: {
        /**
         * Failed to get JSON file
         * @reason The file is missing or the content is invalid
         */
        JSON_FILE: "UTILITIES_JSON_FILE"
    }
}

export default ERROR_DEFINITIONS;