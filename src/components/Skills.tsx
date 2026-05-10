import ScrollReveal from "./ScrollReveal";

const skillGroups = [
  { label: "BI & Visualization", pills: [{ name: "Tableau", highlight: true }, { name: "Power BI", highlight: true }, { name: "Salesforce" }] },
  { label: "Automation & Scripting", pills: [{ name: "n8n", highlight: true }, { name: "Google Apps Script", highlight: true }, { name: "Power Query", highlight: true }, { name: "Python" }, { name: "SQL" }] },
  { label: "Platforms & Productivity", pills: [{ name: "Google Workspace" }, { name: "Microsoft 365" }, { name: "MS Office Suite" }] },
  { label: "Methodology", pills: [{ name: "Lean Six Sigma", highlight: true }, { name: "Process Optimization" }, { name: "Data-Driven BI" }, { name: "Cross-functional Collaboration" }] },
];

const certs = [
  { name: "LSS Green Belt", blue: true },
  { name: "AI-Powered Practitioner", blue: true },
  { name: "LSS Yellow Belt" },
  { name: "Python Mastery" },
  { name: "SQL Basics" },
];

const Skills = () => (
  <section id="skills" className="py-24 px-[5vw] bg-card border-t border-b border-border transition-colors duration-300">
    <ScrollReveal>
      <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// capabilities</div>
      <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-12 text-foreground transition-colors duration-300">Tools & Expertise</h2>
    </ScrollReveal>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
      <ScrollReveal>
        <p className="text-[0.95rem] leading-[1.75] text-ink-soft font-light">
          A multi-disciplinary stack built across years of hands-on automation work — from visual BI dashboards to scripted data pipelines, workflow engines, and AI-powered process optimization.
        </p>
        <div className="mt-8">
          <div className="font-mono-dm text-[0.7rem] tracking-[0.14em] uppercase text-ink-muted mb-3 pb-2 border-b border-border font-extrabold">Certifications</div>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {certs.map((c) => (
              <span key={c.name} className={`font-mono-dm text-[0.7rem] tracking-[0.08em] px-3 py-1.5 rounded-sm ${c.blue ? "bg-primary text-primary-foreground" : "bg-foreground text-background"} transition-colors duration-300`}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="flex flex-col gap-8">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <div className="font-mono-dm text-[0.7rem] tracking-[0.14em] uppercase text-ink-muted mb-3 pb-2 border-b border-border font-extrabold">{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.pills.map((p) => (
                  <span key={p.name} className={`text-[0.8rem] font-medium px-3.5 py-1.5 rounded-sm border-[1.5px] cursor-default transition-all duration-200 ${p.highlight ? "border-primary text-primary bg-blue-dim" : "border-border text-ink-soft bg-background hover:border-primary hover:text-primary hover:bg-blue-dim"}`}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Skills;
