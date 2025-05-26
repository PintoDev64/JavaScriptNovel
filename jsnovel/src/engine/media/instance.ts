import { resolvedPath, searchFileFromProject } from "../../shared/utils";
import { existsSync } from "node:fs";

// Types
import { IMediaInstance } from "../types/media";
import { NParser } from "../types/compiler";

// Modules
import EngineConfig from "../config/instance";
import AudioToBuffer from "./audio";
import ImageToBuffer from "./image";
import { PROJECT_PATH } from "../../shared/constants";

const engineConfigInstance = EngineConfig.getInstance()

export default class MediaInstance implements IMediaInstance {
    static INSTANCE: MediaInstance | null = null
    private BufferMap: Map<string, Buffer<ArrayBufferLike>> = new Map()
    private MediaImage: Set<string> = new Set()
    private MediaAudio: Set<string> = new Set()

    private constructor(nodes: NParser.INode[] = []) {
        if (!Array.isArray(nodes) || nodes.length === 0) return;
        this.setMediaMap(nodes)
    }

    static setInstance(nodes: NParser.INode[]): MediaInstance {
        if (!MediaInstance.INSTANCE) MediaInstance.INSTANCE = new MediaInstance(nodes);
        return MediaInstance.INSTANCE
    }
    
    static getInstance(): MediaInstance | null {
        return MediaInstance.INSTANCE
    }

    private setMediaMap(nodes: NParser.INode[]): void {
        const filteredImageNodes = nodes.filter(({ type }) => type === "ImageDeclaration")
        const filteredAudioNodes = nodes.filter(({ type }) => type === "AudioDeclaration")

        filteredImageNodes.forEach(Node => {
            const response = this.addMediaImage(Node)

            if (response !== undefined) return console.log("-->", response);
        })
        filteredAudioNodes.forEach(Node => {
            const response = this.addMediaAudio(Node)

            if (response !== undefined) return console.log("-->", response);
        })
    }

    private isAudioNode(node: NParser.INode): boolean {
        return node.type === "AudioDeclaration"
    }

    private isImageNode(node: NParser.INode): boolean {
        return node.type === "ImageDeclaration"
    }

    private addMediaImage(node: NParser.INode): void | NParser.IErrorNode {
        const ImageVariableName = node.name! as string

        const ImageVerification = this.MediaImage.has(ImageVariableName)
        if (ImageVerification) return {
            type: "ErrorExpression",
            value: `the MediaImage variable "${ImageVariableName}" is already defined.`
        }

        const MediaImageExpression = node.value as NParser.INode
        const MediaImagePath = resolvedPath(PROJECT_PATH, [
            engineConfigInstance.getConfigKey("assets")!, MediaImageExpression.value! as string
        ])

        if (!existsSync(MediaImagePath)) return {
            type: "ErrorExpression",
            value: `The image "${ImageVariableName}" does not exist in the assigned path: ${MediaImagePath}`
        }

        const AudioBuffered = ImageToBuffer(searchFileFromProject(MediaImagePath))

        this.MediaImage.add(ImageVariableName)
        this.BufferMap.set(ImageVariableName, AudioBuffered)
    }

    private addMediaAudio(node: NParser.INode): void | NParser.IErrorNode {
        const AudioVariableName = node.name! as string

        const AudioVerfification = this.MediaAudio.has(AudioVariableName)
        if (AudioVerfification) return {
            type: "ErrorExpression",
            value: `the MediaAudio variable "${AudioVariableName}" is already defined.`
        }

        const MediaAudioExpression = node.value as NParser.INode
        const MediaAudioPath = resolvedPath(PROJECT_PATH, [
            engineConfigInstance.getConfigKey("assets")!, MediaAudioExpression.arguments![0].value as string
        ])

        if (!existsSync(MediaAudioPath)) return {
            type: "ErrorExpression",
            value: `The audio "${AudioVariableName}" does not exist in the assigned path: ${MediaAudioPath}`
        }

        const audioBuffered = AudioToBuffer(searchFileFromProject(MediaAudioPath))

        this.MediaAudio.add(AudioVariableName)
        this.BufferMap.set(AudioVariableName, audioBuffered)
    }

    getMediaImage(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode {
        const ImageVariableName = node.name as string

        if (!this.isImageNode(node)) return {
            type: "ErrorExpression",
            value: "The node is not of type image"
        };

        const imageVerification = this.MediaImage.has(ImageVariableName)
        if (!imageVerification) return {
            type: "ErrorExpression",
            value: `The image "${ImageVariableName}" not exist or available in MediaImages list.`
        }

        const BufferGetted = this.BufferMap.get(ImageVariableName)
        if (!BufferGetted) return { type: "ErrorExpression", value: "Buffer not found." }

        return BufferGetted
    }

    getMediaAudio(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode {
        const AudioVariableName = node.name as string

        if (!this.isAudioNode(node)) return {
            type: "ErrorExpression",
            value: "The node is not of type audio"
        };

        const audioVerfification = this.MediaAudio.has(AudioVariableName)
        if (!audioVerfification) return {
            type: "ErrorExpression",
            value: `The audio "${AudioVariableName}" not exist or available in MediaAudio list.`
        }

        const BufferGetted = this.BufferMap.get(AudioVariableName)
        if (!BufferGetted) return { type: "ErrorExpression", value: "Buffer not found." }
        return BufferGetted
    }

    getAllMedia(): Map<string, Buffer<ArrayBufferLike>> {
        return this.BufferMap
    }
}