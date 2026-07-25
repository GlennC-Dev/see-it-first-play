# Add Customer Experience Dashboard project

## Changes

**File:** `src/pages/Projects.tsx`

1. Upload the two provided screenshots as Lovable Assets (CES Summary + Agent Summary) into `public/lovable-uploads/`.
2. Insert a new project object at the top of the `PROJECTS` array (before id 0, Tableau BI Dashboard Suite), keeping the current numbering intact by giving it a new id (e.g. `id: 15`) so existing lightbox references don't shift.
3. Assign it to `category: "Tableau Visualizations"` so it renders in the "Self Service Analytics and Automated Reporting" group at the very top.

## New project entry (placeholders)

```
title:  "Customer Experience Dashboard"
desc:   "TBD — add description."
impact: "TBD"
tags:   ["TBD"]
icon:   "📊"
photos: [
  "/lovable-uploads/ces-summary.jpg",
  "/lovable-uploads/agent-summary.jpg",
]
photoCaptions: [
  "TBD — caption for CES Summary view.",
  "TBD — caption for Agent Summary view.",
]
category: "Tableau Visualizations"
```

All TBD fields are left for you to fill in later. Images will be embedded directly; no layout changes.
