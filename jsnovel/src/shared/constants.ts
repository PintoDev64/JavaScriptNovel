import { IEngineConfigStructure } from "src/engine/ports/config"
import { resolve } from "node:path"

export const PROJECT_PATH = process.cwd()
export const LIBRARY_PATH = resolve(__dirname, "../")

export const DEFAULT__CONFIG: IEngineConfigStructure = {
    assets: resolve(PROJECT_PATH, "assets"),
    backend: resolve(PROJECT_PATH, "backend"),
    scripts: resolve(PROJECT_PATH, "scripts")
}