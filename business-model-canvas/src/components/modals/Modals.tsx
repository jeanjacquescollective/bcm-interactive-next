"use client";
import React, { useState } from 'react';
import HelpModal from './Help';

// Example modal components
import { ManagedUI } from "@/contexts/ManagedUI";
import TimerModal from './TimerModal';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import NoteModal from './canvasboard/NoteModal';
import { Note } from '@/types/CanvasSegment/NoteList';


const Modals: React.FC = () => {
    const managedUI = React.useContext(ManagedUI);
    const { openTimerModal, setOpenTimerModal } = managedUI || {};
    const { openBrainstormModal, setOpenBrainstormModal } = managedUI || {};
    const { openNoteModal, setOpenNoteModal } = managedUI || {};
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const currentNote = managedUI?.currentNote || null;

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.active.id === "timer-modal" && event.delta) {
            setPosition((prev) => ({
                x: prev.x + event.delta.x,
                y: prev.y + event.delta.y,
            }));
        }
    };

    const closeModal = () => {
        if (managedUI) {
            managedUI.setOpenTimerModal(false);
            managedUI.setOpenBrainstormModal(false);
            managedUI.setOpenNoteModal(false);
        }
    };





    if (!managedUI) {
        return null; // or handle the case where ManagedUI is not available
    }
    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                {/* {activeModal === 'helpModal' && (
            <HelpModal onClose={closeModal} />
            )}
            {activeModal === 'noteEditor' && (
            <NoteEditor onClose={closeModal} />
            )} */}
                {openTimerModal && (
                    <TimerModal
                        onClose={() => setOpenTimerModal && setOpenTimerModal(false)} position={position}
                    />
                )}
            </DndContext>
           
        </>
    );
};

export default Modals;