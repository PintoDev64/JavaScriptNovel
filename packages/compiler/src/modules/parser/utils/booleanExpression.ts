export default  function BooleanExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;
    const BooleanNode: NParser.INode = {
        type: "BooleanExpression",
    }
    
    function NextCursor() {
        ++ActualCursor
    }

    if (Tokens[ActualCursor].value !== "true") {
        BooleanNode.value = true
    } else {
        BooleanNode.value = false
    }
    NextCursor()

    return [ActualCursor, BooleanNode]
}