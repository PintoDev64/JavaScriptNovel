import { createContext, ReactNode } from "react"

const NovelJsWebContext = createContext<null>(null)

function NovelJsWebContextComponent({ children }: { children: ReactNode }) {
    
    return (
        <NovelJsWebContext value={null}>
        { children }
        </NovelJsWebContext>
    )
}

export {
    NovelJsWebContext,
    NovelJsWebContextComponent
}