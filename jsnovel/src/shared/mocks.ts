import { NParser } from "src/engine/types/compiler";

export const TEST_MEDIA_IMAGE_NODE: NParser.INode = {
    "type": "ImageDeclaration",
    "name": "Paisaje",
    "value": {
        "type": "StringLiteral",
        "value": "Paisaje.png"
    }
}

export const TEST_MEDIA_AUDIO_NODE: NParser.INode = {
    "type": "AudioDeclaration",
    "name": "BgMusic",
    "value": {
        "type": "CallExpression",
        "name": "MediaAudio",
        "arguments": [
            {
                "type": "StringLiteral",
                "value": "music/BgMusic.mp3"
            },
            {
                "type": "StringLiteral",
                "value": "bg"
            }
        ]
    }
}