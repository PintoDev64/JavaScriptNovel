import { BRACKET_CLOSE } from "../../../constants/index.js";
import CreateNode from "../createNode.js";

export default function ArrayExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;

    function NextCursor(Value?: number) {
        if (Value !== undefined) ActualCursor = Value;
        else ++ActualCursor;
    }

    const ArrayExpressionNode: NParser.INode = {
        type: "ArrayExpression",
        elements: []
    }

    NextCursor();
    
    while (Tokens[ActualCursor].value !== BRACKET_CLOSE) {
        const [newCursor, elementNode] = CreateNode(Tokens, ActualCursor);
        ArrayExpressionNode.elements?.push(elementNode);

        NextCursor(newCursor);

        if (Tokens[ActualCursor].type === "comma") NextCursor();
    }
    NextCursor()

    return [ActualCursor, ArrayExpressionNode];
}