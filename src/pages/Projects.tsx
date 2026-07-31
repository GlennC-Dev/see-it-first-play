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
  photoCaptions?: string[]; // optional, parallel to photos[]
  category: string;
  link?: string;
  linkLabel?: string;
}

interface Category {
  key: string;
  title: string;
  desc: string;
}

const CATEGORIES: Category[] = [
  {
    key: "Tableau Visualizations",
    title: "Self Service Analytics and Automated Reporting",
    desc: "Tableau and PowerBI Dashboards engineered for self-service consumption and automated delivery\u00A0— so stakeholders get accurate, scheduled insights without a single manual touchpoint.",
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
  // ============================================================
  // Tableau Visualizations
  // ============================================================
  {
    id: 15,
    title: "Customer Experience Dashboard",
    desc: "A self-service Customer Experience Score dashboard suite spanning brand, chevron, team leader, and agent-day views — giving operations and team leaders direct visibility into CSAT, CES, and NPS trends without a single manual report request.",
    impact: "CX Performance at Every Grain — Without Asking for It",
    tags: ["Tableau"],
    icon: "📊",
    photos: [
      "/__l5e/assets-v1/2a15514e-1ce1-488f-ab51-f0f4ec5436d7/ces-summary.jpg",
      "/__l5e/assets-v1/3112bf16-ea8f-4a34-b32f-9b7c30ceb716/agent-summary.jpg",
    ],
    photoCaptions: [
      "Per Brand and Per Chevron CES View",
      "Team-Agent Performance View",
    ],
    category: "Tableau Visualizations",
  },
  {
    id: 16,
    title: "Chat Operations Dashboard",
    desc: "A fully automated Chat Operations reporting suite covering queue health, transfer patterns, agent productivity, and bi-hourly intraday snapshots — delivered to operations leaders on schedule, every day, without a single manual pull.",
    impact: "Queue Health to Agent Grain — Delivered SOD",
    tags: ["Salesforce", "Tableau"],
    icon: "💬",
    photos: [
      "/__l5e/assets-v1/bcb8685c-f1aa-43e8-87ef-6bf775bf995a/chat-queue.jpg",
      "/__l5e/assets-v1/e08facd8-680b-4665-92e9-11dcf7937fab/chat-transfer.jpg",
      "/__l5e/assets-v1/8907e61c-b328-4b43-973c-2b2e0444ac6d/chat-agent-productivity.jpg",
      "/__l5e/assets-v1/c67a73dd-da1d-473c-8974-027f17d32eca/ops-chat.jpg",
    ],
    photoCaptions: [
      "Chat Queue Performance Report",
      "Chat Transfer Report",
      "Agent Performance Report",
      "Bi-Hourly Chat Volume Report",
    ],
    category: "Tableau Visualizations",
  },
  {
    id: 17,
    title: "Daily Operations Reports",
    desc: "TBD — add description.",
    impact: "TBD",
    tags: ["TBD"],
    icon: "🗓️",
    photos: [
      "/__l5e/assets-v1/e44df178-1f31-41af-bac3-0daecd6af070/ops-1-2.jpg",
      "/__l5e/assets-v1/355faae6-573b-4646-b9e0-2eb54cedd9d0/ops-2-2.jpg",
      "/__l5e/assets-v1/d463df1d-a70b-498e-a63f-2c3adfd3be12/ops-3-2.jpg",
      "/__l5e/assets-v1/63fb73ad-4edc-46c0-9f56-3d51a9cfb1b6/ops-4.jpg",
      "/__l5e/assets-v1/30d94da5-edb3-4c4a-a91f-448fdcb28b47/ops-5.jpg",
    ],
    photoCaptions: [
      "Agent Productivity Report for Team Leaders",
      "Overall Performance Report for Program Managers",
      "Queue Performance Report for Yesterday",
      "Queue Performance Report for MTD",
      "Daily Aux Monitoring Report",
    ],
    category: "Tableau Visualizations",
  },
  {
    id: 18,
    title: "Manager Reports",
    desc: "TBD — add description.",
    impact: "TBD",
    tags: ["Tableau"],
    icon: "🧭",
    photos: [
      "/__l5e/assets-v1/beb9651e-6210-4ee9-bcc0-c85c19b44e47/mgr-1-3.jpg",
      "/__l5e/assets-v1/dc0a6a20-b85b-458b-9bf6-925f5d90efba/mgr-2-3.jpg",
      "/__l5e/assets-v1/cdc915ff-49f8-4746-a31a-52e20bffbb76/mgr-3-3.jpg",
      "/__l5e/assets-v1/f0943bbb-65be-42f4-ac1f-700ae3d0c9fc/mgr-4-2.jpg",
    ],
    photoCaptions: [
      "Manager View for Technical Support Campaign",
      "Manager View for Sales and Activations Campaigns",
      "Manager View for Customer Service Campaigns",
      "Customized Operational Performance View for Voice Campaign",
    ],
    category: "Tableau Visualizations",
  },



  // { id: 0, title: "Tableau BI Dashboard Suite", desc: "A multi-report Tableau visualization suite built to eliminate repetitive manual data transformation. Analysts stopped spending hours on data prep and started spending that time on the insights that actually matter.", impact: "🔁 Manual prep fully eliminated", tags: ["Tableau", "BI", "Python"], icon: "📉", photos: [null, null, null, null], category: "Tableau Visualizations" },
  // { id: 1, title: "Subscription-Ready Infographic Reports", desc: "Redesigned reports with static sizing and infographic-style layouts engineered for Tableau's Subscription email feature. Stakeholders receive the full, polished report on a schedule — no login, no friction.", impact: "📧 Zero-click delivery to stakeholders", tags: ["Tableau", "Subscriptions", "Infographic Design"], icon: "📬", photos: [null, null], category: "Tableau Visualizations" },
  // { id: 2, title: "Tableau Visualization Project 3", desc: "Placeholder project for an upcoming Tableau visualization. Details and screenshots will be added soon.", impact: "📊 Coming soon", tags: ["Tableau", "BI"], icon: "📊", photos: [null], category: "Tableau Visualizations" },

  // ============================================================
  // Workflow Automation — 6 ported items + 1 placeholder
  // To add another item: copy the PLACEHOLDER block at the bottom
  // of this section and edit the fields.
  // ============================================================
  {
    id: 3,
    title: "Script-Driven Report Generation",
    desc: "Cut report generation time by over 90% using Apps Script and smart cell logic in Google Sheets, reducing a 1-hour manual workflow to a streamlined, sub-5-minute process. Comprehensive solution that automates report generation by performing data cleaning, standardization, duplicate removal, and formatting.",
    impact: "⚡ 1 hour → under 5 minutes",
    tags: ["Apps Script", "Google Sheets"],
    icon: "📊",
    photos: [
      "/lovable-uploads/a737e0bf-ca8d-465b-a1ed-59c528ddc573.png",
      "/lovable-uploads/3e9f78c1-acea-4fd3-8dd5-62ed5cbacb35.png",
      "/lovable-uploads/40bd7441-88e5-4417-8db8-98c456091cca.png",
      "/lovable-uploads/ae323709-74a6-4981-82e8-8f6f31f3b9ca.png",
      "/lovable-uploads/70580fba-0ee6-42ca-af20-278084b2390f.png",
    ],
    photoCaptions: [
      "Apps Script function for automated data replacement and cell updating with processing counter",
      "Data filtering and deletion logic for removing rows based on column criteria",
      "Find and replace automation for standardizing data across spreadsheet ranges",
      "Duplicate removal algorithm with unique value tracking and automated cleanup",
      "Master checker function orchestrating the complete automation workflow",
    ],
    category: "Workflow Automation",
  },
  {
    id: 4,
    title: "ENPS Automation",
    desc: "Designed and deployed a fully automated Employee Net Promoter Score system that runs bi-monthly, sends surveys via script, and calculates scores in real time — delivering hands-free insights for leadership without manual intervention.",
    impact: "⏱️ Bi-monthly, fully hands-free",
    tags: ["Apps Script", "Google Workspace"],
    icon: "📬",
    photos: [
      "/lovable-uploads/f3a360d0-8a74-4a99-b2c2-77ddae39f9a8.png",
      "/lovable-uploads/ad346f37-c2d1-4c5d-a9e0-1d1b2dae4de1.png",
      "/lovable-uploads/65527ee2-75a8-4c13-afc6-7ade896d0eaf.png",
    ],
    photoCaptions: [
      "Apps Script automation code for ENPS data processing",
      "Live ENPS dashboard with real-time score calculation and breakdown",
      "Detailed ENPS analysis by category and department",
    ],
    category: "Workflow Automation",
  },
  {
    id: 5,
    title: "JIRA Project Management",
    desc: "Built and customized a JIRA project from scratch using self-guided tutorials, replicating operational workflows across departments to simulate real-world admin-level configuration. Includes custom workflows, issue types, and field configurations.",
    impact: "🛠️ Admin-level config from scratch",
    tags: ["JIRA", "Workflow Design"],
    icon: "🗂️",
    photos: [
      "/lovable-uploads/0572075e-c8b8-4025-abc1-5fed2c95a2d4.png",
      "/lovable-uploads/5e04d1bd-e0b2-4158-ba4c-2933fb0219e2.png",
    ],
    photoCaptions: [
      "JIRA project configuration showing custom issue types and field management",
      "Workflow diagram for customer service requests with status transitions and approval processes",
    ],
    category: "Workflow Automation",
  },
  {
    id: 6,
    title: "Google Forms Maintenance",
    desc: "Engineered a self-monitoring Apps Script system that auto-polls Google Forms response counts, alerts stakeholders at threshold, and clears entries preemptively to prevent sync failures past the 100K cap — fully automated across multiple forms.",
    impact: "🛡️ Zero sync failures past 100K cap",
    tags: ["Apps Script", "Google Workspace"],
    icon: "📋",
    photos: [
      "/lovable-uploads/8343aa5d-877e-46af-a94f-25ded19011d7.png",
      "/lovable-uploads/3eb1fdb2-12e9-4fc9-bbb1-0b1715cfbff3.png",
      "/lovable-uploads/b36c299e-accf-4e5c-b342-b49ff6f282e6.png",
      "/lovable-uploads/c8d40977-2e76-4e14-b652-ca62897cab64.png",
    ],
    photoCaptions: [
      "Automated workflow diagram for Google Forms response monitoring and maintenance",
      "Apps Script function for retrieving Google Forms response count and timestamp tracking",
      "Automated response clearing logic with email notification system for form oversight",
      "Time-based triggers configuration for automated form monitoring and maintenance",
    ],
    category: "Workflow Automation",
  },
  {
    id: 7,
    title: "DBMS with Version Control",
    desc: "Built a rule-enforced Google Sheets database system with input validation, version tracking, and automated change alerts — transforming a chaotic flat file into a controlled, traceable platform with email notifications and full audit trails.",
    impact: "🧾 Full audit trail + change alerts",
    tags: ["Apps Script", "Google Workspace"],
    icon: "🗃️",
    photos: [
      "/lovable-uploads/8b8f6ca2-9dd4-4a35-b743-2cd1fae1cc50.png",
      "/lovable-uploads/8fb6f209-3b1c-4399-a77d-ecca2001dad3.png",
      "/lovable-uploads/072b11fd-2030-4070-b161-88a524beebba.png",
      "/lovable-uploads/2ac587d0-ceca-4814-a979-0ac42a4901ed.png",
    ],
    photoCaptions: [
      "Apps Script function for database error handling and input validation with automated notification system",
      "Database management workflow showing data extraction, validation, and automated email population for change requests",
      "Request processing automation with status tracking, range manipulation, and email notification system for database updates",
      "Version control tracking spreadsheet showing request status, dates, ticket references, and change history for database management",
    ],
    category: "Workflow Automation",
  },
  {
    id: 8,
    title: "N8N-Powered Personal Assistant",
    desc: "Created a modular AI-powered Telegram bot workflow via n8n that delivers daily weather, news, and finance insights through secure intent-based routing. Integrates OpenWeather API, RSS feeds, and Google Sheets, with AI agents (Google Gemini) for intent classification and personalized responses.",
    impact: "🤖 Modular AI routing in Telegram",
    tags: ["n8n", "API's", "RSS Feeds", "Google Workspace"],
    icon: "🧠",
    photos: [
      "/lovable-uploads/n8n-workflow-overview.png",
      "/lovable-uploads/n8n-telegram-trigger.png",
      "/lovable-uploads/n8n-weather-module.png",
      "/lovable-uploads/n8n-news-module.png",
      "/lovable-uploads/n8n-finance-module.png",
    ],
    photoCaptions: [
      "Complete n8n workflow architecture showing modular design with Telegram trigger, AI agents, and specialized modules for weather, news, and finance analytics",
      "Core routing logic with Telegram trigger, AI Agent for intent classification, and conditional switching for modular message handling",
      "Weather Module: Fetches data from OpenWeather API, processes through AI agent with Google Gemini, and sends interpreted forecasts via Telegram",
      "Current Events Module: Aggregates RSS feeds from multiple sources, filters by interests, and delivers curated news summaries through LLM chains",
      "Finance Analytics Module: Connects to Google Sheets for transaction tracking, forecasting, and personalized financial insights via AI agent",
    ],
    category: "Workflow Automation",
  },
  // PLACEHOLDER — duplicate this block to add a new workflow automation project
  //{
    //id: 9,
    //title: "Workflow Automation Project (Placeholder)",
    //desc: "Placeholder slot for an upcoming workflow automation build. Replace this entry with title, desc, impact, tags, photos, and photoCaptions when ready.",
    //impact: "⚙️ Coming soon",
    //tags: ["Automation"],
    //icon: "⚙️",
    //photos: [null],
    //category: "Workflow Automation",
  //},

  // ============================================================
  // Case Study & Technical Writing — 4 ported items + 1 placeholder
  // To add another item: copy the PLACEHOLDER block at the bottom
  // of this section and edit the fields.
  // ============================================================
  {
    id: 10,
    title: "Lean Six Sigma for Financial Analysis",
    desc: "Applied DMAIC-driven Lean Six Sigma methodology to a hypothetical financial crisis, designing a budget control system that reversed projected hardship through asset and resource optimization. Identified root causes of budget variances, implemented structured controls, and achieved sustained budget adherence across all categories.",
    impact: "📉 Sustained budget adherence post-DMAIC",
    tags: ["Lean Six Sigma", "Stakeholder Management", "MS365"],
    icon: "🧮",
    photos: [
      "/lovable-uploads/2f1d9041-059a-4f11-9653-919c3fff6018.png",
      "/lovable-uploads/cb5eaa9b-eb68-4297-8294-b8514bc4579c.png",
      "/lovable-uploads/97922668-30ac-4553-9533-2db62c4d7cc2.png",
      "/lovable-uploads/bb22afa5-94ce-4303-9973-d641859c164f.png",
      "/lovable-uploads/d2cf294c-1e29-439e-b863-3c186d9337d5.png",
      "/lovable-uploads/2c311872-e2aa-4768-b86a-74f2087633fd.png",
      "/lovable-uploads/c69851d7-984a-4534-805c-51aa29982dec.png",
    ],
    photoCaptions: [
      "DEFINE: Risk Assessment and Response Plan — comprehensive risk matrix identifying financial challenges and mitigation strategies",
      "MEASURE: Integrated Flowchart — process flow analysis showing current financial management cycle and inefficiencies",
      "ANALYSE: Budget vs Actual via Paired Sample T-Test — statistical analysis revealing significant budget variances across expenditure categories",
      "ANALYSE: Validated Root Causes — identification of key factors including risk management, overspending, and planning gaps",
      "IMPROVE: Implementation Plan — baseline performance tracking showing alignment of actual spending with budgeted expectations",
      "IMPROVE: FMEA on Implementation Plan — Failure Mode and Effects Analysis ensuring robust implementation of financial controls",
      "CONTROL: Post-Implementation Performance — sustained budget adherence across all expense categories post-implementation",
    ],
    category: "Case Study & Technical Writing",
  },
  {
    id: 11,
    title: "Training Deck for Time Management Techniques",
    desc: "Created a time management training deck for analysts, blending research and firsthand experience into a practical guide for improving focus, prioritization, and daily workflow discipline. Covers proven methodologies like 'Eat That Frog' and Time Blocking.",
    impact: "🎯 Practical focus + prioritization toolkit",
    tags: ["Training", "Project Management"],
    icon: "🎓",
    photos: [
      "/lovable-uploads/1b3f7872-ed8b-4046-a4f7-9e0d69386b3d.png",
      "/lovable-uploads/210c13ce-6684-489a-91d3-ad58432ab7b9.png",
      "/lovable-uploads/6f3201aa-b2f1-4d27-8066-09aaf66edf94.png",
    ],
    photoCaptions: [
      "Title slide: Mastering the Art of Time — Professional Techniques for Effective Time Management",
      "Technique 2: Eat That Frog — tackling the most challenging task first to overcome procrastination and boost productivity",
      "Technique 4: Time Blocking — allocating specific time blocks to tasks for prioritization and focused, uninterrupted work",
    ],
    link: "https://docs.google.com/presentation/d/13qrHcai4HhWmjIRKk5eMt6jfP0OCQZDVu0VybFjZCiU/edit?usp=sharing",
    linkLabel: "View full slideshow",
    category: "Case Study & Technical Writing",
  },
  {
    id: 12,
    title: "AI-Assisted Online Portfolio Building for Analysts",
    desc: "Developed a training deck to teach associates prompt engineering and no-code tools, empowering them to build personalized online portfolios that showcase their skills without needing web development experience. Covers the full workflow from Lovable.dev creation to GitHub Pages deployment.",
    impact: "🚀 No-code portfolio enablement",
    tags: ["Training", "Lovable.dev", "GitHub", "Prompt Engineering"],
    icon: "🧰",
    photos: [
      "/lovable-uploads/3af5696e-3da1-4d80-a7e3-2abc61e97f87.png",
      "/lovable-uploads/6eef3621-65c7-4ada-82f4-395829308ae6.png",
      "/lovable-uploads/cc9dbf2d-ffab-41d6-bfeb-e706c6865811.png",
    ],
    photoCaptions: [
      "Title slide: Building Online Portfolios for Business Insights Analysts using AI, Lovable.dev and GitHub",
      "Workflow overview: three-step process from Lovable.dev AI creation to manual customization to GitHub Pages deployment",
      "Implementation guide: four-step process from prompt creation to live portfolio deployment with GitHub integration",
    ],
    link: "https://docs.google.com/presentation/d/1a64xQIAgWnZJ03lF7aFuHV_2zsB5NDLU6uvUPovmBUM/edit?usp=sharing",
    linkLabel: "View full slideshow",
    category: "Case Study & Technical Writing",
  },
  {
    id: 13,
    title: "Knowledge Article for SIP101",
    desc: "Authored a SIP101 training article and companion deck to establish core VoIP fundamentals, equipping agents and support staff with a framework for accurate issue identification and deeper product understanding. Covers SIP call flow, registration, and end-to-end communication workflows.",
    impact: "📞 Reusable VoIP reference for support",
    tags: ["Technical Writing", "VoIP", "SIP", "Training"],
    icon: "📡",
    photos: [
      "/lovable-uploads/ca38b033-480b-4a83-bbeb-b743cf88aecb.png",
      "/lovable-uploads/c80d89d2-63f6-4e64-8f7b-c1339be8a031.png",
      "/lovable-uploads/9c4470f5-d67f-45bf-9937-0d7aa1ecf717.png",
    ],
    photoCaptions: [
      "SIP Call Flow: diagram illustrating SIP trapezoid architecture with proxy servers and user agent communication",
      "The Registration Process: SIP endpoint registration workflow showing AOR binding and location service interaction",
      "SIP Communication Flow: complete call establishment process between user agents through proxy servers and DNS resolution",
    ],
    link: "https://docs.google.com/document/d/1YjFRY2uslpvf3HjItRL5uxJ8mJ-IJilxvys72gEXG8g/edit?usp=sharing",
    linkLabel: "View full article",
    category: "Case Study & Technical Writing",
  },
  // PLACEHOLDER — duplicate this block to add a new case study / technical writing item
  //{
    //id: 14,
    //title: "Case Study Project (Placeholder)",
    //desc: "Placeholder slot for an upcoming case study or technical writing piece. Replace this entry with title, desc, impact, tags, photos, photoCaptions, and optional link/linkLabel when ready.",
    //impact: "📝 Coming soon",
    //tags: ["Case Study"],
    //icon: "📝",
    //photos: [null],
    //category: "Case Study & Technical Writing",
  //},
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
                      {p.photos[0] ? (
                        <img src={p.photos[0]} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-[2.5rem] opacity-20">{p.icon}</div>
                      )}
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
          <div className="bg-card rounded-lg overflow-hidden max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-[1fr_360px] max-h-[90vh]">
            <div className="bg-[#111] relative flex flex-col items-center justify-center min-h-[360px]">
              <div className="relative flex items-center justify-center w-full flex-1">
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
              </div>
              {lbProject.photoCaptions?.[lightbox.photoIdx] && (
                <div className="px-5 py-3 text-[0.75rem] italic text-[rgba(255,255,255,0.75)] text-center leading-[1.5] border-t border-[rgba(255,255,255,0.08)] w-full">
                  {lbProject.photoCaptions[lightbox.photoIdx]}
                </div>
              )}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
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
              {lbProject.link && (
                <a
                  href={lbProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 mb-3 border-[1.5px] border-primary rounded-sm bg-blue-dim font-mono-dm text-[0.72rem] tracking-[0.08em] text-primary hover:bg-primary hover:text-[#fff] transition-colors duration-200"
                >
                  ↗ {lbProject.linkLabel ?? "View full resource"}
                </a>
              )}
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
