// File: hooks/useSelectedSession.ts
"use client";

import { useEffect, useState } from "react";
import { CanvasSession } from "@/types/CanvasSession";

export function useSelectedSession(): CanvasSession | null {
  const [session, setSession] = useState<CanvasSession | null>(null);

  useEffect(() => {
    const sessionsRaw = localStorage.getItem("bmc_sessions");
    if (!sessionsRaw) return;

    try {
      const sessions: CanvasSession[] = JSON.parse(sessionsRaw);
      const urlSessionId = new URL(window.location.href).searchParams.get("sessionId");

      const selected = urlSessionId
        ? sessions.find((s) => s.id?.toString() === urlSessionId) ?? null
        : sessions[0] || null;

      setSession(selected);
    } catch (error) {
      console.error("Failed to load session from localStorage", error);
    }
  }, []);

  return session;
}