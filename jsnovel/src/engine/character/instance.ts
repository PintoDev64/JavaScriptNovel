import { ICharacterManager } from "../ports/character";
import { NParser } from "../ports/compiler";

export default class CharacterManager implements ICharacterManager {
    static INSTANCE: CharacterManager | null = null;
    private characterList: NParser.INode[] = [];

    private constructor() {}

    static getInstance(): CharacterManager {
        if (!CharacterManager.INSTANCE) CharacterManager.INSTANCE = new CharacterManager();
        return CharacterManager.INSTANCE
    }

    addCharacter(characterNode: NParser.INode): NParser.IErrorNode | void {
        if (!this.characterList) return {
            type: "ErrorExpression",
            value: "Character list not available."
        };
        this.characterList.push(characterNode);
    }

    updateCharacter(characterNode: NParser.INode): NParser.INode | NParser.IErrorNode {
        if (!this.characterList) return {
            type: "ErrorExpression",
            value: "Character list not available."
        };
        const character = this.characterList.findIndex((node) => node.name === characterNode.name);
        if (character === -1) return {
            type: "ErrorExpression",
            value: `Character with name ${characterNode.name} not found.`
        };
        this.characterList[character] = characterNode;
        return characterNode;
    }

    updateCharacterColor(characterName: string, newColor: `#${string}`): NParser.INode | NParser.IErrorNode {
        const character = this.getCharacter(characterName);
        if (character.type === "ErrorExpression") return character
        character.arguments![2].value = newColor;
        return character;
    }

    updateCharacterName(characterName: string, newName: string): NParser.INode | NParser.IErrorNode {
        const character = this.getCharacter(characterName);
        if (character.type === "ErrorExpression") return character
        character.arguments![0].value = newName;
        return character;
    }

    getCharacter(characterName: string): NParser.INode | NParser.IErrorNode {
        if (!this.characterList) return {
            type: "ErrorExpression",
            value: "Character list not available."
        };
        const character = this.characterList.find((node) => node.name === characterName);
        if (!character) return {
            type: "ErrorExpression",
            value: `Character with name ${characterName} not found.`
        };
        return character;
    }
}