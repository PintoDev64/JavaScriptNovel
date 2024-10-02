import { CLOSE_PARENTHESIS, OPEN_PARENTHESIS } from "../constants";

interface ASTBase {
    type: "Program",
    body: AstStructure[]
}

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

    function TokenReader(): AstStructure {
        let actualToken = ListTokens[cursorPosition]

        if (actualToken.type === "semicolon") {
            cursorPosition++;
            return TokenReader();
        }

        if (actualToken.type === "string") {
            cursorPosition++
            return {
                type: "StringLiteral",
                value: actualToken.value
            }
        }

        if (actualToken.type === "number") {
            cursorPosition++;
            return {
                type: "NumberLiteral",
                value: actualToken.value,
            };
        }

        if (actualToken.type === "character" || actualToken.type === "global" || actualToken.type === "audio" || actualToken.type === "image" || actualToken.type === "video") {

            let AstParse: AstStructure = {
                type: GlobalVariablesExpect[actualToken.type],
                name: actualToken.value,
                value: ""
            }

            cursorPosition++;
            actualToken = ListTokens[cursorPosition]

            if (actualToken.type !== "equal") {
                throw new TypeError(`(Parser) the variable ${GlobalVariablesExpect[actualToken.value]} is not being assigned`)
            }

            cursorPosition++;
            actualToken = ListTokens[cursorPosition]
            
            AstParse.value = actualToken.value
            
            cursorPosition++;
            return AstParse
        }

        if (actualToken.type === "name") {
            cursorPosition++;

            const AstParse: AstStructure = {
                type: "Identifier",
                name: actualToken.value
            }
            
            if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "parenthesis" && ListTokens[cursorPosition].value === OPEN_PARENTHESIS) {
                cursorPosition++;
                
                const AstParams: AstStructure = {
                    type: "CallExpression",
                    name: AstParse.name,
                    params: []
                }
                
                while (cursorPosition < ListTokens.length && !(ListTokens[cursorPosition].type === "parenthesis" && ListTokens[cursorPosition].value === CLOSE_PARENTHESIS)) {
                    
                    if (ListTokens[cursorPosition].type === "comma") {
                        cursorPosition++;
                        continue;
                    }

                    AstParams.params?.push(TokenReader())
                }

                if (cursorPosition < ListTokens.length && ListTokens[cursorPosition].type === "parenthesis" && ListTokens[cursorPosition].value === ")") {
                    cursorPosition++;
                    actualToken = ListTokens[cursorPosition]
                    return AstParams
                } else {
                    throw new Error("Expected closing parenthesis after function call");
                }

            }

            actualToken = ListTokens[cursorPosition]
            return AstParse
        }

        throw new TypeError(`(Parser) Unknown token type: ${actualToken.type}`)
    }

    const AST: ASTBase = {
        type: "Program",
        body: []
    }

    while (cursorPosition < ListTokens.length) {
        AST.body.push(TokenReader())
    }

    return AST;
}