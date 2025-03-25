import { HTML__id_classes } from "../constants"
import type { TNovelJsAPIGameAPI } from "../types"

type TUseNovelJsAPI<T> = T extends "Application" ? TNovelJsAPIGameAPI<"Application">["NovelJsAPIGameAPI"] : TNovelJsAPIGameAPI<"Web">

export function useNovelJsAPI<T extends "Application" | string>(UserAgent: T): TUseNovelJsAPI<T> {
    if (UserAgent !== "Application") {
        return {
            General: {
                GetKeyboardMap() {},
                GetGameData() {},
                GetInstructions() {},
                GetElectronData() {},
            },
            Memory: {
                GetFunctions() {},
                GetVariables() {}
            }
        } as TUseNovelJsAPI<T>
    }

    const { NovelJsAPIGameAPI } = window as TNovelJsAPIGameAPI<"Application">
    return NovelJsAPIGameAPI as unknown as TUseNovelJsAPI<T>
}

export function useGetUserAgent() {
    return window.navigator.userAgent
}

export function createIDClassName(name: string) {
    return `${HTML__id_classes}__${name}`
}