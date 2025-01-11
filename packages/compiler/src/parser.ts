import { TOKEN_TYPES } from "./constants";

export default async function Parser(scriptTokens: NTokenizer.IToken[]): Promise<NParser.INode[]> {
    const ASTNodes: NParser.INode[] = [];
    let cursorPosition = 0;

    while (cursorPosition < scriptTokens.length) {
        const [cursor, ASTNode] = parseNode(scriptTokens, cursorPosition)
        cursorPosition = cursor
        ASTNodes.push(ASTNode);
    }

    return ASTNodes;
}

function parseNode (tokens: NTokenizer.IToken[], cursorPosition: number): [number, NParser.INode] {
    const actualCursor = cursorPosition
    const token = tokens[cursorPosition];
    const nextToken = tokens[cursorPosition + 1];

    // Parse String Literal
    if (token.type === TOKEN_TYPES.doublequote && nextToken.type === TOKEN_TYPES.name) {
        
    }

    throw new Error("token no reconized");
}