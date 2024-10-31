import { useEffect, useRef, useState } from "react";
import { CSSClass } from "../../../constants";
import { useLenguage } from "../../../hooks";
import OptionList from "./components/optionlist";

export default function Options() {
    const { LenguageState } = useLenguage();

    const [SelectOption, setSelectOption] = useState("");

    const { Native } = LenguageState.dictionary[LenguageState.location];

    const OptionsList = [
        {
            name: Native.File.name,
            options: [
                {
                    name: Native.File.options.newProject,
                    exec: () => {
                        console.log(Native.File.options.newProject);
                        setSelectOption("");
                    },
                },
            ],
        },
        {
            name: Native.Profiles.name,
            options: [
                {
                    name: Native.Profiles.options.default,
                    exec: () => {
                        console.log(Native.Profiles.options.default);
                        setSelectOption("");
                    },
                },
            ],
        },
    ];

    const handleOptionList = (name: string) => {
        if (SelectOption === name) return setSelectOption("");
        return setSelectOption(name);
    };

    const optionsRef = useRef(null); // Crear un ref para el contenedor del popup

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setSelectOption(""); // Cierra el popup
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${CSSClass.App}-Native-OptionElements`} ref={optionsRef}>
            {OptionsList.map(({ name }, index) => (
                <div
                    key={index}
                    onClick={() => handleOptionList(name)}
                    className={[
                        `${CSSClass.App}-Native-Option`,
                        SelectOption === name ? "Active" : "Desactive",
                    ].join(" ")}>
                    <span className={`${CSSClass.App}-Native-Option_Span`}>{name}</span>
                </div>
            ))}
            <OptionList {...{ SelectOption, OptionsList }} />
        </div>
    );
}
