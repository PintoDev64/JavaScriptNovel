import { BRACKET_CLOSE, BRACKET_OPEN, COMMA, CURLY_CLOSE, CURLY_OPEN, DOUBLEQUOTE, EQUAL, LETTER, NUMBER, PARENTHESIS_CLOSE, PARENTHESIS_OPEN, SPACE } from "../../constants";
import { ThrowErrorIf } from "../../error";

export default function CreateToken(LineContent: string, line: number, cursor: number): [number, number, TTokenTypes, string] {
    let ActualCursor = cursor
    let TokenLetter = LineContent[ActualCursor]

    if (TokenLetter === SPACE) {
        console.log("Start Spaces", TokenLetter);
        while (TokenLetter === SPACE) {
            console.log("New Space");
            ActualCursor++
            TokenLetter = LineContent[ActualCursor]
        }
    }

    if (LETTER.test(TokenLetter)) {
        console.log("LETTER -> ", TokenLetter);
        const [NewCursor, LetterChain] = NameCheck(LineContent, ActualCursor)
        return [line, NewCursor + 1, "name", LetterChain]
    }

    if (NUMBER.test(TokenLetter)) {
        console.log("NUMBER -> ", TokenLetter);
        const [NewCursor, LetterChain] = NumberCheck(LineContent, ActualCursor)
        return [line, NewCursor + 1, "number", LetterChain]
    }

    if (TokenLetter === PARENTHESIS_OPEN || TokenLetter === PARENTHESIS_CLOSE) {
        console.log("PARENTHESIS_CLOSE -> ", TokenLetter);
        return [line, ActualCursor + 1, "parenthesis", TokenLetter]
    }

    if (TokenLetter === BRACKET_OPEN || TokenLetter === BRACKET_CLOSE) {
        console.log("BRACKET_CLOSE -> ", TokenLetter);
        return [line, ActualCursor + 1, "bracket", TokenLetter]
    }

    if (TokenLetter === CURLY_OPEN || TokenLetter === CURLY_CLOSE) {
        console.log("CURLY_CLOSE -> ", TokenLetter);
        return [line, ActualCursor + 1, "curly", TokenLetter]
    }

    if (TokenLetter === DOUBLEQUOTE) {
        console.log("DOUBLEQUOTE -> ", TokenLetter);
        return [line, ActualCursor + 1, "doublequote", TokenLetter]
    }

    if (TokenLetter === COMMA) {
        console.log("COMMA -> ", TokenLetter);
        return [line, ActualCursor + 1, "comma", TokenLetter]
    }

    if (TokenLetter === EQUAL) {
        console.log("EQUAL -> ", TokenLetter);
        return [line, ActualCursor + 1, "equal", TokenLetter]
    }

    return ThrowErrorIf(true, "Tokenizer.TokenUnrecognized")(TokenLetter, line + 1, cursor)
}

function NameCheck(LineContent: string, cursor: number): [number, string] {
    console.log("NameCheck");
    let LetterChain: string = "";
    let ActualCursor = cursor;
    while (ActualCursor < LineContent.length && LETTER.test(LineContent[ActualCursor]) || NUMBER.test(LineContent[ActualCursor])) {
        console.log("Actual Letter Checked: ", LineContent[ActualCursor]);
        
        LetterChain += LineContent[ActualCursor];
        ActualCursor++
    }
    return [ActualCursor, LetterChain]
}

function NumberCheck(LineContent: string, cursor: number): [number, string] {
    console.log("NumberCheck");
    let StringNumber: string = "";
    let ActualCursor = cursor;
    while (ActualCursor < LineContent.length && NUMBER.test(LineContent[ActualCursor])) {
        console.log("Actual Number Checked: ", LineContent[ActualCursor]);
        
        StringNumber += LineContent[ActualCursor];
        ActualCursor++
    }
    return [ActualCursor, StringNumber]
}