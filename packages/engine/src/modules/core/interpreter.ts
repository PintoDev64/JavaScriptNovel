import { IEngineInterpreter } from "../../classes";
import { IInstructionsStructure, INode } from "../../types";

export default class EngineInterpreter implements IEngineInterpreter {
    static _instance: null | EngineInterpreter = null
    private instructions: IInstructionsStructure = {
        Scenes: [],
        Specials: [],
        Variables: []
    }

    private constructor(instructions: IInstructionsStructure) {
        this.instructions = instructions
    }

    static getInstance(instructions: IInstructionsStructure) {
        if (!EngineInterpreter._instance) EngineInterpreter._instance = new EngineInterpreter(instructions);
        return EngineInterpreter._instance
    }

    setInstruction(type: keyof IInstructionsStructure, value: INode[]): void {
        this.instructions[type] = value
    }

    getScenes(): IInstructionsStructure["Scenes"] {
        return this.instructions.Scenes
    }

    getSpecialVariable(NameVariable: string): unknown {
        return
    }
}