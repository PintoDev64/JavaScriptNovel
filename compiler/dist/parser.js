"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Parser;
function Parser(tokens) {
    let cursorPosition = 0;
    const ASTParser = {
        type: "Program",
        body: []
    };
    function Steps() {
        let actualToken = tokens[cursorPosition];
        if (actualToken.type === "semicolon") {
            cursorPosition++;
            return Steps();
        }
        // Manejo de llamadas a expresiones con paréntesis
        if (actualToken.type === "parenthesis" && actualToken.value === "(") {
            cursorPosition++;
            actualToken = tokens[cursorPosition]; // Actualizamos el token después de avanzar
            const actualNode = {
                type: "CallExpression",
                name: actualToken.value, // Considera validar el valor aquí antes de asignar
                params: []
            };
            cursorPosition++; // Avanzamos nuevamente para procesar parámetros
            actualToken = tokens[cursorPosition]; // Actualizamos el token
            // Procesamos parámetros hasta encontrar el paréntesis de cierre
            while (cursorPosition < tokens.length && !(actualToken.type === "parenthesis" && actualToken.value === ")")) {
                actualNode.params.push(Steps()); // Invocamos recursivamente
                actualToken = tokens[cursorPosition]; // Actualizamos después de recursión
            }
            // Asegurarse de que se ha cerrado el paréntesis
            if (actualToken.type === "parenthesis" && actualToken.value === ")") {
                cursorPosition++;
            }
            else {
                throw new Error("Expected closing parenthesis");
            }
            return actualNode;
        }
        // Manejo de tokens de tipo "number"
        if (actualToken.type === "number") {
            cursorPosition++;
            return {
                type: "NumberLiteral",
                value: actualToken.value
            };
        }
        // Manejo de tokens de tipo "name"
        if (actualToken.type === "name") {
            cursorPosition++;
            return {
                type: "Identifier",
                value: actualToken.value
            };
        }
        // Manejo de literales de cadenas
        if (actualToken.type === 'string') {
            cursorPosition++;
            return {
                type: 'StringLiteral',
                value: actualToken.value,
            };
        }
        // Manejo de tokens desconocidos
        throw new TypeError("Unknown token type: " + actualToken.type);
    }
    // Bucle principal que recorre todos los tokens y construye el cuerpo del AST
    while (cursorPosition < tokens.length) {
        ASTParser.body.push(Steps());
    }
    return ASTParser;
}
//# sourceMappingURL=parser.js.map