import { ThrowErrorIf } from "../../error";
import { EQUAL, TOKEN_KEYWORDS, TOKEN_TYPES } from "../../constants";
const { var: variable } = TOKEN_KEYWORDS;
const { keyword, equal, identifier } = TOKEN_TYPES;

export default function CreateNode(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;
    let ActualToken = Tokens[ActualCursor];

    if (ActualToken.type === keyword) {
        const [NewCursor, Node] = KeywordNode(Tokens, ActualCursor)
        return [NewCursor + 1, Node]
    }

    // #region TODO: Remove
    return [ActualCursor, { type: "CallExpression", name: "XD" }]
}

/**
 * Parse the Tokens
 * @param Tokens List of Tokens
 * @param Cursor Position of the Token is read
 * @returns Array
 */
function KeywordNode(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let LocalCursor = Cursor;
    let LocalToken = Tokens[LocalCursor];

    function NextCursor() {
        LocalCursor = LocalCursor + 1;
        LocalToken = Tokens[LocalCursor];
    }

    if (LocalToken.value === variable) {
        NextCursor()
        ThrowErrorIf(LocalToken.type !== identifier, "Parser.TokenNotValid")(
            LocalToken.type,
            LocalToken.value,
            LocalToken.line,
            LocalToken.position
        )
        const Node: NParser.INode = {
            type: "VariableExpression",
            name: LocalToken.value
        }
        NextCursor()
        ThrowErrorIf((LocalToken.type !== equal || LocalToken.value as string !== EQUAL), "Parser.TokenNotValid")(
            LocalToken.type,
            LocalToken.value,
            LocalToken.line,
            LocalToken.position
        )
        NextCursor()
        if (LocalToken.type === "string") {
            Node.value = LocalToken.value
            return [LocalCursor, Node]
        }
        if (LocalToken.type === "number") {
            Node.value = Number(LocalToken.value)
            return [LocalCursor, Node]
        }
        ThrowErrorIf(true, "Parser.TokenValueInvalid")(
            LocalToken.type,
            LocalToken.value,
            LocalToken.line,
            LocalToken.position
        )
    }

    return [LocalCursor, { type: "CallExpression", name: "XD" }]
}