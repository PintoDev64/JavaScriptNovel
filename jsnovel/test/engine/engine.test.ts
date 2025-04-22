import { afterAll, assert, beforeAll, describe, test } from "vitest";

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
    })
})

afterAll(() => {
    NVM.stop()
    console.log(NVM.counter);
}, 5000)