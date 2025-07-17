"use client";
import { CanvasSession } from "@/types/CanvasSession";
import { SessionStorageProvider } from "../storage.interface";

const STORAGE_KEY = "bmc_sessions";

function getLocalStorage(): Storage | null {
  return typeof window !== "undefined" ? window.localStorage : null;
}

export const localStorageProvider: SessionStorageProvider = {
  async loadSessions(): Promise<CanvasSession[]> {
    console.log("Loading sessions from localStorage");
    // Check if localStorage is available
    const localStorage = getLocalStorage();
    if (!localStorage) return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  async saveSessions(sessions: CanvasSession[]): Promise<void> {
    const localStorage = getLocalStorage();
    if (localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  },

  async clearSessions(): Promise<void> {
    const localStorage = getLocalStorage();
    if (localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  
};
