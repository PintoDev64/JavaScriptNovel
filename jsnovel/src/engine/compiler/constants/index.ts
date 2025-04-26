import { TTokenSpecialNames, TTokenTypes } from "src/engine/types/compiler";

export const PARENTHESIS_OPEN = '(';
export const PARENTHESIS_CLOSE = ')';
export const BRACKET_OPEN = '[';
export const BRACKET_CLOSE = ']';
export const CURLY_OPEN = '{';
export const CURLY_CLOSE = '}';
export const DOUBLEQUOTE = '"';
export const SPACE = /\s/;
export const NEWLINE = /\r?\n/g;
export const SEMICOLON = ';';
export const COMMA = ',';
export const POINT = '.';
export const LETTER = /[a-zA-Z]/;
export const NUMBER = /[0-9]/;
export const SPECIALLETTERS = /[!@#$%^&_\[\]:;,.?\/\\|`~\-]/;
export const EQUAL = '=';

export let VariablesKeywords: TTokenSpecialNames[] = ["var", "audio", "char", "image"]
export let BooleanKeywords: string[] = ["true", "false"]

export const TOKEN_KEYWORDS: Record<TTokenSpecialNames, TTokenSpecialNames> = {
    var: "var",
    audio: "audio",
    image: "image",
    scene: "scene",
    jump: "jump",
    char: "char",
    play: "play",
    await: "await",
    show: "show",
    hide: "hide",
    function: "function",
    stop: "stop",
    interface: "interface",
    background: "background",
    translate: "translate",
    character: "character",
    mediaaudio: "mediaaudio"
}

export const TOKEN_TYPES: Record<TTokenTypes, TTokenTypes> = {
    keyword: "keyword",
    number: "number",
    parenthesis: "parenthesis",
    space: "space",
    identifier: "identifier",
    comma: "comma",
    bracket: "bracket",
    curly: "curly",
    doublequote: "doublequote",
    equal: "equal",
    string: "string"
};