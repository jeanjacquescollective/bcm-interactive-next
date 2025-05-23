import React, { useState } from "react";
import { Plus } from "react-feather";

interface SessionItemCreateProps {
    onAdd: (name: string) => void;
    isDark?: boolean;
}

const SessionItemCreate: React.FC<SessionItemCreateProps> = ({ onAdd, isDark = false }) => {
    const [newCanvasName, setNewCanvasName] = useState("");

    return (
        <div className="flex items-center gap-2 mb-4">
            <input
                type="text"
                placeholder="Canvas name"
                className={`border rounded px-2 py-1 flex-1 ${
                    isDark
                        ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                        : ""
                }`}
                value={newCanvasName}
                onChange={(e) => setNewCanvasName(e.target.value)}
            />
            <button
                className={`p-2 rounded hover:bg-blue-100 ${
                    isDark
                        ? "text-blue-400 hover:bg-blue-900"
                        : "text-blue-600"
                }`}
                onClick={() => {
                    if (newCanvasName.trim()) {
                        onAdd(newCanvasName.trim());
                        setNewCanvasName("");
                    }
                }}
                aria-label="Add Canvas"
                type="button"
            >
                <Plus size={18} />
            </button>
        </div>
    );
};

export default SessionItemCreate;