import React from "react";

interface DragElementProps {
    listeners?: React.HTMLAttributes<HTMLDivElement>;
}

const DragHandle: React.FC<DragElementProps> = ({ listeners = {} }) => (
    <div
        {...listeners}
        className="cursor-grab mr-2 text-black dark:text-white hover:text-gray-200 dark:hover:text-gray-100 transition-colors"
        title="Drag"
    >
        ⠿
    </div>
);

export default DragHandle;