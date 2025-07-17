import React from "react";
import ConfirmModal from "@components/modals/ConfirmModal";
import QuestionsModal from "./QuestionsModal";

interface CanvasSegmentModalsProps {
  showQuestions: boolean;
  onCloseQuestions: () => void;
  confirmDeleteId: string | null;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => void;
  segmentQuestions: string[];
}

const CanvasSegmentModals: React.FC<CanvasSegmentModalsProps> = ({
  showQuestions,
  onCloseQuestions,
  confirmDeleteId,
  onCancelDelete,
  onConfirmDelete,
  segmentQuestions
}) => {
  return (
    <>
      {showQuestions && (
        <QuestionsModal
          isOpen={showQuestions}
          onClose={onCloseQuestions}
          questions={segmentQuestions}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          open={!!confirmDeleteId}
          onConfirm={() => onConfirmDelete(confirmDeleteId)}
          onCancel={onCancelDelete}
          message="Are you sure you want to delete this note?"
        />
      )}
    </>
  );
};

export default CanvasSegmentModals;
