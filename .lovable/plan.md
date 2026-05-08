## Plan

### 1. Copy images from `glenn-portfolio`
Copy all referenced `/lovable-uploads/*.png` into this project at the same path so existing `src` URLs work as-is.

- **Workflow Automation (18 images)** — for Apps Script reports (5), ENPS (3), JIRA (2), Forms maintenance (4), DBMS (4); plus N8N module (5, currently named files like `n8n-workflow-overview.png`).
- **Case Study & Technical Writing (16 images)** — DMAIC (7), Time Mgmt deck (3), AI Portfolio deck (3), SIP101 article (3).

Total ~39 PNGs copied via `cross_project--copy_project_asset` into `public/lovable-uploads/`.

### 2. Extend `Project` type in `src/pages/Projects.tsx`
Add optional fields:
```ts
link?: string;
linkLabel?: string;
photoCaptions?: string[];   // parallel to photos[]
```

### 3. Replace items in `PROJECTS`
**Full replace** of Workflow Automation + Case Study & Technical Writing entries. Keep Tableau section untouched. Add a clearly-commented placeholder item at the end of each new section so you can drop more in later.

**Workflow Automation (7 = 6 ported + 1 placeholder)**
1. Script-Driven Report Generation — 5 photos, Apps Script
2. ENPS Automation — 3 photos
3. JIRA Project Management — 2 photos
4. Google Forms Maintenance — 4 photos
5. DBMS with Version Control — 4 photos
6. N8N-Powered Personal Assistant — 5 photos
7. `// PLACEHOLDER — duplicate this block to add a new workflow automation project`

**Case Study & Technical Writing (5 = 4 ported + 1 placeholder)**
1. Lean Six Sigma for Financial Analysis — 7 photos
2. Training Deck for Time Management — 3 photos, link → Google Slides
3. AI-Assisted Online Portfolio Building for Analysts — 3 photos, link → Google Slides
4. Knowledge Article for SIP101 — 3 photos, link → Google Doc
5. `// PLACEHOLDER — duplicate this block to add a new case study`

For each item: port `title`, full `description` (from source's `description` + `details` merged into our `desc` field), pick a concise `impact` chip from the source copy, derive 2–4 `tags`, set `icon` to match theme, fill `photos[]` with the `/lovable-uploads/...` paths and `photoCaptions[]` with the matching captions.

Existing items being dropped: Scorecard Automation, Apps Script Data Collection, eNPS Reporting, 2 placeholder workflow items, Neural-Style Workflows, Training Curriculum Overhaul, 4 case-study placeholders. (You said full replace.)

### 4. Render the new fields in the lightbox
In `src/pages/Projects.tsx` lightbox panel:
- If `photoCaptions[lightbox.photoIdx]` exists → render below image as small italic caption.
- If `link` exists → render a button "↗ {linkLabel ?? 'View full resource'}" above the Prev/Next buttons.

No changes to Tableau section, filters, carousel/`ProjectsSection.tsx`, or routing.

### Files touched
- `src/pages/Projects.tsx` — type extension, replaced items, lightbox caption + link button
- `public/lovable-uploads/*.png` — ~39 new image files copied from glenn-portfolio

### Note on N8N images
Source references `n8n-workflow-overview.png` etc. by friendly names. I'll verify these exist in the source's `public/lovable-uploads/` before copying; if missing, I'll flag it and skip the N8N item (or use placeholders) rather than ship broken images.
