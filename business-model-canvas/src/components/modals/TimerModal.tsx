"use client";
import React, { useState, useRef, useEffect } from "react";
import { Clock, MoreVertical } from "react-feather";
import { useDraggable } from "@dnd-kit/core";
import CloseButton from "@/components/ui/CloseButton";
import DragHandle from "../ui/DragHandle";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const MAX_TIME = 60 * 60;

const TimerModal: React.FC<{
  onClose: () => void;
  position: { x: number; y: number };
}> = ({ onClose, position }) => {
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { listeners, transform, isDragging } =
    useDraggable({ id: "timer-modal" });

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const style = {
    position: "absolute" as const,
    top: position.y,
    left: position.x,
    transform:
      transform && isDragging
        ? `translate(${transform.x}px, ${transform.y}px)`
        : "none",
    zIndex: 9999,
  };

  return (
    <div
      style={style}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Drag handle (MoreVertical as grip) */}
        <DragHandle
          listeners={listeners}
          showDragHandle={true}
        />

        {/* Clock icon (larger) */}
        <Clock className="w-8 h-8 text-gray-900 dark:text-white" />

        {/* Close button */}
        <CloseButton onClose={onClose} title="Close Timer" />
      </div>

      <div className="flex flex-col items-center select-none">
        <div className="text-4xl font-mono mb-4 text-gray-900 dark:text-white">{formatTime(seconds)}</div>

        {/* Time adjustment buttons */}
        <div className="flex gap-2 mb-4">
          <button
            className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-900 dark:text-white"
            disabled={running}
            onClick={() => setSeconds((s) => Math.min(MAX_TIME, s + 60))}
          >
            +1 min
          </button>
          <button
            className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-900 dark:text-white"
            disabled={running}
            onClick={() => setSeconds((s) => Math.min(MAX_TIME, s + 300))}
          >
            +5 min
          </button>
        </div>

        {/* Start/Pause & Reset */}
        <div className="flex gap-2">
          <button
            className="px-4 py-1 bg-green-700 dark:bg-green-700 rounded hover:bg-green-600 dark:hover:bg-green-600 transition text-white"
            onClick={() => setRunning((r) => !r)}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            className="px-4 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition text-gray-900 dark:text-white"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
