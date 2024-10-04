export function Traverser(ASTLenguage: AstBase, ASTVisitor: AstVisitor) {
    function ReadASTNode(ASTNode: AstStructure, parent: AstStructure | null) {
        if (!ASTNode) {
            throw new Error("(Traverser) The AST node does not exist");
        }

        // Verificamos si el visitor tiene definido el método correspondiente para el tipo de nodo
        let MethodsTree = ASTVisitor[ASTNode.type];

        if (!MethodsTree) {
            throw new Error(`(Traverser) The Visitor method tree does not exist for node type: ${ASTNode.type}`);
        }

        // Ejecutamos el método "Enter" si existe
        if (MethodsTree.Enter) {
            MethodsTree.Enter(ASTNode, parent);
        }

        // Dependiendo del tipo de nodo, recorremos las propiedades relevantes
        switch (ASTNode.type) {
            case "Program":
                // Solo verificamos si tiene `body` cuando es un nodo `Program`
                if (!ASTNode.body) {
                    throw new Error("(Traverser) The Program node is missing the `body` property");
                }
                ReadASTArray(ASTNode.body, ASTNode);
                break;

            case "CallExpression":
                // Para `CallExpression`, solo validamos `params`
                if (!ASTNode.params) {
                    throw new Error("(Traverser) The CallExpression node is missing the `params` property");
                }
                ReadASTArray(ASTNode.params, ASTNode);
                break;

            case "GlobalContext":
            case "AudioContext":
            case "ImageContext":
            case "VideoContext":
            case "CharacterContext":
                // Estos nodos solo tienen `name` y `value`, no necesitan `body` o `params`
                break;

            case "NumberLiteral":
            case "StringLiteral":
            case "Identifier":
                // Los literales y los identificadores no necesitan `body` o `params`
                break;

            default:
                throw new Error(`(Traverser) Unknown AST Node Type: ${ASTNode.type}`);
        }

        // Ejecutamos el método "Exit" si existe
        if (MethodsTree.Exit) {
            MethodsTree.Exit(ASTNode, parent);
        }
    }

    function ReadASTArray(ASTArray: AstStructure[], parent: AstStructure | null) {
        for (let AST of ASTArray) {
            ReadASTNode(AST, parent);
        }
    }

    ReadASTNode(ASTLenguage, null);
}
