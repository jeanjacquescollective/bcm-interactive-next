import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandle from "@/components/ui/DragHandle";
import { NoteItemProps } from "@/types/CanvasSegment/NoteList";

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  expandedNoteIds,
  onExpand,
  onEdit,
  onDelete,
}) => {
  const isExpanded = expandedNoteIds.includes(note.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const style = useMemo<React.CSSProperties>(() => {
    const bgColor =
      typeof note.color === "object"
        ? window.matchMedia?.("(prefers-color-scheme: dark)").matches
          ? note.color.dark
          : note.color.light
        : note.color;

    return {
      background: bgColor,
      color: "#fff",
      boxShadow: isDragging
        ? "0 0 10px rgba(0,0,0,0.5)"
        : "0 1px 4px rgba(0,0,0,0.3)",
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
      marginBottom: 8,
      padding: 12,
      borderRadius: 8,
    };
  }, [note.color, isDragging, transform, transition]);

  const handleExpand = () => onExpand(note.id);
  const handleEdit = () => onEdit(note);
  const handleDelete = () => onDelete(note.id);

  return (
    <div
      className="rounded-md p-3 mb-3 flex items-start dark:shadow dark:border dark:border-gray-700"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <DragHandle listeners={listeners} />

      {note.description && (
        <button
          className="mr-2 mt-0.5 bg-transparent border-0 text-white text-base"
          onClick={handleExpand}
          aria-label={isExpanded ? "Collapse note" : "Expand note"}
          type="button"
        >
          {isExpanded ? "▼" : "▶"}
        </button>
      )}

      <div className="flex-1">
        <div className="font-medium">{note.title}</div>
        {isExpanded && <div className="mt-1">{note.description}</div>}
      </div>

      <button
        className="ml-2 bg-transparent border-0 text-white text-base"
        onClick={handleEdit}
        title="Edit"
        type="button"
        aria-label="Edit note"
      >
        ✎
      </button>
      <button
        className="ml-1 bg-transparent border-0 text-red-300 text-base"
        onClick={handleDelete}
        title="Delete"
        type="button"
        aria-label="Delete note"
      >
        🗑
      </button>
    </div>
  );
};

export default NoteItem;
