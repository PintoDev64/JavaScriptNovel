"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tokenizer;
// Components
const components_1 = require("./components");
// Contants
const constants_1 = require("../constants");
function Tokenizer(FileContent) {
    // Global Flow
    let cursorPosition = 0;
    let tokens = [];
    while (cursorPosition < FileContent.length) {
        let actualCharacter = FileContent[cursorPosition];
        if (cursorPosition >= FileContent.length) {
            throw new Error("Cursor out of limit");
        }
        if (actualCharacter === constants_1.COLON) {
            tokens.push({ type: "colon", value: constants_1.COLON });
            cursorPosition++;
            continue;
        }
        // Manejar comentarios de línea
        if (constants_1.COMMENT_LINE.test(FileContent.slice(cursorPosition))) {
            const { position } = (0, components_1.CommentLine)(cursorPosition, FileContent);
            cursorPosition = position;
            continue;
        }
        // Procesar espacios en blanco
        if (constants_1.WHITESPACES.test(actualCharacter)) {
            cursorPosition++;
            continue;
        }
        // Procesa terminaciones de codigo con "Semicolons" - ";"
        if (actualCharacter === constants_1.SEMICOLON) {
            tokens.push({ type: "semicolon", value: constants_1.SEMICOLON });
            cursorPosition++;
            continue;
        }
        // Procesar comas como separadores de parámetros
        if (actualCharacter === constants_1.PARAMS_SEPARATOR) {
            tokens.push({ type: "comma", value: constants_1.PARAMS_SEPARATOR });
            cursorPosition++;
            continue;
        }
        // Procesa paréntesis abierto
        if (actualCharacter === constants_1.OPEN_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: constants_1.OPEN_PARENTHESIS });
            cursorPosition++;
            continue;
        }
        // Procesa parentesis cerrado
        if (actualCharacter === constants_1.CLOSE_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: constants_1.CLOSE_PARENTHESIS });
            cursorPosition++;
            continue;
        }
        // Procesa llaves abiertas
        if (actualCharacter === constants_1.OPEN_KEY) {
            tokens.push({ type: "keys", value: constants_1.OPEN_KEY });
            cursorPosition++;
            continue;
        }
        // Procesa llaves abiertas
        if (actualCharacter === constants_1.CLOSE_KEY) {
            tokens.push({ type: "keys", value: constants_1.CLOSE_KEY });
            cursorPosition++;
            continue;
        }
        // Procesa un caracter de "Igual" - "="
        if (actualCharacter === constants_1.EQUALEVAL) {
            tokens.push({ type: "equal", value: constants_1.EQUALEVAL });
            cursorPosition++;
            continue;
        }
        // Procesa números
        if (constants_1.NUMBERS.test(actualCharacter)) {
            const { position, value } = (0, components_1.StringNumber)(cursorPosition, FileContent);
            cursorPosition = position;
            value !== null && tokens.push(value);
            continue;
        }
        // Procesa nombres (identificadores)
        if (constants_1.LETTERS.test(actualCharacter)) {
            const { position, value } = (0, components_1.DeclarationNames)(cursorPosition, FileContent);
            cursorPosition = position;
            value !== null && tokens.push(value);
            continue;
        }
        // Procesa cadenas de texto
        if (actualCharacter === constants_1.STRING) {
            const { position, value } = (0, components_1.Strings)(cursorPosition, FileContent);
            cursorPosition = position;
            value !== null && tokens.push(value);
            continue;
        }
        // Si llegamos aquí, significa que no reconocimos el carácter
        throw new TypeError(`(Tokenizer) the character "${actualCharacter}" is not recognizable`);
    }
    return tokens;
}
