"use client";
import React, { useEffect, useRef } from "react";
import DeleteSessionButton from "./DeleteSessionButton";
import CreateSessionButton from "./CreateSessionButton";
import { CanvasData, CanvasSession } from "@/types/CanvasSession";

interface SessionToolbarProps {
    sessions: CanvasSession[];
    selectedSessionId: string | null;
    setSelectedSessionId: (id: string | null) => void;
    setSessions: (updater: (prev: CanvasSession[]) => CanvasSession[]) => void;
    setCanvasData: (data: CanvasData) => void;
    handleSessionNameChange: (newName: string) => void;
    handleSessionCreate: (name: string) => void;
    handleSessionDelete: (id: string) => void;
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
    handleSessionCreate,
    handleSessionDelete,
    getLastModified,
    EMPTY_SESSION,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [selectedSessionId]);

    const getSelectedSession = () =>
        sessions.find((s) => s.id != null && s.id.toString() === selectedSessionId);

    const handleSessionSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSessionId(e.target.value);
    };

    const handleSessionNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSessionNameChange(e.target.value);
    };

    const handleDelete = () => {
        if (!selectedSessionId) return;
        handleSessionDelete(selectedSessionId);
        setSessions((prev) => {
            const updated = prev.filter(
                (s) => s.id != null && s.id.toString() !== selectedSessionId
            );

            if (updated.length > 0) {
                const firstSession = updated[0];
                setSelectedSessionId(firstSession.id?.toString() ?? null);
                setCanvasData(firstSession.data);
            } else {
                setSelectedSessionId(EMPTY_SESSION.id?.toString() ?? null);
                setCanvasData(EMPTY_SESSION.data);
            }

            return updated;
        });

    };

    const renderSessionOptions = () =>
        sessions.map((session) => (
            <option key={session.id?.toString()} value={session.id?.toString()}>
                {session.name || "Untitled Session"}
            </option>
        ));

    const selectedSession = getSelectedSession();

    return (
        <div className="sticky top-0 z-20 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            {/* Left: Session Controls */}
            <div className="flex items-center gap-2 flex-wrap">
                <label htmlFor="session-select" className="text-sm">
                    Session:
                </label>

                <select
                    id="session-select"
                    className="border px-2 py-1 rounded bg-white dark:bg-gray-800"
                    value={selectedSessionId ?? ""}
                    onChange={handleSessionSelectChange}
                    aria-label="Select session"
                >
                    {renderSessionOptions()}
                </select>

                <input
                    ref={inputRef}
                    className="border px-2 py-1 rounded"
                    type="text"
                    value={selectedSession?.name ?? ""}
                    onChange={handleSessionNameInputChange}
                    placeholder="Session name"
                    aria-label="Edit session name"
                    style={{ minWidth: 120 }}
                />

                <DeleteSessionButton
                    onDelete={handleDelete}
                    sessionName={selectedSession?.name ?? ""}
                    disabled={sessions.length <= 1}
                />

                <CreateSessionButton onCreate={handleSessionCreate} />
            </div>

            {/* Right: Saved Timestamp */}
            <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Saved: {getLastModified()}
            </div>
        </div>
    );
};

export default SessionToolbar;
