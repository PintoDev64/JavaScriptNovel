import type { NTokenizer } from "src/engine/ports/compiler.js";

import { NEWLINE } from "../../constants";
import CreateToken from "./createToken";

/**
 * Reads the script and transforms it into tokens, which will be processed by the compiler
 * @param scriptContent Plain text content of the script
 * @param FileName Name of the file being compiled
 * @returns {NTokenizer.ITokenEntry} Object { file, tokens }
 */
export default function CompilerTokenizer(scriptContent: string, FileName: string): NTokenizer.ITokenEntry {
    const ScriptLines = scriptContent.split(NEWLINE);
    const Tokens: NTokenizer.IToken[] = [];

    let actualLine = 0;
    let actualCursor = 0;
    let textPosition = 0

    while (actualLine < ScriptLines.length) {
        actualCursor = 0
        while (actualCursor < ScriptLines[actualLine].length) {
            const [line, position, type, value] = CreateToken(
                ScriptLines[actualLine],
                actualLine,
                actualCursor
            ) as NTokenizer.FCreteToken
            textPosition = actualCursor === 0 ? actualCursor + 1 : actualCursor + 2
            Tokens.push({ line: line + 1, position: textPosition, type, value })
            actualCursor = position
        }
        actualLine++
    }

    return {
        file: FileName,
        tokens: Tokens
    }
}