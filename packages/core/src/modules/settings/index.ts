import { join } from "node:path";
import { DEFAULT_VALUES } from "../../constants";
import { Utilities } from "../../utils";

class Settings implements NSettingsModule.ISettings {
    private static instance: NSettingsModule.ISettings;
    private config: NSettingsModule.ISettignsStructure = {};

    private constructor() { }
    /**
     * Get the instance of the settings module
     */
    static getInstance(): NSettingsModule.ISettings {
        if (Settings.instance) Settings.instance = new Settings();

        const ConfigFile = Utilities.getSyncJSONFile(
            join(process.cwd(), 'settings.json')
        );

        if (ConfigFile) Settings.instance.setConfig(ConfigFile);
        else Settings.instance.setConfig(DEFAULT_VALUES.SETTINGS);

        return Settings.instance;
    }
    getConfig(): NSettingsModule.ISettignsStructure {
        return this.config;
    }
    setConfig(config: NSettingsModule.ISettignsStructure): void {
        if (!config) throw new Error('Config object is required');
        this.config = config;
    }
}

const settings = Settings.getInstance();
export default settings;