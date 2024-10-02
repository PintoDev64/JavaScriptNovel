type GlobalVariablesType = "global" | "audio" | "image" | "video" | "character"
interface TokensStructure {
    type: GlobalVariablesType | "comma" | "semicolon" | "name" | "number" | "parenthesis" | "string" | "equal",
    value: number | string,
    [key: any]: any
}

type GlobalExpectType = "GlobalContext" | "AudioContext" | "ImageContext" | "VideoContext" | "CharacterContext"
interface AstStructure {
    type: GlobalExpectType | "NumberLiteral" | "StringLiteral" | "Identifier" | "CallExpression",
    name?: string | number,
    value?: string | number,
    params?: AstStructure[]
}