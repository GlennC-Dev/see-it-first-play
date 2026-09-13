import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES, PROJECTS } from "@/data/projects";

const ProjectCard = ({
  cat,
  large,
}: {
  cat: (typeof CATEGORIES)[number];
  large?: boolean;
}) => {
  const projects = PROJECTS.filter((p) => p.category === cat.key);
  const previewPhoto = projects.find((p) => p.photos[0])?.photos[0];

  return (
    <Link
      to={`/projects/${cat.slug}`}
      className="group flex flex-col bg-card border border-border rounded-[4px] overflow-hidden no-underline transition-all duration-200 hover:border-blue-dim hover:shadow-[0_12px_40px_rgba(26,108,255,0.09)] hover:-translate-y-[3px] h-full"
    >
      <div className={`relative w-full overflow-hidden bg-border flex items-center justify-center ${large ? "flex-1 min-h-[220px]" : "aspect-video"}`}>
        {previewPhoto ? (
          <img
            src={previewPhoto}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-ink-muted px-3 text-center">
            Thumbnail coming soon
          </span>
        )}
      </div>
      <div className={large ? "p-6" : "p-5"}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <h2 className={`font-serif-dm leading-[1.15] text-foreground whitespace-pre-wrap ${large ? "text-[1.5rem]" : "text-[1.05rem]"}`}>
            {cat.title}
          </h2>
          <span className="shrink-0 font-mono-dm text-[0.62rem] tracking-[0.1em] text-ink-muted px-2 py-1 border border-border rounded-sm whitespace-nowrap">
            {projects.length}
          </span>
        </div>
        <p className={`text-ink-soft font-light leading-[1.6] ${large ? "text-[0.85rem]" : "text-[0.78rem]"}`}>
          {cat.desc}
        </p>
      </div>
    </Link>
  );
};

const ProjectsHome = () => {
  const [dataViz, ...rest] = CATEGORIES;
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

      <div className="px-[5vw] py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:h-[680px]">
          <ScrollReveal className="h-full md:row-span-2">
            <ProjectCard cat={dataViz} large />
          </ScrollReveal>
          {rest.map((cat, i) => (
            <ScrollReveal key={cat.key} delay={(i + 1) * 80} className="h-full">
              <ProjectCard cat={cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsHome;
