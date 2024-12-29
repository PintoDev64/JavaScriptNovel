import { LETTER, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, SPACE, BRACKET_CLOSE, BRACKET_OPEN, COMMA, CURLY_CLOSE, CURLY_OPEN, NEWLINE, QUOTE } from "./constants";
import ERROR_DEFINITIONS from "./error";

/**
 * Tokenizes the script content into a list of tokens
 * @param {string} scriptContent Content of the script to be parsed as a string
 */
export default function Tokenizer(scriptContent: string) {
    let tokenList: NTokenizer.IToken[] = [];
    let stringCursor: number[] = [0];
    let stringLines = 1;

    while (stringCursor[stringLines - 1] < scriptContent.length) {
        const [value, type, line, cursor] = TokenSelector(scriptContent[stringCursor[stringLines - 1]], stringLines, stringCursor[stringLines - 1]);
        tokenList.push({
            type,
            value
        });
    }
}

function TokenSelector(stringSection: string, stringLinesNumber: number, stringCursorNumber: number): NTokenizer.TTokenSelectorResult {
    if (stringSection === NEWLINE) {
        return [stringSection, "newLine", stringLinesNumber + 1,0];
    }

    if (stringSection === PARENTHESIS_OPEN) {
        return [stringSection, "paren", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === PARENTHESIS_CLOSE) {
        return [stringSection, "paren", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === SPACE) {
        return [stringSection, "space", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection.match(LETTER)) {
        return [stringSection, "name", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection.match(COMMA)) {
        return [stringSection, "space", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === BRACKET_OPEN) {
        return [stringSection, "bracket", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === BRACKET_CLOSE) {
        return [stringSection, "bracket", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === CURLY_OPEN) {
        return [stringSection, "curly", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === CURLY_CLOSE) {
        return [stringSection, "curly", stringLinesNumber, stringCursorNumber + 1];
    }

    if (stringSection === QUOTE) {
        return [stringSection, "quote", stringLinesNumber, stringCursorNumber + 1];
    }
    
    throw new Error(`${ERROR_DEFINITIONS.TOKENIZER} - Unexpected token at position ${stringCursorNumber}`);
}