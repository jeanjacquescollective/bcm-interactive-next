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
    // Check if Supabase env variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const sessions = await this.storage.loadSessions();

    if (!supabaseUrl || !supabaseKey) {
      // Fallback: just return sessions as-is if Supabase is not configured
      return sessions;
    }

    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      for (const session of sessions) {
        for (const key of Object.keys(session.data)) {
          const { data, error } = await supabase
            .from("canvas_segment_questions")
            .select("questions")
            .eq("segment_key", key)
            .single();
          if (!error && data?.questions) {
            session.data[key].questions = {
              nl: data.questions["nl"] || [],
              en: data.questions["en"] || [],
            };
          }
        }
      }
      // Optionally, save updated sessions back to storage
      await this.storage.saveSessions(sessions);
      return await this.storage.loadSessions();
    } catch (err) {
      // Fallback: return sessions as-is if Supabase import or query fails
      console.error("Error fetching questions from Supabase:", err);
      return sessions;
    }
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
    let sessions: CanvasSession[] = [];
    try {
      sessions = await this.storage.loadSessions();
    } catch (error) {
      console.error("Error loading sessions:", error);
      throw error;
    }
    // Assuming you have a function or constant that provides a default CanvasData object
    const defaultData: CanvasSession["data"] = {
      keyPartners: { items: [], questions: { nl: [], en: [] }, key: "keyPartners" },
      keyActivities: { items: [], questions: { nl: [], en: [] }, key: "keyActivities" },
      keyResources: { items: [], questions: { nl: [], en: [] }, key: "keyResources" },
      valuePropositions: { items: [], questions: { nl: [], en: [] }, key: "valuePropositions" },
      customerRelationships: { items: [], questions: { nl: [], en: [] }, key: "customerRelationships" },
      channels: { items: [], questions: { nl: [], en: [] }, key: "channels" },
      customerSegments: { items: [], questions: { nl: [], en: [] }, key: "customerSegments" },
      costStructure: { items: [], questions: { nl: [], en: [] }, key: "costStructure" },
      revenueStreams: { items: [], questions: { nl: [], en: [] }, key: "revenueStreams" },
      brainStormArea: { items: [], questions: { nl: [], en: [] }, key: "brainStormArea" },
    };
    const mergedData = { ...defaultData, ...session.data };
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
