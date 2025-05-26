
import type { NParser } from "../../../../engine/types/compiler.js";

import CreateLexer from "./createLexer.js";

export default function CompilerLexer(ASTRequest: NParser.INodeEntry): NParser.INodeEntry {
    let ActualCursor = 0;
    const ASTBody = ASTRequest.body
    const ASTVerified: NParser.INodeEntry = {
        type: ASTRequest.type,
        file: ASTRequest.file,
        body: []
    }

    while (ActualCursor < ASTBody.length) {
        const LexerNode = CreateLexer(ASTBody[ActualCursor])
        ASTVerified.body.push(LexerNode)
        ++ActualCursor
    }

    return ASTVerified;
}