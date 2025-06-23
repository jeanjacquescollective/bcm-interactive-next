import React, { useContext, useEffect, useState } from "react";
import NoteList from "./NoteList";
import { Note } from "@/types/CanvasSegment/NoteList";
import NoteModal from "../../app/[lang]/modals/NoteModal";
import ConfirmModal from "../ui/ConfirmModal";
import QuestionsModal from "./QuestionsModal";
import { CanvasData, CanvasSegmentData, SegmentItem } from "@/types/CanvasSession";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { ManagedUI } from "@/contexts/ManagedUI";

interface CanvasSegmentProps {
    segmentTitle: string;
    segmentData: CanvasSegmentData;
    COLORS: string[];
    handleSegmentChange: (segmentKey: keyof CanvasData, items: SegmentItem[], questions: string[]) => void;
}

const CanvasSegment: React.FC<CanvasSegmentProps> = ({
    segmentTitle,
    segmentData,
    COLORS,
    handleSegmentChange,
}) => {
        const managedUI = useContext(ManagedUI);
    
    const { items: segmentItems, questions: segmentQuestions } = segmentData || {
        items: [],
        questions: [],
    };
    // console.log("Segment data:", segmentData);
    if (!segmentData) {
        return <div className="text-center py-10">No data available</div>;
    }
    const [notes, setNotes] = useState<SegmentItem[]>(segmentData.items || []);
    const [expandedNoteIds, setExpandedNoteIds] = useState<number[]>([]);
    const [showQuestions, setShowQuestions] = useState(false);
    const [editNote, setEditNote] = useState<Note | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: segmentData.key });
    console.log(`${segmentData.key} isOver:`, isOver);
    // Note form state
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    const [noteColor, setNoteColor] = useState(COLORS[0]);

    useEffect(() => {
        setNotes(segmentItems); // re-sync when parent changes
    }, [segmentItems]);
    // Handlers
    const handleExpand = (id: number) => {
        setExpandedNoteIds((ids) =>
            ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
        );
    };

    const handleEdit = (note: Note) => {
        setEditNote(note);
        setNoteTitle(note.title);
        setNoteDescription(note.description);
        setNoteColor(note.color);
        managedUI?.setCurrentNote(note);
        console.log("Editing note:", note);
        managedUI?.setOpenNoteModal(true);
    };

    const handleDelete = (id: number) => {
        const updatedNotes = notes.filter((n) => n.id !== id);
        setNotes(updatedNotes);
        handleSegmentChange(segmentData.key as keyof CanvasData, updatedNotes, segmentQuestions);
        setConfirmDeleteId(null);
    };

    const handleSaveNote = () => {
        let updatedNotes: SegmentItem[];
        if (editNote) {
            updatedNotes = notes.map((n) =>
                n.id === editNote.id
                    ? { ...n, title: noteTitle, description: noteDescription, color: noteColor }
                    : n
            );
        } else {
            updatedNotes = [
                ...notes,
                {
                    id: Date.now(),
                    title: noteTitle,
                    description: noteDescription,
                    color: noteColor,
                },
            ];
        }
        setNotes(updatedNotes);
        console.log("Updated notes:", segmentData);
        handleSegmentChange(segmentData.key as keyof CanvasData, updatedNotes, segmentQuestions);
        resetNoteForm();
    };


    function resetNoteForm() {
        setEditNote(null);
        setNoteTitle("");
        setNoteDescription("");
        setNoteColor(COLORS[0]);
    }
    const handleSortEnd = (newNotes: SegmentItem[]) => {
        setNotes(newNotes);
        handleSegmentChange(segmentData.key as keyof CanvasData, newNotes, segmentQuestions);
    };

     const handleAddNote = () => {
        console.log("Note button clicked");
        if (managedUI) {
            managedUI.setCurrentNote(null); // Reset current note
            managedUI.setOpenNoteModal(true);
            console.log("Opening note modal");
        }
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 w-full h-full box-border flex flex-1 flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex items-center mb-4">
                <h2 className="flex-1 m-0 text-xl font-bold">{segmentTitle}</h2>
                <button
                    title="Show guiding questions"
                    className="border-0 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
                    onClick={() => setShowQuestions(true)}
                    type="button"
                >
                    ?
                </button>
            </div>
            <div ref={setDroppableRef} id={segmentData.key} className={`min-h-[100px] rounded transition-all ${isOver ? "bg-blue-100 dark:bg-blue-800" : ""
                }`}>
                {/* Notes Section */}
                <NoteList
                    notes={notes}
                    expandedNoteIds={expandedNoteIds}
                    onExpand={handleExpand}
                    onEdit={handleEdit}
                    onDelete={(id) => setConfirmDeleteId(id)}
                    segmentKey={segmentData.key}
                    onSortEnd={handleSortEnd}
                />
            </div>
            <QuestionsModal
                open={showQuestions}
                onClose={() => setShowQuestions(false)}
                questions={segmentQuestions}
            />

            {/* <NoteModal
                open={showNoteModal}
                onClose={() => {
                    setShowNoteModal(false);
                    resetNoteForm();
                }}
                onSave={handleSaveNote}
                title={editNote ? "Edit Note" : "Add Note"}
                noteTitle={noteTitle}
                setNoteTitle={setNoteTitle}
                noteDescription={noteDescription}
                setNoteDescription={setNoteDescription}
                noteColor={noteColor}
                setNoteColor={setNoteColor}
                colors={COLORS}
                disabled={!noteTitle.trim()}
            /> */}

            <ConfirmModal
                open={confirmDeleteId !== null}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={() => confirmDeleteId !== null && handleDelete(confirmDeleteId)}
                title="Delete Note"
                message="Are you sure you want to delete this note?"
            />

            {/* Add Note Button */}
            <button
                className="w-full mt-4 border border-dashed rounded px-3 py-2 cursor-pointer text-base border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                onClick={handleAddNote}
                type="button"
            >
                ＋ Add Note
            </button>
        </div>
    );
};


export default CanvasSegment;
