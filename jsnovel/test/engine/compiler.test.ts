// Native Modules
import { writeFileSync } from "node:fs"
import { describe, test } from "vitest"

import novelScriptCompiler from "src/engine/compiler"

describe("Engine -> Compiler", () => {
    test("Zero errors expect", async () => {
        const searchPath = "files"

        console.log(await novelScriptCompiler(searchPath))
    })

    test('Write script compiled', async () => {
        const searchPath = "files"
        const scriptCompiled = await novelScriptCompiler(searchPath)
        const scriptParsed = JSON.stringify(scriptCompiled, null, 4)

        writeFileSync(`${searchPath}/lenguage.compile.json`, scriptParsed)
    })
})