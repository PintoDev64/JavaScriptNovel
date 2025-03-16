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

export interface IGameData {
    gameName: string
    gameVersion: string
}

export interface IElectronData {
    electronVersion: string

}

export type TNovelJsAPIGameAPI<T extends "Application" | "Web"> = {
    NovelJsAPIGameAPI: {
        General: {
            GetKeyboardMap(): T extends "Application" ? Set<KeyboardMap> : void
            GetGameData(): T extends "Application" ? IGameData : void
            GetInstructions(): T extends "Application" ? IInstructions : void
            GetElectronData(): T extends "Application" ? IElectronData : void
        },
        Memory: {
            GetFunctions(): { [K: string]: unknown }
            GetVariables(): { [K: string]: unknown }
        }
    }
} & Window & typeof globalThis

export interface INovelJsWebContext {
    stateLibrary: string
    stateApplication: IElectronData
    keyboardAssignment: Set<KeyboardMap>
    gameData: IGameData
    instructions: IInstructions
    userAgent: string
}