// Native Modules
import { globSync } from "node:fs"
import { resolve } from "node:path";

import {
    LIBRARY_PATH,
    PROJECT_PATH
} from "./constants";

function resolvedPath(basePath: string, pattern: string | string[]): string {
    return Array.isArray(pattern)
        ? resolve(basePath, ...pattern)
        : resolve(basePath, pattern)
}

export function searchFilesFromProject(pattern: string | string[]): string[] {
    let searchPath = resolvedPath(PROJECT_PATH, pattern)
    return globSync(searchPath)
}

export function searchFilesFromLibrary(pattern: string | string[]): string[] {
    let searchPath = resolvedPath(LIBRARY_PATH, pattern)
    return globSync(searchPath)
}