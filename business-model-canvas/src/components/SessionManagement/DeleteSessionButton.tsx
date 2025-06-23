import React, { useState } from "react";
import Button from "../ui/Button";
import { Trash2 as DeleteIcon } from "react-feather";

interface DeleteSessionButtonProps {
    onDelete: () => void;
    sessionName: string;
    disabled?: boolean;
}

const DeleteSessionButton: React.FC<DeleteSessionButtonProps> = ({
    onDelete,
    sessionName,
    disabled = false,
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        onDelete();
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={handleDeleteClick}
                disabled={disabled}
                style={{
                    color: "#d32f2f",
                    border: "1px solid #d32f2f",
                    background: "transparent",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    cursor: disabled ? "not-allowed" : "pointer",
                    textTransform: "none",
                    opacity: disabled ? 0.5 : 1,
                    gap: "8px"
                }}
                aria-label={sessionName ? `Delete "${sessionName}"` : "Delete Session"}
            >
                <DeleteIcon size={18} />
                {sessionName
                    ? `Delete "${sessionName}"`
                    : "Delete Session"}
            </button>
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-[1000]"
                >
                    <div
                        className="p-6 border rounded-lg min-w-[300px] shadow-lg flex flex-col gap-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-session-modal-title"
                    >
                        <div id="delete-session-modal-title" className="font-bold">
                            Are you sure you want to delete {sessionName ? `"${sessionName}"` : "this session"}?
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={handleCancel}
                                text="Cancel" backgroundColor={""}                            />
                            <Button
                                onClick={handleConfirm}
                                text="Delete"
                                backgroundColor="#d32f2f"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteSessionButton;