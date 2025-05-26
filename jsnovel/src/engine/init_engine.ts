// Modules
import MediaInstance from "./media/instance";
import EngineInstructor from "./instructor/instance";
import CharacterManager from "./character/instance";
import StateManager from "./state_manager/instance";

export default class InitEngine {
    static INSTANCE: InitEngine | null = null;

    private constructor() { }

    static async startInstance(): Promise<InitEngine> {
        if (!InitEngine.INSTANCE) {
            InitEngine.INSTANCE = new InitEngine();
            await InitEngine.INSTANCE.initialize();
        }
        return InitEngine.INSTANCE;
    }

    private async initialize(): Promise<void> {
        const engineInstructorInstance = EngineInstructor.getInstance();
        await engineInstructorInstance.ready

        const scriptNodes = engineInstructorInstance.getCompileScript()

        console.log("InitEngine: ",scriptNodes);

        StateManager.setInstance(scriptNodes);
        MediaInstance.setInstance(scriptNodes);
        CharacterManager.setInstance(scriptNodes);

        await Promise.resolve();
    }
}