// components/ui/ConfirmModal.tsx
import React from "react";
import Modal from "@/components/ui/DefaultModal";
import { useDictionary } from "@/contexts/CanvasUI";

interface ConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onCancel,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure you want to proceed?",
}) => {
  const dictionary = useDictionary();

  return (
    <Modal onClose={onCancel} title={title || dictionary?.ui.confirmTitle || "Are you sure?"}>
      <p>{message || dictionary?.ui.confirmMessage || "Are you sure you want to proceed?"}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={onCancel}
          type="button"
        >
          {dictionary?.ui.cancelText || "Cancel"}
        </button>
        <button
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          onClick={onConfirm}
          type="button"
        >
          {dictionary?.ui.deleteText || "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
