import { CanvasSession } from '@/types/CanvasSession';
import { NextRequest, NextResponse } from 'next/server';



// In-memory session store (replace with DB in production)
let sessions: CanvasSession[] = [];

if (typeof window !== "undefined") {
    const stored = localStorage.getItem("bcm_sessions");
    if (stored) {
        try {
            sessions = JSON.parse(stored);
        } catch {
            sessions = [{
                id: Date.now().toString(),
                name: "Untitled Canvas",
                created: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                data: {
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
                }
            }];
        }
    } else {
        localStorage.setItem("bcm_sessions", JSON.stringify(sessions));
    }
}

// Helper to find session index
function findSessionIndex(sessionId: string) {
    return sessions.findIndex((s) => s.id === sessionId);
}

// GET /api/sessions - list all sessions
export async function GET() {
    return NextResponse.json(sessions);
}

// POST /api/sessions - create new session
export async function POST(req: NextRequest) {
    const { name = "Untitled Canvas", data = {} } = await req.json();
    const now = new Date().toISOString();
    const newSession: CanvasSession = {
        id: Date.now().toString(),
        name,
        created: now,
        lastModified: now,
        data,
    };
    sessions.push(newSession);
    return NextResponse.json(newSession, { status: 201 });
}

// PUT /api/sessions - update session (expects { id, data })
export async function PUT(req: NextRequest) {
    const { id, data } = await req.json();
    const idx = findSessionIndex(id);
    if (idx === -1) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    sessions[idx] = {
        ...sessions[idx],
        data,
        lastModified: new Date().toISOString(),
    };
    return NextResponse.json(sessions[idx]);
}

// DELETE /api/sessions - delete session (expects { id })
export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const idx = findSessionIndex(id);
    if (idx === -1) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    const deleted = sessions.splice(idx, 1)[0];
    return NextResponse.json(deleted);
}