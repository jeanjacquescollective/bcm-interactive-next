import { CanvasData, CanvasSession } from "@/types/CanvasSession";
import { Note } from "@/types/NoteList";
import { v4 as uuidv4 } from "uuid";


export const createEmptyCanvas = (): CanvasData => ({
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
});

export const EMPTY_SESSION: CanvasSession = {
  id: uuidv4(),
  name: "New Session",
  created: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  data: createEmptyCanvas(),
};


export const createSession = (name: string, data = createEmptyCanvas()): CanvasSession => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    name,
    created: now,
    lastModified: now,
    data,
  };
};

export const updateSession = (
  session: CanvasSession,
  updates: Partial<Pick<CanvasSession, "name" | "data">>
): CanvasSession => ({
  ...session,
  ...updates,
  lastModified: new Date().toISOString(),
});

export const updateSegment = (
  canvasData: CanvasData,
  segmentKey: keyof CanvasData,
  items: Note[],
  questions: { nl: string[]; en: string[] }
): CanvasData => ({
  ...canvasData,
  [segmentKey]: { items, questions, key: String(segmentKey) },
});

export const addNote = (
  canvasData: CanvasData,
  segmentKey: keyof CanvasData,
  note: Omit<Note, "id">
): CanvasData => ({
  ...canvasData,
  [segmentKey]: {
    ...canvasData[segmentKey],
    items: [...canvasData[segmentKey].items, { ...note, id: Date.now().toString() }],
  },
});

export const editNote = (
  canvasData: CanvasData,
  segmentKey: keyof CanvasData,
  noteId: number,
  updated: Partial<Omit<Note, "id">>
): CanvasData => ({
  ...canvasData,
  [segmentKey]: {
    ...canvasData[segmentKey],
    items: canvasData[segmentKey].items.map((n) =>
      n.id === noteId.toString() ? { ...n, ...updated } : n
    ),
  },
});

export const deleteNote = (
  canvasData: CanvasData,
  segmentKey: keyof CanvasData,
  noteId: number
): CanvasData => ({
  ...canvasData,
  [segmentKey]: {
    ...canvasData[segmentKey],
    items: canvasData[segmentKey].items.filter((n) => n.id !== noteId.toString()),
  },
});

export const moveNote = (
  canvasData: CanvasData,
  fromSegmentKey: keyof CanvasData,
  toSegmentKey: keyof CanvasData,
  noteId: number
): CanvasData => {
  const noteToMove = canvasData[fromSegmentKey].items.find((n) => n.id === noteId.toString());
  if (!noteToMove) return canvasData;

  return {
    ...canvasData,
    [fromSegmentKey]: {
      ...canvasData[fromSegmentKey],
      items: canvasData[fromSegmentKey].items.filter((n) => n.id !== noteId.toString()),
    },
    [toSegmentKey]: {
      ...canvasData[toSegmentKey],
      items: [...canvasData[toSegmentKey].items, noteToMove],
    },
  };
};