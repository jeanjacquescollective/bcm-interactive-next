import React from 'react';

interface ButtonProps {
    backgroundColor: string;
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ backgroundColor, text, onClick }) => (
    <button
        onClick={onClick}
        style={{
            backgroundColor,
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '0.5rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'background 0.2s',
        }}
    >
        {text}
    </button>
);

export default Button;