"use client";
import { Note } from "@/types/CanvasSegment/NoteList";
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
}

// Defining context with proper type
export const ManagedUI = createContext<ManagedUIContextType | undefined>(undefined);

// Context Wrapper
export function ManagedUIProvider({ children }: { children: ReactNode }) {
    const [openTimerModal, setOpenTimerModal] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openBrainstormModal, setOpenBrainstormModal] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    
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
            }}
        >
            {children}
        </ManagedUI.Provider>
    );
}