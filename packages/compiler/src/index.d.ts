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

}

declare namespace NInstructor {
    type IInstructionList = Function[]
}

declare interface EngineContext {
    [key: string]: any
}