import type { INovelVirtualMachine } from "./types/novel-virtual-machine";
import { NParser } from "./types/compiler";

// Modules
import novelScriptCompiler from "./compiler";
import EngineConfig from "./config/instance";

export default class NovelVirtualMachine implements INovelVirtualMachine {
    static INSTANCE: NovelVirtualMachine | null = null;

    private interval: NodeJS.Timeout | null = null
    private instructionsList: NParser.INode[] = []

    counter: number = 0
    ready: Promise<void> | boolean

    private constructor() {
        const engineConfigInstance = EngineConfig.getInstance()
        let engineScriptsConfigLocation = engineConfigInstance.getConfigKey("scripts")!

        this.ready = novelScriptCompiler(engineScriptsConfigLocation)
            .then((nodes) => {
                this.setInstructionList(nodes)
                this.ready = true
            })
            .catch(() => this.setInstructionList([]))
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
            this.counter++
        }, 100)
    }
    static startInstance(): NovelVirtualMachine {
        if (!NovelVirtualMachine.INSTANCE) NovelVirtualMachine.INSTANCE = new NovelVirtualMachine();
        return NovelVirtualMachine.INSTANCE
    }
}