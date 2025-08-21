"use client";

import { useState, useEffect } from "react";
import DevToolsPanel from "@/components/DevToolsPanel";
import VercelNotFound from "@/components/VercelNotFound";

export default function IframeDevTools() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.key === "I" && (e.ctrlKey || e.metaKey) && e.shiftKey)
      ) {
        e.preventDefault();
        setIsDevToolsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex-1 relative min-h-0">
        <VercelNotFound />
      </div>

      <DevToolsPanel
        isOpen={isDevToolsOpen}
        onClose={() => setIsDevToolsOpen(false)}
      />
    </div>
  );
}
