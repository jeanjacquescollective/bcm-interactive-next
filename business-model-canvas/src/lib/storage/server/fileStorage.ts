import fs from "fs/promises";
import path from "path";
import { CanvasSession } from "@/types/CanvasSession";
import { SessionStorageProvider } from "../storage.interface";

const FILE_PATH = path.resolve("./data/sessions.json");

async function readFromFile(): Promise<CanvasSession[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeToFile(sessions: CanvasSession[]) {
  await fs.writeFile(FILE_PATH, JSON.stringify(sessions, null, 2));
}

export const fileStorageProvider: SessionStorageProvider = {
  async loadSessions() {
    return readFromFile();
  },
  async saveSessions(sessions) {
    return writeToFile(sessions);
  },
  async clearSessions() {
    await fs.writeFile(FILE_PATH, "[]");
  },
};
