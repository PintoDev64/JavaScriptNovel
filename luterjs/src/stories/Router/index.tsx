import { ReactNode } from "react";

import LuterJsContextProvider from "../../context";

interface RouterProps {
    children: ReactNode
}

export default function Router({ children }: RouterProps) {
    return (
        <LuterJsContextProvider>
            {children}
        </LuterJsContextProvider>
    )
}