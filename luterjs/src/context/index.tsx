// context/MyContext.js
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Button from '../stories/Button/Button';
import Switch from '../stories/Switch/Switch';

interface ContextValue {
    path: number;
    router: {
        name: string;
        image: string;
        content: ReactNode | null
    }[]
    toastElements: {
        title: string;
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
        router: [
            {
                name: "Properties",
                image: "https://avatars.githubusercontent.com/u/84690368?v=4",
                content: (
                    <>
                        <Switch />
                    </>
                )
            },
            {
                name: "Objets",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLxcLzEUZPaeEZ1TJZPEvz1cnvq4JDOT63dw&s",
                content: (
                    <>
                        <Button label='XD' />
                    </>
                )
            }
        ],
        path: 0,
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
