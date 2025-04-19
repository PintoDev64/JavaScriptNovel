export type TTokenSpecialNames =
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

export type TTokenTypes =
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

export type TNodeType =
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
    | "CharacterExpression"
    | "StringLiteral"
    | "NumberLiteral";

export type TNodeTypeUses =
    | "CallExpression"
    | "FunctionDeclaration"
    | "VariableExpression"
    | "VariableDeclaration"
    | "ImageDeclaration"
    | "AudioDeclaration"
    | "CharacterDeclaration"
    | "CharacterExpression"

export namespace NError {
    export type TErrorTypes =
        | "Tokenizer"
        | "Parser";

    export interface IErrorFunctions {
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

export namespace NTokenizer {
    export type FCreteToken = [number, number, TTokenTypes, string];
    export interface ITokenEntry {
        file: string,
        tokens: IToken[]
    }
    export interface IToken {
        line: number;
        position: number;
        type: TTokenTypes;
        value: string;
    }
}

export namespace NParser {
    export interface INodeEntry {
        type: "Program"
        file: string
        body: INode[]
    }
    export interface INode {
        type: TNodeType
        name?: string
        value?: string | number | boolean | INode
        arguments?: INode[]
        body?: INode[]
        predirectives?: INode[]
        directives?: INode[]
        elements?: INode[]
    }
}