type TTokenSpecialNames =
    | "var"
    | "audio"
    | "image"
    | "scene"
    | "jump"
    | "char"
    | "play"
    | "stop"
    | "await"
    | "show"
    | "hide"
    | "function"
    | "interface"
    | "background"
    | "translate"
    | "character"
    | "mediaaudio";

type TTokenTypes =
    | "keyword"
    | "parenthesis"
    | "space"
    | "identifier"
    | "number"
    | "comma"
    | "bracket"
    | "curly"
    | "doublequote"
    | "equal"
    | "string";

type TNodeType =
    | "Program"
    | "CallExpression"
    | "FunctionExpression"
    | "UseExpression"
    | "VariableExpression"
    | "ImageExpression"
    | "AudioExpression"
    | "CharacterExpression"
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
        | "Tokenizer.TypeError"
        | "Tokenizer.TokenUnrecognized"
        | "Parser.TokenUnrecognized"
        | "Parser.TokenValueInvalid"
        | "Parser.TokenNotValid"
        | "Parser.MissingToken"
        | "Parser.NameNotAllowed";

    interface IErrorFunctions {
        Tokenizer: {
            TypeError: (character: string, line: number, cursor: number) => void
            TokenUnrecognized: (character: string, line: number, cursor: number) => void
        },
        Parser: {
            TokenValueInvalid: (type: string, value: string, line: number, cursor: number) => void
            TokenInvalid: (type: string, value: string, line: number, cursor: number) => void
            TokenUnrecognized: (type: string, value: string, line: number, cursor: number) => void,
            MissingToken: (name: string, line: number, cursor: number) => void,
            NameNotAllowed: (name: string, line: number, cursor: number) => void
        }
    }
}

declare namespace NTokenizer {
    /**
     * Interface/structure of each generated token
     */
    interface IToken {
        line: number;
        position: number;
        type: TTokenTypes;
        value: string;
    }
}

declare namespace NParser {
    interface INodeEntry {
        type: "Program"
        body: INode[]
    }
    interface INode {
        type: TNodeType
        name: string
        value?: string | number
        params?: INode[]
        content?: INode[]
        body?: INode
    }
}

declare namespace NInstructor {
    type IInstructionList = Function[]
}

declare interface EngineContext {
    [key: string]: any
}