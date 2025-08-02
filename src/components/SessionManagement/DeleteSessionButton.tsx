import React, { useState } from "react";
import Button from "../ui/Button";
import { Trash2 as DeleteIcon } from "react-feather";
import { useDictionary } from "@/contexts/CanvasUI";

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

    const dictionary = useDictionary();

    return (
        <>
            <button
                onClick={handleDeleteClick}
                disabled={disabled}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded border
                    border-[#d32f2f] text-[#d32f2f] bg-transparent
                    text-base font-normal
                    transition-opacity
                    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#d32f2f]/10 cursor-pointer"}
                    dark:border-red-600 dark:text-red-400 dark:hover:bg-red-950
                `}
                aria-label={sessionName ? `${dictionary?.delete || "Delete Session"} "${sessionName}"` : "Delete Session"}
            >
                <DeleteIcon size={18} />
                {sessionName
                    ? `${dictionary?.delete || "Delete Session"} "${sessionName}"`
                    : dictionary?.delete || "Delete Session"}
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