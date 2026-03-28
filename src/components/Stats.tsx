import ScrollReveal from "./ScrollReveal";

const stats = [
  { num: "90%", title: "Staff Utilization", desc: "Achieved via a fully automated data collection system built across multiple business units in Google Workspace." },
  { num: "25%", title: "AHT Reduction", desc: "Through neural-network-style troubleshooting workflows guiding support agents through resolutions in real time." },
  { num: "hrs→min", title: "Processing Time Slashed", desc: "Across scorecard automation, Tableau pipelines, and eNPS reporting — cut from hours down to minutes." },
  { num: "📬", title: "Zero-Click Insights", desc: "Designed Tableau reports with static, infographic-style layouts built for Subscriptions — complete, polished data snapshots delivered on a schedule, straight to stakeholders' inboxes. No login required." },
];

const Stats = () => (
  <div id="stats" className="bg-background pb-20 transition-colors duration-300">
    <ScrollReveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-border transition-colors duration-300">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-8 flex flex-col gap-2 border-r border-border last:border-r-0 hover:bg-[hsl(var(--stat-hover))] transition-all duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            <div className="font-serif-dm text-[2.6rem] leading-none text-primary">{s.num}</div>
            <div className="text-[0.9rem] font-medium text-foreground transition-colors duration-300">{s.title}</div>
            <div className="text-[0.78rem] text-ink-soft leading-[1.6] font-light">{s.desc}</div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  </div>
);

export default Stats;
