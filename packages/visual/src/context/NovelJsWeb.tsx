import { createContext, ReactNode } from "react"
import { useGetUserAgent, useNovelJsAPI } from "../utils"

const NovelJsWebContext = createContext<null | NNovelJsContext.NovelJsWebContext>(null)

function NovelJsWebContextComponent({ children }: { children: ReactNode }) {

    const {  } = useNovelJsAPI()

    const Instructions = 
    
    return (
        <NovelJsWebContext value={{
            userAgent: useGetUserAgent()
        }}>
        { children }
        </NovelJsWebContext>
    )
}

export {
    NovelJsWebContext,
    NovelJsWebContextComponent
}