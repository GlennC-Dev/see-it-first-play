import { Link } from "react-router-dom";
import { FolderKanban, Layers, User, ArrowUpRight } from "lucide-react";
import { TOOLS, STATS } from "./homeData";

// 👈 Explore tiles — same 4 destinations as before. "to" carries a hash for Services/Work History
// so they land directly on the relevant section of the Skills & Experience page (ScrollToTop.tsx
// handles the hash-scroll). Still worth revisiting: Projects/Services/About overlap with the
// bottom nav's own items — flag if you want this trimmed down to just the non-duplicate entries
// (Work History).
const EXPLORE_ITEMS = [
  {
    n: "01",
    icon: FolderKanban,
    title: "Projects",
    blurb: "Dashboards, automations, and the builds behind them.",
    to: "/projects",
  },
  {
    n: "02",
    icon: Layers,
    title: "Services",
    blurb: "How I work: probe, build, automate.",
    to: "/skills-experience#approach",
  },
  {
    n: "03",
    icon: Layers,
    title: "Work History",
    blurb: "10+ years, frontline support through to BI.",
    to: "/skills-experience#experience",
  },
  {
    n: "04",
    icon: User,
    title: "About",
    blurb: "Background, approach, and what drives the work.",
    to: "/about",
  },
];

const ExploreCard = ({
  n,
  icon: Icon,
  title,
  blurb,
  to,
}: {
  n: string;
  icon: typeof FolderKanban;
  title: string;
  blurb: string;
  to: string;
}) => (
  <Link
    to={to}
    // 👈 Back to stacked (flex-col in the parent below), so no fixed height/width tricks needed
    // this time — plain block layout, sized by its own content, can't overflow the same way a
    // flex ROW of fixed-size siblings could.
    className="block rounded-2xl border border-border bg-card p-3 no-underline hover:border-primary transition-colors duration-200"
  >
    <div className="relative">
      {/* 👈 Numbered badge overlapping the thumbnail's top-left corner — top-3 left-3 controls how
          far it sits from the corner. Placeholder thumbnail below; swap the div for a real <img
          className="w-full h-48 object-cover rounded-xl" /> once you have one. */}
      <div className="absolute top-3 left-3 z-[1] inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3 py-1.5">
        <span className="font-mono-dm text-[0.68rem] tracking-[0.1em]">{n}</span>
        <span className="font-mono-dm text-[0.68rem] tracking-[0.1em] uppercase">{title}</span>
      </div>
      <div className="h-48 rounded-xl bg-blue-dim flex items-center justify-center text-primary/50">
        <Icon size={32} />
      </div>
    </div>

    <div className="relative pt-4 pb-1 pr-14">
      <h3 className="font-serif-dm text-[1.15rem] leading-[1.2] text-foreground mb-1.5">{title}</h3>
      <p className="text-[0.88rem] text-ink-soft font-light leading-[1.5]">{blurb}</p>
      {/* 👈 Circular arrow CTA, bottom-right of the text block — bottom-1 right-0 positions it;
          w-10 h-10 controls its size. */}
      <div className="absolute bottom-1 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
        <ArrowUpRight size={18} />
      </div>
    </div>
  </Link>
);

// Mobile-only Home body, below the Hero. Fully separate component tree from HomeDesktop — only
// one of the two ever mounts (see HomePanel.tsx), so there's no shared flex/grid layout for
// mobile and desktop content to fight over.
const HomeMobile = () => {
  return (
    <>
      {/* Stats strip */}
      <div className="flex items-center justify-center gap-x-10 px-[5vw] py-6 border-b border-border">
        {STATS.map((s) => (
          <div key={s.caption} className="flex flex-col items-center text-center">
            <div className="font-serif-dm text-[1.4rem] leading-none text-primary mb-1.5">{s.value}</div>
            <div className="font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-ink-muted">{s.caption}</div>
          </div>
        ))}
      </div>

      <section className="px-[5vw] pt-9 pb-10">
        {/* Daily Drivers — icon-only on mobile */}
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-5 overflow-x-auto mb-6">
          <div className="shrink-0 pr-5 border-r border-border">
            <p className="font-mono-dm text-[0.65rem] tracking-[0.14em] uppercase text-primary mb-0.5">
              Daily Drivers
            </p>
            <p className="font-semibold text-sm text-foreground whitespace-nowrap">
              Tools I work with
            </p>
          </div>
          {TOOLS.map(({ name, icon }) => (
            <div key={name} className="flex items-center shrink-0 text-ink-soft" title={name}>
              {icon}
            </div>
          ))}
        </div>

        {/* 👈 Explore — stacked vertically (reverted from horizontal scroll, which broke the UI
            when tested live). New card style: numbered badge over a thumbnail, headline +
            description below, circular arrow CTA. */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-base text-foreground">Explore</span>
        </div>
        <div className="flex flex-col gap-4">
          {EXPLORE_ITEMS.map((item) => (
            <ExploreCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeMobile;
