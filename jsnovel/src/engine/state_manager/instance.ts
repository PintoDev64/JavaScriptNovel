import { IStateManager, IStateManagerVariables } from "../types/state_manager";

export default class StateManager implements IStateManager {
    static INSTANCE: StateManager | null = null;
    private variables: IStateManagerVariables = {}

    private constructor() {}

    static getInstance(): StateManager {
        if (!StateManager.INSTANCE) StateManager.INSTANCE = new StateManager();
        return StateManager.INSTANCE
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