import {
    NParser
} from "./compiler"

export interface IInstructionMap {
    [k: string]: NParser.INode[]
}

export interface IInstructor {
    ready: Promise<void> | boolean
    getInstructionMap(): IInstructionMap
}