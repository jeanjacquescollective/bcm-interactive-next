// contexts/ManagedUIContext.tsx
"use client";

import React, { createContext, useState, useMemo, ReactNode } from "react";

interface ManagedUIContextType {
  setSegmentKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  openTimerModal: boolean;
  setOpenTimerModal: React.Dispatch<React.SetStateAction<boolean>>;

  openBrainstormModal: boolean;
  setOpenBrainstormModal: React.Dispatch<React.SetStateAction<boolean>>;

  openImportModal: boolean;
  setOpenImportModal: React.Dispatch<React.SetStateAction<boolean>>;

  showConfirmModal: boolean;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmTitle?: string;
  setConfirmTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  confirmMessage?: string;
  setConfirmMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  confirmCallback?: () => void;
  setConfirmCallback: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;

  focusedSegment?: string;
  setFocusedSegment: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ManagedUI = createContext<ManagedUIContextType | undefined>(
  undefined
);

export function ManagedUIProvider({ children }: { children: ReactNode }) {
  const [openTimerModal, setOpenTimerModal] = useState(false);
  const [openBrainstormModal, setOpenBrainstormModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);

  // ConfirmModal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState<string | undefined>();
  const [confirmMessage, setConfirmMessage] = useState<string | undefined>();
  const [confirmCallback, setConfirmCallback] = useState<
    (() => void) | undefined
  >();
  // SegmentKey state
  // eslint-disable-next-line
  const [segmentKey, setSegmentKey] = useState<string | undefined>();

  const [focusedSegment, setFocusedSegment] = useState<string | undefined>();

  const value = useMemo(
    () => ({
      setSegmentKey,
      segmentKey,
      openTimerModal,
      setOpenTimerModal,
      openBrainstormModal,
      setOpenBrainstormModal,
      openImportModal,
      setOpenImportModal,
      showConfirmModal,
      setShowConfirmModal,
      confirmTitle,
      setConfirmTitle,
      confirmMessage,
      setConfirmMessage,
      confirmCallback,
      setConfirmCallback,
      focusedSegment,
      setFocusedSegment,
    }),
    [
      setSegmentKey,
      segmentKey,
      openTimerModal,
      setOpenTimerModal,
      openBrainstormModal,
      setOpenBrainstormModal,
      openImportModal,
      setOpenImportModal,
      showConfirmModal,
      setShowConfirmModal,
      confirmTitle,
      setConfirmTitle,
      confirmMessage,
      setConfirmMessage,
      confirmCallback,
      setConfirmCallback,
      focusedSegment,
      setFocusedSegment,
    ]
  );

  return <ManagedUI.Provider value={value}>{children}</ManagedUI.Provider>;
}
