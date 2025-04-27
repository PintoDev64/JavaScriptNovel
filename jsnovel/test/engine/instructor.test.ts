import EngineInstructor from "src/engine/instructor/instance";
import { afterAll, beforeAll, describe, test } from "vitest";

const InstructorInstance = EngineInstructor.getInstance()

beforeAll(async () => {
    await InstructorInstance.ready
})

describe("Instructor", () => {
    test("View Filtered Instructions", () => {
        console.log(InstructorInstance.getInstructionMap());
    })
})

afterAll(() => {
    console.log("\n\n\n\n\n\n\n\n\n");
})