"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  Suspense,
} from "react";
import dynamic from "next/dynamic";
import {
  EyeOff,
  Eye,
  Globe,
  HelpCircle,
} from "react-feather";
import SidebarToggleButton from "@/components/sidebar/SidebarToggleButton";
import Tooltip from "@/components/ui/Tooltip";
import SidebarButton from "@/components/sidebar/SidebarButton";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle";
import { ManagedUI } from "@/contexts/ManagedUI";
import { CanvasData } from "@/types/CanvasSession";

// Only dynamically load dropdowns (offscreen and conditional)
const ExportDropdown = dynamic(() => import("@/components/sidebar/ExportDropdown"), {
  ssr: false,
});
const ImportDropdown = dynamic(() => import("@/components/sidebar/ImportDropdown"), {
  ssr: false,
});

// Eagerly load above-the-fold UI buttons
import TimerButton from "@/components/ui/TimerButton";
import BrainstormButton from "@/components/ui/BrainstormButton";

type HeaderProps = {
  manageCanvasesText: string;
  helpText: string;
};

const Sidebar: React.FC<HeaderProps> = ({ helpText }) => {
  const managedUI = useContext(ManagedUI);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<"export" | "import" | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-open");
    if (stored) setSideBarOpen(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-open", sideBarOpen.toString());
  }, [sideBarOpen]);

  const setDropdownHovered = useCallback((type: "export" | "import") => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredDropdown(type);
  }, []);

  const clearDropdownHovered = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 200);
  }, []);

  const getLanguageLabel = () => {
    if (typeof window === "undefined") return "Language";
    return window.location.pathname.startsWith("/nl") ? "English" : "Nederlands";
  };

  const handleLanguageChange = useCallback(() => {
    if (typeof window === "undefined") return;
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/nl")) {
      window.location.pathname = currentPath.replace(/^\/nl/, "/en");
    } else if (currentPath.startsWith("/en")) {
      window.location.pathname = currentPath.replace(/^\/en/, "/nl");
    } else {
      window.location.pathname = "/en" + currentPath;
    }
  }, []);

  const segmentOptions = React.useMemo<Array<{ key: keyof CanvasData; label: string }>>(() => [
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
  ], []);

  const handleFocusModeToggle = useCallback(() => {
    console.log("Toggling focus mode");
    if (managedUI?.focusedSegment) {
      // If already in focus mode, exit it
      managedUI.setFocusedSegment(null);
    } else {
      // Enter focus mode - start with first segment
      managedUI?.setFocusedSegment(segmentOptions[0].key);
    }
    console.log("Focus mode toggled:", managedUI?.focusedSegment);
  }, [managedUI, segmentOptions]);

  const getFocusButtonLabel = () => {
    if (managedUI?.focusedSegment) {
      const segment = segmentOptions.find(s => s.key === managedUI.focusedSegment);
      return `Focus: ${segment?.label || "Active"}`;
    }
    return "Focus Mode";
  };

  const getFocusButtonIcon = () => {
    return managedUI?.focusedSegment ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />;
  };

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-screen text-white shadow-2xl z-40 flex flex-col transition-all duration-300 box-border ${
        sideBarOpen ? "w-72" : "w-20"
      } bg-[rgba(30,30,40,0.7)] backdrop-blur-md`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <span
          className={`text-xl font-semibold tracking-wide transition-opacity duration-200 ${
            sideBarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between">
        <ul className="space-y-1 px-2 py-6">
          <li className="h-10">
            <Tooltip text="Timer">
              <TimerButton sideBarOpen={sideBarOpen} />
            </Tooltip>
          </li>

          <li className="h-10">
            <Tooltip text="Brainstorm">
              <BrainstormButton sideBarOpen={sideBarOpen} />
            </Tooltip>
          </li>

          <li className="h-10">
            <Suspense fallback={<div className="h-10 bg-zinc-700/40 rounded animate-pulse" />}>
              <ExportDropdown
                sideBarOpen={sideBarOpen}
                isOpen={hoveredDropdown === "export"}
                setHovered={() => setDropdownHovered("export")}
                clearHovered={clearDropdownHovered}
              />
            </Suspense>
          </li>

          <li className="h-10">
            <Suspense fallback={<div className="h-10 bg-zinc-700/40 rounded animate-pulse" />}>
              <ImportDropdown
                sideBarOpen={sideBarOpen}
                isOpen={hoveredDropdown === "import"}
                setHovered={() => setDropdownHovered("import")}
                clearHovered={clearDropdownHovered}
              />
            </Suspense>
          </li>

          {/* Focus Mode Button */}
          <li className="h-10">
            <Tooltip text={managedUI?.focusedSegment ? "Exit Focus Mode" : "Enter Focus Mode"}>
              <SidebarButton
                icon={getFocusButtonIcon()}
                label={getFocusButtonLabel()}
                sideBarOpen={sideBarOpen}
                onClick={handleFocusModeToggle}
                className={managedUI?.focusedSegment ? "bg-blue-600 hover:bg-blue-700" : ""}
              />
            </Tooltip>
          </li>

          <li className="h-10">
            <Tooltip text={getLanguageLabel()}>
              <SidebarButton
                icon={<Globe className="w-5 h-5" />}
                label={getLanguageLabel()}
                sideBarOpen={sideBarOpen}
                onClick={handleLanguageChange}
              />
            </Tooltip>
          </li>

          <li className="h-10">
            <Tooltip text={helpText}>
              <SidebarButton
                icon={<HelpCircle className="w-5 h-5" />}
                label={helpText}
                sideBarOpen={sideBarOpen}
                ariaLabel="Help"
              />
            </Tooltip>
          </li>

          <li className="px-3 py-2">
            <ColorSchemeToggle sideBarOpen={sideBarOpen} />
          </li>
        </ul>
      </nav>

      {sideBarOpen && <SidebarFooter />}

      <SidebarToggleButton
        sideBarOpen={sideBarOpen}
        onClick={() => setSideBarOpen((prev) => !prev)}
        aria-controls="sidebar"
      />
    </aside>
  );
};

export default Sidebar;