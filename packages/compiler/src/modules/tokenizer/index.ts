import { NEWLINE } from "../../constants";
import TokenSelector from "./convertToToken";

/**
 * Tokenizes the script content into a list of tokens
 * @param {string} scriptContent Content of the script to be parsed as a string
 */
export default async function CompilerTokenizer(scriptContent: string): Promise<NTokenizer.IToken[]> {
    const scriptContentArray = scriptContent.split(NEWLINE);
    const tokenList: NTokenizer.IToken[] = [];
    let linePosition = 0;
    let cursorPosition = 0;

    function ReadLineContent(scriptContentArray: string[], linePosition: number, cursorPosition: number) {
        const stringCharacter = scriptContentArray[linePosition][cursorPosition];
        const [character, type, cursor] = TokenSelector(
            scriptContentArray,
            stringCharacter,
            linePosition,
            cursorPosition
        );

        type !== "space" && tokenList.push({
            line: linePosition + 1,
            position: cursorPosition,
            type: type,
            value: character
        });

        cursorPosition = cursor + 1;

        return [cursorPosition];
    }

    while (scriptContentArray.length > linePosition) {
        cursorPosition = 0;
        while (scriptContentArray[linePosition].length > cursorPosition) {
            const [cursor] = ReadLineContent(scriptContentArray, linePosition, cursorPosition);
            cursorPosition = cursor;
        }
        linePosition++
    }

    return tokenList;
}