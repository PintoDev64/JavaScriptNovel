import type { INovelVirtualMachine } from "./types/novel-virtual-machine";
import { NParser } from "./types/compiler";

// Modules
import MediaInstance from "./media/instance";
import EngineInstructor from "./instructor/instance";

export default class NovelVirtualMachine implements INovelVirtualMachine {
    static INSTANCE: NovelVirtualMachine | null = null;

    private interval: NodeJS.Timeout | null = null
    private instructionsList: NParser.INode[] = []

    private constructor() {
        const engineInstructorInstance = EngineInstructor.getInstance()
        const engineMediaInstance = MediaInstance.getInstance()
        
    }

    getInstructionList(): NParser.INode[] {
        return this.instructionsList
    }
    setInstructionList(nodes: NParser.INode[]): void {
        this.instructionsList = nodes
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

        }, 100)
    }
    static startInstance(): NovelVirtualMachine {
        if (!NovelVirtualMachine.INSTANCE) NovelVirtualMachine.INSTANCE = new NovelVirtualMachine();
        return NovelVirtualMachine.INSTANCE
    }
}