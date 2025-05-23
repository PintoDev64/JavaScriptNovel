import type { INovelVirtualMachine } from "./types/novel-virtual-machine";

// Modules
import MediaInstance from "./media/instance";
import EngineInstructor from "./instructor/instance";
import CharacterManager from "./character/instance";
import StateManager from "./state_manager/instance";

export default class NovelVirtualMachine implements INovelVirtualMachine {
    static INSTANCE: NovelVirtualMachine | null = null;

    private interval: NodeJS.Timeout | null = null

    private constructor() { }
    
    static async startInstance(): Promise<NovelVirtualMachine> {
        if (!NovelVirtualMachine.INSTANCE) {
            NovelVirtualMachine.INSTANCE = new NovelVirtualMachine();
            await NovelVirtualMachine.INSTANCE.initialize();
        }
        return NovelVirtualMachine.INSTANCE;
    }

    private async initialize(): Promise<void> {
        const engineInstructorInstance = EngineInstructor.getInstance();
        await engineInstructorInstance.ready
        
        const scriptNodes = engineInstructorInstance.getCompileScript()
        
        MediaInstance.getInstance(scriptNodes);
        CharacterManager.setInstance(scriptNodes);
        StateManager.getInstance(scriptNodes);
        
    }
    stop(): void {
        this.interval && clearInterval(this.interval)
    }
    start(): void {
        this.interval = setInterval(() => {
            
        }, 100)
    }
}