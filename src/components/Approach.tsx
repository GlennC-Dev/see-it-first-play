import { Search, Wrench, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Probe.",
    desc: "Understand the actual problem — not the one described, the real one. Requirements don't always say what they mean. I ask until they do.",
    tags: ["Requirements", "Stakeholder Interviews"],
  },
  {
    icon: Wrench,
    number: "02",
    title: "Build.",
    desc: "Design the system that solves it. Not the most complex one. The right one — reliable, maintainable, and built to last past the first week.",
    tags: ["Systems Design", "Maintainability"],
  },
  {
    icon: Zap,
    number: "03",
    title: "Automate.",
    desc: "Make it run itself. If someone still has to touch it every day, the job isn't done.",
    tags: ["Scripting", "Triggers"],
  },
];

const Approach = () => (
  <section id="approach" className="py-24 px-[5vw] bg-background transition-colors duration-300">
    <ScrollReveal>
      <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// the approach</div>
      {/* 👈 Two-line headline, line 1 bright, line 2 muted — matches the reference image's "Catch. Brew. Pour. / Always in that order." treatment. */}
      <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-14 text-foreground transition-colors duration-300">
        Probe. Build. Automate.
        <br />
        <span className="text-ink-soft">Always in that order.</span>
      </h2>
    </ScrollReveal>

    {/* 👈 3-card row. On desktop, a dashed connector + dot sits between cards (absolute-positioned track behind the icons) — hidden on mobile since cards stack. */}
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Connector track — desktop only. Positioned to cross through the icon row (top-[2.75rem] ≈ vertical center of the icon boxes). Adjust top-[] if icon box size changes. */}
      <div
        className="hidden md:block absolute top-[2.75rem] left-[calc(16.66%+1.375rem)] right-[calc(16.66%+1.375rem)] border-t-2 border-dashed border-primary/40 -z-0"
        aria-hidden="true"
      />

      {steps.map((step, i) => (
        <ScrollReveal key={step.title} delay={i * 100}>
          <div className="relative bg-card border border-border rounded-[4px] p-7 h-full overflow-hidden transition-colors duration-300 hover:border-primary/50">
            {/* Faint background number, e.g. "01" — purely decorative, matches reference. */}
            <div className="absolute top-3 right-4 font-serif-dm text-[3.2rem] leading-none text-border select-none pointer-events-none">
              {step.number}
            </div>

            <div className="relative z-[1] w-11 h-11 rounded-full bg-blue-dim border border-primary/30 flex items-center justify-center mb-5">
              <step.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>

            <div className="relative z-[1] text-lg font-semibold text-foreground mb-2">{step.title}</div>
            <p className="relative z-[1] text-[0.85rem] leading-[1.65] text-ink-soft font-light mb-5">{step.desc}</p>

            <div className="relative z-[1] flex flex-wrap gap-1.5">
              {step.tags.map((t) => (
                <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default Approach;
