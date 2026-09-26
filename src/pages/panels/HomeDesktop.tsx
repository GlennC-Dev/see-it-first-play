import { Link } from "react-router-dom";
import { FolderKanban, User, Mail, Layers, ShieldCheck } from "lucide-react";
import { TOOLS } from "./homeData";

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

// Desktop-only Home content, below the Hero — untouched from before the mobile split, just
// moved into its own file so the mobile version (HomeMobile.tsx) can be a fully separate
// component tree instead of sharing one component gated by CSS breakpoints.
const HomeDesktop = () => {
  return (
    <section className="px-[5vw] pt-6 pb-8">
      <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-6 overflow-x-auto mb-4">
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
    </section>
  );
};

export default HomeDesktop;
