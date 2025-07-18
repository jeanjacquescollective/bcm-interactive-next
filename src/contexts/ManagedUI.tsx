"use client";
import { Note } from "@/types/NoteList";
import { CanvasData } from "@/types/CanvasSession";
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the context type
interface ManagedUIContextType {
    openTimerModal: boolean;
    setOpenTimerModal: Dispatch<SetStateAction<boolean>>;
    openNoteModal: boolean;
    setOpenNoteModal: Dispatch<SetStateAction<boolean>>;
    openBrainstormModal: boolean;
    setOpenBrainstormModal: Dispatch<SetStateAction<boolean>>;
    currentNote: Note | null;
    setCurrentNote: Dispatch<SetStateAction<Note | null>>;
    segmentKey: keyof CanvasData | null;
    setSegmentKey: (k: keyof CanvasData | null) => void;
    openImportModal: boolean;
    setOpenImportModal: Dispatch<SetStateAction<boolean>>;
    focusedSegment: keyof CanvasData | null;
    setFocusedSegment: (segment: keyof CanvasData | null) => void;
}

// Defining context with proper type
export const ManagedUI = createContext<ManagedUIContextType | undefined>(undefined);

// Context Wrapper
export function ManagedUIProvider({ children }: { children: ReactNode }) {
    const [openTimerModal, setOpenTimerModal] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openBrainstormModal, setOpenBrainstormModal] = useState(false);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [segmentKey, setSegmentKey] = useState<keyof CanvasData | null>(null);
    const [focusedSegment, setFocusedSegment] = useState<keyof CanvasData | null>(null);

    return (
        <ManagedUI.Provider
            value={{
                openTimerModal,
                setOpenTimerModal,
                openNoteModal,
                setOpenNoteModal,
                openBrainstormModal,
                setOpenBrainstormModal,
                currentNote,
                setCurrentNote,
                segmentKey,
                setSegmentKey,
                openImportModal,
                setOpenImportModal,
                focusedSegment,
                setFocusedSegment: (segment: keyof CanvasData | null) => setFocusedSegment(segment),
            }}
        >
            {children}
        </ManagedUI.Provider>
    );
}