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
import formsAutomation from "@/assets/projects/forms-automation.png";

interface ProjectCard {
  title: string;
  desc: string;
  impact?: string;
  tags?: string[];
  image: string;
}

const TOP_PROJECTS: ProjectCard[] = [
  { title: "ENPS Live Dashboard", desc: "Real-time Employee Net Promoter Score monitoring dashboard providing instant insights into employee satisfaction and engagement metrics.", image: enpsDashboard },
  { title: "IMPROVE: FMEA", desc: "Failure Mode and Effects Analysis demonstrating risk assessment methodology and mitigation strategies for process improvement.", image: improveFmea },
  { title: "Chat ETL Workflow", desc: "Automated data extraction, transformation, and loading process built in Tableau for streamlined chat data analytics.", image: chatEtl },
  { title: "Apps Script Code", desc: "Custom Google Apps Script implementation for automated data cleaning and processing.", image: appsScript },
  { title: "JIRA Workflow Management", desc: "Custom JIRA project configuration with optimized workflows, issue types, and field configurations for operational efficiency.", image: jiraWorkflow },
  { title: "Function Execution Tracking", desc: "Automated function monitoring system showing execution logs, duration tracking, and status monitoring for time-driven automation processes.", image: functionTracking },
  { title: "MEASURE: Integrated Flowchart", desc: "Process mapping and measurement framework showing data collection points and validation methods for comprehensive process analysis.", image: measureFlowchart },
  { title: "Google Forms Workflow Automation", desc: "Automated workflow for monitoring Google Forms response counts, alerting stakeholders, and managing response limits to prevent data loss.", image: formsAutomation },
];

const ProjectsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TOP_PROJECTS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TOP_PROJECTS.length) % TOP_PROJECTS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleManualNav = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
  };

  return (
    <section id="projects" className="py-24 px-[5vw] bg-card border-t border-b border-border transition-colors duration-300">
      <ScrollReveal>
        <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// featured work</div>
        <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-4 text-foreground transition-colors duration-300">Projects & Builds</h2>
        <p className="text-[0.9rem] text-ink-soft font-light max-w-[55ch] leading-[1.7] mb-12">
          A selection of high-impact projects spanning automation, visualization, and process design.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel viewport */}
          <div className="overflow-hidden rounded-[4px] border border-border">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {TOP_PROJECTS.map((card) => (
                <div key={card.title} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
                    {/* Image area */}
                    <div className="w-full aspect-video md:aspect-auto md:min-h-[320px] bg-border flex items-center justify-center">
                      <div className="text-[3.5rem] opacity-20">{card.icon}</div>
                    </div>
                    {/* Info */}
                    <div className="p-8 flex flex-col justify-center bg-background">
                      <div className="text-[1.15rem] font-semibold mb-2 text-foreground">{card.title}</div>
                      <div className="text-[0.85rem] text-ink-soft leading-[1.7] font-light mb-4">{card.desc}</div>
                      <div className="font-mono-dm text-[0.7rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-4 self-start">{card.impact}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {card.tags.map((t) => (
                          <span key={t} className="text-[0.68rem] font-medium px-2 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
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

            {/* Dots */}
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
    </section>
  );
};

export default ProjectsSection;
