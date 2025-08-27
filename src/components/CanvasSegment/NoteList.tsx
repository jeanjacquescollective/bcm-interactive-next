import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDictionary } from "@/contexts/CanvasUI";
import NoteItem from "./NoteItem";
import { NoteListProps } from "@/types/NoteList";

const NoteList: React.FC<NoteListProps> = ({
  notes,
  expandedNoteIds,
  onExpand,
  onEdit,
  onDelete,
  segmentKey,
}) => {
  const dictionary = useDictionary();

  if (!notes?.length) {
    return (
      <div className="text-gray-500 italic py-4 text-center">
        {dictionary?.notes.noNotes ?? "No notes"}
      </div>
    );
  }

  if (notes.some(note => typeof note.id !== "string")) {
    return (
      <div className="text-red-500 italic py-4 text-center">
        Error: One or more notes have an invalid id.
      </div>
    );
  }

  const validNoteIds = notes.map(note => note.id as string);

  return (
    <SortableContext items={validNoteIds} strategy={verticalListSortingStrategy}>
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          expandedNoteIds={expandedNoteIds}
          onExpand={onExpand}
          onEdit={onEdit}
          onDelete={onDelete}
          segmentKey={segmentKey}
        />
      ))}
    </SortableContext>
  );
};

export default NoteList;
