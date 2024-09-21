declare type LenguajeTokens = {
    type: "semicolon" | "name" | "number" | "parenthesis" | "string";
    value: string;
}[]

declare type LenguajeAST = {
    type: "Program",
    body: LenguajeNode[]
}
declare type LenguajeNode = {
    type: "NumberLiteral" | "StringLiteral" | "CallExpression" | "Identifier",
    value?: string | number,
    name?: string,
    params?: LenguajeNode[]
}