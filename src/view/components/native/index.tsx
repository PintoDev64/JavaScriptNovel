import { CSSClass } from "../../constants";

// Styles
import './index.css'
import NativeLogo from "./components/logo";
import NativeControls from "./components/controls";
import Options from "./components/options";

export default function Native() {
    return (
        <nav className={[
            `${CSSClass.App}-Native`
        ].join(" ")}>
            <NativeLogo />
            <Options />
            <NativeControls />
        </nav>
    )
}