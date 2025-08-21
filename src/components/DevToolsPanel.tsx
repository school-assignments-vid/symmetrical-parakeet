"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import ConsoleTab from "./tabs/ConsoleTab";
import NetworkTab from "./tabs/NetworkTab";
import SourcesTab from "./tabs/SourcesTab";

interface DevToolsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevToolsPanel({ isOpen, onClose }: DevToolsPanelProps) {
  const [activeTab, setActiveTab] = useState("console");
  const [devToolsHeight, setDevToolsHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);

  const tabs = [
    { id: "console", name: "Console", icon: ">" },
    { id: "network", name: "Network", icon: "🌐" },
    { id: "sources", name: "Sources", icon: "📁" },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newHeight = window.innerHeight - e.clientY;
      setDevToolsHeight(Math.max(200, Math.min(600, newHeight)));
    },
    [isDragging]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [handleMouseMove, isDragging]);

  return (
    <div
      className={`bg-white text-gray-900 border-t border-gray-300 flex flex-col relative ${
        isOpen ? "" : "hidden"
      }`}
      style={{
        height: isOpen ? `${devToolsHeight}px` : "0px",
      }}
    >
      <div
        className={`h-1 bg-gray-300 hover:bg-blue-500 cursor-row-resize absolute top-0 left-0 w-full z-10 ${
          isDragging ? "" : "transition-colors"
        }`}
        onMouseDown={handleMouseDown}
      />

      {/* Tabs */}
      <div className="flex bg-gray-100 border-b border-gray-300 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-r border-gray-300 hover:bg-gray-200 transition-colors ${
              activeTab === tab.id
                ? "bg-white text-blue-600 border-b-2 border-blue-500"
                : "text-gray-700"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
        <button
          onClick={onClose}
          className="ml-auto px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "console" && <ConsoleTab />}
        {activeTab === "network" && <NetworkTab />}
        {activeTab === "sources" && <SourcesTab />}
      </div>
    </div>
  );
}
