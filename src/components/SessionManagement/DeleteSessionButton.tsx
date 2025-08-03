// components/DeleteSessionButton.tsx
import React, { useContext } from "react";
import { Trash2 as DeleteIcon } from "react-feather";
import { useDictionary } from "@/contexts/CanvasUI";
import { ManagedUI } from "@/contexts/ManagedUI";

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
  const managedUI = useContext(ManagedUI);
  const dictionary = useDictionary();

  const handleDeleteClick = () => {
    if (!managedUI) return;

    managedUI.setConfirmTitle(dictionary?.ui.confirmTitle || "Are you sure?");
    managedUI.setConfirmMessage(
      sessionName
        ? `${dictionary?.sessions.sessionDeleteConfirm || "Delete"} "${sessionName}"?`
        : dictionary?.ui.confirmMessage || "Are you sure you want to proceed?"
    );
    managedUI.setConfirmCallback(() => onDelete);
    managedUI.setShowConfirmModal(true);
  };

  return (
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
        ? `${dictionary?.ui.deleteText || "Delete Session"} "${sessionName}"`
        : dictionary?.ui.deleteText || "Delete Session"}
    </button>
  );
};

export default DeleteSessionButton;
