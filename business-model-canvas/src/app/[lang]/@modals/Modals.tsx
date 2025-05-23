import React from 'react';
import HelpModal from './Help';
import NoteEditor from './NoteEditor';
import SessionManagement from './SessionManagement';
// Example modal components

interface ModalsProps {
    activeModal: string | null;
    closeModal: () => void;
}

const Modals: React.FC<ModalsProps> = ({ activeModal, closeModal }) => {
    return (
        <>
            {activeModal === 'helpModal' && (
            <HelpModal onClose={closeModal} />
            )}
            {activeModal === 'noteEditor' && (
            <NoteEditor onClose={closeModal} />
            )}
            {activeModal === 'sessionManagement' && (
            <SessionManagement onClose={closeModal} />
            )}
        </>
    );
};

export default Modals;