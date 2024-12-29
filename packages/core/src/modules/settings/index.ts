import { join } from "node:path";
import { DEFAULT_VALUES } from "../../constants";
import { Colors, Utilities } from "../../utils";
import ERROR_DEFINITIONS from "../../error";

class Settings implements NSettingsModule.ISettings {
    static instance: NSettingsModule.ISettings;
    private config: NSettingsModule.ISettignsStructure = {} as NSettingsModule.ISettignsStructure;

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
    getConfigKey(key: keyof NSettingsModule.ISettignsStructure): any {
        return this.config[key];
    }
    setConfig(config: NSettingsModule.ISettignsStructure): void {
        if (!config) throw new Error(
            Colors.ErrorText(`${this.constructor.name} - ${ERROR_DEFINITIONS.SETTINGS.MISSING}: failed to load configuration file`)
        );
        this.config = config;
    }
}

const settings = Settings.getInstance();
export default settings;