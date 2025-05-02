// Native Modules
import { writeFileSync } from "node:fs"
import { afterAll, beforeAll, describe, test } from "vitest"

import novelScriptCompiler from "src/engine/compiler"

beforeAll(() => {
    console.log("\n|---------------------------------------------");
})

describe("Engine -> Compiler", () => {
    test("Zero errors expect", { timeout: 2500 }, async () => {
        const searchPath = "files/scripts"

        await novelScriptCompiler(searchPath)
    })

    test('Write script compiled', { timeout: 2500 }, async () => {
        const searchPath = "files/scripts"
        const scriptCompiled = await novelScriptCompiler(searchPath)
        const scriptParsed = JSON.stringify(scriptCompiled, null, 4)

        writeFileSync(`${searchPath}/lenguage.compile.json`, scriptParsed)
    })
})