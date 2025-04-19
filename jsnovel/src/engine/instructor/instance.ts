import { IEngineInstructor, IEngineInstructorVariables } from "../ports/instructor";

export default class EngineInstructor implements IEngineInstructor {
    static INSTANCE: EngineInstructor | null = null;
    private variables: IEngineInstructorVariables = {}

    private constructor() {}

    static getInstance(): EngineInstructor {
        if (!EngineInstructor.INSTANCE) EngineInstructor.INSTANCE = new EngineInstructor();
        return EngineInstructor.INSTANCE
    }

    addVariable(name: string, value: string | number | boolean): void {
        if (!this.variables[name]) return;
        this.variables[name] = value
    }
    updateVariable(name: string, value: string | number | boolean): void {
        if (!this.variables[name]) return;
        this.variables[name] = value
    }
    getVariable(name: string): string | number | boolean {
        if (!this.variables[name]) return "Variable not declared";
        return this.variables[name]
    }
}