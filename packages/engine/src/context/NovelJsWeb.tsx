import { createContext, ReactNode } from "react"
import { useGetUserAgent, useNovelJsAPI } from "../utils"

import type { INovelJsWebContext } from "../types";

const NovelJsWebContext = createContext<null | INovelJsWebContext>(null)

function NovelJsWebContextComponent({ children }: { children: ReactNode }) {

    const { GetInstructions, GetGameData, GetKeyboardMap } = useNovelJsAPI()

    const Instructions = GetInstructions();

    const ContextObject = {
        keyboardAssignment: GetKeyboardMap,
        gameData: GetGameData(),
        instructions: Instructions,
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