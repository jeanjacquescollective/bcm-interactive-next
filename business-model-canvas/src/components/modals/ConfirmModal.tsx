import React from "react";
import Modal from "@/components/ui/DefaultModal";

interface ConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onCancel,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure you want to proceed?",
}) => {
  if (!open) return null;

  return (
    <Modal onClose={onCancel} title={title}>
      <p>{message}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          onClick={onConfirm}
          type="button"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;