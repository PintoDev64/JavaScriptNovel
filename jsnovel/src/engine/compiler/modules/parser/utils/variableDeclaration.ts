import type { NTokenizer, NParser } from "../../../../../engine/types/compiler.js";

import CreateNode from "../createNode.js";

export default function VariableDeclaration(Tokens: NTokenizer.IToken[], Cursor: number): [number, NParser.INode] {
    let ActualCursor = Cursor;

    function NextCursor(Value?: number) {
        if (Value !== undefined) ActualCursor = Value;
        else ++ActualCursor;
    }

    const VariableNode: NParser.INode = {
        type: "VariableDeclaration",
        name: ""
    }

    const DeclarationKeyword = Tokens[ActualCursor].value;
    NextCursor();

    const DeclarationName = Tokens[ActualCursor].value; // Nombre de la variable
    NextCursor();

    VariableNode.name = DeclarationName;

    NextCursor();

    const [NewCursor, CallExpressionNode] = CreateNode(Tokens, ActualCursor);

    VariableNode.value = CallExpressionNode;
    NextCursor(NewCursor);

    if (DeclarationKeyword === "Char") {
        VariableNode.type = "CharacterDeclaration";
    }
    if (DeclarationKeyword === "Image") {
        VariableNode.type = "ImageDeclaration";
    }
    if (DeclarationKeyword === "Audio") {
        VariableNode.type = "AudioDeclaration";
    }

    return [ActualCursor, VariableNode];
}