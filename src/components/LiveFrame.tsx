import { useEffect, useState } from "react";
import "@/styles/ppanel.css";

// 👈 Ported directly from the reference repo (portfolio-template), src/components/ProjectPanels.tsx.
// Structure, class names and behavior are unchanged from the original FrameBar/LiveFrame — the only
// difference from the reference is *what* gets framed: their LiveFrame points at a real live page;
// ours points at public/photo-frame.html, a tiny static page that just shows one project photo. The
// iframe mechanism itself — the actual fix — is untouched.

export function FrameBar({ host, path }: { host: string; path: string }) {
  return (
    <div className="ppanel__bar">
      <span className="ppanel__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ppanel__url">
        <span className="ppanel__url-host">{host}</span>
        <span className="ppanel__url-path">{path}</span>
      </span>
    </div>
  );
}

// Matches the reference's own comment: same-site frames share the main thread, so loading one
// mid-animation can stall whatever transition is opening it. Kept the same delay.
const FRAME_DELAY_MS = 440;

export function LiveFrame({ src, title }: { src: string; title: string }) {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setReady(false);
    setMounted(false);
    const id = window.setTimeout(() => setMounted(true), FRAME_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [src]);
  return (
    <div className="ppanel__stage">
      {!ready && <div className="ppanel__skeleton" aria-hidden="true" />}
      {mounted && (
        <iframe
          key={src}
          className="ppanel__iframe"
          src={src}
          title={title}
          loading="eager"
          onLoad={() => setReady(true)}
          data-ready={ready ? "true" : "false"}
        />
      )}
    </div>
  );
}
