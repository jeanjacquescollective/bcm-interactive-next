// File: utils/exportSession.ts
"use client";

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { CanvasSession } from "@/types/CanvasSession";
import { toast } from "sonner";
import { Note } from "@/types/NoteList";

const downloadFile = (data: BlobPart, type: string, filename: string) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const getTimestampFilename = (base: string, ext: string): string => {
  const date = new Date().toISOString().split("T")[0];
  return `${base}_${date}.${ext}`;
};

export async function exportSessionToFormat(format: string, session: CanvasSession) {
  if (format === "CSV") {
    if (!session.data) throw new Error("No session data");

    const meta = [
      ["session_id", session.id ?? ""],
      ["session_title", session.name ?? ""],
      ["session_last_saved", session.lastModified ?? ""],
      []
    ];

    const areas = Object.entries(session.data)
      .filter(([area, value]) => { console.log(area); return value?.items?.length; })
      .flatMap(([area, value]) =>
      value.items.map((item: Note) => [
        `"${area}"`,
        `"${item.id}"`,
        `"${(item.title ?? "").replace(/"/g, '""')}"`,
        `"${(item.description ?? "").replace(/"/g, '""')}"`,
        `"${item.color?.dark ?? ""}"`,
        `"${item.color?.light ?? ""}"`
      ])
      );

    const csvRows = [...meta, ["area", "id", "title", "description", "color_dark", "color_light"], ...areas];
    const csvContent = csvRows.map((row) => row.join(",")).join("\r\n");
    downloadFile(csvContent, "text/csv", getTimestampFilename("brainstorm", "csv"));
    toast.success("CSV exported successfully");
    return;
  }

  if (format === "JSON") {
    const exportObj = {
      session: {
        id: session.id,
        title: session.name,
        lastSaved: session.lastModified,
      },
      data: session.data,
    };
    downloadFile(JSON.stringify(exportObj, null, 2), "application/json", getTimestampFilename("brainstorm", "json"));
    toast.success("JSON exported successfully");
    return;
  }

  if (format === "PDF" || format === "JPG") {
    const mainDiv = document.querySelector("main") as HTMLElement;
    if (!mainDiv) throw new Error("Main content not found");

    const clone = mainDiv.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      background: "#ffffff",
      color: "#000000",
      boxShadow: "none",
      filter: "none",
      borderRadius: "0",
      padding: "32px",
      margin: "0 auto",
      width: `${mainDiv.offsetWidth}px`,
      maxWidth: "100%",
      fontSize: "1.1em",
      lineHeight: "1.5",
      overflow: "visible",
    });

    clone.querySelectorAll(".sticky").forEach(el => {
      (el as HTMLElement).style.position = "static";
    });

    clone.querySelectorAll("#session-select, nav, .no-print, .sidebar, .export-controls").forEach(el => el.remove());
    clone.querySelectorAll("div[title='Drag']").forEach(el => el.remove());
    clone.querySelectorAll("button").forEach(el => el.remove());
    clone.querySelectorAll(".note-item").forEach(el => {
      (el as HTMLElement).style.border = "1px solid #000";
    });
    clone.querySelectorAll("div.font-medium").forEach(el => {
      (el as HTMLElement).style.fontWeight = "bold";
    });
    clone.querySelectorAll("*").forEach(el => {
      const element = el as HTMLElement;
      element.style.background = "transparent";
      element.style.color = "#000000";
      element.style.boxShadow = "none";
    });

    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, {
      background: "#ffffff",
      padding: "5px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: `${mainDiv.offsetWidth}px`,
      boxSizing: "border-box",
    });

    const banner = document.createElement("h1");
    banner.textContent = session.name || "Exported Session";
    Object.assign(banner.style, {
      margin: "0 0 5px 0",
      fontSize: "2.2em",
      fontWeight: "bold",
      textAlign: "center",
      color: "#000",
    });
    wrapper.appendChild(banner);
    wrapper.appendChild(clone);

    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      top: "-9999px",
      left: "0",
      width: "100vw",
      background: "#ffffff",
    });
    container.appendChild(wrapper);
    document.body.appendChild(container);

    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#ffffff",
      useCORS: true,
      scale: 2,
      width: wrapper.scrollWidth,
      height: wrapper.scrollHeight,
    });

    document.body.removeChild(container);
    const timestamp = getTimestampFilename("brainstorm", format.toLowerCase());

    if (format === "JPG") {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.98));
      if (blob) {
        downloadFile(blob, "image/jpeg", timestamp);
        toast.success("JPG exported successfully");
      }
      return;
    }

    if (format === "PDF") {
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let y = 0;

      while (y < imgHeight) {
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight, undefined, "FAST");
        y += pageHeight;
        if (y < imgHeight) pdf.addPage();
      }

      pdf.save(timestamp);
      toast.success("PDF exported successfully");
    }
  }
}
