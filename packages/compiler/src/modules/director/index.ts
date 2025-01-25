function DefineFunction(INode: NParser.INode, _index?: number): Function {
    const Dictionary = {
        Example(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        },
        CallExpression(INode: NParser.INode) {
            return (_EngineContext: EngineContext, ) => {
                console.log(INode.value)
            }
        },
        FunctionExpression(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        },
        DefinitionExpression(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        },
        UseExpression(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        },
        VariableExpression(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        },
        StringLiteral(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        },
        NumberLiteral(INode: NParser.INode) {
            return (_EngineContext: EngineContext) => {
                console.log(INode.value)
            }
        }
    }

    return Dictionary[INode.type](INode)
}

export default function CompilerDirector(InstructorArray: NParser.INode[]): any | NDirector.IInstructionList {
    return InstructorArray
}