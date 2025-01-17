import { CURLY_CLOSE, CURLY_OPEN, DOUBLEQUOTE, PARENTHESIS_OPEN, SPACE, TOKEN_TYPES, TOKEN_SPECIAL_TYPES, EQUAL, PARENTHESIS_CLOSE, COMMA } from "./constants";
import ErrorFunctions from "./error";
import { ParserTokenIsNotSpecialName, ParserTokenParenValidation } from "./utils";

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

        return [++actualCursor, INode]
    }

    // Eval & Parse Number Literal
    if (token.type === TOKEN_TYPES.number) {
        const INode: NParser.INode = {
            type: "NumberLiteral",
            value: Number(token.value)
        }

        return [++actualCursor, INode]
    }

    // Eval & Parse VariableExpression, CallExpression or FunctionExpression
    if (token.type === TOKEN_TYPES.name) {
        let INode: NParser.INode = {
            type: 'UseExpression',
            value: token.value
        };

        let nextToken = tokens[actualCursor + 1]

        if (TOKEN_SPECIAL_TYPES[token.value as TTokenSpecialNames] && nextToken.type === TOKEN_TYPES.name) {
            ++actualCursor
            token = tokens[actualCursor]
            nextToken = tokens[actualCursor + 1]

            if (ParserTokenIsNotSpecialName(token)) ErrorFunctions.Parser.NameNotAllowed(token.value, token.line, token.position);
            if (typeof INode?.name === "undefined") INode["name"] = "";

            INode.type = 'VariableExpression'
            INode.name = token.value

            if (nextToken.type !== TOKEN_TYPES.equal || nextToken.value !== EQUAL) ErrorFunctions.Parser.MissingToken(token.value, token.line, token.position);

            ++actualCursor
            token = tokens[actualCursor]
            nextToken = tokens[actualCursor + 1]

            const [cursor, Node] = parseNode(tokens, actualCursor + 1)

            actualCursor = cursor;

            INode.value = Node;

            return [actualCursor, INode]
        }

        if (nextToken.type === TOKEN_TYPES.paren && nextToken.value === PARENTHESIS_OPEN) {
            if (ParserTokenIsNotSpecialName(token)) ErrorFunctions.Parser.NameNotAllowed(token.value, token.line, token.position);

            ++actualCursor; // Avanza al paréntesis abierto
            token = tokens[actualCursor];
            nextToken = tokens[actualCursor + 1];

            INode.type = "CallExpression";
            INode.params = [];

            // Manejo para llamadas vacías
            if (nextToken.type === TOKEN_TYPES.paren && nextToken.value === PARENTHESIS_CLOSE) {
                ++actualCursor; // Salta el paréntesis cerrado
                return [++actualCursor, INode];
            }

            while (ParserTokenParenValidation(token, nextToken)) {
                const [cursor, INodeParam] = parseNode(tokens, actualCursor + 1);
                INode.params.push(INodeParam);

                actualCursor = cursor;
                token = tokens[actualCursor];
                nextToken = tokens[actualCursor + 1];
            }
        }

        if (token.type === TOKEN_TYPES.curly && token.value === CURLY_OPEN) {
            INode.type = "FunctionExpression"
            token = tokens[actualCursor]

            while (token.type !== TOKEN_TYPES.curly && token.value !== CURLY_CLOSE) {
                if (typeof INode?.content === "undefined") INode["content"] = [];
                ++actualCursor

                const [cursor, INodeParam] = parseNode(tokens, actualCursor)
                INode.content?.push(INodeParam)

                actualCursor = cursor
                token = tokens[++actualCursor]
            }
        }

        return [++actualCursor, INode]
    }

    if (token.type === TOKEN_TYPES.comma && token.value === COMMA) {
        return parseNode(tokens, actualCursor + 1)
    }

    if (token.type === TOKEN_TYPES.equal || token.type === TOKEN_TYPES.bracket || token.type === TOKEN_TYPES.space) {
        return [++actualCursor, { type: "Example", value: token.value }]
    }

    return ErrorFunctions.Parser.TokenUnrecognized(token.type, token.value, token.line, token.position)
}