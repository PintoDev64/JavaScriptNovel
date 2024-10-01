// Components
import { CommentLine, DeclarationNames, StringNumber, Strings } from "./components";

// Contants
import { CLOSE_PARENTHESIS, COMMENT_LINE, LETTERS, NUMBERS, OPEN_PARENTHESIS, PARAMS_SEPARATOR, STRING, WHITESPACES } from "../constants";

export default function Tokenizer(FileContent: string): TokensStructure[] {
    // Global Flow
    let cursorPosition = 0;
    let tokens: TokensStructure[] = [];

    while (cursorPosition < FileContent.length) {

        let actualCharacter = FileContent[cursorPosition];

        // Manejar comentarios de línea
        if (COMMENT_LINE.test(FileContent.slice(cursorPosition))) {
            const { position } = CommentLine(cursorPosition, FileContent)
            cursorPosition = position
            continue;
        }

        // Procesar espacios en blanco
        if (WHITESPACES.test(actualCharacter)) {
            cursorPosition++;
            continue;
        }

        // Procesar comas como separadores de parámetros
        if (actualCharacter === PARAMS_SEPARATOR) {
            tokens.push({ type: "comma", value: PARAMS_SEPARATOR });
            cursorPosition++;
            continue;
        }
        
        // Procesar paréntesis
        if (actualCharacter === OPEN_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: OPEN_PARENTHESIS });
            cursorPosition++;
            continue;
        }

        if (actualCharacter === CLOSE_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: CLOSE_PARENTHESIS });
            cursorPosition++;
            continue;
        }
        
        // Procesar números
        if (NUMBERS.test(actualCharacter)) {
            const { position, value } = StringNumber(cursorPosition, FileContent)
            cursorPosition = position
            tokens.push({
                type: "number",
                value: value
            })
            continue;
        }

        // Procesar nombres (identificadores)
        if (LETTERS.test(actualCharacter)) {
            const { position, value } = DeclarationNames(cursorPosition, FileContent)
            cursorPosition = position
            tokens.push({
                type: "name",
                value: value
            })
            continue;
        }
        
        if (STRING.test(actualCharacter)) {
            const { position, value } = Strings(cursorPosition, FileContent)
            cursorPosition = position
            tokens.push({
                type: "string",
                value: value
            })
            continue
        }

        // Si llegamos aquí, significa que no reconocimos el carácter
        throw new TypeError(`the character "${actualCharacter}" is not recognizable`);
    }

    return tokens
}