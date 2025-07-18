import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandle from "@/components/ui/DragHandle";
import { NoteItemProps } from "@/types/NoteList";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowUp, Edit, Trash2 } from "react-feather";

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  expandedNoteIds,
  onExpand,
  onEdit,
  onDelete,
}) => {
  const { theme } = useTheme();
  const isExpanded = typeof note.id === "string" && expandedNoteIds.includes(note.id);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: note.id });



  const style = useMemo<React.CSSProperties>(() => {
    const bgColor =
      typeof note.color === "object"
        ? theme === "dark"
          ? note.color.dark
          : note.color.light
        : note.color;

    return {
      background: bgColor,
      boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.5)" : "0 1px 4px rgba(0,0,0,0.3)",
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
      marginBottom: 8,
      padding: 12,
      borderRadius: 8,
    };
  }, [note.color, isDragging, transform, transition, theme]);

  const textColorClass = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`flex items-start rounded-md mb-3 ${textColorClass} note-item`}
      data-testid={`note-item-${note.id}`}
      
    >
      <DragHandle listeners={listeners}  />

      {note.description && (
        <button
          onClick={() => onExpand(note.id)}
          aria-label={isExpanded ? "Collapse note" : "Expand note"}
          type="button"
          className="mr-2 mt-0.5 bg-transparent border-0 text-base"
        >
          {isExpanded ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
        </button>
      )}

      <div className="flex-1">
        <div className="font-medium">{note.title}</div>
        {isExpanded && <div className="mt-1">{note.description}</div>}
      </div>

      <button
        onClick={() => onEdit(note)}
        title="Edit"
        type="button"
        aria-label="Edit note"
        className="ml-2 bg-transparent border-0 text-base"
      >
        <Edit size={18} />
      </button>

      <button
        onClick={() => onDelete(note.id)}
        title="Delete"
        type="button"
        aria-label="Delete note"
        className="ml-2 bg-transparent border-0 text-red-600 dark:text-red-300 text-base"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default NoteItem;
