import React from "react";
import Modal from "./Modal";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  noteTitle: string;
  setNoteTitle: (v: string) => void;
  noteDescription: string;
  setNoteDescription: (v: string) => void;
  noteColor: string;
  setNoteColor: (v: string) => void;
  colors: string[];
  disabled?: boolean;
}

const NoteModal: React.FC<NoteModalProps> = ({
  open,
  onClose,
  onSave,
  title,
  noteTitle,
  setNoteTitle,
  noteDescription,
  setNoteDescription,
  noteColor,
  setNoteColor,
  colors,
  disabled,
}) => (
  <Modal open={open} onClose={onClose} title={title}>
    <div className="space-y-3">
      <input
        className="w-full border rounded px-2 py-1"
        placeholder="Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded px-2 py-1"
        placeholder="Description"
        value={noteDescription}
        onChange={(e) => setNoteDescription(e.target.value)}
        rows={3}
      />
      <div className="flex gap-2 items-center">
        <span>Color:</span>
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 ${noteColor === color ? "border-black" : "border-transparent"}`}
            style={{ background: color }}
            onClick={() => setNoteColor(color)}
            type="button"
          />
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={onSave}
          type="button"
          disabled={disabled}
        >
          Save
        </button>
      </div>
    </div>
  </Modal>
);

export default NoteModal;