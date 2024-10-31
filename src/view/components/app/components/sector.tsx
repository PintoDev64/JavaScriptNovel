import { LocalRoute } from "elementaryjs";
import { CSSClass } from "../../../constants";
import SectorHeader from "./components/header";
import GameRoute from "../router/Game";

interface SectorProps {
    identifier: string;
    height: number;
}

export default function Sector({ identifier, height }: SectorProps) {
    return (
        <div
            style={{
                height: height === 0 ? '100%' : `${height}px`,
            }}
            className={`${CSSClass.App}-router_sector`}>
            <div className={`${CSSClass.App}-router_sector-header`}>
                <SectorHeader {...{ identifier }} />
            </div>
            <div className={`${CSSClass.App}-router_sector-content`}>
                <LocalRoute path="/" context={identifier} component={
                    <p style={{ color: "#ffffff", margin: 0 }}>Home</p>
                } />
                <LocalRoute path="/game" context={identifier} component={
                    <GameRoute />
                } />
            </div>
        </div>
    );
}