import { beforeAll, describe, test } from "vitest";

import NovelVirtualMachine from "src/engine/novel-virtual-machine";
import EngineConfig from "src/engine/config/instance";
import CharacterManager from "src/engine/character/instance";

let NVM: NovelVirtualMachine;
let EngConf: EngineConfig;
let CharManager: CharacterManager | null

beforeAll(async () => {
    NVM = await NovelVirtualMachine.startInstance()
    EngConf = EngineConfig.getInstance()
    CharManager = CharacterManager.INSTANCE
    console.log("CharManager: ", CharManager);
    console.log("\n|---------------------------------------------");
})

describe("Engine", { skip: false }, () => {
    
    test("Verify Instance", () => {
        console.log("NVM: ", NVM);
        console.log("EngConf: ", EngConf.getConfig());
    })

    test('Start Engine', () => {
        NVM.start()
        console.log(NVM);
    })

    test("Stop Engine", () => {
        NVM.stop();
        console.log(NVM);
    })
})