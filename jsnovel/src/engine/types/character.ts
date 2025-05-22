import { NParser } from "./compiler";

export interface ICharacter {
    name: string
    character: string
    color: `#${string}` | string
    sprites: { [K: string]: Buffer<ArrayBufferLike> }
}
    
export interface ICharacterManager {
    getAllCharacters(): Map<string, ICharacter>
    getCharacter(characterName: NParser.INode): ICharacter | NParser.IErrorNode
}