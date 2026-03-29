import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
  time: string;
}

export interface ChatWidgetHandle {
  open: () => void;
}

// Expose this globally so n8n or external integrations can hook into chat messages
declare global {
  interface Window {
    __chatMessageHandler?: (data: { message: string; history: { role: string; text: string }[] }) => Promise<{ reply: string }>;
  }
}

const ChatWidget = forwardRef<ChatWidgetHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [formShown, setFormShown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (!isOpen) toggleChat();
    },
  }));

  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const toggleChat = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ role: "bot", text: "Hey! I'm Glenn's assistant. Ask me about his skills, projects, or availability — or leave your details and he'll get back to you. 👋", time: now() }]);
      }, 400);
    }
  };

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    const updatedMessages = [...messages, { role: "user" as const, text, time: now() }];
    setMessages(updatedMessages);

    const shouldShowForm = /hire|work|contact|reach|available|project|consult|freelance|email|message/i.test(text);

    // If an external handler (n8n) is attached, use it
    if (window.__chatMessageHandler) {
      setIsTyping(true);
      try {
        const history = updatedMessages.map((m) => ({ role: m.role, text: m.text }));
        const result = await window.__chatMessageHandler({ message: text, history });
        setMessages((prev) => [...prev, { role: "bot", text: result.reply, time: now() }]);
      } catch {
        setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong. Please try again.", time: now() }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Default fallback response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Thanks for reaching out! Glenn specializes in automation, BI dashboards, and workflow optimization. Feel free to leave your contact details and he'll get back to you soon! 🚀", time: now() },
        ]);
        if (shouldShowForm && !formShown) setFormShown(true);
      }, 1000);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        aria-label="Open chat"
        className="fixed bottom-8 right-8 z-[1000] w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer border-none shadow-[0_4px_24px_rgba(26,108,255,0.4)] hover:scale-[1.08] transition-transform duration-200 text-xl"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      <div className={`fixed bottom-[6.5rem] right-8 z-[999] w-[360px] max-h-[540px] bg-card rounded-xl border border-border shadow-[0_16px_64px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all duration-[250ms] ${isOpen ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "translate-y-4 scale-[0.97] opacity-0 pointer-events-none"}`}>
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-[2.2rem] h-[2.2rem] rounded-full bg-[rgba(255,255,255,0.2)] flex items-center justify-center text-[0.85rem] font-semibold flex-shrink-0">G</div>
          <div className="flex-1">
            <div className="text-[0.9rem] font-semibold">Glenn's Assistant</div>
            <div className="text-[0.72rem] opacity-80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dffb0] inline-block" />
              Online now
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background transition-colors duration-300">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[82%] flex flex-col gap-1 ${m.role === "user" ? "self-end" : "self-start"}`}>
              <div className={`px-3.5 py-2.5 rounded-[10px] text-[0.85rem] leading-[1.5] ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-[3px]" : "bg-card border border-border text-foreground rounded-bl-[3px] transition-colors duration-300"}`}>
                {m.text}
              </div>
              <div className={`text-[0.68rem] text-ink-muted font-mono-dm ${m.role === "user" ? "text-right" : ""}`}>{m.time}</div>
            </div>
          ))}
          {isTyping && (
            <div className="self-start max-w-[82%]">
              <div className="bg-card border border-border text-foreground rounded-[10px] rounded-bl-[3px] px-3.5 py-2.5 text-[0.85rem]">
                <span className="animate-pulse">Typing…</span>
              </div>
            </div>
          )}
          {formShown && !formSubmitted && (
            <div className="self-start max-w-[82%]">
              <div className="bg-card border border-border rounded-[10px] p-3.5 transition-colors duration-300">
                <div className="text-[0.78rem] font-semibold text-foreground mb-2.5">Leave your details and Glenn will reach out:</div>
                <input type="text" placeholder="Your name" className="w-full border border-border rounded px-3 py-2 text-[0.8rem] text-foreground bg-background mb-2 outline-none focus:border-primary transition-colors duration-200" />
                <input type="text" placeholder="Email or phone" className="w-full border border-border rounded px-3 py-2 text-[0.8rem] text-foreground bg-background mb-2 outline-none focus:border-primary transition-colors duration-200" />
                <textarea placeholder="What would you like to work on?" className="w-full border border-border rounded px-3 py-2 text-[0.8rem] text-foreground bg-background mb-2 outline-none resize-none h-16 focus:border-primary transition-colors duration-200" />
                <button
                  onClick={() => setFormSubmitted(true)}
                  className="w-full bg-primary text-primary-foreground border-none rounded py-2 text-[0.8rem] font-medium cursor-pointer hover:brightness-110 transition-all duration-200"
                >
                  Send to Glenn →
                </button>
              </div>
            </div>
          )}
          {formSubmitted && (
            <div className="self-start max-w-[82%]">
              <div className="text-[0.8rem] text-[#1a6b3c] bg-[#d6ffe6] rounded px-3 py-2 text-center">
                ✓ Message sent! Glenn will be in touch soon.
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border flex gap-2 flex-shrink-0 bg-card transition-colors duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything…"
            className="flex-1 border border-border rounded-[20px] px-4 py-2 text-[0.85rem] text-foreground bg-background outline-none focus:border-primary transition-colors duration-200"
          />
          <button onClick={sendMessage} className="bg-primary text-primary-foreground border-none rounded-full w-[2.2rem] h-[2.2rem] cursor-pointer flex items-center justify-center text-[0.9rem] flex-shrink-0 hover:brightness-110 transition-all duration-200">
            ➤
          </button>
        </div>
      </div>
    </>
  );
});

ChatWidget.displayName = "ChatWidget";

export default ChatWidget;
