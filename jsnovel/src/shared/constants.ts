import { IEngineConfigStructure } from "../engine/types/config"
import { resolve } from "node:path"

export const PROJECT_PATH = process.cwd()
export const USER_PROJECT_PATH = resolve(PROJECT_PATH, "src")
export const LIBRARY_PATH = resolve(__dirname, "../../")
export const TEST_PATH = resolve(__dirname, "../../../mocks")

export const DEFAULT__CONFIG: IEngineConfigStructure = process.env.NODE_ENV === "development"
    ? {
        assets: resolve(TEST_PATH, "assets"),
        backend: resolve(TEST_PATH, "backend"),
        scripts: resolve(TEST_PATH, "scripts")
    }
    : {
        assets: resolve(USER_PROJECT_PATH, "assets"),
        backend: resolve(USER_PROJECT_PATH, "backend"),
        scripts: resolve(USER_PROJECT_PATH, "scripts")
    }