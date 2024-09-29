declare type LenguajeTokens = {
    type: "comma" | "semicolon" | "name" | "number" | "parenthesis" | "string";
    value: string;
}[]

declare interface LenguajeAST {
    type: "NumberLiteral" | "StringLiteral" | "CallExpression" | "Program";
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
    CallExpression: {
        enter(node: LenguajeAST, parent: LenguajeAST | null): void;
        exit?(node: LenguajeAST, parent: LenguajeAST | null): void
    },
    Program?: {
        enter(node: LenguajeAST, parent: LenguajeAST | null): void;
        exit?(node: LenguajeAST, parent: LenguajeAST | null): void
    }
}

declare interface TransformerAST {
    type: "NumberLiteral" | "StringLiteral" | "CallExpression" | "Identifier";
    [key: string]: any;
}

declare interface ASTNode {
    type: "Program" | "CallExpression" | "Identifier" | "NumberLiteral" | "StringLiteral",
    [key: string]: any;
}