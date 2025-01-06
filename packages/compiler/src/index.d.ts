declare namespace NTokenizer {
    interface IToken {
        type: TTokenSelectorResult[1];
        character: string;
    }
    /**
     * Tokenizes the script content into a list of tokens
     * @returns {string[]} [content sector type, line position, cursor position]
     */
    type TTokenSelectorResult = [
        /**
         * Content character
         */
        string,
        (
            | "paren"
            | "space"
            | "name"
            | "number"
            | "comma"
            | "bracket"
            | "curly"
            | "doublequote"
            | "equal"
        ),
        number]
}