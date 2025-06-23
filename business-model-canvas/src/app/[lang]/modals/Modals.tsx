"use client";
import React, { useState } from 'react';
import HelpModal from './Help';

// Example modal components
import { ManagedUI } from "@/contexts/ManagedUI";
import TimerModal from './TimerModal';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import NoteModal from './NoteModal';


const Modals: React.FC = () => {
    const managedUI = React.useContext(ManagedUI);
    const { openTimerModal, setOpenTimerModal } = managedUI || {};
    const { openBrainstormModal, setOpenBrainstormModal } = managedUI || {};
    const { openNoteModal, setOpenNoteModal } = managedUI || {};
    const [position, setPosition] = useState({ x: 100, y: 100 });

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

    const onSaveNote = (title: string, description: string, color: string) => {
        // if (managedUI && managedUI.setCurrentNote) {
        //     managedUI.setCurrentNote({
        //         title,
        //         description,
        //         color,
        //     });
        // }
        // closeModal();
        
        closeModal();
    }

    const onCancelNote = () => {
        // if (managedUI && managedUI.setCurrentNote) {
        //     managedUI.setCurrentNote(null);
        // }
        closeModal();
    }





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
        {openNoteModal && (<NoteModal onClose={closeModal} open={true} onSave={() => onSaveNote('', '', '')} title={'Add Note'} noteTitle={''} setNoteTitle={function (v: string): void {
                throw new Error('Function not implemented.');
            } } noteDescription={''} setNoteDescription={function (v: string): void {
                throw new Error('Function not implemented.');
            } } noteColor={''} setNoteColor={function (v: string): void {
                throw new Error('Function not implemented.');
            } } colors={[]} />)}   
        </>
    );
};

export default Modals;