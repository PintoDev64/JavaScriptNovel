import { useReducer, type ReactNode } from "react";
import { WorkspaceContext } from "..";
import WorkspaceReducer from "./reducer";
import { WorkspaceTemplates } from "../../constants";

interface WorkspaceProviderProps {
    children: ReactNode
}

export default function WorkspaceProvider({ children }: WorkspaceProviderProps) {

    const Initialize: ContextContent.WorkspaceValue = {
        data: WorkspaceTemplates[0].data
    }

    const [WorkspaceState, dispatch] = useReducer(WorkspaceReducer, Initialize)

    function ChangeWorkspaceState(data: ContextContent.WorkspaceReducer) {
        dispatch(data)
    }

    return (
        <WorkspaceContext.Provider value={{
            WorkspaceState,
            ChangeWorkspaceState
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}