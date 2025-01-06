type TTokenTypes =
    | "paren"
    | "space"
    | "name"
    | "number"
    | "comma"
    | "bracket"
    | "curly"
    | "doublequote"
    | "equal";

declare namespace NTokenizer {
    interface IToken {
        line: number;
        position: number;
        type: TTokenTypes;
        character: string;
    }
    /**
     * Tokenizes the script content into a list of tokens
     * @returns {string[]} [content sector type, line position, cursor position]
     */
    type TTokenSelectorResult = [
        string,
        TTokenTypes,
        number
    ]
}

declare namespace NParser {
    interface INode {
        type: string;
        value: string;
        params: INode[];
    }
}