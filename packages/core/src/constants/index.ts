import { join } from "node:path";

export const DEFAULT_VALUES: NConstants.DEFAULT_VALUES = {
    ELECTRON: {
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, "../electron/preload.js")
        }
    },
    // Default values for the settings module
    SETTINGS: {
        interactivity: true,
        port: 3000,
        scriptDir: join(process.cwd(), 'src/scripts'),
    }
}
