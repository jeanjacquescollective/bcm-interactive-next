"use client";

import React, { useEffect, useRef, useState } from "react";
import { Note } from "@/types/NoteList";
import CloseButton from "../ui/CloseButton";
import colors from "@/data/colors.json";
import { useCanvasDataContext } from "@/contexts/CanvasData";
import { useDictionary } from "@/contexts/CanvasUI";

type BrainstormModalProps = {
    onClose: () => void;
};

const BrainstormModal: React.FC<BrainstormModalProps> = ({ onClose }) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const titleRef = useRef<HTMLInputElement>(null);

    const { canvasData, saveSession } = useCanvasDataContext();
    const brainstormData = canvasData.brainStormArea?.items ?? [];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        titleRef.current?.focus();
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handlePost = async () => {
        if (inputTitle.trim() === "") return;

        const newNote: Note = {
            id: Date.now().toString(),
            title: inputTitle.trim(),
            description: inputDescription.trim(),
            color: selectedColor.hex,
        };

        const updatedData = {
            ...canvasData,
            brainStormArea: {
                ...canvasData.brainStormArea,
                items: [...brainstormData, newNote],
            },
        };

        await saveSession(updatedData);

        setInputTitle("");
        setInputDescription("");
        titleRef.current?.focus();
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handlePost();
    };

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handlePost();
        }
    };

    const getColorHex = (colorObj: typeof colors[0] | { light: string; dark: string }) => {
        const hex = "hex" in colorObj ? colorObj.hex : colorObj;
        const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
        return isDark ? hex.dark : hex.light;
    };

    const dictionary = useDictionary();

    return (
        <div className="fixed z-[1000] inset-0 bg-black/70 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-900 rounded-lg w-[90vw] h-[90vh] flex flex-col relative shadow-2xl transition-colors">
                {/* Close Button */}
                <CloseButton onClose={onClose} className="absolute top-4 right-4" />

                {/* Header */}
                <div className="px-8 pt-6 pb-4 border-b border-zinc-200 dark:border-zinc-700 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Brainstorm
                </div>

                {/* Main brainstorm area */}
                <div className="flex flex-1 flex-row p-8 gap-8 overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors">
                    {/* Post Area */}
                    <form className="flex-1 flex flex-col" onSubmit={handleFormSubmit}>
                        <div className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">{dictionary.brainstorm.addIdea}</div>
                        <input
                            ref={titleRef}
                            type="text"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                            placeholder= {dictionary.placeholders.title || "Title"}
                            className="p-3 text-base rounded border border-zinc-300 dark:border-zinc-700 mb-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors"
                        />
                        <textarea
                            value={inputDescription}
                            onChange={(e) => setInputDescription(e.target.value)}
                            placeholder= {dictionary.placeholders.description || "Description" }
                            className="p-3 text-base rounded border border-zinc-300 dark:border-zinc-700 mb-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors resize-none min-h-[60px]"
                            onKeyDown={handleTextareaKeyDown}
                        />
                        <div className="flex items-center gap-2 mb-3">
                            {colors.map((c) => (
                                <button
                                    key={c.key}
                                    type="button"
                                    className={`w-6 h-6 rounded-full border-2 ${selectedColor.key === c.key ? "border-blue-600 dark:border-blue-400" : "border-transparent"}`}
                                    style={{ background: getColorHex(c) }}
                                    onClick={() => setSelectedColor(c)}
                                    aria-label={`Select color ${c.name}`}
                                    title={c.description}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="self-start px-5 py-2 text-base rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors"
                        >
                            {dictionary.brainstorm.postIdea}
                        </button>
                    </form>

                    {/* Overview Area */}
                    <div className="flex-2 flex flex-col overflow-y-auto bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 min-h-0 transition-colors">
                        <div className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">{dictionary.brainstorm.ideasTitle}</div>
                        {brainstormData.length === 0 ? (
                            <div className="text-zinc-400 dark:text-zinc-500">{dictionary.brainstorm.noIdeas}</div>
                        ) : (
                            <ul className="list-none p-0 m-0">
                                {brainstormData.slice().reverse().map((item) => (
                                    <li
                                        key={item.id}
                                        className="rounded p-3 mb-2 shadow-sm text-base flex flex-col gap-1"
                                        style={{
                                            background: typeof item.color === "object" ? getColorHex(item.color) : item.color,
                                            color: typeof window !== "undefined" && document.documentElement.classList.contains("dark")
                                                ? "#f4f4f5"
                                                : "#18181b",
                                        }}
                                    >
                                        <span className="font-semibold">{item.title}</span>
                                        {item.description && <span className="text-sm">{item.description}</span>}
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
