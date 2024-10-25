
import { useState } from "react";
import { CSSClass } from "../../../constants";
import { useLenguage } from "../../../hooks"
import OptionList from "./components/optionlist";

export default function Options() {
    const { LenguageState } = useLenguage()

    const [SelectOption, setSelectOption] = useState("")

    const { Native } = LenguageState.dictionary[LenguageState.location]

    const OptionsList: VarTypes.OptionsList = [
        {
            name: Native.File,
            options: [
                {
                    name: Native.Options.newProject,
                    exec: () => {
                        console.log(Native.Options.newProject);
                        setSelectOption("")
                    }
                }
            ]
        }
    ]

    const handleOptionList = (name: string) => {
        if (SelectOption === name) return setSelectOption("");
        return setSelectOption(name)
    }

    return (
        <div className={`${CSSClass.App}-Native-OptionElements`}>
            {
                OptionsList.map(({ name }, index) =>
                    <div
                        key={index}
                        onClick={() => handleOptionList(name)}
                        className={[
                            `${CSSClass.App}-Native-Option`,
                            SelectOption === name ? "Active" : "Desactive"
                        ].join(" ")}>
                        <span className={`${CSSClass.App}-Native-Option_Span`}>{name}</span>
                    </div>
                )
            }
            <OptionList {...{ SelectOption, OptionsList }} />
        </div>
    )
}