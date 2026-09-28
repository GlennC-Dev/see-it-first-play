
export interface Project {
  id: number;
  title: string;
  slug?: string; // used in the browser-chrome gallery's fake URL bar
  desc: string;
  impact: string;
  frequency?: string; // draft-extracted from desc, refine wording later
  audience?: string; // draft-extracted from desc, refine wording later
  tags: string[];
  icon: string;
  photos: (string | null)[];
  photoCaptions?: string[]; // optional, parallel to photos[]
  category: string;
  link?: string;
  linkLabel?: string;
}

export interface Category {
  key: string;
  slug: string;
  title: string;
  desc: string;
  previewLayout: "row-list" | "grid"; // row-list = Data Viz treatment, grid = default lightbox grid
  cardImage?: string; // 👈 optional. Image shown on the right side of this category's card on the Projects page, fading diagonally into the card. Omit = plain card.
  cardImagePosition?: string; // 👈 optional CSS object-position for that image (crop focus), e.g. "50% 58%" = centered horizontally, 58% down. Raise the 2nd number to show lower parts of the image.
  thumbnailHeight?: number; // 👈 row-list only. Fixed px height of each row's thumbnail box at the 280px desktop width. Pick per-category based on that category's typical image ratio — see comment above the thumbnail box in ProjectCategoryPage.tsx for the full explanation.
}

export const CATEGORIES: Category[] = [
  {
    key: "Data Visualizations",
    slug: "data-visualizations",
    title: "Data Visualizations",
    desc: "Dashboards made for self-service consumption and automated delivery\u00A0",
    previewLayout: "row-list",
    cardImage: "/project-photos/projects_dataviz_3_dailyrpt_1.jpg", // pilot: Agent Productivity dashboard
    cardImagePosition: "50% 56%", // 👈 crop focus: lands on the donut + stacked bars
    thumbnailHeight: 303, // Chat Operations Dashboard's ratio (1200x1300) at 280px wide
  },
  {
    key: "Case Study & Technical Writing",
    slug: "case-study-technical-writing",
    title: "Case Study & Technical\u00A0\nWriting",
    desc: "Turning complex workflows into clear, actionable frameworks.",
    previewLayout: "row-list",
    thumbnailHeight: 157, // ~16:9, matches the 3 landscape slide screenshots (SIP101's portrait diagram will be cropped until its own cover image is supplied)
  },
  {
    key: "Apps Script",
    slug: "apps-script",
    title: "Apps Script\u00A0\nAutomated Reports",
    desc: "Scripted reports, form maintenance, and internal tooling that replace recurring manual work.",
    previewLayout: "row-list",
    thumbnailHeight: 151, // avg of the 3 landscape screenshots (Report Gen, ENPS, DBMS). Google Forms Maintenance's photo is portrait (689x1217) and will crop hard until a wider cover image replaces it — same situation as SIP101 in Case Study.
  },
  {
    key: "Workflow Automations",
    slug: "workflow-automations",
    title: "n8n\u00A0\nWorkflow Automations",
    desc: "End-to-end automated systems built on n8n — pipelines that trigger, process, and deliver without a person in the loop.",
    previewLayout: "row-list",
    thumbnailHeight: 198, // matches N8N-Powered Personal Assistant's own ratio (1065x752) exactly — only 1 project right now, so zero crop. Recalculate once more projects are added with different ratios.
  },
  {
    key: "Web Apps",
    slug: "web-apps",
    title: "Small Web\u00A0\nApps",
    desc: "Standalone tools and apps.",
    previewLayout: "grid",
  },
];

