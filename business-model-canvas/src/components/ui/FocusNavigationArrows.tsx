"use client";

import React, { useContext, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "react-feather";
// import { CanvasUI } from "@/contexts/CanvasUI";
import { CanvasData } from "@/types/CanvasSession";
import { ManagedUI } from "@/contexts/ManagedUI";

const FocusNavigationArrows: React.FC = () => {
  const managedUI = useContext(ManagedUI);

  const segmentOptions = React.useMemo<Array<{ key: keyof CanvasData; label: string }>>(
    () => [
      { key: "keyPartners", label: "Key Partners" },
      { key: "keyActivities", label: "Key Activities" },
      { key: "keyResources", label: "Key Resources" },
      { key: "valuePropositions", label: "Value Propositions" },
      { key: "customerRelationships", label: "Customer Relationships" },
      { key: "channels", label: "Channels" },
      { key: "customerSegments", label: "Customer Segments" },
      { key: "costStructure", label: "Cost Structure" },
      { key: "revenueStreams", label: "Revenue Streams" },
      { key: "brainStormArea", label: "Brainstorm Area" },
    ],
    []
  );

  const getCurrentSegmentIndex = useCallback(() => {
    if (!managedUI?.focusedSegment) return -1;
    return segmentOptions.findIndex(segment => segment.key === managedUI.focusedSegment);
  }, [managedUI?.focusedSegment, segmentOptions]);

  const goToNextSegment = useCallback(() => {
    const currentIndex = getCurrentSegmentIndex();
    if (currentIndex >= 0 && currentIndex < segmentOptions.length - 1) {
      managedUI?.setFocusedSegment(segmentOptions[currentIndex + 1].key);
    }
  }, [getCurrentSegmentIndex, managedUI, segmentOptions]);

  const goToPreviousSegment = useCallback(() => {
    const currentIndex = getCurrentSegmentIndex();
    if (currentIndex > 0) {
      managedUI?.setFocusedSegment(segmentOptions[currentIndex - 1].key);
    }
  }, [getCurrentSegmentIndex, managedUI, segmentOptions]);

  const exitFocusMode = useCallback(() => {
    managedUI?.setFocusedSegment(null);
  }, [managedUI]);

  // Keyboard navigation
  useEffect(() => {
    if (!managedUI?.focusedSegment) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPreviousSegment();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextSegment();
      } else if (e.key === "Escape") {
        e.preventDefault();
        exitFocusMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [managedUI?.focusedSegment, goToNextSegment, goToPreviousSegment, exitFocusMode]);

  if (!managedUI?.focusedSegment) return null;

  const currentIndex = getCurrentSegmentIndex();
  const currentSegment = segmentOptions[currentIndex];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < segmentOptions.length - 1;

  return (
    <>
      {/* Left Arrow */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={goToPreviousSegment}
          disabled={!canGoPrevious}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            canGoPrevious
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          title="Previous segment (← key)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Right Arrow */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={goToNextSegment}
          disabled={!canGoNext}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            canGoNext
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          title="Next segment (→ key)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Current Segment Indicator */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3">
          <span className="text-sm font-medium">
            {currentSegment?.label} ({currentIndex + 1}/{segmentOptions.length})
          </span>
          <button
            onClick={exitFocusMode}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Exit focus mode (Esc key)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FocusNavigationArrows;