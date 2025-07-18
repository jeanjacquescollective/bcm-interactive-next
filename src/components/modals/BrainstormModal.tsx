"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SessionService } from "@/lib/services/sessionService";
import { localStorageProvider } from "@/lib/storage/client/localStorage";
import { EMPTY_SESSION } from "@/lib/actions/sessionActions";
import { Note } from "@/types/NoteList";
import CloseButton from "../ui/CloseButton";
import colors from "@/data/colors.json";
import { CanvasSession } from "@/types/CanvasSession";
type BrainstormModalProps = {
    onClose: () => void;
};

const sessionService = new SessionService(localStorageProvider);

const BrainstormModal: React.FC<BrainstormModalProps> = ({ onClose }) => {
    const [sessions, setSessions] = useState<CanvasSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [brainstormData, setBrainstormData] = useState<Note[]>([]);
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef<HTMLInputElement>(null);

    // Load sessions and select current
    const initializeSessions = useCallback(async () => {
        let loadedSessions = await sessionService.getAll();
        if (loadedSessions.length === 0) {
            const defaultSession = await sessionService.add("default brainstorm");
            loadedSessions = defaultSession;
        }
        setSessions(loadedSessions);

        const urlSessionId = new URL(window.location.href).searchParams.get("sessionId");
        const session = urlSessionId
            ? loadedSessions.find((s) => s.id?.toString() === urlSessionId)
            : loadedSessions[0];

        if (session) {
            setSelectedSessionId(session.id?.toString() ?? null);
            setBrainstormData(session.data?.brainStormArea?.items ?? []);
        } else {
            setSelectedSessionId(EMPTY_SESSION.id?.toString() ?? null);
            setBrainstormData([]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        initializeSessions();
    }, [initializeSessions]);

    useEffect(() => {
        const session = sessions.find((s) => s.id?.toString() === selectedSessionId);
        if (session) {
            setBrainstormData(session.data?.brainStormArea?.items ?? []);
        }
    }, [selectedSessionId, sessions]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        titleRef.current?.focus();
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Add brainstorm item and persist
    const addBrainstormItem = async (title: string, description: string) => {
        if (!selectedSessionId || !title.trim()) return;
        const newItem: Note = {
            id: Math.random().toString(36).slice(2, 11),
            title: title.trim(),
            description: description.trim(),
            color: selectedColor.hex,
        };
        const updatedItems = [...brainstormData, newItem];
        setBrainstormData(updatedItems);
        const prevData = sessions.find(s => s.id?.toString() === selectedSessionId)?.data;
        if (!prevData) return;
        await sessionService.update(selectedSessionId, {
            data: {
                ...prevData,
                brainStormArea: {
                    items: updatedItems,
                    questions: [],
                    key: "brainStormArea"
                },
                keyPartners: prevData.keyPartners,
                keyActivities: prevData.keyActivities,
                keyResources: prevData.keyResources,
                valuePropositions: prevData.valuePropositions,
                customerRelationships: prevData.customerRelationships,
                channels: prevData.channels,
                customerSegments: prevData.customerSegments,
                costStructure: prevData.costStructure,
                revenueStreams: prevData.revenueStreams
            }
        });
    };

    const handlePost = async () => {
        if (inputTitle.trim() === "") return;
        await addBrainstormItem(inputTitle, inputDescription);
        setInputTitle("");
        setInputDescription("");
        titleRef.current?.focus();
    };

    const getColorHex = (colorObj: typeof colors[0] | { light: string; dark: string }) => {
        // Accepts either a full color object or just a hex object
        let hexObj: { light: string; dark: string };
        if ("hex" in colorObj && typeof colorObj.hex === "object") {
            hexObj = colorObj.hex;
        } else if ("light" in colorObj && "dark" in colorObj) {
            hexObj = colorObj as { light: string; dark: string };
        } else {
            // fallback to default color
            hexObj = { light: "#fff", dark: "#27272a" };
        }
        if (typeof window !== "undefined" && document.documentElement.classList.contains("dark")) {
            return hexObj.dark;
        }
        return hexObj.light;
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="fixed z-[1000] inset-0 bg-black/70 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-900 rounded-lg w-[90vw] h-[90vh] flex flex-col relative shadow-2xl transition-colors">
                {/* Close Button */}
                <CloseButton onClose={onClose} className="absolute top-4 right-4" />
                {/* Header */}
                <div className="px-8 pt-6 pb-4 border-b border-zinc-200 dark:border-zinc-700 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Brainstorm
                </div>
                {/* Toolbar-like area */}
                <div className="flex flex-row items-center px-8 py-4 border-b border-zinc-200 dark:border-zinc-700 gap-4 bg-zinc-50 dark:bg-zinc-800 transition-colors">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Session:</div>
                    <select
                        value={selectedSessionId ?? ""}
                        onChange={e => setSelectedSessionId(e.target.value)}
                        className="rounded border px-2 py-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 transition-colors"
                    >
                        {sessions.map(s => (
                            <option key={s.id?.toString() ?? ""} value={s.id?.toString() ?? ""}>{s.name}</option>
                        ))}
                    </select>
                </div>
                {/* Main brainstorm area */}
                <div className="flex flex-1 flex-row p-8 gap-8 overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors">
                    {/* Post Area */}
                    <div className="flex-1 flex flex-col">
                        <div className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">Add Idea</div>
                        <input
                            ref={titleRef}
                            type="text"
                            value={inputTitle}
                            onChange={e => setInputTitle(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handlePost(); }}
                            placeholder="Title"
                            className="p-3 text-base rounded border border-zinc-300 dark:border-zinc-700 mb-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors"
                        />
                        <textarea
                            value={inputDescription}
                            onChange={e => setInputDescription(e.target.value)}
                            placeholder="Description (optional)"
                            className="p-3 text-base rounded border border-zinc-300 dark:border-zinc-700 mb-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors resize-none min-h-[60px]"
                        />
                        <div className="flex items-center gap-2 mb-3">
                            {colors.map((c) => (
                                <button
                                    key={c.key}
                                    type="button"
                                    className={`w-6 h-6 rounded-full border-2 ${selectedColor.key === c.key ? "border-blue-600 dark:border-blue-400" : "border-transparent"}`}
                                    style={{
                                        background: getColorHex(c),
                                        borderColor: selectedColor.key === c.key
                                            ? (typeof window !== "undefined" && document.documentElement.classList.contains('dark') ? '#60a5fa' : '#2563eb')
                                            : 'transparent'
                                    }}
                                    onClick={() => setSelectedColor(c)}
                                    aria-label={`Select color ${c.name}`}
                                    title={c.description}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handlePost}
                            className="self-start px-5 py-2 text-base rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors"
                        >
                            Post
                        </button>
                    </div>
                    {/* Overview Area */}
                    <div className="flex-2 flex flex-col overflow-y-auto bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 min-h-0 transition-colors">
                        <div className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">Brainstorm Overview</div>
                        {brainstormData.length === 0 ? (
                            <div className="text-zinc-400 dark:text-zinc-500">No ideas yet.</div>
                        ) : (
                            <ul className="list-none p-0 m-0">
                                {brainstormData.slice().reverse().map(item => (
                                    <li
                                        key={item.id}
                                        className="rounded p-3 mb-2 shadow-sm text-base flex flex-col gap-1"
                                        style={{
                                            background: typeof item.color === "object"
                                                ? getColorHex(item.color)
                                                : (typeof window !== "undefined" && document.documentElement.classList.contains('dark') ? "#27272a" : "#fff"),
                                            color: (typeof window !== "undefined" && document.documentElement.classList.contains('dark')) ? "#f4f4f5" : "#18181b"
                                        }}
                                    >
                                        <span className="font-semibold">{item.title}</span>
                                        {item.description && (
                                            <span className="text-sm">{item.description}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrainstormModal;
