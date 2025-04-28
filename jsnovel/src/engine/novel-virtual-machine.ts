import type { INovelVirtualMachine } from "./types/novel-virtual-machine";
import { NParser } from "./types/compiler";

// Modules
import MediaInstance from "./media/instance";
import EngineInstructor from "./instructor/instance";
import CharacterManager from "./character/instance";

export default class NovelVirtualMachine implements INovelVirtualMachine {
    static INSTANCE: NovelVirtualMachine | null = null;

    private interval: NodeJS.Timeout | null = null
    private instructionsList: NParser.INode[] = []

    private constructor() { }

    private async initialize(): Promise<void> {
        const engineInstructorInstance = EngineInstructor.getInstance();
        await engineInstructorInstance.ready

        MediaInstance.getInstance(engineInstructorInstance.getCompileScript());
        CharacterManager.getInstance(engineInstructorInstance.getCompileScript())
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
        this.interval && clearInterval(this.interval)
    }
    start(): void {
        this.interval = setInterval(() => {

        }, 100)
    }
    static async startInstance(): Promise<NovelVirtualMachine> {
        if (!NovelVirtualMachine.INSTANCE) {
            NovelVirtualMachine.INSTANCE = new NovelVirtualMachine();
            await NovelVirtualMachine.INSTANCE.initialize();
        }
        return NovelVirtualMachine.INSTANCE;
    }
}