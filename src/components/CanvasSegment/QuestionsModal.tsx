import React, { useContext } from "react";
import Modal from "../ui/DefaultModal";
import { CanvasUI } from "@/contexts/CanvasUI";

interface QuestionsModalProps {
  onClose: () => void;
  questions: string[];
  title?: string;
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
  onClose,
  questions,
  title = "Guiding Questions",
}) => {
  const canvasUI = useContext(CanvasUI);
  const {
    language } = canvasUI || {};

  if (!questions || questions.length === 0) return null;

  console.log("QuestionsModal", JSON.stringify(language));
  return (

    <Modal onClose={onClose} title={title}>
      <ul className="list-disc pl-5 space-y-2">
        {questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </Modal>
  );
};

export default QuestionsModal;