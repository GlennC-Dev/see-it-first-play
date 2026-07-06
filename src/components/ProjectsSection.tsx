import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import enpsDashboard from "@/assets/projects/enps-dashboard.png";
import improveFmea from "@/assets/projects/improve-fmea.png";
import chatEtl from "@/assets/projects/chat-etl.png";
import appsScript from "@/assets/projects/apps-script.png";
import jiraWorkflow from "@/assets/projects/jira-workflow.png";
import functionTracking from "@/assets/projects/function-tracking.png";
import measureFlowchart from "@/assets/projects/measure-flowchart.png";

interface ProjectCard {
  title: string;
  desc: string;
  impact?: string;
  tags?: string[];
  image: string;
}

const PLACEHOLDER_IMPACT = "TBD — add impact metric";
const PLACEHOLDER_TAGS = ["TBD tag 1", "TBD tag 2"];

const TOP_PROJECTS: ProjectCard[] = [
  { title: "ENPS Live Dashboard", desc: "Real-time Employee Net Promoter Score monitoring dashboard providing instant insights into employee satisfaction and engagement metrics.", image: enpsDashboard, impact: "Hours to Seconds • Insight on Demand", tags: ["Google Sheets", "Google AppScript"] },
  { title: "MEASURE: Integrated Flowchart", desc: "Process mapping and measurement framework showing data collection points and validation methods for comprehensive process analysis.", image: measureFlowchart, impact: "Root Cause Analysis", tags: ["Process Mapping", "Data Analytics"] },
  { title: "IMPROVE: FMEA", desc: "Failure Mode and Effects Analysis demonstrating risk assessment methodology and mitigation strategies for process improvement.", image: improveFmea, impact: "Risk Reduction • Governance and Accountability", tags: ["Lean Six Sigma", "Data Analytics"] },
  { title: "Chat ETL Workflow", desc: "Automated data extraction, transformation, and loading process built in Tableau for streamlined chat data analytics.", image: chatEtl, impact: "Hands Off - Scheduled Data Refresh", tags: ["Google AppScript", "Tableau"] },
  { title: "Apps Script Code", desc: "Custom Google Apps Script implementation for automated data cleaning and processing.", image: appsScript, impact: "Hours to Seconds", tags: ["Google Sheets", "Google AppScript"] },
];

const ProjectsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TOP_PROJECTS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TOP_PROJECTS.length) % TOP_PROJECTS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || lightboxIdx !== null) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next, lightboxIdx]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i === null ? i : (i + 1) % TOP_PROJECTS.length));
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i === null ? i : (i - 1 + TOP_PROJECTS.length) % TOP_PROJECTS.length));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx]);

  const handleManualNav = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
  };

  const openLightbox = (i: number) => {
    setIsAutoPlaying(false);
    setLightboxIdx(i);
  };

  const lbProject = lightboxIdx !== null ? TOP_PROJECTS[lightboxIdx] : null;

  return (
    <section id="projects" className="py-24 px-[5vw] bg-card border-t border-b border-border transition-colors duration-300">
      <ScrollReveal>
        <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// featured works</div>
        <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-4 text-foreground transition-colors duration-300">Projects & Builds</h2>
        <p className="text-[0.9rem] text-ink-soft font-light max-w-[55ch] leading-[1.7] mb-12">
          A selection of high-impact projects spanning automation, visualization, and process design.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-[4px] border border-border">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {TOP_PROJECTS.map((card, i) => (
                <div key={card.title} className="min-w-full">
                  <div
                    onClick={() => openLightbox(i)}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] cursor-pointer group"
                  >
                    <div className="w-full aspect-video md:aspect-auto md:min-h-[320px] bg-border flex items-center justify-center overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center bg-background">
                      <div className="text-[1.15rem] font-semibold mb-2 text-foreground">{card.title}</div>
                      <div className="text-[0.85rem] text-ink-soft leading-[1.7] font-light mb-4">{card.desc}</div>
                      {card.impact && (
                        <div className="font-mono-dm text-[0.7rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-4 self-start">{card.impact}</div>
                      )}
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {card.tags.map((t) => (
                            <span key={t} className="text-[0.68rem] font-medium px-2 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                          ))}
                        </div>
                      )}
                      <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Click to view larger →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              <button
                onClick={() => handleManualNav(prev)}
                className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualNav(next)}
                className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              {TOP_PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-primary scale-125" : "bg-border hover:bg-ink-muted"}`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <div className="font-mono-dm text-[0.68rem] tracking-[0.1em] text-ink-muted">
              {String(current + 1).padStart(2, "0")} / {String(TOP_PROJECTS.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="text-center mt-14">
        <Link to="/projects" className="inline-flex items-center gap-2.5 font-mono-dm text-[0.78rem] tracking-[0.12em] uppercase text-primary border border-primary px-7 py-3 rounded-sm no-underline hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
          See all projects & galleries →
        </Link>
      </ScrollReveal>

      {lightboxIdx !== null && lbProject && (
        <div
          className="fixed inset-0 z-[1000] bg-[rgba(10,10,10,0.92)] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && setLightboxIdx(null)}
        >
          <div className="bg-card rounded-lg overflow-hidden max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-[1.4fr_1fr] max-h-[90vh]">
            <div className="bg-[#111] relative flex items-center justify-center min-h-[360px]">
              <img src={lbProject.image} alt={lbProject.title} className="w-full h-full object-contain max-h-[80vh]" />
              <button
                onClick={() => setLightboxIdx((lightboxIdx - 1 + TOP_PROJECTS.length) % TOP_PROJECTS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.75)] border border-[rgba(255,255,255,0.2)] text-[#000] font-bold cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.9)] transition-colors z-[2]"
                aria-label="Previous"
              >←</button>
              <button
                onClick={() => setLightboxIdx((lightboxIdx + 1) % TOP_PROJECTS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.75)] border border-[rgba(255,255,255,0.2)] text-[#000] font-bold cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.9)] transition-colors z-[2]"
                aria-label="Next"
              >→</button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
                {TOP_PROJECTS.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className={`w-[7px] h-[7px] rounded-full cursor-pointer transition-all duration-200 ${i === lightboxIdx ? "bg-[#fff] scale-[1.3]" : "bg-[rgba(255,255,255,0.35)]"}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-8 overflow-y-auto flex flex-col border-l border-border md:border-l md:border-t-0 border-t">
              <button onClick={() => setLightboxIdx(null)} className="self-end bg-transparent border border-border rounded-sm w-8 h-8 cursor-pointer text-ink-soft flex items-center justify-center text-base mb-6 hover:border-foreground hover:text-foreground transition-colors duration-200">✕</button>
              <div className="font-serif-dm text-[1.5rem] leading-[1.15] mb-3 text-foreground">{lbProject.title}</div>
              {lbProject.impact && (
                <div className="font-mono-dm text-[0.72rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-5 self-start">{lbProject.impact}</div>
              )}
              <div className="text-[0.875rem] text-ink-soft leading-[1.7] font-light mb-5 flex-1">{lbProject.desc}</div>
              {lbProject.tags && lbProject.tags.length > 0 && (
                <>
                  <div className="font-mono-dm text-[0.65rem] tracking-[0.12em] uppercase text-ink-muted mb-2.5">Tools used</div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {lbProject.tags.map((t) => (
                      <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
