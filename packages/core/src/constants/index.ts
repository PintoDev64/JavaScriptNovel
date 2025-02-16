import { join } from "node:path";
import { Utilities } from "../utils";

const ELECTORN_PRELOAD_URI = join(Utilities.getLibraryFiles(), "electron_preload.js")

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
        traslator: join(process.cwd(), 'src/i18n.csv'),
        scripts: join(process.cwd(), 'src/scripts'),
    }
}