export const PROJECTS: Project[] = [
  // ============================================================
  // Data Visualizations
  // ============================================================
  {
    id: 15,
    title: "Customer Experience Dashboard",
    slug: "customer-experience-dashboard",
    desc: "A self-service Customer Experience Score dashboard suite spanning brand, chevron, team leader, and agent-day views — giving operations and team leaders direct visibility into CSAT, CES, and NPS trends without a single manual report request.",
    impact: "CX Performance at Every Grain — Without Asking for It",
    frequency: "On-Demand (Self-Service)",
    audience: "Operations & Team Leaders",
    tags: ["Tableau"],
    icon: "📊",
    photos: [
      "/project-photos/projects_dataviz_1_ces_1.jpg",
      "/project-photos/projects_dataviz_1_ces_2.jpg",
    ],
    photoCaptions: [
      "Per Brand and Per Chevron CES View",
      "Team-Agent Performance View",
    ],
    category: "Data Visualizations",
  },
  {
    id: 16,
    title: "Chat Operations Dashboard",
    slug: "chat-operations-dashboard",
    desc: "A fully automated Chat Operations reporting suite covering queue health, transfer patterns, agent productivity, and bi-hourly intraday snapshots — delivered to operations leaders on schedule, every day, without a single manual pull.",
    impact: "Queue Health to Agent Grain — Delivered SOD",
    frequency: "Daily + Bi-Hourly",
    audience: "Operations Leaders",
    tags: ["Salesforce", "Tableau"],
    icon: "💬",
    photos: [
      "/project-photos/projects_dataviz_2_sfchat_1.jpg",
      "/project-photos/projects_dataviz_2_sfchat_2.jpg",
      "/project-photos/projects_dataviz_2_sfchat_3.png",
      "/project-photos/projects_dataviz_2_sfchat_4.jpg",
    ],
    photoCaptions: [
      "Chat Queue Performance Report",
      "Chat Transfer Report",
      "Agent Performance Report",
      "Bi-Hourly Chat Volume Report",
    ],
    category: "Data Visualizations",
  },
  {
    id: 17,
    title: "Agent and TL Productivity Suite",
    slug: "agent-and-tl-productivity-suite",
    desc: "A cascading D-1 productivity suite delivered daily — team leaders receive agent-level calls, AHT, occupancy, aux usage, and CES; program managers get the same rolled up to team level alongside queue health. Aux monitoring flags overages before they become a pattern.",
    impact: "Agent to Program Manager — Every Layer, Every Morning",
    frequency: "Daily",
    audience: "Team Leaders & Program Managers",
    tags: ["Tableau"],
    icon: "👥",
    photos: [
      "/project-photos/projects_dataviz_3_dailyrpt_1.jpg",
      "/project-photos/projects_dataviz_3_dailyrpt_2.jpg",
      "/project-photos/projects_dataviz_3_dailyrpt_3.jpg",
    ],
    photoCaptions: [
      "Agent Productivity Report for Team Leaders",
      "Overall Performance Report for Program Managers",
      "Daily Aux Monitoring Report",
    ],
    category: "Data Visualizations",
  },

  {
    id: 18,
    title: "Queue Intelligence",
    slug: "queue-intelligence",
    desc: "A D-1 queue summary delivered every morning and a week-on-week view sent every Monday — giving operations managers a complete picture of call volume, SLA performance, abandon rates, and interval-level patterns across all business units, automatically, without a single manual pull.",
    impact: "Operational Pulse — Daily and Weekly, Before Anyone Asks",
    frequency: "Daily + Weekly",
    audience: "Operations Managers",
    tags: ["Tableau"],
    icon: "🗓️",
    photos: [
      "/project-photos/projects_dataviz_4_queuerpt_1.jpg",
      "/project-photos/projects_dataviz_4_queuerpt_2.jpg",
    ],
    photoCaptions: [
      "Queue Performance Report for Yesterday",
      "Queue Performance Report for MTD",
    ],
    category: "Data Visualizations",
  },
  
  {
    id: 19,
    title: "Manager Reports",
    slug: "manager-reports",
    desc: "A bi-monthly manager briefing built so that every question in a business review is answered before it's asked. Three LOB variants — Technical Support, Sales & Activations, and Customer Service — each surfacing queue health, productivity, shift utilization, and LOB-specific KPIs across two brands simultaneously. Eight independent data sources, one question: how did the business do?",
    impact: "Every LOB. Every Metric. One Report",
    frequency: "Bi-Monthly",
    audience: "Managers (3 LOB Variants)",
    tags: ["Tableau"],
    icon: "🧭",
    photos: [
      "/project-photos/projects_dataviz_5_mgrview_1.jpg",
      "/project-photos/projects_dataviz_5_mgrview_2.jpg",
      "/project-photos/projects_dataviz_5_mgrview_3.jpg",
    ],
    photoCaptions: [
      "Manager View for Technical Support Campaign",
      "Manager View for Sales and Activations Campaigns",
      "Manager View for Customer Service Campaigns",
    ],
    category: "Data Visualizations",
  },

  // { id: 0, title: "Tableau BI Dashboard Suite", desc: "A multi-report Tableau visualization suite built to eliminate repetitive manual data transformation. Analysts stopped spending hours on data prep and started spending that time on the insights that actually matter.", impact: "🔁 Manual prep fully eliminated", tags: ["Tableau", "BI", "Python"], icon: "📉", photos: [null, null, null, null], category: "Data Visualizations" },
  // { id: 1, title: "Subscription-Ready Infographic Reports", desc: "Redesigned reports with static sizing and infographic-style layouts engineered for Tableau's Subscription email feature. Stakeholders receive the full, polished report on a schedule — no login, no friction.", impact: "📧 Zero-click delivery to stakeholders", tags: ["Tableau", "Subscriptions", "Infographic Design"], icon: "📬", photos: [null, null], category: "Data Visualizations" },
  // { id: 2, title: "Tableau Visualization Project 3", desc: "Placeholder project for an upcoming Tableau visualization. Details and screenshots will be added soon.", impact: "📊 Coming soon", tags: ["Tableau", "BI"], icon: "📊", photos: [null], category: "Data Visualizations" },

  // ============================================================
  // Apps Script + Workflow Automations (n8n) — 5 ported items + 1 placeholder
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
      "/project-photos/projects_appscript_1_reportgeneration_1.png",
      "/project-photos/projects_appscript_1_reportgeneration_2.png",
      "/project-photos/projects_appscript_1_reportgeneration_3.png",
      "/project-photos/projects_appscript_1_reportgeneration_4.png",
      "/project-photos/projects_appscript_1_reportgeneration_5.png",
    ],
    photoCaptions: [
      "Apps Script function for automated data replacement and cell updating with processing counter",
      "Data filtering and deletion logic for removing rows based on column criteria",
      "Find and replace automation for standardizing data across spreadsheet ranges",
      "Duplicate removal algorithm with unique value tracking and automated cleanup",
      "Master checker function orchestrating the complete automation workflow",
    ],
    category: "Apps Script",
  },
  {
    id: 4,
    title: "ENPS Automation",
    desc: "Designed and deployed a fully automated Employee Net Promoter Score system that runs bi-monthly, sends surveys via script, and calculates scores in real time — delivering hands-free insights for leadership without manual intervention.",
    impact: "⏱️ Bi-monthly, fully hands-free",
    tags: ["Apps Script", "Google Workspace"],
    icon: "📬",
    photos: [
      "/project-photos/projects_appscript_2_enps_1.png",
      "/project-photos/projects_appscript_2_enps_2.png",
      "/project-photos/projects_appscript_2_enps_3.png",
    ],
    photoCaptions: [
      "Apps Script automation code for ENPS data processing",
      "Live ENPS dashboard with real-time score calculation and breakdown",
      "Detailed ENPS analysis by category and department",
    ],
    category: "Apps Script",
  },
  {
    id: 6,
    title: "Google Forms Maintenance",
    desc: "Engineered a self-monitoring Apps Script system that auto-polls Google Forms response counts, alerts stakeholders at threshold, and clears entries preemptively to prevent sync failures past the 100K cap — fully automated across multiple forms.",
    impact: "🛡️ Zero sync failures past 100K cap",
    tags: ["Apps Script", "Google Workspace"],
    icon: "📋",
    photos: [
      "/project-photos/projects_appscript_3_oversight_1.png",
      "/project-photos/projects_appscript_3_oversight_2.png",
      "/project-photos/projects_appscript_3_oversight_3.png",
      "/project-photos/projects_appscript_3_oversight_4.png",
    ],
    photoCaptions: [
      "Automated workflow diagram for Google Forms response monitoring and maintenance",
      "Apps Script function for retrieving Google Forms response count and timestamp tracking",
      "Automated response clearing logic with email notification system for form oversight",
      "Time-based triggers configuration for automated form monitoring and maintenance",
    ],
    category: "Apps Script",
  },
  {
    id: 7,
    title: "DBMS with Version Control",
    desc: "Built a rule-enforced Google Sheets database system with input validation, version tracking, and automated change alerts — transforming a chaotic flat file into a controlled, traceable platform with email notifications and full audit trails.",
    impact: "🧾 Full audit trail + change alerts",
    tags: ["Apps Script", "Google Workspace"],
    icon: "🗃️",
    photos: [
      "/project-photos/projects_appscript_4_dbms_1.png",
      "/project-photos/projects_appscript_4_dbms_2.png",
      "/project-photos/projects_appscript_4_dbms_3.png",
      "/project-photos/projects_appscript_4_dbms_4.png",
    ],
    photoCaptions: [
      "Apps Script function for database error handling and input validation with automated notification system",
      "Database management workflow showing data extraction, validation, and automated email population for change requests",
      "Request processing automation with status tracking, range manipulation, and email notification system for database updates",
      "Version control tracking spreadsheet showing request status, dates, ticket references, and change history for database management",
    ],
    category: "Apps Script",
  },
  {
    id: 8,
    title: "N8N-Powered Personal Assistant",
    desc: "Created a modular AI-powered Telegram bot workflow via n8n that delivers daily weather, news, and finance insights through secure intent-based routing. Integrates OpenWeather API, RSS feeds, and Google Sheets, with AI agents (Google Gemini) for intent classification and personalized responses.",
    impact: "🤖 Modular AI routing in Telegram",
    tags: ["n8n", "API's", "RSS Feeds", "Google Workspace"],
    icon: "🧠",
    photos: [
      "/project-photos/projects_workflowautomation_n8npa_1.png",
      "/project-photos/projects_workflowautomation_n8npa_2.png",
      "/project-photos/projects_workflowautomation_n8npa_3.png",
      "/project-photos/projects_workflowautomation_n8npa_4.png",
      "/project-photos/projects_workflowautomation_n8npa_5.png",
    ],
    photoCaptions: [
      "Complete n8n workflow architecture showing modular design with Telegram trigger, AI agents, and specialized modules for weather, news, and finance analytics",
      "Core routing logic with Telegram trigger, AI Agent for intent classification, and conditional switching for modular message handling",
      "Weather Module: Fetches data from OpenWeather API, processes through AI agent with Google Gemini, and sends interpreted forecasts via Telegram",
      "Current Events Module: Aggregates RSS feeds from multiple sources, filters by interests, and delivers curated news summaries through LLM chains",
      "Finance Analytics Module: Connects to Google Sheets for transaction tracking, forecasting, and personalized financial insights via AI agent",
    ],
    category: "Workflow Automations",
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
      "/project-photos/projects_casetechwriting_1_lssgb_1.png",
      "/project-photos/projects_casetechwriting_1_lssgb_2.png",
      "/project-photos/projects_casetechwriting_1_lssgb_3.png",
      "/project-photos/projects_casetechwriting_1_lssgb_4.png",
      "/project-photos/projects_casetechwriting_1_lssgb_5.png",
      "/project-photos/projects_casetechwriting_1_lssgb_6.png",
      "/project-photos/projects_casetechwriting_1_lssgb_7.png",
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
      "/project-photos/projects_casetechwriting_2_timemgmt_1.png",
      "/project-photos/projects_casetechwriting_2_timemgmt_2.png",
      "/project-photos/projects_casetechwriting_2_timemgmt_3.png",
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
      "/project-photos/projects_casetechwriting_3_portfoliobuilding_1.png",
      "/project-photos/projects_casetechwriting_3_portfoliobuilding_2.png",
      "/project-photos/projects_casetechwriting_3_portfoliobuilding_3.png",
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
      "/project-photos/projects_casetechwriting_4_sip_1.png",
      "/project-photos/projects_casetechwriting_4_sip_2.png",
      "/project-photos/projects_casetechwriting_4_sip_3.png",
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
