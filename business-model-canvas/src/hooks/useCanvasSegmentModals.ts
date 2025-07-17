import { useState } from "react";

export function useCanvasSegmentModals() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return {
    showQuestions,
    setShowQuestions,
    confirmDeleteId,
    setConfirmDeleteId
  };
}
