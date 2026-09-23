import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Facebook, Linkedin, Github, FileDown, ChevronDown, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: replace with your real Google Drive share URLs
const RESUME_HUMAN_URL = "https://drive.google.com/file/d/REPLACE_WITH_HUMAN_FILE_ID/view?usp=sharing";
const RESUME_ATS_URL = "https://drive.google.com/file/d/REPLACE_WITH_ATS_FILE_ID/view?usp=sharing";

// 👈 Contact info placeholders — swap these for your real details. Kept as plain constants up
// top (instead of scattered inline) so they're easy to find and edit in one place.
const CONTACT_EMAIL = "you@example.com"; // 👈 swap for your real email
const SOCIAL_LINKS = {
  facebook: "https://facebook.com/REPLACE_WITH_YOUR_HANDLE", // 👈 swap in your real Facebook URL
  linkedin: "https://linkedin.com/in/REPLACE_WITH_YOUR_HANDLE", // 👈 swap in your real LinkedIn URL
  github: "https://github.com/REPLACE_WITH_YOUR_HANDLE", // 👈 swap in your real GitHub URL
};

// 👈 "What happens next" 3-step copy — pulled straight from the brewedops inspo screenshot as a
// placeholder (still in his register: "leads", etc.). Swap in your own process/wording whenever.
const STEPS = [
  {
    n: "01",
    title: "You write.",
    body: "Four fields. What is eating your week is enough.",
  },
  {
    n: "02",
    title: "I read it the same day.",
    body: "A real reply, not an autoresponder. One business day, usually faster.",
  },
  {
    n: "03",
    title: "You get a plan or a straight no.",
    body: "If I can automate it you get the plan. If I cannot, I will say so.",
  },
];

// Expose this function globally so n8n or external integrations can hook into form submissions
declare global {
  interface Window {
    __contactFormHandler?: (data: { name: string; email: string; message: string }) => Promise<{ success: boolean; message?: string }>;
  }
}

const Contact = () => {
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
    <section className="py-14 px-[5vw]">
      <ScrollReveal>
        {/* 👈 Nested-card layout: outer "shell" card (rounded-2xl border, bg-card, padded) just
            frames and spaces the two real cards inside it — the shell itself has no other job.
            The two inner cards each get their own full border + rounded corners and sit side by
            side via grid-cols-2, forced from md up so they read as beside-each-other on desktop;
            below md they'll still stack for now until the dedicated mobile pass happens. */}
        <div className="rounded-2xl border border-border bg-card p-3 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left card: "What happens next" — forced dark in both light AND dark mode
                (bg-foreground happens to resolve dark in light mode; dark:bg-[#0a0a09] pins it
                dark in dark mode too) so it doesn't wash out against the theme-aware shell. */}
            <div className="rounded-xl border border-[rgba(255,255,255,0.14)] bg-foreground dark:bg-[#0a0a09] text-[#f0f0ee] p-8 md:p-10 flex flex-col transition-colors duration-300">
            <div className="font-mono-dm text-[0.68rem] tracking-[0.16em] uppercase text-primary mb-4">
              What happens next
            </div>
            <h2 className="font-serif-dm text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] mb-8">
              <span className="block text-[#f0f0ee]">Three steps.</span>
              <span className="block text-[#8a8a86]">No sales call to sit through.</span>
            </h2>

            <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.1)] border-t border-[rgba(255,255,255,0.1)] mb-8">
              {STEPS.map((s) => (
                <div key={s.n} className="py-4 flex gap-4">
                  <div className="font-mono-dm text-[0.7rem] text-primary shrink-0 pt-0.5">{s.n}</div>
                  <div>
                    <div className="text-[0.95rem] font-semibold text-[#f0f0ee] mb-1">{s.title}</div>
                    <div className="text-[0.82rem] text-[#999] font-light leading-[1.6]">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 👈 Pushes the pills/socials to the bottom of the panel regardless of step-list height. */}
            <div className="mt-auto flex flex-col gap-3">
              {/* 👈 Download Resume pill — was the resume dropdown from the old CTA stack, moved here
                  per your note. Opens the same Human-friendly / ATS-friendly menu as before. */}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-fit inline-flex items-center gap-2 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] rounded-full pl-4 pr-3.5 py-2 text-[0.8rem] font-medium text-[#f0f0ee] hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200">
                  <FileDown className="w-3.5 h-3.5" />
                  Download Resume
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-[#1a1a18] border border-[rgba(255,255,255,0.12)] text-[#f0f0ee]">
                  <DropdownMenuItem asChild>
                    <a
                      href={RESUME_HUMAN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex flex-col items-start gap-0.5 py-2.5 focus:bg-[rgba(255,255,255,0.08)]"
                    >
                      <span className="text-[0.9rem]">Human-friendly version</span>
                      <span className="text-[0.7rem] text-[#888]">For hiring managers & recruiters</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={RESUME_ATS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex flex-col items-start gap-0.5 py-2.5 focus:bg-[rgba(255,255,255,0.08)]"
                    >
                      <span className="text-[0.9rem]">ATS-friendly version</span>
                      <span className="text-[0.7rem] text-[#888]">For applicant tracking systems</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] rounded-full pl-4 pr-4 py-2 text-[0.8rem] font-medium text-[#f0f0ee] no-underline hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {CONTACT_EMAIL}
                </a>

                {/* 👈 Social row — Facebook / LinkedIn / GitHub per your call. URLs are placeholders
                    up top in SOCIAL_LINKS — swap those, icons stay the same. */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#f0f0ee] hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#f0f0ee] hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#f0f0ee] hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right card: inline form (was a modal before — now sits directly on the page per your
              call). bg-background (not bg-card) so it reads as visually distinct from the bg-card shell. */}
          <div className="rounded-xl border border-border bg-background p-8 md:p-10 transition-colors duration-300">
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-2xl mb-2">✓</div>
                <div className="text-foreground font-medium">Message sent!</div>
                <div className="text-ink-soft text-[0.85rem] mt-1">I'll get back to you soon.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="font-mono-dm text-[0.68rem] tracking-[0.12em] uppercase text-ink-muted mb-1.5 block">
                    Your Name
                  </label>
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
                  <label className="font-mono-dm text-[0.68rem] tracking-[0.12em] uppercase text-ink-muted mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    placeholder="you@yourbusiness.com"
                    className="w-full border border-border rounded-sm px-3.5 py-2.5 text-[0.85rem] text-foreground bg-background outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="font-mono-dm text-[0.68rem] tracking-[0.12em] uppercase text-ink-muted mb-1.5 block">
                    Tell Me More About Your Business
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={1000}
                    placeholder="What is the bottleneck? Where do leads stop? What are you running it on?"
                    rows={7}
                    className="w-full border border-border rounded-sm px-3.5 py-2.5 text-[0.85rem] text-foreground bg-background outline-none resize-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                {status === "error" && (
                  <div className="text-[0.8rem] text-destructive">Something went wrong. Please try again.</div>
                )}
                {/* 👈 Caption line still copied straight from the inspo screenshot as a placeholder —
                    swap it whenever you're ready. Button now reads "Submit" and fires through the
                    exact same window.__contactFormHandler({ name, email, message }) call the old
                    modal form used, so your n8n hook doesn't need any changes on its end. */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-none px-6 py-3 text-[0.85rem] font-medium cursor-pointer rounded-full hover:brightness-110 transition-all duration-200 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Submit"}
                  </button>
                  <span className="text-[0.78rem] text-ink-muted font-light">
                    One business day. No newsletter, no drip.
                  </span>
                </div>
              </form>
            )}
          </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Contact;
