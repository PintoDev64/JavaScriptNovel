import { useLocation } from "elementaryjs";
import { CSSClass, LocalUrls } from "../../../../constants";
import GrabElementor from "./grab";
import SectorSelector from "./selector";

interface SectorHeaderProps {
    identifier: string
}

export default function SectorHeader({ identifier }: SectorHeaderProps) {
    const { location } = useLocation()

    return (
        <>
            <SectorSelector { ...{ identifier } } />
            <h2 className={`${CSSClass.App}-router_sector-header-title`}>
                {
                    LocalUrls[location({ local: identifier })]
                }
            </h2>
            <GrabElementor />
        </>
    )
}