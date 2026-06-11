import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ContactFormDialog from "./ContactFormDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: replace with your real Google Drive share URLs
const RESUME_HUMAN_URL = "https://drive.google.com/file/d/REPLACE_WITH_HUMAN_FILE_ID/view?usp=sharing";
const RESUME_ATS_URL = "https://drive.google.com/file/d/REPLACE_WITH_ATS_FILE_ID/view?usp=sharing";

const Contact = ({ onOpenChat }: { onOpenChat: () => void }) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="py-24 px-[5vw] bg-foreground text-background transition-colors duration-300 dark:bg-[#0a0a09]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-[#6699ff] mb-4">// get in touch</div>
          <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-4 text-[#f0f0ee]">Let's build something that runs itself.</h2>
          <p className="text-[0.95rem] text-[#aaa] font-light leading-[1.7] mb-10">
            Open to automation consulting, BI projects, and full-time opportunities. Based in Manila, Philippines — available for remote collaboration worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center text-base flex-shrink-0">📍</div>
              <div className="text-[0.9rem] text-[#ccc]">Manila, Philippines</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center text-base flex-shrink-0">📞</div>
              <div className="text-[0.9rem] text-[#ccc]">(+63) 123-456-7890</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center text-base flex-shrink-0">✉️</div>
              <div className="text-[0.9rem] text-[#ccc]">
                <a href="mailto:12345@gmail.com" className="text-[#6699ff] no-underline hover:underline">12345@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#ccc]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div className="text-[0.9rem] text-[#ccc]">
                <a href="https://linkedin.com/in/gdelacruz" target="_blank" rel="noopener noreferrer" className="text-[#6699ff] no-underline hover:underline">linkedin/gdelacruz</a>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[4px] p-10">
            <h3 className="font-serif-dm text-[1.6rem] text-[#f0f0ee] mb-3">Ready to automate?</h3>
            <p className="text-[0.85rem] text-[#aaa] leading-[1.65] font-light mb-8">Whether it's a reporting bottleneck, a data pipeline, or a full workflow overhaul — let's talk about what we can build together.</p>
            <button
              onClick={() => setFormOpen(true)}
              className="w-full bg-[rgba(255,255,255,0.08)] text-[#f0f0ee] border border-[rgba(255,255,255,0.15)] py-4 text-[0.9rem] font-medium cursor-pointer rounded-sm hover:bg-[rgba(255,255,255,0.12)] transition-all duration-200 text-center mb-3"
            >
              ✉️ Send me a message
            </button>
            <button onClick={onOpenChat} className="w-full bg-primary text-primary-foreground border-none py-4 text-[0.9rem] font-medium cursor-pointer rounded-sm hover:brightness-110 transition-all duration-200 text-center mb-3">
              Open chat assistant →
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full bg-[rgba(255,255,255,0.08)] text-[#f0f0ee] border border-[rgba(255,255,255,0.15)] py-4 text-[0.9rem] font-medium cursor-pointer rounded-sm hover:bg-[rgba(255,255,255,0.12)] transition-all duration-200 text-center inline-flex items-center justify-center gap-2">
                📄 Download Resume
                <span className="text-[0.7rem] opacity-70">▾</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[#1a1a18] border border-[rgba(255,255,255,0.12)] text-[#f0f0ee]">
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
          </div>
        </ScrollReveal>
      </div>

      <ContactFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default Contact;
