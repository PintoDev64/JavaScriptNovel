import { beforeAll, describe, test } from "vitest";

import NovelVirtualMachine from "src/engine/novel-virtual-machine";

let NVM: NovelVirtualMachine;

beforeAll(async () => {
    NVM = await NovelVirtualMachine.startInstance()
    console.log("\n|---------------------------------------------");
})

describe("Engine", { skip: true }, () => {

    test("Verify Instance", () => {
        console.log(NVM);
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