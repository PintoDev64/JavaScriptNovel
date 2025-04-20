import { NParser } from "../ports/compiler";
import { IMediaInstance } from "../ports/media";

export default class MediaInstance implements IMediaInstance {
    static INSTANCE: MediaInstance | null = null
    private MediaImages: NParser.INode[] = []
    private MediaAudio: NParser.INode[] = []

    private constructor() {}
    
    static getInstance(): MediaInstance {
        if (!MediaInstance.INSTANCE) MediaInstance.INSTANCE = new MediaInstance();
        return MediaInstance.INSTANCE
    }
    
    addMediaImage(node: NParser.INode): void | NParser.IErrorNode {
        if (!this.MediaImages) return {
            type: "ErrorExpression",
            value: "MediaImages list not available."
        };

    }

    addMediaAudio(node: NParser.INode): void | NParser.IErrorNode{
        if (!this.MediaAudio) return {
            type: "ErrorExpression",
            value: "MediaAudio list not available."
        };

    }

    getMediaImage(nodeName: string): NParser.INode | NParser.IErrorNode {
        if (!this.MediaImages) return {
            type: "ErrorExpression",
            value: "MediaImages list not available."
        };
        
    }

    getMediaAudio(node: NParser.INode): void | NParser.IErrorNode {
        if (!this.MediaAudio) return {
            type: "ErrorExpression",
            value: "MediaAudio list not available."
        };

    }
}