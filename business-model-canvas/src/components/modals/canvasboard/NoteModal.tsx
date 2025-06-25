import React, { useEffect, useState, useMemo } from "react";
import Modal from "@/components/modals/DefaultModal";
import { Note } from "@/types/CanvasSegment/NoteList";
import colors from "@/data/colors.json";

interface NoteModalProps {
  onClose: () => void;
  onSave: (data: Omit<Note, "id">) => void;
  title: string;
  noteTitle?: string;
  noteDescription?: string;
  noteColor?: { light: string; dark: string };
  disabled?: boolean;
}

const NoteModal: React.FC<NoteModalProps> = ({
  onClose,
  onSave,
  title,
  noteTitle = "",
  noteDescription = "",
  noteColor,
  disabled = false,
}) => {
  // Detect dark mode once
  const isDarkMode = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  // Default to first color if no noteColor passed
  const defaultColor = colors[0].hex;

  // Local state for form inputs
  const [currentNoteTitle, setCurrentNoteTitle] = useState(noteTitle);
  const [currentNoteDescription, setCurrentNoteDescription] = useState(noteDescription);
  const [currentNoteColor, setCurrentNoteColor] = useState<{ light: string; dark: string }>(
    noteColor || defaultColor
  );

  // Update local state if props change
  useEffect(() => {
    setCurrentNoteTitle(noteTitle);
  }, [noteTitle]);

  useEffect(() => {
    setCurrentNoteDescription(noteDescription);
  }, [noteDescription]);

  useEffect(() => {
    setCurrentNoteColor(noteColor || defaultColor);
  }, [noteColor]);

  // Handle color select button click
  const handleColorSelect = (color: { light: string; dark: string }) => {
    setCurrentNoteColor(color);
  };

  // Save handler
  const handleSave = () => {
    if (
      !currentNoteTitle.trim() &&
      !currentNoteDescription.trim()
    ) return; // safeguard

    onSave({
      title: currentNoteTitle.trim(),
      description: currentNoteDescription.trim(),
      color: currentNoteColor,
    });
  };

  // Determine if save button should be disabled
  const isSaveDisabled =
    disabled || (!currentNoteTitle.trim() && !currentNoteDescription.trim());

  return (
    <Modal onClose={onClose} title={title}>
      <div className="space-y-3">
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Title"
          value={currentNoteTitle}
          onChange={(e) => setCurrentNoteTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="w-full border rounded px-2 py-1"
          placeholder="Description"
          value={currentNoteDescription}
          onChange={(e) => setCurrentNoteDescription(e.target.value)}
          rows={3}
        />
        <div className="flex gap-2 items-center">
          <span>Color:</span>
          {colors.map((color) => {
            const colorHex = isDarkMode ? color.hex.dark : color.hex.light;
            const isSelected =
              currentNoteColor.light === color.hex.light &&
              currentNoteColor.dark === color.hex.dark;
            return (
              <button
                key={color.name}
                type="button"
                aria-label={`Select color ${color.name}`}
                className={`w-6 h-6 rounded-full border-2 ${
                  isSelected ? "border-black dark:border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: colorHex }}
                onClick={() => handleColorSelect(color.hex)}
              />
            );
          })}
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
            className={`px-3 py-1 rounded text-white ${
              isSaveDisabled
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSave}
            type="button"
            disabled={isSaveDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteModal;
