"use client";

import React, { useEffect, useRef, useState } from "react";
import DeleteSessionButton from "./DeleteSessionButton";
import CreateSessionButton from "./CreateSessionButton";
import { useCanvasDataContext } from "@/contexts/CanvasData";
import { EMPTY_SESSION } from "@/lib/actions/sessionActions";
import { CanvasSession } from "@/types/CanvasSession";

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

  const selectedSession = sessionsData.find((s) => s.id?.toString() === sessionId);
  const [localName, setLocalName] = useState(selectedSession?.name ?? "");

  // Update input value when session changes
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleNameBlur = () => {
    if (localName.trim() && localName !== selectedSession?.name) {
      handleSessionNameChange(localName.trim());
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

  return (
    <div className="sticky top-0 z-20 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md transition-colors">
      <div className="flex items-center gap-2 flex-wrap">
        <label htmlFor="session-select" className="text-sm text-gray-900 dark:text-gray-200">
          Session:
        </label>

        <select
          id="session-select"
          className="border border-gray-300 dark:border-gray-700 px-2 py-1 rounded bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors"
          value={sessionId ?? ""}
          onChange={handleSessionSelectChange}
          aria-label="Select session"
        >
          {sessionsData.map((session) => {
            const sessionKey = session.id?.toString() ?? "";
            return (
              <option key={sessionKey} value={sessionKey}>
                {session.name || "Untitled Session"}
              </option>
            );
          })}
        </select>

        <input
          ref={inputRef}
          className="border border-gray-300 dark:border-gray-700 px-2 py-1 rounded bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors"
          type="text"
          value={localName}
          onChange={handleInputChange}
          onBlur={handleNameBlur}
          placeholder="Session name"
          aria-label="Edit session name"
          style={{ minWidth: 120 }}
        />

        <DeleteSessionButton
          onDelete={handleDelete}
          sessionName={selectedSession?.name ?? ""}
          disabled={sessionsData.length <= 1}
        />

        <CreateSessionButton onCreate={handleSessionCreate} />
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">
        Saved: {getLastModified()}
      </div>
    </div>
  );
};

export default SessionToolbar;
