import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES, PROJECTS } from "@/data/projects";

const ProjectCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [lightbox, setLightbox] = useState<{ projectIdx: number; photoIdx: number } | null>(null);

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return <Navigate to="/projects" replace />;

  const projects = PROJECTS.filter((p) => p.category === category.key);

  const openLightbox = (projectIdx: number) => setLightbox({ projectIdx, photoIdx: 0 });
  const closeLightbox = () => setLightbox(null);
  const lbProject = lightbox ? projects.find((p) => p.id === lightbox.projectIdx) : null;

  return (
    <>
      <ScrollReveal>
        <div className="pt-10 pb-10 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <Link
            to="/projects"
            className="inline-block font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase text-ink-soft hover:text-primary transition-colors duration-200 mb-4 no-underline"
          >
            ← All Projects
          </Link>
          <div className="font-serif-dm text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] mb-3 text-foreground whitespace-pre-wrap">
            {category.title}
          </div>
          <p className="text-[0.9rem] text-ink-soft font-light leading-[1.7] max-w-[65ch]">{category.desc}</p>
        </div>
      </ScrollReveal>

      <div className="px-[5vw] xl:px-[4vw] py-16 pb-24">
        {category.previewLayout === "row-list" ? (
          <div className="flex flex-col gap-5">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <Link
                  to={`/projects/${category.slug}/${p.slug ?? p.id}`}
                  className="bg-card border border-border rounded-[4px] overflow-hidden transition-all duration-200 flex flex-col md:flex-row hover:border-blue-dim no-underline group"
                >
                  <div className="relative w-full md:w-[280px] shrink-0 aspect-video md:aspect-auto bg-border overflow-hidden">
                    {p.photos[0] ? (
                      <img src={p.photos[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[2.5rem] opacity-20">{p.icon}</div>
                    )}
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0)] group-hover:bg-[rgba(0,0,0,0.15)] transition-colors duration-200 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono-dm text-[0.68rem] tracking-[0.08em] text-white bg-[rgba(0,0,0,0.55)] px-3 py-1.5 rounded-sm">
                        View gallery ({p.photos.length})
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="text-lg font-semibold text-foreground mb-2">{p.title}</div>
                    <p className="text-[0.85rem] text-ink-soft leading-[1.65] font-light mb-4 max-w-[70ch]">{p.desc}</p>

                    <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
                      {p.frequency && (
                        <div>
                          <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted mb-0.5">Frequency</div>
                          <div className="text-[0.8rem] text-foreground font-medium">{p.frequency}</div>
                        </div>
                      )}
                      {p.audience && (
                        <div>
                          <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted mb-0.5">Used By</div>
                          <div className="text-[0.8rem] text-foreground font-medium">{p.audience}</div>
                        </div>
                      )}
                      <div>
                        <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted mb-0.5">The Story</div>
                        <div className="text-[0.8rem] text-foreground font-medium">{p.impact}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <div
                  onClick={() => openLightbox(p.id)}
                  className="bg-card border border-border rounded-[4px] overflow-hidden cursor-pointer transition-all duration-200 relative group hover:shadow-[0_12px_40px_rgba(26,108,255,0.09)] hover:-translate-y-[3px] hover:border-blue-dim"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="w-full aspect-video bg-border overflow-hidden flex items-center justify-center relative">
                    {p.photos[0] ? (
                      <img src={p.photos[0]} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[2.5rem] opacity-20">{p.icon}</div>
                    )}
                    <div className="absolute bottom-2.5 right-2.5 bg-[rgba(0,0,0,0.6)] text-[#fff] font-mono-dm text-[0.65rem] tracking-[0.08em] px-2 py-0.5 rounded-sm">
                      {p.photos.length} photo{p.photos.length > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-base font-semibold text-foreground mb-2">{p.title}</div>
                    <div className="text-[0.85rem] text-ink-soft leading-[1.65] font-light mb-4">{p.desc.substring(0, 120)}…</div>
                    <div className="font-mono-dm text-[0.7rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-3.5">{p.impact}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — only used by grid-layout categories */}
      {lightbox && lbProject && (
        <div
          className="fixed inset-0 z-[1000] bg-[rgba(10,10,10,0.92)] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="bg-card rounded-lg overflow-hidden max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-[1fr_360px] max-h-[90vh]">
            <div className="bg-[#111] relative flex flex-col items-center justify-center min-h-[360px]">
              <div className="relative flex items-center justify-center w-full flex-1">
                {lbProject.photos[lightbox.photoIdx] ? (
                  <img src={lbProject.photos[lightbox.photoIdx]!} alt={lbProject.title} className="w-full h-full object-contain max-h-[70vh]" />
                ) : (
                  <div className="text-[5rem] opacity-10">{lbProject.icon}</div>
                )}
                {lbProject.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx - 1 + lbProject.photos.length) % lbProject.photos.length })}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-[#fff] cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.22)] transition-colors z-[2]"
                    >←</button>
                    <button
                      onClick={() => setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx + 1) % lbProject.photos.length })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-[#fff] cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.22)] transition-colors z-[2]"
                    >→</button>
                  </>
                )}
              </div>
              {lbProject.photoCaptions?.[lightbox.photoIdx] && (
                <div className="px-5 py-3 text-[0.75rem] italic text-[rgba(255,255,255,0.75)] text-center leading-[1.5] border-t border-[rgba(255,255,255,0.08)] w-full">
                  {lbProject.photoCaptions[lightbox.photoIdx]}
                </div>
              )}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
                {lbProject.photos.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox({ ...lightbox, photoIdx: i })}
                    className={`w-[7px] h-[7px] rounded-full cursor-pointer transition-all duration-200 ${i === lightbox.photoIdx ? "bg-[#fff] scale-[1.3]" : "bg-[rgba(255,255,255,0.35)]"}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-8 overflow-y-auto flex flex-col border-l border-border md:border-l md:border-t-0 border-t">
              <button onClick={closeLightbox} className="self-end bg-transparent border border-border rounded-sm w-8 h-8 cursor-pointer text-ink-soft flex items-center justify-center text-base mb-6 hover:border-foreground hover:text-foreground transition-colors duration-200">✕</button>
              <div className="font-serif-dm text-[1.5rem] leading-[1.15] mb-3 text-foreground">{lbProject.title}</div>
              <div className="font-mono-dm text-[0.72rem] tracking-[0.08em] text-primary px-3 py-1.5 bg-blue-dim rounded-sm inline-block mb-5 self-start">{lbProject.impact}</div>
              <div className="text-[0.875rem] text-ink-soft leading-[1.7] font-light mb-5 flex-1">{lbProject.desc}</div>
              <div className="font-mono-dm text-[0.65rem] tracking-[0.12em] uppercase text-ink-muted mb-2.5">Tools used</div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {lbProject.tags.map((t) => (
                  <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">{t}</span>
                ))}
              </div>
              {lbProject.link && (
                <a
                  href={lbProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 mb-3 border-[1.5px] border-primary rounded-sm bg-blue-dim font-mono-dm text-[0.72rem] tracking-[0.08em] text-primary hover:bg-primary hover:text-[#fff] transition-colors duration-200"
                >
                  ↗ {lbProject.linkLabel ?? "View full resource"}
                </a>
              )}
              <div className="flex gap-3 mt-auto">
                <button
                  disabled={projects.findIndex((p) => p.id === lbProject.id) === 0}
                  onClick={() => { const idx = projects.findIndex((p) => p.id === lbProject.id); if (idx > 0) setLightbox({ projectIdx: projects[idx - 1].id, photoIdx: 0 }); }}
                  className="flex-1 py-2.5 border-[1.5px] border-border rounded-sm bg-transparent font-mono-dm text-[0.72rem] tracking-[0.08em] cursor-pointer text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >← Prev project</button>
                <button
                  disabled={projects.findIndex((p) => p.id === lbProject.id) === projects.length - 1}
                  onClick={() => { const idx = projects.findIndex((p) => p.id === lbProject.id); if (idx < projects.length - 1) setLightbox({ projectIdx: projects[idx + 1].id, photoIdx: 0 }); }}
                  className="flex-1 py-2.5 border-[1.5px] border-border rounded-sm bg-transparent font-mono-dm text-[0.72rem] tracking-[0.08em] cursor-pointer text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >Next project →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCategoryPage;
