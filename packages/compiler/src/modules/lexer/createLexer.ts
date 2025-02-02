import LexerCallExpression from "./utils/callExpression";
import LexerFunctionDeclaration from "./utils/functionDeclaration";
import LexerVariableDeclaration from "./utils/variableDeclaration";

export default function CreateLexer(ParserNode: NLexer.INode): NLexer.INode {
    if (ParserNode.type === "VariableDeclaration" || ParserNode.type === "ImageDeclaration" || ParserNode.type === "AudioDeclaration" || ParserNode.type === "CharacterDeclaration") {
        return LexerVariableDeclaration(ParserNode)
    }

    if (ParserNode.type === "FunctionDeclaration") {
        return LexerFunctionDeclaration(ParserNode)
    }

    if (ParserNode.type === "CallExpression") {
        return LexerCallExpression(ParserNode)
    }

    throw new Error("");
}