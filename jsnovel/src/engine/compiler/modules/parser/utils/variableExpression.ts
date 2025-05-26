import type { NTokenizer, NParser } from "../../../../../engine/types/compiler.js";

export default function VariableExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;

    function NextCursor(Value?: number) {
        if (Value !== undefined) ActualCursor = Value;
        else ++ActualCursor;
    }

    const VariableNode: NParser.INode = {
        type: "VariableExpression",
        name: Tokens[ActualCursor].value
    }

    NextCursor()

    return [ActualCursor, VariableNode];
}