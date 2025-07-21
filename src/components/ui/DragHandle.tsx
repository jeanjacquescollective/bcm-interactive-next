import React from "react";
import { CanvasUI } from "@/contexts/CanvasUI";

interface DragElementProps {
    listeners?: React.HTMLAttributes<HTMLDivElement>;
    showDragHandle?: boolean;
}

const DragHandle: React.FC<DragElementProps> = ({ listeners = {}, showDragHandle }) => {
    const { isDraggable } = React.useContext(CanvasUI) || {};
    const shouldShowHandle = showDragHandle ?? isDraggable;

    return (
        <div
            {...listeners}
            className={`mr-2 transition-colors ${
            shouldShowHandle
                ? "cursor-grab text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-100"
                : "cursor-not-allowed text-transparent pointer-events-none"
            }`}
            title="Drag"
            aria-disabled={!shouldShowHandle}
            tabIndex={shouldShowHandle ? 0 : -1}
            style={{ backgroundColor: "transparent" }}
        >
            ⠿
        </div>
    ) 
};

export default DragHandle;