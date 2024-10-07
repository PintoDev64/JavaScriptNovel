type GlobalSpecialType = "if" | "Audio" | "Image" | "Video" | "Character" | "for" | "scene" | "background" | "jump" | "call" | "play" | "stop" | "import"
type GlobalVariablesType = "global" | "audio" | "image" | "video" | "character"
interface TokensStructure {
    type: GlobalVariablesType | "comma" | "semicolon" | "name" | "number" | "parenthesis" | "string" | "equal" | "keys" | "colon",
    value: string,
    [key: any]: any
}

type GlobalExpectType = "GlobalContext" | "AudioContext" | "ImageContext" | "VideoContext" | "CharacterContext" | "Program" | "ExpressionContent" | "ChoiceExpression" | "NumberLiteral" | "StringLiteral" | "Identifier" | "CallExpression"
interface AstStructure {
    type: GlobalExpectType,
    name?: string,
    value?: string | AstStructure,
    params?: AstStructure[],
    valueType?: "number" | "string",
    content?: AstStructure[],
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
    init: AstStructure | string | number
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