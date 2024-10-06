import { CLOSE_KEY, CLOSE_PARENTHESIS, COLON, LETTERS, OPEN_KEY, OPEN_PARENTHESIS, SPACEBAR } from "../constants";

const GlobalVariablesExpect: {
    [key: string]: GlobalExpectType
} = {
    global: "GlobalContext",
    audio: "AudioContext",
    image: "ImageContext",
    video: "VideoContext",
    character: "CharacterContext"
}

export default function Parser(ListTokens: TokensStructure[]) {
    let cursorPosition = 0;

    const AST: AstBase = {
        type: "Program",
        body: []
    };

    function TokenReader(): AstStructure {
        let actualToken = ListTokens[cursorPosition];

        if (actualToken.type === "semicolon") {
            cursorPosition++;
            return TokenReader();
        }

        if (actualToken.type === "string") {
            cursorPosition++;
            
            const AstString: AstStructure = {
                type: "StringLiteral",
                value: actualToken.value
            }
            
            if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "colon" && ListTokens[cursorPosition].value === COLON) {
                cursorPosition++;
                AstString.content = []
                
                while (cursorPosition < ListTokens.length && !(ListTokens[cursorPosition].type === "keys" && ListTokens[cursorPosition].value === CLOSE_KEY)) {
                    cursorPosition++;
                    AstString.content?.push(TokenReader());
                }

                if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "keys" && ListTokens[cursorPosition].value === CLOSE_KEY) {
                    cursorPosition++;
                    actualToken = ListTokens[cursorPosition];
                } else {
                    throw new Error("(Parser) Expected closing colon after function call");
                }

                return AstString
            }

            return AstString;
        }

        if (actualToken.type === "number") {
            cursorPosition++;
            return {
                type: "NumberLiteral",
                value: actualToken.value,
            };
        }

        // Manejo de contextos globales como "global", "audio", "image", etc.
        if (actualToken.type === "character" || actualToken.type === "global" || actualToken.type === "audio" || actualToken.type === "image" || actualToken.type === "video") {
            let AstParse: AstStructure = {
                type: GlobalVariablesExpect[actualToken.type],
                name: actualToken.value,
                value: ""
            };

            cursorPosition++;
            actualToken = ListTokens[cursorPosition];

            if (actualToken.type !== "equal") {
                throw new TypeError(`(Parser) the variable ${GlobalVariablesExpect[actualToken.value]} is not being assigned`);
            }

            cursorPosition++;
            actualToken = ListTokens[cursorPosition];

            if (actualToken.type === "name") {
                AstParse.value = TokenReader()
            } else {
                AstParse.value = actualToken.value;
                cursorPosition++;
            }

            return AstParse;
        }

        // Manejo de nombres y llamadas a funciones
        if (actualToken.type === "name") {
            cursorPosition++;

            const AstParse: AstStructure = {
                type: "Identifier",
                name: actualToken.value
            };

            if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "parenthesis" && ListTokens[cursorPosition].value === OPEN_PARENTHESIS) {
                cursorPosition++;

                const AstParams: AstStructure = {
                    type: "CallExpression",
                    name: AstParse.name,
                    params: [],
                };

                while (cursorPosition < ListTokens.length && !(ListTokens[cursorPosition].type === "parenthesis" && ListTokens[cursorPosition].value === CLOSE_PARENTHESIS)) {
                    if (ListTokens[cursorPosition].type === "comma") {
                        cursorPosition++;
                        continue;
                    }
                    AstParams.params?.push(TokenReader());
                }

                if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "parenthesis" && ListTokens[cursorPosition].value === CLOSE_PARENTHESIS) {
                    cursorPosition++;
                    actualToken = ListTokens[cursorPosition];
                } else {
                    throw new Error("(Parser) Expected closing parenthesis after function call");
                }

                if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "keys" && ListTokens[cursorPosition].value === OPEN_KEY) {
                    AstParams.content = []
                    const functionContent = TokenReader()
                    if (functionContent.body === undefined) {
                        throw new Error("(Parser) Read error in function content");
                    } else {
                        AstParams.content.push(...functionContent.body)
                    }
                }

                return AstParams;
            }

            actualToken = ListTokens[cursorPosition];
            return AstParse;
        }


        // Manejo de bloques de contenido sueltos `{}` fuera de una función
        if (actualToken.type === "keys") {

            if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "keys" && ListTokens[cursorPosition].value === OPEN_KEY) {
                cursorPosition++;
                const blockContent: AstStructure[] = [];
                actualToken = ListTokens[cursorPosition];

                while (cursorPosition < ListTokens.length && !(ListTokens[cursorPosition].type === "keys" && ListTokens[cursorPosition].value === CLOSE_KEY)) {
                    blockContent.push(TokenReader());
                    actualToken = ListTokens[cursorPosition];
                }

                if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "keys" && ListTokens[cursorPosition].value === CLOSE_KEY) {
                    cursorPosition++;  // Saltamos la llave de cierre `}`
                    actualToken = ListTokens[cursorPosition];
                } else {
                    throw new Error(`(Parser) Expected closing key after content block`);
                }

                return {
                    type: "ExpressionContent",
                    body: blockContent
                };
            }
        }

        throw new TypeError(`(Parser) Unknown token type: ${actualToken.type}`);
    }

    while (cursorPosition < ListTokens.length) {
        AST.body.push(TokenReader());
    }

    return AST;
}
