import { ReactNode, useReducer } from "react";

// Contexts
import { LenguageContext } from "..";

// Reducer
import LenguageReducer from "./reducer";
import { useElectron } from "../../hooks";

interface LenguageProviderProps {
    children: ReactNode;
}

/**
 * Devuelve un envoltorio de los lenguajes que quieres soportar
 */
export default function LenguageProvider({ children }: LenguageProviderProps) {

    const { PreloadContent } = useElectron()

    const dictionary = JSON.parse(PreloadContent().lenguage as unknown as string) as ApiDeclarations.PreloadContent['lenguage']

    const Initialize: ContextContent.LenguageValue = {
        location: 'en',
        dictionary
    }

    const [LenguageState, dispatch] = useReducer(LenguageReducer, Initialize)

    function ChangeLenguageState(data: ContextContent.LenguageReducer) { dispatch(data) }

    return (
        <LenguageContext.Provider value={{
            LenguageState,
            ChangeLenguageState
        }}>
            {children}
        </LenguageContext.Provider>
    )
}