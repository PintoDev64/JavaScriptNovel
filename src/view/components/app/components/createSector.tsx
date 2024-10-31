import { useContext } from "react"
import { CSSClass } from "../../../constants"
import { WorkspaceContext } from "../../../context"

interface CreateSectorProps {
    type: 'right' | 'bottom';
    index?: number
}

export default function CreateSector({ type, index }: CreateSectorProps) {
    const { WorkspaceState, ChangeWorkspaceState } = useContext(WorkspaceContext)

    const Modificator = (origin: boolean) => {
        const duplicateArray = WorkspaceState.data.map((item) => ({ ...item, content: [...item.content] }));

        if (origin) {
            const newElement = {
                width: 250,
                content: [
                    { identifier: crypto.randomUUID(), height: 0 }
                ]
            };

            duplicateArray.push(newElement);
            return duplicateArray;
        }

        // El caso de agregar al content de un sector específico
        const newContent = { identifier: crypto.randomUUID(), height: 250 };
        if (index !== undefined) {
            duplicateArray[index].content.push(newContent);
        }

        return duplicateArray;
    };

    const handleClick = () => {
        let response;

        console.log(type);

        if (type === 'right') {
            response = Modificator(true);
        } else {
            response = Modificator(false);
        }

        // Actualiza el estado con un array completamente nuevo
        ChangeWorkspaceState({
            StateToModify: 'data',
            StateValue: [...response]
        });
    };

    return <div onClick={handleClick} className={[
        `${CSSClass.App}-App-SectorCraetor`, type
    ].join(" ")} />
}