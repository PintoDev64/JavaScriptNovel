export default function ASTReader(ASTLenguaje: LenguajeAST, ASTVisitor: ASTVisitor) {

    function ReadArray(ASTArray: LenguajeAST[], parent: LenguajeAST) {
        ASTArray.forEach(child => {
            ReadNode(child, parent);
        });
    }

    function ReadNode(ASTNode: LenguajeAST, parent: LenguajeAST | null) {
        let MethodsThree = ASTVisitor[ASTNode.type]

        if (MethodsThree && MethodsThree.enter) {
            MethodsThree.enter(ASTNode, parent)
        }

        switch (ASTNode.type) {
            case "Program":
                ReadArray(ASTNode.body, ASTNode)
                break;

            case "CallExpression":
                ReadArray(ASTNode.params, ASTNode)
                break;

            case "NumberLiteral":
                break;

            case "StringLiteral":
                break;
        
            default:
                throw new TypeError(`Unknown AST Node Type: ${ASTNode.type}`)
        }

        if (MethodsThree && MethodsThree.exit) {
            MethodsThree.exit(ASTNode, parent)
        }
    }

    ReadNode(ASTLenguaje, null)
}