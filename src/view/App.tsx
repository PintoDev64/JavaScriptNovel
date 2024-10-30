import Application from "./components/app";
import Native from "./components/native";
import WorkspaceProvider from "./context/Workspace";

export default function App() {
    return (
        <>
            <Native />
            <WorkspaceProvider>
                <Application />
            </WorkspaceProvider>
        </>
    )
}