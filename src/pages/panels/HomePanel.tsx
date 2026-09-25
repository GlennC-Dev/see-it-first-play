import { Link } from "react-router-dom";
import { siN8n, siGoogle } from "simple-icons";
import { BarChart3, Grid3x3, ShieldCheck, FolderKanban, User, Mail, Layers, Image as ImageIcon } from "lucide-react";
import Hero from "@/components/Hero";

const BrandIcon = ({ hex, path }: { hex: string; path: string }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={`#${hex}`}>
    <path d={path} />
  </svg>
);

// Real brand marks (available in simple-icons)
const TOOLS_WITH_LOGOS = [
  { name: "n8n", icon: <BrandIcon hex={siN8n.hex} path={siN8n.path} /> },
  { name: "Google Workspace", icon: <BrandIcon hex={siGoogle.hex} path={siGoogle.path} /> },
];

// Generic stand-in icons — simple-icons excludes these three brands
// (trademark/brand-guideline policy), so these are NOT official logos.
// Swap in real assets from each vendor's brand-resources page if desired.
const TOOLS_GENERIC = [
  { name: "Tableau", icon: <BarChart3 className="w-5 h-5" /> },
  { name: "Microsoft 365", icon: <Grid3x3 className="w-5 h-5" /> },
  { name: "Power BI", icon: <BarChart3 className="w-5 h-5 scale-x-[-1]" /> },
];

const TOOLS = [TOOLS_WITH_LOGOS[0], TOOLS_GENERIC[0], TOOLS_WITH_LOGOS[1], TOOLS_GENERIC[1], TOOLS_GENERIC[2]];

// 👈 Mobile-only compact stats row (Kenneth's "11 yrs / #7009 / GMT+8" shape). LSSGB has no
// number attached yet — you said you'd add the credential ID as a pill on the About page later.
const STATS = [
  { value: "12 Yrs", caption: "In Ops" },
  { value: "LSSGB", caption: "Certified" },
  { value: "GMT+8", caption: "Manila" },
];

// 👈 Mobile-only "Explore" cards (his swipeable-carousel section, adapted as a horizontal
// scroll-snap row — no carousel library, just overflow-x-auto + snap classes). Each thumbnail is
// a placeholder box for now; swap for a real image whenever you have one (Projects = a shot of a
// manager view; About = a real photo). "to" carries a hash for Services/Work History so they
// land directly on the relevant section of the Skills & Experience page (ScrollToTop.tsx handles
// the hash-scroll on navigation).
const EXPLORE_CARDS = [
  {
    title: "Projects",
    blurb: "Dashboards, automations, and the builds behind them.",
    to: "/projects",
  },
  {
    title: "Services",
    blurb: "How I work: probe, build, automate.",
    to: "/skills-experience#approach",
  },
  {
    title: "Work History",
    blurb: "10+ years, frontline support through to BI.",
    to: "/skills-experience#experience",
  },
  {
    title: "About",
    blurb: "Background, approach, and what drives the work.",
    to: "/about",
  },
];

const CARDS = [
  {
    icon: FolderKanban,
    title: "PROJECTS",
    tagline: "Builds that clarifies the convoluted.",
    to: "/projects",
  },
  {
    icon: Layers,
    title: "SKILLS & EXPERIENCE",
    tagline: "Skills sharpened by 10+ years in the field.",
    to: "/skills-experience",
  },
  {
    icon: ShieldCheck,
    title: "CREDENTIALS",
    tagline: "Certified LSSGB, aspiring BI Developer.",
    to: "/about",
  },
  {
    icon: User,
    title: "ABOUT",
    tagline: "Background, approach, and what drives the work.",
    to: "/about",
  },
  {
    icon: Mail,
    title: "CONTACT",
    tagline: "Have something in mind? Let's talk!",
    to: "/contact",
  },
];

