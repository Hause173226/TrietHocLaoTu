import React, { useEffect, useState } from "react";
import ChatBoxClient from "./ChatBoxClient";

const FloatingChat: React.FC = () => {
  const [open, setOpen] = useState(false);

  // optional: close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {open && (
        <div className="w-80 sm:w-96 md:w-[420px]">
          <div className="bg-white rounded-xl shadow-xl border overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
              <div className="text-sm font-medium text-gray-800">
                Hỏi đáp triết học
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Minimize"
                  className="text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-3">
              <ChatBoxClient />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((s) => !s)}
        className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg flex items-center justify-center focus:outline-none"
        title="Chat triết học"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default FloatingChat;
