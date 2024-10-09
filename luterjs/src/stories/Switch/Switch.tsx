import { useState } from 'react';

import { Global } from '../../constants';

import './Switch.css'

export interface SwitchProps {
    defaultValue?: boolean;
    onClick?: (state: boolean) => void;
}

export default function Switch({
    defaultValue = false,
    onClick,
    ...props
}: SwitchProps) {
    const [Value, setValue] = useState(defaultValue);

    const handleClick = () => {
        const newValue = !Value;
        setValue(newValue);
        if (onClick) {
            onClick(newValue);
        }
    };

    return (
        <div
            className={[
                `${Global.PackageName}-switch`,
                `${Global.PackageName}-switch--${Value ? "active" : "desactive"}`
            ].join(' ')}
            {...props}
            onClick={handleClick}
        >
            <div className={
                `${Global.PackageName}-switch-indicator`
            }/>
        </div>
    );
}