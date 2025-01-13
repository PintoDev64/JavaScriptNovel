import { CURLY_CLOSE, CURLY_OPEN, DOUBLEQUOTE, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, SPACE, TOKEN_TYPES } from "./constants";

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

function parseNode(tokens: NTokenizer.IToken[], cursorPosition: number): [number, NParser.INode] {
    let actualCursor = cursorPosition
    let token = tokens[cursorPosition];

    // Eval & Parse String Literal
    if (token.type === TOKEN_TYPES.doublequote && token.value === DOUBLEQUOTE) {
        let NodeStringCollection = [];
        let INode: NParser.INode = {
            type: 'StringLiteral',
            value: ""
        };

        token = tokens[++actualCursor]

        while (token.type !== TOKEN_TYPES.doublequote) {
            NodeStringCollection.push(token.value)
            token = tokens[++actualCursor]
        }

        INode.value = NodeStringCollection.join(SPACE)

        return [actualCursor, INode]
    }

    // Eval & Parse Number Literal
    if (token.type === TOKEN_TYPES.number) {
        const INode: NParser.INode = {
            type: "NumberLiteral",
            value: Number(token.value)
        }

        return [actualCursor, INode]
    }

    // Eval & Parse VariableExpression, CallExpression or FunctionExpression
    if (token.type === TOKEN_TYPES.name) {
        token = tokens[++actualCursor]

        let INode: NParser.INode = {
            type: 'VariableExpression',
            value: token.value
        };

        if (token.type === TOKEN_TYPES.paren && token.value === PARENTHESIS_OPEN) {
            INode.type = "CallExpression"
            token = tokens[++actualCursor]

            while (token.type !== TOKEN_TYPES.paren && token.value !== PARENTHESIS_CLOSE) {
                if (typeof INode?.params === "undefined") INode["params"] = [];
                ++actualCursor

                const [cursor, INodeParam] = parseNode(tokens, actualCursor)
                INode.params?.push(INodeParam)

                actualCursor = cursor
                token = tokens[actualCursor]
            }
        }

        if (token.type === TOKEN_TYPES.curly && token.value === CURLY_OPEN) {
            INode.type = "FunctionExpression"
            token = tokens[++actualCursor]

            while (token.type !== TOKEN_TYPES.curly && token.value !== CURLY_CLOSE) {
                if (typeof INode?.content === "undefined") INode["content"] = [];
                ++actualCursor

                const [cursor, INodeParam] = parseNode(tokens, actualCursor)
                INode.content?.push(INodeParam)

                actualCursor = cursor
                token = tokens[actualCursor]
            }
        }

        return [actualCursor, INode]
    }

    if (token.type === TOKEN_TYPES.comma || token.type === TOKEN_TYPES.equal || token.type === TOKEN_TYPES.bracket || token.type === TOKEN_TYPES.space) {
        return [++actualCursor, { type: "Example", value: token.value }]
    }

    throw new Error(`token no reconized - token: ${token.type} - line: ${token.line}, position: ${token.position}`);
}