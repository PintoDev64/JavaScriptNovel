import type { IEngineConfigStructure } from "src/engine/ports/config";

// Native Modules
import { resolve } from "node:path"

import {
    PROJECT_PATH
} from "src/shared/constants";

export const DEFAULT__CONFIG: IEngineConfigStructure = {
    assets: resolve(PROJECT_PATH, "assets"),
    backend: resolve(PROJECT_PATH, "backend"),
    scripts: resolve(PROJECT_PATH, "scripts")
}