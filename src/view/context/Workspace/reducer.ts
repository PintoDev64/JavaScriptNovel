/**
 * Funcion de cambio de estado del contexto "Workspace"
 */
export default function WorkspaceReducer(prevState: ContextContent.WorkspaceValue, { StateToModify, StateValue }: ContextContent.WorkspaceReducer) {
    return {
        ...prevState,
        [StateToModify]: StateValue,
    };
}
