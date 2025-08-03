// File: components/ExportDropdown.tsx
"use client";

import React, { useCallback, useState } from "react";
import { Download } from "react-feather";
import SidebarButton from "./SidebarButton";
import { exportSessionToFormat } from "@/utils/exportSession";
import { toast } from "sonner";
import { useCanvasDataContext } from "@/contexts/CanvasData";

const EXPORT_FORMATS = ["PDF", "JPG", "CSV", "JSON"] as const;

type Props = {
  sideBarOpen: boolean;
  isOpen: boolean;
  setHovered: () => void;
  clearHovered: () => void;
};

const ExportDropdown: React.FC<Props> = ({ sideBarOpen, isOpen, setHovered, clearHovered }) => {
  const [loading, setLoading] = useState(false);
  const { sessionsData, sessionId } = useCanvasDataContext();
  const session = sessionsData.find((s) => s.id === sessionId);

  const handleExport = useCallback(async (format: string) => {
    if (!session) {
      toast.error("No session found for export.");
      return;
    }
    setLoading(true);
    try {
      await exportSessionToFormat(format, session);
    } catch (err) {
      toast.error("Export failed. Please try again.");
      console.error("Export error:", err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  return (
    <div className="relative" onMouseEnter={setHovered} onMouseLeave={clearHovered}>
      <SidebarButton
        icon={<Download className="w-5 h-5" />}
        label="Export"
        sideBarOpen={sideBarOpen}
        ariaLabel="Toggle export options"
      />
      {isOpen && (
        <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 min-w-[100px] z-50">
          {EXPORT_FORMATS.map((format) => (
            <button
              key={format}
              className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded text-sm text-white"
              type="button"
              onClick={() => handleExport(format)}
            >
              {format}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="text-xl text-gray-700">Preparing export...</div>
        </div>
      )}
    </div>
  );
};

export default ExportDropdown;
