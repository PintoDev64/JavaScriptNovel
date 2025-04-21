import { NParser } from "./compiler";

export interface IMediaInstance {
    addMediaImage(node: NParser.INode): void | NParser.IErrorNode
    addMediaAudio(node: NParser.INode): void | NParser.IErrorNode
    getMediaImage(node: NParser.INode): [NParser.INode, Buffer] | NParser.IErrorNode
    getMediaAudio(node: NParser.INode): [NParser.INode, Buffer] | NParser.IErrorNode
}