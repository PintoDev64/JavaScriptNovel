import { useLenguage } from "../../../hooks"

const { LenguageState } = useLenguage()

export const OptionsList = {
    File: [
        {
            name: LenguageState.dictionary
        }
    ]
}