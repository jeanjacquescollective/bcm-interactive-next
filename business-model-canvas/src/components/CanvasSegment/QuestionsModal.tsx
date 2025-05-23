import React from "react";
import Modal from "./Modal";

interface QuestionsModalProps {
  open: boolean;
  onClose: () => void;
  questions: string[];
  title?: string;
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
  open,
  onClose,
  questions,
  title = "Guiding Questions",
}) => (
  <Modal open={open} onClose={onClose} title={title}>
    <ul className="list-disc pl-5 space-y-2">
      {questions.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>
  </Modal>
);

export default QuestionsModal;