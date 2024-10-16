import { useContext, useEffect, useRef, useState } from "react";
import { LuterJsContext } from "../../../context";
import './Sector.css';
import Selector from "../Selector/Selector";
import GrabElementor from "./components/Grab";

export default function Sector() {
    const { value } = useContext(LuterJsContext);

    const SectorElement = useRef<HTMLDivElement>(null!);

    const [parentData, setParentData] = useState(0);

    const data = value.router;

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setParentData(entry.contentRect.width);
            }
        });

        if (SectorElement.current) {
            resizeObserver.observe(SectorElement.current);
        }

        return () => {
            if (SectorElement.current) {
                resizeObserver.unobserve(SectorElement.current);
            }
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="luterjs-router_sector">
            <div className="luterjs-router_sector-header">
                <Selector parentWidth={parentData} />
                <h2 className="luterjs-router_sector-header-title">
                    {data[value.path].name}
                </h2>
                <GrabElementor />
            </div>
            <div className="luterjs-router_sector-content" ref={SectorElement}>
                {data[value.path].content && data[value.path].content}
            </div>
        </div>
    );
}
