import { useContext, useRef } from 'react';
import Close from '../assets/close.svg';
import './Toast.css';
import { LuterJsContext } from '../../context';

export default function Toast() {
    const { value, setValue } = useContext(LuterJsContext);
    const toastRefs = useRef<(HTMLDivElement | null)[]>([]);

    const data = value.toastElements;

    const handleClick = (index: number) => {
        const toastElement = toastRefs.current[index];

        if (toastElement) {
            const newToasts = [...data];
            newToasts.splice(index, 1);
            setValue({
                ...value,
                toastElements: newToasts,
            });
        }
    };

    return (
        <div className='luterjs-toast-container'>
            {data.length > 0 &&
                data.map(({ title, description }, index) => {
                    if (index > 2) return null; // Limitar a los primeros 3 elementos

                    return (
                        <div
                            key={index}
                            className="luterjs-toast"
                            ref={(el) => (toastRefs.current[index] = el)}
                            data-id={index}
                        >
                            <div className="luterjs-toast-content">
                                <span className="luterjs-toast-title">{title}</span>
                                {description && <p className='luterjs-toast-description'>{description}</p>}
                            </div>
                            <button
                                className="luterjs-toast-close"
                                onClick={() => handleClick(index)}
                            >
                                <img
                                    src={Close}
                                    className='luterjs-toast-close-icon'
                                    alt="LuterJs Close Icon"
                                />
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}
