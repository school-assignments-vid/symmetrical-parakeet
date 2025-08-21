"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

export default function ConsoleTab() {
  const [consoleOutput, setConsoleOutput] = useState<
    Array<{
      type: "log" | "error" | "warn";
      message: string;
      timestamp: string;
    }>
  >([
    {
      type: "log",
      message: "> Console initialized",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [consoleInput, setConsoleInput] = useState("");
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString();

    setConsoleOutput((prev) => [
      ...prev,
      {
        type: "log",
        message: `> ${consoleInput}`,
        timestamp,
      },
    ]);

    setTimeout(() => {
      let response = "";
      try {
        if (consoleInput === "clear") {
          setConsoleOutput([]);
          setConsoleInput("");
          return;
        }

        response = eval(consoleInput)?.toString() || "undefined";
      } catch (error) {
        response = `Error: ${error}`;
        setConsoleOutput((prev) => [
          ...prev,
          {
            type: "error",
            message: response,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        setConsoleInput("");
        return;
      }

      setConsoleOutput((prev) => [
        ...prev,
        {
          type: "log",
          message: response,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setConsoleInput("");
    }, 100);
  };

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 font-mono text-sm bg-gray-50">
        {consoleOutput.map((entry, index) => (
          <div key={index} className="mb-1 flex">
            <span className="text-gray-600 text-xs mr-2 mt-0.5">
              {entry.timestamp}
            </span>
            <span
              className={`$${
                entry.type === "error"
                  ? "text-red-600"
                  : entry.type === "warn"
                  ? "text-yellow-700"
                  : "text-gray-800"
              }`}
            >
              {entry.message}
            </span>
          </div>
        ))}
        <div ref={consoleEndRef} />
      </div>
      <form
        onSubmit={handleConsoleSubmit}
        className="border-t bg-gray-100 border-gray-300 p-2"
      >
        <div className="flex items-center">
          <span className="text-blue-700 mr-2 font-mono">{">"}</span>
          <input
            type="text"
            value={consoleInput}
            onChange={(e) => setConsoleInput(e.target.value)}
            placeholder="Enter JavaScript..."
            className="flex-1 bg-transparent text-gray-800 font-mono text-sm outline-none"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}
