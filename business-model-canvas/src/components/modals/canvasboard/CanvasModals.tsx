"use client";
import React, { useContext } from 'react';
import { CanvasUI } from "@/contexts/CanvasUI";
import NoteModal from './NoteModal';
import { Note } from '@/types/CanvasSegment/NoteList';

interface ModalsProps {
    addNoteHandler?: (note: Omit<Note, "id">) => void;
}

const CanvasModals: React.FC<ModalsProps> = ({ addNoteHandler }) => {
    const canvasUI = useContext(CanvasUI);

    if (!canvasUI || !canvasUI.openNoteModal) return null;

    const { currentNote, setOpenNoteModal, setCurrentNote } = canvasUI;

    const handleSave = (data: Omit<Note, "id">) => {
        console.log("Saving note:", data);
        setOpenNoteModal(false);
        addNoteHandler?.(data);
    };

    const handleCancel = () => {
        setCurrentNote(null);
        setOpenNoteModal(false);
    };

    return (
        <NoteModal
            onClose={handleCancel}
            onSave={handleSave}
            title={currentNote ? "Edit Note" : "Add Note"}
            noteTitle={currentNote?.title || ""}
            noteDescription={currentNote?.description || ""}
            noteColor={currentNote?.color || { light: "#ffffff", dark: "#000000" }}
        />
    );
};

export default CanvasModals;
