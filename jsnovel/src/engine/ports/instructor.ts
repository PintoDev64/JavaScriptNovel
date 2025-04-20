export type IEngineInstructorVariablesValues = string | number | boolean
export type IEngineInstructorVariables = { [K: string]: IEngineInstructorVariablesValues }

export interface IStateManager {
    addVariable(name: string, value: IEngineInstructorVariablesValues): void
    updateVariable(name: string, value: IEngineInstructorVariablesValues): void
    getVariable(name: string): IEngineInstructorVariablesValues
}