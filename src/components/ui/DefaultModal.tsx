import React from "react";
import CloseButton from "./CloseButton";
import ReactDOM from "react-dom";
interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return ReactDOM.createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative pointer-events-auto">
        <div className="flex items-start justify-between mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <CloseButton onClose={onClose} />
        </div>

        {children}
      </div>
    </div>
  , document.body);
};

export default Modal;