// components/Tooltip.tsx
import React from "react";

type TooltipProps = {
    text: string;
    children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    return (
        <div className="relative inline-block group cursor-pointer">
            {children}
            <span className="tooltip-text absolute left-full top-1/2 ml-2 w-32 bg-gray-700 text-white text-center text-xs rounded px-2 py-1 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 select-none -translate-y-1/2 z-10">
                {text}
            </span>
            <style jsx>{`
                .tooltip-text::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    margin-left: -10px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: transparent #4a5568 transparent transparent; /* gray-700 */
                }
            `}</style>
        </div>
    );
};

export default Tooltip;
