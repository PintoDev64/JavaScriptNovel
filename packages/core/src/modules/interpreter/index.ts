class NovelJsInterpreter implements NInterpreterModule.IInterpreter {
    static instance: NInterpreterModule.IInterpreter;
    private instructions: NInterpreterModule.IInstructionsStructure = {
        Scenes: [],
        Specials: [],
        Variables: []
    };

    private constructor() {}

    static getInstance() {
        if (!NovelJsInterpreter.instance) NovelJsInterpreter.instance = new NovelJsInterpreter();
        return NovelJsInterpreter.instance
    }

    setInstructions(InstruccionObject: NInterpreterModule.IInstructionsStructure): void {
        this.instructions = InstruccionObject
    }


    getInstructions(): NInterpreterModule.IInstructionsStructure {
        return this.instructions
    }
}

const EngineInterpreter = NovelJsInterpreter.getInstance()
export default EngineInterpreter