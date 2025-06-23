import React from 'react';

interface ButtonProps {
    backgroundColor: string;
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ backgroundColor, text, onClick }) => (
    <button
        onClick={onClick}
        className={`bg-[${backgroundColor}] text-white border-none rounded-full px-6 py-2 cursor-pointer text-base font-medium transition-colors duration-200`}
    >
        {text}
    </button>
);

export default Button;