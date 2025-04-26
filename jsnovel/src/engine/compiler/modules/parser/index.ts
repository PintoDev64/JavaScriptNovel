import type { NTokenizer, NParser } from "src/engine/types/compiler.js";

import CreateNode from "./createNode";

export default function CompilerParser(TokenList: NTokenizer.IToken[], FileName: string): NParser.INodeEntry {
    let Cursor = 0;

    const ASTMain: NParser.INodeEntry = {
        type: "Program",
        file: FileName,
        body: []
    }

    while (Cursor < TokenList.length) {
        const [NewCursor, Node] = CreateNode(TokenList, Cursor)
        Cursor = NewCursor;
        ASTMain.body.push(Node)
    }

    return ASTMain
}