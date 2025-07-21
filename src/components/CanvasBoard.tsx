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
import { useCanvasDataContext } from "@/contexts/CanvasData";

interface CanvasBoardProps {
  COLORS: string[];
  handleDragEnd: (event: import("@dnd-kit/core").DragEndEvent) => void;
  handleSegmentChange: (
    segmentKey: keyof CanvasData,
    items: Note[],
    questions: string[]
  ) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ handleDragEnd, handleSegmentChange }) => {
  const canvasUI = useContext(CanvasUI);
  const managedUI = useContext(ManagedUI);
  const [zoom, setZoom] = useState(1);

  if (!canvasUI) throw new Error("CanvasBoard must be used within CanvasUIProvider");

  const { segmentKey } = canvasUI;
  const { canvasData } = useCanvasDataContext();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    canvasUI.setIsDraggable?.(zoom <= 1);
  }, [zoom, canvasUI]);

  const addNoteHandler = useCallback(
    (note: Omit<Note, "id"> | Note) => {
      const key = segmentKey ?? "brainStormArea";
      const segment = canvasData[key];
      if (!segment) return;

      let updatedItems: Note[];
      if ("id" in note && note.id !== undefined) {
        updatedItems = segment.items.map((item) =>
          item.id === note.id ? { ...item, ...note } : item
        );
      } else {
        const newNote = { ...note, id: Date.now().toString() };
        updatedItems = [...segment.items, newNote];
      }

      handleSegmentChange(key, updatedItems, segment.questions);
      canvasUI.setSegmentKey?.(key);
    },
    [canvasData, segmentKey, handleSegmentChange, canvasUI]
  );

  const shouldShowSegment = useCallback(
    (segmentKey: keyof CanvasData) =>
      !managedUI?.focusedSegment || managedUI.focusedSegment === segmentKey,
    [managedUI?.focusedSegment]
  );

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
            extraClasses="w-full h-full"
          />
        </div>
      );
    }

    return (
      <div className="w-full h-full rounded-lg shadow-md bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-4 bg-gray-100 dark:bg-gray-800 w-full">
          {shouldShowSegment("keyPartners") && (
            <CanvasSegment
              segmentTitle="Key Partners"
              segmentData={canvasData.keyPartners}
              handleSegmentChange={handleSegmentChange}
              extraClasses="flex flex-col col-span-1 w-full"
            />
          )}

          {(shouldShowSegment("keyActivities") ||
            shouldShowSegment("keyResources")) && (
              <div className="flex flex-col gap-2 col-span-1 w-full">
                {shouldShowSegment("keyActivities") && (
                  <CanvasSegment
                    segmentTitle="Key Activities"
                    segmentData={canvasData.keyActivities}
                    handleSegmentChange={handleSegmentChange}
                    extraClasses="flex-1 w-full"
                  />
                )}
                {shouldShowSegment("keyResources") && (
                  <CanvasSegment
                    segmentTitle="Key Resources"
                    segmentData={canvasData.keyResources}
                    handleSegmentChange={handleSegmentChange}
                    extraClasses="flex-1 w-full"
                  />
                )}
              </div>
            )}

          {shouldShowSegment("valuePropositions") && (
            <CanvasSegment
              segmentTitle="Value Propositions"
              segmentData={canvasData.valuePropositions}
              handleSegmentChange={handleSegmentChange}
              extraClasses="flex flex-col col-span-2 w-full"
            />
          )}

          {(shouldShowSegment("customerRelationships") ||
            shouldShowSegment("channels")) && (
              <div className="flex flex-col gap-2 col-span-1 w-full">
                {shouldShowSegment("customerRelationships") && (
                  <CanvasSegment
                    segmentTitle="Customer Relationships"
                    segmentData={canvasData.customerRelationships}
                    handleSegmentChange={handleSegmentChange}
                    extraClasses="flex-1 w-full"
                  />
                )}
                {shouldShowSegment("channels") && (
                  <CanvasSegment
                    segmentTitle="Channels"
                    segmentData={canvasData.channels}
                    handleSegmentChange={handleSegmentChange}
                    extraClasses="flex-1 w-full"
                  />
                )}
              </div>
            )}

          {shouldShowSegment("customerSegments") && (
            <CanvasSegment
              segmentTitle="Customer Segments"
              segmentData={canvasData.customerSegments}
              handleSegmentChange={handleSegmentChange}
              extraClasses="col-span-1 w-full"
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
                  extraClasses="flex-1 w-full"
                />
              )}
              {shouldShowSegment("revenueStreams") && (
                <CanvasSegment
                  segmentTitle="Revenue Streams"
                  segmentData={canvasData.revenueStreams}
                  handleSegmentChange={handleSegmentChange}
                  extraClasses="flex-1 w-full"
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
              extraClasses="flex-1 w-full"
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
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
