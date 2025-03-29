export type TNodeType = "Program" | "CallExpression" | "FunctionDeclaration" | "VariableExpression" | "ArrayExpression" | "BooleanExpression" | "VariableDeclaration" | "ImageDeclaration" | "AudioDeclaration" | "CharacterDeclaration" | "CharacterExpression" | "StringLiteral" | "NumberLiteral";

export interface INodeEntry {
    type: "Program";
    file: string;
    body: INode[];
}
export interface INode {
    type: TNodeType;
    name?: string;
    value?: string | number | boolean | INode;
    arguments?: INode[];
    body?: INode[];
    predirectives?: INode[];
    directives?: INode[];
    elements?: INode[];
}

export interface IInstructionsStructure {
    Variables: INode[]
    Specials: INode[]
    Scenes: INode[]
}