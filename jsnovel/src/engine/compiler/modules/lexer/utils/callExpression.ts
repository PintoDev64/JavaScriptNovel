import type { NParser } from "src/engine/ports/compiler.js";

export default function LexerCallExpression(ParserNode: NParser.INode): NParser.INode {
    console.log("LexerCallExpression: ", ParserNode);

    if (ParserNode.name === "Character") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 3) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[0].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
        if (ParserNode.arguments[1].type !== "ArrayExpression") throw new Error(`El argumento no tiene el tipo de dato esperado`);
        if (ParserNode.arguments[2].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    if (ParserNode.name === "MediaAudio") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 2) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[0].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
        if (ParserNode.arguments[1].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    if (ParserNode.name === "Interface") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 1) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[0].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    if (ParserNode.name === "Play") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 1) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[0].type !== "VariableExpression") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    if (ParserNode.name === "Stop") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments[0].type !== "VariableExpression") throw new Error(`El argumento no tiene el tipo de dato esperado`);
        if (ParserNode.arguments?.length > 1) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[0].type !== "VariableExpression") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    if (ParserNode.name === "Background") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 1) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
    }

    if (ParserNode.name === "Translate") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 2) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[0].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
        if (ParserNode.arguments[1].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    if (ParserNode.name === "Jump") {
        if (ParserNode.arguments === undefined) throw new Error(`No hay argumetos en ${ParserNode.value}`);
        if (ParserNode.arguments?.length > 1) throw new Error(`La cantidad de argumentos no es la esperada. Se esperaban ${ParserNode.arguments.length}`);
        if (ParserNode.arguments[1].type !== "StringLiteral") throw new Error(`El argumento no tiene el tipo de dato esperado`);
    }

    return ParserNode
}