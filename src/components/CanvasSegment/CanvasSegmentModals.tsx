import React from "react";
import ConfirmModal from "@components/modals/ConfirmModal";
import QuestionsModal from "./QuestionsModal";
import NoteModal from "@/components/modals/NoteModal";
import { Note } from "@/types/NoteList";
import { useDictionary } from "@/contexts/CanvasUI";

interface CanvasSegmentModalsProps {
  showQuestions: boolean;
  onCloseQuestions: () => void;
  confirmDeleteId: string | null;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => void;
  segmentQuestions: { nl: string[]; en: string[] };
  openNoteModal: boolean;
  onCloseNoteModal: () => void;
  currentNote: Note | null;
  onSaveNote: (note: Note) => void;
}

const CanvasSegmentModals: React.FC<CanvasSegmentModalsProps> = ({
  showQuestions,
  onCloseQuestions,
  confirmDeleteId,
  onCancelDelete,
  onConfirmDelete,
  segmentQuestions,
  openNoteModal,
  onCloseNoteModal,
  currentNote,
  onSaveNote,
}) => {
  const langMatch = typeof window !== "undefined" ? window.location.pathname.match(/^\/(nl|en-US)\//) : null;
  const lang = langMatch ? langMatch[1] : "en-US";

  const questions =
    lang === "nl" && segmentQuestions.nl.length > 0
      ? segmentQuestions.nl
      : segmentQuestions.en;

  const dictionary = useDictionary();



  return (
    <>
      {showQuestions && (
        <QuestionsModal
          onClose={onCloseQuestions}
          questions={questions}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          onConfirm={() => onConfirmDelete(confirmDeleteId)}
          onCancel={onCancelDelete}
          message={dictionary?.ui.confirmMessage || "Are you sure you want to delete this note?"}
        />
      )}

      {openNoteModal && (
        <NoteModal
          onClose={onCloseNoteModal}
          onSave={onSaveNote}
          title={currentNote ? (dictionary?.notes.editNote || "Edit note") : (dictionary?.notes.addNote || "Add note")}
          note={currentNote || undefined}
          guidingQuestions={questions}
        />
      )}
    </>
  );
};

export default CanvasSegmentModals;
