import React from "react";
import ConfirmModal from "@components/modals/ConfirmModal";
import QuestionsModal from "./QuestionsModal";

interface CanvasSegmentModalsProps {
  showQuestions: boolean;
  onCloseQuestions: () => void;
  confirmDeleteId: string | null;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => void;
  segmentQuestions: { nl: string[]; en: string[] };
}

const CanvasSegmentModals: React.FC<CanvasSegmentModalsProps> = ({
  showQuestions,
  onCloseQuestions,
  confirmDeleteId,
  onCancelDelete,
  onConfirmDelete,
  segmentQuestions
}) => {
  // console.log(segmentQuestions);
  if (!segmentQuestions || segmentQuestions.nl.length === 0) {
    return null; // No questions to display
  }
  // Assuming params is available in this context, but in a React component, you can't use 'await' directly.
  // If you want to get the language from props or context, do it synchronously.
  // For demonstration, let's assume 'lang' is passed as a prop or derived synchronously:

  // Get language from URL path (e.g., /nl/ or /en/)
  const langMatch = typeof window !== "undefined" ? window.location.pathname.match(/^\/(nl|en)\//) : null;
  const lang = langMatch ? langMatch[1] : "en";

  const questions =
    lang === "nl" && segmentQuestions.nl.length > 0
      ? segmentQuestions.nl
      : segmentQuestions.en;
  return (
    <>
      {showQuestions && (
        <QuestionsModal
          onClose={onCloseQuestions}
          questions={questions}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          
          onConfirm={() => onConfirmDelete(confirmDeleteId)}
          onCancel={onCancelDelete}
          message="Are you sure you want to delete this note?"
        />
      )}
    </>
  );
};

export default CanvasSegmentModals;
