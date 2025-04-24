import { afterAll, assert, describe, test } from "vitest";

import NovelVirtualMachine from "src/engine/novel-virtual-machine";

let NVM: NovelVirtualMachine;

describe("Engine", async () => {
    NVM = NovelVirtualMachine.startInstance()
    await NVM.ready

    test("Verify Instance", () => {
        console.log(NVM);
    })

    test("Verify Instruction List", () => {
        const ArrayInstruction = NVM.getInstructionList()

        assert(ArrayInstruction.length !== 0, `Response not expected`)
    })

    test('Start Engine', () => {
        NVM.start()
        console.log(NVM);
    })
})

afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    NVM.stop();
    console.log(NVM);
});