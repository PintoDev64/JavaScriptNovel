import { Colors } from "../utils";

const ERROR_DEFINITIONS = {
    SETTINGS: {
        MISSING: "File is missing or default values cannot be loaded",
        INVALID: "The file or content is invalid"
    },
    ELECTRON: {
        BROWSER_WINDOW: "The browser window has not been created",
        IPC_MAIN: "The ipc main has not been created"
    },
    UTILITIES: {
        JSON_FILE: "The file is missing or the content is invalid"
    }
}

class NovelCoreError extends Error {
    constructor(instanceName: string, cause: string, stackTrace: boolean = true) {
        super(Colors.ErrorText(cause));

        this.name = instanceName;
        this.cause = cause;
        if (stackTrace === false) this.stack = "";

        console.error(
            `${Colors.InfoText("NovelJs Core Exception")}\n`,
            `Name: ${this.name}\n`,
            `${this.message}\n`,
            this.stack ? `${this.stack}\n` : ""
        )
        process.exit(1)
    }
}

export {
    ERROR_DEFINITIONS,
    NovelCoreError
};