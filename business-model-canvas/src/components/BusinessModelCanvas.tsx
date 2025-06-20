"use client";
import React, { useEffect, useState } from "react";
import CanvasSegment from "./CanvasSegment/CanvasSegment";
import { loadSessions, loadSession, saveSessions } from "@/app/actions/localStorage";
import { CanvasData, CanvasSession } from "@/types/CanvasSession";
import { DndContext, closestCenter } from "@dnd-kit/core";


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

const BusinessModelCanvas: React.FC = () => {
  const [sessions, setSessions] = useState<CanvasSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(EMPTY_SESSION.id);
  const [canvasData, setCanvasData] = useState<CanvasData>(EMPTY_SESSION.data);
  const [loading, setLoading] = useState(true);
  const [COLORS, setCOLORS] = useState<string[]>([]);

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

    if (!destKey || !newCanvasData[destKey]) {
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
      newCanvasData[destKey] = {
        ...newCanvasData[destKey],
        items: [...newCanvasData[destKey].items, note],
        key: destKey,
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
      <div className="col-span-4 row-start-2 container mx-auto px-4 max-w-8xl mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-5" >
        {/* Session Selector and Name Editor */}
        <div className="flex items-center gap-2">
          {/* Session Dropdown */}
          <select
            className="border px-2 py-1 rounded"
            value={selectedSessionId ?? ""}
            onChange={e => setSelectedSessionId(Number(e.target.value))}
          >
            {sessions.map(session => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>
          {/* Session Name Input */}
          <input
            className="border px-2 py-1 rounded"
            type="text"
            value={
              sessions.find(s => s.id === selectedSessionId)?.name ?? ""
            }
            onChange={e => handleSessionNameChange(e.target.value)}
            placeholder="Session name"
            style={{ minWidth: 120 }}
          />
        </div>
        {/* Last Modified Timestamp */}
        <span className="text-gray-500 dark:text-gray-400">
          Saved: {getLastModified()}
        </span>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="w-full mx-auto p-4 rounded-lg shadow-md bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col md:flex-row shadow gap-2 bg-gray-100 dark:bg-gray-800">
            <div className="flex flex-col flex-[1_1_0%] rounded shadow-sm bg-white dark:bg-gray-900">
              <CanvasSegment segmentTitle="Key Partners" segmentData={canvasData.keyPartners} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
            </div>
            <div className="flex flex-col flex-[1_1_0%] gap-2">
              <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                <CanvasSegment segmentTitle="Key Activities" segmentData={canvasData.keyActivities} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
              </div>
              <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                <CanvasSegment segmentTitle="Key Resources" segmentData={canvasData.keyResources} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
              </div>
            </div>
            <div className="flex flex-col flex-[2_2_0%] rounded shadow-sm bg-white dark:bg-gray-900">
              <CanvasSegment segmentTitle="Value Propositions" segmentData={canvasData.valuePropositions} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
            </div>
            <div className="flex flex-col flex-[1_1_0%] gap-2">
              <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                <CanvasSegment segmentTitle="Customer Relationships" segmentData={canvasData.customerRelationships} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
              </div>
              <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                <CanvasSegment segmentTitle="Channels" segmentData={canvasData.channels} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
              </div>
            </div>
            <div className="flex flex-col flex-[1_1_0%] rounded shadow-sm bg-white dark:bg-gray-900">
              <CanvasSegment segmentTitle="Customer Segments" segmentData={canvasData.customerSegments} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
            </div>
          </div>
          <div className="flex p-4 shadow gap-2 bg-gray-100 dark:bg-gray-800">
            <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
              <CanvasSegment segmentTitle="Cost Structure" segmentData={canvasData.costStructure} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
            </div>
            <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
              <CanvasSegment segmentTitle="Revenue Streams" segmentData={canvasData.revenueStreams} COLORS={COLORS} handleSegmentChange={handleSegmentChange} />
            </div>
          </div>
          <div className="flex p-4 shadow gap-2 bg-gray-100 dark:bg-gray-800">
            <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
              <CanvasSegment
                segmentTitle="Brainstorm Area"
                segmentData={canvasData.brainStormArea}
                COLORS={COLORS}
                handleSegmentChange={handleSegmentChange}
              />
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default BusinessModelCanvas;
