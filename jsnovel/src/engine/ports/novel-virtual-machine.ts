import type { TNodeTypeUses } from "./compiler"

export interface INovelVirtualMachine {
    getInstructionList(): void
    nextInstruction(): void
    previusInstruction(): void
    notifyInstruction(): void
    stop(): void
    start(): void
}

export type TNVMInstruction =
    [TNodeTypeUses, ...(string | number | boolean | TNVMInstruction)[]] | []