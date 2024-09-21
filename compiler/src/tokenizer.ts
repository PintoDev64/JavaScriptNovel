export default function Tokenizer(lenguajeContent: string): LenguajeTokens {
    let cursorPosition = 0;
    let tokens: LenguajeTokens = [];

    const SEMICOLON = ";"
    const OPEN_PARENTHESIS = "(";
    const CLOSE_PARENTHESIS = ")";
    const WHITESPACES = /\s/;
    const NUMBERS = /[0-9]/;
    const LETTERS = /[a-z]/i;
    const STRING = /"/;

    while (cursorPosition < lenguajeContent.length) {
        let character = lenguajeContent[cursorPosition];

        // Detect when character is a parenthesis
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

        // Detect if character is a whitespace
        if (WHITESPACES.test(character)) {
            cursorPosition++;
            continue;
        }

        // Detect if character is a number
        if (NUMBERS.test(character)) {
            let stringNumbers = "";
            while (NUMBERS.test(character)) {
                stringNumbers += character;
                cursorPosition++;
                character = lenguajeContent[cursorPosition]; // Update character after advancing
            }
            tokens.push({ type: "number", value: stringNumbers });
            continue;
        }

        // Detect if character is a letter
        if (LETTERS.test(character)) {
            let textString = "";
            while (LETTERS.test(character)) {
                textString += character;
                cursorPosition++;
                character = lenguajeContent[cursorPosition]; // Update character after advancing
            }
            tokens.push({ type: "name", value: textString });
            continue;
        }

        if (character === SEMICOLON) {
            tokens.push({ type: "semicolon", value: SEMICOLON });
            cursorPosition++;
            continue;
        }

        if (STRING.test(character)) {
            let textString = '';
            cursorPosition++; // Mueve el cursor después de la comilla de apertura
            character = lenguajeContent[cursorPosition];

            while (cursorPosition < lenguajeContent.length) {
                // Maneja comillas escapadas (\")
                if (character === '\\' && lenguajeContent[cursorPosition + 1].match(STRING)) {
                    textString += '"';
                    cursorPosition += 2; // Saltar la barra invertida y la comilla escapada
                    character = lenguajeContent[cursorPosition];
                    continue;
                }

                // Detecta el fin de la cadena con comilla de cierre
                if (STRING.test(character)) {
                    cursorPosition++; // Avanza después de la comilla de cierre
                    break;
                }

                // Añade el carácter actual a la cadena
                textString += character;
                cursorPosition++;
                character = lenguajeContent[cursorPosition];
            }

            // Si no encuentra la comilla de cierre y llega al final del texto, lanzar un error o manejarlo
            if (!STRING.test(character) && cursorPosition >= lenguajeContent.length) {
                throw new Error('Cadena sin comilla de cierre');
            }

            tokens.push({ type: 'string', value: textString });
            continue;
        }

        throw new TypeError("I don't know what this character is: " + character);
    }

    return tokens;
}
