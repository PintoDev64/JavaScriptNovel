import { PARENTHESIS_CLOSE, TOKEN_TYPES } from "../constants";

export function ParserTokenParenValidation(actualToken: NTokenizer.IToken, nextToken: NTokenizer.IToken) {
    return (
        (actualToken.type !== TOKEN_TYPES.paren && actualToken.value !== PARENTHESIS_CLOSE) &&
        (nextToken.type !== TOKEN_TYPES.paren && nextToken.value === PARENTHESIS_CLOSE)
    )
}

export const ConsoleColors = {
    // Métodos para aplicar colores
    red: (text: string) => `\x1b[31m${text}\x1b[0m`,
    green: (text: string) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
    blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
    magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
    cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
    // Método para resetear colores
    reset: () => `\x1b[0m`,
};