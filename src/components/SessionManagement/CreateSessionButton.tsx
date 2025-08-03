"use client";
import { useDictionary } from "@/contexts/CanvasUI";
import React, { useState } from "react";

interface CreateSessionButtonProps {
    onCreate?: (sessionName: string) => void;
}

const CreateSessionButton: React.FC<CreateSessionButtonProps> = ({ onCreate }) => {
    const [showInput, setShowInput] = useState(false);
    const [sessionName, setSessionName] = useState("");

    const handleCreate = () => {
        if (sessionName.trim()) {
            onCreate?.(sessionName.trim());
            setSessionName("");
            setShowInput(false);
        }
    };

    const dictionary = useDictionary();

    return (
        <div className="flex flex-col items-start" style={{ minHeight: showInput ? "40px" : "40px" }}>
            {showInput ? (
            <div className="flex flex-wrap items-center gap-2 w-full">
                <input
                type="text"
                className="border rounded px-1 py-0.5 text-sm flex-1 min-w-0 focus:outline-none"
                placeholder="Name"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                    if (e.key === "Escape") setShowInput(false);
                }}
                autoFocus
                />
                <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                onClick={handleCreate}
                >
                {dictionary?.sessions.addSession || "Create Session"}
                </button>
                <button
                className="text-gray-500 hover:text-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 transition"
                onClick={() => setShowInput(false)}
                aria-label="Cancel"
                >
                {dictionary?.ui.cancelText || "Cancel"}
                </button>
            </div>
            ) : (
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setShowInput(true)}
                style={{ minHeight: "40px" }}
            >
                + {dictionary?.sessions.addSession || "Create Session"}
            </button>
            )}
        </div>
    );
};

export default CreateSessionButton;