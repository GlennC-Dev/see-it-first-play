import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CATEGORIES, PROJECTS } from "@/data/projects";

const ProjectGalleryPage = () => {
  const { categorySlug, projectSlug } = useParams<{ categorySlug: string; projectSlug: string }>();
  const [photoIdx, setPhotoIdx] = useState(0);

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const project = category
    ? PROJECTS.find((p) => p.category === category.key && (p.slug ?? String(p.id)) === projectSlug)
    : undefined;

  if (!category || !project) return <Navigate to="/projects" replace />;

  const photoCount = project.photos.length;

  return (
    <div className="px-[5vw] py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Link
          to="/projects"
          className="font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase text-ink-soft hover:text-primary transition-colors duration-200 no-underline"
        >
          ← All Projects
        </Link>
        <span className="text-ink-muted">/</span>
        <Link
          to={`/projects/${category.slug}`}
          className="font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase text-ink-soft hover:text-primary transition-colors duration-200 no-underline"
        >
          ← Back to {category.key}
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden max-w-[1000px] mx-auto shadow-lg">
        {/* Fake browser chrome */}
        <div className="flex items-center gap-4 px-4 py-3 bg-border/40 border-b border-border">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 bg-background rounded-full px-4 py-1.5 text-[0.78rem] text-ink-soft font-mono-dm truncate">
            topgitconsulting.tech/tableau/{project.slug ?? project.id}
          </div>
        </div>

        {/* Photo viewer */}
        <div className="bg-[#111] relative flex flex-col items-center justify-center min-h-[420px]">
          <div className="relative flex items-center justify-center w-full flex-1">
            {project.photos[photoIdx] ? (
              <img
                src={project.photos[photoIdx]!}
                alt={project.title}
                className="w-full h-full object-contain max-h-[62vh]"
              />
            ) : (
              <div className="text-[5rem] opacity-10">{project.icon}</div>
            )}
            {photoCount > 1 && (
              <>
                <button
                  onClick={() => setPhotoIdx((i) => (i - 1 + photoCount) % photoCount)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-[#fff] cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.22)] transition-colors z-[2]"
                >
                  ←
                </button>
                <button
                  onClick={() => setPhotoIdx((i) => (i + 1) % photoCount)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-[#fff] cursor-pointer flex items-center justify-center text-lg hover:bg-[rgba(255,255,255,0.22)] transition-colors z-[2]"
                >
                  →
                </button>
              </>
            )}
          </div>
          {project.photoCaptions?.[photoIdx] && (
            <div className="px-5 py-3 text-[0.75rem] italic text-[rgba(255,255,255,0.75)] text-center leading-[1.5] border-t border-[rgba(255,255,255,0.08)] w-full">
              {project.photoCaptions[photoIdx]}
            </div>
          )}
          {photoCount > 1 && (
            <div className="pb-3 flex gap-1.5">
              {project.photos.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`w-[7px] h-[7px] rounded-full cursor-pointer transition-all duration-200 ${
                    i === photoIdx ? "bg-[#fff] scale-[1.3]" : "bg-[rgba(255,255,255,0.35)]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project details */}
        <div className="p-6">
          <div className="font-serif-dm text-[1.4rem] leading-[1.15] mb-3 text-foreground">{project.title}</div>
          <p className="text-[0.875rem] text-ink-soft leading-[1.7] font-light mb-5">{project.desc}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-5">
            {project.frequency && (
              <div>
                <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted mb-0.5">Frequency</div>
                <div className="text-[0.8rem] text-foreground font-medium">{project.frequency}</div>
              </div>
            )}
            {project.audience && (
              <div>
                <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted mb-0.5">Used By</div>
                <div className="text-[0.8rem] text-foreground font-medium">{project.audience}</div>
              </div>
            )}
            <div>
              <div className="font-mono-dm text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted mb-0.5">The Story</div>
              <div className="text-[0.8rem] text-foreground font-medium">{project.impact}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-sm bg-border text-ink-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGalleryPage;
