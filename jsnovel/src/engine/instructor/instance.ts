import {
    IInstructionMap,
    IInstructor
} from "../types/instructor";

// Modules
import novelScriptCompiler from "../compiler";
import EngineConfig from "../config/instance";
import { NParser } from "../types/compiler";

export default class Instructor implements IInstructor {
    static INSTANCE: Instructor | null = null
    private instructionMap: IInstructionMap = {};
    ready: Promise<void> | true

    private constructor() {
        const InstanceEngineConfig = EngineConfig.getInstance()
        this.ready = novelScriptCompiler(InstanceEngineConfig.getConfigKey("scripts")!)
            .then((nodes) => {
                this.setNodeSceneBody(nodes)
                this.ready = true
            })
            .catch(err => console.log(err))
    }

    private setNodeSceneBody(nodes: NParser.INode[]): void {
        nodes.filter(({ type, name }) => type === "FunctionDeclaration" && name == "Scene")
        nodes.forEach(({ arguments: args, body }) => {
            const InstructionLocation = args![0].value as string
            this.instructionMap[InstructionLocation] = body!
        })
    }

    static getInstance() {
        if (!Instructor.INSTANCE) Instructor.INSTANCE = new Instructor();
        return Instructor.INSTANCE
    }

    setInstructionLocation(): void {

    }

    getInstructionLocation(): void {

    }
}