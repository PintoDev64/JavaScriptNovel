import { Traverser } from "../traverser";

export default function Transformer(ASTStructure: AstBase): AstBase {
    let ASTConvert: AstBase = {
        type: "Program",
        body: []
    }

    // Creamos un contexto para almacenar el nuevo AST.
    ASTStructure._context = ASTConvert.body;

    Traverser(ASTStructure, {
        // Convertir literales numéricos
        NumberLiteral: {
            Enter(ASTNode, parent) {
                parent?._context?.push({
                    type: "NumberLiteral",
                    value: ASTNode.value
                });
            },
        },
        // Convertir literales de cadenas
        StringLiteral: {
            Enter(ASTNode, parent) {
                parent?._context?.push({
                    type: "StringLiteral",
                    value: ASTNode.value
                });
            }
        },
        // Convertir expresiones de llamadas a funciones
        CallExpression: {
            Enter(ASTNode, parent) {
                let Expression: AstStructure = {
                    type: "CallExpression",
                    caller: {
                        type: "Identifier",
                        name: ASTNode.name
                    },
                    params: [],
                    content: []
                };

                ASTNode._context = Expression.params;

                if (parent === null || !parent._context) {
                    throw new Error("(Transformer) The parent node has no context");
                }

                if (parent.type !== 'CallExpression') {
                    parent._context.push(Expression);
                }

                // Si hay contenido en la función (un bloque `{}`), lo manejamos
                if (ASTNode.content && ASTNode.content.length > 0) {
                    ASTNode.content.forEach((contentNode: AstStructure) => {
                        Expression.content?.push(contentNode);
                    });
                }
            }
        },
        // Convertir contextos globales como 'GlobalContext'
        GlobalContext: {
            Enter(ASTNode, parent) {
                console.log("GlobalContext -> ", ASTNode);

                console.log("Global ->", ASTNode.valueType);

                let GlobalVar: AstVariableStructure = {
                    type: "VariableDeclaration",
                    kind: "global",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: ASTNode.name
                        },
                        init: {
                            type: /^[0-9]+$/.test(ASTNode.value as string) ? "NumberLiteral" : "StringLiteral",
                            value: ASTNode.value
                        }
                    }]
                };

                parent?._context?.push(GlobalVar);
            }
        },
        // Convertir contextos de audio
        AudioContext: {
            Enter(ASTNode, parent) {
                let AudioVar: AstVariableStructure = {
                    type: "VariableDeclaration",
                    kind: "audio",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: ASTNode.name
                        },
                        init: {
                            type: "StringLiteral",
                            value: ASTNode.value
                        }
                    }]
                };

                parent?._context?.push(AudioVar);
            }
        },
        // Convertir contextos de imagen
        ImageContext: {
            Enter(ASTNode, parent) {
                let ImageVar: AstVariableStructure = {
                    type: "VariableDeclaration",
                    kind: "image",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: ASTNode.name
                        },
                        init: {
                            type: "StringLiteral",
                            value: ASTNode.value
                        }
                    }]
                };

                parent?._context?.push(ImageVar);
            }
        },
        // Convertir contextos de video
        VideoContext: {
            Enter(ASTNode, parent) {
                let VideoVar: AstVariableStructure = {
                    type: "VariableDeclaration",
                    kind: "video",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: ASTNode.name
                        },
                        init: {
                            type: "StringLiteral",
                            value: ASTNode.value
                        }
                    }]
                };

                parent?._context?.push(VideoVar);
            }
        },
        // Convertir contextos de personajes (Character)
        CharacterContext: {
            Enter(ASTNode, parent) {
                if (ASTNode.value === undefined) throw new Error("(Transformer) Character data is not available");

                let CharacterVar: AstVariableStructure = {
                    type: "VariableDeclaration",
                    kind: "character",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: ASTNode.name
                        },
                        init: ASTNode.value
                    }]
                };

                parent?._context?.push(CharacterVar);
            }
        },
        // Convertir identificadores
        Identifier: {
            Enter(ASTNode, parent) {
                parent?._context?.push({
                    type: "Identifier",
                    name: ASTNode.name
                });
            }
        },
        Program: {
            Enter: undefined,
            Exit: undefined
        }
    });

    return ASTConvert;
}
