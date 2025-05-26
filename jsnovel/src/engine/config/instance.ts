import { IEngineConfig, IEngineConfigStructure } from "../types/config";

import {
    DEFAULT__CONFIG
} from "../../shared/constants";

export default class EngineConfig implements IEngineConfig {
    static INSTANCE: EngineConfig | null = null
    private options: IEngineConfigStructure = DEFAULT__CONFIG

    private constructor() {}

    static getInstance() {
        if (!EngineConfig.INSTANCE) EngineConfig.INSTANCE = new EngineConfig();
        return EngineConfig.INSTANCE
    }

    getConfig(): IEngineConfigStructure {
        return this.options
    }

    setConfig(options: IEngineConfigStructure): void {
        this.options = { ...this.options, ...options }
    }

    getConfigKey<T extends keyof IEngineConfigStructure>(key: T): IEngineConfigStructure[T] {
        return this.options[key]
    }
}