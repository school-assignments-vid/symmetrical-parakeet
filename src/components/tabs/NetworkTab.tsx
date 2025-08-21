import { useState } from "react";
import { networkCalls } from "@/data/networkData";

type SortField = "url" | "method" | "status" | "size" | "time" | "type";
type SortDirection = "asc" | "desc";

export default function NetworkTab() {
  const [selectedCall, setSelectedCall] = useState<
    (typeof networkCalls)[0] | null
  >(null);
  const [sortField, setSortField] = useState<SortField>("url");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCalls = [...networkCalls].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (sortField === "time") {
      aValue = Number.parseInt(a.time.replace("ms", ""));
      bValue = Number.parseInt(b.time.replace("ms", ""));
    } else if (sortField === "size") {
      aValue = Number.parseFloat(a.size.replace("KB", ""));
      bValue = Number.parseFloat(b.size.replace("KB", ""));
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const openInNewTab = (response: unknown) => {
    const jsonString = JSON.stringify(response, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  function syntaxHighlightJSON(json: string) {
    if (typeof json !== "string") {
      json = JSON.stringify(json, null, 2);
    }
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = "text-gray-700";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-blue-700"; // key
          } else {
            cls = "text-green-700"; // string value
          }
        } else if (/true|false/.test(match)) {
          cls = "text-purple-700";
        } else if (/null/.test(match)) {
          cls = "text-pink-700";
        } else if (/^-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?$/.test(match)) {
          cls = "text-orange-700";
        }
        return `<span class='${cls}'>${match}</span>`;
      }
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2 p-2 text-xs text-gray-600 border-b border-gray-300 bg-gray-100">
            <button
              onClick={() => handleSort("url")}
              className="text-left hover:text-blue-700"
            >
              Name
              {sortField === "url" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("method")}
              className="text-left hover:text-blue-700"
            >
              Method
              {sortField === "method" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("status")}
              className="text-left hover:text-blue-700"
            >
              Status
              {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("type")}
              className="text-left hover:text-blue-700"
            >
              Type
              {sortField === "type" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("size")}
              className="text-left hover:text-blue-700"
            >
              Size
              {sortField === "size" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("time")}
              className="text-left hover:text-blue-700"
            >
              Time
              {sortField === "time" && (sortDirection === "asc" ? "↑" : "↓")}
            </button>
          </div>

          {sortedCalls.map((call, index) => (
            <div
              key={index}
              onClick={() => setSelectedCall(call)}
              className={`grid grid-cols-6 gap-2 p-2 text-xs hover:bg-gray-100 border-b border-gray-200 cursor-pointer ${
                selectedCall === call ? "bg-blue-100" : ""
              }`}
            >
              <span className="text-blue-700 truncate">{call.url}</span>
              <span
                className={`${
                  call.method === "GET" ? "text-green-700" : "text-yellow-700"
                }`}
              >
                {call.method}
              </span>
              <span
                className={`${
                  call.status === 200 || call.status === 201
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {call.status}
              </span>
              <span className="text-gray-600">{call.type}</span>
              <span className="text-gray-700">{call.size}</span>
              <span className="text-gray-700">{call.time}</span>
            </div>
          ))}
        </div>

        {selectedCall && (
          <div className="w-1/3 border-l border-gray-300 bg-gray-50 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-blue-700">
                Request Details
              </h3>
              <button
                onClick={() => openInNewTab(selectedCall.response)}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors"
              >
                Open in New Tab
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-600">URL:</span>
                <div className="text-blue-700 font-mono break-all">
                  {selectedCall.url}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Method:</span>
                <div className="text-green-700">{selectedCall.method}</div>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <div className="text-green-700">{selectedCall.status}</div>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <div className="text-gray-700">{selectedCall.type}</div>
              </div>
              <div>
                <span className="text-gray-600">Response:</span>
                <div className="bg-white p-3 rounded-md font-mono text-gray-700 mt-2 border border-gray-200 max-h-64 overflow-y-auto">
                  <pre
                    className="text-xs whitespace-pre-wrap"
                    style={{ fontFamily: "Menlo, Monaco, Consolas, monospace" }}
                    dangerouslySetInnerHTML={{
                      __html: syntaxHighlightJSON(
                        JSON.stringify(selectedCall.response, null, 2)
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
