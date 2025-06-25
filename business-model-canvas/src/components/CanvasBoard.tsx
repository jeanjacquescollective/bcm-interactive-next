import React, { useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasSegment from "./CanvasSegment/CanvasSegment";
import { CanvasData } from "@/types/CanvasSession";
import CanvasModals from "./modals/canvasboard/CanvasModals";
import { CanvasUI, CanvasUIProvider } from "@/contexts/CanvasUI";
import { Note } from "@/types/CanvasSegment/NoteList";

interface CanvasBoardProps {
  canvasData: CanvasData;
  COLORS: string[];
  handleSegmentChange: (segmentKey: keyof CanvasData, items: any[], questions: string[]) => void;
  handleDragEnd: (event: { active: any; over: any }) => void;
}



const CanvasBoard: React.FC<CanvasBoardProps> = ({
  canvasData,
  handleSegmentChange,
  handleDragEnd,
}) => {
  const canvasUI = useContext(CanvasUI);
  const addNoteHandler = (note: Omit<Note, "id">) => {
    // You may want to specify which segment to add to, here using a default or context
    // For demonstration, let's add to 'brainStormArea'
    const newNote = {
      ...note,
      id: Date.now().toString(),
    };
    const segmentKey = canvasUI?.segmentKey ?? "brainStormArea";
    const segment = canvasData[segmentKey];
    handleSegmentChange(
      segmentKey,
      [...(segment?.items ?? []), newNote],
      segment?.questions ?? []
    );
    console.log("Adding note:", newNote);
  };
  return (
    <>
      <TransformWrapper panning={{ disabled: true }}>
        <TransformComponent
          wrapperStyle={{ width: "100%" }}
          contentStyle={{ width: "100%" }}
        >
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="w-full h-full rounded-lg shadow-md bg-gray-50 dark:bg-gray-900">
              {/* Top section */}
              <div className="flex flex-col md:flex-row gap-2 p-4 bg-gray-100 dark:bg-gray-800 w-full">
                {/* Key Partners */}
                <div className="flex flex-col flex-1 rounded shadow-sm bg-white dark:bg-gray-900">
                  <CanvasSegment
                    segmentTitle="Key Partners"
                    segmentData={canvasData.keyPartners}
                    handleSegmentChange={handleSegmentChange}
                  />
                </div>

                {/* Key Activities + Key Resources */}
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                    <CanvasSegment
                      segmentTitle="Key Activities"
                      segmentData={canvasData.keyActivities}
                      handleSegmentChange={handleSegmentChange}
                    />
                  </div>
                  <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                    <CanvasSegment
                      segmentTitle="Key Resources"
                      segmentData={canvasData.keyResources}
                      handleSegmentChange={handleSegmentChange}
                    />
                  </div>
                </div>

                {/* Value Propositions */}
                <div className="flex flex-col flex-2 rounded shadow-sm bg-white dark:bg-gray-900">
                  <CanvasSegment
                    segmentTitle="Value Propositions"
                    segmentData={canvasData.valuePropositions}
                    handleSegmentChange={handleSegmentChange}
                  />
                </div>

                {/* Customer Relationships + Channels */}
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                    <CanvasSegment
                      segmentTitle="Customer Relationships"
                      segmentData={canvasData.customerRelationships}
                      handleSegmentChange={handleSegmentChange}
                    />
                  </div>
                  <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                    <CanvasSegment
                      segmentTitle="Channels"
                      segmentData={canvasData.channels}
                      handleSegmentChange={handleSegmentChange}
                    />
                  </div>
                </div>

                {/* Customer Segments */}
                <div className="flex flex-col flex-1 rounded shadow-sm bg-white dark:bg-gray-900">
                  <CanvasSegment
                    segmentTitle="Customer Segments"
                    segmentData={canvasData.customerSegments}
                    handleSegmentChange={handleSegmentChange}
                  />
                </div>
              </div>

              {/* Cost Structure & Revenue Streams */}
              <div className="flex flex-col md:flex-row p-4 gap-2 bg-gray-100 dark:bg-gray-800 w-full">
                <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                  <CanvasSegment
                    segmentTitle="Cost Structure"
                    segmentData={canvasData.costStructure}
                    handleSegmentChange={handleSegmentChange}
                  />
                </div>
                <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                  <CanvasSegment
                    segmentTitle="Revenue Streams"
                    segmentData={canvasData.revenueStreams}
                    handleSegmentChange={handleSegmentChange}
                  />
                </div>
              </div>

              {/* Brainstorm Area */}
              <div className="flex p-4 shadow gap-2 bg-gray-100 dark:bg-gray-800 w-full">
                <div className="flex-1 rounded shadow-sm flex flex-col bg-white dark:bg-gray-900">
                  <CanvasSegment
                    segmentTitle="Brainstorm Area"
                    segmentData={canvasData.brainStormArea}
                    handleSegmentChange={handleSegmentChange}
                  />
                </div>
              </div>
            </div>
          </DndContext>
        </TransformComponent>
      </TransformWrapper>
      <CanvasModals addNoteHandler={addNoteHandler} />
    </>
  );
}




export default CanvasBoard;
