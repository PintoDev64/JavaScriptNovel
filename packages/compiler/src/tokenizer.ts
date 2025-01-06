import { LETTER, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, SPACE, BRACKET_CLOSE, BRACKET_OPEN, COMMA, CURLY_CLOSE, CURLY_OPEN, NEWLINE, DOUBLEQUOTE, NUMBER, Equal } from "./constants";
import ERROR_DEFINITIONS from "./error";

/**
 * Tokenizes the script content into a list of tokens
 * @param {string} scriptContent Content of the script to be parsed as a string
 */
export default async function Tokenizer(scriptContent: string): Promise<NTokenizer.IToken[]> {
    const scriptContentArray = scriptContent.split(NEWLINE);
    const tokenList: NTokenizer.IToken[] = [];
    let linePosition = 0;
    let cursorPosition = 0;

    while (scriptContentArray.length > linePosition) {
        cursorPosition = 0;
        while (scriptContentArray[linePosition].length > cursorPosition) {
            const [character, type, cursor] = TokenSelector(
                scriptContentArray,
                scriptContentArray[linePosition][cursorPosition],
                linePosition,
                cursorPosition
            );

            type !== "space" && tokenList.push({
                line: linePosition + 1,
                position: cursorPosition,
                type,
                character
            });

            cursorPosition = cursor + 1;
        }
        linePosition++
    }

    return tokenList;
}

function TokenSelector(
    scriptContentArray: string[],
    stringCharacter: string,
    linePosition: number,
    cursorPosition: number
): NTokenizer.TTokenSelectorResult {
    if (stringCharacter === PARENTHESIS_OPEN) {
        return [stringCharacter, "paren", cursorPosition];
    }

    if (stringCharacter === PARENTHESIS_CLOSE) {
        return [stringCharacter, "paren", cursorPosition];
    }

    if (stringCharacter === SPACE) {
        return [stringCharacter, "space", cursorPosition];
    }

    if (LETTER.test(stringCharacter)) {
        let string = stringCharacter;
        let newCursor = cursorPosition;
        while (
            scriptContentArray[linePosition].length > newCursor + 1 &&
            LETTER.test(scriptContentArray[linePosition][newCursor + 1])
        ) {
            newCursor++;
            string += scriptContentArray[linePosition][newCursor];
        }
        return [string, "name", newCursor];
    }

    if (stringCharacter == COMMA) {
        return [stringCharacter, "space", cursorPosition];
    }

    if (stringCharacter === BRACKET_OPEN) {
        return [stringCharacter, "bracket", cursorPosition];
    }

    if (stringCharacter === BRACKET_CLOSE) {
        return [stringCharacter, "bracket", cursorPosition];
    }

    if (stringCharacter === CURLY_OPEN) {
        return [stringCharacter, "curly", cursorPosition];
    }

    if (stringCharacter === CURLY_CLOSE) {
        return [stringCharacter, "curly", cursorPosition];
    }

    if (stringCharacter === DOUBLEQUOTE) {
        return [stringCharacter, "doublequote", cursorPosition];
    }

    if (NUMBER.test(stringCharacter)) {
        return [stringCharacter, "number", cursorPosition];
    }

    if (stringCharacter === Equal) {
        return [stringCharacter, "equal", cursorPosition];
    }

    throw new SyntaxError(
        `${ERROR_DEFINITIONS.TOKENIZER} - Unexpected token "${stringCharacter}" at line ${linePosition}, position ${cursorPosition}`
    );
}