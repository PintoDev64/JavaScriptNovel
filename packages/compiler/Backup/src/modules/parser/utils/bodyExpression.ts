import { CURLY_OPEN } from "../../../constants";
import CreateNode from "../createNode.js";

export default function BodyExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode[]] {
    let ActualCursor = Cursor;
    const Nodes: NParser.INode[] = [];

    function NextCursor(Value?: number) {
        if (Value !== undefined) ActualCursor = Value;
        else ++ActualCursor;
    }

    if (Tokens[ActualCursor].type === "curly" && Tokens[ActualCursor].value === CURLY_OPEN) NextCursor();

    while (Tokens[ActualCursor].type !== "curly" && Tokens[ActualCursor].value !== "}") {
        const [NewCursor, Node] = CreateNode(Tokens, ActualCursor);
        Nodes.push(Node);
        NextCursor(NewCursor);
    }
    NextCursor();

    return [ActualCursor, Nodes];
}