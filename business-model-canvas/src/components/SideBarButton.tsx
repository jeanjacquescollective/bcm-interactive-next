"use client";
import React, { useState } from 'react';

const SideBarButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const toggleIcon = document.getElementById('toggle-icon');

        if (sidebar) {
            sidebar.classList.toggle('-translate-x-full');
        }

        if (toggleIcon) {
            toggleIcon.textContent = isOpen ? '>' : '<';
        }

        setIsOpen(!isOpen);
    };

    return (
        <button
            id="sidebar-toggle"
            onClick={toggleSidebar}
            className={`fixed top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-2'
            }`}
        >
            <span id="toggle-icon" className="text-lg">
                {isOpen ? '<' : '>'}
            </span>
        </button>
    );
};

export default SideBarButton;