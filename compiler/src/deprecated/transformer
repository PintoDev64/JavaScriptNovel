import ASTReader from "./traverser";

export default function Transformer(ASTStructure: LenguajeAST) {
    let newAST: LenguajeAST = {
        type: 'Program',
        body: [],
    };

    ASTStructure._context = newAST.body;

    ASTReader(ASTStructure, {
        NumberLiteral: {
            enter(node, parent) {
                parent?._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent?._context.push({
                    type: 'StringLiteral',
                    value: node.value,
                });
            },
        },
        CallExpression: {
            enter: function (ASTNode: LenguajeAST, parent: LenguajeAST | null): void {
                let expression: TransformerAST = {
                    type: 'CallExpression',
                    caller: {
                        type: 'Identifier',
                        name: ASTNode.name
                    },
                    params: []
                }

                ASTNode._context = expression.params;

                if (parent?.type !== 'CallExpression') {
                    parent?._context.push(expression);
                }

            },
            exit: undefined
        }
    })

    return newAST;
}