import LexerCallExpression from "./callExpression";

export default function LexerFunctionDeclaration(ParserNode: NLexer.INode): NLexer.INode {
    
    if (ParserNode.name === "Scene") {
        if (ParserNode.arguments === undefined || ParserNode.arguments.length === 0) throw new Error(`Funcion "${ParserNode.name}" sin argumentos`);
        if (ParserNode.arguments.length > 1) throw new Error(`Se recibieron mas parametros de los esperados para la funcion ${ParserNode.name}. Esperados: ${1}`);
        if (ParserNode.arguments[0].type !== "StringLiteral") throw new Error(`El parametros 1 en ${ParserNode.name} no es del tipo "StringLiteral"`);
        
        if (ParserNode.body === undefined || ParserNode.body.length === 0) throw new Error(`Funcion "${ParserNode.name}" sin contenido`);

        ParserNode.body.forEach((Node) => {
            if (Node.type === "CharacterDeclaration") throw new Error(`No se permite la anidacion de "CharacterDeclaration" en el cuerpo de la funcion ${ParserNode.name}`);
            if (Node.type === "FunctionDeclaration") throw new Error(`No se permite la anidacion de "FunctionDeclaration" en el cuerpo de la funcion ${ParserNode.name}`);
            if (Node.type === "CallExpression") {
                LexerCallExpression(Node)
            }
            if (Node.type === "CharacterExpression") {
                
            }
        })
    }

    return ParserNode
}