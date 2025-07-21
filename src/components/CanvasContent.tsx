"use client";

import { useContext, useMemo } from "react";
import CanvasBoard from "@/components/CanvasBoard";
import { CanvasUI } from "@/contexts/CanvasUI";
import { useCanvasDataContext } from "@/contexts/CanvasData";
import { CanvasData } from "@/types/CanvasSession";
import { Note } from "@/types/NoteList";
import { DragEndEvent } from "@dnd-kit/core";

const CanvasContent: React.FC<{ COLORS: string[] }> = ({ COLORS }) => {
  const canvasUI = useContext(CanvasUI);
  if (!canvasUI) throw new Error("CanvasUI not available");

  const { canvasData, saveSession } = useCanvasDataContext();

  const noteIdToSegmentKey = useMemo(() => {
    const map: Record<string, keyof CanvasData> = {};
    for (const [segmentKey, segment] of Object.entries(canvasData)) {
      for (const note of segment.items) {
        map[note.id] = segmentKey as keyof CanvasData;
      }
    }
    return map;
  }, [canvasData]);

  const handleSegmentChange = (
    segmentKey: keyof CanvasData,
    items: Note[],
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
    saveSession(newCanvasData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const noteId = active.id;
    const sourceKey = noteIdToSegmentKey[noteId];
    const isOverNote = noteIdToSegmentKey.hasOwnProperty(over.id);
    const destKey: keyof CanvasData = isOverNote
      ? noteIdToSegmentKey[over.id]
      : (String(over.id) as keyof CanvasData);

    if (!sourceKey || !destKey || !canvasData[sourceKey]) return;

    const note = canvasData[sourceKey].items.find((n) => n.id === noteId);
    if (!note) return;

    const updatedCanvasData = { ...canvasData };

    const sourceItems = [...updatedCanvasData[sourceKey].items];
    const oldIndex = sourceItems.findIndex((n) => n.id === noteId);
    sourceItems.splice(oldIndex, 1);
    updatedCanvasData[sourceKey] = {
      ...updatedCanvasData[sourceKey],
      items: sourceItems,
    };

    if (sourceKey === destKey) {
      const newIndex = sourceItems.findIndex((n) => n.id === over.id);
      const insertAt = newIndex === -1 ? oldIndex : newIndex;
      sourceItems.splice(insertAt, 0, note);
      updatedCanvasData[sourceKey].items = sourceItems;
    } else {
      const destItems = [...updatedCanvasData[destKey].items];
      destItems.push(note);
      updatedCanvasData[destKey].items = destItems;
    }

    saveSession(updatedCanvasData);
  };

  return (
    <CanvasBoard
      COLORS={COLORS}
      handleSegmentChange={handleSegmentChange}
      handleDragEnd={handleDragEnd}
    />
  );
};

export default CanvasContent;
