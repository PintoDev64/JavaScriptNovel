import {
    IInstructionMap,
    IInstructor
} from "../types/instructor";

// Modules
import novelScriptCompiler from "../compiler";
import EngineConfig from "../config/instance";
import { NParser } from "../types/compiler";

export default class EngineInstructor implements IInstructor {
    static INSTANCE: EngineInstructor | null = null

    private instructionMap: IInstructionMap = {};

    ready: Promise<void> | true

    private constructor() {
        const InstanceEngineConfig = EngineConfig.getInstance()
        this.ready = novelScriptCompiler(InstanceEngineConfig.getConfigKey("scripts")!)
            .then((nodes) => {
                this.setInstructionMap(nodes)
                this.ready = true
            })
            .catch(err => console.log(err))
    }

    static getInstance() {
        if (!EngineInstructor.INSTANCE) EngineInstructor.INSTANCE = new EngineInstructor();
        return EngineInstructor.INSTANCE
    }

    private setInstructionMap(nodes: NParser.INode[]): void {
        const filteredNodes = nodes.filter(({ type, name }) => type === "FunctionDeclaration" && name == "Scene")

        filteredNodes.forEach(({ arguments: args, body }) => {
            const InstructionLocation = args![0].value as string
            this.instructionMap[InstructionLocation] = body!
        })
    }

    getInstructionMap(): IInstructionMap {
        return this.instructionMap
    }
}