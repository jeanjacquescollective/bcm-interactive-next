"use client";
import React, { useState } from "react";
import { Clock, Activity, Share2, Download, Upload, EyeOff, Globe } from "react-feather";
import CreateSessionButton from "../SessionManagement/CreateSessionButton";
import * as Icon from 'react-feather';
import ColorSchemeToggle from "../ui/ColorSchemeToggle";

type HeaderProps = { manageCanvasesText: string; helpText: string };

const onHandleCreateSession = (name: string) => {
    console.log("Create session button clicked");
};

const Sidebar = (props: HeaderProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 h-screen w-72 bg-gray-900 text-white shadow-2xl z-40 transform transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-70"
                } flex flex-col`}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-gray-800 bg-gray-950">
                    <span className="text-xl font-semibold tracking-wide">Menu</span>
                    <CreateSessionButton onCreate={onHandleCreateSession} />
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col justify-between">
                    <ul className="space-y-1 px-4 py-6">
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Clock className="w-5 h-5 mr-3" />
                                <span>Timer</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Activity className="w-5 h-5 mr-3" />
                                <span>Brainstorm</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Share2 className="w-5 h-5 mr-3" />
                                <span>Share</span>
                            </button>
                        </li>
                        {/* Export Dropdown */}
                        <li className="relative group">
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Download className="w-5 h-5 mr-3" />
                                <span>Export</span>
                            </button>
                            <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition min-w-[100px] z-50">
                                <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">PDF</button>
                                <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">JPG</button>
                                <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">CSV</button>
                                <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">JSON</button>
                            </div>
                        </li>
                        {/* Import Dropdown */}
                        <li className="relative group">
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Upload className="w-5 h-5 mr-3" />
                                <span>Import</span>
                            </button>
                            <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition min-w-[100px] z-50">
                                <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">CSV</button>
                                <button className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded">JSON</button>
                            </div>
                        </li>
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <EyeOff className="w-5 h-5 mr-3" />
                                <span>Focus Mode</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                                <Globe className="w-5 h-5 mr-3" />
                                <span>Language</span>
                            </button>
                        </li>
                        <li>
                            <button
                                id="manage-canvases-btn"
                                className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                <Icon.Layers className="w-5 h-5 mr-3" />
                                <span>{props.manageCanvasesText}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                id="help-btn"
                                className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                <Icon.HelpCircle className="w-5 h-5 mr-3" />
                                <span>{props.helpText}</span>
                            </button>
                        </li>
                        <li className=" px-3 py-2">
                        <ColorSchemeToggle />
                        </li>
                    </ul>
                   
                </nav>

                {/* Toggle Button */}
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="absolute right-[-24px] top-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-800 transition z-50 border-2 border-gray-800"
                    aria-label={open ? "Close sidebar" : "Open sidebar"}
                    style={{ outline: "none" }}
                >
                    {open ? (
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
