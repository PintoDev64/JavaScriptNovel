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
    | "FunctionDeclaration"
    | "VariableExpression"
    | "ArrayExpression"
    | "BooleanExpression"
    | "VariableDeclaration"
    | "ImageDeclaration"
    | "AudioDeclaration"
    | "CharacterDeclaration"
    | "StringLiteral"
    | "NumberLiteral";

declare namespace NError {
    type TErrorTypes =
        | "Tokenizer"
        | "Parser";

    interface IErrorFunctions {
        Tokenizer: {
            TypeError: (line: number, cursor: number) => void
            TokenUnrecognized: (line: number, cursor: number) => void
        },
        Parser: {
            TokenValueInvalid: (line: number, cursor: number) => void
            TokenInvalid: (value: string, line: number, cursor: number) => void
            TokenUnrecognized: (value: string, line: number, cursor: number) => void,
            MissingToken: (name: string, line: number, cursor: number) => void,
            NameNotAllowed: (name: string, line: number, cursor: number) => void
        }
    }
}

declare namespace NTokenizer {
    type FCreteToken = [number, number, TTokenTypes, string];
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
        name?: string
        value?: string | number | boolean | INode
        arguments?: INode[]
        body?: INode[]
        predirectives?: INode[]
        directives?: INode[]
        elements?   : INode[]
    }
}

declare namespace NInstructor {
    type IInstructionList = Function[]
}

declare interface EngineContext {
    [key: string]: any
}