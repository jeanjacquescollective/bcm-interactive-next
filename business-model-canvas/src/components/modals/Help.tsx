import React from 'react';

const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            id="help-modal"
            className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Business Model Canvas Help</h2>

                <div className="mb-4">
                    <h3 className="font-bold mb-2">What is a Business Model Canvas?</h3>
                    <p className="mb-2">
                        The Business Model Canvas is a strategic management template for
                        developing new or documenting existing business models. It is a
                        visual chart with elements describing a firm's value proposition,
                        infrastructure, customers, and finances.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold mb-2">How to use this tool:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Add notes to each section by clicking the "Add note" button.</li>
                        <li>Drag and drop notes between sections to reorganize your ideas.</li>
                        <li>Click the help icon in each section for guiding questions.</li>
                        <li>Your work is automatically saved in your browser.</li>
                        <li>Create multiple canvases for different business ideas or iterations.</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold mb-2">The 9 Building Blocks:</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>
                            <strong>Key Partners:</strong> Who are your key partners and suppliers?
                        </li>
                        <li>
                            <strong>Key Activities:</strong> What key activities does your value proposition require?
                        </li>
                        <li>
                            <strong>Key Resources:</strong> What key resources does your value proposition require?
                        </li>
                        <li>
                            <strong>Value Propositions:</strong> What value do you deliver to customers?
                        </li>
                        <li>
                            <strong>Customer Relationships:</strong> What type of relationship do you establish with customers?
                        </li>
                        <li>
                            <strong>Channels:</strong> How do you reach your customers?
                        </li>
                        <li>
                            <strong>Customer Segments:</strong> Who are you creating value for?
                        </li>
                        <li>
                            <strong>Cost Structure:</strong> What are the most important costs in your business model?
                        </li>
                        <li>
                            <strong>Revenue Streams:</strong> How does your business earn revenue from your value propositions?
                        </li>
                    </ol>
                </div>

                <div className="flex justify-end">
                    <button
                        id="close-help-btn"
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;