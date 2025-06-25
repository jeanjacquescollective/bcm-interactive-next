import React from "react";

interface DragElementProps {
    listeners?: React.HTMLAttributes<HTMLDivElement>;
}

const DragHandle: React.FC<DragElementProps> = ({ listeners = {} }) => (
    <div
        {...listeners}
        className="cursor-grab mr-2 text-white"
        title="Drag"
    >
        ⠿
    </div>
);

export default DragHandle;