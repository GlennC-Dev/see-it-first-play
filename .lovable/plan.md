## Goal

Pull the 8 portfolio items (image + title + description) from `glenn-portfolio` and drop them into the existing Projects & Builds carousel on this site, in the source's curated order. No layout, animation, or control changes.

## Source items (curated order)

1. ENPS Live Dashboard
2. IMPROVE: FMEA
3. Chat ETL Workflow
4. Apps Script Code
5. JIRA Workflow Management
6. Function Execution Tracking
7. MEASURE: Integrated Flowchart
8. Google Forms Workflow Automation

## Steps

1. **Copy 8 PNGs** from `glenn-portfolio/public/lovable-uploads/` into this project at `src/assets/projects/` (bundled via Vite, optimized at build).
2. **Update `src/components/ProjectsSection.tsx`**:
   - Import the 8 images.
   - Replace `TOP_PROJECTS` with the 8 entries (title + description from source, `image` field instead of `icon`, plus the `impact` + `tags` you supply).
   - Replace the emoji `<div>` in the image slot with `<img src={card.image} className="w-full h-full object-cover" loading="lazy" />`. Keep the same wrapper (`bg-border`, `aspect-video md:aspect-auto md:min-h-[320px]`).
3. Everything else (header, scroll reveal, autoplay, prev/next buttons, dot pagination, counter, "See all projects" link) stays exactly as is.

## What I still need from you

You said you'll provide `impact` and `tags` for each. Could you send them in this shape (one line per item, in the order above)?

```
1. ENPS Live Dashboard | impact: ⚡ Real-time insights | tags: Power BI, Live Data, HR
2. IMPROVE: FMEA       | impact: ...                  | tags: ...
...
```

If for some items you'd rather skip the impact chip or tags, just write `—` and I'll omit that element only on those cards.

## Files touched

- `src/assets/projects/*.png` (new, 8 files)
- `src/components/ProjectsSection.tsx` (data array + image render)
