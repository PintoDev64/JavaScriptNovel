import { ICharacter, ICharacterManager } from "../types/character";
import { NParser } from "../types/compiler";
import SpritesToBuffers from "./sprites";

export default class CharacterManager implements ICharacterManager {
    static INSTANCE: CharacterManager | null = null;
    private characterMap: Map<string, ICharacter> = new Map();
    private characterList: Set<string> = new Set()

    private constructor(nodes: NParser.INode[]) {
        this.setCharacterMap(nodes)
    }

    static getInstance(nodes: NParser.INode[]): CharacterManager {
        if (!CharacterManager.INSTANCE) CharacterManager.INSTANCE = new CharacterManager(nodes);
        return CharacterManager.INSTANCE
    }

    private setCharacterMap(nodes: NParser.INode[]): void {
        const filteredCharacterNodes = nodes.filter(({ type }) => type === "CharacterDeclaration")

        filteredCharacterNodes.forEach(Node => {
            this.addCharacter(Node)
        })
    }

    private isCharacterNode(node: NParser.INode): boolean {
        return node.type === "CharacterDeclaration"
    }

    private addCharacter(characterNode: NParser.INode): NParser.IErrorNode | void {
        const characterNodeName = characterNode.name as string

        if (this.characterList.has(characterNodeName)) return {
            type: "ErrorExpression",
            value: `The character ${characterNodeName} is already defined.`
        }

        const characterCallExpressionArguments = (characterNode.value! as NParser.INode).arguments! as NParser.INode[]
        const characterSpritedCompiled = SpritesToBuffers(characterNode)

        if (characterSpritedCompiled.type && characterSpritedCompiled.type === "ErrorExpression") return characterSpritedCompiled as NParser.IErrorNode;

        this.characterList.add(characterNodeName)
        this.characterMap.set(characterNodeName, {
            name: characterNodeName,
            character: characterCallExpressionArguments[0].value as string,
            color: characterCallExpressionArguments[2].value as string,
            sprites: characterSpritedCompiled as ICharacter["sprites"]
        });
    }

    getCharacter(characterNode: NParser.INode): ICharacter | NParser.IErrorNode {
        const characterNodeName = characterNode.name as string

        if (!this.isCharacterNode(characterNode)) return {
            type: "ErrorExpression",
            value: "The Node is not of type character."
        }

        if (!this.characterList.has(characterNodeName)) return {
            type: "ErrorExpression",
            value: `The character ${characterNodeName} not exist or available in CharacterList.`
        };

        const BufferGetted = this.characterMap.get(characterNodeName);
        if (!BufferGetted) return {
            type: "ErrorExpression",
            value: "Buffer not found."
        }

        return BufferGetted
    }
}