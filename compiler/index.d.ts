interface TokensStructure {
    type: "comma" | "semicolon" | "name" | "number" | "parenthesis" | "string" | "global",
    value: number | string,
    [key: any]: any
}
