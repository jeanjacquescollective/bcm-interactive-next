"use client";

import React, { useEffect, useState } from "react";

import SessionToolbar from "@components/SessionManagement/SessionToolbar";
import CanvasContent from "@/components/CanvasContent";
import { CanvasUIProvider } from "@/contexts/CanvasUI";
import { useCanvasDataContext } from "@/contexts/CanvasData";
import { CanvasData } from "@/types/CanvasSession";

const MainContent: React.FC = () => {
  const [loadingColors, setLoadingColors] = useState(true);
  const [COLORS, setCOLORS] = useState<string[]>([]);

  const {
    sessionsData,
    sessionId,
    setSessionsData,
    createSession,
    updateSession,
    deleteSession,
  } = useCanvasDataContext();

  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then((colors) => {
        setCOLORS(colors);
        setLoadingColors(false);
      })
      .catch(() => {
        setCOLORS([]);
        setLoadingColors(false);
      });
  }, []);

  const handleSessionCreate = async (name: string) => {
    await createSession(name);
  };

  const handleSessionUpdate = async (options: { data?: CanvasData; name?: string }) => {
    await updateSession(options);
  };

  const handleSessionDelete = async (id: string) => {
    await deleteSession(id);
  };

  const handleSessionNameChange = async (newName: string) => {
    setSessionsData((prev) =>
      prev.map((s) =>
        s.id?.toString() === sessionId ? { ...s, name: newName } : s
      )
    );
    await handleSessionUpdate({ name: newName });
  };

  const getLastModified = () =>
    sessionsData.find((s) => s.id?.toString() === sessionId)?.lastModified ?? "";

  if (loadingColors) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <SessionToolbar
        handleSessionNameChange={handleSessionNameChange}
        handleSessionCreate={handleSessionCreate}
        handleSessionDelete={handleSessionDelete}
        getLastModified={getLastModified}
        updateURLWithSessionId={() => { }}
      />
      <CanvasContent COLORS={COLORS} />
    </>
  );
};

export default MainContent;
