import React from "react";
import { Clock, Activity, Share2, Download, Upload, EyeOff, Globe } from "react-feather";

// Sidebar is a server component
const Sidebar = () => {
    return (
        <aside
            id="sidebar"
            className=" bg-gray-800 text-white shadow-lg z-40 flex flex-col col-span-1 row-start-2"
        >
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <h2 className="text-lg font-bold">Menu</h2>
            {/* Add Canvas Button */}
            <button
            className="flex items-center px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
            // onClick={openAddCanvasModal} // Implement in client component
            >
            <span className="mr-1">+</span>
            <span className="text-sm">Canvas</span>
            </button>
            </div>
            <ul className="flex-1 space-y-2 p-4">
            {/* Timer */}
            <li className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <button
            className="hover:underline"
            // onClick={openTimerModal} // Implement in client component
            >
            Timer
            </button>
            </li>
            {/* Brainstorm */}
            <li className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <button
            className="hover:underline"
            // onClick={openBrainstormModal} // Implement in client component
            >
            Brainstorm
            </button>
            </li>
            {/* Share */}
            <li className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <button
            className="hover:underline"
            // onClick={generateShareUrl} // Implement in client component
            >
            Share
            </button>
            </li>
            {/* Export */}
            <li className="flex items-center space-x-2 group relative">
            <Download className="w-5 h-5" />
            <button className="hover:underline">Export</button>
            {/* Export Options */}
            <div className="absolute left-full top-0 ml-2 bg-gray-700 rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
            <button className="block px-2 py-1 hover:bg-gray-600 w-full text-left">PDF</button>
            <button className="block px-2 py-1 hover:bg-gray-600 w-full text-left">JPG</button>
            <button className="block px-2 py-1 hover:bg-gray-600 w-full text-left">CSV</button>
            <button className="block px-2 py-1 hover:bg-gray-600 w-full text-left">JSON</button>
            </div>
            </li>
            {/* Import */}
            <li className="flex items-center space-x-2 group relative">
            <Upload className="w-5 h-5" />
            <button className="hover:underline">Import</button>
            {/* Import Options */}
            <div className="absolute left-full top-0 ml-2 bg-gray-700 rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
            <button className="block px-2 py-1 hover:bg-gray-600 w-full text-left">CSV</button>
            <button className="block px-2 py-1 hover:bg-gray-600 w-full text-left">JSON</button>
            </div>
            </li>
            {/* Focus Mode */}
            <li className="flex items-center space-x-2">
            <EyeOff className="w-5 h-5" />
            <button
            className="hover:underline"
            // onClick={toggleFocusMode} // Implement in client component
            >
            Focus Mode
            </button>
            </li>
            {/* Language */}
            <li className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <button
            className="hover:underline"
            // onClick={openLanguageModal} // Implement in client component
            >
            Language
            </button>
            </li>
            </ul>
        </aside>
    );
};

export default Sidebar;