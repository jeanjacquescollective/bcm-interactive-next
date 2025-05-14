import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div
            id="sidebar"
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform -translate-x-full transition-transform duration-300"
        >
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Menu</h2>
                <ul className="space-y-4">
                    <li className="flex items-center space-x-2">
                        <i data-feather="clock" className="w-5 h-5"></i>
                        <a href="#" className="hover:underline">
                            Timer
                        </a>
                    </li>
                    <li className="flex items-center space-x-2">
                        <i data-feather="activity" className="w-5 h-5"></i>
                        <a href="#" className="hover:underline">
                            Brainstorm
                        </a>
                    </li>
                    <li className="flex items-center space-x-2">
                        <i data-feather="share-2" className="w-5 h-5"></i>
                        <a href="#" className="hover:underline">
                            Share
                        </a>
                    </li>
                    <li className="flex items-center space-x-2">
                        <i data-feather="download" className="w-5 h-5"></i>
                        <a href="#" className="hover:underline">
                            Export
                        </a>
                    </li>
                    <li className="flex items-center space-x-2">
                        <i data-feather="eye-off" className="w-5 h-5"></i>
                        <a href="#" className="hover:underline">
                            Focus Mode
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;