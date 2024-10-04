type GlobalVariablesType = "global" | "audio" | "image" | "video" | "character"
interface TokensStructure {
    type: GlobalVariablesType | "comma" | "semicolon" | "name" | "number" | "parenthesis" | "string" | "equal",
    value: number | string,
    [key: any]: any
}

type GlobalExpectType = "GlobalContext" | "AudioContext" | "ImageContext" | "VideoContext" | "CharacterContext" | "Program"
interface AstStructure {
    type: GlobalExpectType | "NumberLiteral" | "StringLiteral" | "Identifier" | "CallExpression",
    name?: string | number,
    value?: string | number,
    params?: AstStructure[],
    body?: AstStructure[],
    _context?: (AstStructure | AstVariableStructure)[],
    caller?: AstStructure
}

interface AstBase {
    type: "Program",
    body: AstStructure[]
    _context?: (AstStructure | AstVariableStructure)[]
}

interface AstDeclarationsStructure {
    type: "VariableDeclarator",
    id: AstStructure,
    init: AstStructure
}

interface AstVariableStructure {
    type: "VariableDeclaration",
    kind: "global" | "audio" | "image" | "video" | "character",
    declarations: AstDeclarationsStructure[]
}

type AstVisitor = Partial<Record<GlobalExpectType | "NumberLiteral" | "StringLiteral" | "Identifier" | "CallExpression", {
    Enter?(ASTNode: AstStructure, parent: AstStructure | null): void
    Exit?(ASTNode: AstStructure, parent: AstStructure | null): void
}>>