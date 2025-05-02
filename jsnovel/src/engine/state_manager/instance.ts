import { NParser } from "../types/compiler";
import { IStateManager, IStateManagerVariables, IStateManagerVariablesValues } from "../types/state_manager";

export default class StateManager implements IStateManager {
    static INSTANCE: StateManager | null = null;
    private variables: IStateManagerVariables = {}

    private constructor(nodes: NParser.INode[]) {
        const variablesFiltered = nodes.filter(node => node.type === "VariableDeclaration")

        variablesFiltered.forEach(node => {
            this.addVariable(node.name!, node.value as IStateManagerVariablesValues)
        })
    }

    static getInstance(nodes: NParser.INode[]): StateManager {
        if (!StateManager.INSTANCE) StateManager.INSTANCE = new StateManager(nodes);
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