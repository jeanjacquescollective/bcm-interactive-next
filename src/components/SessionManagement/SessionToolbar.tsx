"use client";

import React, { useEffect, useRef, useState } from "react";
import DeleteSessionButton from "./DeleteSessionButton";
import CreateSessionButton from "./CreateSessionButton";
import { useCanvasDataContext } from "@/contexts/CanvasData";
import { EMPTY_SESSION } from "@/lib/actions/sessionActions";
import { CanvasSession } from "@/types/CanvasSession";
import { useDictionary } from "@/contexts/CanvasUI";

interface SessionToolbarProps {
  handleSessionNameChange: (newName: string) => void;
  handleSessionCreate: (name: string) => void;
  handleSessionDelete: (id: string) => void;
  getLastModified: () => string;
  updateURLWithSessionId: (id: string | null) => void;
}

const SessionToolbar: React.FC<SessionToolbarProps> = ({
  handleSessionNameChange,
  handleSessionCreate,
  handleSessionDelete,
  getLastModified,
  updateURLWithSessionId,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    sessionId,
    setSessionId,
    sessionsData,
    setSessionsData,
    setCanvasData,
  } = useCanvasDataContext();

  const dictionary = useDictionary();

 
  const selectedSession = sessionsData.find((s) => s.id?.toString() === sessionId);
  const [localName, setLocalName] = useState(selectedSession?.name ?? "");

  const hasSessions = sessionsData.length > 0;
  const disableSessionActions = sessionsData.length <= 1 || !hasSessions;

  // Sync local name with selected session
  useEffect(() => {
    setLocalName(selectedSession?.name ?? "");
    inputRef.current?.focus();
  }, [selectedSession?.id, selectedSession?.name]);

  const handleSessionSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const session = sessionsData.find((s) => s.id?.toString() === id);
    setSessionId(id);
    setCanvasData(session?.data ?? EMPTY_SESSION.data);
    updateURLWithSessionId(id);
  };

  const handleNameBlur = () => {
    const trimmed = localName.trim();
    if (trimmed && trimmed !== selectedSession?.name) {
      handleSessionNameChange(trimmed);
    }
  };

  const handleDelete = () => {
    if (!sessionId) return;
    handleSessionDelete(sessionId);

    setSessionsData((prev: CanvasSession[]) => {
      const updated = prev.filter((s) => s.id?.toString() !== sessionId);
      const next = updated[0] ?? EMPTY_SESSION;
      setSessionId(next.id?.toString() ?? "");
      setCanvasData(next.data);
      return updated;
    });
  };

   // Show loading spinner until sessions are loaded
  if (!sessionsData) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
        <svg
          className="animate-spin h-6 w-6 mb-2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        {dictionary.ui.loadingText}
      </div>
    );
  }


  return (
    <div className="sticky top-0 z-20 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30 transition-colors">
      <div className="flex items-center gap-2 flex-wrap">
        <label
          htmlFor="session-select"
          className="text-sm text-gray-900 dark:text-gray-200"
        >
          {dictionary.sessions?.selectSession || "Select Session"}:
        </label>

        <select
          id="session-select"
          className="border border-gray-300 dark:border-gray-700 px-2 py-1 rounded bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors"
          value={sessionId ?? ""}
          onChange={handleSessionSelectChange}
          aria-label="Select session"
          disabled={!hasSessions}
        >
          {!hasSessions ? (
            <option value="">Loading...</option>
          ) : (
            sessionsData.map((session) => {
              const sessionKey = session.id?.toString() ?? "";
              return (
                <option key={sessionKey} value={sessionKey}>
                  {session.name || "Untitled Session"}
                </option>
              );
            })
          )}
        </select>

        <input
          ref={inputRef}
          className="border border-gray-300 dark:border-gray-700 px-2 py-1 rounded bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors"
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleNameBlur}
          placeholder="Session name"
          aria-label="Edit session name"
          style={{ minWidth: 120 }}
          disabled={!hasSessions}
        />

        <DeleteSessionButton
          onDelete={handleDelete}
          sessionName={selectedSession?.name ?? ""}
          disabled={disableSessionActions}
        />

        <CreateSessionButton onCreate={handleSessionCreate} />
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">
        {!hasSessions ? "No sessions yet." : `Saved: ${getLastModified()}`}
      </div>
    </div>
  );
};

export default SessionToolbar;
