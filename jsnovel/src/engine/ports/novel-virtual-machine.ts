export interface INovelVirtualMachine {
    getInstructionList(): void
    nextInstruction(): void
    previusInstruction(): void
    notifyInstruction(): void
    stop(): void
    start(): void
}