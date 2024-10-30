import { CSSClass } from "../../../../constants";

interface OptionsListProps {
    SelectOption: string,
    OptionsList: VarTypes.OptionsList,
}

export default function OptionList({ SelectOption, OptionsList }: OptionsListProps) {
    if (SelectOption.length === 0) return null;

    console.log(SelectOption);

    return (
        <div className={`${CSSClass.App}-Native-OptionList`}>
            {
                OptionsList.find(({ name }) => name === SelectOption).options.map(
                    ({ name, exec }, index) =>
                        <div
                            key={index}
                            onClick={exec}
                            className={`${CSSClass.App}-Native-OptionList-Element`}>
                            <span className={`${CSSClass.App}-Native-OptionList-Element_Span`}>
                                {name}
                            </span>
                        </div>
                )
            }
        </div>
    )
}