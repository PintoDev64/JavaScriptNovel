import { createContext, ReactNode } from "react"
import { useGetUserAgent, useNovelJsAPI } from "../utils"

import type { INovelJsWebContext, TNovelJsAPIGameAPI } from "../types";

/**
 * NovelJs Engine context content
 */
const NovelJsWebContext = createContext<null | INovelJsWebContext>(null)

/**
 * NovelJs Engine context component
 * @param children
 * @returns Context Component
 */
function NovelJsWebContextComponent({ children }: { children: ReactNode }) {

    const { General } = useNovelJsAPI(navigator.userAgent) as unknown as TNovelJsAPIGameAPI<"Application">["NovelJsAPIGameAPI"]
    const { GetInstructions, GetGameData, GetKeyboardMap, GetElectronData } = General

    const ContextObject: INovelJsWebContext = {
        stateLibrary: import.meta.env.MODE,
        stateApplication: GetElectronData(),
        keyboardAssignment: GetKeyboardMap(),
        gameData: GetGameData(),
        instructions: GetInstructions(),
        userAgent: useGetUserAgent()
    }

    return (
        <NovelJsWebContext value={ContextObject}>
            {children}
        </NovelJsWebContext>
    )
}

export {
    NovelJsWebContext,
    NovelJsWebContextComponent
}