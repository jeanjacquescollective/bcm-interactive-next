import React from "react";

import { NoteItemProps } from "@/types/CanvasSegment/NoteList";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const NoteItem: React.FC<NoteItemProps> = ({
    note,
    expandedNoteIds,
    onExpand,
    onEdit,
    onDelete,
    segmentKey,
}) => {
    const isExpanded = expandedNoteIds.includes(note.id);

    // const { attributes, listeners, setNodeRef, transform } = useDraggable({
    //     id: note.id,
    //     data: { segmentKey },
    // });
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: note.id });

    return (
        <div
            className="rounded-md p-3 mb-3 flex items-start dark:shadow dark:border dark:border-gray-700"
            style={{
                background: note.color,
                color: "#fff",
                boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.5)" : "0 1px 4px rgba(0,0,0,0.3)",
                transform: CSS.Transform.toString(transform),
                transition,
                marginBottom: 8,
                padding: 12,
                borderRadius: 8,
                opacity: isDragging ? 0.8 : 1,
            }}
            ref={setNodeRef}
            {...attributes}
        >
            {/* Drag handle */}
            <div
                {...listeners}
                className="cursor-grab mr-2 text-white"
                title="Drag"
            >
                ⠿
            </div>

            {/* Expand toggle */}
            {note.description && (
                <button
                    className="mr-2 mt-0.5 border-0 bg-transparent cursor-pointer text-base text-white"
                    onClick={() => onExpand(note.id)}
                    aria-label="Expand/collapse"
                    type="button"
                >
                    {isExpanded ? "▼" : "▶"}
                </button>
            )}

            {/* Note content */}
            <div className="flex-1">
                <div className="font-medium">{note.title}</div>
                {isExpanded && <div className="mt-1">{note.description}</div>}
            </div>

            {/* Edit & Delete */}
            <button
                className="ml-2 border-0 bg-transparent cursor-pointer text-base text-white"
                title="Edit"
                onClick={() => onEdit(note)}
                type="button"
            >
                ✎
            </button>
            <button
                className="ml-1 border-0 bg-transparent cursor-pointer text-red-300 text-base"
                title="Delete"
                onClick={() => onDelete(note.id)}
                type="button"
            >
                🗑
            </button>
        </div>
    );
};


export default NoteItem;