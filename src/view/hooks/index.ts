import { LenguageContext } from "../context"
import { useContext } from "react"

export function useLenguage() {
    const Lenguage = useContext(LenguageContext);

    if (Lenguage  === undefined) throw new RangeError("La opcion de lengujes no esta disponible\nEl uso del contexto no es posible fuera de su rango")

    return Lenguage
}

export function useElectron() {
    // @ts-ignore (define in d.ts)
    const { windowControls, PreloadContent } = window.noveljs as Api

    return {
        windowControls,
        PreloadContent
    }
}