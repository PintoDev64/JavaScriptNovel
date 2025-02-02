import CreateLexer from "./createLexer.js";

export default function CompilerLexer(ASTRequest: NParser.INodeEntry): NLexer.INodeEntry {
    let ActualCursor = 0;
    const ASTBody = ASTRequest.body
    const ASTVerified: NLexer.INodeEntry = {
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