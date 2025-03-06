import type { TNovelJsAPIGameAPI } from "../types"

export function useNovelJsAPI() {
    const { NovelJsAPIGameAPI } = window as TNovelJsAPIGameAPI
    return NovelJsAPIGameAPI
}

export function useGetUserAgent() {
    return window.navigator.userAgent
}