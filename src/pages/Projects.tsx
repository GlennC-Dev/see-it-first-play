import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

interface Project {
  id: number;
  title: string;
  desc: string;
  impact: string;
  tags: string[];
  icon: string;
  photos: (string | null)[];
  category: string;
}

interface Category {
  key: string;
  title: string;
  desc: string;
}

const CATEGORIES: Category[] = [
  {
    key: "Tableau Visualizations",
    title: "Tableau Visualizations",
    desc: "Dashboards, scorecards, and subscription-optimized infographic reports built to turn raw data into decisions — not just displays.",
  },
  {
    key: "Workflow Automation",
    title: "Workflow Automation",
    desc: "End-to-end automated systems across Google Workspace, Power Query, Apps Script, and n8n — replacing hours of manual work with pipelines that run themselves.",
  },
  {
    key: "Case Study & Technical Writing",
    title: "Case Study & Technical Writing",
    desc: "Process documentation, training curriculum design, and decision-support systems — turning complex workflows into clear, actionable frameworks.",
  },
];

const PROJECTS: Project[] = [
  { id: 0, title: "Scorecard Automation System", desc: "End-to-end scorecard pipeline using Power Query that enabled D-1 data availability across operations. Previously manual and hours-long, the process was reduced to a matter of minutes — transforming how leadership consumed daily performance data.", impact: "⚡ Hours → Minutes processing time", tags: ["Power Query", "MS Office", "Automation"], icon: "📊", photos: [null, null, null], category: "Workflow Automation" },
  { id: 1, title: "Automated Data Collection Platform", desc: "A fully automated, scalable data collection system built entirely within Google Workspace using Apps Script. Became the backbone of cross-team performance tracking — driving 90% staff utilization and 92% employee efficiency across several business units.", impact: "📈 90% staff utilization achieved", tags: ["Apps Script", "Google Workspace", "BI", "Automation"], icon: "🗂️", photos: [null, null], category: "Workflow Automation" },
  { id: 2, title: "Neural-Style Troubleshooting Workflows", desc: "Decision-tree workflows modeled like a neural network to guide support agents through product troubleshooting in real time. Reduced AHT by 25% while consistently pushing CSAT and resolution rates to their highest levels.", impact: "🎯 25% AHT reduction", tags: ["Process Design", "Workflow", "LSS"], icon: "🧠", photos: [null, null], category: "Case Study & Technical Writing" },
  { id: 3, title: "Automated eNPS Reporting System", desc: "Replaced a weeks-long manual employee NPS process with a fully automated pipeline in Google Workspace. Leadership went from waiting weeks for reports to receiving near real-time sentiment insights, enabling faster people decisions.", impact: "⏱️ Weeks → Near real-time delivery", tags: ["Apps Script", "Google Sheets", "HR Analytics", "Google Workspace"], icon: "📬", photos: [null, null, null], category: "Workflow Automation" },
  { id: 4, title: "Tableau BI Dashboard Suite", desc: "A multi-report Tableau visualization suite built to eliminate repetitive manual data transformation. Analysts stopped spending hours on data prep and started spending that time on the insights that actually matter.", impact: "🔁 Manual prep fully eliminated", tags: ["Tableau", "BI", "Python"], icon: "📉", photos: [null, null, null, null], category: "Tableau Visualizations" },
  { id: 5, title: "Subscription-Ready Infographic Reports", desc: "Redesigned reports with static sizing and infographic-style layouts engineered for Tableau's Subscription email feature. Stakeholders receive the full, polished report on a schedule — no login, no friction.", impact: "📧 Zero-click delivery to stakeholders", tags: ["Tableau", "Subscriptions", "Infographic Design"], icon: "📬", photos: [null, null], category: "Tableau Visualizations" },
  { id: 6, title: "Operations Training Curriculum Overhaul", desc: "A ground-up redesign of the entire operations training curriculum. Addressed core technical topics and complaints handling while cutting required training time by half — without reducing coverage or quality.", impact: "📚 Training time cut by 50%", tags: ["Process Design", "Curriculum Design"], icon: "🎓", photos: [null, null], category: "Case Study & Technical Writing" },
];

