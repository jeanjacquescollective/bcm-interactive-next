"use client";
import { Note } from "@/types/NoteList";
import { CanvasData } from "@/types/CanvasSession";
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the context type
interface CanvasUIContextType {

    currentNote: Note | null;
    setCurrentNote: Dispatch<SetStateAction<Note | null>>;
    segmentKey: keyof CanvasData | null;
    setSegmentKey: (k: keyof CanvasData | null) => void;
    openNoteModal: boolean;
    setOpenNoteModal: Dispatch<SetStateAction<boolean>>;
    isDraggable: boolean;
    setIsDraggable: (value: boolean) => void;

}

// Defining context with proper type
export const CanvasUI = createContext<CanvasUIContextType | undefined>(undefined);

// Context Wrapper
export function CanvasUIProvider({ children }: { children: ReactNode }) {
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [segmentKey, setSegmentKey] = useState<keyof CanvasData | null>(null);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [isDraggable, setIsDraggable] = useState(false);

    return (
        <CanvasUI.Provider
            value={{
                currentNote,
                setCurrentNote,
                segmentKey,
                setSegmentKey,
                openNoteModal,
                setOpenNoteModal,
                isDraggable,
                setIsDraggable: (value: boolean) => setIsDraggable(value),
              
               
            }}
        >
            {children}
        </CanvasUI.Provider>
    );
}