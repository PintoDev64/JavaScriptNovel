import { readFileSync } from "node:fs";

// Modules
import { PROJECT_PATH } from "src/shared/constants";
import { resolvedPath } from "src/shared/utils";
import { NParser } from "../types/compiler";
import EngineConfig from "../config/instance";
import { ICharacter } from "../types/character";

const engineConfigInstance = EngineConfig.getInstance()

export default function SpritesToBuffers(characterNode: NParser.INode): ICharacter["sprites"] | NParser.IErrorNode {
    const callCharacterExpression = characterNode.value as NParser.INode
    const spritesArguments = callCharacterExpression.arguments![1].elements as NParser.INode[]

    let compiledSprites: ICharacter["sprites"] = {}

    try {
        spritesArguments.forEach(({ value }) => {
            const spriteFilename = value as string
            const extensionDotIndex = spriteFilename.lastIndexOf('.');
            const spriteName = extensionDotIndex !== -1 ? spriteFilename.substring(0, extensionDotIndex) : spriteFilename;
    
            const spriteLocation = resolvedPath(PROJECT_PATH, [
                engineConfigInstance.getConfigKey("assets")!, spriteFilename
            ])
    
            const spriteImageBuffer = readFileSync(spriteLocation)
    
            compiledSprites[spriteName] = spriteImageBuffer
        })
    } catch (err) {
        return {
            type: "ErrorExpression",
            value: err as string
        }
    }

    return compiledSprites
}