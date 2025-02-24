class NovelJsInterpreter implements NInterpreterModule.IInterpreter {
    static instance: NInterpreterModule.IInterpreter;

    private constructor() {

    }

    static getInstance() {
        if (!NovelJsInterpreter.instance) NovelJsInterpreter.instance = new NovelJsInterpreter();
        return NovelJsInterpreter.instance
    }

    setInstructions(): NInterpreterModule.IInstructionsStructure {
        throw new Error("Method not implemented.");
    }

    getInstructions(): NInterpreterModule.IInstructionsStructure {
        throw new Error("Method not implemented.");
    }
}

const EngineInterpreter = NovelJsInterpreter.getInstance()
export default EngineInterpreter