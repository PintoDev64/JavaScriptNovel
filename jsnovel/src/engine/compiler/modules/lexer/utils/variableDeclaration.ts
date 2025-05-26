import type { NParser } from "../../../../../engine/types/compiler.js";

import LexerCallExpression from "./callExpression";

export default function LexerVariableDeclaration(ParserNode: NParser.INode): NParser.INode {
    if (ParserNode.value === undefined) throw new Error("Variable sin asignacion");

    const ParserNodeValue = ParserNode.value as NParser.INode;

    // console.log("LexerVariableDeclaration: ", ParserNodeValue);

    if (ParserNode.type === "FunctionDeclaration") throw new Error("");

    if (ParserNode.type === "StringLiteral" && typeof ParserNodeValue.value !== "string") throw new Error("");

    if (ParserNode.type === "NumberLiteral" && typeof ParserNodeValue.value !== "number") throw new Error("");

    if (ParserNode.type === "BooleanExpression" && typeof ParserNodeValue.value !== "boolean") throw new Error("");

    if (ParserNode.type === "ImageDeclaration" && typeof ParserNodeValue.value !== "string") throw new Error("");

    if (ParserNode.type === "ArrayExpression" && Array.isArray(ParserNodeValue.elements)) {
        ParserNodeValue.elements?.forEach(Node => LexerVariableDeclaration(Node))
    } else if (ParserNode.type === "CallExpression") {
        LexerCallExpression(ParserNodeValue)
    }

    return ParserNode
}