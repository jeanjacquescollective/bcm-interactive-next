"use client";

import { Note } from "@/types/NoteList";
import { CanvasData } from "@/types/CanvasSession";
import React, { createContext, ReactNode, useState, useMemo, Dispatch, SetStateAction } from "react";

interface CanvasUIContextType {
  currentNote: Note | null;
  setCurrentNote: Dispatch<SetStateAction<Note | null>>;

  segmentKey: keyof CanvasData | null;
  setSegmentKey: (k: keyof CanvasData | null) => void;

  openNoteModal: boolean;
  setOpenNoteModal: Dispatch<SetStateAction<boolean>>;

  isDraggable: boolean;
  setIsDraggable: (value: boolean) => void;

  language: string;
  dictionary: Record<string, Record<string, string>>;
}

export const CanvasUI = createContext<CanvasUIContextType | undefined>(undefined);

export function CanvasUIProvider({
  children,
  dictionary,
  language,
}: {
  children: ReactNode;
  dictionary: Record<string, Record<string, string>>;
  language: string;
}) {
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [segmentKey, setSegmentKey] = useState<keyof CanvasData | null>(null);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  console.log("CanvasUIProvider initialized with dictionary:", dictionary);

  if (!dictionary || Object.keys(dictionary).length === 0) {
    console.warn("CanvasUIProvider: Dictionary is empty or undefined.");
  }

  const contextValue = useMemo(() => ({
    currentNote,
    setCurrentNote,
    segmentKey,
    setSegmentKey,
    openNoteModal,
    setOpenNoteModal,
    isDraggable,
    setIsDraggable,
    language,
    dictionary,
  }), [
    currentNote,
    segmentKey,
    openNoteModal,
    isDraggable,
    language,
    dictionary,
  ]);

  return (
    <CanvasUI.Provider value={contextValue}>
      {children}
    </CanvasUI.Provider>
  );
}

export function useDictionary() {
  const context = React.useContext(CanvasUI);
  if (!context) {
    throw new Error("useDictionary must be used within a CanvasUIProvider");
  }
  return context.dictionary;
}