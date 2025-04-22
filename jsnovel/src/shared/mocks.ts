import { NParser } from "src/engine/ports/compiler";

export const TEST_MEDIA_IMAGE_NODE: NParser.INode = {
    "type": "ImageDeclaration",
    "name": "anime",
    "value": {
        "type": "StringLiteral",
        "value": "files/anime_example.png"
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
                "value": "files/example_audio.mp3"
            },
            {
                "type": "StringLiteral",
                "value": "bg"
            }
        ]
    }
}