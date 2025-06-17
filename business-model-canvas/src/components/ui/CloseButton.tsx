import React from 'react';

interface CloseButtonProps {
    onClose: () => void;
    title?: string;
    className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({
    onClose,
    title = 'Close',
    className = '',
}) => (
    <div
        className={`absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-white text-3xl leading-none ${className}`}
        onClick={onClose}
        title={title}
        role="button"
        tabIndex={0}
        aria-label={title}
        onKeyPress={e => {
            if (e.key === 'Enter' || e.key === ' ') {
                onClose();
            }
        }}
    >
        ×
    </div>
);

export default CloseButton;