import React, { FC } from "react";
import { Edit3, Trash2, Plus, X } from "react-feather";
import SessionItem from "@/components/SessionItem";
import SessionItemCreate from "@/components/SessionItemCreate";

// Dummy data for canvases
const canvases = [
    { id: "1", title: "Business Model 1" },
    { id: "2", title: "Business Model 2" },
    { id: "3", title: "Business Model 3" },
];

interface SessionListProps {
    onClose: () => void;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
    onSelect: (id: string) => void;
    onAdd: () => void;
}

const SessionList: FC<SessionListProps> = ({
    onClose,
    onEdit,
    onRemove,
    onSelect,
    onAdd,
}) => {
    const [newCanvasName, setNewCanvasName] = React.useState<string>("");

    // Detect dark mode using a media query or a context/provider if you have one
    const isDark =
        typeof window !== "undefined"
            ? window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            : false;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDark ? "bg-black/80" : "bg-black/40"}`}>
            <div
            className={`rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col ${
                isDark ? "bg-gray-900 text-gray-100" : "bg-white"
            }`}
            >
            {/* Add New Canvas */}
           
            <SessionItemCreate onAdd={onAdd} isDark={isDark} />
            {/* Canvas List */}
            <ul className="flex-1 overflow-y-auto">
                {canvases.map((canvas) => (
                <SessionItem
                    key={canvas.id}
                    id={canvas.id}
                    title={canvas.title}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    onClose={onClose}
                    isDark={isDark}
                />
                ))}
            </ul>

            {/* Close Button */}
            <div className="flex justify-end mt-6">
                <button
                className={`rounded-full p-2 shadow ${
                    isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={onClose}
                aria-label="Close"
                >
                Return
                </button>
            </div>
            </div>
        </div>
    );
};

export default SessionList;