const FILTERS = ["All", ...CATEGORIES.map((c) => c.key)];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{ projectIdx: number; photoIdx: number } | null>(null);

  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  const openLightbox = (projectIdx: number) => setLightbox({ projectIdx, photoIdx: 0 });
  const closeLightbox = () => setLightbox(null);

  const lbProject = lightbox ? PROJECTS.find((p) => p.id === lightbox.projectIdx) : null;

  // Group filtered projects by category
  const groupedByCategory = CATEGORIES.map((cat) => ({
    ...cat,
    projects: filtered.filter((p) => p.category === cat.key),
  })).filter((g) => g.projects.length > 0);

  return (
    <>
      <Navbar />

      <ScrollReveal>
        <div className="pt-40 pb-20 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// project gallery</div>
          <h1 className="font-serif-dm text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] mb-4 text-foreground transition-colors duration-300">
            Work that <em className="italic text-primary">speaks</em><br />for itself.
          </h1>
          <p className="text-base text-ink-soft font-light max-w-[55ch] leading-[1.7]">
            A full archive of projects, builds, and automation systems — each with screenshots, impact metrics, and the tools behind the work.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="px-[5vw] py-8 bg-background border-b border-border flex gap-2.5 flex-wrap transition-colors duration-300">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase px-4 py-2 border-[1.5px] rounded-sm cursor-pointer transition-all duration-200 ${activeFilter === f ? "border-primary text-primary bg-blue-dim" : "border-border text-ink-soft bg-transparent hover:border-primary hover:text-primary hover:bg-blue-dim"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="px-[5vw] py-16 pb-24">
        {groupedByCategory.map((group) => (
          <ScrollReveal key={group.key} className="mb-16 last:mb-0">
            <div className="flex items-baseline gap-6 mb-6 pb-4 border-b border-border flex-wrap transition-colors duration-300">
              <div className="font-serif-dm text-[1.6rem] text-foreground whitespace-nowrap transition-colors duration-300">{group.title}</div>
              <div className="text-[0.85rem] text-ink-soft font-light leading-[1.6] flex-1 min-w-[200px]">{group.desc}</div>
              <div className="font-mono-dm text-[0.68rem] tracking-[0.1em] text-ink-muted whitespace-nowrap px-2.5 py-1 border border-border rounded-sm">
                {group.projects.length} project{group.projects.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.projects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <div
                    onClick={() => openLightbox(p.id)}
                    className="bg-card border border-border rounded-[4px] overflow-hidden cursor-pointer transition-all duration-200 relative group hover:shadow-[0_12px_40px_rgba(26,108,255,0.09)] hover:-translate-y-[3px] hover:border-blue-dim"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="w-full aspect-video bg-border overflow-hidden flex items-center justify-center relative">
                      <div className="text-[2.5rem] opacity-20">{p.icon}</div>
                      <div className="absolute bottom-2.5 right-2.5 bg-[rgba(0,0,0,0.6)] text-[#fff] font-mono-dm text-[0.65rem] tracking-[0.08em] px-2 py-0.5 rounded-sm">
                        {p.photos.length} photo{p.photos.length > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-base font-semibold text-foreground mb-2">{p.title}</div>
                      <div className="text-[0.85rem] text-ink-soft leading-[1.65] font-light mb-4">{p.desc.substring(0, 120)}…</div>
                      <div className="font-mono-dm text-[0.7rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-3.5">{p.impact}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && lbProject && (
        <div
          className="fixed inset-0 z-[1000] bg-[rgba(10,10,10,0.92)] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="bg-card rounded-lg overflow-hidden max-w-[900px] w-full grid grid-cols-1 md:grid-cols-[1fr_340px] max-h-[90vh]">
            <div className="bg-[#111] relative flex items-center justify-center min-h-[360px]">
              {lbProject.photos[lightbox.photoIdx] ? (
                <img src={lbProject.photos[lightbox.photoIdx]!} alt={lbProject.title} className="w-full h-full object-contain max-h-[70vh]" />
              ) : (
                <div className="text-[5rem] opacity-10">{lbProject.icon}</div>
              )}
              {lbProject.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx - 1 + lbProject.photos.length) % lbProject.photos.length })}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-[#fff] cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.22)] transition-colors z-[2]"
                  >←</button>
                  <button
                    onClick={() => setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx + 1) % lbProject.photos.length })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-[#fff] cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.22)] transition-colors z-[2]"
                  >→</button>
                </>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
                {lbProject.photos.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox({ ...lightbox, photoIdx: i })}
                    className={`w-[7px] h-[7px] rounded-full cursor-pointer transition-all duration-200 ${i === lightbox.photoIdx ? "bg-[#fff] scale-[1.3]" : "bg-[rgba(255,255,255,0.35)]"}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-8 overflow-y-auto flex flex-col border-l border-border md:border-l md:border-t-0 border-t">
              <button onClick={closeLightbox} className="self-end bg-transparent border border-border rounded-sm w-8 h-8 cursor-pointer text-ink-soft flex items-center justify-center text-base mb-6 hover:border-foreground hover:text-foreground transition-colors duration-200">✕</button>
              <div className="font-serif-dm text-[1.5rem] leading-[1.15] mb-3 text-foreground">{lbProject.title}</div>
              <div className="font-mono-dm text-[0.72rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-5 self-start">{lbProject.impact}</div>
              <div className="text-[0.875rem] text-ink-soft leading-[1.7] font-light mb-5 flex-1">{lbProject.desc}</div>
              <div className="font-mono-dm text-[0.65rem] tracking-[0.12em] uppercase text-ink-muted mb-2.5">Tools used</div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {lbProject.tags.map((t) => (
                  <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <button
                  disabled={PROJECTS.findIndex((p) => p.id === lbProject.id) === 0}
                  onClick={() => { const idx = PROJECTS.findIndex((p) => p.id === lbProject.id); if (idx > 0) setLightbox({ projectIdx: PROJECTS[idx - 1].id, photoIdx: 0 }); }}
                  className="flex-1 py-2.5 border-[1.5px] border-border rounded-sm bg-transparent font-mono-dm text-[0.72rem] tracking-[0.08em] cursor-pointer text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >← Prev project</button>
                <button
                  disabled={PROJECTS.findIndex((p) => p.id === lbProject.id) === PROJECTS.length - 1}
                  onClick={() => { const idx = PROJECTS.findIndex((p) => p.id === lbProject.id); if (idx < PROJECTS.length - 1) setLightbox({ projectIdx: PROJECTS[idx + 1].id, photoIdx: 0 }); }}
                  className="flex-1 py-2.5 border-[1.5px] border-border rounded-sm bg-transparent font-mono-dm text-[0.72rem] tracking-[0.08em] cursor-pointer text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >Next project →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Projects;
