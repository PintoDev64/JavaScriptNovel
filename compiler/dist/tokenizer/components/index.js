"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLine = CommentLine;
exports.StringNumber = StringNumber;
exports.DeclarationNames = DeclarationNames;
exports.Strings = Strings;
const constants_1 = require("../../constants");
const GlobalVariablesDefinitions = {
    var: "global",
    Audio: "audio",
    Image: "image",
    Video: "video",
    Character: "character"
};
const GlobalSpecialDefinitions = {
    Audio: true,
    character: true,
    Image: true,
    Video: true,
    if: true,
    for: true,
    scene: true,
    background: true,
    jump: true,
    call: true,
    play: true,
    stop: true,
    import: false
};
/**
 * Retorna un valor nulo al detectar comentario
 */
function CommentLine(Position, Content) {
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
/**
 * Retorna una cadena de numeros
 */
function StringNumber(Position, Content) {
    let actualPosition = Position;
    let character = Content[actualPosition];
    let stringNumbers = "";
    while (constants_1.NUMBERS.test(character)) {
        stringNumbers += character;
        actualPosition++;
        character = Content[actualPosition];
    }
    actualPosition++;
    return {
        position: actualPosition,
        value: {
            type: "number",
            value: stringNumbers
        }
    };
}
/**
 * Retorna las declaraciones de variables
 */
function DeclarationNames(Position, Content) {
    let actualPosition = Position;
    let character = Content[actualPosition];
    let nameString = "";
    while (constants_1.LETTERS.test(character) && actualPosition < Content.length) {
        nameString += character;
        actualPosition++;
        character = Content[actualPosition];
        if (actualPosition > Content.length) {
            throw new Error(`(DeclarationNames) Exceeded file length while capturing name: "${nameString}"`);
        }
    }
    if (GlobalVariablesDefinitions[nameString] !== undefined || GlobalSpecialDefinitions[nameString] !== undefined && GlobalSpecialDefinitions[nameString] === undefined) {
        return GlobalVariables(actualPosition, Content, nameString);
    }
    return {
        position: actualPosition,
        value: {
            type: "name",
            value: nameString
        }
    };
}
function GlobalVariables(Position, Content, Type) {
    let actualPosition = Position;
    let character = Content[actualPosition];
    actualPosition++;
    while (constants_1.SPACEBAR.test(Content[actualPosition])) {
        actualPosition++;
    }
    let varName = "";
    character = Content[actualPosition];
    while (constants_1.LETTERS.test(character)) {
        varName += character;
        actualPosition++;
        character = Content[actualPosition];
    }
    if (varName.length === 0) {
        throw new TypeError("(Tokenizer) Variable name not defined 'var {nombre}'");
    }
    if (GlobalVariablesDefinitions[varName] !== undefined) {
        throw new TypeError(`(Tokenizer) The use of special names such as variable names is not allowed - "${varName}"`);
    }
    if (GlobalSpecialDefinitions[varName] !== undefined) {
        throw new TypeError(`(Tokenizer) The use of special names such as variable names is not allowed - "${varName}"`);
    }
    return {
        position: actualPosition,
        value: {
            type: GlobalVariablesDefinitions[Type],
            value: varName
        }
    };
}
function Strings(Position, Content) {
    let actualPosition = Position + 1; // Saltamos la comilla de apertura
    let character = Content[actualPosition];
    let stringCaptured = "";
    while (actualPosition < Content.length) {
        // Si encontramos una comilla de cierre, terminamos de capturar la cadena
        if (character === '"') {
            actualPosition++; // Avanzar después de la comilla de cierre
            break;
        }
        // Si encontramos una barra invertida, podemos tener un carácter escapado
        if (character === '\\') {
            actualPosition++;
            character = Content[actualPosition];
            if (character === '"') {
                stringCaptured += '"';
            }
            else {
                stringCaptured += '\\' + character;
            }
            actualPosition++;
            character = Content[actualPosition];
            continue;
        }
        // Captura cualquier otro carácter dentro de la cadena
        stringCaptured += character;
        actualPosition++;
        character = Content[actualPosition];
    }
    // Verifica si llegamos al final sin encontrar una comilla de cierre
    if (actualPosition > Content.length) {
        throw new TypeError(`(Tokenizer) The text chain was not closed - ${stringCaptured}`);
    }
    return {
        position: actualPosition, // Posición actualizada después de la comilla de cierre
        value: {
            type: "string",
            value: stringCaptured.trim()
        }
    };
}
