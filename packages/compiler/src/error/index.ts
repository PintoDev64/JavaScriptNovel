const ERROR_DEFINITIONS = {
    TOKENIZER: "TokenizerError",
    PARSER: "ParserError"
}

const ErrorFunctions = {
    Tokenizer: {
        TokenUnrecognized(character: string, line: number, cursor: number) {
            throw new SyntaxError(
                `${ERROR_DEFINITIONS.TOKENIZER} - Unexpected token "${character}" at line ${line}, position ${cursor}`
            );
        }
    },
    Parser: {
        TokenUnrecognized(type: string, value: string, line: number, cursor: number) {
            throw new Error(
                `${ERROR_DEFINITIONS.PARSER} - token is not recognized for the parser with type "${type}" and value: "${value}" at line ${line}, position ${cursor}`
            )
        },
        NameNotAllowed(name: string, line: number, cursor: number) {
            throw new SyntaxError(
                `${ERROR_DEFINITIONS.PARSER} - name not allowed to use as a name var or expression name: "${name}" at line ${line}, position ${cursor}`
            );
        }
    }
}

export default ErrorFunctions