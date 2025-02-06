import { BooleanKeywords, PARENTHESIS_OPEN, VariablesKeywords } from "../../constants";
import ArrayExpression from "./utils/arrayExpression.js";
import BooleanExpression from "./utils/booleanExpression.js";
import CallExpression from "./utils/callExpression.js";
import CharacterExpression from "./utils/characterExpression";
import VariableDeclaration from "./utils/variableDeclaration.js";
import VariableExpression from "./utils/variableExpression.js";

export default function CreateNode(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;

    if (Tokens[ActualCursor].type === "keyword" && VariablesKeywords.includes(Tokens[ActualCursor].value.toLowerCase() as TTokenSpecialNames)) {
        const [NewCursor, Node] = VariableDeclaration(Tokens, ActualCursor);
        return [NewCursor, Node]
    }

    if (Tokens[ActualCursor].type === "keyword" && Tokens[ActualCursor + 1].type === "parenthesis" && Tokens[ActualCursor + 1].value === PARENTHESIS_OPEN) {
        const [NewCursor, Node] = CallExpression(Tokens, ActualCursor);
        return [NewCursor, Node];
    }

    if (Tokens[ActualCursor].type === "identifier" && Tokens[ActualCursor + 1].type === "parenthesis" && Tokens[ActualCursor + 1].value === PARENTHESIS_OPEN) {
        const [NewCursor, Node] = CallExpression(Tokens, ActualCursor);
        return [NewCursor, Node];
    }

    if (Tokens[ActualCursor].type === "identifier" && Tokens[ActualCursor + 1].type === "string") {
        const [NewCursor, Node] = CharacterExpression(Tokens, ActualCursor)
        return [NewCursor, Node];
    }

    if (Tokens[ActualCursor].type === "identifier" && BooleanKeywords.includes(Tokens[ActualCursor].value)) {
        const [NewCursor, Node] = BooleanExpression(Tokens, ActualCursor);
        return [NewCursor, Node];
    }

    if (Tokens[ActualCursor].type === "identifier") {
        const [NewCursor, Node] = VariableExpression(Tokens, ActualCursor);
        return [NewCursor, Node];
    }

    if (Tokens[ActualCursor].type === "bracket" && Tokens[ActualCursor].value === "[") {
        const [NewCursor, Node] = ArrayExpression(Tokens, ActualCursor);
        return [NewCursor, Node]
    }

    if (Tokens[ActualCursor].type === "number" || Tokens[ActualCursor].type === "string") {
        const Node: NParser.INode = {
            type: "StringLiteral",
            value: Tokens[ActualCursor].value
        }
        if (Tokens[ActualCursor].type === "number") {
            Node.type = "NumberLiteral"
            Node.value = Number(Tokens[ActualCursor].value)
        };
        ++ActualCursor;
        return [ActualCursor, Node];
    }

    throw new Error(`Token inesperado: tipo ${Tokens[ActualCursor].type} - ${Tokens[ActualCursor].value} en línea ${Tokens[ActualCursor].line}`);
}