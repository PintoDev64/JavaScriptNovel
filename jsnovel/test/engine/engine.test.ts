import { afterAll, assert, describe, test } from "vitest";

import NovelVirtualMachine from "src/engine/novel-virtual-machine";

let NVM: NovelVirtualMachine;

describe("Engine", { skip: true }, () => {
    NVM = NovelVirtualMachine.startInstance()

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

afterAll(() => {
    console.log("\n\n\n\n\n\n\n\n\n");
})