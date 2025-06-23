import React from "react";
import Modal from "./DefaultModal";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure you want to proceed?",
}) => (
  <Modal open={open} onClose={onClose} title={title}>
    <div>
      <p>{message}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          onClick={onConfirm}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;