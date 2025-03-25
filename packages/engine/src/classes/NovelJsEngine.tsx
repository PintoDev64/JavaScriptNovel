import { INovelJsEngine } from "../classes";

export default class NovelJsEngine implements INovelJsEngine {
    static instance: null | NovelJsEngine = null

    private constructor() {}

    static GetInstance() {
        if (!NovelJsEngine.instance) NovelJsEngine.instance = new NovelJsEngine();
        return NovelJsEngine.instance;
    }

    async Start() {
        
    }
}