# Hero Text Edits

## Goal
Update the hero section copy and headline sizing.

## Changes

1. **Trim the subheader** in `src/components/Hero.tsx`
   - Remove: ` Based in Manila, Philippines — open to remote and international opportunities.`
   - Keep: `I design the systems that turn messy processes into pipelines — then make sure what comes out the other end is actually right.`

2. **Keep the headline on one line**
   - Target the `<h1>` rendering `Automate the Build. Trust the Output.`
   - Reduce the responsive font scale so the full headline stays on a single line across desktop viewports.
   - Options to evaluate: lower the `clamp()` maximum value, add `whitespace-nowrap`, or tighten `letter-spacing`.

## Verification
- Run a build/typecheck after editing.
- Visually confirm the headline no longer wraps and the paragraph no longer contains the Manila/remote clause.
