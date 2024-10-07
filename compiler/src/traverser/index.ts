type NodeSelector = Partial<Record<
    GlobalExpectType,
    () => void
>>

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

        const ASTNodeSelector: NodeSelector = {
            Program: () => {
                if (!ASTNode.body) {
                    throw new Error("(Traverser) The Program node is missing the `body` property");
                }
                ReadASTArray(ASTNode.body, ASTNode);
            },
            CallExpression: () => {
                if (!ASTNode.params) {
                    throw new Error("(Traverser) The CallExpression node is missing the `params` property");
                }
                ReadASTArray(ASTNode.params, ASTNode);
            },
            GlobalContext: () => { },
            AudioContext: () => { },
            ImageContext: () => { },
            VideoContext: () => { },
            CharacterContext: () => { },
            NumberLiteral: () => { },
            StringLiteral: () => { },
            Identifier: () => { }
        };
        
        if (!ASTNodeSelector[ASTNode.type]) {
            throw new Error(`(Traverser) Unknown Nodetype ${ASTNode.type}`);
        }
        
        ASTNodeSelector[ASTNode.type]!();        

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
