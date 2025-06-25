"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { CanvasData, CanvasSession } from "@/types/CanvasSession";
import SessionToolbar from "@components/SessionManagement/SessionToolbar";
import CanvasBoard from "@/components/CanvasBoard";

import { EMPTY_SESSION } from "@/lib/actions/sessionActions";
import { SessionService } from "@/lib/services/sessionService";
import { localStorageProvider } from "@/lib/storage/client/localStorage";
import { CanvasUI, CanvasUIProvider } from "@/contexts/CanvasUI";

const sessionService = new SessionService(localStorageProvider);

const MainContent: React.FC = () => {
  const [sessions, setSessions] = useState<CanvasSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [canvasData, setCanvasData] = useState<CanvasData>(EMPTY_SESSION.data);
  const [loading, setLoading] = useState(true);
  const [COLORS, setCOLORS] = useState<string[]>([]);

  const noteIdToSegmentKey = useMemo(() => {
    const map: Record<string, keyof CanvasData> = {};
    for (const [segmentKey, segment] of Object.entries(canvasData)) {
      for (const note of segment.items) {
        map[note.id] = segmentKey as keyof CanvasData;
      }
    }
    return map;
  }, [canvasData]);

  const updateURLWithSessionId = useCallback((id: string | null) => {
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("sessionId", id);
    } else {
      url.searchParams.delete("sessionId");
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  const initializeSessions = useCallback(async () => {
    const loadedSessions = await sessionService.getAll();
    setSessions(loadedSessions);

    const urlSessionId = new URL(window.location.href).searchParams.get("sessionId");
    const session = urlSessionId
      ? loadedSessions.find((s) => s.id?.toString() === urlSessionId)
      : loadedSessions[0];

    if (session) {
      setSelectedSessionId(session.id?.toString() ?? null);
      setCanvasData(session.data);
      updateURLWithSessionId(session.id?.toString() ?? null);
    } else {
      setSelectedSessionId(EMPTY_SESSION.id?.toString() ?? null);
      setCanvasData(EMPTY_SESSION.data);
    }

    setLoading(false);
  }, [updateURLWithSessionId]);

  useEffect(() => {
    initializeSessions();
  }, [initializeSessions]);

  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then(setCOLORS)
      .catch(() => setCOLORS([]));
  }, []);

  useEffect(() => {
    const session = sessions.find((s) => s.id?.toString() === selectedSessionId);
    if (session) {
      setCanvasData(session.data);
    }
  }, [selectedSessionId, sessions]);

  const handleSessionCreate = async (name: string) => {
    const updated = await sessionService.add(name);
    setSessions(updated);
    const newSession = updated[updated.length - 1];
    const newId = newSession.id?.toString() ?? null;
    setSelectedSessionId(newId);
    setCanvasData(newSession.data);
    updateURLWithSessionId(newId);
  };

  const handleSessionUpdate = async (options: { data?: CanvasData; name?: string }) => {
    if (!selectedSessionId) return;
    const updated = await sessionService.update(selectedSessionId, options);
    setSessions(updated);
    if (options.data) setCanvasData(options.data);
    updateURLWithSessionId(selectedSessionId);
  };

  const handleSessionDelete = async (id: string) => {
    const updated = await sessionService.delete(id);
    setSessions(updated);

    const nextSession = updated[0] ?? EMPTY_SESSION;
    const nextId = nextSession.id?.toString() ?? null;

    setSelectedSessionId(nextId);
    setCanvasData(nextSession.data);
    updateURLWithSessionId(nextId);
  };

  const handleSegmentChange = (
    segmentKey: keyof CanvasData,
    items: any[],
    questions: string[]
  ) => {
    const newCanvasData: CanvasData = {
      ...canvasData,
      [segmentKey]: {
        key: segmentKey,
        items,
        questions,
      },
    };
    handleSessionUpdate({ data: newCanvasData });
  };

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (!over) return;

    const noteId = active.id;
    const sourceKey = noteIdToSegmentKey[noteId];
    const destKey = over.id as keyof CanvasData;

    if (!sourceKey || !canvasData[sourceKey]) return;

    const note = canvasData[sourceKey].items.find((n) => n.id === noteId);
    if (!note) return;

    const updatedCanvasData = { ...canvasData };

    // Remove from source
    updatedCanvasData[sourceKey] = {
      ...updatedCanvasData[sourceKey],
      items: updatedCanvasData[sourceKey].items.filter((n) => n.id !== noteId),
    };

    if (sourceKey === destKey) {
      const reordered = [...canvasData[sourceKey].items];
      const oldIndex = reordered.findIndex((n) => n.id === noteId);
      const newIndex = reordered.findIndex((n) => n.id === over.id);

      reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, note);

      updatedCanvasData[sourceKey] = {
        ...updatedCanvasData[sourceKey],
        items: reordered,
      };
    } else if (updatedCanvasData[destKey]) {
      updatedCanvasData[destKey] = {
        ...updatedCanvasData[destKey],
        items: [...updatedCanvasData[destKey].items, note],
      };
    }

    setCanvasData(updatedCanvasData);
    handleSessionUpdate({ data: updatedCanvasData });
  };

  const handleSessionNameChange = (newName: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id?.toString() === selectedSessionId ? { ...s, name: newName } : s
      )
    );
    handleSessionUpdate({ name: newName });
  };

  const handleSelectedSessionChange = (id: string | null) => {
    setSelectedSessionId(id);
    updateURLWithSessionId(id);
  };

  const getLastModified = () =>
    sessions.find((s) => s.id?.toString() === selectedSessionId)?.lastModified ?? "";

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <SessionToolbar
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        setSelectedSessionId={handleSelectedSessionChange}
        setSessions={setSessions}
        setCanvasData={setCanvasData}
        handleSessionNameChange={handleSessionNameChange}
        handleSessionCreate={handleSessionCreate}
        handleSessionDelete={handleSessionDelete}
        getLastModified={getLastModified}
        EMPTY_SESSION={EMPTY_SESSION}
      />
      <CanvasUIProvider>
      <CanvasBoard
        canvasData={canvasData}
        COLORS={COLORS}
        handleSegmentChange={handleSegmentChange}
        handleDragEnd={handleDragEnd}
      />
      </CanvasUIProvider>
    </>
  );
};

export default MainContent;
