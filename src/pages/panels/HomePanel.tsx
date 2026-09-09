import { Link } from "react-router-dom";
import { siN8n, siGoogle } from "simple-icons";
import { BarChart3, Grid3x3, ShieldCheck, FolderKanban, User, Mail, Layers } from "lucide-react";
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

      <section className="px-[5vw] pb-16">
        {/* Daily Drivers */}
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-6 overflow-x-auto mb-6">
          <div className="shrink-0 pr-6 border-r border-border">
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
              <span className="text-sm font-medium whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>

        {/* Card grid: row 1 = 2 cards, row 2 = 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {CARDS.slice(0, 2).map((c) => (
            <HomeCard key={c.title} {...c} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.slice(2, 5).map((c) => (
            <HomeCard key={c.title} {...c} />
          ))}
        </div>
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
    className="block rounded-xl border border-border bg-card p-6 hover:border-primary transition-colors duration-200 no-underline"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
      <Icon size={18} />
    </div>
    <h3 className="font-mono-dm text-[0.8rem] tracking-[0.08em] text-foreground mb-2">
      {title}
    </h3>
    <p className="text-sm text-ink-soft font-light leading-[1.5]">{tagline}</p>
  </Link>
);

export default HomePanel;

