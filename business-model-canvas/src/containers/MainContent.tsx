"use client";
import React, { useEffect, useState } from "react";
import { loadSessions, loadSession, saveSessions } from "@/app/actions/localStorage";
import { CanvasData, CanvasSession } from "@/types/CanvasSession";
import SessionToolbar from "@components/SessionManagement/SessionToolbar";
import CanvasBoard from "@/components/CanvasBoard";



const EMPTY_CANVAS: CanvasData = {
  keyPartners: { items: [], questions: [], key: "keyPartners" },
  keyActivities: { items: [], questions: [], key: "keyActivities" },
  keyResources: { items: [], questions: [], key: "keyResources" },
  valuePropositions: { items: [], questions: [], key: "valuePropositions" },
  customerRelationships: { items: [], questions: [], key: "customerRelationships" },
  channels: { items: [], questions: [], key: "channels" },
  customerSegments: { items: [], questions: [], key: "customerSegments" },
  costStructure: { items: [], questions: [], key: "costStructure" },
  revenueStreams: { items: [], questions: [], key: "revenueStreams" },
  brainStormArea: { items: [], questions: [], key: "brainStormArea" },
};

const EMPTY_SESSION = {
  id: 0,
  name: "Untitled Canvas",
  created: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  data: EMPTY_CANVAS,
};

const MainContent: React.FC = () => {
  const [sessions, setSessions] = useState<CanvasSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(EMPTY_SESSION.id);
  const [canvasData, setCanvasData] = useState<CanvasData>(EMPTY_SESSION.data);
  const [loading, setLoading] = useState(true);
  const [COLORS, setCOLORS] = useState<string[]>([]);
  const [openTimerModal, setOpenTimerModal] = useState(false);

  const noteIdToSegmentKey = React.useMemo(() => {
    const map: Record<string, keyof CanvasData> = {};
    Object.entries(canvasData).forEach(([segmentKey, segment]) => {
      segment.items.forEach((note: { id: string | number }) => {
        map[note.id] = segmentKey as keyof CanvasData;
      });
    });
    return map;
  }, [canvasData]);

  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then(setCOLORS)
      .catch(() => setCOLORS([]));
  }, []);

  useEffect(() => {
    const loadedSessions = loadSessions();
    setSessions(loadedSessions);
    if (loadedSessions.length > 0) {
      setSelectedSessionId(loadedSessions[0].id);
      setCanvasData(loadedSessions[0].data);
    }
    console.log("Loaded sessions:", loadedSessions);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!selectedSessionId) return;
    const session = loadSession(sessions, selectedSessionId);
    if (session) setCanvasData(session.data);
  }, [selectedSessionId, sessions]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  /**
   * Handler for creating a new session.
   */
  const handleCreateSession = (name: string) => {
    const newSession: CanvasSession = {
      ...EMPTY_SESSION,
      id: Date.now(),
      name,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setSessions(prev => {
      const updated = [...prev, newSession];
      saveSessions(updated);
      return updated;
    });
    setSelectedSessionId(newSession.id);
    setCanvasData(newSession.data);
  };


  /**
   * Unified handler for updating session data or name.
   */
  const handleSessionUpdate = (options: { newData?: CanvasData; newName?: string }) => {
    console.log("Updating session with options:", options);
    setSessions(prevSessions => {
      const updatedSessions = prevSessions.map(session => {
        if (session.id === selectedSessionId) {
          return {
            ...session,
            data: options.newData ?? session.data,
            name: options.newName ?? session.name,
            lastModified: new Date().toISOString(),
          };
        }
        return session;
      });
      saveSessions(updatedSessions);
      // If canvas data was updated, update local state as well
      if (options.newData) setCanvasData(options.newData);
      return updatedSessions;
    });
  };

  /**
   * Handler for when a note is added, removed, or edited in a segment.
   */
  const handleSegmentChange = (segmentKey: keyof CanvasData, items: any[], questions: string[]) => {
    const newCanvasData = {
      ...canvasData,
      [segmentKey]: {
        items,
        questions,
        key: segmentKey,
      },
    };
    handleSessionUpdate({ newData: newCanvasData });
  };


  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (!over) return;

    const noteId = active.id;
    const sourceKey = noteIdToSegmentKey[noteId];
    let destKey = over.id;

    if (
      !destKey ||
      destKey === "undefined" ||
      typeof destKey === "number"
    ) {
      destKey = noteIdToSegmentKey[over.id]; // Default to source if over is not defined or destKey is a number
    }

    if (!sourceKey) {
      console.error("Could not find source segment for note ID:", noteId);
      return;
    }

    const note = canvasData[sourceKey]?.items.find((n) => n.id === noteId);
    if (!note) {
      console.error("Note not found in source segment", sourceKey, noteId);
      return;
    }

    const newCanvasData = { ...canvasData };

    // Explicitly type destKey as keyof CanvasData for type safety
    if (
      !destKey ||
      !(Object.keys(newCanvasData) as Array<keyof CanvasData>).includes(destKey as keyof CanvasData)
    ) {
      console.log("Destination segment not found or invalid:", destKey);
      console.warn("Invalid or missing destination key. Defaulting to source.");
      return; // Don't do anything if the drop target is not recognized
    }

    // Remove note from source
    newCanvasData[sourceKey] = {
      ...newCanvasData[sourceKey],
      items: newCanvasData[sourceKey].items.filter((n) => n.id !== noteId),
    };

    // Insert note into destination
    if (sourceKey === destKey) {
      // Sorting within the same list
      const oldIndex = canvasData[sourceKey].items.findIndex((n) => n.id === noteId);
      const newIndex = canvasData[sourceKey].items.findIndex((n) => n.id === over.id);

      const reordered = [...canvasData[sourceKey].items];
      reordered.splice(oldIndex, 1); // remove old position
      reordered.splice(newIndex, 0, note); // insert at new position

      newCanvasData[sourceKey] = {
        ...newCanvasData[sourceKey],
        items: reordered,
        key: sourceKey,
      };
    } else {
      // Moving between segments, append to destination
      const destKeyTyped = destKey as keyof CanvasData;
      newCanvasData[destKeyTyped] = {
        ...newCanvasData[destKeyTyped],
        items: [...newCanvasData[destKeyTyped].items, note],
        key: destKeyTyped,
      };
    }

    setCanvasData(newCanvasData);
    handleSessionUpdate({ newData: newCanvasData });

    // optional: force re-render
    setTimeout(() => {
      setCanvasData({ ...newCanvasData });
    }, 0);
  };

  /**
   * Handler for when the session name changes.
   */
  const handleSessionNameChange = (newName: string) => {
    handleSessionUpdate({ newName });
  };

  const getLastModified = () =>
    sessions.find((s) => s.id === selectedSessionId)?.lastModified ?? "";


  return (
    <>
      <SessionToolbar
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        setSelectedSessionId={setSelectedSessionId}
        setSessions={setSessions}
        setCanvasData={setCanvasData}
        handleSessionNameChange={handleSessionNameChange}
        handleCreateSession={handleCreateSession}
        getLastModified={getLastModified}
        EMPTY_SESSION={EMPTY_SESSION}
      />
      <CanvasBoard
        canvasData={canvasData}
        COLORS={COLORS}
        handleSegmentChange={handleSegmentChange}
        handleDragEnd={handleDragEnd}
      />
    </>
  );
};

export default MainContent;
