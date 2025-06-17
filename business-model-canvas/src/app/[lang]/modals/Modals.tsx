"use client";
import React, { useState } from 'react';
import HelpModal from './Help';
import NoteEditor from './NoteEditor';

// Example modal components
import { ManagedUI } from "@/contexts/ManagedUI";
import TimerModal from './TimerModal';
import { DndContext, DragEndEvent } from '@dnd-kit/core';


const Modals: React.FC = () => {
    const managedUI = React.useContext(ManagedUI);
    const { openTimerModal, setOpenTimerModal } = managedUI || {};
    const [position, setPosition] = useState({ x: 100, y: 100 });

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.active.id === "timer-modal" && event.delta) {
            setPosition((prev) => ({
                x: prev.x + event.delta.x,
                y: prev.y + event.delta.y,
            }));
        }
    };
    return (
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
    );
};

export default Modals;