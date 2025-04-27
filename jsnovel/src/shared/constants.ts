import { IEngineConfigStructure } from "src/engine/types/config"
import { resolve } from "node:path"

export const PROJECT_PATH = process.cwd()
export const LIBRARY_PATH = resolve(__dirname, "../../")
export const TEST_PATH = resolve(__dirname, "../../files")

export const DEFAULT__CONFIG: IEngineConfigStructure = {
    assets: resolve(process.env["MODE"] === "test" ? TEST_PATH : PROJECT_PATH, "assets"),
    backend: resolve(process.env["MODE"] === "test" ? TEST_PATH : PROJECT_PATH, "backend"),
    scripts: resolve(process.env["MODE"] === "test" ? TEST_PATH : PROJECT_PATH, "scripts")
}