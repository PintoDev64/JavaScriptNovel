declare namespace NTokenizer {
    interface IToken {
        type: string;
        value: string;
    }
    /**
     * Tokenizes the script content into a list of tokens
     * @returns {string[]} [content sector type, line position, cursor position]
     */
    type TTokenSelectorResult = [
        string, (
            | "newLine"
            | "paren"
            | "space"
            | "name"
            | "number"
            | "comma"
            | "bracket"
            | "curly"
            | "quote"
        ), number, number]
}