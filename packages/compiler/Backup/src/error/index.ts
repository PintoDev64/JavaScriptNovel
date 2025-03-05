const ERROR_DEFINITIONS = {
    TOKENIZER: "TokenizerError",
    PARSER: "ParserError"
}

const ErrorFunctions: NError.IErrorFunctions = {
    Tokenizer: {
        TypeError: (line: number, cursor: number) => {
            throw new SyntaxError(
                `${ERROR_DEFINITIONS.TOKENIZER} - Unexpected token at line ${line}, position ${cursor}`
            );
        }
        ,
        TokenUnrecognized: (line: number, cursor: number) => {
            throw new SyntaxError(
                `${ERROR_DEFINITIONS.TOKENIZER} - Unexpected token at line ${line}, position ${cursor}`
            );
        }
    },
    Parser: {
        TokenValueInvalid: (line: number, cursor: number) => {
            throw new Error(
                `${ERROR_DEFINITIONS.PARSER} - token value is not valid at line ${line}, position ${cursor}`
            )
        },
        TokenInvalid: (value: string, line: number, cursor: number) => {
            throw new Error(
                `${ERROR_DEFINITIONS.PARSER} - token "${value}" is not valid at line ${line}, position ${cursor}`
            )
        },
        TokenUnrecognized: (value: string, line: number, cursor: number) => {
            throw new Error(
                `${ERROR_DEFINITIONS.PARSER} - The token "${value}" is not recognized for the parser at line ${line}, position ${cursor}`
            )
        },
        MissingToken: (name: string, line: number, cursor: number) => {
            throw new SyntaxError(
                `${ERROR_DEFINITIONS.PARSER} - Missing token or property to complete: "${name}" at line ${line}, position ${cursor}.`
            );
        },
        NameNotAllowed: (name: string, line: number, cursor: number) => {
            throw new SyntaxError(
                `${ERROR_DEFINITIONS.PARSER} - name not allowed to use as a name var or expression name: "${name}" at line ${line}, position ${cursor}`
            );
        }
    }
}

function ThrowErrorIf<T extends NError.TErrorTypes>(Condition: boolean, ErrorType: T): NError.IErrorFunctions[T] | undefined {
    if (!Condition) return ErrorFunctions[ErrorType];
    return undefined;
}

export {
    ThrowErrorIf,
    ErrorFunctions
}