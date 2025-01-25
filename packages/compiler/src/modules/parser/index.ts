import parseNode from "./parseNode";

export default async function CompilerParser(scriptTokens: NTokenizer.IToken[]): Promise<NParser.INode[]> {
    const ASTNodes: NParser.INode[] = [];
    let cursorPosition = 0;

    while (cursorPosition < scriptTokens.length) {
        const [cursor, ASTNode] = parseNode(scriptTokens, cursorPosition)
        cursorPosition = cursor
        ASTNodes.push(ASTNode);
    }

    return ASTNodes;
}