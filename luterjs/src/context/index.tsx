// context/MyContext.js
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface ContextValue {
    toastElements: {
        title: string,
        description?: string
    }[]
}
interface LuterJsContext {
    value: ContextValue,
    setValue: Dispatch<SetStateAction<ContextValue>>
}
interface LuterJsContextProps {
    children: ReactNode
}

export const LuterJsContext = createContext<LuterJsContext>(null!);

export default function LuterJsContextProvider({ children }: LuterJsContextProps) {

    const [value, setValue] = useState<ContextValue>({
        toastElements: [
            {
                title: "Titulo Uno",
                description: "lorem ipsum hjsagduavc"
            },
            {
                title: "Titulo Dos"
            },
            {
                title: "Titulo Uno",
                description: "lorem ipsum hjsagduavc"
            },
            {
                title: "Titulo Dos"
            },
        ]
    });

    return (
        <LuterJsContext.Provider value={{ value, setValue }}>
            {children}
        </LuterJsContext.Provider>
    );
};
