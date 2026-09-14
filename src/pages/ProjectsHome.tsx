import { Link } from "react-router-dom";
import { BarChart3, FileText, Code2, Workflow, LayoutGrid } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES, PROJECTS, type Category } from "@/data/projects";

const CATEGORY_ICONS: Record<string, typeof BarChart3> = {
  "Data Visualizations": BarChart3,
  "Case Study & Technical Writing": FileText,
  "Apps Script": Code2,
  "Workflow Automations": Workflow,
  "Web Apps": LayoutGrid,
};

const ProjectsHome = () => {
  return (
    <>
      <ScrollReveal>
        <div className="pt-7 pb-7 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">
            // project gallery
          </div>
          <h1 className="font-serif-dm text-[clamp(2.4rem,3.6vw,3.2rem)] leading-[1.05] mb-4 text-foreground transition-colors duration-300">
            Real Builds. <em className="italic text-primary">Fully</em> Documented.
          </h1>
          <p className="text-base text-ink-soft font-light max-w-[65ch] leading-[1.7]">
            Every project here shipped — dashboards, automations, and the systems behind them, laid out build by build.
          </p>
        </div>
      </ScrollReveal>

      <section className="px-[5vw] py-16 pb-24">
        {/* Card grid: row 1 = 2 cards, row 2 = 3 cards — same structure as Home */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {CATEGORIES.slice(0, 2).map((cat) => (
            <ProjectCard key={cat.key} cat={cat} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORIES.slice(2, 5).map((cat) => (
            <ProjectCard key={cat.key} cat={cat} />
          ))}
        </div>
      </section>
    </>
  );
};

const ProjectCard = ({ cat }: { cat: Category }) => {
  const projects = PROJECTS.filter((p) => p.category === cat.key);
  const Icon = CATEGORY_ICONS[cat.key] ?? LayoutGrid;

  return (
    <Link
      to={`/projects/${cat.slug}`}
      className="block rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors duration-200 no-underline"
    >
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
        <Icon size={16} />
      </div>
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-mono-dm text-[0.8rem] tracking-[0.08em] text-foreground uppercase">
          {cat.key}
        </h3>
        <span className="shrink-0 font-mono-dm text-[0.62rem] tracking-[0.1em] text-ink-muted px-2 py-0.5 border border-border rounded-sm">
          {projects.length}
        </span>
      </div>
      <p className="text-sm text-ink-soft font-light leading-[1.5]">{cat.desc}</p>
    </Link>
  );
};

export default ProjectsHome;
