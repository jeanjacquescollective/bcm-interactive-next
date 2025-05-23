import React from "react";
import { Edit3, Trash2, Plus, X } from "react-feather";

export interface SessionItemProps {
    id: string;
    title: string;
    onSelect: (id: string) => void;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
    onClose: () => void;
    isDark: boolean;
}

const SessionItem: React.FC<SessionItemProps> = ({
    id,
    title,
    onSelect,
    onEdit,
    onRemove,
    onClose,
    isDark,
}) => (
    <li
        className="flex items-center justify-between px-2 py-3 rounded hover:bg-gray-100 transition group"
    >
        <button
            className="text-left flex-1 font-medium text-gray-800 group-hover:underline"
            onClick={() => {
                onSelect(id);
                onClose();
            }}
        >
            {title}
        </button>
        <div className="flex items-center gap-2 ml-2">
            <button
                className="p-1 text-gray-500 hover:text-blue-600"
                onClick={() => onEdit(id)}
                aria-label="Edit"
            >
                <Edit3 size={18} />
            </button>
            <button
                className="p-1 text-gray-500 hover:text-red-600"
                onClick={() => onRemove(id)}
                aria-label="Remove"
            >
                <Trash2 size={18} />
            </button>
        </div>
    </li>
);

export default SessionItem;