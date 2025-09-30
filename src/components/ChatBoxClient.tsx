import React, { useEffect, useRef, useState } from "react";
import { Send, MessageCircle, KeyRound } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Kiểu message đơn giản
export type Msg = { role: "user" | "assistant"; text: string };

// ⭐ Bản nhanh hơn
const GEMINI_MODEL = "gemini-2.5-flash-lite";

const ChatBoxClient: React.FC = () => {
  // Đọc API key từ .env (Vite chỉ expose biến có prefix VITE_)
  const apiKey = import.meta.env?.VITE_GEMINI_KEY as string | undefined;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Xin chào! 👋 Tôi là trợ lý AI chuyên về triết học. Bạn có câu hỏi gì về triết học Lão Tử không?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Xin chào! 👋 Tôi là trợ lý AI chuyên về triết học. Bạn có câu hỏi gì về triết học Lão Tử không?",
      },
    ]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    if (!apiKey) {
      setMessages((m) => [
        ...m,
        { role: "user", text },
        {
          role: "assistant",
          text: "❌ Không tìm thấy API key Gemini. Hãy thêm VITE_GEMINI_KEY vào file .env và khởi động lại dev server.",
        },
      ]);
      setInput("");
      return;
    }

    // Push user message
    const next = [...messages, { role: "user", text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

      const system =
        "Bạn là chuyên gia triết học, đặc biệt là triết học Lão Tử. Trả lời ngắn gọn, dễ hiểu, đúng mực, tránh markdown đậm/italic.";
      const prompt = `${system}\n\nCâu hỏi: ${text}`;

      // Tạo khung tin nhắn rỗng để stream dần
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", text: "" }]);

      const stream = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 256, // giới hạn để nhanh hơn
          temperature: 0.3,
          topK: 32,
          topP: 0.9,
          responseMimeType: "text/plain", // tránh markdown nặng
        },
      });

      for await (const chunk of stream.stream) {
        const piece = chunk?.text() ?? "";
        if (piece) {
          acc += piece;
          // cập nhật bubble cuối cùng (assistant) theo thời gian thực
          setMessages((m) => {
            const copy = [...m];
            const last = copy[copy.length - 1];
            if (last && last.role === "assistant") last.text = acc;
            return copy;
          });
        }
      }

      // Nếu vẫn rỗng (bị chặn/safety), fallback thông báo
      if (!acc.trim()) {
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant")
            last.text = "⚠️ Không có phản hồi (có thể do bộ lọc an toàn).";
          return copy;
        });
      }
    } catch (err: any) {
      console.error("ChatBoxClient error:", err);
      const msg = err?.message || String(err) || "Không xác định";
      // Ghi lỗi vào bubble cuối cùng nếu đang stream
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant" && !last.text) {
          last.text = `⚠️ Lỗi gọi Gemini: ${msg}`;
          return copy;
        }
        return [
          ...copy,
          { role: "assistant", text: `⚠️ Lỗi gọi Gemini: ${msg}` },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[560px] bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-2xl shadow">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Trợ lý Triết học AI</span>
        </div>
        <button
          onClick={clearChat}
          className="text-xs bg-teal-700 hover:bg-teal-800 px-2 py-1 rounded transition-colors"
        >
          Xóa chat
        </button>
      </div>

      {!apiKey && (
        <div className="px-3 py-2 bg-amber-50 text-amber-800 text-xs flex items-center gap-2 border-b border-amber-200">
          <KeyRound className="w-4 h-4" />
          <div>
            Chưa tìm thấy <span className="font-semibold">VITE_GEMINI_KEY</span>
            . Thêm vào file <code>.env</code> rồi khởi động lại dev server.
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        ref={boxRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[340px]"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-line ${
                m.role === "user"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-sm shadow-md"
                  : "bg-white text-slate-800 shadow border border-gray-200 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập câu hỏi về triết học..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-[15px]"
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-4 py-2 rounded-full transition-colors flex items-center justify-center shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxClient;
