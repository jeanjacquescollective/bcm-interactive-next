import React from "react";

import { Note, NoteListProps } from "@/types/CanvasSegment/NoteList";

const NoteList: React.FC<NoteListProps> = ({
  notes,
  expandedNoteIds,
  onExpand,
  onEdit,
  onDelete,
}) => {
    if (notes.length === 0 || !notes) {
        return (
            <div className="text-gray-500 italic py-4 text-center">No notes</div>
        );
    }
    return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-md p-3 mb-3 flex items-start dark:shadow dark:border dark:border-gray-700"
          style={{
            background: note.color,
            color: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          <button
            className="mr-2 mt-0.5 border-0 bg-transparent cursor-pointer text-base"
            onClick={() => onExpand(note.id)}
            aria-label="Expand/collapse"
            type="button"
          >
            {expandedNoteIds.includes(note.id) ? "▼" : "▶"}
          </button>
          <div className="flex-1">
            <div className="font-medium">{note.title}</div>
            {expandedNoteIds.includes(note.id) && (
              <div className="mt-1">{note.description}</div>
            )}
          </div>
          <button
            className="ml-2 border-0 bg-transparent cursor-pointer text-base"
            title="Edit"
            onClick={() => onEdit(note)}
            type="button"
          >
            ✎
          </button>
          <button
            className="ml-1 border-0 bg-transparent cursor-pointer text-red-500 text-base"
            title="Delete"
            onClick={() => onDelete(note.id)}
            type="button"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;