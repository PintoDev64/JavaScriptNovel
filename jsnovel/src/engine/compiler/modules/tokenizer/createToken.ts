import type { NTokenizer, TTokenTypes, TTokenSpecialNames } from "src/engine/ports/compiler.js";

import { BRACKET_CLOSE, BRACKET_OPEN, COMMA, CURLY_CLOSE, CURLY_OPEN, DOUBLEQUOTE, EQUAL, LETTER, NUMBER, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, POINT, SEMICOLON, SPACE, SPECIALLETTERS, TOKEN_KEYWORDS } from "../../constants";
import { ThrowErrorIf } from "../../error";

/**
 * Create and return a new token based on the content of the line read
 * @param LineContent content of the line
 * ​​@param line line of the cursor of the fragment to read
 * @param cursor position of the cursor of the fragment to read
 * @returns {NTokenizer.FCreteToken | undefined} Array [Line, Cursor, Type, Token]
 */
export default function CreateToken(LineContent: string, line: number, cursor: number): NTokenizer.FCreteToken | undefined {
    let ActualCursor = cursor
    let TokenLetter = LineContent[ActualCursor]

    if (SPACE.test(TokenLetter) || TokenLetter === SEMICOLON) {
        while (SPACE.test(TokenLetter) || TokenLetter === SEMICOLON) {
            ActualCursor++
            TokenLetter = LineContent[ActualCursor]
        }
    }

    if (LETTER.test(TokenLetter)) {
        const [NewCursor, TokenType, LetterChain] = NameCheck(LineContent, ActualCursor)
        return [line, NewCursor, TokenType, LetterChain]
    }

    if (NUMBER.test(TokenLetter)) {
        const [NewCursor, LetterChain] = NumberCheck(LineContent, line, ActualCursor)
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
        const [NewCursor, _, LetterChain] = NameCheck(LineContent, ++ActualCursor, true)
        return [line, NewCursor + 1, "string", LetterChain]
    }

    if (TokenLetter === COMMA) {
        return [line, ActualCursor + 1, "comma", TokenLetter]
    }

    if (TokenLetter === EQUAL) {
        return [line, ActualCursor + 1, "equal", TokenLetter]
    }

    ThrowErrorIf(true, "Tokenizer")?.TokenUnrecognized(line + 1, ActualCursor + 1)
}

function NameCheck(LineContent: string, cursor: number, CheckSpaces: boolean = false): [number, TTokenTypes, string] {
    let LetterChain: string = "";
    let LocalCursor = cursor;
    let LocalType: TTokenTypes = "identifier";
    while (
        LocalCursor < LineContent.length &&
        LineContent[LocalCursor] !== DOUBLEQUOTE &&
        LineContent[LocalCursor] !== PARENTHESIS_OPEN &&
        LineContent[LocalCursor] !== CURLY_OPEN &&
        LineContent[LocalCursor] !== BRACKET_OPEN &&
        LineContent[LocalCursor] !== COMMA &&
        (LETTER.test(LineContent[LocalCursor]) ||
            NUMBER.test(LineContent[LocalCursor]) ||
            SPECIALLETTERS.test(LineContent[LocalCursor]) ||
            (CheckSpaces && SPACE.test(LineContent[LocalCursor])))
    ) {
        LetterChain += LineContent[LocalCursor];
        LocalCursor++
    }
    if (typeof TOKEN_KEYWORDS[LetterChain.toLowerCase() as TTokenSpecialNames] !== "undefined") LocalType = "keyword";

    return [LocalCursor, LocalType, LetterChain]
}

function NumberCheck(LineContent: string, line: number, cursor: number): [number, string] {
    let StringNumber: string = "";
    let LocalCursor = cursor;
    let Decimal = false
    while (
        LocalCursor < LineContent.length &&
        LineContent[LocalCursor] === POINT ||
        NUMBER.test(LineContent[LocalCursor])
    ) {
        if (Decimal === true && LineContent[LocalCursor] === POINT) {
            ThrowErrorIf(true, "Tokenizer")?.TypeError(line + 1, LocalCursor + 1);
        }
        if (Decimal === false && LineContent[LocalCursor] === POINT) {
            Decimal = true
        }

        StringNumber += LineContent[LocalCursor];
        LocalCursor++
    }
    return [LocalCursor, StringNumber]
}