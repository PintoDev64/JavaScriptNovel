export default function LexerVariableDeclaration(ParserNode: NLexer.INode): NLexer.INode {
    if (ParserNode.value === undefined) throw new Error("Variable sin asignacion");

    if ((ParserNode.value as NParser.INode).type === "FunctionDeclaration") throw new Error("");

    if ((ParserNode.value as NParser.INode).type === "StringLiteral" && typeof (ParserNode.value as NParser.INode).value !== "string") throw new Error("");

    if ((ParserNode.value as NParser.INode).type === "NumberLiteral" && typeof (ParserNode.value as NParser.INode).value !== "number") throw new Error("");
    
    if ((ParserNode.value as NParser.INode).type === "BooleanExpression" && typeof (ParserNode.value as NParser.INode).value !== "boolean") throw new Error("");
    
    if ((ParserNode.value as NParser.INode).type === "ArrayExpression" && !Array.isArray((ParserNode.value as NParser.INode).value)) throw new Error();

    return ParserNode
}