const HomePanel = () => {
  return (
    <div className="bg-background transition-colors duration-300">
      <Hero />

      {/* 👈 Mobile-only stats strip — hidden md:flex hides it entirely on desktop (no equivalent
          section there). Bumped from the first pass: bigger value/caption text and more vertical
          padding so it reads as a real mobile section instead of shrunk desktop text. */}
      <div className="flex md:hidden items-center justify-center gap-x-10 px-[5vw] py-6 border-b border-border">
        {STATS.map((s) => (
          <div key={s.caption} className="flex flex-col items-center text-center">
            <div className="font-serif-dm text-[1.4rem] leading-none text-primary mb-1.5">{s.value}</div>
            <div className="font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-ink-muted">{s.caption}</div>
          </div>
        ))}
      </div>

      {/* pt-6 pushes this whole section (Daily Drivers + cards) down away from the Hero above.
          👈 pt-9 pb-10 on mobile (more breathing room now that everything stacks in one column) vs
          the original pt-6 pb-8 kept for desktop. */}
      <section className="px-[5vw] pt-9 pb-10 md:pt-6 md:pb-8">
        {/* Daily Drivers */}
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-5 md:gap-6 overflow-x-auto mb-6 md:mb-4">
          <div className="shrink-0 pr-5 md:pr-6 border-r border-border">
            <p className="font-mono-dm text-[0.65rem] tracking-[0.14em] uppercase text-primary mb-0.5">
              Daily Drivers
            </p>
            <p className="font-semibold text-sm text-foreground whitespace-nowrap">
              Tools I work with
            </p>
          </div>
          {TOOLS.map(({ name, icon }) => (
            <div key={name} className="flex items-center gap-2 shrink-0 text-ink-soft">
              {icon}
              {/* 👈 Tool names are icon-only on mobile (hidden below sm) per your call — full
                  name + icon stays on desktop. */}
              <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>

        {/* 👈 Desktop card grid — hidden on mobile now that Explore (below) replaces it there. */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {CARDS.slice(0, 2).map((c) => (
              <HomeCard key={c.title} {...c} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CARDS.slice(2, 5).map((c) => (
              <HomeCard key={c.title} {...c} />
            ))}
          </div>
        </div>

        {/* 👈 TEMPORARILY DISABLED to test whether this section (specifically the horizontal
            scroll-snap row with negative margins) is causing the mobile page to render zoomed-out.
            Re-enable by removing this comment wrapper once confirmed either way. Original block,
            unchanged, kept below for easy restore:

        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-base text-foreground">Explore</span>
            <span className="font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-primary">Swipe →</span>
          </div>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-[5vw] px-[5vw]">
            {EXPLORE_CARDS.map((c) => (
              <ExploreCard key={c.title} {...c} />
            ))}
          </div>
        </div>
        */}
      </section>
    </div>
  );
};

const HomeCard = ({
  icon: Icon,
  title,
  tagline,
  to,
}: {
  icon: typeof FolderKanban;
  title: string;
  tagline: string;
  to: string;
}) => (
  <Link
    to={to}
    className="block rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors duration-200 no-underline"
  >
    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
      <Icon size={16} />
    </div>
    <h3 className="font-mono-dm text-[0.8rem] tracking-[0.08em] text-foreground mb-1">
      {title}
    </h3>
    <p className="text-sm text-ink-soft font-light leading-[1.5]">{tagline}</p>
  </Link>
);

const ExploreCard = ({
  title,
  blurb,
  to,
}: {
  title: string;
  blurb: string;
  to: string;
}) => (
  <Link
    to={to}
    className="shrink-0 w-[78vw] snap-start rounded-xl border border-border bg-card overflow-hidden no-underline hover:border-primary transition-colors duration-200"
  >
    {/* 👈 Placeholder thumbnail — swap this div for a real <img> once you have the asset
        (h-40 controls the thumbnail height; keep it the same across all 4 cards for now). */}
    <div className="h-40 bg-blue-dim flex items-center justify-center text-primary/50">
      <ImageIcon size={30} />
    </div>
    <div className="p-4">
      <h3 className="font-mono-dm text-[0.85rem] tracking-[0.08em] text-foreground mb-1.5 uppercase">
        {title}
      </h3>
      <p className="text-[0.9rem] text-ink-soft font-light leading-[1.55]">{blurb}</p>
    </div>
  </Link>
);

export default HomePanel;

