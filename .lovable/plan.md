## Goal
Update the project gallery grid on `/projects` so it shows 4 cards per row on sufficiently wide viewports, while preserving readability and presentation quality.

## Current state
- File: `src/pages/Projects.tsx`
- Grid line 457: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Cards contain: thumbnail, title, description excerpt, impact badge, and tags.

## Proposed change
1. Switch the grid breakpoint strategy so the jump to 4 columns happens only on extra-wide screens, where there is enough horizontal room to keep the cards legible.
   - New class: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
   - This keeps 3 columns on typical laptops (`lg`) and shows 4 columns on large desktop monitors (`xl`, ≥1280px by default).
2. Optional readability safeguard: if the 4-column layout feels too tight, slightly reduce the horizontal page padding inside the gallery container (`px-[5vw]` → `px-[4vw]`) at `xl` only, giving each card a bit more breathing room without changing the overall design.
3. Verify in the preview that card text (title, excerpt, badge, tags) remains readable at the new width.

## Why this approach
- 4 cards across on a 1608px+ viewport gives each card roughly ~340–360px of width, which is still comfortable for the current card content.
- Keeping `lg:grid-cols-3` prevents 13–15-inch laptop screens from looking cramped.
- No other layout, lightbox, or content changes are needed.

## Files to edit
- `src/pages/Projects.tsx` (single grid class change, plus optional padding tweak)