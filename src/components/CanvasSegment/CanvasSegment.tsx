import React, { use, useContext, useEffect, useState } from "react";
import NoteList from "./NoteList";
import { Note } from "@/types/NoteList";
import { CanvasData, CanvasSegmentData } from "@/types/CanvasSession";
import { useDroppable } from "@dnd-kit/core";
import { CanvasUI, useDictionary } from "@/contexts/CanvasUI";
import CanvasSegmentModals from "./CanvasSegmentModals";
import { useCanvasSegmentModals } from "@/hooks/useCanvasSegmentModals";

interface CanvasSegmentProps {
  segmentTitle: string;
  segmentData: CanvasSegmentData;
  handleSegmentChange: (segmentKey: keyof CanvasData, items: Note[], questions: { nl: string[]; en: string[] }) => void;
  extraClasses?: string;
}

const CanvasSegment: React.FC<CanvasSegmentProps> = ({
  segmentTitle,
  segmentData,
  handleSegmentChange,
}) => {
  const canvasUI = useContext(CanvasUI);
  const {
    showQuestions,
    setShowQuestions,
    confirmDeleteId,
    setConfirmDeleteId
  } = useCanvasSegmentModals();

  const { items: segmentItems, questions: segmentQuestions } = segmentData || {
    items: [],
    questions: [],
  };

  const [notes, setNotes] = useState<Note[]>(segmentItems || []);
  const [expandedNoteIds, setExpandedNoteIds] = useState<string[]>([]);

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: segmentData.key });

  useEffect(() => {
    setNotes(segmentItems); // re-sync when parent changes
  }, [segmentItems]);

  const handleExpand = (id: string) => {
    setExpandedNoteIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };

  const handleEdit = (note: Note) => {
    canvasUI?.setCurrentNote(note);
    canvasUI?.setSegmentKey(segmentData.key as keyof CanvasData);
    canvasUI?.setOpenNoteModal(true);
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    handleSegmentChange(segmentData.key as keyof CanvasData, updatedNotes, segmentQuestions);
    setConfirmDeleteId(null);
  };

  const handleSortEnd = (newNotes: Note[]) => {
    setNotes(newNotes);
    handleSegmentChange(segmentData.key as keyof CanvasData, newNotes, segmentQuestions);
  };

  const handleAddNote = () => {
    canvasUI?.setCurrentNote(null);
    canvasUI?.setSegmentKey(segmentData.key as keyof CanvasData);
    canvasUI?.setOpenNoteModal(true);
  };

  const dictionary = useDictionary();

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 w-full h-full box-border flex flex-1 flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100  ${extraClasses}" data-type="canvas-segment-inner">
      <div className="flex items-center mb-4">
        <h2 className="flex-1 m-0 text-xl font-bold">{segmentTitle}</h2>
        <button
          title="Show guiding questions"
          className="border-0 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
          onClick={() => setShowQuestions(true)}
          type="button"
        >
          ?
        </button>
      </div>

      <div
        ref={setDroppableRef}
        id={segmentData.key}
        className={`min-h-[100px] rounded transition-all ${isOver ? "bg-blue-100 dark:bg-blue-800" : ""}`}
      >
        <NoteList
          notes={notes}
          expandedNoteIds={expandedNoteIds}
          onExpand={handleExpand}
          onEdit={handleEdit}
          onDelete={(id) => setConfirmDeleteId(id)}
          segmentKey={segmentData.key}
          onSortEnd={handleSortEnd}
        />
      </div>

      <button
        className="w-full mt-4 border border-dashed rounded px-3 py-2 cursor-pointer text-base border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        onClick={handleAddNote}
        type="button"
      >
        ＋ {dictionary?.addNote || "Add Note"}
      </button>

      <CanvasSegmentModals
        showQuestions={showQuestions}
        onCloseQuestions={() => setShowQuestions(false)}
        confirmDeleteId={confirmDeleteId}
        onCancelDelete={() => setConfirmDeleteId(null)}
        onConfirmDelete={handleDelete}
        segmentQuestions={segmentQuestions}
      />
    </div>
  );
};

export default CanvasSegment;
