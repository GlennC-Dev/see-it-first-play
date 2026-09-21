import { BarChart3, Workflow, Sparkles, Target } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// 👈 Replaces the old two-column pill-grid layout entirely. Certifications strip that used to
// live here (LSS Green Belt, AI-Powered Practitioner, etc.) has no home in this 4-card layout —
// it's unplaced for now, same as the shelved Stats component, not deleted. Natural next home is
// probably the About page (Credentials card already points there).
const capabilities = [
  {
    icon: BarChart3,
    title: "Business Intelligence",
    tagline: "The right number, in the right hands, without asking for it",
    badge: "DECISIONS THAT LAND",
    bullets: [
      "Dashboards built for the person acting on them",
      "Multiple sources, one coherent view",
      "Self-service — no manual pulls needed",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    tagline: "Built once. Runs forever.",
    badge: "ZERO MANUAL EFFORT",
    bullets: [
      "Repetitive tasks replaced with pipelines",
      "Systems that update and deliver on their own",
      "Humans freed for work that actually needs them",
    ],
  },
  {
    icon: Sparkles,
    title: "AI-Enabled Operations",
    tagline: "AI that works for you — not the other way around",
    badge: "PRACTICAL, NOT RECKLESS",
    bullets: [
      "Get more from tools already in your stack",
      "The right prompt beats the fanciest model",
      "Adoption built on understanding, not hype",
    ],
  },
  {
    icon: Target,
    title: "Process Improvement",
    tagline: "Fix the process, not just the symptom",
    badge: "LESS WASTE, MORE OUTPUT",
    bullets: [
      "Root cause first, solution second",
      "LSS Green Belt-backed methodology",
      "Improvements that hold past the first week",
    ],
  },
];

const Skills = () => (
  // 👈 py-14 = top+bottom padding for this ENTIRE section. Biggest lever on the gap above/below the whole capabilities block.
  <section id="skills" className="py-14 px-[5vw] bg-card border-t border-b border-border transition-colors duration-300">
    <ScrollReveal>
      <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// capabilities</div>
      {/* 👈 mb-10 = space between headline and the 4 cards below it. */}
      <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-3 text-foreground transition-colors duration-300">
        What I can do for you.
      </h2>
      {/* 👈 mb-10 = space between subhead and the 4 cards below it. Styled to match the page-level subhead / Approach's subhead for consistency. */}
      <p className="text-sm text-ink-soft font-light leading-[1.7] max-w-[65ch] mb-10">
        Pick one, stack a few, or leave it to me.
      </p>
    </ScrollReveal>

    {/* 👈 4-card row on desktop, stacks on mobile. gap-5 = space BETWEEN cards. Single-icon style to match the rest of the site (Approach section, tools bar) — reference image used colorful multi-icon clusters, intentionally not replicated yet. */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {capabilities.map((c, i) => (
        <ScrollReveal key={c.title} delay={i * 100}>
          <div className="bg-background border border-border rounded-[4px] p-6 h-full transition-colors duration-300 hover:border-primary/50">
            <div className="w-10 h-10 rounded-full bg-blue-dim border border-primary/30 flex items-center justify-center mb-4">
              <c.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.75} />
            </div>

            <div className="text-base font-semibold text-foreground mb-1.5">{c.title}</div>
            {/* 👈 min-h-[2.4rem] reserves space for exactly 2 lines of tagline (0.8rem × 1.5 line-height × 2) regardless of whether
                this card's tagline actually wraps to 1 or 2 lines — this is what keeps the blue pill below starting at the same
                y-position across all 4 cards. If you ever change the tagline font size or line-height, recalculate this number
                the same way (font-size × line-height × 2) or the pills will drift out of alignment again. */}
            <p className="text-[0.8rem] italic text-ink-soft font-light leading-[1.5] mb-3 min-h-[2.4rem]">{c.tagline}</p>

            {/* 👈 Heads-up: the pills THEMSELVES now start level (fixed above), but "PRACTICAL, NOT RECKLESS" and
                "LESS WASTE, MORE OUTPUT" still wrap to 2 lines while the other two don't — so the pill's BOTTOM
                edge (and the bullets starting below it) will still be uneven between cards. Same fix pattern
                would apply here (a min-h on this div) if that starts to bother you too. */}
            <div className="inline-block font-mono-dm text-[0.62rem] tracking-[0.1em] px-2.5 py-1 rounded-sm bg-blue-dim text-primary mb-4">
              {c.badge}
            </div>

            <ul className="flex flex-col gap-2">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[0.78rem] text-ink-soft font-light leading-[1.5]">
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default Skills;
