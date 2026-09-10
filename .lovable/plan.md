# Tighten Home Page Spacing

## Goal
Compress vertical spacing on the home page so the entire HOME section fits within a single desktop viewport without scrolling.

## Current layout
The home page (`HomePanel.tsx`) contains:
- Hero section with headline + subheader
- "Daily Drivers" horizontal tool bar
- 5-card grid (2 cards top row, 3 cards bottom row)
- Footer rendered below by `Shell.tsx`

## Planned changes

1. **Hero section** (`src/components/Hero.tsx`)
   - Reduce top/bottom padding (`pt-12 pb-12` → smaller values like `pt-6 pb-6` or `pt-8 pb-8`).
   - Reduce gap/margin between the `<h1>` and the `<p>` (`mb-6` → `mb-3` or `mb-4`).

2. **Daily Drivers bar** (`src/pages/panels/HomePanel.tsx`)
   - Reduce bar padding (`p-4` → `p-3` or `p-2.5`).
   - Reduce bottom margin (`mb-6` → `mb-4` or `mb-3`).

3. **Card grid** (`src/pages/panels/HomePanel.tsx`)
   - Reduce grid gaps (`gap-4` → `gap-3` or `gap-2`).
   - Reduce card internal padding (`p-6` → `p-4` or `p-5`).
   - Reduce icon container size and icon margin if needed.

4. **Footer spacing** (`src/components/Footer.tsx`)
   - Inspect current footer padding and reduce if it pushes content below the fold.

## Verification
- Build/typecheck after edits.
- Visually confirm on a 1280×900 (or similar laptop) viewport that the hero, daily drivers bar, all 5 cards, and footer are visible without scrolling.
