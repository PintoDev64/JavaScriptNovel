/**
 * Funcion de cambio de estado del contexto "Lenguage"
 */
export default function LenguageReducer(prevState: ContextContent.LenguageValue, { StateToModify, StateValue }: ContextContent.LenguageReducer) {
    return {
        ...prevState,
        [StateToModify]: StateValue
    }
}