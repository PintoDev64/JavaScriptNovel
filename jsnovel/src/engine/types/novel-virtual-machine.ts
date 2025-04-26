import { NParser } from "./compiler"

export interface INovelVirtualMachine {
    ready?: Promise<void> | boolean
    getInstructionList(): NParser.INode[]
    nextInstruction(): void
    previusInstruction(): void
    notifyInstruction(): void
    stop(): void
    start(): void
}