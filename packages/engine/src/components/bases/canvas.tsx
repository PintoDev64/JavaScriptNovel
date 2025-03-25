import { createIDClassName } from "../../utils";

export default function Canvas() {
    return (
        <canvas id={createIDClassName("SpecialCanvas")}>
        </canvas>
    )
}