## Why the chat doesn't fire on mobile

Looking at `ChatWidget.tsx`, the input/send wiring has two mobile-specific gaps. The webhook itself works fine — the frontend just never calls it on mobile.

### Cause 1 — `onKeyDown="Enter"` does not fire on mobile keyboards

Line 149:
```tsx
onKeyDown={(e) => e.key === "Enter" && sendMessage()}
```

On iOS Safari and most Android keyboards, the on-screen "return/send/Go" key on a plain `<input type="text">` either:
- inserts a newline / dismisses the keyboard without firing a `keydown` "Enter" event, or
- fires it with `e.key === "Unidentified"` / `keyCode 229` (IME composition).

Result: tapping the send/return key on the phone keyboard does **nothing** — no fetch, no log, no message added. The desktop Enter key works because real keyboards always emit `key === "Enter"`.

The fix is to wrap the input + send button in a `<form onSubmit={...}>`. Mobile keyboards reliably submit forms when the user taps the on-screen "Go/Send/Return" key (the browser converts it to a native form submit). This is the standard mobile-safe pattern.

### Cause 2 — The send button (➤) may not be tappable

Line 153 — the send arrow button:
- `w-[2.2rem] h-[2.2rem]` ≈ **35×35 px**, below Apple's 44×44 and Google's 48×48 minimum tap target.
- It's an inline `<button>` without `type="button"`, so inside a form it would submit; outside, on iOS, small buttons with no explicit type sometimes get swallowed by the browser's input focus handling.

We'll bump the minimum touch area and add `type="submit"` (since it'll live in a form).

### Cause 3 (minor) — Bottom of widget can be hidden under iOS Safari's URL bar

Widget uses `bottom-[6.5rem]` and `max-h-[540px]`. On a 375×667 iPhone with the URL bar showing, the widget can extend past the visible viewport, hiding the input. Not the root cause, but worth fixing while we're in there with a `max-h-[min(540px,calc(100vh-8rem))]` cap.

## Changes

### File: `src/components/ChatWidget.tsx`

1. Convert `sendMessage` to accept an optional `FormEvent` and call `e.preventDefault()`.
2. Wrap the input + send button (lines 144–156) in a `<form onSubmit={sendMessage}>`.
3. Remove the `onKeyDown` Enter handler (form submit replaces it).
4. Add `type="submit"` to the send button and bump it to `min-w-[44px] min-h-[44px]`.
5. Change input `type="text"` → keep as text but add `enterKeyHint="send"` so mobile keyboards show a "Send" key instead of "return".
6. Add `inputMode="text"` and `autoComplete="off"` for cleaner mobile UX.
7. Cap widget height responsively so the input is never hidden behind iOS chrome.

No changes needed to `App.tsx`, `chatSession.ts`, the webhook URL, or `.env.local`. Once mobile actually fires the handler, the existing n8n flow (which you've already confirmed works on desktop) will return replies the same way.

## How to verify after the fix

1. Open the published site on your phone.
2. Open the chat, type "hi", tap the on-screen **Send** key (or the ➤ button).
3. You should see "Typing…" appear, then n8n's reply within a few seconds — same as desktop.
4. If it still fails, open Safari → Settings → Advanced → Web Inspector and connect to your Mac, OR check the n8n executions panel: if no execution shows up, the click still isn't reaching the handler; if it does and reply doesn't appear, it's a response-parsing issue (separate fix).
