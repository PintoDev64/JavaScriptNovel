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
export interface IInstructions {
    Variables: INode[]
    Specials: INode[]
    Scenes: INode[]
}

export interface KeyboardMap {
    keyCode: string,
    action: (event: KeyboardEvent) => void
}
export type KeyboardKeys = string

export type TNovelJsAPIGameAPI = {
    NovelJsAPIGameAPI: {
        GetKeyboardMap(): Set<KeyboardMap>
        GetGameData(): string
        GetInstructions(): IInstructions
    }
} & Window & typeof globalThis

export interface INovelJsWebContext {
    instructions: IInstructions
    userAgent: string
}