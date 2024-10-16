import { useContext, useState } from 'react';

import { LuterJsContext } from '../../../context';

import dropdown from '../../assets/dropdown.svg'

import './Selector.css'

interface SelectorProps {
    parentWidth?: number;
}

export default function Selector({
    parentWidth
}: SelectorProps) {
    const { value, setValue } = useContext(LuterJsContext);
    const width_height_image = 25
    const width_height_svg = 20

    const [Status, setStatus] = useState(false)

    const data = value.router

    const handleClick = () => {
        setStatus(!Status)
    }

    const handleRouter = (path: number) => {
        setStatus(false)
        if (value.path === path) return

        setValue({
            ...value,
            path
        })
    }

    return (
        <div className="luterjs-router_selector">
            <div className="luterjs-router_selector-item" onClick={handleClick}>
                <div className="luterjs-router_selector-item-image">
                    <img
                        width={width_height_image} height={width_height_image}
                        src={data[value.path].image}
                        alt="LuterJs Router Image Selector"
                        className="luterjs-router_selector-item-image"
                        aria-label={data[value.path].name} />
                </div>
                <div className="luterjs-router_selector-item-icon">
                    <img src={dropdown} alt="LuterJs Router Icon Selector" width={width_height_svg} height={width_height_svg} />
                </div>
            </div>
            <div
                style={ (parentWidth) ? {
                    width: parentWidth
                } : {}}
                className={[
                    "luterjs-router_selector-items_selectables",
                    Status ? "active" : "desactive"
                ].join(" ")}>
                {
                    data.map(({ image, name }, index) => (
                        <div
                            key={index}
                            onClick={() => handleRouter(index)}
                            className="luterjs-router_selector-items_selectables-item">
                            <img
                                width={width_height_image} height={width_height_image}
                                src={image}
                                alt="LuterJs Router Image Selector"
                                className="luterjs-router_selector-items_selectables-item-image"
                                aria-label={name} />
                            <span className='luterjs-router_selector-items_selectables-item-span'>
                                {name}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}