import { CanvasSession } from "@/types/CanvasSession";

export interface SessionStorageProvider {
  loadSessions(): Promise<CanvasSession[]>;
  saveSessions(sessions: CanvasSession[]): Promise<void>;
  clearSessions(): Promise<void>;
}
