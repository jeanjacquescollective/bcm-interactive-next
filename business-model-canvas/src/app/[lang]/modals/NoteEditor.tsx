import React, { useState } from "react";

interface NoteEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: { text: string; color: string }) => void;
}

const NoteEditor: React.FC<NoteEditorModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [noteText, setNoteText] = useState("");
    const [selectedColor, setSelectedColor] = useState("#FFEB3B");

    const handleSave = () => {
        if (noteText.trim()) {
            onSave({ text: noteText, color: selectedColor });
            setNoteText("");
            setSelectedColor("#FFEB3B");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="note-editor-modal"
            className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 id="note-editor-title" className="text-xl font-bold mb-4">
                    Add Note
                </h2>
                <textarea
                    id="note-text"
                    className="w-full p-3 border rounded mb-4"
                    rows={5}
                    placeholder="Enter your note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <div className="flex space-x-2 mb-4">
                    <span className="text-sm">Color:</span>
                    <div className="flex space-x-2">
                        {["#FFEB3B", "#81C784", "#90CAF9", "#F48FB1", "#CE93D8"].map(
                            (color) => (
                                <button
                                    key={color}
                                    className={`note-color-btn w-6 h-6 rounded-full ${
                                        selectedColor === color ? "ring-2 ring-black" : ""
                                    }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                ></button>
                            )
                        )}
                    </div>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        id="note-cancel-btn"
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        id="note-save-btn"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;