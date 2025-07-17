"use client";

import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasSegment from "./CanvasSegment/CanvasSegment";
import CanvasModals from "./modals/canvasboard/CanvasModals";
import FocusNavigationArrows from "@/components/ui/FocusNavigationArrows";
import { CanvasUI } from "@/contexts/CanvasUI";
import { ManagedUI } from "@/contexts/ManagedUI";
import { CanvasData } from "@/types/CanvasSession";
import { Note } from "@/types/NoteList";

interface CanvasBoardProps {
  canvasData: CanvasData;
  COLORS: string[];
  handleSegmentChange: (
    segmentKey: keyof CanvasData,
    items: any[],
    questions: string[]
  ) => void;
  handleDragEnd: (event: { active: any; over: any }) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({
  canvasData,
  handleSegmentChange,
  handleDragEnd,
}) => {
  const canvasUI = useContext(CanvasUI);
  const managedUI = useContext(ManagedUI);
  const [zoom, setZoom] = useState(1);

  // ✅ Prevent default browser zoom when using Ctrl/Cmd + Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // ✅ Enable drag only when not zoomed in
  useEffect(() => {
    if (typeof canvasUI?.setIsDraggable === "function") {
      canvasUI.setIsDraggable(zoom <= 1);
    }
  }, [zoom, canvasUI]);

  // ✅ Add or update notes
  const addNoteHandler = useCallback(
    (note: Omit<Note, "id"> | Note) => {
      const segmentKey = canvasUI?.segmentKey ?? "brainStormArea";
      const segment = canvasData[segmentKey];

      if ("id" in note && note.id !== undefined) {
        const updatedItems = (segment?.items ?? []).map((item: Note) =>
          item.id === note.id ? { ...item, ...note } : item
        );
        handleSegmentChange(segmentKey, updatedItems, segment?.questions ?? []);
      } else {
        const newNote = { ...note, id: Date.now().toString() };
        handleSegmentChange(
          segmentKey,
          [...(segment?.items ?? []), newNote],
          segment?.questions ?? []
        );
      }
    },
    [canvasData, canvasUI?.segmentKey, handleSegmentChange]
  );

  // ✅ Check visibility for conditional rendering
  const shouldShowSegment = useCallback(
    (segmentKey: keyof CanvasData) =>
      !managedUI?.focusedSegment || managedUI.focusedSegment === segmentKey,
    [managedUI?.focusedSegment]
  );

  // ✅ Memoized board rendering for performance
  const board = useMemo(() => {
    if (managedUI?.focusedSegment) {
      const title = managedUI.focusedSegment
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      return (
        <div className="flex flex-col w-full h-full p-4 bg-gray-100 dark:bg-gray-800 justify-center items-center">
          <CanvasSegment
            segmentTitle={title}
            segmentData={canvasData[managedUI.focusedSegment]}
            handleSegmentChange={handleSegmentChange}
            className="w-full h-full"
          />
        </div>
      );
    }

    return (
      <div className="w-full h-full rounded-lg shadow-md bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-5 gap-2 p-4 bg-gray-100 dark:bg-gray-800 w-full">
          {shouldShowSegment("keyPartners") && (
            <CanvasSegment
              segmentTitle="Key Partners"
              segmentData={canvasData.keyPartners}
              handleSegmentChange={handleSegmentChange}
              className="flex flex-col col-span-1"
            />
          )}

          {(shouldShowSegment("keyActivities") ||
            shouldShowSegment("keyResources")) && (
            <div className="flex flex-col gap-2 col-span-1">
              {shouldShowSegment("keyActivities") && (
                <CanvasSegment
                  segmentTitle="Key Activities"
                  segmentData={canvasData.keyActivities}
                  handleSegmentChange={handleSegmentChange}
                  className="flex-1"
                />
              )}
              {shouldShowSegment("keyResources") && (
                <CanvasSegment
                  segmentTitle="Key Resources"
                  segmentData={canvasData.keyResources}
                  handleSegmentChange={handleSegmentChange}
                  className="flex-1"
                />
              )}
            </div>
          )}

          {shouldShowSegment("valuePropositions") && (
            <CanvasSegment
              segmentTitle="Value Propositions"
              segmentData={canvasData.valuePropositions}
              handleSegmentChange={handleSegmentChange}
              className="flex flex-col col-span-2"
            />
          )}

          {(shouldShowSegment("customerRelationships") ||
            shouldShowSegment("channels")) && (
            <div className="flex flex-col gap-2 col-span-1">
              {shouldShowSegment("customerRelationships") && (
                <CanvasSegment
                  segmentTitle="Customer Relationships"
                  segmentData={canvasData.customerRelationships}
                  handleSegmentChange={handleSegmentChange}
                  className="flex-1"
                />
              )}
              {shouldShowSegment("channels") && (
                <CanvasSegment
                  segmentTitle="Channels"
                  segmentData={canvasData.channels}
                  handleSegmentChange={handleSegmentChange}
                  className="flex-1"
                />
              )}
            </div>
          )}

          {shouldShowSegment("customerSegments") && (
            <CanvasSegment
              segmentTitle="Customer Segments"
              segmentData={canvasData.customerSegments}
              handleSegmentChange={handleSegmentChange}
              className="col-span-1"
            />
          )}
        </div>

        {(shouldShowSegment("costStructure") ||
          shouldShowSegment("revenueStreams")) && (
          <div className="flex flex-col md:flex-row p-4 gap-2 bg-gray-100 dark:bg-gray-800 w-full">
            {shouldShowSegment("costStructure") && (
              <CanvasSegment
                segmentTitle="Cost Structure"
                segmentData={canvasData.costStructure}
                handleSegmentChange={handleSegmentChange}
                className="flex-1"
              />
            )}
            {shouldShowSegment("revenueStreams") && (
              <CanvasSegment
                segmentTitle="Revenue Streams"
                segmentData={canvasData.revenueStreams}
                handleSegmentChange={handleSegmentChange}
                className="flex-1"
              />
            )}
          </div>
        )}

        {shouldShowSegment("brainStormArea") && (
          <div className="flex p-4 shadow gap-2 bg-gray-100 dark:bg-gray-800 w-full">
            <CanvasSegment
              segmentTitle="Brainstorm Area"
              segmentData={canvasData.brainStormArea}
              handleSegmentChange={handleSegmentChange}
              className="flex-1"
            />
          </div>
        )}
      </div>
    );
  }, [canvasData, handleSegmentChange, managedUI?.focusedSegment, shouldShowSegment]);

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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {board}
          </DndContext>
        </TransformComponent>
      </TransformWrapper>

      <CanvasModals addNoteHandler={addNoteHandler} />
      <FocusNavigationArrows />
    </>
  );
};

export default CanvasBoard;
