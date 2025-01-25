import { CURLY_CLOSE, EQUAL, PARENTHESIS_CLOSE, TOKEN_SPECIAL_TYPES, TOKEN_TYPES } from "../constants";

export function ParserTokenParenValidation(actualToken: NTokenizer.IToken) {
    // Permite procesar mientras no se cierre el paréntesis
    return !(actualToken.type === TOKEN_TYPES.paren && actualToken.value === PARENTHESIS_CLOSE)
}

export function ParserTokenCurlyValidation(actualToken: NTokenizer.IToken) {
    // Permite procesar mientras no se cierre el paréntesis
    return !(actualToken.type === TOKEN_TYPES.curly && actualToken.value === CURLY_CLOSE)
}

export function ParserTokenIsNotSpecialName(token: NTokenizer.IToken) {
    return TOKEN_SPECIAL_TYPES[token.value.toLocaleLowerCase() as TTokenSpecialNames] !== undefined
}

export function ParserNextTokenIsEqual(nextToken: NTokenizer.IToken) {
    return nextToken.type !== TOKEN_TYPES.equal || nextToken.value !== EQUAL;
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