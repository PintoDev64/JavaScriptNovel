import { describe, test } from "vitest"

import MediaInstance from "src/engine/media/instance"

// Mocks
import {
    TEST_MEDIA_AUDIO_NODE,
    TEST_MEDIA_IMAGE_NODE
} from "src/shared/mocks"

describe("Engine -> Media", () => {
    const newMediaInstance = MediaInstance.getInstance()

    test("No Save Repeat Values - Images", () => {
        const response1 = newMediaInstance.addMediaImage(TEST_MEDIA_IMAGE_NODE)
        console.log(response1);

        const response2 = newMediaInstance.addMediaImage(TEST_MEDIA_IMAGE_NODE)
        console.log(response2);
    })
    test("Verify Values - Images", () => {
        const response = newMediaInstance.getMediaImage(TEST_MEDIA_IMAGE_NODE)
        console.log(response);

        //console.log(`Byte lenght: ${Buffer.byteLength(response as Buffer<ArrayBufferLike>, 'utf8') / 1000000} Mb`)
    })

    test("No Save Repeat Values - Audio", () => {
        const response1 = newMediaInstance.addMediaAudio(TEST_MEDIA_AUDIO_NODE)
        console.log(response1);

        const response2 = newMediaInstance.addMediaAudio(TEST_MEDIA_AUDIO_NODE)
        console.log(response2);
    })
    test("Verify Values - Audio", () => {
        const response = newMediaInstance.getMediaAudio(TEST_MEDIA_AUDIO_NODE)
        console.log(response);

        //console.log(`Byte lenght: ${Buffer.byteLength(response as Buffer<ArrayBufferLike>, 'utf8') / 1000000} Mb`)
    })
})