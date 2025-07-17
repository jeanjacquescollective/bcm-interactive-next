import React, { useEffect, useState, useMemo } from "react";
import Modal from "@/components/ui/DefaultModal";
import { Note } from "@/types/NoteList";
import colors from "@/data/colors.json";

interface NoteModalProps {
  onClose: () => void;
  onSave: (data: Note) => void;
  title: string;
  note?: Note;
  disabled?: boolean;
}

const NoteModal: React.FC<NoteModalProps> = ({
  onClose,
  onSave,
  title,
  note = undefined,
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
  console.log("Default color:", defaultColor);

  // Local state for form inputs
  const [currentNoteTitle, setCurrentNoteTitle] = useState(note?.title || "");
  const [currentNoteDescription, setCurrentNoteDescription] = useState(note?.description || "");
  const [currentNoteColor, setCurrentNoteColor] = useState<{ light: string; dark: string }>(
    () => note?.color || defaultColor
  );
  useEffect(() => {
    console.log("Initial currentNoteColor:", currentNoteColor);
  }, []);

  // Update local state if props change
  useEffect(() => {
    setCurrentNoteTitle(note?.title || "");
  }, [note?.title]);

  useEffect(() => {
    setCurrentNoteDescription(note?.description || "");
  }, [note?.description]);

  useEffect(() => {
    setCurrentNoteColor(note?.color || defaultColor);
  }, [note?.color]);

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
      id: note?.id || undefined, // Use existing ID or generate a new one
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
      <div className={`space-y-3 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {note?.id && (
          <input type="hidden" name="id" value={note.id} />
        )}
        <input
          className={`w-full border rounded px-2 py-1 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
          placeholder="Title"
          value={currentNoteTitle}
          onChange={(e) => setCurrentNoteTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className={`w-full border rounded px-2 py-1 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
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
                className={`w-6 h-6 rounded-full border-2 ${isSelected ? (isDarkMode ? "border-white" : "border-black") : "border-transparent"}`}
                style={{ backgroundColor: colorHex }}
                onClick={() => handleColorSelect(color.hex)}
              />
            );
          })}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className={`px-3 py-1 rounded ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-black"}`}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`px-3 py-1 rounded text-white ${isSaveDisabled
              ? (isDarkMode ? "bg-blue-900 cursor-not-allowed" : "bg-blue-300 cursor-not-allowed")
              : (isDarkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700")
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
