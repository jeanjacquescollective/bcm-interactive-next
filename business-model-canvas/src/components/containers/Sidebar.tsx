"use client";
import React, { useState } from "react";
import { Activity, Share2, Download, Upload, EyeOff, Globe } from "react-feather";
import CreateSessionButton from "../SessionManagement/CreateSessionButton";
import * as Icon from 'react-feather';
import ColorSchemeToggle from "../ui/ColorSchemeToggle";
import TimerButton from "../ui/TimerButton";

type HeaderProps = { manageCanvasesText: string; helpText: string };

const onHandleCreateSession = (name: string) => {
    console.log("Create session button clicked");
};

const onLanguageChange = () => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/nl")) {
        window.location.pathname = currentPath.replace(/^\/nl/, "/en");
    } else if (currentPath.startsWith("/en")) {
        window.location.pathname = currentPath.replace(/^\/en/, "/nl");
    } else {
        // Default to /en if not matched
        window.location.pathname = "/en" + currentPath;
    }
};


const Sidebar = (props: HeaderProps) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <>
            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 h-screen w-20 ${sideBarOpen ? "w-72" : "w-20"} bg-gray-900 text-white shadow-2xl z-40 transform transition-all duration-300 flex flex-col`}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-gray-800 bg-gray-950">
                    <span className={`text-xl font-semibold tracking-wide transition-opacity duration-200 ${sideBarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>Menu</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col justify-between">
                    <ul className="space-y-1 px-2 py-6">
                        <li>
                            <div className="flex items-center">
                                <TimerButton sideBarOpen={sideBarOpen}/>
                                {/* TimerButton should handle its own label visibility if needed */}
                            </div>
                        </li>
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Activity className="w-5 h-5 mr-0" />
                                <span className={`ml-3 transition-all duration-200 ${sideBarOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"}`}>Brainstorm</span>
                            </button>
                        </li>
                        {/* Export Dropdown */}
                        <li className="relative group">
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Download className="w-5 h-5 mr-0" />
                                <span className={`ml-3 transition-all duration-200 ${sideBarOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"}`}>Export</span>
                            </button>
                            {sideBarOpen && (
                                <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 min-w-[100px] z-50">
                                    <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">PDF</button>
                                    <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">JPG</button>
                                    <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">CSV</button>
                                    <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">JSON</button>
                                </div>
                            )}
                        </li>
                        {/* Import Dropdown */}
                        <li className="relative group">
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Upload className="w-5 h-5 mr-0" />
                                <span className={`ml-3 transition-all duration-200 ${sideBarOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"}`}>Import</span>
                            </button>
                            {sideBarOpen && (
                                <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 min-w-[100px] z-50">
                                    <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">CSV</button>
                                    <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">JSON</button>
                                </div>
                            )}
                        </li>
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <EyeOff className="w-5 h-5 mr-0" />
                                <span className={`ml-3 transition-all duration-200 ${sideBarOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"}`}>Focus Mode</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                                onClick={onLanguageChange}>
                                <Globe className="w-5 h-5 mr-0" />
                                <span className={`ml-3 transition-all duration-200 ${sideBarOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"}`}>
                                    {typeof window !== "undefined" && window.location.pathname.startsWith("/nl")
                                        ? "English"
                                        : "Nederlands"}
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                id="help-btn"
                                className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                <Icon.HelpCircle className="w-5 h-5 mr-0" />
                                <span className={`ml-3 transition-all duration-200 ${sideBarOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"}`}>{props.helpText}</span>
                            </button>
                        </li>
                        <li className="px-3 py-2">
                            <ColorSchemeToggle sideBarOpen={sideBarOpen}/>
                        </li>
                    </ul>
                </nav>

                {/* Toggle Button */}
                <button
                    onClick={() => setSideBarOpen((prev) => !prev)}
                    className="absolute right-[-24px] top-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-800 transition z-50 border-2 border-gray-800"
                    aria-label={sideBarOpen ? "Close sidebar" : "Open sidebar"}
                    style={{ outline: "none" }}
                >
                    {sideBarOpen ? (
                        <span aria-hidden="true">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </span>
                    ) : (
                        <span aria-hidden="true">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </span>
                    )}
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
