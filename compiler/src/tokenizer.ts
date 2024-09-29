export default function Tokenizer(lenguajeContent: string): LenguajeTokens {
    let cursorPosition = 0;
    let tokens: LenguajeTokens = [];

    const PARAMS_SEPARATOR = ",";
    const COMMENT_LINE = /^\s*\/\//;
    const SEMICOLON = ";";
    const OPEN_PARENTHESIS = "(";
    const CLOSE_PARENTHESIS = ")";
    const WHITESPACES = /\s/;
    const NUMBERS = /[0-9]/;
    const LETTERS = /[a-z]/i;
    const STRING = /"/;

    while (cursorPosition < lenguajeContent.length) {
        let character = lenguajeContent[cursorPosition];

        // Manejar comentarios de línea
        if (COMMENT_LINE.test(lenguajeContent.slice(cursorPosition))) {
            // Avanza el cursor hasta el final de la línea
            while (cursorPosition < lenguajeContent.length && character !== "\n") {
                cursorPosition++;
                character = lenguajeContent[cursorPosition];
            }
            cursorPosition++;
            continue; // Ignorar el comentario
        }

        // Procesar paréntesis
        if (character === OPEN_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: OPEN_PARENTHESIS });
            cursorPosition++;
            continue;
        }

        if (character === CLOSE_PARENTHESIS) {
            tokens.push({ type: "parenthesis", value: CLOSE_PARENTHESIS });
            cursorPosition++;
            continue;
        }

        // Procesar comas como separadores de parámetros
        if (character === PARAMS_SEPARATOR) {
            tokens.push({ type: "comma", value: PARAMS_SEPARATOR });
            cursorPosition++;
            continue;
        }

        // Procesar espacios en blanco
        if (WHITESPACES.test(character)) {
            cursorPosition++;
            continue;
        }

        // Procesar números
        if (NUMBERS.test(character)) {
            let stringNumbers = "";
            while (NUMBERS.test(character)) {
                stringNumbers += character;
                cursorPosition++;
                character = lenguajeContent[cursorPosition];
            }
            tokens.push({ type: "number", value: stringNumbers });
            continue;
        }

        // Procesar nombres (identificadores)
        if (LETTERS.test(character)) {
            let textString = "";
            while (LETTERS.test(character)) {
                textString += character;
                cursorPosition++;
                character = lenguajeContent[cursorPosition];
            }
            tokens.push({ type: "name", value: textString });
            continue;
        }

        // Procesar punto y coma
        if (character === SEMICOLON) {
            tokens.push({ type: "semicolon", value: SEMICOLON });
            cursorPosition++;
            continue;
        }

        // Procesar cadenas
        if (STRING.test(character)) {
            let textString = '';
            cursorPosition++;
            character = lenguajeContent[cursorPosition];

            while (cursorPosition < lenguajeContent.length) {
                if (character === '\\' && lenguajeContent[cursorPosition + 1] === '"') {
                    textString += '"';
                    cursorPosition += 2;
                    character = lenguajeContent[cursorPosition];
                    continue;
                }

                if (STRING.test(character)) {
                    cursorPosition++;
                    break;
                }

                textString += character;
                cursorPosition++;
                character = lenguajeContent[cursorPosition];
            }

            if (!STRING.test(character) && cursorPosition >= lenguajeContent.length) {
                throw new Error('Cadena sin comilla de cierre');
            }

            tokens.push({ type: 'string', value: textString });
            continue;
        }

        // Si llegamos aquí, significa que no reconocimos el carácter
        throw new TypeError("I don't know what this character is: " + character);
    }

    return tokens;
}
