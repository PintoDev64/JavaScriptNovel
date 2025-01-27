export const PARENTHESIS_OPEN = '(';
export const PARENTHESIS_CLOSE = ')';
export const BRACKET_OPEN = '[';
export const BRACKET_CLOSE = ']';
export const CURLY_OPEN = '{';
export const CURLY_CLOSE = '}';
export const DOUBLEQUOTE = '"';
export const SPACE = ' ';
export const NEWLINE = /\r?\n/g;
export const COMMA = ',';
export const LETTER = /[a-zA-Z]/;
export const NUMBER = /[0-9]/;
export const EQUAL = '=';

export const TOKEN_SPECIAL_TYPES: Record<TTokenSpecialNames, TTokenSpecialNames> = {
    const: "const",
    var: "var",
    audio: "audio",
    image: "image"
}

export const TOKEN_TYPES: Record<TTokenTypes, TTokenTypes> = {
    number: "number",
    parenthesis: "parenthesis",
    space: "space",
    name: "name",
    comma: "comma",
    bracket: "bracket",
    curly: "curly",
    doublequote: "doublequote",
    equal: "equal"
};