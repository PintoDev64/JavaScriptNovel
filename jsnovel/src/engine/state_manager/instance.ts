import { NParser } from "../types/compiler";
import { IStateManager, IStateManagerVariables, IStateManagerVariablesValues } from "../types/state_manager";

export default class StateManager implements IStateManager {
    static INSTANCE: StateManager | null = null;
    private variables: IStateManagerVariables = {}

    private constructor(nodes: NParser.INode[]) {
        if (!Array.isArray(nodes) || nodes.length === 0) return;
        
        const variablesFiltered = nodes.filter(node => node.type === "VariableDeclaration")
        
        variablesFiltered.forEach(node => {
            this.addVariable(node.name!, (node.value as NParser.INode).value as IStateManagerVariablesValues)
        })
    }

    static setInstance(nodes: NParser.INode[] = []): StateManager {
        if (!StateManager.INSTANCE) StateManager.INSTANCE = new StateManager(nodes);
        return StateManager.INSTANCE
    }

    static getInstance(): StateManager | null {
        return StateManager.INSTANCE
    }

    addVariable(name: string, value: string | number | boolean): void {
        if (this.variables[name]) return;
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
    getAllVariables(): IStateManagerVariables {
        return this.variables
    }
}