import React from "react";

import { NoteListProps } from "@/types/NoteList";
import NoteItem from "./NoteItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
const NoteList: React.FC<NoteListProps> = ({
  notes,
  expandedNoteIds,
  onExpand,
  onEdit,
  onDelete,
  segmentKey,
}) => {

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;
  //   if (!over || active.id === over.id) return;

  //   const oldIndex = notes.findIndex(n => n.id === active.id);
  //   const newIndex = notes.findIndex(n => n.id === over.id);

  //   const newNotes = arrayMove(notes, oldIndex, newIndex);
  //   onSortEnd(newNotes);
  // };
    if (notes.length === 0 || !notes) {
        return (
            <div className="text-gray-500 italic py-4 text-center">No notes</div>
        );
    }
    if (notes.some((note) => typeof(note.id) !== "string")) {
      return (
        <div className="text-red-500 italic py-4 text-center">
          Error: One or more notes have an invalid id.
        </div>
      );
    }

    return (
    <SortableContext
      items={notes.filter((note) => note.id !== undefined).map((note) => note.id as string)}
      strategy={verticalListSortingStrategy}
    >
      {notes.map((note) => (
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