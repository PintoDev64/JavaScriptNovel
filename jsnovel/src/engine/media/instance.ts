import { NParser } from "../types/compiler";
import { IMediaInstance } from "../types/media";

// Modules
import AudioToBuffer from "./audio";
import ImageToBuffer from "./image";

export default class MediaInstance implements IMediaInstance {
    static INSTANCE: MediaInstance | null = null
    private BufferMap: Map<NParser.INode, Buffer<ArrayBufferLike>> = new Map()
    private MediaImage: Set<string> = new Set()
    private MediaAudio: Set<string> = new Set()

    private constructor() { }

    private VerifyMediaNode(node: NParser.INode) {
        return node.type === "AudioDeclaration" || node.type === "ImageDeclaration"
    }

    static getInstance(): MediaInstance {
        if (!MediaInstance.INSTANCE) MediaInstance.INSTANCE = new MediaInstance();
        return MediaInstance.INSTANCE
    }

    addMediaImage(node: NParser.INode): void | NParser.IErrorNode {
        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type image"
        };

        const imageVerification = this.MediaImage.has(node.name!)
        if (imageVerification) return {
            type: "ErrorExpression",
            value: `the MediaImage variable "${node.name!}" is already defined.`
        }

        const MediaImageExpression = node.value as NParser.INode
        const AudioBuffered = ImageToBuffer(MediaImageExpression.value as string)

        this.MediaImage.add(node.name!)
        this.BufferMap.set(node, AudioBuffered)
    }

    addMediaAudio(node: NParser.INode): void | NParser.IErrorNode {
        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type audio"
        };

        const audioVerfification = this.MediaAudio.has(node.name!)
        if (audioVerfification) return {
            type: "ErrorExpression",
            value: `the MediaAudio variable "${node.name!}" is already defined.`
        }

        const mediaAudioExpression = node.value as NParser.INode
        const audioBuffered = AudioToBuffer(mediaAudioExpression.arguments![0].value as string)

        this.MediaAudio.add(node.name!)
        this.BufferMap.set(node, audioBuffered)
    }

    getMediaImage(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode {
        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type image"
        };

        const imageVerification = this.MediaImage.has(node.name!)
        if (!imageVerification) return {
            type: "ErrorExpression",
            value: `the image "${node.name!}" not exist or available in MediaImages list.`
        }

        const BufferGetted = this.BufferMap.get(node)!

        return BufferGetted
    }

    getMediaAudio(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode {
        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type audio"
        };

        const audioVerfification = this.MediaAudio.has(node.name!)
        if (!audioVerfification) return {
            type: "ErrorExpression",
            value: `the audio "${node.name!}" not exist or available in MediaAudio list.`
        }

        const BufferGetted = this.BufferMap.get(node)!

        return BufferGetted
    }
}