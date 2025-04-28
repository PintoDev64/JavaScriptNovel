import { NParser } from "./compiler";

export interface ICharacter {
    name: string
    character: string
    color: `#${string}` | string
    sprites: { [K: string]: Buffer<ArrayBufferLike> }
}

export interface ICharacterManager {
    getCharacter(characterName: NParser.INode): ICharacter | NParser.IErrorNode
}