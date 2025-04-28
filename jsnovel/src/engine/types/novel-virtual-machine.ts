import { NParser } from "./compiler"

export interface INovelVirtualMachine {
    getInstructionList(): NParser.INode[]
    nextInstruction(): void
    previusInstruction(): void
    notifyInstruction(): void
    stop(): void
    start(): void
}