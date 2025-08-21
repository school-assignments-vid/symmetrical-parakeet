"use client";

import React from "react";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { sourcesData, type SourceFile } from "@/data/sourcesData";

export default function SourcesTab() {
  const [selectedFile, setSelectedFile] = useState<SourceFile | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["public/"])
  );
  const [explorerWidth, setExplorerWidth] = useState(33);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      const clampedWidth = Math.min(Math.max(newWidth, 20), 80);
      setExplorerWidth(clampedWidth);
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileContent = (file: SourceFile) => {
    if (file.requiresExternal) {
      return (
        <div className="border border-gray-300 rounded-lg bg-white p-6 flex flex-col items-center max-w-2xl mx-auto">
          <span className="text-orange-600 font-semibold mb-2">
            This file requires an external application to view.
          </span>
          {file.url && (
            <div className="flex gap-2 justify-center mt-2">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors shadow"
              >
                Open Externally
              </a>
              <a
                href={file.url}
                download
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors shadow"
              >
                Download
              </a>
            </div>
          )}
        </div>
      );
    }

    if (file.assetType === "image" && file.url) {
      return (
        <div className="max-w-2xl mx-auto">
          <Image
            src={file.url || "/placeholder.svg"}
            alt={file.name}
            width={800}
            height={600}
            className="max-w-full max-h-96 mx-auto object-contain"
          />
        </div>
      );
    }

    if (file.assetType === "video" && file.url) {
      return (
        <div className="max-w-2xl mx-auto">
          <video
            src={file.url}
            controls
            className="max-w-full max-h-96 mx-auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (file.assetType === "iframe" && file.url) {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="h-96 w-full border border-gray-300">
            <iframe
              src={file.url}
              className="w-full h-full rounded"
              title={file.name}
            />
          </div>
        </div>
      );
    }

    if (file.content) {
      return (
        <div className="max-w-2xl mx-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
            {file.content}
          </pre>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <span className="text-orange-600 font-semibold mb-2">
          Preview not supported for this file type
        </span>
      </div>
    );
  };

  const getExtension = (name: string) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop() : "";
  };

  const renderFileTree = (items: SourceFile[], level = 0) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <div
          className={`grid grid-cols-3 gap-2 items-center text-sm hover:bg-gray-100 px-2 py-1 border-b border-gray-200 cursor-pointer ${
            selectedFile === item ? "bg-blue-100" : ""
          }`}
          style={{ paddingLeft: `${level * 8 + 8}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.name + "/");
            } else {
              setSelectedFile(item);
            }
          }}
        >
          <span
            className={
              item.type === "folder"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 font-mono truncate col-span-1"
            }
          >
            {item.name}
          </span>
          <span className="text-xs text-gray-500 text-left col-span-1">
            {item.type === "file" ? getExtension(item.name) : ""}
          </span>
          <span className="text-xs text-gray-500 text-right col-span-1">
            {item.type === "file" ? item.size : ""}
          </span>
        </div>
        {item.children &&
          item.type === "folder" &&
          expandedFolders.has(item.name + "/") && (
            <div>{renderFileTree(item.children, level + 1)}</div>
          )}
      </React.Fragment>
    ));
  };

  return (
    <div className="h-full flex" ref={containerRef}>
      <div
        className="border-r border-gray-300 overflow-y-auto bg-gray-50"
        style={{ width: `${explorerWidth}%` }}
      >
        <div className="grid grid-cols-3 gap-2 p-2 text-xs text-gray-600 border-b border-gray-300 bg-gray-100 font-semibold">
          <span className="">Name</span>
          <span className="">Extension</span>
          <span className="text-right">Size</span>
        </div>
        <div>{renderFileTree(sourcesData)}</div>
      </div>

      <div
        className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize flex-shrink-0"
        onMouseDown={handleMouseDown}
      />

      <div
        className="p-4 bg-gray-50 overflow-y-auto"
        style={{ width: `${100 - explorerWidth}%` }}
      >
        {selectedFile ? (
          <div>{renderFileContent(selectedFile)}</div>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            <div className="text-2xl mb-2">📝</div>
            <p>Select a file to view its contents</p>
            <p className="text-sm mt-2">Portfolio source code and assets</p>
          </div>
        )}
      </div>
    </div>
  );
}
