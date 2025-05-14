import React, { useState } from 'react';

interface CanvasSegmentProps {
    title: string;
    guideText: string;
    exampleQuestions: string[];
}

const CanvasSegment: React.FC<CanvasSegmentProps> = ({ title, guideText, exampleQuestions }) => {
    const [isGuideVisible, setIsGuideVisible] = useState(false);
    const [notes, setNotes] = useState<string[]>([]);

    const toggleGuideVisibility = () => {
        setIsGuideVisible(!isGuideVisible);
    };

    const addNote = () => {
        setNotes([...notes, '']);
    };

    const handleNoteChange = (index: number, value: string) => {
        const updatedNotes = [...notes];
        updatedNotes[index] = value;
        setNotes(updatedNotes);
    };

    return (
        <div className="canvas-section" id={title.toLowerCase()} data-section={title.toLowerCase()}>
            <div className="bg-white rounded-lg shadow p-3 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="section-title text-gray-700">{title}</h3>
                <button
                className="help-icon text-gray-500 hover:text-blue-500"
                data-section={title.toLowerCase()}
                onClick={toggleGuideVisibility}
                >
                <i data-feather="help-circle" className="w-4 h-4"></i>
                </button>
            </div>
            {isGuideVisible && (
                <div
                className="help-text mb-3 p-2 bg-blue-50 rounded text-xs text-gray-700"
                id={`help-${title.toLowerCase()}`}
                >
                <p className="font-semibold mb-1">Example questions:</p>
                <ul className="list-disc pl-4">
                    {exampleQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                    ))}
                </ul>
                </div>
            )}
            <div
                className="notes-container flex-grow overflow-y-auto"
                id={`notes-${title.toLowerCase()}`}
            >
                {/* Notes will be added here dynamically */}
            </div>
            <button
                className="add-note-btn mt-2 text-blue-500 hover:text-blue-700 text-sm flex items-center"
                data-section={title.toLowerCase()}
                onClick={() => {
                // Open the modal noteEditor.jsx here
                console.log('Open note editor modal');
                }}
            >
                <i data-feather="plus-circle" className="w-4 h-4 mr-1"></i> Add note
            </button>
            </div>
        </div>
    );
};

export default CanvasSegment;