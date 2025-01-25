import { LETTER, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, SPACE, BRACKET_CLOSE, BRACKET_OPEN, COMMA, CURLY_CLOSE, CURLY_OPEN, DOUBLEQUOTE, NUMBER, EQUAL } from "../../constants";
import { ErrorFunctions, ThrowErrorIf } from "../../error";

export default function TokenSelector(
    scriptContentArray: string[],
    stringCharacter: string,
    linePosition: number,
    cursorPosition: number
): NTokenizer.TTokenSelectorResult {
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

    if (NUMBER.test(stringCharacter)) {
        let stringNumber = [];
        let newCursor = cursorPosition;
        while (
            scriptContentArray[linePosition].length > newCursor + 1 &&
            NUMBER.test(scriptContentArray[linePosition][newCursor + 1])
        ) {
            newCursor++;
            stringNumber.push(scriptContentArray[linePosition][newCursor]);
        }
        return [stringCharacter.concat(...stringNumber), "number", newCursor];
    }

    if (stringCharacter === PARENTHESIS_OPEN) {
        return [stringCharacter, "paren", cursorPosition];
    }

    if (stringCharacter === PARENTHESIS_CLOSE) {
        return [stringCharacter, "paren", cursorPosition];
    }

    if (stringCharacter === SPACE) {
        return [stringCharacter, "space", cursorPosition];
    }

    if (stringCharacter == COMMA) {
        return [stringCharacter, "comma", cursorPosition];
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

    if (stringCharacter === EQUAL) {
        return [stringCharacter, "equal", cursorPosition];
    }

    return ThrowErrorIf(true, "Tokenizer.TokenUnrecognized")(stringCharacter, linePosition, cursorPosition);
}