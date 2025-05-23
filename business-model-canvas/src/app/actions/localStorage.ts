"use client";
import { CanvasSession } from "@/types/CanvasSession";

// Local storage key
const STORAGE_KEY = "bmc_sessions";

// Helpers for localStorage (safe for Next.js client components)
function getLocalStorage() {
    return (typeof window !== "undefined" && window.localStorage) ? window.localStorage : null;
}

// Get a new empty session
function getEmptySession(): CanvasSession {
    const now = new Date().toISOString();
    return {
        id: Date.now(),
        name: "Untitled Canvas",
        created: now,
        lastModified: now,
        data: {
            keyActivities: { items: [], questions: [], key: "keyActivities" },
            keyPartners: { items: [], questions: [], key: "keyPartners" },
            keyResources: { items: [], questions: [], key: "keyResources" },
            valuePropositions: { items: [], questions: [], key: "valuePropositions" },
            customerRelationships: { items: [], questions: [], key: "customerRelationships" },
            channels: { items: [], questions: [], key: "channels" },
            customerSegments: { items: [], questions: [], key: "customerSegments" },
            costStructure: { items: [], questions: [], key: "costStructure" },
            revenueStreams: { items: [], questions: [], key: "revenueStreams" },
            brainStormArea: { items: [], questions: [], key: "brainStormArea" }
        },
    };
}

// Load sessions from localStorage
export function loadSessions(): CanvasSession[] {
    const localStorage = getLocalStorage();
    if (!localStorage) return [getEmptySession()];
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    console.log("savedSessions", savedSessions);
    if (savedSessions) {
        try {
            return JSON.parse(savedSessions) as CanvasSession[];
        } catch {
            return [getEmptySession()];
        }
    }
    return [getEmptySession()];
}

// Save sessions to localStorage
export function saveSessions(sessions: CanvasSession[]) {
    const localStorage = getLocalStorage();
    if (localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
}

// Create a new session
export function createNewSession(
    sessions: CanvasSession[],
    defaultName = "Untitled Canvas",
    getCanvasData: () => any
): CanvasSession[] {
    const now = new Date().toISOString();
    const newSession: CanvasSession = {
        id: Date.now(),
        name: defaultName,
        created: now,
        lastModified: now,
        data: getCanvasData(),
    };
    const updated = [...sessions, newSession];
    saveSessions(updated);
    return updated;
}

// Update a session's data and lastModified
export function saveCanvas(
    sessions: CanvasSession[],
    sessionId: number,
    getCanvasData: () => any
): CanvasSession[] {
    const now = new Date().toISOString();
    const updated = sessions.map((s) =>
        s.id === sessionId
            ? { ...s, data: getCanvasData(), lastModified: now }
            : s
    );
    saveSessions(updated);
    return updated;
}

// Load a session by id
export function loadSession(
    sessions: CanvasSession[],
    sessionId: number
): CanvasSession | undefined {
    return sessions.find((s) => s.id === sessionId);
}

// Delete a session
export function deleteSession(
    sessions: CanvasSession[],
    sessionId: number
): CanvasSession[] {
    const updated = sessions.filter((s) => s.id !== sessionId);
    saveSessions(updated);
    return updated;
}

// Rename a session
export function renameSession(
    sessions: CanvasSession[],
    sessionId: number,
    newName: string
): CanvasSession[] {
    const updated = sessions.map((s) =>
        s.id === sessionId ? { ...s, name: newName } : s
    );
    saveSessions(updated);
    return updated;
}

// Export sessions as JSON (client-side only)
export function exportSessionsAsJSON(sessions: CanvasSession[]) {
    if (typeof window === "undefined") return;
    const dataStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sessions.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import sessions from JSON file (client-side only)
export function importSessionsFromJSON(
    file: File,
    onImport: (sessions: CanvasSession[]) => void
) {
    if (typeof window === "undefined") return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedSessions = JSON.parse(
                event.target?.result as string
            ) as CanvasSession[];
            saveSessions(importedSessions);
            onImport(importedSessions);
        } catch {
            // handle error
        }
    };
    reader.readAsText(file);
}

// Clear all sessions
export function clearSessions() {
    const localStorage = getLocalStorage();
    if (localStorage) {
        localStorage.removeItem(STORAGE_KEY);
    }
}
