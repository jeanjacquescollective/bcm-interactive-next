import { SessionStorageProvider } from "@/lib/storage/storage.interface";
import { CanvasSession } from "@/types/CanvasSession";
import { createSession, updateSession } from "@/lib/actions/sessionActions";

export class SessionService {
  constructor(private storage: SessionStorageProvider) {}

  async getAll(): Promise<CanvasSession[]> {
    return await this.storage.loadSessions();
  }

  async add(name: string): Promise<CanvasSession[]> {
    const sessions = await this.storage.loadSessions();
    const newSession = createSession(name);
    const updated = [...sessions, newSession];
    await this.storage.saveSessions(updated);
    return updated;
  }

  async update(
    id: string,
    updates: Partial<Pick<CanvasSession, "name" | "data">>
  ): Promise<CanvasSession[]> {
    const sessions = await this.storage.loadSessions();
    
    const updated = sessions.map((s) =>
      s.id?.toString() === id.toString() ? updateSession(s, updates) : s
    );
    await this.storage.saveSessions(updated);
    return updated;
  }

  
  async delete(id: string): Promise<CanvasSession[]> {
    const sessions = await this.storage.loadSessions();
    
    const updated = sessions.filter((s) => s.id?.toString() !== id.toString());
    await this.storage.saveSessions(updated);
    return updated;
  }

  async clear(): Promise<void> {
    await this.storage.clearSessions();
  }
}
