import { NParser } from "./compiler";

export interface IMediaInstance {
    addMediaImage(node: NParser.INode): void | NParser.IErrorNode
    addMediaAudio(node: NParser.INode): void | NParser.IErrorNode
    getMediaImage(nodeName: string): NParser.INode | NParser.IErrorNode
    getMediaAudio(node: NParser.INode): void | NParser.IErrorNode
}