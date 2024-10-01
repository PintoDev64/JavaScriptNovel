import { LETTERS, NUMBERS, STRING } from "../../constants";

interface ReturnParams<T> {
    position: number;
    value: T;
}

// Función que siempre retorna null
export function CommentLine(Position: number, Content: string): ReturnParams<null> {
    let actualPosition = Position;
    let character = Content[actualPosition];

    while (actualPosition < Content.length && character !== "\n") {
        actualPosition++;
        character = Content[actualPosition];
    }

    actualPosition++;

    return {
        position: actualPosition,
        value: null
    };
}

// Función que siempre retorna una cadena de números
export function StringNumber(Position: number, Content: string): ReturnParams<string> {
    let actualPosition = Position;
    let character = Content[actualPosition];
    let stringNumbers = "";

    while (NUMBERS.test(character)) {
        stringNumbers += character;
        actualPosition++;
        character = Content[actualPosition];
    }

    actualPosition++;

    return {
        position: actualPosition,
        value: stringNumbers
    };
}

export function DeclarationNames(Position: number, Content: string): ReturnParams<string> {
    let actualPosition = Position;
    let character = Content[actualPosition];
    let stringPart = "";

    while (LETTERS.test(character)) {
        stringPart += character;
        actualPosition++;
        character = Content[actualPosition];
    }

    return {
        position: actualPosition,
        value: stringPart
    };
}

export function Strings(Position: number, Content: string): ReturnParams<string> {
    let actualPosition = Position + 1; // Salta la comilla de apertura
    let character = Content[actualPosition];
    let stringCaptured = "";

    while (actualPosition < Content.length) {
        // Manejar comillas escapadas (ej: \")
        if (character === '\\' && Content[actualPosition + 1] === '"') {
            stringCaptured += '"';
            actualPosition += 2; // Saltar tanto la barra invertida como la comilla
            character = Content[actualPosition];
            continue;
        }

        // Si encontramos una comilla de cierre, terminamos de capturar la cadena
        if (character === '"') {
            actualPosition++; // Avanzar después de la comilla de cierre
            break;
        }

        // Captura cualquier otro carácter dentro de la cadena
        stringCaptured += character;
        actualPosition++;
        character = Content[actualPosition];
    }

    // Verifica si llegamos al final sin encontrar una comilla de cierre
    if (actualPosition >= Content.length && character !== '"') {
        throw new Error('Cadena sin comilla de cierre');
    }

    return {
        position: actualPosition,  // Posición actualizada después de la comilla de cierre
        value: stringCaptured      // Cadena capturada correctamente
    }
}
