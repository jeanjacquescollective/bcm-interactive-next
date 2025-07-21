"use client";

import { EMPTY_SESSION } from "@/lib/actions/sessionActions";
import { CanvasData, CanvasSession } from "@/types/CanvasSession";
import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { SessionService } from "@/lib/services/sessionService";
import { localStorageProvider } from "@/lib/storage/client/localStorage";

export interface CanvasDataContextType {
  canvasData: CanvasData;
  setCanvasData: Dispatch<SetStateAction<CanvasData>>;
  sessionsData: CanvasSession[];
  setSessionsData: Dispatch<SetStateAction<CanvasSession[]>>;
  setSessionId: (id: string) => void;
  sessionId: string | null;
  saveSession: (newData: CanvasData) => void;
  createSession: (name: string) => Promise<void>;
  updateSession: (options: { data?: CanvasData; name?: string }) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
}

export const CanvasDataContext = createContext<CanvasDataContextType | undefined>(undefined);

export function CanvasDataProvider({ children }: { children: ReactNode }) {
  const [sessionsData, setSessionsData] = useState<CanvasSession[]>([]);
  const [canvasData, setCanvasData] = useState<CanvasData>(EMPTY_SESSION.data);
  const sessionService = new SessionService(localStorageProvider);


  const [sessionId, _setSessionId] = useState<string | null>(null);

const setSessionId = (id: string) => {
  _setSessionId(id);
  const url = new URL(window.location.href);
  if (id) {
    url.searchParams.set("sessionId", id);
  } else {
    url.searchParams.delete("sessionId");
  }
  window.history.replaceState({}, "", url.toString());
};

  const updateURLWithSessionId = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sessionId", id);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    async function fetchData() {
      let sessions = await sessionService.getAll();

      if (sessions.length === 0) {
        await sessionService.add("default session");
        sessions = await sessionService.getAll();
      }

      setSessionsData(sessions);

      const url = new URL(window.location.href);
      const urlSessionId = url.searchParams.get("sessionId");

      const matched = sessions.find((s) => s.id?.toString() === urlSessionId);
      const finalSession = matched ?? sessions[0];
      const finalId = finalSession.id?.toString() ?? "";

      setSessionId(finalId);
      updateURLWithSessionId(finalId);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (sessionId && sessionsData.length > 0) {
      const session = sessionsData.find((s) => s.id === sessionId);
      setCanvasData(session ? session.data : EMPTY_SESSION.data);
    }
  }, [sessionId, sessionsData]);

  const saveSession = useCallback(
    async (newData: CanvasData) => {
      if (!sessionId) return;
      setCanvasData(newData);
      const updated = await sessionService.update(sessionId, { data: newData });
      setSessionsData(updated);
    },
    [sessionId]
  );

  const createSession = async (name: string) => {
    await sessionService.add(name);
    const updated = await sessionService.getAll();
    setSessionsData(updated);
    const newSession = updated[updated.length - 1];
    const newId = newSession.id?.toString() ?? "";
    setSessionId(newId);
    updateURLWithSessionId(newId);
  };

  const updateSession = async (options: { data?: CanvasData; name?: string }) => {
    if (!sessionId) return;
    await sessionService.update(sessionId, options);
    const updated = await sessionService.getAll();
    setSessionsData(updated);
    updateURLWithSessionId(sessionId);
  };

  const deleteSession = async (id: string) => {
    await sessionService.delete(id);
    const updated = await sessionService.getAll();
    setSessionsData(updated);
    const nextSession = updated[0] ?? EMPTY_SESSION;
    const nextId = nextSession.id?.toString() ?? "";
    setSessionId(nextId);
    updateURLWithSessionId(nextId);
  };

  return (
    <CanvasDataContext.Provider
      value={{
        canvasData,
        setCanvasData,
        sessionsData,
        setSessionsData,
        setSessionId,
        sessionId,
        saveSession,
        createSession,
        updateSession,
        deleteSession,
      }}
    >
      {children}
    </CanvasDataContext.Provider>
  );
}

export function useCanvasDataContext() {
  const context = useContext(CanvasDataContext);
  if (!context) throw new Error("useCanvasDataContext must be used within a CanvasDataProvider");
  return context;
}
