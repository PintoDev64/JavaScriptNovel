import { BRACKET_CLOSE, BRACKET_OPEN, COMMA, CURLY_CLOSE, CURLY_OPEN, DOUBLEQUOTE, EQUAL, LETTER, NUMBER, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, SPACE, TOKEN_KEYWORDS } from "../../constants";
import { ThrowErrorIf } from "../../error";

/**
 * Create and return a new token based on the content of the line read
 * @param LineContent content of the line
 * ​​@param line line of the cursor of the fragment to read
 * @param cursor position of the cursor of the fragment to read
 * @returns Returns the new line, position, type and result of the generated token
 */
export default function CreateToken(LineContent: string, line: number, cursor: number): [number, number, TTokenTypes, string] {
    let ActualCursor = cursor
    let TokenLetter = LineContent[ActualCursor]

    if (SPACE.test(TokenLetter)) {
        while (SPACE.test(TokenLetter)) {
            ActualCursor++
            TokenLetter = LineContent[ActualCursor]
        }
    }

    if (LETTER.test(TokenLetter)) {
        const [NewCursor, TokenType, LetterChain] = NameCheck(LineContent, ActualCursor)
        return [line, NewCursor, TokenType, LetterChain]
    }

    if (NUMBER.test(TokenLetter)) {
        const [NewCursor, LetterChain] = NumberCheck(LineContent, ActualCursor)
        return [line, NewCursor, "number", LetterChain]
    }

    if (TokenLetter === PARENTHESIS_OPEN || TokenLetter === PARENTHESIS_CLOSE) {
        return [line, ActualCursor + 1, "parenthesis", TokenLetter]
    }

    if (TokenLetter === BRACKET_OPEN || TokenLetter === BRACKET_CLOSE) {
        return [line, ActualCursor + 1, "bracket", TokenLetter]
    }

    if (TokenLetter === CURLY_OPEN || TokenLetter === CURLY_CLOSE) {
        return [line, ActualCursor + 1, "curly", TokenLetter]
    }

    if (TokenLetter === DOUBLEQUOTE) {
        const [NewCursor, _, LetterChain] = NameCheck(LineContent, ++ActualCursor, false)
        return [line, NewCursor + 1, "string", LetterChain]
    }

    if (TokenLetter === COMMA) {
        return [line, ActualCursor + 1, "comma", TokenLetter]
    }

    if (TokenLetter === EQUAL) {
        return [line, ActualCursor + 1, "equal", TokenLetter]
    }

    return ThrowErrorIf(true, "Tokenizer.TokenUnrecognized")(TokenLetter, line + 1, cursor)
}

function NameCheck(LineContent: string, cursor: number, CheckKeywords: boolean = true): [number, TTokenTypes, string] {
    let LetterChain: string = "";
    let ActualCursor = cursor;
    let ActualType: TTokenTypes = "identifier";
    while (
        ActualCursor < LineContent.length &&
        LETTER.test(LineContent[ActualCursor]) ||
        NUMBER.test(LineContent[ActualCursor]) ||
        SPACE.test(LineContent[ActualCursor])
    ) {
        if (CheckKeywords && typeof TOKEN_KEYWORDS[LetterChain.toLowerCase() as TTokenSpecialNames] !== "undefined") break;
        LetterChain += LineContent[ActualCursor];
        ActualCursor++
    }
    if (typeof TOKEN_KEYWORDS[LetterChain.toLowerCase() as TTokenSpecialNames] !== "undefined") ActualType = "keyword";

    return [ActualCursor, ActualType, LetterChain]
}

function NumberCheck(LineContent: string, cursor: number): [number, string] {
    let StringNumber: string = "";
    let ActualCursor = cursor;
    while (
        ActualCursor < LineContent.length &&
        NUMBER.test(LineContent[ActualCursor])
    ) {
        StringNumber += LineContent[ActualCursor];
        ActualCursor++
    }
    return [ActualCursor, StringNumber]
}