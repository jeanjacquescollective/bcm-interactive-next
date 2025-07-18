"use client";

import React, { useRef } from "react";
import { Upload } from "react-feather";
import CloseButton from "../ui/CloseButton";
import { CanvasSession } from "@/types/CanvasSession";
import { toast } from "sonner";
import { SessionService } from "@/lib/services/sessionService";
import { localStorageProvider } from "@/lib/storage/client/localStorage";

type Props = {
    onClose: () => void;
    onImport: (session: CanvasSession) => void;
};
const { addWithData } = new SessionService(localStorageProvider);

// Improved CSV parser for the provided layout
const parseCSV = (csv: string): CanvasSession | undefined => {
    const lines = csv.split(/\r?\n/).filter(Boolean);

    // Parse session metadata
    const session: Partial<CanvasSession> = {};
    const data: CanvasSession["data"] = {
        keyPartners: { items: [], questions: [], key: "keyPartners" },
        keyActivities: { items: [], questions: [], key: "keyActivities" },
        keyResources: { items: [], questions: [], key: "keyResources" },
        valuePropositions: { items: [], questions: [], key: "valuePropositions" },
        customerRelationships: { items: [], questions: [], key: "customerRelationships" },
        channels: { items: [], questions: [], key: "channels" },
        customerSegments: { items: [], questions: [], key: "customerSegments" },
        costStructure: { items: [], questions: [], key: "costStructure" },
        revenueStreams: { items: [], questions: [], key: "revenueStreams" },
        brainStormArea: { items: [], questions: [], key: "brainStormArea" },
    };

    // Find header row
    const headerIdx = lines.findIndex(l => l.trim().startsWith("area,"));
    if (headerIdx === -1) return undefined;

    // Parse metadata before header
    for (let i = 0; i < headerIdx; i++) {
        const [key, ...rest] = lines[i].split(",");
        // Remove trailing commas and whitespace
        const value = rest.join(",").replace(/,+$/, "").trim();
        if (key === "session_id") session.id = value;
        if (key === "session_title") session.name = value;
        if (key === "session_last_saved") session.lastModified = value;
    }

    // Get header columns
    const header = lines[headerIdx].split(",");
    const areaIdx = header.indexOf("area");
    const idIdx = header.indexOf("id");
    const titleIdx = header.indexOf("title");
    const descriptionIdx = header.indexOf("description");
    const colorDarkIdx = header.indexOf("color_dark");
    const colorLightIdx = header.indexOf("color_light");

    // Parse CSV rows after header
    for (let i = headerIdx + 1; i < lines.length; i++) {
        // Split CSV line, handling quoted values
        const row: string[] = [];
        let current = "";
        let inQuotes = false;
        for (let charIdx = 0; charIdx < lines[i].length; charIdx++) {
            const char = lines[i][charIdx];
            if (char === '"') {
                if (inQuotes && lines[i][charIdx + 1] === '"') {
                    current += '"';
                    charIdx++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(current);
                current = "";
            } else {
                current += char;
            }
        }
        row.push(current);

        // Extract values by header index
        const area = row[areaIdx]?.replace(/^"|"$/g, "").replace(/""/g, '"');
        const id = row[idIdx]?.replace(/^"|"$/g, "").replace(/""/g, '"');
        const title = row[titleIdx]?.replace(/^"|"$/g, "").replace(/""/g, '"').replace(/,+$/, "");
        const description = row[descriptionIdx]?.replace(/^"|"$/g, "").replace(/""/g, '"');
        const colorDark = colorDarkIdx !== -1 ? row[colorDarkIdx]?.replace(/^"|"$/g, "").replace(/""/g, '"') : "";
        const colorLight = colorLightIdx !== -1 ? row[colorLightIdx]?.replace(/^"|"$/g, "").replace(/""/g, '"') : "";

        if (!area || !id) continue;
        if (!data[area as keyof typeof data]) continue;
        data[area as keyof typeof data].items.push({
            id,
            title: title || "",
            description: description || "",
            color: {
                dark: colorDark || "",
                light: colorLight || "",
            },
        });
    }
    session.data = data;
    session.created = new Date().toISOString();
    return session as CanvasSession;
};

const ImportModal: React.FC<Props> = ({ onClose, onImport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const ext = file.name.split(".").pop()?.toLowerCase();
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                let session: CanvasSession | null = null;
                if (ext === "json") {
                    const obj = JSON.parse(event.target?.result as string);
                    if (obj.session && obj.data) {
                        session = {
                            id: obj.session.id,
                            name: obj.session.title,
                            lastModified: obj.session.lastSaved,
                            data: obj.data,
                            created: obj.session.createdAt || new Date().toISOString(),
                        };
                    } else {
                        session = obj as CanvasSession;
                    }
                } else if (ext === "csv") {
                    session = parseCSV(event.target?.result as string) ?? null;
                }
                if (session) {
                    // console.log("Parsed session:", session);
                    const answer = await addWithData(session);
                    if (!answer) {
                        console.log("Imported session:", answer);
                        toast.error("Failed to create session.");
                        return;
                    }
                    toast.success("Import successful!");
                    onImport(session);
                    onClose();
                } else {
                    toast.error("Invalid file format.");
                }
            } catch (err) {
                toast.error("Failed to import file.");
                console.error("Import error:", err);
            }
        };

        if (ext === "json" || ext === "csv") {
            reader.readAsText(file);
        } else {
            toast.error("Unsupported file type.");
        }
        e.target.value = "";
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed z-[1000] inset-0 bg-black/70 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-900 rounded-lg min-w-[320px] w-[90vw] max-w-md flex flex-col relative shadow-2xl transition-colors p-8">
                <CloseButton onClose={onClose} className="absolute top-4 right-4" />
                <div className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <Upload className="w-5 h-5" />
                    Import Session
                </div>
                <p className="mb-4 text-gray-700 dark:text-zinc-300">
                    Import a session from a <b>.json</b> or <b>.csv</b> file exported from this app.
                </p>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2"
                    onClick={handleClick}
                    type="button"
                >
                    <Upload className="w-4 h-4" />
                    Choose File
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,.csv"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default ImportModal;
