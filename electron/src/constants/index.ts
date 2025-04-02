import { join } from "node:path";
import { Utilities } from "../utils";

import { NConstants } from "src/types";

const ELECTORN_PRELOAD_URI = join(__dirname, "../files/electron.preload.js")

export const DEFAULT_VALUES: NConstants.DEFAULT_VALUES = {
    ELECTRON: {
        width: 800,
        height: 600,
        webPreferences: {
            preload: ELECTORN_PRELOAD_URI
        }
    },
    // Default values for the settings module
    SETTINGS: {
        interactivity: true,
        port: 3000,
        advanced: {
            indexFile: Utilities.getProjectFiles("./index.html")
        },
        traslator: join(process.cwd(), 'src/i18n.csv'),
        scripts: join(process.cwd(), 'src/scripts'),
    }
}
