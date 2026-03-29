import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Expose this function globally so n8n or external integrations can hook into form submissions
declare global {
  interface Window {
    __contactFormHandler?: (data: { name: string; email: string; message: string }) => Promise<{ success: boolean; message?: string }>;
  }
}

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");

    try {
      if (window.__contactFormHandler) {
        const result = await window.__contactFormHandler({ name: name.trim(), email: email.trim(), message: message.trim() });
        if (result.success) {
          setStatus("sent");
          setTimeout(() => {
            onOpenChange(false);
            setStatus("idle");
            setName("");
            setEmail("");
            setMessage("");
          }, 2500);
        } else {
          setStatus("error");
        }
      } else {
        // Default: just simulate success
        console.log("[ContactForm] Submission (no handler attached):", { name, email, message });
        setStatus("sent");
        setTimeout(() => {
          onOpenChange(false);
          setStatus("idle");
          setName("");
          setEmail("");
          setMessage("");
        }, 2500);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif-dm text-[1.4rem] text-foreground">Send me a message</DialogTitle>
          <DialogDescription className="text-ink-soft text-[0.85rem]">
            Fill in your details and I'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {status === "sent" ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">✓</div>
            <div className="text-foreground font-medium">Message sent!</div>
            <div className="text-ink-soft text-[0.85rem] mt-1">I'll get back to you soon.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div>
              <label className="font-mono-dm text-[0.68rem] tracking-[0.12em] uppercase text-ink-muted mb-1.5 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                placeholder="Your name"
                className="w-full border border-border rounded-sm px-3.5 py-2.5 text-[0.85rem] text-foreground bg-background outline-none focus:border-primary transition-colors duration-200"
              />
            </div>
            <div>
              <label className="font-mono-dm text-[0.68rem] tracking-[0.12em] uppercase text-ink-muted mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                placeholder="your@email.com"
                className="w-full border border-border rounded-sm px-3.5 py-2.5 text-[0.85rem] text-foreground bg-background outline-none focus:border-primary transition-colors duration-200"
              />
            </div>
            <div>
              <label className="font-mono-dm text-[0.68rem] tracking-[0.12em] uppercase text-ink-muted mb-1.5 block">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={1000}
                placeholder="What would you like to work on?"
                rows={4}
                className="w-full border border-border rounded-sm px-3.5 py-2.5 text-[0.85rem] text-foreground bg-background outline-none resize-none focus:border-primary transition-colors duration-200"
              />
            </div>
            {status === "error" && (
              <div className="text-[0.8rem] text-destructive">Something went wrong. Please try again.</div>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-primary text-primary-foreground border-none py-3 text-[0.85rem] font-medium cursor-pointer rounded-sm hover:brightness-110 transition-all duration-200 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
