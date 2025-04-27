import { resolvedPath, searchFileFromProject, searchMultipleFilesFromProject } from "src/shared/utils";
import EngineConfig from "../config/instance";
import { NParser } from "../types/compiler";
import { IMediaInstance } from "../types/media";

// Modules
import AudioToBuffer from "./audio";
import ImageToBuffer from "./image";
import { existsSync } from "node:fs";
import { PROJECT_PATH } from "src/shared/constants";

const engineConfigInstance = EngineConfig.getInstance()

export default class MediaInstance implements IMediaInstance {
    static INSTANCE: MediaInstance | null = null
    private BufferMap: Map<string, Buffer<ArrayBufferLike>> = new Map()
    private MediaImage: Set<string> = new Set()
    private MediaAudio: Set<string> = new Set()

    private constructor(nodes: NParser.INode[]) {
        this.setMediaMap(nodes)
        console.log("MediaInstance Constructor --> ", this.BufferMap);
    }

    static getInstance(nodes: NParser.INode[]): MediaInstance {
        if (!MediaInstance.INSTANCE) MediaInstance.INSTANCE = new MediaInstance(nodes);
        return MediaInstance.INSTANCE
    }

    private setMediaMap(nodes: NParser.INode[]) {
        const filteredImageNodes = nodes.filter(({ type }) => type === "ImageDeclaration")
        const filteredAudioNodes = nodes.filter(({ type }) => type === "AudioDeclaration")

        filteredImageNodes.forEach((Node) => {
            this.addMediaImage(Node)
        })
        filteredAudioNodes.forEach((Node) => {
            this.addMediaAudio(Node)
        })
    }

    private VerifyMediaNode(node: NParser.INode) {
        return node.type === "AudioDeclaration" || node.type === "ImageDeclaration"
    }

    private addMediaImage(node: NParser.INode): void | NParser.IErrorNode {
        const ImageVariableName = node.name! as string

        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type image"
        };

        const ImageVerification = this.MediaImage.has(ImageVariableName)
        if (ImageVerification) return {
            type: "ErrorExpression",
            value: `the MediaImage variable "${ImageVariableName}" is already defined.`
        }

        const MediaImageExpression = node.value as NParser.INode
        const MediaImagePath = resolvedPath(PROJECT_PATH, [
            engineConfigInstance.getConfigKey("assets")!, MediaImageExpression.value! as string
        ])

        console.log("addMediaImage register --> ", MediaImagePath);
        console.log("addMediaImage register --> ", !existsSync(MediaImagePath));

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

        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type audio"
        };

        const AudioVerfification = this.MediaAudio.has(AudioVariableName)
        if (AudioVerfification) return {
            type: "ErrorExpression",
            value: `the MediaAudio variable "${AudioVariableName}" is already defined.`
        }

        const MediaAudioExpression = node.value as NParser.INode
        const MediaAudioPath = resolvedPath(PROJECT_PATH, [
            engineConfigInstance.getConfigKey("assets")!, MediaAudioExpression.value! as string
        ])

        console.log("addMediaAudio register --> ", MediaAudioPath);
        console.log("addMediaAudio register --> ", !existsSync(MediaAudioPath));

        if (!existsSync(MediaAudioPath)) return {
            type: "ErrorExpression",
            value: `The image "${AudioVariableName}" does not exist in the assigned path: ${MediaAudioPath}`
        }

        const audioBuffered = AudioToBuffer(searchFileFromProject(MediaAudioPath))

        this.MediaAudio.add(AudioVariableName)
        this.BufferMap.set(AudioVariableName, audioBuffered)
    }

    getMediaImage(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode {
        const ImageVariableName = node.name! as string

        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type image"
        };

        const imageVerification = this.MediaImage.has(ImageVariableName)
        if (!imageVerification) return {
            type: "ErrorExpression",
            value: `the image "${ImageVariableName}" not exist or available in MediaImages list.`
        }

        const BufferGetted = this.BufferMap.get(ImageVariableName)!

        return BufferGetted
    }

    getMediaAudio(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode {
        const AudioVariableName = node.name! as string

        if (!this.VerifyMediaNode(node)) return {
            type: "ErrorExpression",
            value: "the node is not of type audio"
        };

        const audioVerfification = this.MediaAudio.has(AudioVariableName)
        if (!audioVerfification) return {
            type: "ErrorExpression",
            value: `the audio "${AudioVariableName}" not exist or available in MediaAudio list.`
        }

        const BufferGetted = this.BufferMap.get(AudioVariableName)!

        return BufferGetted
    }
}