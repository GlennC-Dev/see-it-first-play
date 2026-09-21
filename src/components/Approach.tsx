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
  // 👈 py-14 = top+bottom padding for this ENTIRE section. This is the single biggest lever on the
  // gap above/below "The Approach" block. Raise/lower this one number to give the whole section more/less breathing room.
  <section id="approach" className="py-14 px-[5vw] bg-background transition-colors duration-300">
    <ScrollReveal>
      <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// the approach</div>
      {/* 👈 mb-3 = space between headline and the subhead line below it. Single-line headline now (was previously 2-line with "Always in that order" as line 2). */}
      <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-3 text-foreground transition-colors duration-300">
        Probe. Build. Automate.
      </h2>
      {/* 👈 mb-10 = space between subhead and the 3 cards below it. Styled to match the page-level subhead in SkillsExperiencePanel.tsx (text-sm text-ink-soft font-light leading-[1.7]) for consistency. */}
      <p className="text-sm text-ink-soft font-light leading-[1.7] max-w-[65ch] mb-10">
        A well-built system solves one problem — everything else stems from getting that one right.
      </p>
    </ScrollReveal>

    {/* 👈 3-card row. gap-6 = space BETWEEN cards (not around the row). On desktop, a dashed connector + dot sits between cards (absolute-positioned track behind the icons) — hidden on mobile since cards stack. */}
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
            {/* 👈 min-h-[4.2rem] reserves space for ~3 lines of description (0.85rem × 1.65 line-height × 3) so the tag pills below
                start at the same y-position across all 3 cards, regardless of how long each step's description is. This is an
                ESTIMATE based on Probe/Build's descriptions being noticeably longer than Automate's — I can't see the actual
                rendered line count, so check this live: if the pills are still off, adjust the number (font-size × line-height ×
                however many lines the longest description actually wraps to). Same fix pattern as the capability card pills above it. */}
            <p className="relative z-[1] text-[0.85rem] leading-[1.65] text-ink-soft font-light mb-5 min-h-[4.2rem]">{step.desc}</p>

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
