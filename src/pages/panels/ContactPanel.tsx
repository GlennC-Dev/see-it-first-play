import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";

const ContactPanel = () => {
  return (
    <div className="bg-background transition-colors duration-300">
      <ScrollReveal>
        {/* 👈 Page header banner — same treatment as About / Skills & Experience (bg-card, border-b,
            mono label + headline + subhead). Headline/subhead below are locked copy. */}
        <div className="pt-5 pb-5 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-3">
            // contact
          </div>
          <h1 className="font-serif-dm text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.05] mb-3 text-foreground transition-colors duration-300">
            Tell me what's wrong. I'll ask the rest.
          </h1>
          <p className="text-sm text-ink-soft font-light max-w-[65ch] leading-[1.7]">
            If something's breaking your day, let's talk about it. The right solution starts
            with the right questions.
          </p>
        </div>
      </ScrollReveal>

      <Contact />
    </div>
  );
};

export default ContactPanel;
