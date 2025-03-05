/// <reference types="vite/client" />

declare type TNovelJsAPIGameAPI = {
    NovelJsAPIGameAPI: {
        GetInstructions(): unknown
    }
} & Window & typeof globalThis

declare namespace NNovelJsContext {
    interface NovelJsWebContext {

        userAgent: string
    }
}