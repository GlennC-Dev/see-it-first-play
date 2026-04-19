
Two changes:

## 1. Drop the templated fallback reply

In `src/components/ChatWidget.tsx`, the `sendMessage` function has an `else` branch (when no `__chatMessageHandler` is attached) that auto-replies with:
> "Thanks for reaching out! Glenn specializes in automation, BI dashboards…"

Since n8n is now wired up via `__chatMessageHandler`, this branch is what produces the unwanted templated message in some cases. I'll remove the entire `else` block so:
- The greeting on open stays (that's the only canned message left).
- Every subsequent user message goes through n8n only — no fallback templated bubble.
- I'll also drop the `shouldShowForm` regex + `formShown` auto-trigger logic tied to it (no longer needed; n8n decides what to say).

The lead-capture form UI itself stays in the file (so we can re-trigger it later from n8n if you want), but it won't auto-pop based on keywords anymore.

## 2. Expose a unique session key

Generate a per-visitor session ID and send it with every chat payload so n8n's Memory node can scope conversations.

**Format:** `sess_{YYYYMMDD}_{8-char-random}` — e.g. `sess_20260419_a3f9c2e1`
- No IP / no PII
- Date prefix makes it human-scannable in n8n logs
- Random suffix (crypto.randomUUID slice) makes it unique per browser

**Where it lives:**
- Stored in `localStorage` under key `glenn_chat_session_id`
- Created on first chat open, reused for the lifetime of that browser
- A small helper `getChatSessionId()` in `src/lib/chatSession.ts` (new file) handles get-or-create

**Where it's sent:**
- `src/components/ChatWidget.tsx` → includes `sessionId` when calling `__chatMessageHandler`
- `src/App.tsx` → forwards `sessionId` in the POST body to n8n alongside `message` and `history`
- Also logged in the `[Chat]` console block so you can copy it for debugging

**On the n8n side**, the webhook payload becomes:
```json
{
  "sessionId": "sess_20260419_a3f9c2e1",
  "message": "user text",
  "history": [...]
}
```
Use `{{ $json.body.sessionId }}` as the session key in your Memory node.

## Files to change

| File | Change |
|---|---|
| `src/lib/chatSession.ts` | **New** — `getChatSessionId()` helper (localStorage, generate if missing) |
| `src/components/ChatWidget.tsx` | Remove `else` fallback + keyword regex; pass `sessionId` to handler; update the global type |
| `src/App.tsx` | Accept `sessionId` in handler args; include it in the POST body; log it |

No `.env.local` changes. No n8n URL changes.
