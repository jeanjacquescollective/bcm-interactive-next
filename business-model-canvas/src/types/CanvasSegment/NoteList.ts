export type Note = {
  id: string;
  title: string;
  description: string;
  color: { light: string; dark: string }; // Color can be an object or a string
};

export interface NoteListProps {
  notes: Note[];
  expandedNoteIds: string[];
  onExpand: (id: string) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  segmentKey: string; // Assuming segmentKey is a string identifier for the segment
    onSortEnd: (newOrder: Note[]) => void;  // new prop
}

export interface NoteItemProps {
  note: Note;
  expandedNoteIds: string[];
  onExpand: (id: string ) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  segmentKey: string; // Assuming segmentKey is a string identifier for the segment
}