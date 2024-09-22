interface ReadTokensReturn {
    type: string;
    [key: string]: any;
}

export default function Parser(tokens: LenguajeTokens): LenguajeAST {
    let cursorPosition = 0;

    function ReadTokens(): ReadTokensReturn {
        if (cursorPosition >= tokens.length) {
            throw new Error("Cursor position out of bounds");
        }

        let actualToken = tokens[cursorPosition];

        if (actualToken.type === "number") {
            cursorPosition++;
            return {
                type: "NumberLiteral",
                value: actualToken.value,
            };
        }

        if (actualToken.type === "string") {
            cursorPosition++;
            return {
                type: "StringLiteral",
                value: actualToken.value,
            };
        }

        if (actualToken.type === "name") {
            cursorPosition++;
            let nextToken: ReadTokensReturn = {
                type: "Identifier",
                name: actualToken.value,
            };

            // Verificamos si hay paréntesis para capturar parámetros.
            while (
                cursorPosition < tokens.length &&
                tokens[cursorPosition].type === "parenthesis" &&
                tokens[cursorPosition].value === "("
            ) {
                cursorPosition++; // Avanzar para evitar bucle infinito.
                nextToken = {
                    ...nextToken,
                    params: [],
                }
                nextToken.params.push(ReadTokens());

                // Verifica si el paréntesis de cierre está presente después de los parámetros.
                if (
                    cursorPosition < tokens.length &&
                    tokens[cursorPosition].type === "parenthesis" &&
                    tokens[cursorPosition].value === ")"
                ) {
                    cursorPosition++;
                } else {
                    throw new Error("Closing parenthesis expected");
                }
            }

            return nextToken;
        }

        if (actualToken.type === "parenthesis") {
            cursorPosition++; // Avanzar para evitar el bucle infinito
        }

        "XD"

        throw new TypeError(
            "I don't know what this character is: " + actualToken.type
        );
    }

    const AST: LenguajeAST = {
        type: "Program",
        body: [],
    };

    while (cursorPosition < tokens.length) {
        AST.body.push(ReadTokens());
    }

    return AST;
}