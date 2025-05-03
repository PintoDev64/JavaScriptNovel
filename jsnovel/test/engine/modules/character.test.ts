import { readFileSync } from "fs";
import CharacterManager from "src/engine/character/instance";
import { TEST_PATH } from "src/shared/constants";
import { beforeAll, describe, test } from "vitest";

let CharManager: CharacterManager

beforeAll(() => {
    const Compiler = JSON.parse(readFileSync(`${TEST_PATH}/scripts/lenguage.compile.json`, { encoding: "utf-8" }))
    CharManager = CharacterManager.setInstance(Compiler)
})

describe("Engine -> Character", () => {
    test("Verify Instance", () => {
        console.log(CharManager);
    })
})