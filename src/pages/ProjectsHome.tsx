import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES, PROJECTS } from "@/data/projects";

const ProjectsHome = () => {
  return (
    <>
      <ScrollReveal>
        <div className="pt-16 pb-20 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">
            // project gallery
          </div>
          <h1 className="font-serif-dm text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] mb-4 text-foreground transition-colors duration-300">
            Work that <em className="italic text-primary">speaks</em>
            <br />
            for itself.
          </h1>
          <p className="text-base text-ink-soft font-light max-w-[55ch] leading-[1.7]">
            A full archive of projects, builds, and automation systems — each with screenshots, impact metrics, and the tools behind the work.
          </p>
        </div>
      </ScrollReveal>

      <div className="px-[5vw] py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => {
            const projects = PROJECTS.filter((p) => p.category === cat.key);
            const previewPhoto = projects.find((p) => p.photos[0])?.photos[0];
            return (
              <ScrollReveal key={cat.key} delay={i * 80}>
                <Link
                  to={`/projects/${cat.slug}`}
                  className="group block bg-card border border-border rounded-[4px] overflow-hidden no-underline transition-all duration-200 hover:border-blue-dim hover:shadow-[0_12px_40px_rgba(26,108,255,0.09)] hover:-translate-y-[3px]"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h2 className="font-serif-dm text-[1.3rem] leading-[1.15] text-foreground whitespace-pre-wrap">
                          {cat.title}
                        </h2>
                        <span className="shrink-0 font-mono-dm text-[0.65rem] tracking-[0.1em] text-ink-muted px-2 py-1 border border-border rounded-sm whitespace-nowrap">
                          {projects.length} project{projects.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-[0.85rem] text-ink-soft font-light leading-[1.6]">{cat.desc}</p>
                    </div>
                    {previewPhoto && (
                      <div className="relative w-full md:w-[220px] shrink-0 aspect-video md:aspect-auto overflow-hidden bg-border">
                        <img
                          src={previewPhoto}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectsHome;
