"use client";
import React, { useEffect, useRef } from "react";
import DeleteSessionButton from "./DeleteSessionButton";
import CreateSessionButton from "./CreateSessionButton";
import { CanvasSession } from "@/types/CanvasSession";

interface SessionToolbarProps {
    sessions: CanvasSession[];
    selectedSessionId: number | null;
    setSelectedSessionId: (id: number) => void;
    setSessions: (updater: (prev: CanvasSession[]) => CanvasSession[]) => void;
    setCanvasData: (data: any) => void;
    handleSessionNameChange: (newName: string) => void;
    handleCreateSession: (name: string) => void;
    getLastModified: () => string;
    EMPTY_SESSION: CanvasSession;
}

const SessionToolbar: React.FC<SessionToolbarProps> = ({
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    setSessions,
    setCanvasData,
    handleSessionNameChange,
    handleCreateSession,
    getLastModified,
    EMPTY_SESSION,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Autofocus on name input when session changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedSessionId]);

    return (
        <div className="sticky top-0 z-20 container mx-auto max-w-8xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            {/* Left: Session Controls */}
            <div className="flex items-center gap-2 flex-wrap">
                <label htmlFor="session-select" className="text-sm text-gray-300">
                    Session:
                </label>

                {/* Dropdown First */}
                <select
                    id="session-select"
                    className="border px-2 py-1 rounded bg-white dark:bg-gray-800"
                    value={selectedSessionId ?? ""}
                    onChange={(e) => setSelectedSessionId(Number(e.target.value))}
                    aria-label="Select session"
                >
                    {sessions.map((session) => (
                        <option key={session.id} value={session.id}>
                            {session.name}
                        </option>
                    ))}
                </select>

                {/* Editable Session Name */}
                <input
                    ref={inputRef}
                    className="border px-2 py-1 rounded"
                    type="text"
                    value={sessions.find((s) => s.id === selectedSessionId)?.name ?? ""}
                    onChange={(e) => handleSessionNameChange(e.target.value)}
                    placeholder="Session name"
                    aria-label="Edit session name"
                    style={{ minWidth: 120 }}
                />

                {/* Delete Current */}
                <DeleteSessionButton
                    onDelete={() => {
                        if (selectedSessionId !== null) {
                            setSessions((prev) => {
                                const updated = prev.filter((s) => s.id !== selectedSessionId);
                                if (updated.length > 0) {
                                    setSelectedSessionId(updated[0].id);
                                    setCanvasData(updated[0].data);
                                } else {
                                    setSelectedSessionId(EMPTY_SESSION.id);
                                    setCanvasData(EMPTY_SESSION.data);
                                }
                                return updated;
                            });
                        }
                    }}
                    sessionName={
                        sessions.find((s) => s.id === selectedSessionId)?.name ?? ""
                    }
                    disabled={sessions.length <= 1}
                />

                {/* Create New */}
                <CreateSessionButton onCreate={handleCreateSession} />
            </div>

            {/* Right: Saved Timestamp */}
            <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Saved: {getLastModified()}
            </div>
        </div>

    );
};

export default SessionToolbar;
