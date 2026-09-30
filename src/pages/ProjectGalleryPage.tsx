import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CATEGORIES, PROJECTS } from "@/data/projects";
import { FrameBar, LiveFrame } from "@/components/LiveFrame";

// 👈 Builds the fake address-bar path from the photo filename convention:
//    projects_<category>_[order_]<project>_<n>.ext  ->  projects/<category>/<project>
//    e.g. projects_dataviz_2_sfchat_1.jpg -> projects/dataviz/sfchat
//    If a filename doesn't match, it falls back to the real route slugs so nothing ever breaks.
const fakeAddressPath = (firstPhoto: string | null | undefined, fallback: string) => {
  const file = firstPhoto?.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  const m = file.match(/^projects_([a-z0-9]+)_(?:\d+_)?([a-z0-9]+)_\d+$/i);
  return m ? `projects/${m[1]}/${m[2]}` : fallback;
};

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
            topgitconsulting.tech/{fakeAddressPath(project.photos[0], `projects/${category.slug}/${project.slug ?? project.id}`)}
          </div>
        </div>

        {/* Photo viewer */}
        {/* 👈 Two render paths, chosen by project.photoViewerScroll:
            - false/omitted (default, every project except the CES pilot): "fit" mode — aspect-[4/3]
              box + object-contain. Makes the box's height a direct function of its width (spec-
              guaranteed, no ambiguity) — this is what finally fixed the earlier cross-browser
              clipping bug (Flexbox percentage-height and CSS Grid auto-track both failed because
              something in the chain sized against an INDEFINITE value).
            - true (CES pilot): "scroll" mode — image at natural full width, tall screenshots scroll
              vertically inside a fixed-height window, the way a real browser handles a page taller
              than its viewport. This is the closer match to the reference repo's actual fake-browser
              pattern (a real, reflowable page in a scrollable frame) — ours are static screenshots
              so they can't reflow, but "show at natural size, scroll for the rest" is the same idea
              applied to a raster image. width:100% height:auto is about the most bulletproof CSS
              sizing there is — no fit/shrink math, so none of the three previous bugs can recur here.
            Buttons live OUTSIDE the scrolling/fitting inner box (as siblings, in this shared relative
            wrapper) so they stay fixed on screen in both modes instead of scrolling away with content. */}
        <div className="bg-[#111] flex flex-col items-center">
          <div className="relative w-full">
            {project.photoViewerIframe ? (
              // 👈 Pilot #2 — the reference repo's actual mechanism, ported directly (see
              // src/components/LiveFrame.tsx and src/styles/ppanel.css, both copied verbatim from
              // portfolio-template). An <iframe>'s own box is sized purely by its own width/height
              // CSS, with no competing intrinsic-content-size the way an <img> has, so the earlier
              // cropping bug structurally can't recur here.
              <div className="ppanel ppanel--frame ppanel--pilot-inline">
                <FrameBar
                  host="topgitconsulting.tech"
                  path={`/${fakeAddressPath(project.photos[photoIdx], `projects/${category.slug}/${project.slug ?? project.id}`)}`}
                />
                <LiveFrame
                  src={`/photo-frame.html?src=${encodeURIComponent(project.photos[photoIdx] ?? "")}`}
                  title={project.title}
                />
              </div>
            ) : project.photoViewerScroll ? (
              <div className="w-full h-[clamp(360px,70vh,640px)] overflow-y-auto overflow-x-hidden">
                {project.photos[photoIdx] ? (
                  <img
                    src={project.photos[photoIdx]!}
                    alt={project.title}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="text-[5rem] opacity-10 flex items-center justify-center h-full">{project.icon}</div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-[4/3] overflow-hidden">
                {project.photos[photoIdx] ? (
                  <img
                    src={project.photos[photoIdx]!}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-[5rem] opacity-10 flex items-center justify-center h-full">{project.icon}</div>
                )}
              </div>
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
          <div className="flex items-center gap-3 mb-3">
            <div className="font-serif-dm text-[1.4rem] leading-[1.15] text-foreground">{project.title}</div>
            {/* 👈 External reference link (Google Doc/Slides etc). Only renders when project.link is set in projects.ts. */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title={project.linkLabel ?? "View full resource"}
                className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-soft hover:text-primary hover:border-primary transition-colors duration-200 no-underline"
              >
                ↗
              </a>
            )}
          </div>
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
