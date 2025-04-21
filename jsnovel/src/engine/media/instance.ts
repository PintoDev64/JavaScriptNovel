import { NParser } from "../ports/compiler";
import { IMediaInstance } from "../ports/media";

import ImageBuffer from "./image";

export default class MediaInstance implements IMediaInstance {
    static INSTANCE: MediaInstance | null = null
    private BufferMap: Map<NParser.INode, Buffer<ArrayBufferLike>> = new Map()
    private MediaImage: Set<string> = new Set()
    private MediaAudio: Set<string> = new Set()

    private constructor() { }

    static getInstance(): MediaInstance {
        if (!MediaInstance.INSTANCE) MediaInstance.INSTANCE = new MediaInstance();
        return MediaInstance.INSTANCE
    }

    addMediaImage(node: NParser.INode): void | NParser.IErrorNode {
        if (!this.MediaImage) return {
            type: "ErrorExpression",
            value: "MediaImage list not available."
        };

        const imageVerification = this.MediaImage.has(node.name!)
        if (imageVerification) return {
            type: "ErrorExpression",
            value: "the MediaImage variable is already defined."
        }

        const MediaImageExpression = node.value as NParser.INode
        const AudioBuffered = ImageBuffer(MediaImageExpression.value as string)

        this.MediaImage.add(node.name!)
        this.BufferMap.set(node, AudioBuffered)
    }

    addMediaAudio(node: NParser.INode): void | NParser.IErrorNode {
        if (!this.MediaAudio) return {
            type: "ErrorExpression",
            value: "MediaAudio list not available."
        };

        const audioVerfification = this.MediaAudio.has(node.name!)
        if (audioVerfification) return {
            type: "ErrorExpression",
            value: "the MediaAudio variable is already defined."
        }

        const mediaAudioExpression = node.value as NParser.INode
        const audioBuffered = ImageBuffer(mediaAudioExpression.arguments![0].value as string)

        this.MediaAudio.add(node.name!)
        this.BufferMap.set(node, audioBuffered)
    }

    getMediaImage(node: NParser.INode): [NParser.INode, Buffer] | NParser.IErrorNode {
        if (!this.MediaImage) return {
            type: "ErrorExpression",
            value: "MediaImages list not available."
        };

        const imageVerification = this.MediaImage.has(node.name!)
        if (!imageVerification) return {
            type: "ErrorExpression",
            value: `the image ${node.name!} not exist or available in MediaImages list.`
        }

        const BufferGetted = this.BufferMap.get(node)!

        return [node, BufferGetted]
    }

    getMediaAudio(node: NParser.INode): [NParser.INode, Buffer] | NParser.IErrorNode {
        if (!this.MediaAudio) return {
            type: "ErrorExpression",
            value: "MediaAudio list not available."
        };

        const audioVerfification = this.MediaImage.has(node.name!)
        if (!audioVerfification) return {
            type: "ErrorExpression",
            value: `the image ${node.name!} not exist or available in MediaImages list.`
        }

        const BufferGetted = this.BufferMap.get(node)!

        return [node, BufferGetted]
    }
}