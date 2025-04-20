import { NParser } from "./ports/compiler";
import type { INovelVirtualMachine } from "./ports/novel-virtual-machine";

export default class NovelVirtualMachine implements INovelVirtualMachine {
    static INSTANCE: NovelVirtualMachine | null = null;
    private interval: NodeJS.Timeout | null = null
    private instructionsList: NParser.INode[] | null = null

    private constructor() {
        
    }

    getInstructionList(): void {
        throw new Error("Method not implemented.");
    }
    nextInstruction(): void {
        throw new Error("Method not implemented.");
    }
    previusInstruction(): void {
        throw new Error("Method not implemented.");
    }
    notifyInstruction(): void {
        throw new Error("Method not implemented.");
    }
    stop(): void {
        clearInterval(this.interval!)
    }
    start(): void {
        this.interval = setInterval(() => {

        }, 45)
    }
    static startInstance(): NovelVirtualMachine {
        if (!NovelVirtualMachine.INSTANCE) NovelVirtualMachine.INSTANCE = new NovelVirtualMachine();
        return NovelVirtualMachine.INSTANCE
    }
}