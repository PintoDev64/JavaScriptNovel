declare type LenguajeTokens = {
    type: "comma" | "semicolon" | "name" | "number" | "parenthesis" | "string";
    value: string;
}[]

declare interface LenguajeAST {
    type: "NumberLiteral" | "StringLiteral" | "Identifier" | "Program";
    [key: string]: any;
}

declare interface ASTVisitor {
    NumberLiteral: {
        enter(node: LenguajeAST, parent: LenguajeAST | null): void;
        exit?(node: LenguajeAST, parent: LenguajeAST | null): void
    },
    StringLiteral: {
        enter(node: LenguajeAST, parent: LenguajeAST | null): void;
        exit?(node: LenguajeAST, parent: LenguajeAST | null): void
    },
    Identifier: {
        enter(node: LenguajeAST, parent: LenguajeAST | null): void;
        exit?(node: LenguajeAST, parent: LenguajeAST | null): void
    },
    Program?: {
        enter(node: LenguajeAST, parent: LenguajeAST | null): void;
        exit?(node: LenguajeAST, parent: LenguajeAST | null): void
    }
}

declare interface TransformerAST {
    type: "NumberLiteral" | "StringLiteral" | "CallExpression";
    [key: string]: any;
}