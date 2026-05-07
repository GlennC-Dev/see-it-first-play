## Changes to `src/components/ProjectsSection.tsx`

### 1. Remove Google Forms Workflow Automation
- Delete the `formsAutomation` import and its entry from `TOP_PROJECTS` (carousel: 8 → 7 items).

### 2. Add lightbox on click (mirrors `src/pages/Projects.tsx`)
- New state `lightboxIdx: number | null`.
- Make each carousel slide clickable → opens lightbox at that index, pauses autoplay.
- Subtle "Click to view larger →" hint appears on hover.
- Lightbox: fixed full-screen dark overlay, 2-column card (large `object-contain` image left, info right with title / impact chip / description / tags / ✕). Prev/Next arrows + dots inside the lightbox cycle through all 7 items. Esc + ArrowLeft/ArrowRight keyboard support. Click-outside closes. Body scroll locked while open.
- Autoplay stays paused after the lightbox closes (user has interacted).

### 3. Placeholder impact + tags on every item
- `impact: "TBD — add impact metric"`
- `tags: ["TBD tag 1", "TBD tag 2"]`
These render as visible chips in both the carousel and the lightbox so they're easy to find and edit later.

No changes to header, autoplay timing, dot pagination, or "See all projects" link.
