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
}