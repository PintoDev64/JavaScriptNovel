export default function CharacterExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;

    function NextCursor(Value?: number) {
        if (Value !== undefined) ActualCursor = Value;
        else ++ActualCursor;
    }

    const CharacterExpressionNode: NParser.INode = {
        type: "CharacterExpression",
        name: Tokens[ActualCursor].value
    }

    NextCursor();
    
    CharacterExpressionNode.value = Tokens[ActualCursor].value
    
    NextCursor();
    
    return [ActualCursor, CharacterExpressionNode]
}