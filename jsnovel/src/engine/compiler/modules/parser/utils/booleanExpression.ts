import type { NTokenizer, NParser } from "src/engine/types/compiler.js";

export default  function BooleanExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;
    const BooleanNode: NParser.INode = {
        type: "BooleanExpression",
    }
    
    function NextCursor() {
        ++ActualCursor
    }

    if (Tokens[ActualCursor].value !== "true") {
        BooleanNode.value = false
    } else {
        BooleanNode.value = true
    }
    NextCursor()

    return [ActualCursor, BooleanNode]
}