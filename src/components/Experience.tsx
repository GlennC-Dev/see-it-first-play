import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface ExpItem {
  role: string;
  period: string;
  company: string;
  bullets?: string[];
  muted?: boolean;
}

const mainExperience: ExpItem[] = [
  {
    role: "Reports and Automation Specialist",
    period: "AUG 2023 — PRESENT",
    company: "Acquire Intelligence",
    bullets: [
      "Built Tableau dashboards that <strong>eliminated hours of manual data transformation</strong>, freeing analysts to focus on insights.",
      "Corrected a structural reporting error, surfacing 17,185 unrecorded interactions over 5 months and <strong>revealing a true SL of 34.4% vs the reported 37.8%</strong> — impacting target setting and workforce planning.",
      "Prepared dashboards that utilizes Tableau's Subscriptions function, sending <strong>tailored reports straight to stakeholder's inbox</strong> on cue.",
      "Leveraged Power Query for Scorecard Automation, enabling <strong>D-1 scorecard availability</strong> at a fraction of previous processing time.",
      "Developed scorecards, automated reports, and data collection systems using <strong>Google Apps Script</strong> within Google Workspace.",
    ],
  },
  {
    role: "Operational Business Insights Analyst",
    period: "OCT 2022 — AUG 2023",
    company: "Acquire BPO",
    bullets: [
      "Engineered QRAW — a fully self-sustaining offline activity tracking system built on Google Forms, Apps Script, and Google Sheets — solving a critical blind spot in the phone system's inbound-only visibility. Overlaying QRAW data with existing phone system outputs produced the org's first-ever true agent utilization and efficiency metrics, driving 90% staff utilization and 92% employee efficiency across multiple business units. Adopted org-wide across all offline-facing campaigns.",
      "Deployed an automated eNPS system that reduced processing time <strong>from weeks to near real-time</strong>, enabling immediate insights.",
    ],
  },
];

const hiddenExperience: ExpItem[] = [
  {
    role: "Project Specialist",
    period: "MAR 2022 — OCT 2022",
    company: "Acquire BPO",
    bullets: [
      "Built a web-app mapping every troubleshooting scenario from Level 1 through TIO escalations — covering manual modem configuration to cloud-based IVR routing for IP phones. Adopted and expanded by client to cover IPV and cloud hosted telephony.",
      "Redesigned operations training curriculum — cutting required training time by 50% — and served as interim team lead for 5+ new hire classes, teaching how systems actually work rather than just what to do",
      "Authored 20+ knowledge articles and led training sessions for four new hire classes during their transition to operations.",
    ],
  },
  {
    role: "ADSL/Fiber Support → Business Faults → Tech Escalations",
    period: "JAN 2017 — MAR 2022",
    company: "Acquire BPO",
    bullets: ["Primarily worked on manager escalations, client escalations, or cases involving Australia's Telecommunication Industry Ombudsman (TIO).",
              "Acted as SME for new hire classes, assisted with team level reporting, wrote processes for new products and spearheaded discovery sessions for optimizing troubleshooting flow.",
              "Acted on cases needing supplier intervention -- coordinating technician dispatches, equipment delivery and outage status.",
    ],
  },
  {
    role: "Residential ADSL/PSTN Technical Support",
    period: "FEB 2016 — JAN 2017",
    company: "Acquire BPO",
    bullets: ["Frontline Technical Support Staff answering and assisting residential customers with concerns related to ADSL and technologies.",
              "Assisted with minor billing concerns, technician dispatch and outage status.",
    ],
  },
  {
    role: "High Speed Internet Technical Support Agent",
    period: "AUG 2014 — JUN 2015",
    company: "Sykes Asia Incorporated",
    bullets: ["Frontline Technical Support Staff answering and assisting residential customers with concerns related to ADSL internet and related technologies at the time.",
              "Assisted with minor billing concerns, technician dispatch and outage status.",
    ],
  },
];

const ExpEntry = ({ item }: { item: ExpItem }) => (
  <div className="relative mb-12 pb-12 border-b border-border last:border-b-0 last:mb-0 last:pb-0 transition-colors duration-300">
    <div className={`absolute -left-[2.4rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-background ${item.muted ? "bg-ink-muted shadow-[0_0_0_1px_hsl(var(--ink-muted))]" : "bg-primary shadow-[0_0_0_1px_hsl(var(--primary))]"} transition-colors duration-300`} />
    <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1.5">
      <span className="text-[1.1rem] font-semibold text-foreground transition-colors duration-300">{item.role}</span>
      <span className="font-mono-dm text-[0.72rem] text-ink-muted tracking-[0.08em]">{item.period}</span>
    </div>
    <div className="text-[0.85rem] text-primary font-medium mb-4">{item.company}</div>
    {item.bullets && (
      <ul className="list-none flex flex-col gap-2.5">
        {item.bullets.map((b, i) => (
          <li key={i} className="text-[0.9rem] text-ink-soft leading-[1.65] pl-5 relative font-light before:content-['→'] before:absolute before:left-0 before:text-primary before:text-[0.8rem]">
            <span dangerouslySetInnerHTML={{ __html: b }} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Experience = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="experience" className="py-24 px-[5vw] bg-background transition-colors duration-300">
      <ScrollReveal>
        <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// work history</div>
        <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-12 text-foreground transition-colors duration-300">Experience</h2>
      </ScrollReveal>
      <ScrollReveal>
        <div className="relative pl-8">
          <div className="absolute left-0 top-2 bottom-0 w-px bg-border transition-colors duration-300" />
          {mainExperience.map((item, i) => (
            <ExpEntry key={i} item={item} />
          ))}
          {expanded && hiddenExperience.map((item, i) => (
            <ExpEntry key={`h-${i}`} item={item} />
          ))}
          <div className="mt-8">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 font-mono-dm text-[0.75rem] tracking-[0.1em] uppercase text-ink-soft border-[1.5px] border-border px-5 py-2.5 rounded-sm bg-transparent cursor-pointer hover:border-primary hover:text-primary transition-colors duration-200"
            >
              {expanded ? "Collapse experience ↑" : "See full experience ↓"}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Experience;
