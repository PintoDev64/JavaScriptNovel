// Components
import { CommentLine, DeclarationNames, StringNumber, Strings } from "./components";

// Contants
import { CLOSE_PARENTHESIS, COMMENT_LINE, EQUALEVAL, LETTERS, NUMBERS, OPEN_PARENTHESIS, PARAMS_SEPARATOR, SEMICOLON, STRING, WHITESPACES } from "../constants";

export default function Tokenizer(FileContent: string): TokensStructure[] {

    // Global Flow
    let cursorPosition = 0;
    let tokens: TokensStructure[] = [];

    while (cursorPosition < FileContent.length) {

        let actualCharacter = FileContent[cursorPosition];

        if (cursorPosition >= FileContent.length) {
            throw new Error("Cursor out of limit")
        }

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

        // Procesa terminaciones de codigo con "Semicolons" - ";"
        if (actualCharacter === SEMICOLON) {
            tokens.push({ type: "semicolon", value: SEMICOLON });
            cursorPosition++;
            continue;
        }

        // Procesar comas como separadores de parámetros
        if (actualCharacter === PARAMS_SEPARATOR) {
            tokens.push({ type: "comma", value: PARAMS_SEPARATOR });
            cursorPosition++;
            continue;
        }
        
        // Procesa paréntesis abierto
        if (actualCharacter === OPEN_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: OPEN_PARENTHESIS });
            cursorPosition++;
            continue;
        }

        // Procesa parentesis cerrado
        if (actualCharacter === CLOSE_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: CLOSE_PARENTHESIS });
            cursorPosition++;
            continue;
        }

        // Procesa un caracter de "Igual" - "="
        if (actualCharacter === EQUALEVAL) {
            tokens.push({ type: "equal", value: EQUALEVAL });
            cursorPosition++;
            continue;
        }
        
        // Procesa números
        if (NUMBERS.test(actualCharacter)) {
            const { position, value } = StringNumber(cursorPosition, FileContent)
            cursorPosition = position
            value !== null && tokens.push(value)
            continue;
        }

        // Procesa nombres (identificadores)
        if (LETTERS.test(actualCharacter)) {
            const { position, value } = DeclarationNames(cursorPosition, FileContent)
            cursorPosition = position
            value !== null && tokens.push(value)
            continue;
        }
        
        // Procesa cadenas de texto
        if (actualCharacter === STRING) {
            const { position, value } = Strings(cursorPosition, FileContent)
            cursorPosition = position
            value !== null && tokens.push(value)
            continue;
        }

        // Si llegamos aquí, significa que no reconocimos el carácter
        throw new TypeError(`(Tokenizer) the character "${actualCharacter}" is not recognizable`);
    }

    return tokens
}