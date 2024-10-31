import { Fragment, useContext, useState } from "react";
import { CSSClass } from "../../constants";

// Styles
import './index.css';
import { WorkspaceContext } from "../../context";
import Sector from "./components/sector";
import { LocalRounting } from "elementaryjs";
import CreateSector from "./components/createSector";

export default function Application() {
    const { WorkspaceState, ChangeWorkspaceState } = useContext(WorkspaceContext);

    console.log("-->", WorkspaceState);

    const [isDragging, setIsDragging] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [startX, setStartX] = useState(0);
    const [IsMain, setIsMain] = useState(false);
    const [initialWidth, setInitialWidth] = useState(0);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, index: number, main?: boolean) => {
        setIsDragging(true);
        setDraggedIndex(index);
        setStartX(event.clientX);
        setInitialWidth(WorkspaceState.data[index].width);
        setIsMain(main)
        event.preventDefault();
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || draggedIndex === null) return;

        const deltaX = IsMain ? startX + event.clientX : startX - event.clientX;

        const newWidth = Math.max(250, initialWidth + deltaX)

        const updatedData = [...WorkspaceState.data];
        updatedData[IsMain ? draggedIndex - 1 : draggedIndex].width = newWidth;

        ChangeWorkspaceState({
            StateToModify: 'data',
            StateValue: updatedData
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedIndex(null);
    };

    return (
        <main
            className={`${CSSClass.App}-App`}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}>
            {WorkspaceState.data.map(({ content, width, main }, index) => (
                <Fragment key={`modifier-${index}`}>
                    {(index !== 0 && WorkspaceState.data.length > index) && (
                        <div
                            onMouseDown={(event) => handleMouseDown(event, index, main)}
                            className={`${CSSClass.App}-App-Columns-Modifiers`}
                            style={{
                                cursor: "ew-resize"
                            }}
                        />
                    )}
                    <aside
                        style={{ width: width === 0 ? '100%' : `${width}px` }}
                        className={`${CSSClass.App}-App-Columns`} >
                        {content.map(({ height, identifier }, idx) => (
                            <LocalRounting key={idx} identifier={identifier}>
                                <Sector {...{ height, identifier }} />
                            </LocalRounting>
                        ))}
                        <CreateSector type="bottom" index={index} />
                    </aside>
                </Fragment>
            ))}
            <CreateSector type="right" />
        </main>
    );
}
