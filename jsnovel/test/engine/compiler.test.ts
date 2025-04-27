// Native Modules
import { writeFileSync } from "node:fs"
import { afterAll, describe, test } from "vitest"

import novelScriptCompiler from "src/engine/compiler"

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

afterAll(() => {
    console.log("\n\n\n\n\n\n\n\n\n");
})