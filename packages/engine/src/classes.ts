import { IInstructionsStructure, INode } from "./types"

export interface IEngineInterpreter {
    setInstruction(type: keyof IInstructionsStructure, value: INode[]): void
    getScenes(): IInstructionsStructure["Scenes"]
    getSpecialVariable(): unknown
}