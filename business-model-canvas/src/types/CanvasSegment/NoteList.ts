export type Note = {
  id: number;
  title: string;
  description: string;
  color: string;
};

export interface NoteListProps {
  notes: Note[];
  expandedNoteIds: number[];
  onExpand: (id: number) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  segmentKey: string; // Assuming segmentKey is a string identifier for the segment
    onSortEnd: (newOrder: Note[]) => void;  // new prop
}

export interface NoteItemProps {
  note: Note;
  expandedNoteIds: number[];
  onExpand: (id: number) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  segmentKey: string; // Assuming segmentKey is a string identifier for the segment
}