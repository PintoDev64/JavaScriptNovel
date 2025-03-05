import { CURLY_OPEN, PARENTHESIS_CLOSE, PARENTHESIS_OPEN } from "../../../constants/index.js";
import CreateNode from "../createNode.js";
import BodyExpression from "./bodyExpression.js";

export default function CallExpression(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;

    function NextCursor(Value?: number) {
        if (Value !== undefined) ActualCursor = Value;
        else ++ActualCursor;
    }

    const FunctionDeclarationNode: NParser.INode = {
        type: "CallExpression",
        name: "",
        arguments: []
    }

    if (Tokens[ActualCursor].type === "parenthesis" && Tokens[ActualCursor].value === PARENTHESIS_OPEN) NextCursor();

    const DeclarationIdentifier = Tokens[ActualCursor].value;
    FunctionDeclarationNode.name = DeclarationIdentifier
    NextCursor()

    if (Tokens[ActualCursor].value !== PARENTHESIS_OPEN) throw new Error("Se esperaba un '('");
    NextCursor()

    while (Tokens[ActualCursor].value !== PARENTHESIS_CLOSE) {
        const [NewCursor, ArgumentNode] = CreateNode(Tokens, ActualCursor);
        FunctionDeclarationNode.arguments?.push(ArgumentNode);
        NextCursor(NewCursor)

        // Si hay coma, la omitimos
        if (Tokens[ActualCursor].type === "comma") NextCursor();
    }
    NextCursor()

    if (Tokens[ActualCursor].type === "curly" && Tokens[ActualCursor].value === CURLY_OPEN) {
        const [NewCursor, BodyNode] = BodyExpression(Tokens, ActualCursor);
        FunctionDeclarationNode.type = "FunctionDeclaration"
        FunctionDeclarationNode.body = BodyNode;
        NextCursor(NewCursor)
    }

    return [ActualCursor, FunctionDeclarationNode];
}