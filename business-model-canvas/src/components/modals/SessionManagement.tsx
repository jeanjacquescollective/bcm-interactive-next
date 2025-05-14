import React, { useState } from "react";

const SessionManagement: React.FC = () => {
    const [newCanvasName, setNewCanvasName] = useState("");
    const [canvases, setCanvases] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateCanvas = () => {
        if (newCanvasName.trim()) {
            setCanvases([...canvases, newCanvasName.trim()]);
            setNewCanvasName("");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Manage Canvases
            </button>

            {isModalOpen && (
                <div
                    id="sessions-modal"
                    className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Manage Canvases</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Create New Canvas
                            </label>
                            <div className="flex">
                                <input
                                    id="new-session-name"
                                    type="text"
                                    placeholder="Canvas Name"
                                    value={newCanvasName}
                                    onChange={(e) => setNewCanvasName(e.target.value)}
                                    className="flex-grow border rounded-l px-3 py-2"
                                />
                                <button
                                    id="create-session-btn"
                                    onClick={handleCreateCanvas}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r"
                                >
                                    Create
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Canvases
                            </label>
                            <div
                                id="sessions-list"
                                className="max-h-60 overflow-y-auto border rounded"
                            >
                                {canvases.length > 0 ? (
                                    canvases.map((canvas, index) => (
                                        <div
                                            key={index}
                                            className="p-2 border-b last:border-b-0"
                                        >
                                            {canvas}
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-2 text-gray-500">No canvases available.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                id="close-sessions-btn"
                                onClick={handleCloseModal}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SessionManagement;</div>