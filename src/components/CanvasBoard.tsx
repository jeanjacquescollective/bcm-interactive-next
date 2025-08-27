"use client";

import React, { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasSegment from "./CanvasSegment/CanvasSegment";
import FocusNavigationArrows from "@/components/ui/FocusNavigationArrows";
import { CanvasUI, useDictionary } from "@/contexts/CanvasUI";
import { ManagedUI } from "@/contexts/ManagedUI";
import { CanvasData } from "@/types/CanvasSession";
import { Note } from "@/types/NoteList";
import { useCanvasDataContext } from "@/contexts/CanvasData";

interface CanvasBoardProps {
  COLORS: string[];
  handleDragEnd: (event: import("@dnd-kit/core").DragEndEvent) => void;
  handleSegmentChange: (
    segmentKey: keyof CanvasData,
    items: Note[],
    questions: { nl: string[]; en: string[] }
  ) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ handleDragEnd, handleSegmentChange }) => {
  const canvasUI = useContext(CanvasUI);
  const managedUI = useContext(ManagedUI);
  const [zoom, setZoom] = useState(1);

  if (!canvasUI) throw new Error("CanvasBoard must be used within CanvasUIProvider");

  const { canvasData, sessionsData } = useCanvasDataContext();
  const isLoading = !sessionsData;
  const dictionary = useDictionary();

  // Handle preventing default zoom with Ctrl/Meta
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Toggle draggable based on zoom
  useEffect(() => {
    canvasUI.setIsDraggable?.(zoom <= 1);
  }, [zoom, canvasUI]);

  // Callback to decide if a segment should be shown
  const shouldShowSegment = useCallback(
    (segmentKey: keyof CanvasData) => !managedUI?.focusedSegment || managedUI.focusedSegment === segmentKey,
    [managedUI?.focusedSegment]
  );

  const board = useMemo(() => {
    if (!dictionary) return null;

    // Focused segment view
    if (managedUI?.focusedSegment) {
      const title = String(managedUI.focusedSegment)
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str: string) => str.toUpperCase());

      return (
        <div className="flex flex-col w-full h-full p-4 bg-gray-100 dark:bg-gray-800 justify-center items-center">
          <CanvasSegment
            segmentTitle={title}
            segmentData={canvasData[managedUI.focusedSegment]}
            handleSegmentChange={handleSegmentChange}
            extraClasses="w-full h-full"
          />
        </div>
      );
    }

    return (
      <div className={`w-full h-full rounded-lg shadow-md ${isLoading ? "pointer-events-none opacity-50" : ""}`}>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 p-4 w-full">
          {shouldShowSegment("keyPartners") && (
            <CanvasSegment
              segmentTitle={dictionary.segments.keyPartners || "Key Partners"}
              segmentData={canvasData.keyPartners}
              handleSegmentChange={handleSegmentChange}
              extraClasses="flex flex-col col-span-1 w-full"
            />
          )}

          {(shouldShowSegment("keyActivities") || shouldShowSegment("keyResources")) && (
            <div className="flex flex-col gap-2 col-span-1 w-full">
              {shouldShowSegment("keyActivities") && (
                <CanvasSegment
                  segmentTitle={dictionary.segments.keyActivities || "Key Activities"}
                  segmentData={canvasData.keyActivities}
                  handleSegmentChange={handleSegmentChange}
                  extraClasses="flex-1 w-full"
                />
              )}
              {shouldShowSegment("keyResources") && (
                <CanvasSegment
                  segmentTitle={dictionary.segments.keyResources || "Key Resources"}
                  segmentData={canvasData.keyResources}
                  handleSegmentChange={handleSegmentChange}
                  extraClasses="flex-1 w-full"
                />
              )}
            </div>
          )}

          {shouldShowSegment("valuePropositions") && (
            
            <CanvasSegment
              segmentTitle={dictionary.segments.valuePropositions || "Value Propositions"}
              segmentData={canvasData.valuePropositions}
              handleSegmentChange={handleSegmentChange}
              extraClasses="flex flex-col col-span-2 w-full"
            />
          )}

          {(shouldShowSegment("customerRelationships") || shouldShowSegment("channels")) && (
            <div className="flex flex-col gap-2 col-span-1 w-full">
              {shouldShowSegment("customerRelationships") && (
                <CanvasSegment
                  segmentTitle={dictionary.segments.customerRelationships || "Customer Relationships"}
                  segmentData={canvasData.customerRelationships}
                  handleSegmentChange={handleSegmentChange}
                  extraClasses="flex-1 w-full"
                />
              )}
              {shouldShowSegment("channels") && (
                <CanvasSegment
                  segmentTitle={dictionary.segments.channels || "Channels"}
                  segmentData={canvasData.channels}
                  handleSegmentChange={handleSegmentChange}
                  extraClasses="flex-1 w-full"
                />
              )}
            </div>
          )}

          {shouldShowSegment("customerSegments") && (
            <CanvasSegment
              segmentTitle={dictionary.segments.customerSegments || "Customer Segments"}
              segmentData={canvasData.customerSegments}
              handleSegmentChange={handleSegmentChange}
              extraClasses="col-span-1 w-full"
            />
          )}
        </div>

        {(shouldShowSegment("costStructure") || shouldShowSegment("revenueStreams")) && (
          <div className="flex flex-col md:flex-row p-4 gap-2 w-full">
            {shouldShowSegment("costStructure") && (
              <CanvasSegment
                segmentTitle={dictionary.segments.costStructure || "Cost Structure"}
                segmentData={canvasData.costStructure}
                handleSegmentChange={handleSegmentChange}
                extraClasses="flex-1 w-full"
              />
            )}
            {shouldShowSegment("revenueStreams") && (
              <CanvasSegment
                segmentTitle={dictionary.segments.revenueStreams || "Revenue Streams"}
                segmentData={canvasData.revenueStreams}
                handleSegmentChange={handleSegmentChange}
                extraClasses="flex-1 w-full"
              />
            )}
          </div>
        )}

        {shouldShowSegment("brainStormArea") && (
          <div className="flex p-4 shadow gap-2 w-full">
            <CanvasSegment
              segmentTitle={dictionary.brainstorm.title || "Brainstorm Area"}
              segmentData={canvasData.brainStormArea}
              handleSegmentChange={handleSegmentChange}
              extraClasses="flex-1 w-full"
            />
          </div>
        )}
      </div>
    );
  }, [canvasData, handleSegmentChange, managedUI?.focusedSegment, dictionary, isLoading, shouldShowSegment]);

  return (
    <>
      <TransformWrapper
        onZoomStop={({ state }) => setZoom(state.scale)}
        wheel={{ activationKeys: ["Control", "Meta"] }}
        pinch={{ disabled: false }}
        doubleClick={{ disabled: true }}
        panning={{ disabled: zoom === 1 }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%", overflow: "visible" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {board}
          </DndContext>
        </TransformComponent>
      </TransformWrapper>

      <FocusNavigationArrows />
    </>
  );
};

export default CanvasBoard;
