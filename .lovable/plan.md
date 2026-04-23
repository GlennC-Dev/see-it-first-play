

## Diagnosis: why n8n's reply isn't reaching the chat bubble

The widget IS receiving a reply from `App.tsx` — but it's the **fallback string** on line 111: `"Got it — I'll pass that along to Glenn."` That fires whenever the parser can't find a recognizable text field in n8n's response. So the symptom ("only automated messages") = the parser is returning empty.

Two common culprits with n8n's "Respond to Webhook" node:

1. **Wrong key.** AI Agent output is usually under `output`, but if you wrapped it (e.g. returned `{ data: { output: "..." } }` or `{ response: "..." }` or `{ choices: [...] }`), none of `reply / output / message / text` match → empty → fallback fires.
2. **Nested / non-string value.** If `output` is an object (e.g. `{ output: { text: "..." } }`) or an array, `payload.output` is truthy but not a string, and React renders nothing meaningful — or the `??` chain picks up an object and the bubble shows `[object Object]` / blank.
3. **"Respond to Webhook" mode.** If set to "First Incoming Item" with no body mapping, n8n returns the entire item including `headers`, `params`, etc., and the actual model text is buried under `body.output` or similar.

## Plan

### Step 1 — Confirm the exact response shape (no code change yet)

Before changing parsing logic, I need to see what n8n is actually sending back. I'll add **one extra console log** in `src/App.tsx` that prints the **raw response text** before any JSON parsing:

```ts
const raw = await response.clone().text();
console.log('[Chat] 🪵 RAW response body:', raw);
```

You then:
1. Open the chat, send a message.
2. Open the browser console, copy the `[Chat] 🪵 RAW response body:` line.
3. Paste it back to me.

That tells us definitively which key holds the model's text.

### Step 2 — Make the parser bulletproof

Once we know the shape, I'll update the `??` chain in `src/App.tsx` (lines 98–103) to:
- Walk nested objects (`payload.data?.output`, `payload.body?.output`, `payload.response`, `payload.choices?.[0]?.message?.content`, etc.)
- Coerce non-string values to string safely
- Replace the silent `"Got it — I'll pass that along to Glenn."` fallback with a **visible debug message** like `"⚠️ Couldn't parse n8n reply — check console"` so this never silently masquerades as a templated reply again.

### Step 3 — (Optional) Recommend the cleanest n8n setup

In your **Respond to Webhook** node, set:
- **Respond With:** `JSON`
- **Response Body:** `{ "reply": "{{ $json.output }}" }` (or wherever your AI Agent puts the text)

That guarantees the frontend's first lookup (`payload.reply`) hits.

### Files to change
| File | Change |
|---|---|
| `src/App.tsx` | Add raw-body log (Step 1); after you share the log, expand the parser + change empty-reply fallback to a visible debug string (Step 2). |

No changes to `ChatWidget.tsx`, `chatSession.ts`, or `.env.local`.

