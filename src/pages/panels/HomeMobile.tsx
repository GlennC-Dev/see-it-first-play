import { Link } from "react-router-dom";
import { FolderKanban, Layers, User } from "lucide-react";
import { TOOLS, STATS } from "./homeData";

// 👈 Explore tiles — same 4 destinations as before, horizontal scroll-snap row. "to" carries a hash for Services/Work History so they land directly on the
// relevant section of the Skills & Experience page (ScrollToTop.tsx handles the hash-scroll).
// Still worth revisiting: Projects/Services/About overlap with the bottom nav's own items —
// flag if you want this trimmed down to just the non-duplicate entries (Work History).
const EXPLORE_ITEMS = [
  {
    icon: FolderKanban,
    title: "Projects",
    blurb: "Dashboards, automations, and the builds behind them.",
    to: "/projects",
  },
  {
    icon: Layers,
    title: "Services",
    blurb: "How I work: probe, build, automate.",
    to: "/skills-experience#approach",
  },
  {
    icon: Layers,
    title: "Work History",
    blurb: "10+ years, frontline support through to BI.",
    to: "/skills-experience#experience",
  },
  {
    icon: User,
    title: "About",
    blurb: "Background, approach, and what drives the work.",
    to: "/about",
  },
];

const ExploreCard = ({
  icon: Icon,
  title,
  blurb,
  to,
}: {
  icon: typeof FolderKanban;
  title: string;
  blurb: string;
  to: string;
}) => (
  <Link
    to={to}
    // 👈 The actual fix, borrowed from how the reference repo avoids this bug: a FIXED height
    // (h-[290px], not auto) so flexbox can't stretch/distort the card, and a width bounded by
    // BOTH a fixed px AND a vw cap via CSS min() — w-[min(236px,66vw)] — instead of a raw vw
    // value alone, which is what let the card push past the real viewport before.
    className="shrink-0 snap-start w-[min(236px,66vw)] h-[290px] flex flex-col rounded-xl border border-border bg-card overflow-hidden no-underline hover:border-primary transition-colors duration-200"
  >
    {/* 👈 Fixed h-[170px] thumbnail (matches the reference's proportions) — swap for a real
        <img className="w-full h-[170px] object-cover" /> once you have thumbnails. */}
    <div className="h-[170px] shrink-0 bg-blue-dim flex items-center justify-center text-primary/50">
      <Icon size={32} />
    </div>
    <div className="p-4 flex-1 min-w-0">
      <h3 className="font-mono-dm text-[0.8rem] tracking-[0.06em] text-foreground mb-1.5 uppercase">
        {title}
      </h3>
      <p className="text-[0.82rem] text-ink-soft font-light leading-[1.45]">{blurb}</p>
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

        {/* 👈 Explore — horizontal scroll-snap, brought back after fixing the actual bug (see
            ExploreCard comment above). Bleed uses the same -mx-[5vw]/px-[5vw] trick as before,
            which is safe now that cards have a real bounded width and fixed height — it was never
            the bleed math itself causing the overflow, it was the unbounded card next to it. */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-base text-foreground">Explore</span>
          <span className="font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-primary">Swipe →</span>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-[5vw] px-[5vw] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [overscroll-behavior-x:contain]">
          {EXPLORE_ITEMS.map((item) => (
            <ExploreCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeMobile;
