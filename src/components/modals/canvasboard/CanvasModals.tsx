"use client";
import React, { useContext } from "react";
import { CanvasUI, useDictionary } from "@/contexts/CanvasUI";
import NoteModal from "../NoteModal";
import { Note } from "@/types/NoteList";

interface ModalsProps {
  addNoteHandler?: (note: Omit<Note, "id">) => void;
}

const CanvasModals: React.FC<ModalsProps> = ({ addNoteHandler }) => {
  const canvasUI = useContext(CanvasUI);
  const dictionary = useDictionary();

  if (!canvasUI || !canvasUI.openNoteModal) return null;
  const { currentNote, setOpenNoteModal, setCurrentNote } = canvasUI;

  const handleSave = (data: Note) => {
    setOpenNoteModal(false);
    addNoteHandler?.(data);
  };

  const handleCancel = () => {
    setCurrentNote(null);
    setOpenNoteModal(false);
  };

  // Ensure dictionary values are strings
  const editNoteTitle = dictionary.notes.editNote || "Edit note";
  const addNoteTitle = dictionary.notes.addNote || "Add note";

  return (
    <NoteModal
      onClose={handleCancel}
      onSave={handleSave}
      title={currentNote ? editNoteTitle : addNoteTitle}
      note={currentNote || undefined}
    />
  );
};

export default CanvasModals;
