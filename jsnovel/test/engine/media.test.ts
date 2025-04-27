import { afterAll, beforeAll, describe, test } from "vitest"

import { NParser } from "src/engine/types/compiler"

// Mocks
import {
    TEST_MEDIA_AUDIO_NODE,
    TEST_MEDIA_IMAGE_NODE
} from "src/shared/mocks"

// Modules
import MediaInstance from "src/engine/media/instance"
import novelScriptCompiler from "src/engine/compiler"
import EngineConfig from "src/engine/config/instance"

let ScriptCompiled: NParser.INode[] = []
let newMediaInstance: MediaInstance

beforeAll(async () => {
    console.log(process.env["MODE"]);
    
    const ScriptConfig = EngineConfig.getInstance()
    console.log(ScriptConfig.getConfigKey("scripts")!);

    ScriptCompiled = await novelScriptCompiler(ScriptConfig.getConfigKey("scripts")!)

    newMediaInstance = MediaInstance.getInstance(ScriptCompiled)
    console.log(newMediaInstance);
})

describe("Engine -> Media", () => {
    test("Verify Values - Images", () => {
        const response = newMediaInstance.getMediaImage(TEST_MEDIA_IMAGE_NODE)
        console.log(response);

        //console.log(`Byte lenght: ${Buffer.byteLength(response as Buffer<ArrayBufferLike>, 'utf8') / 1000000} Mb`)
    })
    
    test("Verify Values - Audio", () => {
        const response = newMediaInstance.getMediaAudio(TEST_MEDIA_AUDIO_NODE)
        console.log(response);

        //console.log(`Byte lenght: ${Buffer.byteLength(response as Buffer<ArrayBufferLike>, 'utf8') / 1000000} Mb`)
    })
})

afterAll(() => {
    console.log("\n\n\n\n\n\n\n\n\n");
})