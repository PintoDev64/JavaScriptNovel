export type IStateManagerVariablesValues = string | number | boolean
export type IStateManagerVariables = { [K: string]: IStateManagerVariablesValues }

export interface IStateManager {
    addVariable(name: string, value: IStateManagerVariablesValues): void
    updateVariable(name: string, value: IStateManagerVariablesValues): void
    getVariable(name: string): IStateManagerVariablesValues
}