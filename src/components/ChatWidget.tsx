import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { getChatSessionId } from "@/lib/chatSession";

interface Message {
  role: "bot" | "user";
  text: string;
  time: string;
}

export interface ChatWidgetHandle {
  open: () => void;
}

declare global {
  interface Window {
    __chatMessageHandler?: (data: { sessionId: string; message: string; history: { role: string; text: string }[] }) => Promise<{ reply: string }>;
  }
}

const ChatWidget = forwardRef<ChatWidgetHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [formShown, setFormShown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasIntroShown, setHasIntroShown] = useState(false); // 🔧 new state
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
    // 🔧 Show intro only once, the first time the widget is opened
    if (next && !hasIntroShown) {
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "Hey! I'm Glenn's assistant. Ask me about his skills, projects, or availability — or leave your details and he'll get back to you. 👋",
            time: now(),
          },
        ]);
        setHasIntroShown(true);
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

    if (!window.__chatMessageHandler) {
      console.warn("[ChatWidget] No __chatMessageHandler attached — message not sent.");
      return;
    }

    setIsTyping(true);
    try {
      const sessionId = getChatSessionId();
      const history = updatedMessages.map((m) => ({ role: m.role, text: m.text }));
      const result = await window.__chatMessageHandler({ sessionId, message: text, history });

      setMessages((prev) => [...prev, { role: "bot", text: result.reply, time: now() }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong. Please try again.", time: now() }]);
    } finally {
      setIsTyping(false);
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

      {/* ...rest of your component unchanged... */}
    </>
  );
});

ChatWidget.displayName = "ChatWidget";

export default ChatWidget;
