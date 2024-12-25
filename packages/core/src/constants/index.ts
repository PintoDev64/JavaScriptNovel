import { join } from "node:path";

export const DEFAULT_VALUES: NConstants.DEFAULT_VALUES = {
    ELECTRON: {
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, "../files/electron_preload.js")
        }
    },
    // Default values for the settings module
    SETTINGS: {
        interactivity: true,
        port: 3000,
        traslator: join(process.cwd(), 'src/i18n.csv'),
        scriptDir: join(process.cwd(), 'src/scripts'),
    }
}
