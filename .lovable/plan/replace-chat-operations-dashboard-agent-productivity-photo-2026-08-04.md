# Replace Chat Operations Dashboard — Agent Productivity Photo

## Goal
Replace the third photo in the **Chat Operations Dashboard** project card (currently `chat-agent-productivity.jpg`) with the newly uploaded `20260804_175548_0000.png`.

## Current state
- The image to replace is defined in `src/pages/Projects.tsx`, lines 72–77, as the third entry in the Chat Operations Dashboard `photos` array.
- Current URL: `/__l5e/assets-v1/8907e61c-b328-4b43-973c-2b2e0444ac6d/chat-agent-productivity.jpg`
- The uploaded replacement is `user-uploads://20260804_175548_0000.png`.

## Steps
1. Upload `20260804_175548_0000.png` to Lovable Assets as `chat-agent-productivity.png`, creating `src/assets/chat-agent-productivity.png.asset.json`.
2. Update `src/pages/Projects.tsx` so the third photo in the Chat Operations Dashboard uses the new CDN URL.
3. Remove the unused old pointer file `src/assets/chat-agent-productivity.jpg.asset.json`.
4. Verify the preview shows the new image in the project card and lightbox.
