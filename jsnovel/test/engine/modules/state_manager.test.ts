import novelScriptCompiler from "src/engine/compiler";
import EngineConfig from "src/engine/config/instance";
import { beforeAll, describe, test } from "vitest";

import { NParser } from "src/engine/types/compiler"
import StateManager from "src/engine/state_manager/instance";

let ScriptCompiled: NParser.INode[] = []
let newStateManager: StateManager

beforeAll(async () => {
    console.log("\n|---------------------------------------------");

    const ScriptConfig = EngineConfig.getInstance()

    ScriptCompiled = await novelScriptCompiler(ScriptConfig.getConfigKey("scripts")!)

    newStateManager = StateManager.getInstance(ScriptCompiled)
})

describe("Engine -> State Manager", () => {
    test("Get Values", () => {
        const response = newStateManager.getAllVariables()
        console.log(response);
    })
    test("Get Value - Unique", () => {
        const response = newStateManager.getVariable("HolaXD")
        console.log(response);
    })
})