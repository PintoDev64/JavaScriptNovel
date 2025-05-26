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

    private compileScripts: NParser.INode[] = []
    private instructionMap: IInstructionMap = {};

    ready: Promise<void> | true

    private constructor() {
        const InstanceEngineConfig = EngineConfig.getInstance()

        console.log("EngineInstructor: ", InstanceEngineConfig.getConfigKey("scripts"));

        this.ready = novelScriptCompiler(InstanceEngineConfig.getConfigKey("scripts")!)
            .then((nodes) => {
                this.setCompiledScript(nodes)
                this.setInstructionMap(nodes)
                this.ready = true
            })
            .catch(err => console.log(err))
    }

    static getInstance() {
        if (!EngineInstructor.INSTANCE) EngineInstructor.INSTANCE = new EngineInstructor();
        return EngineInstructor.INSTANCE
    }

    private setCompiledScript(nodes: NParser.INode[]): void {
        this.compileScripts = nodes
    }

    private setInstructionMap(nodes: NParser.INode[]): void {
        const filteredNodes = nodes.filter(({ type, name }) => type === "FunctionDeclaration" && name == "Scene")

        filteredNodes.forEach(({ arguments: args, body }) => {
            const InstructionLocation = args![0].value as string
            this.instructionMap[InstructionLocation] = body!
        })
    }

    getCompileScript(): NParser.INode[] {
        return this.compileScripts
    }

    getInstructionMap(): IInstructionMap {
        return this.instructionMap
    }
}