export type IEngineConfigStructure = Partial<{
    scripts: string
    backend: string
    assets: string
}>

export interface IEngineConfig {
    setConfig(options: IEngineConfigStructure): void
    getConfig(): IEngineConfigStructure
    getConfigKey<T extends keyof IEngineConfigStructure>(key: T): IEngineConfigStructure[T]
}