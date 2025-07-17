import { SessionStorageProvider } from "@/lib/storage/storage.interface";
import { CanvasSession } from "@/types/CanvasSession";
import { createSession, updateSession } from "@/lib/actions/sessionActions";

export class SessionService {
  constructor(private storage: SessionStorageProvider) {
    this.getAll = this.getAll.bind(this);
    this.add = this.add.bind(this);
    this.addWithData = this.addWithData.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.clear = this.clear.bind(this);
  }

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

  async addWithData(
    session: CanvasSession
  ): Promise<CanvasSession[]> {
    console.log("Adding session with id:", session.id);
    let sessions: CanvasSession[] = [];
    try {
      sessions = await this.storage.loadSessions();
    } catch (error) {
      console.error("Error loading sessions:", error);
      throw error;
    }
    console.log("Adding session with data:", session);
    // Assuming you have a function or constant that provides a default CanvasData object
    const defaultData: CanvasSession["data"] = {
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
    const mergedData = { ...defaultData, ...session.data };
    console.log(sessions, session.id);
    if (sessions.some(s => s.id && s.id === session.id)) {
      throw new Error(`Session with id "${session.id}" already exists.`);
    }
    const newSession = createSession(session.name, mergedData);
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
