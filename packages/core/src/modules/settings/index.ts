import { join } from "node:path";
import { DEFAULT_VALUES } from "../../constants";
import { Utilities } from "../../utils";
import { ERROR_DEFINITIONS, NovelCoreError } from "../../error";

class NovelJsSettings implements NSettingsModule.ISettings {
    static instance: NSettingsModule.ISettings;
    private config: NSettingsModule.ISettignsStructure = {} as NSettingsModule.ISettignsStructure;

    private constructor() { }
    /**
     * Get the instance of the settings module
     */
    static getInstance(): NSettingsModule.ISettings {
        if (!NovelJsSettings.instance) NovelJsSettings.instance = new NovelJsSettings();

        const ConfigFile = Utilities.getSyncJSONFile(
            join(process.cwd(), 'settings.json')
        );

        if (ConfigFile) NovelJsSettings.instance.setConfig(ConfigFile);
        else NovelJsSettings.instance.setConfig(DEFAULT_VALUES.SETTINGS);

        return NovelJsSettings.instance;
    }
    getConfig(): NSettingsModule.ISettignsStructure {
        return this.config;
    }
    getConfigKey<T extends keyof NSettingsModule.ISettignsStructure>(key: T): NSettingsModule.ISettignsStructure[T] {
        return this.config[key];
    }
    setConfig(config: NSettingsModule.ISettignsStructure): void {
        if (!config) throw new NovelCoreError(
            this.constructor.name,
            ERROR_DEFINITIONS.SETTINGS.MISSING
        );
        this.config = config;
    }
}

const LibrarySettings = NovelJsSettings.getInstance()
export default LibrarySettings