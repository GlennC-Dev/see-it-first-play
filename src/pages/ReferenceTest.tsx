import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { FrameBar, LiveFrame } from "@/components/LiveFrame";

// 👈 This file is a literal, isolated port of the reference repo's actual project-preview
// mechanism — ProjectModal from src/components/ProjectsGrid.tsx, and PlanPanel from
// src/components/ProjectPanels.tsx — kept together here for a single, minimal test with no
// project data, routing, or address-bar logic of ours mixed in. If this doesn't reproduce the
// reference's behavior (the browser encroaching over the sidebar on desktop, correct sizing on
// mobile), the problem isn't in how we wired it — it's something deeper.

/** Verbatim from the reference's ProjectPanels.tsx: PlanPanel opens the sample document,
 *  full height, straight away. */
function PlanPanel() {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar host="yourdomain.com" path="/sample-plan" />
      <LiveFrame src="/placeholders/sample-plan.html" title="Sample document" />
    </div>
  );
}

/** Verbatim from the reference's ProjectsGrid.tsx: a backdrop, a close button in the corner,
 *  and the work. No panel, no header — the Section brings its own window. */
function ProjectModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} strokeWidth={2.5} />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body
  );
}

/** The isolated test itself: one button, one modal, the reference's own placeholder content.
 *  Nothing of ours (project data, our address-bar logic, our routing) is involved. */
export default function ReferenceTest() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const show = useCallback((e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <div className="px-[5vw] py-10">
      <h1 className="text-xl font-semibold mb-4">Reference mechanism — isolated test</h1>
      <p className="text-sm text-ink-soft mb-6 max-w-[60ch]">
        One-to-one port of the reference repo's own modal, panel, and placeholder document —
        no project data or routing of ours involved. Open it and check whether the browser
        window encroaches over the sidebar on desktop, the way it does on the reference site.
      </p>
      <button
        type="button"
        onClick={show}
        className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
      >
        Open Sample Document
      </button>
      {open && (
        <ProjectModal title="Sample document" onClose={close}>
          <PlanPanel />
        </ProjectModal>
      )}
    </div>
  );
}
