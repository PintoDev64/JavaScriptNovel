export default function CreateNode(
    Tokens: NTokenizer.IToken[],
    Cursor: number
): [number, NParser.INode] {
    let ActualCursor = Cursor;
    let ActualToken = Tokens[ActualCursor];

    let VariablesKeywords: TTokenSpecialNames[] = ["var", "audio", "char", "image"]

    if (ActualToken.type === "keyword" && VariablesKeywords.includes(ActualToken.value as TTokenSpecialNames)) {

    }

    throw new Error(`Token inesperado: tipo: ${ActualToken.type} - ${ActualToken.value} en línea ${ActualToken.line}`);
}

function ArrayExpression(
    Tokens: NTokenizer.IToken[],
    StartCursor: number
): [number, NParser.INode] {
    let cursor = StartCursor;
    cursor++; // Saltar "["

    const elements: NParser.INode[] = [];
    while (Tokens[cursor].value !== "]") {
        const [newCursor, elementNode] = CreateNode(Tokens, cursor);
        elements.push(elementNode);
        cursor = newCursor;

        if (Tokens[cursor].type === "comma") {
            cursor++;
        }
    }

    cursor++; // Saltar "]"
    return [
        cursor,
        {
            type: "ArrayExpression",
            elements: elements
        }
    ];
}

function VariableDeclaration(Tokens: NTokenizer.IToken[], StartCursor: number): [number, NParser.INode] {
    let cursor = StartCursor;
    const keyword = Tokens[cursor].value; // "Var", "Image", o "Char"
    cursor++;

    const name = Tokens[cursor].value; // Nombre de la variable
    cursor++;

    // Verifica el "="
    if (Tokens[cursor].type !== "equal") {
        return [
            cursor,
            {
                type: "VariableExpression",
                name: name,
            }
        ];
    }
    cursor++;

    let valueNode;

    console.log(Tokens[cursor]);

    // Si es una llamada a `Character(...)`, usa `parseCallExpression`
    if (Tokens[cursor].type === "keyword" && (Tokens[cursor].value === "Character" || Tokens[cursor].value === "MediaAudio")) {
        console.log("Expression");
        [cursor, valueNode] = parseCallExpression(Tokens, cursor);
    } else {
        console.log("Node");
        [cursor, valueNode] = CreateNode(Tokens, cursor);
    }

    let typeNode: TNodeType = "VariableDeclaration"

    if (keyword === "Char") {
        typeNode = "CharacterDeclaration";
    }
    if (keyword === "Image") {
        typeNode = "ImageDeclaration";
    }
    if (keyword === "Audio") {
        typeNode = "AudioDeclaration";
    }

    return [
        cursor,
        {
            type: typeNode,
            name: name,
            value: valueNode
        }
    ];
}

function parseCallExpression(
    Tokens: NTokenizer.IToken[],
    StartCursor: number
): [number, NParser.INode] {
    let cursor = StartCursor;
    const identifier = Tokens[cursor].value; // "Character"
    cursor++;

    console.log("ParseCallExpression:1 -> ", Tokens[cursor]);

    // Verifica paréntesis de apertura
    if (Tokens[cursor].value !== "(") {
        throw new Error("Se esperaba '('");
    }
    cursor++;

    console.log("ParseCallExpression:2 -> ", Tokens[cursor]);

    // Parsea los argumentos
    const args: NParser.INode[] = [];
    while (Tokens[cursor].value !== ")") {
        const [newCursor, argNode] = CreateNode(Tokens, cursor);
        args.push(argNode);
        cursor = newCursor;

        // Si hay coma, la omitimos
        if (Tokens[cursor].type === "comma") {
            cursor++;
        }
    }
    console.log("ParseCallExpression:Args:3 -> ", args);
    console.log("ParseCallExpression:3 -> ", Tokens[cursor]);

    cursor++; // Saltar ")"

    console.log("ParseCallExpression:5 -> ", Tokens[cursor]);

    const body: NParser.INode[] = [];

    // Parser Function Content
    if (typeof Tokens[cursor] === undefined) {
        return [
            cursor,
            {
                type: "CallExpression",
                name: identifier,
                arguments: args
            }
        ];
    }
    
    if (Tokens[cursor].value !== "{") {
        cursor++; // Saltar ")"
        console.log("ParseCallExpression:6 -> ", Tokens[cursor]);

        while (Tokens[cursor].value !== "}") {
            const [NewCursor, bodyNode] = CreateNode(Tokens, cursor);
            body.push(bodyNode);
            cursor = NewCursor;
        }
    }

    return [
        cursor,
        {
            type: "FunctionDeclaration",
            name: identifier,
            arguments: args,
            body: body
        }
    ];
}