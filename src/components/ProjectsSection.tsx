import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

interface ProjectCard {
  title: string;
  desc: string;
  impact: string;
  tags: string[];
  icon: string;
}

interface Category {
  title: string;
  desc: string;
  count: string;
  cards: ProjectCard[];
}

const categories: Category[] = [
  {
    title: "Tableau Visualizations",
    desc: "Dashboards, scorecards, and subscription-optimized infographic reports built to turn raw data into decisions — not just displays.",
    count: "2 projects",
    cards: [
      { title: "Tableau BI Dashboard Suite", desc: "Multi-report visualization suite eliminating repetitive manual data prep — analysts spend their time on insights, not transformation.", impact: "🔁 Manual prep fully eliminated", tags: ["Tableau", "Python", "BI"], icon: "📊" },
      { title: "Subscription-Ready Infographic Reports", desc: "Redesigned reports with static sizing and infographic-style layouts engineered for Tableau's Subscription email feature. Stakeholders receive the full, polished report on a schedule — no login, no friction.", impact: "📧 Zero-click delivery to stakeholders", tags: ["Tableau", "Subscriptions", "Infographic Design"], icon: "📬" },
    ],
  },
  {
    title: "Workflow Automation",
    desc: "End-to-end automated systems across Google Workspace, Power Query, Apps Script, and n8n — replacing hours of manual work with pipelines that run themselves.",
    count: "3 projects",
    cards: [
      { title: "Automated Data Collection Platform", desc: "Fully automated, scalable data collection system built in Google Workspace — backbone of cross-team performance tracking across multiple business units.", impact: "📈 90% staff utilization achieved", tags: ["Apps Script", "Google Workspace", "Automation"], icon: "🗂️" },
      { title: "Scorecard Automation System", desc: "End-to-end scorecard pipeline using Power Query enabling D-1 data availability — transformed a hours-long daily process into something that just runs.", impact: "⚡ Hours → Minutes processing time", tags: ["Power Query", "MS Office", "Automation"], icon: "📊" },
      { title: "Automated eNPS Reporting System", desc: "Replaced a weeks-long manual eNPS process with a fully automated Google Workspace pipeline — leadership shifted from waiting to reacting in real time.", impact: "⏱️ Weeks → Near real-time", tags: ["Apps Script", "Google Sheets", "HR Analytics"], icon: "📋" },
    ],
  },
  {
    title: "Case Study & Technical Writing",
    desc: "Process documentation, training curriculum design, and decision-support systems — turning complex workflows into clear, actionable frameworks.",
    count: "2 projects",
    cards: [
      { title: "Neural-Style Troubleshooting Workflows", desc: "Decision-tree troubleshooting flows modeled like a neural network — guiding support agents through complex product issues in real time while pushing CSAT to consistent highs.", impact: "🎯 25% AHT reduction", tags: ["Process Design", "Technical Writing", "LSS"], icon: "🧠" },
      { title: "Operations Training Curriculum Overhaul", desc: "Ground-up redesign of the full operations training curriculum — halved required training time without reducing coverage, with 20+ knowledge articles for new hire onboarding.", impact: "📚 Training time cut by 50%", tags: ["Curriculum Design", "Technical Writing", "Knowledge Base"], icon: "📖" },
    ],
  },
];

const ProjectCardComponent = ({ card }: { card: ProjectCard }) => (
  <div className="border border-border rounded-[4px] bg-background flex flex-col transition-all duration-200 relative overflow-hidden group hover:shadow-[0_12px_40px_rgba(26,108,255,0.1)] hover:-translate-y-[3px] hover:border-blue-dim">
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
    <div className="w-full aspect-video bg-border flex items-center justify-center transition-colors duration-300 overflow-hidden">
      <div className="text-[2rem] opacity-20">{card.icon}</div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="text-[0.95rem] font-semibold mb-1.5 text-foreground transition-colors duration-300">{card.title}</div>
      <div className="text-[0.82rem] text-ink-soft leading-[1.65] font-light flex-1 mb-3.5">{card.desc}</div>
      <div className="font-mono-dm text-[0.68rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-3 self-start">{card.impact}</div>
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((t) => (
          <span key={t} className="text-[0.68rem] font-medium px-2 py-1 rounded-sm bg-border text-ink-muted transition-colors duration-300">{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-[5vw] bg-card border-t border-b border-border transition-colors duration-300">
    <ScrollReveal>
      <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">// featured work</div>
      <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-12 text-foreground transition-colors duration-300">Projects & Builds</h2>
    </ScrollReveal>
    {categories.map((cat) => (
      <ScrollReveal key={cat.title} className="mb-[4.5rem] last:mb-0">
        <div className="flex items-baseline gap-6 mb-6 pb-4 border-b border-border flex-wrap transition-colors duration-300">
          <div className="font-serif-dm text-[1.6rem] text-foreground whitespace-nowrap transition-colors duration-300">{cat.title}</div>
          <div className="text-[0.85rem] text-ink-soft font-light leading-[1.6] flex-1 min-w-[200px]">{cat.desc}</div>
          <div className="font-mono-dm text-[0.68rem] tracking-[0.1em] text-ink-muted whitespace-nowrap px-2.5 py-1 border border-border rounded-sm">{cat.count}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cat.cards.map((c) => (
            <ProjectCardComponent key={c.title} card={c} />
          ))}
        </div>
      </ScrollReveal>
    ))}
    <ScrollReveal className="text-center mt-14">
      <Link to="/projects" className="inline-flex items-center gap-2.5 font-mono-dm text-[0.78rem] tracking-[0.12em] uppercase text-primary border border-primary px-7 py-3 rounded-sm no-underline hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
        See all projects & galleries →
      </Link>
    </ScrollReveal>
  </section>
);

export default ProjectsSection;
