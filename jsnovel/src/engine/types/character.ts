import { NParser } from "./compiler";

type TColor = `#${string}`

export interface ICharacterManager {
    addCharacter(characterNode: NParser.INode): NParser.IErrorNode | void
    updateCharacter(characterNode: NParser.INode): NParser.INode | NParser.IErrorNode
    updateCharacterColor(characterName: string, newColor: TColor): NParser.INode | NParser.IErrorNode
    updateCharacterName(characterName: string, newName: string): NParser.INode | NParser.IErrorNode
    getCharacter(characterName: string): NParser.INode | NParser.IErrorNode
}