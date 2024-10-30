import { useState } from 'react';
import { CSSClass, LocalUrls, SizeIcons } from '../../../../constants';
import { useNavigation, useRouterLocal } from 'elementaryjs'

import dropdown from '../../../../assets/svg/dropdown.svg'

interface SectorSelectorProps {
    identifier: string
}

export default function SectorSelector({ identifier }: SectorSelectorProps) {
    const { navigate } = useNavigation()
    const { localStructure } = useRouterLocal()

    const { find } = localStructure()

    const [Status, setStatus] = useState(false)

    const handleClick = () => {
        setStatus(!Status)
    }

    const handleRouter = (path: string) => {
        const value = find({ _Name: identifier }) as {
            Name?: string;
            Path?: string;
        };

        console.log({ path, name, identifier });

        setStatus(false)
        if (value.Path === path) return

        navigate(path, identifier)
    }

    return (
        <div className={`${CSSClass.App}-router_selector`}>
            <div className={`${CSSClass.App}-router_selector-item`} onClick={handleClick}>
                <div className={`${CSSClass.App}-router_selector-item-image`}>
                    <img
                        width={SizeIcons.small.thumbnail.width} height={SizeIcons.small.thumbnail.height}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgKnxbsssKu4TVbrgfgaTm7cHKNuNRDow1w&s"
                        alt={`${CSSClass.App} Router Image Selector`}
                        className={`${CSSClass.App}-router_selector-item-image`} />
                </div>
                <div className={`${CSSClass.App}-router_selector-item-icon`}>
                    <img src={dropdown} alt={`${CSSClass.App} Router Icon Selector`} width={SizeIcons.icon} height={SizeIcons.icon} />
                </div>
            </div>
            <div
                className={[
                    `${CSSClass.App}-router_selector-items_selectables`,
                    Status ? `active` : `desactive`
                ].join(` `)}>
                {
                    Object.keys(LocalUrls).map((Path, index) => (
                        <div
                            key={index}
                            onClick={() => handleRouter(Path)}
                            className={`${CSSClass.App}-router_selector-items_selectables-item`}>
                            <img
                                width={SizeIcons.small.thumbnail.width} height={SizeIcons.small.thumbnail.height}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgKnxbsssKu4TVbrgfgaTm7cHKNuNRDow1w&s"
                                alt={`${CSSClass.App} Router Image Selector`}
                                className={`${CSSClass.App}-router_selector-items_selectables-item-image`} />
                            <span className={`${CSSClass.App}-router_selector-items_selectables-item-span`}>
                                {LocalUrls[Path]}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}