import { NParser } from "./compiler";

export interface IMediaInstance {
    /* addMediaImage(node: NParser.INode): void | NParser.IErrorNode
    addMediaAudio(node: NParser.INode): void | NParser.IErrorNode */
    getMediaImage(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode
    getMediaAudio(node: NParser.INode): Buffer<ArrayBufferLike> | NParser.IErrorNode
}