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
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: "24px",
                            borderRadius: "8px",
                            minWidth: "300px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-session-modal-title"
                    >
                        <div id="delete-session-modal-title" style={{ fontWeight: "bold" }}>
                            Are you sure you want to delete {sessionName ? `"${sessionName}"` : "this session"}?
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                            <Button
                                onClick={handleCancel}
                                backgroundColor="#bdbdbd"
                                text="Cancel"
                            />
                            <Button
                                onClick={handleConfirm}
                                backgroundColor="#d32f2f"
                                text="Delete"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteSessionButton;