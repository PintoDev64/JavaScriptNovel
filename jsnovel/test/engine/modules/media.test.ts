import { assert, beforeAll, describe, test } from "vitest"

import { NParser } from "../../../src/engine/types/compiler"

// Mocks
import {
    TEST_MEDIA_AUDIO_NODE,
    TEST_MEDIA_IMAGE_NODE
} from "../../../src/shared/mocks"

// Modules
import MediaInstance from "../../../src/engine/media/instance"
import novelScriptCompiler from "../../../src/engine/compiler"
import EngineConfig from "../../../src/engine/config/instance"

let ScriptCompiled: NParser.INode[] = []
let newMediaInstance: MediaInstance

beforeAll(async () => {
    console.log("\n|---------------------------------------------");

    const ScriptConfig = EngineConfig.getInstance()

    ScriptCompiled = await novelScriptCompiler(ScriptConfig.getConfigKey("scripts")!)

    newMediaInstance = MediaInstance.setInstance(ScriptCompiled)
})

describe("Engine -> Media", () => {
    test("Verify Values - Images", () => {
        const response = newMediaInstance.getMediaImage(TEST_MEDIA_IMAGE_NODE)
        console.log("Verify Values - Images --> ", response);

        // @ts-ignore
        assert(typeof response === "object", response.value)
    })
    
    test("Verify Values - Audio", () => {
        const response = newMediaInstance.getMediaAudio(TEST_MEDIA_AUDIO_NODE)
        console.log("Verify Values - Audio --> ", response);
        
        // @ts-ignore
        assert(typeof response === "object", response.value)
    })
})