import { NEWLINE } from "../../constants";
import CreateToken from "./createToken";

export default function CompilerTokenizer(scriptContent: string): NTokenizer.IToken[] {
    const ScriptLines = scriptContent.split(NEWLINE);
    const Tokens: NTokenizer.IToken[] = [];

    let actualLine = 0;
    let actualCursor = 0;

    while (actualLine < ScriptLines.length) {
        actualCursor = 0
        while (actualCursor < ScriptLines[actualLine].length) {
            const [line, position, type, value] = CreateToken(
                ScriptLines[actualLine],
                actualLine,
                actualCursor
            ) as NTokenizer.FCreteToken
            Tokens.push({ line: line + 1, position: actualCursor, type, value })
            actualCursor = position
        }
        actualLine++
    }

    return Tokens
}