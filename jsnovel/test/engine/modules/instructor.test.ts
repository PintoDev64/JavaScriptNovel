import EngineInstructor from "../../../src/engine/instructor/instance";
import { afterAll, beforeAll, describe, test } from "vitest";

let InstructorInstance: EngineInstructor

beforeAll(async () => {
    console.log("\n|---------------------------------------------");
    InstructorInstance = EngineInstructor.getInstance()
    await InstructorInstance.ready
})

describe("Instructor", () => {
    test("View Filtered Instructions", () => {
        console.log(InstructorInstance.getInstructionMap());
    })
})