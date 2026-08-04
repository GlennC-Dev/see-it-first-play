# Replace Chat Operations Dashboard — Agent Productivity Photo

## Goal
Replace the third photo in the **Chat Operations Dashboard** project card (currently the Agent Productivity report) with a new image the user will upload.

## Current state
- Project data lives in `src/pages/Projects.tsx`.
- The Chat Operations Dashboard item is at the top of the Tableau Visualizations section.
- Its `photos` array currently points to:
  1. `chat-queue.jpg`
  2. `chat-transfer.jpg`
  3. `chat-agent-productivity.jpg` ← the one to replace
  4. `ops-chat.jpg`
- All four images are served from the Lovable CDN via `.asset.json` pointer files in `src/assets/`.

## Steps
1. Receive the replacement image uploaded by the user in chat.
2. Upload the new image to Lovable Assets using `lovable-assets create`, producing a new `.asset.json` pointer file.
3. Update `src/pages/Projects.tsx` so the third entry in the Chat Operations Dashboard `photos` array uses the new CDN URL.
4. Update the parallel `photoCaptions` entry if the user wants a new caption (default: keep existing caption).
5. Verify the change renders correctly in the preview.

## Out of scope
- No layout changes.
- No other project cards modified unless requested.
