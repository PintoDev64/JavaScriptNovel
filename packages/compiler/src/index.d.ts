type TTokenSpecialNames = 
    | "const"
    | "var"
    | "audio"
    | "image";

type TTokenTypes =
    | "paren"
    | "space"
    | "name"
    | "number"
    | "comma"
    | "bracket"
    | "curly"
    | "doublequote"
    | "equal";

type TNodeType =
    | "Example"
    | "CallExpression"
    | "FunctionExpression"
    | "DefinitionExpression"
    | "UseExpression"
    | "VariableExpression"
    | "StringLiteral"
    | "NumberLiteral";

declare namespace NError {
    type TErrorTypes = 
        | "Tokenizer"
        | "Parser";

    type TErrorFunctionNames =
        | "TokenUnrecognized"
        | "MissingToken"
        | "NameNotAllowed";

    type TErrorFunction = 
        | "Tokenizer.TokenUnrecognized"
        | "Parser.TokenUnrecognized"
        | "Parser.MissingToken"
        | "Parser.NameNotAllowed";

    interface IErrorFunctions {
        Tokenizer: {
            TokenUnrecognized: (character: string, line: number, cursor: number) => void
        },
        Parser: {
            TokenUnrecognized: (type: string, value: string, line: number, cursor: number) => void,
            MissingToken: (name: string, line: number, cursor: number) => void,
            NameNotAllowed: (name: string, line: number, cursor: number) => void
        }
    }
}

declare namespace NTokenizer {
    interface IToken {
        line: number;
        position: number;
        type: TTokenTypes;
        value: string;
    }
    /**
     * Tokenizes the script content into a list of tokens
     * @returns {string[]} [content sector type, line position, cursor position]
     */
    type TTokenSelectorResult = [
        string,
        TTokenTypes,
        number
    ]
}

declare namespace NParser {
    interface INode {
        type: TNodeType;
        value?: string | number | INode;
        name?: string
        params?: INode[];
        pseudoParams?: string[],
        content?: INode[]
    }
}

declare namespace NDirector {
    type IInstructionList = Function[]
}

declare interface EngineContext {
    [key: string]: any
}