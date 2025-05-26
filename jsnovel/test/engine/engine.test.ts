import { beforeAll, describe, test } from "vitest";

import InitEngine from "../../src/engine/init_engine";
import EngineConfig from "../../src/engine/config/instance";
import CharacterManager from "../../src/engine/character/instance";
import StateManager from "src/engine/state_manager/instance";

let NVM: InitEngine;
let EngConf: EngineConfig;
let CharManager: CharacterManager | null
let SttManager: StateManager | null

beforeAll(async () => {
    NVM = await InitEngine.startInstance()
    EngConf = EngineConfig.getInstance()
    CharManager = CharacterManager.getInstance()
    SttManager = StateManager.getInstance()
})

describe("Engine", { skip: false }, () => {
    test("Verify Instance", () => {
        console.log("NVM: ", NVM);
        console.log("EngConf: ", EngConf.getConfig());
    })
})