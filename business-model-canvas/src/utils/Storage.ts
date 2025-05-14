// storage.js
import { sessions, currentSessionId, sectionIds, setCurrentSessionId } from "./state.js";
import { canvasTitleInput, lastSavedText } from "./dom.js";
import { setCanvasData, getCanvasData } from "./canvas.js";

export function loadSessions() {
  const savedSessions = localStorage.getItem("bmcSessions");

  if (savedSessions) {
    sessions.splice(0, sessions.length, ...JSON.parse(savedSessions));
    if (sessions.length > 0) {
      loadSession(sessions[sessions.length - 1].id);
    } else {
      createNewSession("Default Canvas");
    }
  } else {
    createNewSession("Default Canvas");
  }
}

export function saveCanvas() {
  if (currentSessionId) {
    const session = sessions.find((s) => s.id === currentSessionId);
    if (session) {
      session.data = getCanvasData();
      session.lastModified = new Date().toISOString();
      localStorage.setItem("bmcSessions", JSON.stringify(sessions));
      lastSavedText.textContent = `${new Date(session.lastModified).toLocaleString()}`;
    }
  }
}

export function createNewSession(defaultName) {
  const name = defaultName || "Untitled Canvas";
  const newSession = {
    id: Date.now(),
    name,
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    data: getCanvasData(),
  };
  sessions.push(newSession);
  localStorage.setItem("bmcSessions", JSON.stringify(sessions));
  loadSession(newSession.id);
}

export function loadSession(sessionId) {
  const session = sessions.find((s) => s.id === sessionId);
  if (session) {
    // currentSessionId = sessionId;
    console.log("Loading session:", sessionId);
    setCurrentSessionId(sessionId);
    canvasTitleInput.value = session.name;
    lastSavedText.textContent = `${new Date(session.lastModified).toLocaleString()}`;
    setCanvasData(session.data);
  }
}


export function deleteSession(sessionId) {
  const sessionIndex = sessions.findIndex((s) => s.id === sessionId);
  if (sessionIndex !== -1) {
    sessions.splice(sessionIndex, 1);
    localStorage.setItem("bmcSessions", JSON.stringify(sessions));
    if (sessions.length > 0) {
      loadSession(sessions[sessions.length - 1].id);
    } else {
      createNewSession("Default Canvas");
    }
  }
}

export function renameSession(sessionId, newName) {
  const session = sessions.find((s) => s.id === sessionId);
  if (session) {
    session.name = newName;
    localStorage.setItem("bmcSessions", JSON.stringify(sessions));
  }
}

export function exportSessionsAsJSON() {
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

export function importSessionsFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const importedSessions = JSON.parse(event.target.result);
    sessions.splice(0, sessions.length, ...importedSessions);
    localStorage.setItem("bmcSessions", JSON.stringify(sessions));
    loadSession(sessions[sessions.length - 1].id);
  };
  reader.readAsText(file);
}

export function clearSessions() {
  localStorage.removeItem("bmcSessions");
  sessions.length = 0;
  createNewSession("Default Canvas");
}